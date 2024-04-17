from dataclasses import dataclass
from functools import lru_cache
import subprocess
import time
import json
from typing import Any
import openai
from os import getenv
from pprint import pprint
from gptroles.gpt.engines.orto.sections.params import (
    OrtoUriParamsProperties,
    UriParams,
    UriParamsProperties,
)
from gptroles.gpt.engines.orto.sections.sections import (
    Section,
    SectionProperties,
    SectionRequestCommand,
    SectionType,
)
from gptroles.gpt.engines.root.engine_root import root_roles, role_confirmation
from PyQt6.QtWidgets import QWidget

from gptroles.gpt.ai.engines.OpenAISettings import OpenAISettings


# models = sorted(openai.Model.list().data, key=lambda x: x.id)
# for model in models:
#     print(model)

from openai.types.chat.chat_completion_chunk import ChoiceDelta as ChatMessage


def run_shell(command, shell="bash", string_flag=None, autorun=False):
    if string_flag is None:
        string_flag = "-c"
    print("#running proc", command)
    p = subprocess.Popen(
        [shell, string_flag, command],
        shell=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    p.communicate()
    try:
        stdout, stderr = p.communicate(timeout=45 if autorun else 900)
    except subprocess.TimeoutExpired:
        stdout, stderr = p.stdout, p.stderr
        p.kill()
    print("#out", stdout, stderr)
    return stdout, stderr, p.returncode


class MemoryResource(UriParamsProperties):
    scheme: str = "resource"
    host: str = "app.orto.memories"


@dataclass
class Memory:
    resource_uri: MemoryResource
    content: str
    description: str = ""  # Short description of the memory for the index

    def resource_uri_string(self):
        return UriParams(self.resource_uri)()


class MemoryManager:
    """
    Inserts a series of messages into the stack passed to openai create method,
    these messages contain an index of memories, and the content of any focused memories.

    Also provides open ai function call implenetations to select from and open memory.
    """

    memories: list[Memory] = []
    open_memories_uris: list[str] = []

    @property
    def keyed_memories(self) -> dict[str, Memory]:
        """
        Returns the memories list keyed by their resource represented as a string
        """
        keyed_memories = {
            memory.resource_uri_string(): memory for memory in self.memories
        }
        # Sort by key path
        keyed_memories = dict(sorted(keyed_memories.items()))
        return keyed_memories

    @property
    def resource_paths(self) -> list[str]:
        """
        Returns a list of all resource path strings for all memories
        """
        # Rebuild from the string
        resource_paths = [
            memory.resource_uri_string()
            for key_path, memory in self.keyed_memories.items()
        ]
        resource_paths = list(sorted(resource_paths))
        return resource_paths

    @property
    def memory_index(self) -> list[ChatMessage]:
        """
        Returns an index of all memories with the resource path and a description
        """
        memory_index = "\n".join(
            [
                f"{memory.resource_uri_string()}: {memory.description}"
                for memory in self.memories
            ]
        )

        memory_index_section = Section(
            SectionProperties(
                type=SectionType.REQUEST,
                command=SectionRequestCommand.DESCRIPTION,
                params=OrtoUriParamsProperties(
                    host="app.orto.context", path_parts=["/context/memory/index"]
                ),
                content=memory_index,
            )
        )()

        return [ChatMessage(**{"role": "system", "content": memory_index_section})]

    def get_memory_from_uri(self, resource_uri_string: str):
        memory = None
        keyed_memories = self.keyed_memories
        if resource_uri_string in keyed_memories:
            memory = self.keyed_memories[resource_uri_string]
        return memory

    # def memory_to_section(self, memory: str):
    #     return Section()()

    def add_memory(self, new_memory: Memory):
        """
        Adds a new memory.

        This should check for duplicate resource paths, updating the memory if its the same
        """
        self.memories.append(new_memory)
        self.memories = self.keyed_memories.values()

    @property
    def current_memory(self) -> list[ChatMessage]:
        return self.memory()

    def memory(self, for_uris: list[str] | None = None) -> list[ChatMessage]:
        """
        This returns a list of ChatMessage with Section text for current open memory uris
        """
        for_uris = for_uris or self.open_memories_uris

        sections_texts_for_key_paths = [
            Section(
                SectionProperties(
                    type=SectionType.RESPONSE,
                    command=SectionRequestCommand.MEMORY,
                    params=OrtoUriParamsProperties(
                        host="app.orto.context",
                        path_parts=[
                            f"/context/memory/contents?for_memory_key_path={memory_key_path}"
                        ],
                    ),
                    content=memory.content,
                )
            )()
            for memory_key_path, memory in self.keyed_memories.items()
            if memory_key_path in for_uris
        ]

        messages_for_sections = [
            ChatMessage(**{"role": "system", "content": section_text})
            for section_text in sections_texts_for_key_paths
        ]

        return messages_for_sections

    def openai_memory_function_open_close_uri(self, resouce_uri_str: str):
        """this is the function call that openai can use to open memory contents that it selects from the index"""


class MemoryIndexBuilder:
    """
    This should contain functions to build the memory_index_dict in MemoryManader,
    from files etc that are loaded in via the UI
    """

    def from_file(self, file):
        pass


class Connector:
    """
    This connects openai and the orto engine
    """

    prompt_chain: list[ChatMessage] = []
    memory_manager: MemoryManager = MemoryManager()

    def __init__(
        self,
        settings,
        root_system_messages: list[Section] = root_roles,
        prompt_chain=None,
        memory_manager=None,
    ) -> None:
        self._settings = None
        self.gpt_settings = settings
        self.api_key = settings.OPENAI_API_KEY
        self.client = openai.OpenAI(api_key=self.api_key)

        self.root_system_messages = root_system_messages
        self.prompt_chain = prompt_chain or prompt_chain
        self.memory_manager = self.memory_manager or memory_manager

    @property
    def gpt_settings(self):
        return self._settings

    @gpt_settings.setter
    def gpt_settings(self, value):
        self._settings = value
        openai.api_key = value.OPENAI_API_KEY
        print("GPT Settings Updated")

    @property
    def api_key(self):
        return self._settings.OPENAI_API_KEY

    @api_key.setter
    def api_key(self, value):
        self._settings.OPENAI_API_KEY = value
        openai.api_key = value

    def change_api_key(self, api_key):
        openai.api_key = api_key

    def confirm_role(self):
        return self.ask(role_confirmation, prompt_chain=[], assistant_name="System")

    def clear_context(self):
        self.prompt_chain = []

    def trim_error_handler(
        self, e: BaseException, inquiry, prompt_chain, message_role, trim
    ):
        print(e)
        if "maximum context length" in e._message:
            print("Trimming prompt", trim, len(prompt_chain))
            time.sleep(1.1)
            prompt_chain = prompt_chain[trim:-1]
            if len(prompt_chain) == 0:
                return ("Error", str(e))
            return self.ask(inquiry, prompt_chain, message_role, trim=trim + 1)
        else:
            print(e)
            return ("Error", str(e))

    def ask(
        self,
        inquiry,
        prompt_chain=None,
        message_role="user",
        assistant_name="GPT",
        trim=1,
    ):
        # Root System Messages with Roles
        root_system_messages = [
            {"role": "system", "content": system_message}
            for system_message in self.root_system_messages
        ]

        # Memory from indexes
        memories = self.memory_manager.memory_index + self.memory_manager.current_memory

        # Add in Working Prompt Chain for Inquiry
        prompt_chain = prompt_chain or self.prompt_chain
        prompt_chain = [
            m for m in prompt_chain if m.role in ("system", "assistant", "user")
        ]

        # Build REQUEST section
        # request_section =
        request_message = [ChatMessage(**{"role": message_role, "content": inquiry})]

        # Build messages from Prompt Chain with appended Inquiry
        messages = root_system_messages + memories + prompt_chain + request_message

        # pprint(messages)

        try:
            response = self.client.chat.completions.create(
                **(self.gpt_settings.chatcompletion | dict(messages=messages)),
            )
        except openai.RateLimitError as e:
            print("Rate limit", e)
            return ("Error", str(e))
        except openai.AuthenticationError as e:
            print("Auth Error", e)
            return ("Error", str(e))
        except openai.APIError as e:
            print("API", e)
            return ("Error", str(e))
        # except openai.InvalidRequestError as e:
        #     return self.trim_error_handler(e, inquiry, prompt_chain, message_role, trim)

        # pprint(response)
        response_text = response.choices[0].message.content.strip()
        print(f"{response.choices[0].message.role}: {response_text}")
        if len(response.choices) > 1:
            pprint("ERROR: CHOICE LENGTH", response.choices)

        ## ---- TODO ------
        # Parse response_text into a ResponseSection
        # response_section: Section = Section.from_text(response_text)

        # # Process the ResponseSection
        # answer_request_section: Section = response_section.process(
        #     prompt_chain, response_text
        # )

        # answer = answer_request_section.properties.content or response_text
        ## ---- TODO ------

        # Update the chain
        prompt_chain.append(response.choices[0].message)

        # Default fallback for debugging
        answer = response_text

        print(len(root_system_messages), len(prompt_chain), "MESSAGE COUNT root + user")

        return (assistant_name, answer)

    def process_response(self):
        raise NotImplementedError()

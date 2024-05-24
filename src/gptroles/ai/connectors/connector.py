from functools import lru_cache
import subprocess
import time
import json
from typing import Any
import openai
from os import getenv
from pprint import pprint
from gptroles.ai.engines.orto.memory import Memory, MemoryManager

from gptroles.ai.engines.root.engine_root import root_roles, role_confirmation
from PyQt6.QtWidgets import QWidget

from gptroles.ai.connectors.OpenAISettings import OpenAISettings


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


class Connector:
    """
    This connects openai and the UI
    """

    working_messages: list[ChatMessage] = []
    memory_manager: MemoryManager

    def __init__(
        self,
        settings,
        root_system_messages: list[str] | None = None,
        working_message=None,
        memory_manager=None,
    ) -> None:
        self._settings = None
        self.gpt_settings = settings
        self.api_key = settings.OPENAI_API_KEY
        self.client = openai.OpenAI(api_key=self.api_key)

        self.working_messages = working_message or []
        self.root_system_messages = root_system_messages or []  # or root_roles
        self.memory_manager = memory_manager or MemoryManager()

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
        return self.ask(role_confirmation, working_messages=[], assistant_name="System")

    def clear_context(self):
        self.working_messages = []

    def trim_error_handler(
        self, e: BaseException, inquiry, working_message, message_role, trim
    ):
        print(e)
        if "maximum context length" in e._message:
            print("Trimming prompt", trim, len(working_message))
            time.sleep(1.1)
            working_message = working_message[trim:-1]
            if len(working_message) == 0:
                return ("Error", str(e))
            return self.ask(inquiry, working_message, message_role, trim=trim + 1)
        else:
            print(e)
            return ("Error", str(e))

    def ask_image(
        self, inquiry, size=None, quality=None, model=None, assistant_name="dall-e"
    ) -> str:
        size = size or "1792x1024"  # 1024x1024, 1024x1792 or 1792x1024
        quality = quality or "standard"  # or "hd"
        model = model or "dall-e-3"

        try:
            response = self.client.images.generate(
                model=model,
                prompt=inquiry,
                size=size,
                quality=quality,
                n=1,
            )
        except openai.RateLimitError as e:
            print("Rate limit", e)
            return ("Error", str(e))
        except openai.AuthenticationError as e:
            print("Auth Error", e)
            return ("Error", str(e))
        except openai.BadRequestError as e:
            print("API", e)
            return ("Error", str(e))
        except openai.APIError as e:
            print("API", e)
            return ("Error", str(e))

        image_url = response.data[0].url
        return (assistant_name, image_url)

    def ask(
        self,
        inquiry,
        working_messages=None,
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
        memories = [
            m.as_message() for m in self.memory_manager.active_memories
        ]  #  + self.memory_manager.current_memory

        # TODO: Provide the memory index and a tool to let the AI search memory
        # memories += self.memory_manager.memory_index

        # Add in working messages for Inquiry

        working_messages = working_messages or self.working_messages
        working_messages = [
            m for m in working_messages if m.role in ("system", "assistant", "user")
        ]

        request_message = [ChatMessage(**{"role": message_role, "content": inquiry})]

        # Build messages from Prompt Chain with appended Inquiry
        messages = root_system_messages + memories + working_messages + request_message

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
        # except openai.BadRequestError as e:
        #     return self.trim_error_handler(e, inquiry, working_message, message_role, trim)

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
        #     working_message, memory, response_text
        # )

        # answer = answer_request_section.properties.content or response_text
        ## ---- TODO ------

        # Update the chain

        # Default fallback for debugging
        answer = response_text

        print(
            [
                len(message_set)
                for message_set in [
                    root_system_messages,
                    memories,
                    working_messages,
                    request_message,
                ]
            ],
            "root_system_messages, memories, working_messages, request_message",
        )

        self.working_messages.append(response.choices[0].message)

        return (assistant_name, answer)

    def process_response(self):
        raise NotImplementedError()

import re
import requests

from openai.types.chat.chat_completion_chunk import ChoiceDelta as ChatMessage
from dataclasses import dataclass

from io import BytesIO

from gptroles.ai.engines.orto.params import (
    OrtoUriParamsProperties,
    UriParams,
    UriParamsProperties,
)
from gptroles.ai.engines.orto.sections import (
    Section,
    SectionProperties,
    SectionFormat,
    SectionProvider,
)

uri_pattern = re.compile(
    r"^(?P<scheme>[a-zA-Z][a-zA-Z0-9+.-]*)://"  # Scheme
    r"(?:(?P<user_info>[^@]*)@)?"  # User information (optional)
    r"(?P<authority>"  # Authority (group containing host and port)
    r"(?P<host>[^:/?#]*)"  # Host
    r"(?:\:(?P<port>\d+))?"  # Port (optional)
    r")"  # End of authority group
    r"(?P<path>/[^?#]*)?"  # Path
    r"(?:\?(?P<query>[^#]*))?"  # Query (optional)
    r"(?:#(?P<fragment>.*))?"  # Fragment (optional)
)


@dataclass
class Memory:
    resource_uri: UriParamsProperties | str
    _content: str | bytes | None = None
    description: str = ""  # Short description of the memory for the index

    def resource_uri_string(self):
        return UriParams(self.resource_uri)()

    @property
    def content(self) -> bytes | str:
        if not self._content:
            self._content = self.load_resource()
        return self._content

    def load_resource(
        self, resource_uri: UriParamsProperties | str | None = None
    ) -> bytes | str:
        resource_uri = resource_uri or self.resource_uri
        content = None

        match = uri_pattern.match(resource_uri)
        if match:
            scheme: str = match.group("scheme")
            if scheme.startswith("http"):
                content = self.from_url(resource_uri)
            elif scheme.startswith("file"):
                content = self.from_file(resource_uri.replace(f"{scheme}://", ""))
            else:
                print("Unknown scheme")
        else:
            print("Invalid URI")

        return content

    def from_file(self, resource_uri):
        with open(resource_uri, "rb") as f:
            content = f.read()
        return content

    def from_url(self, resource_uri):
        response = requests.get(resource_uri)
        content = BytesIO(response.content).read()
        return content


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
                provider=SectionProvider.AI,
                format=SectionFormat.DESCRIPTION,
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
                    provider=SectionProvider.USER,
                    format=SectionFormat.MEMORY,
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

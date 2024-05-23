import re
import uuid
import requests

from openai.types.chat.chat_completion_chunk import ChoiceDelta as ChatMessage
from dataclasses import dataclass, field

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


@dataclass
class Memory:
    resource_uri: UriParamsProperties
    _content: str | bytes | None = None
    description: str = ""  # Short description of the memory for the index

    active: bool = False
    uid: uuid.UUID = field(init=False)

    def __post_init__(self):
        self.uid = uuid.uuid4()

    @property
    def resource_uri_string(self):
        return UriParams(self.resource_uri)()

    @property
    def content(self) -> bytes | str:
        if not self._content:
            self._content = self.load_resource()
        return self._content

    def as_message(self, memory: type["Memory"] | None = None) -> ChatMessage:
        memory = memory or self
        memory_str = f"""```Memory{{{memory.resource_uri_string}}}
{memory.content}```"""
        message = ChatMessage(**{"role": "user", "content": memory_str})
        return message

    def load_resource(
        self, resource_uri: UriParamsProperties | None = None
    ) -> bytes | str:
        resource_uri = resource_uri or self.resource_uri
        content = None

        scheme = resource_uri.scheme
        if scheme.startswith("http"):
            content = self.from_url(resource_uri.to_string())
        elif scheme.startswith("file"):
            content = self.from_file(resource_uri.path)
        else:
            print("Unknown scheme")

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
    def active_memories(self) -> list[Memory]:
        return [m for m in self.memories if m.active]

    def add_memory(self, memory: Memory) -> list[Memory]:
        """
        Adds a new memory.

        Checks for duplicate resource paths, updating the memory if its the same
        """
        if memory not in self.memories and not [
            m
            for m in self.memories
            if m.resource_uri == memory.resource_uri or m.uid == memory.uid
        ]:
            self.memories.append(memory)
            # print(f"Added memory {memory}")
            self.memories = list(self.memories_by_uid.values())  # Force sort

        return self.memories

    def remove_memory(self, memory: Memory) -> list[Memory]:
        try:
            self.memories.remove(self.memories.index(memory))
        except (IndexError, KeyError) as e:
            pass
        self.remove_memory_by_uid(memory.uid)
        return self.memories

    def remove_memory_by_uid(self, uid: Memory) -> list[Memory]:
        self.memories = [m for m in self.memories if m.uid != uid]
        return self.memories

    @property
    def memories_by_uid(self) -> dict[uuid.UUID, Memory]:
        """
        Returns the memories list keyed by their unique id from when they were created
        """
        memories_by_uid = {memory.uid: memory for memory in self.memories}
        # Sort by key path
        memories_by_uid = dict(sorted(memories_by_uid.items()))
        return memories_by_uid

    @property
    def memories_by_uri_string(self) -> dict[str, Memory]:
        """
        Returns the memories list keyed by their resource represented as a string
        """
        memories_by_uri_string = {
            memory.resource_uri_string: memory for memory in self.memories
        }
        # Sort by key path
        memories_by_uri_string = dict(sorted(memories_by_uri_string.items()))
        return memories_by_uri_string

    @property
    def resource_paths(self) -> list[str]:
        """
        Returns a list of all resource path strings for all memories
        """
        # Rebuild from the string
        resource_paths = [
            memory.resource_uri_string
            for key_path, memory in self.memories_by_uri_string.items()
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
                f"{memory.resource_uri_string}: {memory.description}"
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
            for memory_key_path, memory in self.memories_by_uri_string.items()
            if memory_key_path in for_uris
        ]

        messages_for_sections = [
            ChatMessage(**{"role": "system", "content": section_text})
            for section_text in sections_texts_for_key_paths
        ]

        return messages_for_sections

    def ai_scratchpad(self):
        """this function should maintain a memory that AI can use as a scratchpad,
        to save snippets from memories as it traverses the index and memories contents
        """

    def openai_memory_function_open_close_uri(self, resouce_uri_str: str):
        """this is the function call that openai can use to open memory contents that it selects from the index"""


class MemoryIndexBuilder:
    """
    This should contain functions to build the memory_index_dict in MemoryManager,
    from files etc that are loaded in via the UI
    """

    def from_file(self, file):
        pass

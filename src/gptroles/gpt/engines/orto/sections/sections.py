from dataclasses import asdict, dataclass
from enum import Enum
from typing import Any

from gptroles.gpt.engines.orto.sections.params import (
    ParamsMakerType,
    ParamsPropertiesType,
    ListParams,
    UriParams,
    UriParamsProperties,
    OrtoUriParamsProperties,
)


# Should also provide these class defs to the engine


class SectionType(str, Enum):
    REQUEST = "~"
    RESPONSE = "@"


class SectionRequestCommand(str, Enum):
    DESCRIPTION = "DESCRIPTION"
    DETAILS = "DETAILS"
    INQUIRY = "INQUIRY"
    MEMORY = "MEMORY"


class SectionResponseCommand(str, Enum):
    ANSWER = "ANSWER"
    TOOL_CALL = "TOOL_CALL"


@dataclass
class SectionProperties:
    """Class that wraps a SECTIONs properties"""

    type: SectionType
    command: SectionRequestCommand | SectionResponseCommand
    params: ParamsPropertiesType
    content: str


# Typed
class SectionText(str):
    def __init__(self) -> None:
        super().__init__()


default_params_maker: ParamsMakerType = UriParams
defailt_params_properties_type: ParamsPropertiesType = UriParamsProperties


class Section:
    """Class full of static methods for operating on SECTIONs with their properties"""

    properties: SectionProperties
    params_maker = default_params_maker

    def __init__(self, properties: SectionProperties, params_maker=None) -> None:
        self.properties = properties
        self.params_maker = params_maker or self.params_maker

    def __call__(self, *args: Any, **kwargs: Any) -> str:
        print(asdict(self.properties))
        return self.to_text(params_maker=self.params_maker, **asdict(self.properties))

    @classmethod
    def to_text(
        cls,
        type: SectionType,
        command: str,
        params: dict,
        content: str,
        params_maker=ParamsMakerType | None,
    ) -> SectionText:
        params_maker = params_maker or default_params_maker
        return f"//|SH{SectionType(type)} {command} | {params_maker(UriParamsProperties(**params))()}{{ \n\n{content} }}"

    @classmethod
    def from_text(cls, text: str, own=False) -> "Section":
        """
        parse a text content of a message into a SectionProperties and Section
        """
        # 1. capture text content with regex capture groups
        # 2. parse text content into SectionProperties and Params
        # 3. parse SectionProperties into Section

        # properties =

    def process(self):
        """
        this will process a RESPONSE SECTION and run any necessary tooling,
        providing a REQUEST to be put back into the connector message queue (`ask` method).
        until it finally provides an ANSWER RESPONSE which is returned to the initial `ask` call
        """
        request = Section()
        return request


class TOOLS(Enum):
    memory_request = "memory_request"
    memory_store = "memory_store"
    data_store = "data_store"


header_template_spec = (
    "//|SH<type_symbol> <section_command> | <params>{ \n\n<content> }"
)

content = f"""
SECTIONS are the format for REQUESTING and RESPONDING between both the AI and the USER.
It consistes of a SECTION HEADER and contains content.

Every chat message passed to you, under system or the user, will be formatted as a SECTION,
they are designed to create a consistently structured and parseable format around chat messages.


The SECTION HEADER is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE of any inputted inputted message that are delivered as SECTIONS (REQUEST or RESPONSE)
    It denotes the SECTION by providing information about the content which it contains

    It consists of a descriptor string in the specified format:  "{header_template_spec}",
        It always begins with a header which always begins with the character `//|SH`
        followed by either the character `@` for a AI RESPONSE SECTION or `~` for USER REQUEST SECTION
        followed by a section command name,
        optionally followed by params as an externally processed string on the same line, signified by a pipe `|`.
        ending with the SECTION opening signifier `{{`
        which contains the SECTION content that ends with a matching `}}`,

    SECTION HEADERS are very strict, you must strictly follow any examples or specifications and follow them exactly
        Here are the parts of the header:
            <type_symbol>: either the character `~` for a REQUEST SECTION or the character `@` for a RESPONSE SECTION
            <section_command> is a string representation of the name of the known command for the request, builtin commands include:
                class BuiltinSectionRequestCommand(str, Enum):
                    DESCRIPTION = "DESCRIPTION"
                    DETAILS = "DETAILS"
                    INQUIRY = "INQUIRY"
                    MEMORY = "MEMORY"

                class BuiltinSectionResponseCommand(str, Enum):
                    ANSWER = "ANSWER"
                    TOOL_CALL = "TOOL_CALL"

            <params> is optional parameters for the command can be a URI with params, a piped list, or otherwise; specified and implemented elsewhere
            <content>: is all the BLOCKS and any free text held in the SECTION

            When the user makes a REQUEST SECTION with a HEADER,
                you will consider all known user and system request/response messages,
            then you can use a series of known RESPONSE commands and tool calls,
                in order to resolve to and provide a a final ANSWER RESPONSE command,

            Remember to use all known tools and commands to increase exactness, specificity, or to otherwise boost the quality of your final answer response


Here is an example of a response section with its signifying header, inside a markdown code block:

```example
{
Section(
    SectionProperties(
        type=SectionType.RESPONSE,
        command=SectionResponseCommand.TOOL_CALL,
        params=OrtoUriParamsProperties(host="engine.tools", path_parts=["APPLICATION", "open_links"], uriparams={'link': 'website.com'}),
        content="// this content only contains a comment, but would usually contain a payload for the command or tool"
    )
)()
}
```

The above example section and header signifies a tool section to follow, along with params that point to the tool and followed by a newline and then its content.

Here is an example of a request section for a user inquiry with its signifying header, inside a markdown code block:

```example
{
Section(
    SectionProperties(
        type=SectionType.REQUEST,
        command=SectionRequestCommand.INQUIRY,
        params=OrtoUriParamsProperties(host="developer.command.orto", path_parts=["/en/docs/ENGINE/SECTION/index/examples"]),
        content="// no content here"
))()
}
```
"""

section_docs_sections = Section(
    SectionProperties(
        type=SectionType.REQUEST,
        command=SectionRequestCommand.DETAILS,
        params=OrtoUriParamsProperties(
            host="developer.command.orto", path_parts=["/en/docs/ENGINE/SECTION/index"]
        ),
        content=content,
    )
)()

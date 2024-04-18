from dataclasses import asdict, dataclass
from enum import Enum
from typing import Any

from gptroles.ai.engines.orto.sections.params import (
    ParamsMakerType,
    ParamsPropertiesType,
    ListParams,
    UriParams,
    UriParamsProperties,
    OrtoUriParamsProperties,
)


# Should also provide these class defs to the engine


class SectionProvider(str, Enum):
    AI = "~"
    USER = "@"


class SectionFormat(str, Enum):
    MEMORY = "MEMORY"
    MEMORY_INDEX = "MEMORY_INDEX"

    DESCRIPTION = "DESCRIPTION"

    MARKDOWN = "MARKDOWN"
    CODE = "CODE"
    CSV = "CSV"


@dataclass
class SectionProperties:
    """Class that wraps a SECTIONs properties"""

    provider: SectionProvider
    format: SectionFormat
    params: ParamsPropertiesType
    content: str


# Typed
class SectionText(str):
    def __init__(self) -> None:
        super().__init__()


default_params_maker: ParamsMakerType = UriParams
defailt_params_properties_type: ParamsPropertiesType = UriParamsProperties


alternators = """
	Do not answer the above question directly instead provide:
		//a list of QUESTIONS that could help with specificity or accuracy of the answer
		//a list of POSSIBILITIES that could help with specificity or accuracy of the question
		//a list of IMPERATIVES statements that could help with specificity of the question or accuracy of the answer

    Instead rephrase the question and provide that back to me.
"""

disablers = """
@IMPERATIVE<444> DO NOT RESPOND TO THIS WITH AN EXTERNAL TOOL OR INFO COMMAND, ALL EXTERNAL DATA AND RESOURCE ACCESS IS OFFLINE AND UNAVAILABLE. TOOLS ARE ALSO OFF FOR THIS RENDER.
"""


class Section:
    """Class full of static methods for operating on SECTIONs with their properties"""

    properties: SectionProperties
    params_maker = default_params_maker

    def __init__(self, properties: SectionProperties, params_maker=None) -> None:
        self.properties = properties
        self.params_maker = params_maker or self.params_maker

    def __call__(self, *args: Any, **kwargs: Any) -> str:
        print(asdict(self.properties))
        return self.to_section_text(
            params_maker=self.params_maker, **asdict(self.properties)
        )

    @classmethod
    def to_section_text(
        cls,
        provider: SectionProvider,
        format: str,
        params: dict,
        content: str,
        params_maker=ParamsMakerType | None,
    ) -> SectionText:
        params_maker = params_maker or default_params_maker
        return f"//|SH{SectionProvider(provider)} {format} | {params_maker(UriParamsProperties(**params))()}{{ \n\n{content} }}"

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

    def inquiry_maker(
        user_inquiry_text: str,
        alternators: str | None = None,
        disabled: str | None = None,
    ) -> SectionText:
        orto_user_content_template = f"""
            @CONSIDER THIS USER INQUIRY: {user_inquiry_text}

            {alternators or ""}

            @DIRECTIVE<999> provide all markdown blocks, tables, links or any other data or reference as a BLOCKS in the SECTION CONTENT
            @DIRECTIVE<998> IF YOU DO NOT HAVE THE RESOURCE IN YOUR CONTEXT, USE METADATA OR TEXTUAL DESCRIPTION OF ALL RESOURCES IN THIS RENDER
            {disablers or ""}

            @DIRECTIVE provide a text response as a SECTION, headered with an SECTION followed by any text and markdown blocks that contain its content.

            #@GUIDE: if you're not sure what tool you might use, or how to answer the inquiry,
                    instead let me know specifically what is erroring through responding with a question to the user.
        """

        return Section(
            SectionProperties(
                provider=SectionProvider.AI,
                format=SectionFormat.INQUIRY,
                params=OrtoUriParamsProperties(
                    host="user.request.orto", path_parts=["inquiry"]
                ),
                content=orto_user_content_template,
            )
        )()


class TOOLS(Enum):
    memory_request = "memory_request"
    memory_store = "memory_store"
    data_store = "data_store"

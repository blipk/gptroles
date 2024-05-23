import re
from dataclasses import asdict, dataclass
from typing import Any


snippet_orto_section_params_URI_spec = """
here is a fully specced example for the URI in the above annotion:

		`orto://developer.command.orto/en-US/docs/ENGINE/[
			/ [:STACK/] {{
				/ FRAMES[]:[
					[]@COMMAND[ OPERATE|DIRECTIVE|IMPERATIVE|CONSIDER ]
					[]@TOOL[ MEMORY | STORAGE ]
				] => INSTRUCTION
				[]@COMMAND [ DESCRIPTION | ERRORCASE]
			}}
			/ [COMMANDS, TOOLS, RENDER, RENDERER, RESOLER, ANSWER]
		]`

"""

# @dataclass
# class ParamProperties:
# 	maker: callable


@dataclass
class ListParamsProperties:
    """Class that wraps a pipe list type paramaters properties"""

    seperator: str
    values: list


class ListParams:
    """Class full of static methods for operating on UriParams"""

    properties: ListParamsProperties

    def __init__(self, properties: ListParamsProperties) -> None:
        self.properties = properties

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        return self.piped_list_maker(**asdict(self.properties))

    @classmethod
    def piped_list_maker(cls, values=None, seperator=None):
        values = values or []
        seperator = seperator or default_seperator
        params_str = seperator.join(values)
        return params_str


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
class UriParamsProperties:
    """Class that wraps a uri type paramaters properties"""

    scheme: str
    authority: str
    path: str
    query: str | None = None
    fragment: str | None = None

    user_info: str | None = None

    @property
    def path_parts(self):
        return self.path.split("/")

    @property
    def query_parts(self):
        return self.query.split("&")

    @classmethod
    def from_string(cls, resource_uri: str) -> type["UriParamsProperties"] | None:
        match = uri_pattern.match(resource_uri)
        if match:
            groups = match.groupdict()
            del groups["host"]
            del groups["port"]
            return UriParamsProperties(**groups)
        else:
            print("Invalid URI")
            return None

    def to_string(self, resource_uri: type["UriParamsProperties"] | None = None) -> str:
        resource_uri = resource_uri or self
        return f"{self.scheme}://{self.authority}/{self.path}{'/?' + self.query if self.query else ''}{'#' + self.fragment if self.fragment else ''}"


default_seperator: str = "|"


class UriParams:
    """Class full of static methods for operating on UriParams"""

    properties: UriParamsProperties

    def __init__(self, properties: UriParamsProperties) -> None:
        self.properties = properties

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        return self.to_string(self.properties)

    def from_string(self, resource_uri: str):
        self.properties = UriParamsProperties.from_string(resource_uri)

    def to_string(self, resource_uri: type["UriParamsProperties"] | None = None) -> str:
        resource_uri = resource_uri or self.properties
        return resource_uri.to_string()


ParamsPropertiesType = UriParamsProperties | ListParamsProperties
ParamsMakerType = UriParams | ListParams


def OrtoUriParamsProperties(**kwargs: dict) -> UriParamsProperties:
    return UriParamsProperties(**(kwargs | {"scheme": "orto"}))

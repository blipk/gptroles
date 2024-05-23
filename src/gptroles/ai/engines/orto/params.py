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


@dataclass
class UriParamsProperties:
    """Class that wraps a uri type paramaters properties"""

    scheme: str
    host: str
    path_parts: list[str]
    uriparams: dict | None = None
    anchor: str | None = None


def OrtoUriParamsProperties(**kwargs: dict) -> UriParamsProperties:
    return UriParamsProperties(**(kwargs | {"scheme": "orto"}))


default_seperator: str = "|"


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


class UriParams:
    """Class full of static methods for operating on UriParams"""

    properties: UriParamsProperties

    def __init__(self, properties: UriParamsProperties) -> None:
        self.properties = properties

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        return self.uri_params_maker(**asdict(self.properties))

    def uri_params_maker(
        cls,
        scheme,
        host,
        path_parts: list[str],
        uriparams: dict = None,
        anchor: str = None,
    ) -> str:
        uriparams = uriparams or {}
        anchor = anchor or ""
        path_str = "/".join(path_parts)
        params_str = "&".join([f"{k}={v}" for k, v in uriparams.items()])
        return f"{scheme}://{host}{path_str}/?{params_str}#{anchor}"


ParamsPropertiesType = UriParamsProperties | ListParamsProperties
ParamsMakerType = UriParams | ListParams

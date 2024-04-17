from dataclasses import dataclass
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
class ListParamsProperties():
	"""Class that wraps a pipe list type paramaters properties"""
	seperator: str
	values: list


@dataclass
class UriParamsProperties():
	"""Class that wraps a uri type paramaters properties"""
	scheme: str
	host: str
	path_parts: list[str]
	params: dict
	anchor: str

def OrtoUriParamsProperties(**kwargs) -> UriParamsProperties:
	return UriParamsProperties(**{kwargs | dict(scheme="orto")})

class ListParams:
	"""Class full of static methods for operating on UriParams"""
	default_seperator: str = "|"
	properties: ListParamsProperties

	def __init__(self, properties: ListParamsProperties) -> None:
		self.properties = properties

	def __call__(self, *args: Any, **kwds: Any) -> Any:
		return self.piped_list_maker(self, **self.properties)

	def piped_list_maker(self, values, seperator):
		values = values or []
		seperator = seperator or self.default_seperator
		params_str = seperator.join(values)
		return params_str


class UriParams:
	"""Class full of static methods for operating on UriParams"""
	properties: UriParamsProperties

	def __init__(self, properties: UriParamsProperties) -> None:
		self.properties = properties

	def __call__(self, *args: Any, **kwds: Any) -> Any:
		return self.uri_params_maker(self, **self.properties)

	def uri_params_maker(self, scheme, host, path_parts: list[str], params: dict = None, anchor: str = None):
		params = params or {}
		anchor = anchor or ""
		path_str = "/".join(path_parts)
		params_str = "&".join([f"{k}={v}" for k, v in params])
		return f"{scheme}://{host}{path_str}/?{params_str}#{anchor}"

ParamsPropertiesType = UriParamsProperties | ListParamsProperties
ParamsMakerType = UriParams | ListParams

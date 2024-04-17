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


def uri_params_maker(scheme, host, path_parts: list[str], params: dict, anchor):
    path_str = "/".join(path_parts)
    params_str = "&".join([f"{k}={v}" for k, v in params])
    return f"{scheme}://{host}{path_str}/?{params_str}#{anchor}"


def orto_params_maker(
    host: str, path_parts: list[str], params: dict = None, anchor=None
):
    params = params or {}
    anchor = anchor or ""
    return uri_params_maker("orto", host, path_parts, params, anchor)

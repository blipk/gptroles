tool_template = """/||SECTION ~#TEXTSNIPPET<TOOL.prototypes> | this text snippet section contains the prototypes for various tools used in this app


TOOLs are used to genrate MEMORY which contains FRAMES (with an INQUIRY and RESOURCES) operations on SNIPPETS,
they can contains STORAGE/MEMORY and FRAMES with DIRECTIVES

The header for this tool is always specified in this format: ({tool_section_header_specification}



// these are descriptions of tools passed to openai.client.chat.completions.create() for this ENGINE
// each tool can be described by the following pseudo-TypeScript
```typescript pseudo typing
type memory = string
type tool = {{
	// #properties
	tool_id?:

	tool_result: memory // the tool result, should resolve to a memory

	// the loop that resolve the tool_result
	tool_result_resolver: CallableFunction = () => {{
		// while memory.state != resolved
		memory.memory_resolver() // could scroll through, or return static memory
		// memory is resolved when we have all params
	}}

	// #options
	tool_name: string // name of the tool
	tool_template: string // the basic input template to render on
	tool_result_params: ParamsFor<tool_resolver> // params for the tool result resolver
	tool_render_params: ParamsFor<tool_render> // params for the tool renderer, each one must have a toString() method


	// #rendering functions
	tool_header() = (render) => `/^/|SECTION ${tool_name}<tool_id>(${tool_params})${render}`

	// #rendering loops
	// this sets everything up and then runs tool_render, its the MAIN LOOP FUNCTION of this component
	tool_resolver = () => {{
		tool_result_resolver()
		tool_render()
	}}

	// this returns the render of the tool from the result
	tool_render() = () =>
		return tool_template.bind(tool_params)`${{tool_header()}}`


	// #external and metadata
	!tool_ux: NotImplementedHere // this is the how the tool interface with the UFI


	// any comments describing the tool can go here:

}

```
"""

# //TODO:
# 	- TOOL CALL SPECIFICATION (AS A PROMPT TEMPLATE SECTION TOOL, AS LOCAL (open/load as: CLI, FILES, APPS, LINKS), AS GLOBAL (WEB) )
#     - TOOLs can update MEMORIES,
#     - TOOLs are switched through the SWITCH tool

#     - Integration between local and template tools:
# 		- loading and remembering files, use explorer
#         - snippet storage
#         - code storage
#         - offline storage (notepad, calculator etc) //
# 		- Scrolling through a context window on any tool that resolves to a data source


## TOOL FRAME // this generates a TOOL FRAME { } template
tool_prototypes = """


~TOOL DESCRIPTIONS
```tool QASNIPPET
{
	tool_name: "QASNIPPET"
	tool_params: {question, answer}

	tool_template: (params) => `QUESTION: ${params.question}\nINQUIRY: ${params.answer}\n`

	// this is a question with an answer, or a statement that contains both
}
```

```tool NAMED_SNIPPET
{
	tool_name: "NAMED_SNIPPET"
	tool_params: {snippet}

	tool_template: (params) => `${tool_name}: ${params.snippet}`

	// this is a named snipper
}
```

```tool OBJECT_SNIPPET extends NAMED_SNIPPET
{
	tool_name: "NAMED_SNIPPET"
	tool_params: {question, answer}

	tool_template: (params) => `${tool_name}: ${params.object.toString()}`

	toString: (obj) => obj instanceof Array ? [...object]
						: obj instanceof Object ? {...object}
						: obj.toString?() ?? () => `${obj}`

	// this is an OBJECT_SNIPPET, essentially a NAMED_SNIPPET but implements a toString() method
}
```

```tool DATA_SNIPPET extends NAMED_SNIPPET
{
	tool_name: "DATA_SNIPPET"
	tool_params: {snippet}

	tool_template: (params) => `${tool_name}: ${ensureJSON(params.snippet)}`

	// this is an annoted markdown snippet of JSON
}
```

```tool COMMAND_TOOL
{
	tool_name: "COMMAND_TOOL"
	tool_params: { command = { name, content } }

	tool_template: (params) => `@${params.command.name.toUpperCase()}<${tool_name}> ${params.command.content}`

	// provides a DIRECTIVE command directly to the render
}
```

```tool DIRECTIVE_TOOL
{
	...extends COMMAND_TOOL

	tool_name: "DIRECTIVE_TOOL"
	tool_params: { command = {name: "DIRECTIVE_TOOL", content= "CONSIDER THESE EXTRA RESOURCES: Your encoded context" } }

	// provides a DIRECTIVE command directly to the render
}
```

```tool SCROLLABLE_MEMORY
{
	tool_name: "SCROLLABLE_MEMORY"
	tool_params: {snippet}

	tool_template: (params) => `${tool_name}: ${ensureJSON(params.snippet)}`

	// this will be a tool that resolves to a TEXTSNIPPET that is a
	// @TOOL SCROLLABLE_MEMORY[] : {wholeContext=textResolver(), searching: false, cursor: (start, range), userStorageResolver} => TEXTBLOCK[cursor]   slice of
}
```

"""

tool_metadata, usage_spec = "", ""


# def tool_builder(tool_template, usage_spec, tool_header, tool_metadata, *args, **kwargs):
#     # tool_template(tool_header, tool_metadata, usage_spec, *args, **kwargs)
#     return lambda \
#          		tool_header =  tool_header, \
#     			tool_metadata = tool_metadata, \
#     			tool_template = tool_template, *args, **kwargs: (
#          f"""{tool_header}\n{tool_metadata}\n\n{tool_template}"""
# 	)

# this_builder = tool_builder(tool_template, usage_spec)

# def header_builder(tool_name, tool_path: list[str], *args, **kwargs):
#     params = args
#     kwparams = kwargs
#     return f"""
#     /^/ |SECTION ~(@TOOL) | orto://tool.command.orto/ENGINE/TOOLS/{tool_name}@{"/".join(f"{path}" for path in tool_path)}/{":".join(f"{arg}" for arg in args)}?{"&".join(f"{key}={value}" for key, value in kwargs.items())}
#     """

# def metadata_builder(*args, **kwargs):
#     newline = "\n"
#     params = args
#     kwparams = kwargs
#     return f"""
#     {newline.join(f"{key}: {value}" for key, value in kwargs.items())}
#     """


# header_builder(header_builder, metadata_builder)

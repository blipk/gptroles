orto_engine = """
/^/ @ANNOTATED_HEADER instructions_0x01 | orto://developer.command.orto/en-US/docs/ENGINE

/*/ METADATA:
/*/	here is a fully specced example for the URI in the above annotion:
/*/		`
			orto://developer.command.orto/en-US/docs/ENGINE/[
											/ [:STACK/] {
											 	/ FRAMES[]:[
													[]@COMMAND[ CONSIDER|DIRECTIVE|OPERATE|IMPERATIVE ]
													[]@TOOL[ MEMORY | STORAGE ]
												] => INSTRUCTION
												[]@COMMAND [ DESCRIBE | ERRORCASE]
											}
											/ [COMMANDS, TOOLS]
										]
		`

// following section incomplete
// $# MEMORY {
//  	// this will contain  WORKING MEMORY or a CONTEXT WINDOW
//}


$# ANSWER FRAME {
	$$INPUTTED // from UI and template development // this comment won't appear to the user

	@CONSIDER ANY MEMORY CREATED FROM TOOLS


	@OPERATE THUSLY:
		@CONSIDER THIS QUESTION: "How can I draw with quaternions?"

		Do not answer the above question directly instead provide:
    		//a list of QUESTIONS that could help with specificity or accuracy of the answer
			//a list of POSSIBILITIES that could help with specificity or accuracy of the question
			//a list of IMPERATIVES statements that could help with specificity of the question or accuracy of the answer


	@IMPERATIVE<999> include annotated headers and any other type information with all markdown blocks
	@IMPERATIVE<998> DO NOT RESPOND TO THIS WITH AN EXTERNAL TOOL OR INFO COMMAND, ALL EXTERNAL DATA AND RESOURCE ACCESS IS OFFLINE AND UNAVAILABLE. TOOLS ARE ALSO OFF FOR THIS RENDER.
	@IMPERATIVE<998> IF YOU DO NOT HAVE THE RESOURCE IN YOUR CONTEXT, USE METADATA OR TEXTUAL DESCRIPTION OF ALL RESOURCES IN THIS RENDER

	@DIRECTIVE Perform the ANSWER FRAME OPERATION then provide a text response headered with an ANNOTATED_HEADER followed by any text and markdown blocks
}

## RESOURCES FRAME {
	CONSIDER THESE EXTRA RESOURCES: Your encoded context

	@DIRECTIVE Use the RESOURCES FRAME directive to resolve the ANSWER FRAME directive or use
}


#@ERRORCASE IN ANY FRAME: if all else fails and the error glyphs are anywhere in your considerations, instead let me know specifically what is erroring through questioning the user.


#!DESCRIBE all frames with these instructions:

This are the COMMANDS and their descriptions for the ENGINE:

ENGINE is this document which describes a templating engine to help explore inquiries
STACK is the engines stack of FRAMES
RENDER is the text content of this
FRAMES are run in a stack throughout the template through their @DIRECTIVES that direct to another FRAME. They start with two any number of # (or @# for a keyword frame) and their contents are {} enclosed
DIRECTIVES are there to choose a frame to operate on, and direct the instructions derived from a FRAME
CONSIDER is similar to a DIRCTIVE but is it contained inside the frame, offering operating instructions or guides for that frame
OPERATE is for inlining instructions into directives
IMPERATIVE<PRECEDENCE> adds a requirement or guide they may include a PRECEDENCE VALUE as a NUMBER which a greater number denotes greater importance
INSTRUCTIONS are any and all tasks that you extract from a frame.

COMMANDS are these uppercase commands
TOOLS are described in the openai tools argument of openai.client.chat.completions.create() - there is also some prototypes below

NAMED FRAMES:
	ANSWER FRAME is the user facing frame, when it is fully resolved as your	 final answer, it is displayed to the user as a chat message. (i.e. YOUR RESPONSE GOES HERE)
	MEMORY FRAME is the primary focus and working memory for the ANSWER FRAME
	RESOURCE FRAME is auxillary memory for any TOOL FRAMES
	TOOL FRAME is the frame that the current tool operates in until resolved, then yielding to the ANSWER FRAME

TOOLs also exist that can be run in any frame, TOOLs will generate a RESOURCE from MEMORY or STORAGE and upate the RESOURCE FRAME in this engine


ERRORCASE adds error handling and discovery to DIRECTIVES. More COMMANDS may be added arbitrarily throughout the message context.
DESCRIBE is a special command that provides instructions on how this engine works.

	Once all the frames are run, either provide me with a ~(@TOOL) to call
	which will call a tool and update this engines RESOURCE FRAME and ANSWER FRAME for you to access what you need,
	or provide me with the fully resolved final answer from the DIRECTIVE in the ANSWER FRAME.

Your primary goal is TO ANSWER THE DIRECTIVE through what is DESCRIBED
$$$$*COMMANDORTO

"""

tool_prototypes = """
~~~ TOOL PROTOTYPES ~~~
// these are descriptions of tools passed to openai.client.chat.completions.create() for this ENGINE
// each tool can be described by the following pseudo-TypeScript
```typescript pseudo typing
type memory = string
type tool = {
	// #properties
	tool_id?:

	tool_result: memory // the tool result, should resolve to a memory

	// the loop that resolve the tool_result
	tool_result_resolver: CallableFunction = () => {
		// while memory.state != resolved
		memory.memory_resolver() // could scroll through, or return static memory
		// memory is resolved when we have all params
	}

	// #options
	tool_name: string // name of the tool
	tool_template: string // the basic input template to render on
	tool_result_params: ParamsFor<tool_resolver> // params for the tool result resolver
	tool_render_params: ParamsFor<tool_render> // params for the tool renderer, each one must have a toString() method


	// #rendering functions
	tool_header() = (render) => `/^/ @ANNOTATED_HEADER ${tool_name}<tool_id>(${tool_params})${render}`

	// #rendering loops
	// this sets everything up and then runs tool_render, its the MAIN LOOP FUNCTION of this component
	tool_resolver = () => {
		tool_result_resolver()
		tool_render()
	}

	// this returns the render of the tool from the result
	tool_render() = () =>
		return tool_template.bind(tool_params)`${tool_header()}`


	// #external and metadata
	!tool_ux: NotImplementedHere // this is the how the tool interface with the UFI


	// any comments describing the tool can go here:

}

```


//TODO:
	- TOOL CALL SPECIFICATION (ANNOTED HEADER WITH TOOL NAME AND PARAMS)
    - TOOL TYPES (INTERNAL/EXTERNAL)
    - TOOL UPDATE MEMORIES
    - SELECT MEMORIES FOR FOCUS STACK

## TOOL FRAME // this generates a TOOL FRAME { } template

~TOOL DESCRIPTIONS
```tool QASNIPPET
{
	tool_name: "QASNIPPET"
	tool_params: {question, answer}

	tool_template: (params) => `QUESTION: ${params.question}\nANSWER: ${params.answer}\n`

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



//TODO

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


orto_render = """{orto_engine}"""


orto_roles = [orto_render, tool_prototypes]


"""

def create_qa_snippet_tool(question, answer):
    tool = {
        "tool_name": "QASNIPPET",
        "tool_params": {"question": question, "answer": answer},

        "tool_template": lambda params: f"QUESTION: {params['question']}
ANSWER: {params['answer']}",

        "tool_result": "",

        "tool_result_resolver": lambda: tool.update({"tool_result": tool["tool_template"](tool["tool_params"])}),

        "tool_header": lambda: f"@ANNOTATED_HEADER {tool['tool_name']}({tool['tool_params']['question']}, {tool['tool_params']['answer']})",

        "tool_resolver": lambda: (tool["tool_result_resolver"](), print(tool["tool_result"]))
    }

    return tool

# Example Usage
my_qa_snippet_tool = create_qa_snippet_tool("What is the capital of France?", "Paris")
my_qa_snippet_tool["tool_resolver"]()
"""

user_text = "How can I draw with quaternions?"

orto_metadata = """
/*/ METADATA:
/*/	here is a fully specced example for the URI in the above annotion:
/*/		`orto://developer.command.orto/en-US/docs/ENGINE/[
			/ [:STACK/] {{
				/ FRAMES[]:[
					[]@COMMAND[ OPERATE|DIRECTIVE|IMPERATIVE|CONSIDER ]
					[]@TOOL[ MEMORY | STORAGE ]
				] => INSTRUCTION
				[]@COMMAND [ DESCRIPTION | ERRORCASE]
			}}
			/ [COMMANDS, TOOLS, RENDER, RENDERER, RESOLER, ANSWER]
		]`
/*/
"""

orto_main = f"""/||SH TEMPLATE | orto://developer.command.orto/en/docs/ENGINE

{orto_metadata}


// This is the main system prompt file and role


$# INQUIRY FRAME
	@CONSIDER ANY MEMORY CREATED FROM TOOLS

	@RESOLVER
		@OPERATE THUSLY:
			@CONSIDER THIS QUESTION: {user_text}

			Do not answer the above question directly instead provide:
				//a list of QUESTIONS that could help with specificity or accuracy of the answer
				//a list of POSSIBILITIES that could help with specificity or accuracy of the question
				//a list of IMPERATIVES statements that could help with specificity of the question or accuracy of the answer


		@IMPERATIVE<999> include annotated headers and any other type information with all markdown blocks
		@IMPERATIVE<998> DO NOT RESPOND TO THIS WITH AN EXTERNAL TOOL OR INFO COMMAND, ALL EXTERNAL DATA AND RESOURCE ACCESS IS OFFLINE AND UNAVAILABLE. TOOLS ARE ALSO OFF FOR THIS RENDER.
		@IMPERATIVE<998> IF YOU DO NOT HAVE THE RESOURCE IN YOUR CONTEXT, USE METADATA OR TEXTUAL DESCRIPTION OF ALL RESOURCES IN THIS RENDER

		@DIRECTIVE Perform the INQUIRY FRAME OPERATION then provide a text response as a FRAME, headered with an SECTION followed by any text and markdown blocks that contain its content.


## RESOURCES FRAME
	CONSIDER THESE EXTRA RESOURCES: Your encoded context
    MEMORY.prototype `{{
		`{{anno}}`
	}}`

	@DIRECTIVE Use the RESOURCES FRAME directive to resolve the INQUIRY FRAME directive or use

#@ERRORCASE IN ANY FRAME: if all else fails and the error glyphs are anywhere in your considerations, instead let me know specifically what is erroring through questioning the user.
"""

orto_core = """/||SH TEMPLATE | orto://developer.command.orto/en/docs/core

#!DESCRIPTION - process all frames with these described instructions:

	These are the COMMAND COMPONENTS and their descriptions for the TEMPLATE and ENGINE,
	the COMMANDS are signified by these UPPERCASE COMMANDS,
    the ENGINE consists of a series of descriptors for an creating a rich interface,
    both on top and inside your message, it does this by utilizing



TEMPLATE is the root resolver and renderer, this document as a matter of fact.
ENGINE is this document which describes a templating engine to help explore inquiries
	USER_REQUEST is the messages inputted to you by the user, each one consists of one or more sections that are signified by a HEADER
		//|SECTIONS~
			HEADER: is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE of user inputted message that denotes the first SECTION, more HEADERS and SECTIONS may follow, containing various data stores, json blocks, markdown etc.
				It consists of a descriptor string in the exact format:  "/||SH~ <request_type> | <params>\n<metadata>\n\n<content>",
                	where the parts:
                	<request_type> is a the type of the content and the name of the params and metadata for the request, builtin requsts include: '@inquiry, @memory, @dataview
                    <params/options> is replaced by a URI with params, a piped list, or otherwise; specified and implemented by @TOOLs
                    <metadata> is any optional text described as comments or otherwise, is internal information for a section, timestamps; parsed by the application
                    <content>: is all the FRAMES held in the SECTION

                    When the user REQUESTS with a header, you will consider all known user and system request/response messages,
                	then you will use all known response types, using tools
                      in order to resolve to and provide a a final `answer` type response,
                    , remember to use all known tools to increase exactness, specificity, or to otherwise boost the quality of your final answer response

	AI_RESPONSE is the messages you respond with, each one consists of a single section that is signified by a HEADER
		//|SECTIONS~
			HEADER: is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST of your textual response messages, you may provide more than one section in your responses to denote memory or data as markdown blocks, text, json or othwerwise.
				It consists of a descriptor string in the exact format:  "/||SH~ <response_type> | <params>\n<metadata>\n\n<content>",
                	where the parts:
                	<response_type> is a type of program or tool to request from the user, builtin tools  are: `@final_answer, @memory_request, @memory_store, @data_store`
                    <params/options> is replaced by a URI with params, a piped list, or otherwise; specified and implemented by @TOOLs
                    <metadata> is any optional text described as comments or otherwise, is internal information for a section, timestamps; parsed by the application
                    <content>: is all the FRAMES held in the SECTION

                    When you RESPOND with a header, you are trying to resolve the final `answer` type response for the request inquiry.
                    You will do this through providing me `tool` response type using all known tools, and denoted by a correct HEADER,


Response and Request Types:
	IMPERATIVE<PRECEDENCE> adds a requirement or guide for the DIRECTIVE they may include a PRECEDENCE VALUE as a NUMBER which a greater number denotes greater importance

	@MEMORY: is the RESOURCE descriptor and mutating function, that holds the VIEW with metadata and context
		~BUILTINS:
			change_context,


Content directives:
		These are commands provided in the REQUEST or RESPONSE SECTIONS that provide descriptions of or directions for their content

	DIRECTIVES are preprocessors that direct OPERATE choose OPERATE on, and direct the instructions derived from a FRAME
	CONSIDER is similar to a DIRCTIVE but is it contained inside the frame, offering operating instructions or guides for that frame
		=> INSTRUCTIONS are any and all tasks that you extract from a frame.
	@OPERATE is the main instruction or description for a directive secion
	~ERRORCASE:
     	adds error handling and discovery to guide DIRECTIVES in any FRAMES, they can occur anywhere. More COMMANDS may be added arbitrarily throughout the message context.
"""

footer = """


DESCRIPTION is a special and definitive command occuring at the end of a the root SECTION,
			it is a directive that provides instructions on how this ENGINE and all it's FRAMES work as a system.

Your primary goal is TO INQUIRY THE DIRECTIVE through the DESCRIPTION and provide a fully resolved and FINAL ANSWER as a RESPONSE

		Once all the frames are run, either provide me with a ~(@TOOL) to call
		which will call a tool and update this engines RESOURCE FRAME and INQUIRY FRAME for you to access what you need,
		or provide me with the fully resolved final answer from the DIRECTIVE in the INQUIRY FRAME.

$$$$*COMMANDORTO
"""




# Sections

section_stack = """/||SECTION ~(#TEXTSNIPPET) | this text snippet contains information on how the SECTIONS work

Sections are signified by headers. Here is an example:

```example
/||SECTION ~(@TOOL) | orto://tool.command.orto/*TOOLS/tool_name?

```

This example header signifies a tool section to follow, along with tool metadata and params, it would be followed by a newline and then its content.
The above section contains a tool call, however this would realistically be a TEXTSNIPPET MEMORY/STORAGE

A more accurate and generalised example section header for this current section would be something like:

```example
/||SECTION ~(#TEXTSNIPPET) | this is the description of the below text snippet, this one contains an example

<section content/>
```

@IMPERATIVE section headers are very strict, you must strictly follow any examples or specifications and follow them exactly
@IMPERATIVE when reading examples of section headers, do not consider them as actual section headers, just an example
"""

# from gptroles.gpt.engines.orto.roles.tools import tool_prototypes, ortos_tools
# from gptroles.gpt.engines.orto.roles.memory import memory_description, scrollable_memory

orto_engine = f"""{orto_core}{footer}{orto_main}"""
orto_render = """{orto_engine}"""
orto_roles = [orto_render]

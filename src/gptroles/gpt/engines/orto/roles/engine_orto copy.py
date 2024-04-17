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

user_text = "How can I draw with quaternions?"

alternators = """
	Do not answer the above question directly instead provide:
		//a list of QUESTIONS that could help with specificity or accuracy of the answer
		//a list of POSSIBILITIES that could help with specificity or accuracy of the question
		//a list of IMPERATIVES statements that could help with specificity of the question or accuracy of the answer
"""

disablers = """
@IMPERATIVE<444> DO NOT RESPOND TO THIS WITH AN EXTERNAL TOOL OR INFO COMMAND, ALL EXTERNAL DATA AND RESOURCE ACCESS IS OFFLINE AND UNAVAILABLE. TOOLS ARE ALSO OFF FOR THIS RENDER.
"""

orto_user_content_template = f"""
	// This is a hinting format for helping to direct and guide the request/inquiry process to the correct answer,
    // by generating deltas and following paths to find an answer to the directive.
    // The inquiry

	@CONSIDER THIS USER INQUIRY: {user_text}

	{alternators if False else ""}

	@DIRECTIVE<999> provide all markdown blocks, tables, links or any other data or reference as a BLOCKS in the SECTION CONTENT
	@DIRECTIVE<998> IF YOU DO NOT HAVE THE RESOURCE IN YOUR CONTEXT, USE METADATA OR TEXTUAL DESCRIPTION OF ALL RESOURCES IN THIS RENDER
	{disablers if False else ""}

	@DIRECTIVE provide a text response as a SECTION, headered with an SECTION followed by any text and markdown blocks that contain its content.

	#@GUIDE: if you're not sure what tool you might use, or how to answer the inquiry,
    		instead let me know specifically what is erroring through responding with a question to the user.
"""

# THIS IS HOW THE USER WILL SEND REQUESTS
section_orto_request = f"""
/||SH~ REQUEST inquiry | orto://developer.command.orto/en/docs/ENGINE?empty_example_param=None {{
{orto_user_content_template}
}}
"""


header_example = "//|SH~  request_response_frame_name | orto://developer.command.orto/en/docs/ENGINE?empty_example_param=None {{"
header_spec = "//|SH[~|@] <request_name> | <resources_params>{ \n\n<content> }"
header_explanation = """A SECTION HEADER provides information about the content of a SECTION.
It begins with the character `//|SH`
followed by either the character @ for a AI_RESPONSE or ~USER_REQUEST
followed by its externally known name,
optionally followed by resources and params as an externally processed string on the same line, signified by a pipe `|`.
ending with the SECTION opening signifier `{`
which contains the SECTION content that ends with a matching `}`,

The SECTION contents may contain more SECTIONS.
"""

section_orto_core_table_contents_help = f"""/||SH~ RESPONSE DESCRIPTION | orto://developer.command.orto/en/docs/ENGINE/index

// this is a table of contents of the orto engine components, each with a brief description or summary.

	These are the COMMAND COMPONENTS and their descriptions for the ENGINE,
	the COMMANDS are signified by these UPPERCASE COMMANDS,
    the ENGINE consists of a series of descriptors for an creating a rich interface,
    both on top and inside your message, it does this by utilizing


TEMPLATE is the root resolver and renderer, this document as a matter of fact.

You ABSOLUTELY MUST provide your response messages as SECTIONS with HEADERS at ALL TIMES, and process incoming messages as so too.

ENGINE is this series of help document which describes a request and response engine to help explore inquiries in a structured manner.
	SECTIONS
		USER_REQUEST is the messages inputted to you by the user, each one consists of one or more sections that are signified by a HEADER
			HEADER: is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE of user inputted message that denotes the first SECTION which contains content
				It consists of a descriptor string in the exact format:  "{header_spec}",
                	where the parts:
                	<request_name> is a the name of the params and metadata for the request, builtin requsts include: '@inquiry, @memory, @dataview
                    <params/options> is replaced by a URI with params, a piped list, or otherwise; specified and implemented by @TOOLs
                    <content>: is all the BLOCKS and any free text held in the SECTION

                    When the user REQUESTS with a header, you will consider all known user and system request/response messages,
                	then you will use all known response types, using tools
                      in order to resolve to and provide a a final `answer` type response,
                    , remember to use all known tools to increase exactness, specificity, or to otherwise boost the quality of your final answer response

		AI_RESPONSE is the messages you respond with, each one consists of a single section that is signified by a HEADER
			HEADER: is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST of your textual response messages, you may provide more than one section in your responses to denote memory or data as markdown blocks, text, json or othwerwise.
				It consists of a descriptor string in the exact format:  "{header_spec}",
                	where the parts:
                	<request_name> is a type of program or tool to request from the user, builtin tools  are: `@final_answer, @memory_request, @memory_store, @data_store`
                    <params/options> is replaced by a URI with params, a piped list, or otherwise; specified and implemented by @TOOLs
                    <content>: is all the BLOCKS and any free text held in the SECTION

		Response Named Sections:
        	Once you process a message, respond with one of the following SECTION names:
         	- with a SECTION named `tool` to call to update content, memory and blocks in any SECTIONs with known tools
            - with a SECTION named `content` that contains a resolved final answer to the inquiry

        Request Named Sections:
			Request messages may contain the following SECTION names:
			- with a section named `inquiry`: this is the last SECTION that contains the user inquiry to be answered
			- with a section named `memory`:



Blocks:
	May be contained in the content, they are explained further in another provided SECTION.


Content directives:
		These are commands provided in the content of REQUEST or RESPONSE SECTIONS that provide descriptions of or directions for their content.

        They are uppercase directives that help guide the inquiry, not related to engine commands, may be prefixed or postfixed with a character.

	IMPERATIVE<PRECEDENCE_VALUE>
    	adds a requirement or guide for the inquiry they may include a PRECEDENCE_VALUE as a number which, greater number denoting greater importance

	DIRECTIVES is a final instruction, and is usually the final instruction before any optional guides.

	~GUIDE:
     	adds error handling and discovery to guide DIRECTIVES in any FRAMES, they can occur anywhere, and are optional.




Your primary goal is TO ANSWER THE INQUIRY through COMMANDS and DIRECTIVES,
responding with `tool` SECTION RESPONSE to gain more insight into various known contexts and memories,
until finally providing a FINAL ANSWER as a `content` SECTION RESPONSE.
$$$$*COMMANDORTO
"""


from gptroles.gpt.engines.orto.roles.tools import tool_prototypes  # noqa: F401, E402
from gptroles.gpt.engines.orto.roles.memory import (  # noqa: F401, E402
    memory_description,
    scrollable_memory,
)

# Final
section_orto_system_content = f"""
/||SH~ RESPONSE content | orto://developer.command.orto/en/docs/ENGINE?empty_example_param=None {{
{section_orto_core_table_contents_help}
}}
"""
orto_system = f"""{section_orto_system_content}"""

orto_roles = [section_orto_core_table_contents_help]

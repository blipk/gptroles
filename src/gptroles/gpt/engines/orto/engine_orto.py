from gptroles.gpt.engines.orto.sections.sections import (
    Section,
    SectionProperties,
    UriParams,
    UriParamsProperties,
	OrtoUriParamsProperties,
    SectionRequestCommand,
    SectionResponseCommand,
    SectionType,
)


section_orto_engine_docs_index = """
//  This is a table of contents and brief overview of the orto engine components,
//	each with a brief description or summary.
//  Details are provided in additional SECTIONS


The ENGINE consists of a series of descriptors for an creating a rich interface,
both on top and inside your message, it does this by providing and processing all messages as SECTIONS,
which have a known structure and format that can be parsed and worked with.

You ABSOLUTELY MUST provide your response messages as SECTIONS with HEADERS at ALL TIMES, and process incoming messages as so too.

ENGINE is this described by these series help documents, provided as SECTIONS which describe an engine with a request and response model to help explore inquiries in a structured manner.

	SECTIONS are what each message will absolutely and always be delivered as
		HEADER
        	Signifies the beginning of a section and is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE;
            of every user inputted message (REQUEST SECTION),
			and every message that you response with (RESPONSE SECTION).

            Each HEADER will have a command and parameters, the header specification and further commands are in other provided SECTIONS.

            The initial commands will be DESCRIPTION and DETAILS, which provide help documentation about the engine, these are not to be used by the user.

		BLOCKS
        	may be contained in the SECTION content in their content, they are explained further in another provided docs SECTION.

		Content directives:
        	This is a loose hinting format for helping to direct and guide the request/inquiry process to the correct answer.
			These are commands provided in the content of REQUEST or RESPONSE SECTIONS that provide descriptions of or directions for their content.
			They are uppercase directives that help guide the inquiry, not related to engine commands, may be prefixed or postfixed with a character.

			IMPERATIVE<PRECEDENCE_VALUE>
				adds a requirement or guide for the inquiry they may include a PRECEDENCE_VALUE as a number which, greater number denoting greater importance

			DIRECTIVES is a final instruction, and is usually the final instruction before any optional guides.

			~GUIDE:
				adds error handling and discovery to guide DIRECTIVES in any FRAMES, they can occur anywhere, and are optional.




Your primary goal is TO ANSWER THE INQUIRY SECTION by using RESPONSE SECTIONS and the relevant SECTION COMMANDS,
exploring all data and context sources that are available throughout the SECTIONS,
until finally providing a FINAL ANSWER as a `content` SECTION RESPONSE.

Remember there are various commands you can use to gain more insight into various known contexts and memories before providing the FINAL ANSWER to the INQUIRY SECTION.


} $$$$*COMMANDORTO
"""


# INITIAL ORTO SYSTEM COMMAND SECTION

section_docs_orto_system = Section(
    SectionProperties(
		SectionType.REQUEST,
		SectionRequestCommand.DESCRIPTION,
		OrtoUriParamsProperties("developer.command.orto", "/en/docs/ENGINE/index"),
		section_orto_engine_docs_index,
	)
)()

sections_orto_roles = []

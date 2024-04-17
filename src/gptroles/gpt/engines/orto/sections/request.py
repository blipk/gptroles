from gptroles.gpt.engines.orto.sections.index import (
    section_maker,
    orto_params_maker,
    SectionRequestCommand,
    SectionResponseCommand,
    SectionType,
)

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

# THIS IS HOW THE USER WILL SEND REQUESTS
user_inquiry_text_sample = "How can I draw with quaternions?"


def inquiry_maker(user_inquiry_text: str = user_inquiry_text_sample):
    orto_user_content_template = f"""
		// This is a hinting format for helping to direct and guide the request/inquiry process to the correct answer,
		// by generating deltas and following paths to find an answer to the directive.
		// The inquiry

		@CONSIDER THIS USER INQUIRY: {user_inquiry_text}

		{alternators if False else ""}

		@DIRECTIVE<999> provide all markdown blocks, tables, links or any other data or reference as a BLOCKS in the SECTION CONTENT
		@DIRECTIVE<998> IF YOU DO NOT HAVE THE RESOURCE IN YOUR CONTEXT, USE METADATA OR TEXTUAL DESCRIPTION OF ALL RESOURCES IN THIS RENDER
		{disablers if False else ""}

		@DIRECTIVE provide a text response as a SECTION, headered with an SECTION followed by any text and markdown blocks that contain its content.

		#@GUIDE: if you're not sure what tool you might use, or how to answer the inquiry,
				instead let me know specifically what is erroring through responding with a question to the user.
	"""

    return section_maker(
        SectionType.REQUEST,
        SectionRequestCommand.INQUIRY,
        orto_params_maker("user.request.orto", ["inquiry"]),
        orto_user_content_template,
    )

from gptroles.gpt.engines.orto.sections.sections import (
    Section,
    SectionProperties,
    UriParams,
    UriParamsProperties,
    OrtoUriParamsProperties,
    SectionRequestCommand,
    SectionResponseCommand,
    SectionType,
    header_template_spec,
)


section_orto_engine_docs_index = f"""

//  This is a table of contents and brief overview of the orto engine components,
//	each with a brief description or summary.
//  Details are provided in additional docs SECTIONS


The orto ENGINE consists of a structured interface for the system and user messages between the ai and the user,
it is outlined in this DESCRIPTION REQUEST SECTION and detailed further in the DETAILS REQUEST SECTIONs.

The interface uses structure on top of messages that are called SECTIONS,
all messages will be delivered and recieved as SECTIONS of the REQUEST and RESPONSE types.

Here is a representation of the SECTION format which is explained in another provided section: {header_template_spec}

This is the function that generates the text that represents a Section in all messages.
```python
    @classmethod
    def to_text(
        cls,
        type: SectionType,
        command: str,
        params: dict,
        content: str,
        params_maker=ParamsMakerType | None,
    ) -> SectionText:
        params_maker = params_maker or default_params_maker
        return f"//|SH{{SectionType(type)}} {{command}} | {{params_maker(UriParamsProperties(**params))()}}{{{{ \n\n{{content}} }}}}"
```

A REQUEST SECTION is the message from the user to the AI.
A RESPONSE SECTION is the message from the AI to the user.

You ABSOLUTELY MUST provide ALL your response messages as RESPONSE SECTIONS with HEADERS at ALL TIMES, and process incoming messages as REQUEST SECTIONS so too.
You MUST NEVER include any characters outside the SECTION specification, its HEADER and CONTENT, only provide messages in this format.

The SECTION HEADER signifies the beginning of a section and is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE of all SECTIONS and messages.

Each HEADER has a well defined format with a command and parameters, the header specification and further commands are in other provided SECTIONS.

The initial REQUEST SECTION commands will be DESCRIPTION and DETAILS, which provide help documentation about the engine, these are not to be used by the user.
More REQUEST AND RESPONSE SECTION commands will be detailed in another provided docs DETAILS SECTIONs.


BLOCKS may be contained in the SECTION content in their content, their format will be explained further further in another provided docs DETAILS SECTION.


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
"""


# INITIAL ORTO SYSTEM COMMAND SECTION

section_docs_orto_system = Section(
    SectionProperties(
        type=SectionType.REQUEST,
        command=SectionRequestCommand.DESCRIPTION,
        params=OrtoUriParamsProperties(
            host="developer.command.orto", path_parts=["/en/docs/ENGINE/index"]
        ),
        content=section_orto_engine_docs_index,
    )
)()

from gptroles.gpt.engines.orto.sections.sections import (  # noqa: E402
    section_docs_sections,
)

sections_orto_roles = [section_docs_orto_system, section_docs_sections]

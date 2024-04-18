from gptroles.ai.engines.orto.sections.sections import (
    Section,
    SectionProperties,
    UriParams,
    UriParamsProperties,
    OrtoUriParamsProperties,
    SectionFormat,
    SectionProvider,
)

header_template_spec = (
    "//|SH<provider_symbol> <section_format> | <params>{ \n\n<content> }"
)


section_orto_engine_docs_index = f"""

//  This is a table of contents and brief overview of the orto engine components,
//	each with a brief description or summary.
//  Details are provided in additional docs SECTIONS


This ENGINE describes SECTIONS, a structured interface for presenting data,
 which is how you will deliver all data contained in your messages.
Data includes markdown blocks, code blocks, tables, sets or any other data.

SECTIONS may also be provided by the user for memory, which you can update and use via the provided tools.
They consist of a SECTION HEADER and contains content.
They are designed to create a consistently structured and parseable format inside chat messages.

Here is a representation of the SECTION format as a template: {header_template_spec}
    It always begins with a header which always begins with the character `//|SH`
    followed by either the word `AI` or `USER`, denoting who provided the SECTION.
    followed by a section command name,
    optionally followed by params as an externally processed string on the same line, signified by a pipe `|`.
    ending with the SECTION opening signifier `{{`
    which contains the SECTION content that ends with a matching `}}`,

    Here are the parts of the header in the above template:
        <provider_symbol>: either the character `~` for a SECTION from the AI or the character `@` for a SECTION from the user
        <section_format> is a string representation of the name of the known format for the section, builtin formats include:
            class SectionFormat(str, Enum):
                MEMORY = "MEMORY"
                MEMORY_INDEX = "MEMORY_INDEX"

                DESCRIPTION = "DESCRIPTION"

                MARKDOWN = "MARKDOWN"
                CODE = "CODE"
                CSV = "CSV"

    Here is the function that generates the text that represents a SECTION in all messages:
    ```python
        class SectionProvider(str, Enum):
            AI = "~"
            USER = "@"

        @classmethod
        def to_section_text(
            cls,
            provider: SectionProvider,
            format: str,
            params: dict,
            content: str,
            params_maker=ParamsMakerType | None,
        ) -> SectionText:
            params_maker = params_maker or default_params_maker
            return f"//|SH{{SectionProvider(provider)}} {{format}} | {{params_maker(UriParamsProperties(**params))()}}{{ \n\n{{content}} }}"
    ```

    Here is an example of a section for a markdown code block

    ```example
    {
    Section(
        SectionProperties(
            provider=SectionProvider.AI,
            format=SectionFormat.MARKDOWN,
            params=OrtoUriParamsProperties(host="developer.command.orto", path_parts=["/en/docs/ENGINE/SECTION/index/examples"]),
            content='''```python
    print("hello world")
```'''
    ))()
    }
```



You ABSOLUTELY MUST PROVIDE ALL DATA in your response messages as SECTIONS with HEADERS at ALL TIMES.
You ABSOLUTELY MUST CONSIDER ALL DATA AND MEMORIES in incoming messages.

The SECTION HEADER signifies the beginning of a section and is ABSOLUTELY EXCLUSIVELY AND ALWAYS the FIRST LINE of all SECTIONS.

Each HEADER has a well defined format with a command and parameters, the header specification and further commands are in other provided SECTIONS.



Content directives:
    This is a loose hinting format for helping to direct and guide the request/inquiry process to the correct answer.
    These are commands provided in the content of REQUEST or RESPONSE SECTIONS that provide descriptions of or directions for their content.
    They are uppercase directives that help guide the inquiry, not related to engine commands, may be prefixed or postfixed with a character.

    IMPERATIVE<PRECEDENCE_VALUE>
        adds a requirement or guide for the inquiry they may include a PRECEDENCE_VALUE as a number which, greater number denoting greater importance

    DIRECTIVES is a final instruction, and is usually the final instruction before any optional guides.

    ~GUIDE:
        adds error handling and discovery to guide DIRECTIVES in any FRAMES, they can occur anywhere, and are optional.




Your primary goal is TO ANSWER THE INQUIRY by using tools to access and update MEMORY SECTIONS,
exploring all data and context sources that are available throughout in the MEMORY INDEX,
until finally providing a FINAL ANSWER response.
"""


# INITIAL ORTO SYSTEM COMMAND SECTION

section_docs_orto_system = Section(
    SectionProperties(
        provider=SectionProvider.AI,
        format=SectionFormat.DESCRIPTION,
        params=OrtoUriParamsProperties(
            host="developer.command.orto", path_parts=["/en/docs/ENGINE/index"]
        ),
        content=section_orto_engine_docs_index,
    )
)()


sections_orto_roles = [section_docs_orto_system]

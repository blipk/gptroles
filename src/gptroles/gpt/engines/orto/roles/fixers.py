from gptroles.gpt.engines.orto.sections.sections import (
    Section,
    SectionProperties,
    SectionType,
    SectionRequestCommand,
    SectionResponseCommand,
    UriParams,
    OrtoUriParamsProperties,
)


"""
Fixers genereat REQUEST messages that may be applied to your RESPONSES which will guide you to retry the RESPONSE with the suggested changes.
"""


def header_fixer(response_section_props: SectionProperties) -> list[Section]:
    fixer_request_contents = []

    if "/search_pattern/" in response_section_props.content:
        fixer_request_contents.append(
            "The header is not in the required format, please retry your last RESPONSE with that fixed"
        )

    fixer_sections: list[Section] = [
        Section(
            SectionProperties(
                type=SectionType.REQUEST,
                command=SectionRequestCommand.INQUIRY,
                params=OrtoUriParamsProperties(
                    host="developer.command.orto", path_parts=["/en/helpers/fixer"]
                ),
                content=content,
            )
        )()
        for content in fixer_request_contents
    ]

    return fixer_sections


fixers = [header_fixer]

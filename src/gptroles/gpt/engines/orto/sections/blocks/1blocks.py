blocks = """


BLOCKS are resources represented embedded in SECTIONS that are in the following format:

``~ memory[named]
``E code<nodejs|python|bash>
``| object<my_type>|link|markdown[optional_tag,list]|html[table, sales_report]
{content}
`~`

BLOCKS occur anywhere inside a REQUEST or RESPONSE typed SECTION,

They always start with the opening literal ``
followed by a known block type character: ~, E, |.
followed by the BLOCK information for the type on the same opening line,
followed by their content, which is processed externally according to the type,
and ending with the literal `~ which is always wrapped in newlines.

BLOCKS are either of a NAMED MEMORY, ENVIRONMENT or DATA type.

Don't confuse them with markdown code blocks
which may occur in the content.

in a REQUEST SECTIONs the user will provide for you to use:
	- named memory blocks as context to help solve the inquiry
	- data blocks to provide further structured context
	- environment blocks may be considered too

in your RESPONSE SECTIONs you will provide for the user and application:
	- typed and optionally tagged data blocks to provide
		structure to data related to the inquiry answer:
		markdown, html, links, or typed object values.
	- environment code blocks that only contain valid code
		for the language or environment specified.
	- named memory blocks for tools or state	that might need updating on the users computer

"""

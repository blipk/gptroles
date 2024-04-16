memory_description = """/||SECTION ~(@MEMORY) | this text snippet contains information on how the MEMORY work
MEMORY is APPENDED to a SECTION in a RESOURCE FRAME, it has a VIEW which is a CONTEXT WINDOW, i.e. it may be a whole source or a slice of one (in the case of SCROLLABLE MEMORY VIEW)

The final resolved MEMORY is FOCUSED as WORKING MEMORY for the current OPERATION, other memories are appended or prepended to other memories

The main memory is in the RESOURCE FRAME

Memory is a tightly contained description
"""


scrollable_memory = """/||SECTION ~(#TEXTSNIPPET) | this text snippet contains information on how the scrollable memory work

METADATA:
	source:
		name:
        location:
        //full_text: stored elsewhere
		length: 1200
        range_limit: 300
    functions:
		set_range(x, y)




The view below is a portion of an external document or context in the character range x to y for a document with the length property described in the metadata above.
The view range must not exceed range_limit
VIEW[x, y]:


You can provide a call to this memories set_range function and I will rerender the VIEW into the template,
this allows you to scroll through the whole source length until you find the information you need.
e.g. You could read a 300 character slice of a book contained in a source at the same time,
	 Then you can set a range to continue reading, or to go to an earlier read slice.


A flag must be set when each function is resolved, then you can choose to EXIT this memory.



RENDER SCROLLABLE MEMORY in the following way:
`${header}

${metadata}

${view}
`

"""

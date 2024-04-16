def create_qa_snippet_tool(question, answer):
    tool = {
        "tool_name": "QASNIPPET",
        "tool_params": {"question": question, "answer": answer},
        "tool_template": lambda params: f"""QUESTION: {params['question']}
INQUIRY: {params['answer']}""",
        "tool_result": "",
        "tool_result_resolver": lambda: tool.update(
            {"tool_result": tool["tool_template"](tool["tool_params"])}
        ),
        "tool_header": lambda: f"@ANNOTATED_HEADER {tool['tool_name']}({tool['tool_params']['question']}, {tool['tool_params']['answer']})",
        "tool_resolver": lambda: (
            tool["tool_result_resolver"](),
            print(tool["tool_result"]),
        ),
    }

    return tool


# Example Usage
my_qa_snippet_tool = create_qa_snippet_tool("What is the capital of France?", "Paris")
my_qa_snippet_tool["tool_resolver"]()

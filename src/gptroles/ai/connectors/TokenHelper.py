import tiktoken

from streamlitextras.logger import log
from ai.prompts.schemas import default_openai_model


class TokenHelper:
    def __init__(self) -> None:
        pass

    @classmethod
    def calculate_token_length(cls, text: str, model: str | None = None) -> int:
        """Returns the number of tokens in a text string, for OpenAI models."""
        if not model:
            model = default_openai_model

        try:
            encoding = tiktoken.encoding_for_model(model)
        except KeyError:
            log.warning(
                f"Warning: model {model} not found. Using cl100k_base encoding."
            )
            encoding = tiktoken.get_encoding("cl100k_base")
        num_tokens = len(encoding.encode(text))
        return num_tokens

    @classmethod
    def calculate_functions_token_length(
        cls, functions: list | None, model: str | None = None
    ) -> int:
        """Returns the number of tokens used by a list of GPT functions."""
        if not functions:
            return 0

        if not model:
            model = default_openai_model

        try:
            encoding = tiktoken.encoding_for_model(model)
        except KeyError:
            log.warning(
                f"Warning: model {model} not found. Using cl100k_base encoding."
            )
            encoding = tiktoken.get_encoding("cl100k_base")

        num_tokens = 0
        for function in functions:
            function_tokens = len(encoding.encode(function["name"]))
            function_tokens += len(encoding.encode(function["description"]))

            if "parameters" in function:
                parameters = function["parameters"]
                if "properties" in parameters:
                    for propertiesKey in parameters["properties"]:
                        function_tokens += len(encoding.encode(propertiesKey))
                        v = parameters["properties"][propertiesKey]
                        for field in v:
                            if field == "type":
                                function_tokens += 2
                                function_tokens += len(encoding.encode(v["type"]))
                            elif field == "description":
                                function_tokens += 2
                                function_tokens += len(
                                    encoding.encode(v["description"])
                                )
                            elif field == "enum":
                                function_tokens -= 3
                                for o in v["enum"]:
                                    function_tokens += 3
                                    function_tokens += len(encoding.encode(o))
                            else:
                                log.warning(f"unsupported field: {field}")
                    function_tokens += 11

            num_tokens += function_tokens

        num_tokens += 12
        return num_tokens

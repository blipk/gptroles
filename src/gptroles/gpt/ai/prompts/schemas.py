from enum import Enum

default_openai_model = "gpt-4-1106-preview"


class AnswerDisplayModes(str, Enum):
    STANDARD = "standard"
    TABLE = "table"
    HTML = "html"
    HIDE = "hide"  # Used for when output is word doc only


class TaskTypes(str, Enum):
    STANDARD = "standard"
    CHAINED = "chained"


class TaskExtraInputType(str, Enum):
    STANDARD = "standard"
    TEMPLATED_ITEMS = "templated_items"
    FUNCTION = "function"

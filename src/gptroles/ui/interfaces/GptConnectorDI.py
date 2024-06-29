from typing import Any

from gptroles.ai.connectors.OpenAISettings import OpenAISettings
from gptroles.ai.connectors.connector import GptConnector


class GptConnectorDI:
    gpt_connector: GptConnector
    gpt_settings: OpenAISettings
    parent_prop_names = ["gpt_connector", "gpt_settings"]
    found_props: dict = {}

    def __init__(self, taker=None, parent=None) -> None:
        parent = parent or taker.parent() if hasattr(taker, "parent") else None
        if not parent:
            return None
        # print("INITIALIZE GPTDI", taker, parent)
        found_props = {}
        for prop_name in self.parent_prop_names:
            # print(prop_name, hasattr(parent, prop_name))
            if hasattr(parent, prop_name):
                parent_value = getattr(parent, prop_name)
                setattr(taker, prop_name, parent_value)
                found_props[prop_name] = parent_value

        self.found_props = found_props
        return None

    def __call__(self) -> list[GptConnector, OpenAISettings]:
        def dict_get(d: dict, *keys):
            for key in keys:
                yield d[key]

        return dict_get(self.found_props, *self.parent_prop_names)


class DIMixer:
    def __init__(self, di_classes=[GptConnectorDI]) -> None:
        for di_class in di_classes:
            setattr(self, di_class.__name__, di_class)

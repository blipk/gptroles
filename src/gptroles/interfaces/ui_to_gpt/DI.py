class RoleGptDI:
    def __init__(self, taker=None, parent=None) -> None:
        parent = parent or taker.parent()
        # print("INITIALIZE GPTDI", taker, parent)
        parent_prop_names = ["role_gpt", "gpt_settings"]
        for prop_name in parent_prop_names:
            # print(prop_name, hasattr(parent, prop_name))
            if hasattr(parent, prop_name):
                setattr(taker, prop_name, getattr(parent, prop_name))


class DIMixer:
    def __init__(self, di_classes=[RoleGptDI]) -> None:
        for di_class in di_classes:
            setattr(self, di_class.__name__, di_class)

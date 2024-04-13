class RoleGptDI:
    def __init__(self) -> None:
        parent = self.parent()
        print("INITIALIZE GPTDI", self, parent)
        self.rolegpt = None
        if hasattr(parent, "rolegpt"):
            self.rolegpt = parent.rolegpt

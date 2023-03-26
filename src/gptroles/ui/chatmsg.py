import time
import uuid

class ChatMessage:
    def __init__(self, user, text, mtime=None, id=None) -> None:
        self.user = user
        self.text = text
        self.id = id or str(uuid.uuid4())
        self.time = mtime or time.time()
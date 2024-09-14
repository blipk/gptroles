import time
import uuid


class ChatMessage:
    def __init__(self, username, content, receivedAt = None, id: str = None, isInContext: bool = True) -> None:
        self.username = username
        self.content = content
        self.id = id or str(uuid.uuid4())
        self.receivedAt = receivedAt or time.time()
        self.isInContext = isInContext


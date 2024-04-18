from enum import Enum

from streamlitextras.logger import log


class JobStatus(str, Enum):
    waiting: str = "waiting"
    queued: str = "queued"
    processing: str = "processing"
    completed: str = "completed"
    error: str = "error"


class EngineError:
    response_msg: str = (
        "An error occurred while processing your input, please try again later"
    )
    exception: str | dict | Exception | None = None

    def __init__(
        self,
        exception: Exception | None,
        response_msg: str | None = None,
        warn: bool = False,
        do_print: bool = True,
        exception_str: str | None = None,
    ) -> "EngineError":
        self.response_msg = response_msg or self.response_msg
        self.exception = exception
        self.exception_str = str(exception) if exception else exception_str

        if do_print:
            fn = log.warning if warn else log.error
            e_message = (
                str(exception._message)
                if hasattr(exception, "_message")
                else str(exception)
            )
            fn(f"EngineError: {response_msg} - {e_message}")

    @property
    def error(self) -> str:
        exception = self.exception
        e_message = (
            str(exception._message)
            if hasattr(exception, "_message")
            else str(exception)
        )
        return e_message

    def __repr__(self) -> str:
        return f"<EngineError: {self.response_msg} - {self.error}>"

    @property
    def serialized(self) -> dict:
        return dict(
            response_msg=self.response_msg,
            do_print=False,
            exception=None,  # self.exception,  # TODO: No serializer for exception types
            exception_str=self.exception_str,
        )

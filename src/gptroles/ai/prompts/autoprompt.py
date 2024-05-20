import re
import uuid
from dateutil import tz
from dataclasses import dataclass, astuple, is_dataclass
from datetime import datetime, timedelta
from typing import Any, Union

from pydantic import ConfigDict, BaseModel, validator, root_validator, field_validator

from streamlitextras.logger import log
from streamlitextras.utils import repr_

from core.models import TokenUse
from ai.parsers.inputs import InputParser
from ai.connectors.TokenHelper import TokenHelper
from ai.connectors.schemas import EngineError, Jurisdictions, jurisdiction_nationalities
from ai.prompts.manager import (
    prompt_manager,
    Role,
    RoleGroup,
    RoleTask,
    TaskTypes,
    TaskExtraInput,
    TaskExtraInputType,
)


@dataclass
class ProcessTime:
    """Start and end times whenever a AutoPromptChunk is processed"""

    start: datetime | None
    end: datetime | None


class AutoPrompt(BaseModel):
    """
    This class constructs prompts from Role's and RoleTasks,
    and transfers and records their usage with the AI services.

    It automatically splits the input_text by chunk_length,
     and creates a chain of this class instances in the `previous` and `next` attributes.
     This chain is used by the Manager class to stream the chain chunks to the AI API services,
     either sequentially [TODO or asynchronously]
    """

    # Internal properties/options
    uid: uuid.UUID
    created_at: datetime  # set in __init__
    job: Any | None = None  # Job - doesn't get reserialized
    job_uid: str | uuid.UUID | None = None
    # This is set when creating a chain from a RoleTask with multiple `task_prompts`
    task_prompt_key: str = "default"
    target_extra_input: TaskExtraInput | None = None

    # Chain of AutoPromptChunk for stream processing
    previous: None = None
    next_item: Union["AutoPrompt", "AutoPromptChunk", None] = None

    # Service inputs from user
    chunk_length: int | None = 4550 * 16
    role: Role | RoleGroup
    task: RoleTask
    input_text: str | list | dict  # TODO Create a setter for this that handles the dict
    extra_inputs: list[TaskExtraInput] | None = (
        None  # These are applied to input_text_dict
    )
    output_language: str = "English"
    jurisdiction: Jurisdictions | None = None  # Is set on mainpage

    # Service input and outputs
    input_args: dict | None = None  # The arguments given to OpenAI or Anthropic
    answers: dict = {}  # Answer dictionary keyed by `task_prompt_key``
    answer_model: BaseModel | None = None
    response: dict | BaseModel | None = None  # Response from service
    error: EngineError | None = None  # Exception if service failed
    token_use: TokenUse | None = None

    # Start and end times whenever prompt processed
    process_times: list[ProcessTime] = []

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @property
    def metadata(
        self,
    ) -> tuple[
        float,
        dict | None,
        dict | None,
        str | None,
        Jurisdictions | None,
        dict[str, str],
    ]:
        """Serialized metadata to be saved with TokenUse"""
        return (
            self.created_at.timestamp(),
            self.role.model_dump(include={"role_name", "prompt", "model"}),
            (
                self.task.model_dump(
                    include={"task_name", "task_info", "task_model", "prompt"}
                )
                if self.task
                else None
            ),
            self.output_language,
            Jurisdictions(self.jurisdiction).value if self.jurisdiction else None,
            {
                str((pt_tuple := astuple(pt))[0].timestamp()): str(
                    pt_tuple[1].timestamp() if type(pt_tuple[1]) is datetime else 0
                )
                for pt in self.process_times
            },
        )

    def __repr__(self) -> str:
        return f"<{str(self.uid)[:8]}:{hex(id(self))}, {self.token_length, bool(self.answer)}, {bool(self.error)}>"

    def visualize(
        self, show_task_prompt: bool = False, show_full_input_text: bool = False
    ) -> str:
        return (
            f"<{str(self.uid)[:8]}:{hex(id(self))}, {self.task_prompt_key}, {self.answer_key_tuple[1]}, {self.target_extra_input.name if self.target_extra_input else None}>  \n  "
            + (
                f"INPUT_TEXT ({len(self.input_text_dict['input_text'])}):  \n  {self.input_text_dict['input_text'][:None if show_full_input_text else 250]}  \n  "
            )
            + (
                f"PROMPT:  \n  {self.create_task_prompt()}  \n  "
                if show_task_prompt
                else ""
            )
            + ("ANSWER: " + self.answer if self.answer else "")
        )

    def __init__(self, **data: dict) -> dict:
        data["uid"] = data.get("uid", None) or uuid.uuid4()
        data["created_at"] = data.get("created_at", None) or datetime.now(tz.UTC)

        # Recreate these due to generic reserialization of dataclasses
        if "process_times" in data:
            data["process_times"] = [
                ProcessTime(pt.start, pt.end) for pt in data["process_times"]
            ]

        super().__init__(**data)

    def clear_chunk_chain(self) -> None:
        for c in self.get_chain():
            c.next_item = None
            c.previous = None
            if c is not self:
                del c

    def create_clauses_chunk_chain(self, clauses_per_chunk: int = 10) -> None:
        self.clear_chunk_chain()

        if type(self.input_text) is dict:
            text_to_chunk = self.input_text["input_text"]
        else:
            text_to_chunk = self.input_text

        delimiter = "\nC: "
        clauses = text_to_chunk.split(delimiter)
        clauses = [
            delimiter + delimiter.join(clauses[i : i + clauses_per_chunk])
            for i in range(0, len(clauses), clauses_per_chunk)
        ]

        next_prompt_chunk = self
        next_prompt_chunk_data = next_prompt_chunk.__dict__.copy()
        for clause in clauses:
            if type(self.input_text) is dict:
                next_prompt_chunk_data["input_text"]["input_text"] = clause
            else:
                next_prompt_chunk_data["input_text"] = clause
            next_prompt_chunk = next_prompt_chunk.next_init(next_prompt_chunk_data)
            next_prompt_chunk_data = next_prompt_chunk.__dict__.copy()

        whole_chain = self.get_chain()

        log.info(
            f"Created clause chain with {len(whole_chain)} items with {clauses_per_chunk} clauses each"
        )

    def create_chunk_chain(self) -> None:
        """
        This creates a chain of AutoPrompts by splitting the `input_text` based on `chunk_length`,
        as well as based on tasks with multiple prompts.

        This chain is used to perform sequential calls to the API services.
        """
        # TODO: Smarter chunking that checks token length against model,
        # split docx by paragraph chunks, or pdf by page etc

        self.clear_chunk_chain()

        chunk_length = self.chunk_length
        text_to_chunk = self.input_text_dict["input_text"]
        text_chunks = InputParser.chunk_text(text_to_chunk, chunk_length)
        chunks_and_keys = [
            dict(
                task_prompt_key="default",
                text_chunk=text_chunk,
                extra_input=None,
                extra_input_item=None,
            )
            for text_chunk in text_chunks
        ]

        # print(text_chunks)
        # print("AA", len(text_chunks), chunk_length)

        # When in `CHAINED` mode, we need to split based on each of the `task_prompts`` as well as the input_text.
        # This will run the task_prompts[] sequentially and provide the inputs/outputs to eachother through the `all_answers`` dict
        log.info(f"Creating chain {self.task.task_type, len(self.extra_inputs)}")
        if self.task.task_type == TaskTypes.CHAINED:
            chunks_and_keys = []
            for task_prompt_key in self.task.task_prompts.keys():
                log.debug(f"Scanning task_prompt_key: {task_prompt_key}")
                for extra_input in self.extra_inputs:
                    log.debug(
                        f"extra_input: {extra_input.name, extra_input.selected, extra_input.type, extra_input.value}"
                    )
                    if (
                        not extra_input.selected
                        or extra_input.type == TaskExtraInputType.STANDARD
                    ):
                        continue

                    for text_chunk in text_chunks:
                        log.debug(f"Adding text chunk to {extra_input.name}")
                        chunks_and_keys.append(
                            dict(
                                task_prompt_key=task_prompt_key,
                                text_chunk=text_chunk,
                                extra_input=extra_input,
                            )
                        )

        # log.debug(f"Chunk data length: {len(chunks_and_keys)}")
        if len(chunks_and_keys) == 1 and not self.task.task_type == TaskTypes.CHAINED:
            # log.debug("AutoPrompt doesnt need splitting")
            return

        next_prompt_chunk = self
        next_prompt_chunk_data = next_prompt_chunk.__dict__.copy()
        for data in chunks_and_keys:
            text_chunk = data["text_chunk"]
            task_prompt_key = data["task_prompt_key"]
            extra_input = data.get("extra_input", None)
            extra_input_item = data.get("extra_input_item", None)

            task_prompt_key = task_prompt_key.rstrip("_")
            next_prompt_chunk_data["task_prompt_key"] = task_prompt_key
            next_prompt_chunk_data["target_extra_input"] = extra_input

            if type(self.input_text) is dict:
                next_prompt_chunk_data["input_text"]["input_text"] = text_chunk
            else:
                next_prompt_chunk_data["input_text"] = text_chunk

            # Pydantic reserialization
            next_prompt_chunk_data["task"] = next_prompt_chunk_data["task"].model_copy()
            next_prompt_chunk_data["role"] = next_prompt_chunk_data["role"].model_copy()

            next_prompt_chunk = next_prompt_chunk.next_init(next_prompt_chunk_data)
            next_prompt_chunk_data = next_prompt_chunk.__dict__.copy()

        whole_chain = self.get_chain()
        log.info(
            f"Created AutoPrompt chain with {len(whole_chain)} chunks (size: {chunk_length})"
        )

    def set_model_name(self, model_name: str) -> str:
        self.task.task_model = model_name
        for c in self.get_chain():
            c.task.task_model = model_name
        return model_name

    @property
    def model_name(self) -> int:
        role_model = self.role.model
        task_model = self.task.task_model
        model = task_model or role_model
        return model

    @property
    def model_max_tokens(self) -> int:
        model_name = self.model_name
        base_tokens = 8000
        if "16k" in model_name:
            model_max_tokens = base_tokens * 2
        elif "32k" in model_name:
            model_max_tokens = base_tokens * 4
        elif "64k" in model_name:
            model_max_tokens = base_tokens * 8
        elif "128k" in model_name:
            model_max_tokens = base_tokens * 16
        elif "gpt-4-1106" in model_name:
            model_max_tokens = base_tokens * 16
        elif "anthropic" in model_name:
            model_max_tokens = 85000
        else:
            model_max_tokens = 8192
        model_max_tokens = int(model_max_tokens)
        return model_max_tokens

    @property
    def destructured(self) -> tuple[str, str, str, str, str, str, str, str]:
        """Destructure chunk properties when using elsewhere."""
        input_text = self.input_text
        role_prompt = self.role.role_prompt
        task_name = self.task.task_name
        task_prompt = self.target_task_prompt
        task_prompt_secondary = self.task.prompt_secondary
        task_functions = self.task.functions
        language = self.output_language
        jurisdiction = self.jurisdiction
        role_model = self.role.model
        task_model = self.task.task_model
        model = self.model_name

        return (
            input_text,
            role_prompt,
            task_name,
            task_prompt,
            task_prompt_secondary,
            task_functions,
            language,
            jurisdiction,
            model,
        )

    def get_chain(
        self,
        include_previous: bool = True,
        include_next: bool = True,
        include_self: bool = True,
        remove_references: bool = False,
    ) -> list["AutoPromptChunk"]:
        """Construct the entire prompt_chain to a list. Always includes self."""
        chain: list["AutoPrompt", "AutoPromptChunk"] = []

        previous = self if include_self else self.previous
        while previous:
            chain.insert(0, previous)
            current = previous
            previous = current.previous if include_previous else None
            if previous and previous != current:
                previous.next_item = current
                current.previous = previous

        chain.reverse()

        if include_next:
            next_item = self.next_item
            while next_item:
                chain.append(next_item)
                current = next_item
                next_item = current.next_item
                if next_item and next_item != current:
                    next_item.previous = current
                    current.next_item = next_item

        if remove_references:
            for i, c in enumerate(chain):
                chain[i] = c.model_copy(
                    update={"next_item": None, "previous": None, "job": None}
                )

        return chain

    def construct_chain(
        self, whole_prompt_chain: list["AutoPromptChunk", "AutoPrompt"]
    ) -> "AutoPrompt":
        """Reconstruct the next_item and previous properties from a list, in order"""

        for i, _prompt_chain_item in enumerate(whole_prompt_chain):
            if i < len(whole_prompt_chain) - 1 and i - 1 >= 0:
                whole_prompt_chain[i].previous = whole_prompt_chain[i - 1]
            if i < len(whole_prompt_chain) - 1:
                whole_prompt_chain[i].next_item = whole_prompt_chain[i + 1]
            # if _prompt_chain_item == self:
            #     log.info(f"Self in chain {bool(_prompt_chain_item.previous)} {bool(_prompt_chain_item.next_item)}")

        # log.info(f"Rebuilt prompt chain with length: {len(self.get_chain())} from length {len(whole_prompt_chain)}")
        return self

    @property
    def answer_key_tuple(self) -> tuple[str, str]:
        target_extra_input_key = (
            self.target_extra_input.name.replace(" ", "")
            if self.target_extra_input
            else str(None)
        )
        return (self.task_prompt_key, target_extra_input_key)

    def get_answer_key(self, prompt_chain: "AutoPrompt") -> str:
        task_prompt_key, target_extra_input_key = prompt_chain.answer_key_tuple
        return f"{task_prompt_key}_{target_extra_input_key}"

    @property
    def answer_key(self) -> str:
        return self.get_answer_key(self)

    @property
    def answer(self) -> str:
        return self.answers.get(self.answer_key, None)

    @property
    def answers_dict(self) -> str:
        """
        Returns a dict of answers by task_prompt_key and target_extra_input_key
        """
        answers_dict = {}
        for c in self.get_chain():
            task_prompt_key, target_extra_input_key = c.answer_key_tuple
            if task_prompt_key not in answers_dict:
                answers_dict[task_prompt_key] = {}
            answers_dict[task_prompt_key][target_extra_input_key] = c.answer
        return answers_dict

    @answer.setter
    def answer(self, value: str | dict) -> None:
        self.answers[self.answer_key] = value

    @property
    def chained_answer(self) -> str:
        """All the chunk answers joined together"""
        previous = self
        answers = []
        while previous:
            answers.append(previous.answer)
            previous = previous.previous
        return "".join(list(reversed([str(answer) for answer in answers])))

    @property
    def all_answers(self) -> dict[str, Any]:
        """Joins all dict type answers in the chain"""
        chain = self.get_chain()
        all_answers = {}
        for c in chain:
            all_answers |= c.answers
        return all_answers

    @property
    def first(self) -> "AutoPromptChunk":
        chain = self.get_chain(include_next=False)
        first = chain[0]
        # assert (
        #     type(first) is AutoPrompt
        # ), "First Chunk isn't AutoPrompt"
        return first

    @property
    def first_answered(self) -> Union["AutoPromptChunk", None]:
        chain = self.get_chain()
        for item in chain:
            if item.answer:
                return item
        return None

    @property
    def last_answered(self) -> Union["AutoPromptChunk", None]:
        chain = self.get_chain()
        answered = None
        for item in chain:
            if item.answer:
                answered = item
        return answered

    @property
    def all_have_answers(self) -> bool:
        chain = self.get_chain()
        if len(chain) == 1:
            return bool(chain[0].answer)

        for i, c in enumerate(chain):
            if i == 0:
                continue  # First item is not processed when streaming
            if not bool(c.answer):
                return False

        return True

    @property
    def first_errored(self) -> "AutoPromptChunk":
        chain = self.get_chain()
        for item in chain:
            if item.error:
                return item
        return None

    @property
    def last_errored(self) -> "AutoPromptChunk":
        chain = self.get_chain()
        errored = None
        for item in chain:
            if item.error:
                errored = item
        return errored

    @property
    def last(self) -> "AutoPromptChunk":
        chain = self.get_chain(include_previous=False)
        last = chain[-1]
        assert last.next_item is None, "Last AutoPromptChunk has next_item"
        return last

    @property
    def next_or_clone(self) -> "AutoPromptChunk":
        """Return existing or new unanswered chunk"""
        next_item = self.next_item or AutoPromptChunk(
            **self.__dict__ | dict(answers={}, previous=self, uid=None)
        )
        self.next_item = next_item
        return next_item

    def next_init(self, properties: dict) -> "AutoPromptChunk":
        """Initialize new next chunk"""
        assert (
            self.next_item is None
        ), "Tried to initialize next prompt chunk when one exists"

        if type(self) is AutoPrompt and len(self.__dict__) == 0:
            self = AutoPrompt(**properties)

        required = dict(answers={}, previous=self, uid=None)
        init_args = properties | required

        next_item = self.model_copy(update=init_args)

        self.next_item = next_item
        return next_item

    def last_init(self, properties: dict) -> "AutoPromptChunk":
        """Initialize new next chunk"""
        last_item = self.last

        return last_item.next_init(properties)

    @property
    def chain_token_length(self) -> int:
        previous = self
        primary_prompts = []
        aux_prompts = []
        while previous:
            primary_prompts.append(previous.token_length)
            aux_prompts.append(previous.token_length_aux)
            previous = previous.previous

        _aux_prompts_count = sum(aux_prompts)
        _primary_prompts_count = sum(primary_prompts)
        chain_token_length = primary_prompts[-1] + sum(aux_prompts[:-1])
        return chain_token_length

    @property
    def token_length(self) -> int:
        return self.token_length_functions + TokenHelper.calculate_token_length(
            self.role.role_prompt + self.user_prompt, self.model_name
        )

    @property
    def token_length_aux(self) -> int:
        task_prompt = self.task.task_prompts.get(
            self.task_prompt_key, self.task.task_prompt
        )
        return self.token_length_functions + TokenHelper.calculate_token_length(
            self.role.role_prompt
            + task_prompt.replace("{input_text}", "").replace(":", "")
            + self.user_prompt_aux,
            self.model_name,
        )

    @property
    def token_length_functions(self) -> int:
        return TokenHelper.calculate_functions_token_length(
            self.task.functions, self.model_name
        )

    @property
    def target_task_prompt(self) -> str:
        return self.task.task_prompts.get(self.task_prompt_key, self.task.task_prompt)

    @property
    def input_text_dict(self) -> dict:
        input_text = self.input_text
        input_text_dict = {"input_text": "", "input_texts": []}

        if type(input_text) is str:
            input_text_dict["input_text"] = input_text
        elif type(input_text) is list:
            input_text_dict["input_text"] = ""
            input_text_dict["input_texts"] = input_text
        elif type(input_text) is dict:
            input_text_dict["input_text"] = input_text["input_text"]  # Required
            input_text_dict |= input_text

        if self.extra_inputs:
            for input_item in self.extra_inputs:
                input_text_dict[input_item.name] = input_item.value

        return input_text_dict

    @property
    def system_prompt(self) -> str:
        return self.create_system_prompt()

    @property
    def user_prompt(self) -> str:
        return self.create_task_prompt()

    @property
    def user_prompt_aux(self) -> str:
        return self.create_task_aux_prompt()

    def create_system_prompt(
        self, prompt_chain: Union["AutoPromptChunk", None] = None
    ) -> str:
        if not prompt_chain:
            prompt_chain = self

        (
            input_text,
            role_prompt,
            task_name,
            task_prompt,
            task_prompt_secondary,
            task_functions,
            language,
            jurisdiction,
            model,
        ) = prompt_chain.destructured

        system_prompt = role_prompt.replace(
            "{jurisdiction}", jurisdiction or "Australia"
        )
        system_prompt = role_prompt.replace(
            "{jurisdiction_nationality}",
            jurisdiction_nationalities.get(jurisdiction, "Australian"),
        )

        system_prompt += f" You must provide your answer in the language: {language}."

        return system_prompt

    def create_task_prompt(
        self, prompt_chain: Union["AutoPromptChunk", None] = None
    ) -> str:
        if not prompt_chain:
            prompt_chain = self

        single_task_prompt = self.template_input_prompt(
            prompt_chain.target_task_prompt, prompt_chain
        )
        return single_task_prompt

    def create_task_aux_prompt(
        self, prompt_chain: Union["AutoPromptChunk", None] = None
    ) -> str:
        if not prompt_chain:
            prompt_chain = self

        task_prompt_secondary = self.template_input_prompt(
            prompt_chain.task.prompt_secondary, prompt_chain
        )
        return task_prompt_secondary

    @classmethod
    def template_input_prompt(
        cls, input_prompt: str, prompt_chain: "AutoPrompt"
    ) -> str:
        (
            input_text,
            role_prompt,
            task_name,
            task_prompt,
            task_prompt_secondary,
            task_functions,
            language,
            jurisdiction,
            model,
        ) = prompt_chain.destructured
        input_text_dict = prompt_chain.input_text_dict

        last_answered = prompt_chain.last_answered

        input_prompt = input_prompt.replace(
            "{last_answer}",
            (
                last_answered.answer[:500]
                if last_answered and last_answered.answer
                else ""
            ),
        )

        input_prompt = input_prompt.replace(
            "{jurisdiction}", jurisdiction or "Australia"
        )
        input_prompt = input_prompt.replace(
            "{jurisdiction_nationality}",
            jurisdiction_nationalities.get(jurisdiction, "Australian"),
        )

        # Apply any list extra_inputs[]
        for text in input_text_dict["input_texts"]:
            input_prompt = input_prompt.replace("{input_text}", text, 1)

        input_prompt = input_prompt.replace(
            "{input_text}", input_text_dict["input_text"]
        )

        # Apply any dict extra_inputs{}
        for text_key, text in input_text_dict.items():
            if type(text) is not str:
                continue  # input_texts

            # text = re.escape(text)

            current_key = f"""{{input_text\\[["']?{re.escape(text_key)}["']?\\]}}"""
            try:
                input_prompt = re.sub(
                    current_key,
                    re.escape(text),
                    input_prompt,
                )
            except re.error as e:
                log.debug(f"Regex Error {e}")
                log.debug(f"current_key: {current_key}")
                log.debug(f"text: {text}")
                raise e

        if prompt_chain.extra_inputs:
            for extra_input in prompt_chain.extra_inputs:
                extra_input: TaskExtraInput
                extra_input_key = re.escape(
                    extra_input.key.replace("{item}", extra_input.name.replace(" ", ""))
                    if extra_input.key
                    else extra_input.name.replace(" ", "")
                )

                input_prompt = re.sub(
                    "{item}",
                    (
                        prompt_chain.target_extra_input.name.replace(" ", "")
                        if prompt_chain.target_extra_input
                        else "{item}"
                    ),
                    input_prompt,
                )

                input_prompt = re.sub(
                    f"""{{input_text\\[["']?{extra_input_key}["']?\\]}}""",
                    extra_input.value,
                    input_prompt,
                )
                input_prompt = re.sub(
                    f"""{{{extra_input_key}.value}}""",
                    extra_input.value if extra_input.value else "",
                    input_prompt,
                )
                input_prompt = re.sub(
                    f"""{{{extra_input_key}.description}}""",
                    extra_input.description if extra_input.description else "",
                    input_prompt,
                )
                input_prompt = re.sub(
                    f"""{{{extra_input_key}.key}}""",
                    extra_input.key if extra_input.key else "",
                    input_prompt,
                )
                input_prompt = re.sub(
                    f"""{{{extra_input_key}.name}}""",
                    extra_input.name,
                    input_prompt,
                )

        # Apply any answers from other items in `task_prompts[]`
        for answer_key, answer in prompt_chain.all_answers.items():
            if type(answer) is not str:
                continue
            input_prompt = re.sub(
                f'{{{answer_key.replace("_None", "")}}}', answer, input_prompt
            )

            answer_task_prompt_key, answer_target_extra_input_key = answer_key.split(
                "_"
            )

            template_target = f"""{{{answer_task_prompt_key}\\[["']?{answer_target_extra_input_key}["']?\\]}}"""
            input_prompt = re.sub(
                template_target,
                answer,
                input_prompt,
            )

        return input_prompt


class AutoPromptChunk(AutoPrompt):
    """This is a chunk in the AutoPrompt chain, i.e. not the first"""

    previous: Union["AutoPrompt", "AutoPromptChunk", None] = (
        None  # None allowed in serialization
    )

    # def __init__(self, **data: dict) -> dict:
    #     data["auto"] = False
    #     super().__init__(**data)

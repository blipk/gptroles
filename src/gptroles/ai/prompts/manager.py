import os
import re
import yaml
from typing import Any
from collections.abc import Callable
from functools import lru_cache

from pydantic import BaseModel, field_validator, model_validator

from streamlitextras.logger import log

from gptroles.appsettings import settings
from ai.prompts.typing import TasksDictT
from ai.parsers.inputs import (
    DocxExtractionMethods,
    InputParser,
    default_docx_extraction_method,
)
from ai.prompts.schemas import (
    AnswerDisplayModes,
    TaskTypes,
    TaskExtraInputType,
    default_openai_model,
)


class TaskExtraInput(BaseModel):
    name: str
    display_text: str
    input_display_text: str | None = None
    type: TaskExtraInputType = TaskExtraInputType.STANDARD
    key: str | None = None
    required: bool = True
    items: dict[str, str] | None = None
    # ui_input_type: DeltaGenerator = st.text_input
    ui_input_type: str = "text_input"
    description: str | None = None
    value: str | None = None
    selected: bool = False

    @model_validator(mode="after")
    @classmethod
    def task_extra_input_validator(cls, values: dict[str, Any]) -> dict:
        if type(values) is dict:
            values["input_display_text"] = (
                values["input_display_text"] or values["display_text"]
            )
        else:
            values.input_display_text = values.input_display_text or values.display_text

        return values


class RoleTask(BaseModel):
    """This represents a task, which is a user prompt for the AI model"""

    role_name: str
    task_name: str
    task_type: TaskTypes = TaskTypes.STANDARD
    task_info: str | None = None
    task_model: str | None = default_openai_model
    task_prompts: dict[str, str]
    prompt_secondary: str | None = None
    functions: list[dict] | None = None
    extra_inputs: list[TaskExtraInput] | None = None
    answer_display_mode: AnswerDisplayModes = AnswerDisplayModes.STANDARD
    allowed_file_formats: list = InputParser.supported_formats
    docx_extraction_method: DocxExtractionMethods = default_docx_extraction_method

    answer_function_name: str | None = None
    extra_input_function_name: str | None = None
    response_model_name: str | None = None
    hide_word_document: bool = False

    @property
    def response_model(self) -> BaseModel | None:
        if not self.response_model_name:
            return None
        imported_module = __import__(
            "config.prompts.response_models", fromlist=[self.response_model_name]
        )
        class_reference = getattr(imported_module, self.response_model_name)
        return class_reference

    @property
    def answer_function(self) -> Callable | None:
        from config.prompts.answer_functions import answer_functions

        answer_function = answer_functions.get(self.answer_function_name, None)
        if self.answer_function_name is not None and not answer_function:
            log.error(f"Could not find answer_function `{self.answer_function_name}`")
        return answer_function

    @property
    def extra_input_function(self) -> Callable | None:
        from config.prompts.extra_input_functions import extra_input_functions

        extra_input_function = extra_input_functions.get(
            self.extra_input_function_name, None
        )
        if not extra_input_function:
            log.error(
                f"Could not find extra_input_function `{self.extra_input_function_name}`"
            )
        return extra_input_function

    @field_validator("prompt_secondary", mode="after")
    def get_prompt_secondary(cls, v: str | None) -> bool:  # noqa: ARG003
        return (
            v
            or """
            You are performing the task from the previous message in chunks and have just provided this last answer: {last_answer}.
            Now continue to do that incorporating your existing answer with the new answer on the continuation of the text content here: {input_text}
        """
        )

    @property
    def task_prompt(self) -> str:
        return self.task_prompts.get("default", list(self.task_prompts.values())[0])

    @property
    def extra_inputs_templated(self) -> list[TaskExtraInput]:
        if not self.extra_inputs:
            return None

        extra_inputs_templated = []
        template_placeholder = r"\{items?\}"
        for input_item in self.extra_inputs:
            input_type: str = input_item.type

            if input_type != TaskExtraInputType.TEMPLATED_ITEMS:
                extra_inputs_templated.append(input_item)
                continue

            items = input_item.items
            key = input_item.key

            if not items or not key:
                raise ValueError(
                    "extra_inputs with type:templated_items requires an `items` key and a `key` key"
                )

            for input_name, input_description in items.items():
                item_key = re.sub(template_placeholder, key, input_item.name)
                extra_inputs_templated.append(
                    input_item.model_copy(
                        update=dict(
                            name=re.sub(
                                template_placeholder, input_name, input_item.name
                            ),
                            display_text=re.sub(
                                template_placeholder,
                                input_name,
                                input_item.display_text,
                            ),
                            input_display_text=re.sub(
                                template_placeholder,
                                input_name,
                                input_item.input_display_text,
                            ),
                            key=item_key,
                            description=input_description,
                            ui_input_type=input_item.ui_input_type or "text_area",
                        )
                    )
                )

        return extra_inputs_templated


class Role(BaseModel):
    """
    This is a 'role' which represents an OpenAI system prompt,
    or otherwise root prompt in other systems
    """

    role_name: str
    role_prompt: str
    model: str | None = None


class RoleGroup(Role):
    """
    This is a Role with its associated tasks
    """

    tasks: list[RoleTask]
    display: bool = True
    display_priority: int = 0
    icon: str

    @property
    def tasks_by_name(self) -> dict[str, RoleTask]:
        return {task.task_name: task for task in self.tasks}

    def task_from_name(self, task_name: str) -> dict[str, RoleTask]:
        return self.tasks_by_name[task_name]


class PromptManager:
    """
    This class reads specified .yml files and constructs RoleTask's and RoleGroups for them
    """

    _roles_raw: dict[str, str | TasksDictT] = {}
    roles: dict[str, RoleGroup] = {}  # By role_name

    def __init__(self, roles: dict[str, RoleGroup] | None = None) -> None:
        if roles:
            self.roles = roles
        else:
            self.load_text_files()

    def clean_task_prompts(self) -> None:
        # Remove any secondaries that are same as first
        for role_name in self._roles_raw:
            role = self._roles_raw[role_name]
            for task_name, task_values in role["tasks"].items():
                task_prompt = task_values["task_prompt"]
                task_prompt_secondary = task_values.get("task_prompt_secondary", None)
                if task_prompt_secondary == task_prompt:
                    log.warning(
                        f"Deleting task_prompt_secondary for {role_name}: {task_name}"
                    )
                    self._roles_raw[role_name]["tasks"][task_name][
                        "task_prompt_secondary"
                    ] = None
                    del self._roles_raw[role_name]["tasks"][task_name][
                        "task_prompt_secondary"
                    ]
        self.save_text_files()

    @property
    def roles_display(self) -> dict[str, RoleGroup]:
        sorted_roles = sorted(
            self.roles.items(), key=lambda x: (-x[1].display_priority, x[0])
        )
        return {role_name: role for role_name, role in sorted_roles if role.display}

    @property
    def all_tasks_by_name(self) -> dict[str, RoleTask]:
        all_roles = self.roles.values()
        all_tasks = sum([role.tasks for role in all_roles], [])
        return {task_class.task_name: task_class for task_class in all_tasks}

    @lru_cache(maxsize=32555)
    def load_text_files(self) -> dict:
        """
        Load prompt text file categories into class memory
        """
        roles_raw = {}
        role_files = sorted(
            [
                f
                for f in os.listdir(settings.prompts_path)
                if os.path.basename(f).endswith(".yml")
                or os.path.basename(f).endswith(".yaml")
            ]
        )

        for role_file in role_files:
            with open(os.path.join(settings.prompts_path, role_file)) as f:
                role_file_contents: dict[str, str] = yaml.safe_load(f)

            # Required
            role_tasks_raw: TasksDictT = role_file_contents["tasks"]
            role_name = role_file_contents["role_name"]
            role_name = role_name.replace("_", " ").strip()
            role_prompt = role_file_contents["role_prompt"]

            # Optional
            tasks_type = TaskTypes(
                role_file_contents.get("tasks_type", TaskTypes.STANDARD)
            )
            display_priority = role_file_contents.get("display_priority", 0)
            display_role: bool = role_file_contents.get("display", True)
            engine: str = role_file_contents.get("model", "openai")
            model: str = role_file_contents.get("model", default_openai_model)
            icon: str = role_file_contents.get("icon", "")

            def process_task(
                task_name: str,
                task_values: dict,
                role_name: str = role_name,
                tasks_type: TaskTypes = tasks_type,
            ) -> RoleTask:
                task_prompt = task_values.get("task_prompt", None)
                task_prompts = task_values.get("task_prompts", None)

                if not task_prompt and not task_prompts:
                    raise ValueError(
                        "Role/Task file requires tasks list or task_prompt"
                    )

                if task_prompt and task_prompts:
                    raise ValueError(
                        "Role/Task file can't contain both tasks with task_prompt and a list of tasks"
                    )

                if task_prompt:
                    task_prompts = {"default": task_prompt}

                task_type = TaskTypes(task_values.get("task_type", tasks_type))

                task_info = task_values.get("task_info", None)
                task_model = task_values.get("task_model", None)
                if task_info:
                    task_info = task_info.replace("\\n", "  \n  ")

                task_types = AnswerDisplayModes(
                    task_values.get("task_types", "standard").lower()
                )
                answer_display_mode = AnswerDisplayModes(
                    task_values.get("answer_display_mode", "standard").lower()
                )
                allowed_file_formats = task_values.get(
                    "allowed_file_formats", InputParser.supported_formats
                )
                docx_extraction_method = DocxExtractionMethods(
                    task_values.get(
                        "docx_extraction_method",
                        default_docx_extraction_method,
                    ).lower()
                )

                task_prompt_secondary = task_values.get("task_prompt_secondary", None)
                task_functions = task_values.get("task_functions", None)
                answer_function = task_values.get("answer_function", None)
                extra_input_function = task_values.get("extra_input_function", None)
                response_model_name = task_values.get("response_model", None)
                hide_word_document = task_values.get("hide_word_document", False)

                extra_inputs = task_values.get("extra_inputs", None)
                if extra_inputs:
                    extra_inputs = [TaskExtraInput(**i) for i in extra_inputs]

                role_task = RoleTask(
                    role_name=role_name,
                    task_name=task_name,
                    task_type=task_type,
                    task_info=task_info,
                    task_model=task_model,
                    task_prompts=task_prompts,
                    prompt_secondary=task_prompt_secondary,
                    functions=task_functions,
                    extra_inputs=extra_inputs,
                    answer_function_name=answer_function,
                    extra_input_function_name=extra_input_function,
                    answer_display_mode=answer_display_mode,
                    allowed_file_formats=allowed_file_formats,
                    docx_extraction_method=docx_extraction_method,
                    response_model_name=response_model_name,
                    hide_word_document=hide_word_document,
                )
                return role_task

            role_tasks: list[RoleTask] = []
            for task_name, task_values in role_tasks_raw.items():
                role_task = process_task(task_name, task_values)
                role_tasks.append(role_task)

            roles_raw[role_name] = role_file_contents
            role_group = RoleGroup(
                role_name=role_name,
                role_prompt=role_prompt,
                tasks=role_tasks,
                display=display_role,
                display_priority=display_priority,
                model=model,
                icon=icon,
            )
            self.roles[role_name] = role_group

        self._roles_raw = roles_raw
        return roles_raw

    def save_text_files(self) -> None:
        for role_name in self._roles_raw:
            role_file_contents = self._roles_raw[role_name]

            role_file = role_file_contents["role_name"] + ".yml"
            with open(os.path.join(settings.prompts_path, role_file), "w") as f:
                yaml.dump(role_file_contents, f)


prompt_manager = PromptManager()

from typing import NamedTuple, TypedDict


class TasksKeys(NamedTuple):
    prompt: str
    task_prompt_secondary: str


class RoleFileKeys(NamedTuple):
    role_name: str
    role_prompt: str
    tasks: str


TasksDictT = dict[TasksKeys, str]
RoleFileMetaSchemaT = dict[RoleFileKeys, str | TasksDictT]


class TasksDictT(TypedDict):
    prompt: str
    task_prompt_secondary: str


RoleFileMetaSchemaT = dict[RoleFileKeys, str | TasksDictT]

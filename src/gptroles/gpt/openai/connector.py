import subprocess
import time
import json
import openai
from os import getenv
from pprint import pprint
from gptroles.gpt.engines.root.engine_root import root_roles, role_confirmation
from PyQt6.QtWidgets import QWidget

from gptroles.gpt.openai.gpt_settings import GPTSettings


# models = sorted(openai.Model.list().data, key=lambda x: x.id)
# for model in models:
#     print(model)

from openai.types.chat.chat_completion_chunk import ChoiceDelta as ChatMessage


def run_shell(command, shell="bash", string_flag=None, autorun=False):
    if string_flag is None:
        string_flag = "-c"
    print("#running proc", command)
    p = subprocess.Popen(
        [shell, string_flag, command],
        shell=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    p.communicate()
    try:
        stdout, stderr = p.communicate(timeout=45 if autorun else 900)
    except subprocess.TimeoutExpired:
        stdout, stderr = p.stdout, p.stderr
        p.kill()
    print("#out", stdout, stderr)
    return stdout, stderr, p.returncode


class RoleGpt:
    prompt_chain: list[ChatMessage] = []

    def __init__(self, settings, roles: dict = root_roles, prompt_chain=None) -> None:
        self._settings = None
        self.gpt_settings = settings
        self.api_key = settings.OPENAI_API_KEY
        self.client = openai.OpenAI(api_key=self.api_key)

        self.system_role = roles["system"]
        self.other_roles = roles["other"]

        if prompt_chain:
            self.prompt_chain = prompt_chain

    @property
    def gpt_settings(self):
        return self._settings

    @gpt_settings.setter
    def gpt_settings(self, value):
        self._settings = value
        openai.api_key = value.OPENAI_API_KEY
        print("GPT Settings Updated")

    @property
    def api_key(self):
        return self._settings.OPENAI_API_KEY

    @api_key.setter
    def api_key(self, value):
        self._settings.OPENAI_API_KEY = value
        openai.api_key = value

    def change_api_key(self, api_key):
        openai.api_key = api_key

    def confirm_role(self):
        return self.ask(role_confirmation, prompt_chain=[], assistant_name="System")

    def clear_context(self):
        self.prompt_chain = []

    def ask(
        self,
        inquiry,
        prompt_chain=None,
        message_role="user",
        assistant_name="GPT",
        trim=1,
    ):
        # Root System Roles
        system_roles = [{"role": "system", "content": self.system_role}] + [
            {"role": "system", "content": other_role} for other_role in self.other_roles
        ]

        # Filter Prompt Chain
        prompt_chain = prompt_chain or self.prompt_chain
        prompt_chain = [
            m for m in prompt_chain if m.role in ("system", "assistant", "user")
        ]

        # Build messages from Prompt Chain
        messages = (
            system_roles
            + prompt_chain
            + [ChatMessage(**{"role": message_role, "content": inquiry})]
        )

        pprint(messages)

        try:
            response = self.client.chat.completions.create(
                **(self.gpt_settings.chatcompletion | dict(messages=messages)),
            )
        except openai.RateLimitError as e:
            print("Rate limit", e)
            return ("Error", str(e))
        except openai.AuthenticationError as e:
            print("Auth Error", e)
            return ("Error", str(e))
        except openai.APIError as e:
            print("API", e)
            return ("Error", str(e))
        # except openai.InvalidRequestError as e:
        #     print(e)
        #     if "maximum context length" in e._message:
        #         print("Trimming prompt", trim, len(prompt_chain))
        #         time.sleep(1.1)
        #         prompt_chain = prompt_chain[trim:-1]
        #         if len(prompt_chain) == 0:
        #             return ("Error", str(e))
        #         return self.ask(prompt, prompt_chain, message_role, trim=trim + 1)
        #     else:
        #         print(e)
        #         return ("Error", str(e))

        prompt_chain.append(response.choices[0].message)
        # pprint(response)
        print(
            f"{response.choices[0].message.role}: {response.choices[0].message.content.strip()}"
        )
        answer = response.choices[0].message.content.strip()
        if len(response.choices) > 1:
            pprint(response.choices)
        print(answer)
        return (assistant_name, answer)

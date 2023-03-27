import subprocess
import time
import json
import openai
import openai.error
from os import getenv
from pprint import pprint
from .prompts import system_role, gptroles, role_confirmation


# models = sorted(openai.Model.list().data, key=lambda x: x.id)
# for model in models:
#     print(model)

def run_shell(command, shell="bash", string_flag=None, autorun=False):
    if string_flag is None:
        string_flag = "-c"
    print("#running proc", command)
    p = subprocess.Popen([shell, string_flag, command], shell=False,
                         text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    p.communicate()
    try:
        stdout, stderr = p.communicate(timeout=45 if autorun else 900)
    except subprocess.TimeoutExpired:
        stdout, stderr = p.stdout, p.stderr
        p.kill()
    print("#out", stdout, stderr)
    return stdout, stderr, p.returncode


class RoleGpt():
    prompt_chain = []

    def __init__(self, settings, sub_roles, system_role=system_role, prompt_chain=None) -> None:
        self._settings = None
        self.settings = settings
        self.api_key = settings.OPENAI_API_KEY
        if type(sub_roles) == str:
            sub_roles = [sub_roles]
        self.sub_roles = sub_roles
        self.system_role = system_role
        if prompt_chain:
            self.prompt_chain = prompt_chain

    @property
    def settings(self):
        return self._settings

    @settings.setter
    def settings(self, value):
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

    def ask(self, prompt, prompt_chain=None, message_role=None, assistant_name="GPT", trim=1):
        if not message_role:
            message_role = "user"

        prompt_chain = prompt_chain or self.prompt_chain
        prompt_chain.append({"role": message_role, "content": prompt})
        print(f"{message_role}: {prompt[:200]}")
        # print(prompt_chain[1:])
        system_roles = [
            {"role": "system", "content": self.system_role}
        ] + [
            {"role": "system", "content": role}
            for role in self.sub_roles
        ]
        # pprint(system_roles)
        input_prompt_chain = [m for m in prompt_chain if m["role"] in ("system", "assistant", "user")]
        messages = system_roles + input_prompt_chain

        try:
            response = openai.ChatCompletion.create(
                **(self.settings.chatcompletion | dict(messages=messages)),
            )
        except openai.error.RateLimitError as e:
            print("Rate limit", e)
            return ("Error", str(e))
        except openai.error.AuthenticationError as e:
            print("Auth Error", e)
            return ("Error", str(e))
        except openai.APIError as e:
            print("API", e)
            return ("Error", str(e))
        except openai.InvalidRequestError as e:
            print(e)
            if "maximum context length" in e._message:
                print("Trimming prompt", trim, len(prompt_chain))
                time.sleep(1.1)
                prompt_chain = prompt_chain[trim:-1]
                if len(prompt_chain) == 0:
                    return ("Error", str(e))
                return self.ask(prompt, prompt_chain, message_role, trim=trim+1)
            else:
                print(e)
                return ("Error", str(e))

        prompt_chain.append(response.choices[0].message)
        # pprint(response)
        print(
            f"{response.choices[0].message.role}: {response.choices[0].message.content.strip()}")
        answer = response.choices[0].message.content.strip()
        if len(response.choices) > 1:
            pprint(response.choices)

        return (assistant_name, answer)


# rolegpt = RoleGpt(settings, coder_role, "")

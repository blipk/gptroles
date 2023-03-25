import subprocess
import time
import json
import openai
import openai.error
from os import getenv
from pprint import pprint
from gptroles.settings import settings
from gptroles.prompts import system_role, coder_role, role_confirmation
openai.api_key = settings.OPENAI_API_KEY

# models = sorted(openai.Model.list().data, key=lambda x: x.id)
# for model in models:
#     print(model)


def run_shell(command, autorun=False):
    print("#running proc", command)
    p = subprocess.Popen(["bash", "-c", command], shell=False,
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

    def __init__(self, sub_role, system_role=system_role, prompt_chain=None) -> None:
        self.sub_role = sub_role
        self.system_role = system_role
        if prompt_chain:
            self.prompt_chain = prompt_chain

    def confirm_role(self):
        return self.ask(role_confirmation, prompt_chain=[], assistant_name="System")

    def ask(self, prompt, prompt_chain=None, message_role=None, assistant_name="GPT", trim=1):
        if not message_role:
            message_role = "user"

        prompt_chain = prompt_chain or self.prompt_chain
        prompt_chain.append({"role": message_role, "content": prompt})
        print(f"{message_role}: {prompt}")
        # print(prompt_chain[1:])
        system_roles = [
            {"role": "system", "content": self.system_role},
            {"role": "system", "content": self.sub_role},
        ]
        # pprint(system_roles)
        messages = system_roles + prompt_chain

        try:
            response = openai.ChatCompletion.create(
                **(settings.chatcompletion | dict(messages=messages)),
            )
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
                prompt_chain = prompt_chain[(1*trim):-1]
                return self.ask(prompt, prompt_chain, message_role, trim=trim+1)
            else:
                print(e)
                return ("Error", str(e))

        prompt_chain.append(response.choices[0].message)
        # pprint(response)
        print(
            f"{response.choices[0].message.role}: {response.choices[0].message.content.strip()}")
        answer = response.choices[0].message.content.strip()

        if answer.startswith("SHELL:"):
            idx = (answer+"\n").index("\n")
            cmd = answer[len("SHELL:"):idx]
            out, err, rcode = run_shell(cmd, True)

            if err or rcode:
                return self.ask("SHELLERROR: "+err, prompt_chain, message_role)

            out = "\n" + out
            if "```" in answer:
                first = answer.index("```")
                chat_response = answer[:first] + f"```shell {out}" + answer[answer.index("```", first+3):]
            else:
                assistant_name = "Shell"
                chat_response = f"```shell {out}```"
            return (assistant_name, chat_response)
            return self.ask("SHELLRESPONSE:"+out, prompt_chain, message_role)
        return (assistant_name, answer)


rolegpt = RoleGpt(coder_role, "")

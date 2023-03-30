import subprocess
import time
import json
import openai
import openai.error
from os import getenv
from pprint import pprint
from .prompts import system_role, gptroles, role_confirmation

from pydantic import ValidationError

from langchain import OpenAI, ConversationChain, PromptTemplate
from langchain.llms import OpenAIChat
from langchain.chat_models import ChatOpenAI
from langchain.utilities import GoogleSearchAPIWrapper, SearxSearchWrapper, WikipediaAPIWrapper, BashProcess, OpenWeatherMapAPIWrapper
from langchain.agents import initialize_agent, ZeroShotAgent, AgentExecutor, Tool
from langchain.chains import LLMChain, ConversationChain
from langchain.memory import ChatMessageHistory, ConversationBufferWindowMemory, ConversationBufferMemory
from langchain.schema import messages_from_dict, messages_to_dict, HumanMessage, AIMessage, ChatMessage, SystemMessage

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

    def __init__(self, settings, sub_roles, system_role=system_role, prompt_chain=None, use_openai_prefixes=True) -> None:
        self._settings = None
        self.settings = settings
        self.api_key = settings.OPENAI_API_KEY
        if type(sub_roles) == str:
            sub_roles = [sub_roles]
        self.sub_roles = sub_roles
        self.system_role = system_role
        if prompt_chain:
            self.prompt_chain = prompt_chain
        self.history = ChatMessageHistory()
        self.ai_prefix = "AI"
        self.tools = None
        self.init_tools()
        self.use_openai_prefixes = use_openai_prefixes
        print(self.template)

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

    def init_tools(self):
        wsearch = WikipediaAPIWrapper()
        tools = [
            Tool(
                name="Wikipedia Search",
                func=wsearch.run,
                description="useful for when you need to provide updated answers from wikipedia"
            ),
        ]
        self.tools = tools

    def change_api_key(self, api_key):
        openai.api_key = api_key

    def confirm_role(self):
        return self.ask(role_confirmation, prompt_chain=[], assistant_name="System")

    @property
    def template(self):
        template = f"""{self.system_role if self.use_openai_prefixes else ""}
        {" ".join(str(role) for role in self.sub_roles)}

        {{history}}
        Human: {{input}}
        Assistant:"""
        # {{agent_scratchpad}}
        return template

    def ask(self, prompt, prompt_chain=None, message_role=None, assistant_name="GPT", trim=0):
        if not message_role:
            message_role = "user"

        # Agent
        # agent_chain = initialize_agent(
        #     self.tools, llm, agent="conversational-react-description", verbose=True, memory=memory)
        # answer = agent_chain.run(input=prompt)


        # # Chat GPT API
        # prompt_chain = prompt_chain or self.prompt_chain
        # prompt_chain.append({"role": message_role, "content": prompt})
        # print(f"{message_role}: {prompt[:200]}")
        # # print(prompt_chain[1:])
        system_roles = [
            {"role": "system", "content": self.system_role}
        ] + [
            {"role": "system", "content": role}
            for role in self.sub_roles
        ]
        # # pprint(system_roles)
        # input_prompt_chain = [m for m in prompt_chain if m["role"] in (
        #     "system", "assistant", "user")]
        # messages = system_roles + input_prompt_chain

        # try:
        #     response = openai.ChatCompletion.create(
        #           messages=messages,
        #         **self.settings.chatcompletion,
        #     )
        # except openai.error.RateLimitError as e:
        #     print("Rate limit", e)
        #     return ("Error", str(e))
        # except openai.error.AuthenticationError as e:
        #     print("Auth Error", e)
        #     return ("Error", str(e))
        # except openai.APIError as e:
        #     print("API", e)
        #     return ("Error", str(e))
        # except openai.InvalidRequestError as e:
        #     print(e)
        #     if "maximum context length" in e._message:
        #         print("Trimming prompt", trim, len(prompt_chain))
        #         time.sleep(1.1)
        #         prompt_chain = prompt_chain[trim:-1]
        #         if len(prompt_chain) == 0:
        #             return ("Error", str(e))
        #         return self.ask(prompt, prompt_chain, message_role, trim=trim+1)
        #     else:
        #         print(e)
        #         return ("Error", str(e))

        # prompt_chain.append(response.choices[0].message)
        # # pprint(response)
        # print(
        #     f"{response.choices[0].message.role}: {response.choices[0].message.content.strip()}")
        # answer = response.choices[0].message.content.strip()
        # if len(response.choices) > 1:
        #     pprint(response.choices)

        self.history.add_user_message(prompt)
        try:
            if self.use_openai_prefixes:
                llm = OpenAIChat(prefix_messages=system_roles, model_kwargs=self.settings.chatcompletion, max_retries=1, openai_api_key=self.settings.OPENAI_API_KEY)
            else:
                llm = ChatOpenAI(openai_api_key=self.settings.OPENAI_API_KEY, **self.settings.chatcompletion, max_retries=1)
        except ValidationError as e:
            return ("Error", str(e))

        memory = ConversationBufferWindowMemory(chat_memory=self.history, k=5-trim)
        # current_window = memory.load_memory_variables({})
        prompt_templated = PromptTemplate(
            input_variables=["history", "input"],
            template=self.template
        )
        chatgpt_chain = LLMChain( # LLMChain
            verbose=True,
            llm=llm,
            prompt=prompt_templated,
            memory=memory,
        )
        try:
            answer = chatgpt_chain.predict(input=prompt)
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
                if len(prompt_chain) == 0:
                    return ("Error", str(e))
                return self.ask(prompt, prompt_chain, message_role, trim=trim+1)
            else:
                print(e)
                return ("Error", str(e))
        self.history.add_ai_message(answer)

        return (assistant_name, answer)


# rolegpt = RoleGpt(settings, coder_role, "")

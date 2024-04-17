import json
import traceback
from typing import Any
from collections.abc import Iterator, Callable
from contextlib import contextmanager
from half_json.core import JSONFixer

import openai
import openai.types.chat
import instructor
import instructor.exceptions
import backoff
import pydantic_core
from streamlitextras.logger import log, bind_log

from ai.engines.schemas import EngineError
from config.prompts.task_functions import task_funtions
from ai.prompts.autoprompt import AutoPrompt, AutoPromptChunk
from ai.prompts.manager import (
    prompt_manager,
    Role,
    RoleTask,
)
from ai.engines.OpenAISettings import OpenAISettings, openai_settings

# from ai.engines.OpenAICustom import CustomChatCompletion

from utils import timeit

from appconfig import get_secret

# models = sorted(openai.Model.list().data, key=lambda x: x.id)
# for model in models:
#     print(model)


class OpenAIEngine:
    """
    This is the main interface between OpenAI service calls,
    """

    def __init__(
        self,
        settings: OpenAISettings,
        user=None,
    ) -> None:
        self.user = user
        self._settings = None
        self.settings = settings
        self.api_key = settings.OPENAI_API_KEY
        self.client = instructor.patch(openai.OpenAI(api_key=self.api_key))

    @property
    def logbind(self) -> dict:
        return {"user": str(repr(self.user or None))}

    # Dynamic settings
    @property
    def settings(self) -> OpenAISettings:
        return self._settings

    @settings.setter
    def settings(self, value: OpenAISettings) -> None:
        self._settings = value
        openai.api_key = value.OPENAI_API_KEY

    @property
    def api_key(self) -> str:
        return self._settings.OPENAI_API_KEY

    @api_key.setter
    def api_key(self, value: str) -> None:
        self._settings.OPENAI_API_KEY = value
        openai.api_key = value

    # AI service network handler
    @contextmanager
    def handle_openai(
        self,
        error_slot: dict[str, None | EngineError],
        error_handlers: dict[openai.OpenAIError, Callable[[EngineError], Any]]
        | None = None,
    ) -> EngineError | None:
        error = None
        try:
            yield
        # except openai.ServiceUnavailableError as e:
        #     error = EngineError(e, "Service busy")  # Notify user to retry later
        except openai.RateLimitError as e:
            error = EngineError(e, "Service busy")  # Notify user to retry later
        except openai.AuthenticationError as e:
            # TODO Email alert - Expired Auth
            error = EngineError(e, "Service access error")
        # except openai.InvalidRequestError as e:
        #     error = EngineError(e, "Service request error")
        except openai.APIError as e:
            error = EngineError(e, "Unspecified openai error")
        except Exception as e:  # noqa: BLE001
            error = EngineError(e, "Unhandled exception")
            traceback_str = traceback.format_exc()
            log.error(traceback_str, **self.logbind)
        finally:
            if error:
                log.error(
                    f"handle_openai ({error.response_msg}): {error.error}",
                    **self.logbind,
                )
                if not error_handlers:
                    error_handlers = {}

                error_handler = error_handlers.get(type(error.exception), None)
                if error_handler and callable(error_handler):
                    log.info(f"Calling error handler: {error_handler}", **self.logbind)
                    error_handler(error)

                error_slot["error"] = error

    # Prompt functions
    @timeit
    @backoff.on_exception(backoff.expo, openai.RateLimitError)
    def do_task(
        self,
        prompt_chain: AutoPrompt | AutoPromptChunk,
        is_chunk: bool = False,
        retry: int = 0,
    ) -> AutoPrompt | AutoPromptChunk:
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

        system_prompt = prompt_chain.system_prompt

        if is_chunk:
            # Remove input_text templating from first prompt, use aux prompt
            task_prompt = prompt_chain.template_input_prompt(
                prompt_chain.target_task_prompt.replace("{input_text}", "").replace(
                    ":", ""
                ),
                prompt_chain,
            )
            user_prompt_aux = prompt_chain.user_prompt_aux
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": task_prompt},
                {"role": "user", "content": user_prompt_aux},
            ]
            token_length = prompt_chain.token_length_aux
        else:
            user_prompt = prompt_chain.user_prompt
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ]
            token_length = prompt_chain.token_length

        token_length = int(token_length)

        model_max_tokens = prompt_chain.model_max_tokens
        max_tokens_margin = 75
        max_completion_tokens = 4096
        max_tokens = model_max_tokens - max_tokens_margin - token_length
        max_tokens = min(max_tokens, max_completion_tokens)

        # tmp_msg_file = f"./{prompt_chain.uid}_{prompt_chain.task_prompt_key}_{prompt_chain.answer_key_tuple[1]}_messages.txt"
        # with open(tmp_msg_file, "w") as f:
        #     json.dump(messages, f, indent=4)

        log.info(
            f"Calling do_task {is_chunk, model} - {token_length, model_max_tokens, max_tokens}",
            **self.logbind,
        )

        if max_tokens < 1:
            pass  # This is caught as an OpenAI service exception

        extra_args = {}
        if bool(task_functions):
            extra_args = dict(
                functions=task_functions,
                function_call={"name": task_functions[0]["name"]},
            )

        has_response_model = bool(prompt_chain.task.response_model)
        if has_response_model:
            extra_args |= dict(response_model=prompt_chain.task.response_model)

        error_slot = {"error": None}
        with self.handle_openai(error_slot):
            gpt_arguments = dict(
                model=model,
                temperature=0.7,
                top_p=1.0,
                n=1,
                max_tokens=max_tokens,
                messages=messages,
                user="APP",
                **extra_args,
            )
            prompt_chain.input_args = gpt_arguments.copy()

            try:
                gpt_response = self.client.chat.completions.create(**gpt_arguments)
            except instructor.exceptions.IncompleteOutputException as e:
                if retry > 2:
                    prompt_chain.error = EngineError(
                        e, "Instruction error, please retry"
                    )
                    return prompt_chain

                log.warning(
                    f"Retrying OpenAI.do_task for IncompleteOutputException {max_tokens} {token_length}"
                )
                return self.do_task(prompt_chain, is_chunk, retry + 1)
            except pydantic_core._pydantic_core.ValidationError as e:
                prompt_chain.error = EngineError(
                    ValueError(str(e)), "There was a validation error, please retry."
                )
                return prompt_chain

            if has_response_model:
                model_response = gpt_response
                gpt_response = gpt_response._raw_response
            gpt_response: openai.types.Completion
            prompt_chain.response = gpt_response.model_dump()
            choices = gpt_response.choices
            first_choice: openai.types.chat.chat_completion.Choice = choices[0]
            finish_reason = first_choice.finish_reason

            # with open(tmp_msg_file, "a") as f:
            #     f.write("\n\n")
            #     json.dump(gpt_response, f, indent=4)

            if finish_reason == "length":
                # TODO: Retry with task_prompt_secondary / is_chunk=True and join
                log.warning("OpenAI call finished due to length", **self.logbind)
                pass

            log.debug(
                f"Finished chat completion with reason: {finish_reason}", **self.logbind
            )
            message: openai.types.chat.chat_completion_message.ChatCompletionMessage = (
                first_choice.message
            )
            function_call = message.function_call

            if has_response_model:
                prompt_chain.answer = "$model"
                prompt_chain.answer_model = model_response
            elif function_call:
                function_name = function_call.name
                function_arguments_str = function_call.arguments
                function_ref = task_funtions.get(function_name, None)

                if not function_ref:
                    error = EngineError(
                        ValueError(f"Could not find task function `{function_name}`"),
                        "Error executing function",
                    )
                    log.error(error, **self.logbind)
                    prompt_chain.error = error
                    return prompt_chain

                try:
                    function_arguments = json.loads(function_arguments_str)
                except (TypeError, json.JSONDecodeError) as e:
                    try:
                        log.debug(
                            "Attempting to fix broken GPT function response",
                            **self.logbind,
                        )
                        fixer = JSONFixer()
                        fix_result = fixer.fix(function_arguments_str)
                        function_arguments = json.loads(fix_result.line)
                    except (TypeError, json.JSONDecodeError) as e:
                        error = EngineError(e, "Function error in AI response")
                        log.debug(function_arguments_str, **self.logbind)
                        traceback_str = traceback.format_exc()
                        log.error(traceback_str, **self.logbind)
                        prompt_chain.error = error_slot["error"]
                        return prompt_chain

                try:
                    function_answer, _extra = function_ref(
                        prompt_chain, function_arguments
                    )
                except Exception as e:  # noqa: BLE001
                    error = EngineError(e, "Error executing function")
                    traceback_str = traceback.format_exc()
                    log.error(traceback_str, **self.logbind)
                    prompt_chain.error = error
                    return prompt_chain
                prompt_chain.answer = function_answer
            else:
                prompt_chain.answer = message.content.strip()

        prompt_chain.error = error_slot["error"]

        return prompt_chain

    def process_chunks(self, prompt_chain: AutoPrompt) -> Iterator[AutoPromptChunk]:
        whole_chain = prompt_chain.get_chain()
        chunk_count = len(whole_chain)

        if not prompt_chain.first.next_item:
            prompt_chain.create_chunk_chain()

        for index, item in enumerate(whole_chain):
            if item.previous is None and len(whole_chain) > 1:
                log.debug(f"Skipped first chunk: {item!r}", **self.logbind)
                continue  # First chunk has whole unchunked text

            is_chunk = (
                False
                if bool(item.target_extra_input) or bool(item.task.functions)
                else bool(index - 1 != 0)
            )
            log.info(
                f"Processing chunk {index + 1} of {chunk_count} with token_length {item.token_length} - {item!r}",
                **self.logbind,
            )
            self.do_task(item, is_chunk=is_chunk)
            yield item

    def generate_summary(
        self, prompt_chain: AutoPromptChunk
    ) -> tuple[AutoPromptChunk, AutoPromptChunk]:
        summary_prompt = (
            f"Generate a summary for the following text: {prompt_chain.chained_answer}"
        )
        summary = prompt_chain.last_init(
            dict(task=RoleTask(task_name="Summarise", prompt=summary_prompt))
        )
        summary = self.do_task(summary)
        # assert prompt_chain == summary.previous
        return summary, prompt_chain


openai_engine = OpenAIEngine(openai_settings)

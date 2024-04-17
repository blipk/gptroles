import os
import json
from dateutil import tz
from typing import Any
from functools import lru_cache
from pydantic_settings import SettingsConfigDict, BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="./gptroles.appconfig.toml", case_sensitive=False
    )

    # Static
    APP_NAME: str = "GPTRoles"

    # Computed
    config_path: str = os.path.dirname(__file__)
    prompts_path: str = os.path.join(config_path, "prompts")
    app_path: str = os.path.join(config_path, "..")
    tmp_folder: str = os.path.realpath(os.path.join(app_path, "../../", "tmp"))
    static_folder: str = os.path.realpath(os.path.join(app_path, "static"))
    app_timezone: tz.tzfile = tz.gettz("Australia/Sydney")

    # Imported
    # appconfig.toml
    assistant_name: str = "Orto"

    # secrets.toml
    @classmethod
    def get_secret(
        cls, secret_key: str, env_secrets_var: str = "APP_SECRETS"
    ) -> Any:  # noqa: ANN401
        env_secrets_json = os.environ.get(env_secrets_var, None) or {}

        try:
            secrets: dict = json.loads(env_secrets_json)
            secret = secrets.get(secret_key, None)
        except json.JSONDecodeError:
            raise

        return secret

    DEVELOPMENT_MODE: bool = False

    # app.state
    # @classmethod
    # def get_state(
    #     cls, env_key: str
    # ) -> Any:  # noqa: ANN401
    #     app.state.get(env_key, None)

    # DEBUG_MODE: bool = False

    # @field_validator("DEBUG_MODE", mode="before")
    # def get_debug_mode(cls, v: bool | None) -> bool:  # noqa: ARG002
    #     return self.get_state("DEBUG_MODE", False)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
os.makedirs(settings.tmp_folder, exist_ok=True)
get_secret = settings.get_secret

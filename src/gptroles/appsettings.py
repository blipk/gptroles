import os
import json
from dateutil import tz
from typing import Any
from functools import lru_cache

from appdirs import AppDirs
from pydantic_settings import SettingsConfigDict, BaseSettings
from pydantic import field_validator

APP_VERSION = "v0.1"  # TODO read from package
APP_AUTHOR = "blipk"
APP_NAME = "gptroles"
APP_SETTINGS_FNAME = "gptroles.toml"


class AppSettings(BaseSettings):
    def __init__(self, app_name, app_author, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        os.makedirs(self.app_dirs.user_config_dir, exist_ok=True)
        os.makedirs(self.tmp_folder, exist_ok=True)
        return None

    model_config = SettingsConfigDict(
        env_file="./gptroles.appconfig.toml", case_sensitive=False
    )

    # Static
    APP_NAME: str = APP_NAME
    APP_AUTHOR: str = APP_AUTHOR

    # Computed
    config_path: str = os.path.dirname(__file__)
    prompts_path: str = os.path.join(config_path, "prompts")
    app_path: str = os.path.join(config_path, "..")
    tmp_folder: str = os.path.realpath(os.path.join(app_path, "../../", "tmp"))
    static_folder: str = os.path.realpath(os.path.join(app_path, "static"))
    app_timezone: tz.tzfile = tz.gettz("Australia/Sydney")
    app_dirs: AppDirs | None = None

    @field_validator("app_dirs", mode="after")
    def get_app_dirs(cls, v) -> bool:  # noqa: ARG002
        return AppDirs(APP_NAME, APP_AUTHOR)

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

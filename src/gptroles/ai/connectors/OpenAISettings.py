import os
import toml
from pathlib import Path
from dataclasses import dataclass

from appdirs import AppDirs

from utils import repr_


from ai.prompts.schemas import default_openai_model

PathLike = str | Path
NullablePathLike = PathLike | None


@dataclass
class OpenAISettings:
    """
    Dynamically updating settings object configured for OpenAI API
    Saves to TOML config in AppDirs directory.

    Used by OpenAIEngine.
    """

    default_settings = dict(
        OPENAI_API_KEY="",
        chunk_length=6500,
        chatcompletion=dict(
            model=default_openai_model,
            temperature=0.7,  # 0.0 - 2.0
            top_p=1.0,  # 0.0 - 1.0
            n=1,
            # stream=None,
            # [] Up to 4 sequences where the API will stop generating further tokens.
            # stop=None,
            max_tokens=7900,
            presence_penalty=0.01,  # -2.0 2.0
            frequency_penalty=0.01,  # -2.0 2.0
            # logit_bias=None,
            # user="None",
        ),
    )
    default_ranges = dict(
        temperature=(0.0, 2.0, 0.01),  # Min, Max, Step
        top_p=(0.0, 1.0, 0.01),
        n=(1, 12, 1),
        max_tokens=(-1, 10240, 256),
        presence_penalty=(-2.0, 2.0, 0.05),
        frequency_penalty=(-2.0, 2.0, 0.05),
    )

    def __init__(self, app_dirs: AppDirs) -> None:
        self.settings_fname = "gptroles.openai.toml"
        self._settings = self.default_settings.copy()

        self.dirs = app_dirs
        self.config_dir = self.dirs.user_config_dir
        os.makedirs(self.config_dir, exist_ok=True)

        self.settings_fpath = os.path.join(self.config_dir, self.settings_fname)

        if not os.path.exists(self.settings_fpath):
            self.saveSettings(self.default_settings)

        self.loadSettings(self.loadSettingsFile(self.settings_fpath))

    def loadSettingsFile(self, file_path: str) -> dict:
        with open(file_path) as f:
            settings_toml = toml.load(f)
            self.setSettings(settings_toml)

        return settings_toml

    def loadSettings(self, settings_toml: dict | None = None) -> None:
        if not settings_toml:
            settings_toml = self._settings

        self.setSettings(settings_toml)

    def setSettings(self, settings_toml: dict) -> None:
        # Merges into current
        settings = self._settings.copy()
        for k, v in settings_toml.items():
            if type(v) is dict:
                settings[k] |= settings_toml[k]
            else:
                settings[k] = settings_toml[k]
        self._settings = settings
        for key in settings:
            setattr(self, key, settings[key])

    def saveSettings(self, settings=None, settings_fpath=None):
        if not settings_fpath:
            settings_fpath = self.settings_fpath

        if not settings:
            settings = self._settings

        with open(settings_fpath, "w") as f:
            toml.dump(settings, f)

    def __repr__(self) -> str:
        return repr_(self, ignore_keys=["_settings", "default_settings"])

    def __repr__(self) -> str:
        return repr_(self, ignore_keys=["_settings", "default_settings"])

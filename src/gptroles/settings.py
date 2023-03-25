import os
import toml

from appdirs import AppDirs
from gptroles.utils import repr_

class Settings():
    default_settings=dict(
        OPENAI_API_KEY="",
        chatcompletion=dict(
                model="gpt-3.5-turbo",
                temperature=0.7,
                top_p=1,
                n=1,
                max_tokens=1024,
                presence_penalty=0,
                frequency_penalty=0,
                stop=None,
                # logit_bias=None,
                # user="None",
    ))
    def __init__(self, settings_fname, app_name, app_author) -> None:
        self.settings_fname = settings_fname
        self._settings = self.default_settings.copy()
        self.dirs = AppDirs(app_name, app_author)
        self.config_dir = self.dirs.user_config_dir
        os.makedirs(self.config_dir, exist_ok=True)
        self.settings_fpath = os.path.join(self.config_dir, self.settings_fname)

        if not os.path.exists(self.settings_fpath):
            self.saveSettings(self.default_settings)

        self.loadSettings()

    def loadSettings(self, settings_fpath=None):
        if not settings_fpath:
            settings_fpath = self.settings_fpath
        if os.path.exists(settings_fpath):
            with open(settings_fpath, "r") as f:
                l_settings = toml.load(f)
            self.setSettings(l_settings)
        else:
            self.setSettings(l_settings)

    def setSettings(self, l_settings: dict, save=True):
        settings = self._settings.copy()
        for k, v in l_settings.items():
            if type(v) is dict:
                settings[k] |= l_settings[k]
            else:
                settings[k] = l_settings[k]
        self._settings = settings
        for key in settings:
            setattr(self, key, settings[key])
        if save:
            self.saveSettings(l_settings)

    def saveSettings(self, settings=None, settings_fpath=None):
        if not settings_fpath:
            settings_fpath = self.settings_fpath

        if not settings:
            settings = self._settings

        with open(settings_fpath, "w") as f:
            toml.dump(settings, f)

    def __repr__(self) -> str:
        return repr_(self, ignore_keys=["_settings", "default_settings"])

# settings = Settings()
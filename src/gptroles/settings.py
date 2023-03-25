import os
import toml

from gptroles.utils import repr_

class Settings():
    default_settings=dict(chatcompletion=dict(
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
    def __init__(self, settings_file="env.toml") -> None:
        self.settings_file=settings_file
        self.settings = self.default_settings.copy()
        if not os.path.exists(settings_file):
            with open(settings_file, 'w') as f:
                f.write('OPENAI_API_KEY=""')
        self.loadSettings()

    def loadSettings(self, settings_file=None):
        if not settings_file:
            settings_file = self.settings_file
        with open(settings_file) as f:
            l_settings = toml.load(f)
        self.setSettings(l_settings)

    def setSettings(self, l_settings: dict):
        settings = self.settings.copy()
        for k, v in l_settings.items():
            if type(v) is dict:
                settings[k] |= l_settings[k]
            else:
                settings[k] = l_settings[k]
        self.settings = settings
        for key in settings:
            setattr(self, key, settings[key])

    def saveSettings(self, settings=None, settings_file=None):
        if not settings_file:
            settings_file = self.settings_file

        if not settings:
            settings = self.settings

        with open(settings_file) as f:
            toml.dump(settings, f)

    def __repr__(self) -> str:
        return repr_(self, ignore_keys=["settings", "default_settings"])

settings = Settings()
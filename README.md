
# GPT Roles
Simple PyQT chatbox that connects to a chat session with GPT.

Has some features to increase interactivity and context awareness:
    - GPT can request web pages or from APIs to answer your questions, to get current prices or latest news
    - GPT can run shell scripts on your computer, so you can ask it directly to find files or open programs

These are programmed in a root prompt.

Additional features:
    - List roles from jailbreakchat.com and set them as the root prompt


TODO: The chat UI has action indicators for the interactivity
TODO: Also the messages in the current prompt chain are
TODO: Show alternate choices and commit to conversation


## Installing/Running

#### Packaged AppImage/PyInstaller

##TODO

#### From pip

`pip install gptroles && ./install.sh`

The install script is required to install desktop icons

#### From source with Poetry
```shell
poetry install && poetry run main
```

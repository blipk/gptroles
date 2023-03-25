from gptroles.settings import Settings
import sys
from PyQt6.QtCore import QTimer, QSettings, QCommandLineOption, QCommandLineParser
from PyQt6.QtWidgets import QApplication
from gptroles.ui.mainwindow import MainWindow


APP_VERSION = "v0.1"  # TODO read from package
APP_ORG = "blipk"
APP_NAME = "gptroles"


class RoleChat(QApplication):
    def __init__(self, argv):
        super(QApplication, self).__init__(argv)
        self.setOrganizationName(APP_ORG)
        self.setApplicationName(APP_NAME)
        self.setApplicationVersion(APP_VERSION)
        self.setApplicationDisplayName(APP_NAME)

        self.parseCLIArgs()
        self.debug_mode = self.parser.isSet(self.cli_options["debug_option"])

        self.qsettings = QSettings(self)
        self.settings = Settings("gptroles.toml", APP_NAME, APP_ORG)
        print(self.settings)

        self.mainWindow = MainWindow(self)
        self.mainWindow.center()

        # self.updateTimer = QTimer(self)
        # self.updateTimer.timeout.connect(self.updateUI)
        # self.updateTimer.start(1000)
        # self.updateTimer.timeout.emit()

        self.useIndicator = False
        self.hideWindow = False
        if not self.hideWindow or not self.useIndicator:
            self.mainWindow.appear()

    def parseCLIArgs(self):
        parser = QCommandLineParser()
        parser.addHelpOption()
        parser.addVersionOption()
        self.cli_options = dict(
            debug_option = QCommandLineOption(
                ["D", "debug"],
                "Enable extra debugging features"
            )
        )
        parser.addOption(self.cli_options["debug_option"])

        parser.process(self)
        self.parser = parser

    # def updateUI(self):
    #     temp_info, fan_info = None, None
    #     if self.mainWindow.isActiveWindow():
    #         pass
    #     if self.useIndicator and self.menu_visible:
    #         pass

import os
import sys
from PyQt6.QtCore import QTimer, QSettings, QCommandLineOption, QCommandLineParser
from PyQt6.QtWidgets import QApplication, QFileDialog
from gptroles.ai.connectors.connector import Connector
from gptroles.ai.engines.orto.memory import MemoryManager
from gptroles.ui.w_mainwindow import MainWindow
from gptroles.ai.connectors.OpenAISettings import OpenAISettings

from gptroles.appsettings import APP_AUTHOR, APP_NAME, APP_VERSION, AppSettings


class RoleChat(QApplication):
    def __init__(self, argv):
        super(QApplication, self).__init__(argv)
        self.setOrganizationName(APP_AUTHOR)
        self.setApplicationName(APP_NAME)
        self.setApplicationVersion(APP_VERSION)
        self.setApplicationDisplayName(APP_NAME)

        self.parseCLIArgs()
        self.debug_mode = self.parser.isSet(self.cli_options["debug_option"])

        # RoleGptDIProvider(self)
        self.qsettings = QSettings(self)

        self.settings = AppSettings(APP_NAME, APP_AUTHOR)
        self.gpt_settings = OpenAISettings(self.settings.app_dirs)
        self.memory_manager = MemoryManager()
        self.role_gpt = Connector(self.gpt_settings, memory_manager=self.memory_manager)

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
            debug_option=QCommandLineOption(
                ["D", "debug"], "Enable extra debugging features"
            )
        )
        parser.addOption(self.cli_options["debug_option"])

        parser.process(self)
        self.parser = parser

    def save_file(self, caption, file_contents, file_name=None, ddir=None, mode="w"):
        if not file_name:
            file_name = ".txt"
        ddir = ddir or os.path.expanduser("~")
        dpath = os.path.join(ddir, file_name)
        filter = "Text Files (*.txt);;All Files (*)"
        options = QFileDialog.Option.HideNameFilterDetails  # DontUseNativeDialog
        ofile_name, _ = QFileDialog.getSaveFileName(
            self.mainWindow, caption, dpath, filter, options=options
        )
        if ofile_name:
            with open(ofile_name, mode) as f:
                f.write(file_contents)
            return True
        return False

    # def updateUI(self):
    #     if self.mainWindow.isActiveWindow():
    #         pass
    #     if self.useIndicator and self.menu_visible:
    #         pass

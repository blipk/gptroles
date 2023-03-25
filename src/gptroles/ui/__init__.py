import sys
from PyQt6.QtGui import QDragEnterEvent, QDropEvent, QDragLeaveEvent, QDragMoveEvent, QAction
from PyQt6.QtCore import QTimer, QSize, QRect, QSettings, QByteArray
from PyQt6.QtWidgets import QApplication, QVBoxLayout, QHBoxLayout, QWidget, QLayout, QLineEdit, QTextEdit, QMessageBox, QMainWindow
from gptroles.ui.chatbox import ChatBox
from gptroles.ui.settings import DictWidget


APP_VERSION = "v0.1" #TODO read from package
APP_ORG = "blipk"
APP_NAME = "GPT CHAT"
from gptroles.settings import Settings

class RoleChat(QApplication):
    def __init__(self, argv):
        super(QApplication, self).__init__(argv)
        self.setOrganizationName(APP_ORG)
        self.setApplicationName(APP_NAME)
        self.setApplicationVersion(APP_VERSION)
        self.setApplicationDisplayName(APP_NAME)
        self.qsettings = QSettings(self)
        self.settings = Settings()
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

    # def updateUI(self):
    #     temp_info, fan_info = None, None
    #     if self.mainWindow.isActiveWindow():
    #         pass
    #     if self.useIndicator and self.menu_visible:
    #         pass


class MainWindow(QMainWindow):
    def __init__(self, app: RoleChat):
        super(QMainWindow, self).__init__()
        self.app = app
        self.qsettings = self.app.qsettings
        self.settings = self.app.settings
        self.setAcceptDrops(True)
        self.setupUi(self)
        # self.label_3.setText(self.label_3.text().replace("$$$", APP_VERSION))

    def setupUi(self, MainWindow):
        MainWindow.setObjectName(u"MainWindow")
        self.setWindowTitle("ChatGPT")
        MainWindow.resize(1024, 720)
        MainWindow.setMinimumSize(QSize(1024, 720))

        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")

        self.vLayoutWidget = QWidget(self.centralwidget)
        self.vLayoutWidget.setObjectName(u"vLayoutWidget")
        self.vLayoutWidget.setGeometry(self.geometry())
        self.vLayout = QVBoxLayout(self.vLayoutWidget)
        self.vLayout.setObjectName(u"vLayout")
        self.vLayout.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.vLayout.setContentsMargins(0, 0, 0, 0)

        self.hLayoutWidget = QWidget(self.vLayoutWidget)
        self.hLayoutWidget.setObjectName(u"hLayoutWidget")
        self.hLayoutWidget.setGeometry(self.vLayoutWidget.geometry())
        self.hLayout = QHBoxLayout(self.hLayoutWidget)
        self.hLayout.setObjectName(u"hLayout")
        self.hLayout.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.hLayout.setContentsMargins(0, 0, 0, 0)


        self.settingsWidget = DictWidget(self.settings._settings)
        self.chatbox = ChatBox(self)
        self.hLayout.addWidget(self.chatbox)
        self.hLayout.addWidget(self.settingsWidget)

        # Menu
        menu = self.menuBar()
        settings_action = QAction("Settings", self)
        settings_action.triggered.connect(self.settingsWidget.toggle)
        menu.addAction(settings_action)

        self.setCentralWidget(self.hLayoutWidget)



        # Load window QSettings
        self.readSettings()

    def readSettings(self):
        self.app.qsettings.beginGroup("MainWindow");
        geometry = self.app.qsettings.value("geometry", QByteArray())
        if geometry.isEmpty():
            self.setGeometry(200, 200, 400, 400);
        else:
            self.restoreGeometry(geometry)
        self.app.qsettings.endGroup();

    def writeSettings(self):
        self.app.qsettings.beginGroup("MainWindow")
        self.app.qsettings.setValue("geometry", self.saveGeometry());
        self.app.qsettings.endGroup()

    def dragEnterEvent(self, e: QDragEnterEvent) -> None:
        mimedata = e.mimeData()
        if mimedata.hasUrls():
            e.acceptProposedAction()
        return super().dragEnterEvent(e)

    def dropEvent(self, e: QDropEvent) -> None:
        mimedata = e.mimeData()
        for url in mimedata.urls():
            print("Dropped file:", url.toLocalFile())
        return super().dropEvent(e)

    def closeEvent(self, event):
        if self.app.useIndicator:
            event.ignore()
            self.hide()
        else:
            self.writeSettings()
            event.accept()

    def showErrorMSG(self, msg_str: str, title_msg="ERROR", detail: str = None):
        self.appear()
        msg = QMessageBox(self)
        msg.setIcon(QMessageBox.Critical)
        msg.setText(msg_str)
        if detail:
            msg.setDetailedText(detail)
        msg.setWindowTitle(title_msg)
        msg.setDefaultButton(QMessageBox.Close)
        msg.exec_()

    def toggleAppear(self):
        if self.isVisible():
            self.hide()
        else:
            self.appear()

    def appear(self):
        self.show()
        self.raise_()
        self.activateWindow()

    def center(self):
        qr = self.frameGeometry()
        qr.moveCenter(
            self.app
            .primaryScreen()
            .availableGeometry()
            .center())
        self.move(qr.topLeft())
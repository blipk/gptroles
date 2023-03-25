import sys
from PyQt6.QtGui import QDragEnterEvent, QDropEvent, QDragLeaveEvent, QDragMoveEvent, QAction
from PyQt6.QtCore import QTimer, QSize, QRect
from PyQt6.QtWidgets import QApplication, QVBoxLayout, QWidget, QLayout, QLineEdit, QTextEdit, QMessageBox, QMainWindow
from .chatbox import ChatBox

APP_VERSION = "v0.1" #TODO read from package
APP_NAME = "GPT CHAT"
from ..settings import settings
print(settings)

class RoleChat(QApplication):
    def __init__(self, argv):
        super(QApplication, self).__init__(argv)
        self.setApplicationVersion(APP_VERSION)
        self.setApplicationName(APP_NAME)
        self.setApplicationDisplayName(APP_NAME)

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
        self.verticalLayoutWidget = QWidget(self.centralwidget)
        self.verticalLayoutWidget.setObjectName(u"verticalLayoutWidget")
        self.verticalLayoutWidget.setGeometry(self.geometry())
        self.verticalLayout = QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.verticalLayout.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        # self.setCentralWidget(QWidget(self))
        # centralWidget = self.centralWidget()
        # self.verticalLayout.addWidget(self.chatbox)
        self.chatbox = ChatBox(self)
        self.setCentralWidget(self.chatbox)

        # Menu
        menu = self.menuBar()
        # menu.addMenu("File")


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
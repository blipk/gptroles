import sys
from PyQt6.QtGui import QDragEnterEvent, QDropEvent, QDragLeaveEvent, QDragMoveEvent, QAction, QMouseEvent
from PyQt6.QtCore import Qt, QTimer, QSize, QRect, QSettings, QByteArray, QEvent, QPoint
from PyQt6.QtWidgets import QApplication, QVBoxLayout, QHBoxLayout, QWidget, QLayout, QLineEdit, QTextEdit, QMessageBox, QMainWindow, QMenuBar, QPushButton, QWidgetAction
from .widgets.chatbox import ChatBox
# from .widgets.terminal import SerialPortWidget
from .widgets.borderlesswindow import BorderlessWindow, BaseWindow
from .settings import SettingsWidget

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from . import RoleChat

class CustomMenuBar(QMenuBar):
    def __init__(self, parent: QWidget = None) -> None:
        super().__init__(parent)
        self.mwindow = parent
        self.dragPosition = None
        self.setContentsMargins(0, 0, 0, 0)
        self.setStyleSheet("""
            QMenuBar {
                background-color: rgba(50, 50, 50, 0.8);
            }
            QMenuBar::item {
                color: white;
                background-color: transparent;
                cursor: pointer;
            }
        """)
        quit_button = QPushButton("Exit", self)
        quit_button.clicked.connect(self.mwindow.app.quit)
        self.setCornerWidget(quit_button)
        self.setCursor(Qt.CursorShape.OpenHandCursor)

    def addAction(self, action) -> None:
        action.hovered.connect(lambda: self.setCursor(Qt.CursorShape.PointingHandCursor))
        # action.triggered.connect(lambda: self.hovered(action))
        return super().addAction(action)

    def mousePressEvent(self, event: QMouseEvent) -> None:
        if event.button() == Qt.MouseButton.LeftButton:
            self.setCursor(Qt.CursorShape.ClosedHandCursor)
            self.dragPosition = event.scenePosition().toPoint() - self.frameGeometry().topLeft()
        return super().mousePressEvent(event)

    def mouseReleaseEvent(self, a0: QMouseEvent) -> None:
        self.setCursor(Qt.CursorShape.OpenHandCursor)
        return super().mouseReleaseEvent(a0)

    def mouseMoveEvent(self, event: QMouseEvent) -> None:
        # on_action = next((a for a in self.actions() if a.underMouse()), False)
        on_action = False # TODO
        if event.buttons() == Qt.MouseButton.LeftButton:
            self.setCursor(Qt.CursorShape.ClosedHandCursor)
            newPosition = event.globalPosition().toPoint() - self.dragPosition
            self.window().move(newPosition)
        elif not on_action:
            self.setCursor(Qt.CursorShape.OpenHandCursor)
        return super().mouseMoveEvent(event)

class MainWindow(QMainWindow, BorderlessWindow):
    def __init__(self, app):
        super(BorderlessWindow, self).__init__()
        super(QMainWindow, self).__init__()
        self.app: RoleChat = app
        self.qsettings = self.app.qsettings
        self.settings = self.app.settings
        self.setAcceptDrops(True)
        self.setupUi()

    def setupUi(self):
        # Main Layout
        # MainWindow.setObjectName(u"MainWindow")
        self.setWindowTitle("ChatGPT")
        self.resize(1920, 1080)
        self.setMinimumSize(QSize(1024, 768))
        self.layout().setContentsMargins(0, 0, 0, 0)

        self.centralwidget = QWidget(self)
        self.centralwidget.setObjectName(u"centralwidget")

        self.vLayoutWidget = QWidget(self.centralwidget)
        self.vLayoutWidget.setObjectName(u"vLayoutWidget")
        self.vLayoutWidget.setGeometry(self.geometry())
        self.vLayout = QVBoxLayout(self.vLayoutWidget)
        # self.vLayout.setObjectName(u"vLayout")
        self.vLayout.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.vLayout.setContentsMargins(0, 0, 0, 0)
        self.vLayout.setSpacing(0)

        self.hLayoutWidget = QWidget(self.vLayoutWidget)
        # self.hLayoutWidget.setObjectName(u"hLayoutWidget")
        self.hLayoutWidget.setGeometry(self.vLayoutWidget.geometry())
        self.hLayout = QHBoxLayout(self.hLayoutWidget)
        # self.hLayout.setObjectName(u"hLayout")
        self.hLayout.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)
        self.hLayout.setContentsMargins(0, 0, 0, 0)
        self.hLayout.setSpacing(0)

        # Menu
        self.cmenuBar = CustomMenuBar(self)
        self.setMenuBar(self.cmenuBar)
        menu = self.menuBar()
        # quit_action = QAction("Exit", self)
        # quit_action.triggered.connect(self.app.quit)
        # menu.addAction(quit_action)

        # Widgets
        self.settingsWidget = SettingsWidget(self.settings, self)
        self.chatbox = ChatBox(self)
        self.hLayout.addWidget(self.chatbox)
        self.hLayout.addWidget(self.settingsWidget)
        self.setStyleSheet("""
            color: white;
            background-color: rgba(50, 50, 50, 0.8);
        """)
        # Terminal
        # self.m_serial_port_widget = SerialPortWidget(self)
        # self.hLayout.addWidget(self.m_serial_port_widget)
        self.setCentralWidget(self.hLayoutWidget)

        # Actions
        settings_action = QAction("Config", self)
        settings_action.triggered.connect(self.settingsWidget.toggle)
        menu.addAction(settings_action)

        # Load window QSettings
        self.readSettings()

    def readSettings(self):
        self.app.qsettings.beginGroup("MainWindow");
        geometry = self.app.qsettings.value("geometry", QByteArray())
        if geometry.isEmpty():
            self.center()
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
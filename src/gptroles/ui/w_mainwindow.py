import sys
from PyQt6.QtGui import (
    QDragEnterEvent,
    QDropEvent,
    QDragLeaveEvent,
    QDragMoveEvent,
    QAction,
    QMouseEvent,
)
from PyQt6.QtCore import (
    Qt,
    QTimer,
    QSize,
    QRect,
    QSettings,
    QByteArray,
    QEvent,
    QPoint,
    QPropertyAnimation,
)
from PyQt6.QtWidgets import (
    QApplication,
    QVBoxLayout,
    QHBoxLayout,
    QWidget,
    QLayout,
    QLabel,
    QCheckBox,
    QLineEdit,
    QTextEdit,
    QMessageBox,
    QMainWindow,
    QMenuBar,
    QPushButton,
    QWidgetAction,
    QSpacerItem,
    QSizePolicy,
    QFrame,
    QGraphicsOpacityEffect,
)
from gptroles.ui.w_drawer import DrawerWidget
from gptroles.ui.w_menubar import CustomMenuBar
from gptroles.ui.w_tools import LayoutType, QHBoxWidget


# from gptroles.ui.widgets.terminal import SerialPortWidget
from gptroles.ui.widgets.w_chatbox import ChatBox
from gptroles.ui.widgets.w_borderlesswindow import BorderlessWindow, BaseWindow, RoundedCornerWindow
from gptroles.ui.w_settings import SettingsWidget

from gptroles.interfaces.ui_to_gpt.DI import RoleGptDI

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from gptroles.ui.application import RoleChat


class MainWindow(QMainWindow, BorderlessWindow, RoundedCornerWindow):
    def __init__(self, app):
        super(BorderlessWindow, self).__init__()
        super(QMainWindow, self).__init__()
        RoleGptDI(self, app)
        self.app: RoleChat = app
        self.qsettings = self.app.qsettings
        self.setAcceptDrops(True)
        self.setupUi()
        self.setupMenu()
        self.setupWidgets()
        self.readSettings()

    def setupUi(self):
        # Main Layout
        # MainWindow.setObjectName(u"MainWindow")
        self.setWindowTitle("ChatGPT")
        self.resize(1920, 1080)
        self.setMinimumSize(QSize(1024, 768))
        self.layout().setContentsMargins(0, 0, 0, 0)

        self.centralwidget = QHBoxWidget()
        self.centralwidget.setObjectName("centralwidget")
        self.setCentralWidget(self.centralwidget)

        self.hLayoutWidget = QHBoxWidget(self.centralwidget)
        self.centralwidget.boxLayout.addWidget(self.hLayoutWidget)

        # self.drawerWidget = DrawerWidget()
        # self.hLayoutWidget.boxLayout.addWidget(self.drawerWidget)

        self.vLayoutWidget = QHBoxWidget(
            self.hLayoutWidget, layout_type=LayoutType.Vertical
        )
        self.hLayoutWidget.boxLayout.addWidget(self.vLayoutWidget)

        self.vLayout = self.vLayoutWidget.boxLayout
        self.hLayout = self.hLayoutWidget.boxLayout

        self.setStyleSheet(
            """
            color: white;
            background-color: rgba(50, 50, 50, 0.8);
        """
        )

    def setupMenu(self):
        self.cmenuBar = CustomMenuBar(self)
        self.setMenuBar(self.cmenuBar)

        # w = QWidget(self)
        # w.setMouseTracking(True)
        # layout = QHBoxLayout(w)
        # layout.addWidget(self.cmenuBar)
        # layout.addStretch(10)
        # self.setMenuWidget(w)
        # self.setMenuBar(self.cmenuBar)
        # quit_action = QAction("Exit", self)
        # quit_action.triggered.connect(self.app.quit)
        # self.cmenuBar.addAction(quit_action)

    def setupWidgets(self):
        menu = self.menuBar()
        # Widgets
        self.settingsWidget = SettingsWidget(self.gpt_settings, self)
        self.chatbox = ChatBox(self)
        self.hLayout.addWidget(self.chatbox)
        self.hLayout.addWidget(self.settingsWidget)

        # Terminal
        # self.m_serial_port_widget = SerialPortWidget(self)
        # self.hLayout.addWidget(self.m_serial_port_widget)

        # Actions
        settings_action = QAction("Config", self)
        settings_action.triggered.connect(self.settingsWidget.toggle)
        menu.addAction(settings_action)

    def readSettings(self):
        self.app.qsettings.beginGroup("MainWindow")
        geometry = self.app.qsettings.value("geometry", QByteArray())
        if geometry.isEmpty():
            self.center()
        else:
            self.restoreGeometry(geometry)
        self.app.qsettings.endGroup()

    def writeSettings(self):
        self.app.qsettings.beginGroup("MainWindow")
        self.app.qsettings.setValue("geometry", self.saveGeometry())
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

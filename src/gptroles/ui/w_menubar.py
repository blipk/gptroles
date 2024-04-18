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
from gptroles.ui.w_tools import AddStyle, QHBoxWidget


# from gptroles.ui.widgets.terminal import SerialPortWidget
from gptroles.ui.widgets.w_chatbox import ChatBox
from gptroles.ui.widgets.w_borderlesswindow import BorderlessWindow, BaseWindow
from gptroles.ui.w_settings import SettingsWidget

from gptroles.interfaces.ui_to_gpt.DI import RoleGptDI

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from gptroles.ui.application import RoleChat


class CustomMenuBar(QMenuBar):
    def __init__(self, parent: QWidget = None) -> None:
        super().__init__(parent)
        RoleGptDI(self)
        self.mwindow = parent
        self.dragPosition = None
        self.setNativeMenuBar(False)
        self.setContentsMargins(0, 0, 0, 0)
        self.setStyleSheet(
            """
            QMenuBar {
                background-color: rgba(50, 50, 50, 0.8);
            }
            QMenuBar::item {
                color: white;
                background-color: transparent;
                cursor: pointer;
            }
        """
        )
        corner_widget = QHBoxWidget()
        # DebugStyle(corner_widget)

        clearContext_button = QPushButton("Clear Context", self)
        AddStyle(clearContext_button, "margin-right: 20px;")

        clearContext_button.clicked.connect(self.clearContext)
        quit_button = QPushButton("Exit", self)
        quit_button.clicked.connect(self.mwindow.app.quit)

        corner_widget.boxLayout.addWidget(
            clearContext_button, 1, alignment=Qt.AlignmentFlag.AlignRight
        )
        corner_widget.boxLayout.addWidget(
            quit_button, 1, alignment=Qt.AlignmentFlag.AlignRight
        )

        self.setCornerWidget(corner_widget, Qt.Corner.TopRightCorner)
        self.setCursor(Qt.CursorShape.OpenHandCursor)

    def clearContext(self):
        self.role_gpt.clear_context()

    def addAction(self, action: QAction) -> None:
        # widget_action = QWidgetAction(self)
        # widget_label = QPushButton(action.text(), self)
        # widget_label.clicked.connect(action.trigger)
        # widget_action.setDefaultWidget(widget_label)
        # widget_label.show()
        # action.hovered.connect(lambda: self.setCursor(Qt.CursorShape.PointingHandCursor))
        return super().addAction(action)

    def mousePressEvent(self, event: QMouseEvent) -> None:
        on_action = self.activeAction()
        if event.button() == Qt.MouseButton.LeftButton:
            if on_action:
                self.setCursor(Qt.CursorShape.PointingHandCursor)
            else:
                self.setCursor(Qt.CursorShape.ClosedHandCursor)
            self.dragPosition = (
                event.scenePosition().toPoint() - self.frameGeometry().topLeft()
            )
        return super().mousePressEvent(event)

    def mouseReleaseEvent(self, a0: QMouseEvent) -> None:
        on_action = self.activeAction()
        if on_action:
            self.setCursor(Qt.CursorShape.PointingHandCursor)
        else:
            self.setCursor(Qt.CursorShape.OpenHandCursor)
        return super().mouseReleaseEvent(a0)

    def mouseMoveEvent(self, event: QMouseEvent) -> None:
        on_action = self.activeAction()
        left_clicking = event.buttons() == Qt.MouseButton.LeftButton
        if left_clicking and not on_action:
            self.setCursor(Qt.CursorShape.ClosedHandCursor)
            newPosition = event.globalPosition().toPoint() - self.dragPosition
            self.window().move(newPosition)
        elif on_action:
            if left_clicking:
                self.setCursor(Qt.CursorShape.PointingHandCursor)
            else:
                self.setCursor(Qt.CursorShape.PointingHandCursor)
        elif not on_action:
            self.setCursor(Qt.CursorShape.OpenHandCursor)
        else:
            self.setCursor(Qt.CursorShape.OpenHandCursor)
        return super().mouseMoveEvent(event)


class MainWindow(QMainWindow, BorderlessWindow):
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

        self.centralwidget = QWidget(self)
        self.centralwidget.setObjectName("centralwidget")

        self.vLayoutWidget = QWidget(self.centralwidget)
        self.vLayoutWidget.setObjectName("vLayoutWidget")
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
        self.setCentralWidget(self.hLayoutWidget)

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

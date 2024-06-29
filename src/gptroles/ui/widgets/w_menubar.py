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
from gptroles.ui.widgets.w_tools import AddStyle, QHBoxWidget


# from gptroles.ui.widgets.terminal import SerialPortWidget
from gptroles.ui.widgets.w_chatbox import ChatBox
from gptroles.ui.widgets.w_borderlesswindow import BorderlessWindow, BaseWindow
from gptroles.ui.widgets.w_settings import SettingsWidget

from gptroles.ui.interfaces.GptConnectorDI import GptConnectorDI

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from gptroles.ui.application import RoleChat


class CustomMenuBar(QMenuBar):
    def __init__(self, parent: QWidget = None) -> None:
        super().__init__(parent)
        GptConnectorDI(self)
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

        clearContext_button = QPushButton("Clear+Save Context", self)
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
        self.gpt_connector.clear_context()

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

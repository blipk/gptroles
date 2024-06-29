from enum import Enum
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


class DebugStyle:
    def __init__(self, widget: QWidget) -> None:
        widget.setStyleSheet("border: 2px solid red; padding: 0; margin: 0;")


class SetStyle:
    def __init__(self, widget: QWidget, css: str) -> None:
        widget.setStyleSheet(css)


class AddStyle:
    def __init__(self, widget: QWidget, css: str) -> None:
        widget.setStyleSheet(f"{widget.styleSheet()}; {css}\n")


class CustomQHBoxLayout(QHBoxLayout):
    def __init__(self, parent: QWidget = None) -> None:
        super().__init__(parent)
        self.setSpacing(0)
        self.setContentsMargins(0, 0, 0, 0)
        self.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)


class CustomQVBoxLayout(QVBoxLayout):
    def __init__(self, parent: QWidget = None) -> None:
        super().__init__(parent)
        self.setSpacing(0)
        self.setContentsMargins(0, 0, 0, 0)
        self.setSizeConstraint(QLayout.SizeConstraint.SetMaximumSize)


class LayoutType(Enum):
    Horizontal = CustomQHBoxLayout
    Vertical = CustomQVBoxLayout


class QHBoxWidget(QWidget):
    boxLayout: CustomQHBoxLayout | CustomQVBoxLayout

    def __init__(
        self, parent: QWidget = None, layout_type: LayoutType = LayoutType.Horizontal
    ) -> None:
        super().__init__(parent)

        self.boxLayout = layout_type.value()
        self.setLayout(self.boxLayout)

        self.setContentsMargins(0, 0, 0, 0)
        # self.setAsParentGeometry()
        # self.setStyleSheet("padding: 0; margin: 0;")

    def setAsParentGeometry(self):
        parent = self.parent()
        if isinstance(parent, QHBoxLayout) or isinstance(parent, QVBoxLayout):
            parent: QHBoxLayout | QVBoxLayout
            self.setGeometry(parent.geometry())

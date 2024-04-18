from PyQt6.QtCore import Qt, QPointF, QRectF, QSizeF
from PyQt6.QtGui import QPainter, QBrush, QColor, QPainterPath
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


class BaseWindow:
    def toggleAppear(self: QMainWindow):
        if self.isVisible():
            self.hide()
        else:
            self.appear()

    def appear(self: QMainWindow):
        self.show()
        self.raise_()
        self.activateWindow()

    def center(self: QMainWindow):
        qr = self.window().frameGeometry()
        # print("Centering", qr, QApplication.instance().primaryScreen().availableGeometry().center())
        qr.moveCenter(
            QApplication.instance().primaryScreen().availableGeometry().center()
        )
        self.window().move(qr.topLeft())
        # wh = self.window().windowHandle()
        # if wh:
        #     wh.startSystemMove()

    # def mousePressEvent(self, event):
    #     if event.button() == Qt.LeftButton:
    #         self.dragPos = event.globalPos() - self.frameGeometry().topLeft()
    #         event.accept()

    # def mouseMoveEvent(self, event):
    #     if event.buttons() == Qt.LeftButton:
    #         self.move(event.globalPos() - self.dragPos)
    #         event.accept()


class BorderlessWindow(QWidget, BaseWindow):
    def __init__(self, extra_flags=None, parent=None):
        super().__init__(parent)
        if extra_flags is None:
            extra_flags = []
        flags = Qt.WindowType.Window | Qt.WindowType.FramelessWindowHint
        for flag in extra_flags:
            flags |= flag
        self.setWindowFlags(flags)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.setStyleSheet(
            """
            BorderlessWindow{
                 background-color: rgba(255, 255, 255, 255);
                 margin: 0;
                 padding: 0;
            }
            """
        )

class RoundedCornerWindow(QWidget, BaseWindow):
    def __init__(self, parent=None):
        super().__init__(parent)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setBrush(QBrush(QColor("#f0f0f0")))  # Set the background color
        painter.setPen(Qt.PenStyle.NoPen)

        painter.drawRoundedRect(self.rect(), 12, 12)
        # rect = self.rect()
        # radius_top_left = 50
        # radius_top_right = 100
        # radius_bottom_left = 75
        # radius_bottom_right = 25

        # path = QPainterPath()
        # path.moveTo(QPointF(rect.topRight()) - QPointF(0, radius_top_right))
        # path.arcTo(QRectF(QPointF(rect.topRight()) - QPointF(radius_top_right, radius_top_right), QSizeF(radius_top_right * 2, radius_top_right * 2)), 0.0, 90.0)

        # path.lineTo(QPointF(rect.bottomRight()) - QPointF(radius_bottom_right, 0))
        # path.arcTo(QRectF(QPointF(rect.bottomRight()) - QPointF(radius_bottom_right, radius_bottom_right), QSizeF(radius_bottom_right * 2, radius_bottom_right * 2)), 90.0, 90.0)

        # path.lineTo(QPointF(rect.bottomLeft()) + QPointF(radius_bottom_left, 0))
        # path.arcTo(QRectF(QPointF(rect.bottomLeft()), QSizeF(radius_bottom_left * 2, radius_bottom_left * 2)), 180.0, 90.0)

        # path.lineTo(QPointF(rect.topLeft()) + QPointF(0, radius_top_left))
        # path.arcTo(QRectF(QPointF(rect.topLeft()), QSizeF(radius_top_left * 2, radius_top_left * 2)), 270.0, 90.0)

        # painter.drawPath(path)

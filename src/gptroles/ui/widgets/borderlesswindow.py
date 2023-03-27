from PyQt6.QtGui import *
from PyQt6.QtCore import *
from PyQt6.QtWidgets import *

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
            QApplication.instance()
            .primaryScreen()
            .availableGeometry()
            .center())
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
        self.setStyleSheet('''
            BorderlessWindow{
                 background-color: rgba(255, 255, 255, 255);
                 margin: 0;
                 padding: 0;
            }
            ''')
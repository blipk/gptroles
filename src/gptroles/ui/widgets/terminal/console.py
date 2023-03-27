from PyQt6.QtWidgets import QPlainTextEdit
from PyQt6.QtGui import QKeyEvent, QMouseEvent, QContextMenuEvent, QPalette, QColor
from PyQt6.QtWidgets import QScrollBar
from PyQt6.QtCore import pyqtSignal, QByteArray, Qt

class Console(QPlainTextEdit):

    getData = pyqtSignal(QByteArray)

    def __init__(self, parent=None):
        super(Console, self).__init__(parent)
        self.document().setMaximumBlockCount(100)
        p = self.palette()
        p.setColor(QPalette.ColorRole.Base, Qt.GlobalColor.black)
        p.setColor(QPalette.ColorRole.Text, Qt.GlobalColor.green)
        self.setPalette(p)
        self.m_localEchoEnabled = False

    def putData(self, data: QByteArray):
        self.insertPlainText(data.decode())

        bar = self.verticalScrollBar()
        bar.setValue(bar.maximum())

    def setLocalEchoEnabled(self, set):
        self.m_localEchoEnabled = set

    def keyPressEvent(self, e: QKeyEvent):
        if e.key() in [Qt.Key.Key_Backspace, Qt.Key.Key_Left, Qt.Key.Key_Right, Qt.Key.Key_Up, Qt.Key.Key_Down]:
            pass
        else:
            if self.m_localEchoEnabled:
                super(Console, self).keyPressEvent(e)
            self.getData.emit(e.text().encode())

    def mousePressEvent(self, e: QMouseEvent):
        super(Console, self).mousePressEvent(e)
        self.setFocus()

    def mouseDoubleClickEvent(self, e: QMouseEvent):
        super(Console, self).mouseDoubleClickEvent(e)
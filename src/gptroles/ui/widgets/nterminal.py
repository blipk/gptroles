from PyQt6.QtCore import QTimer, Qt
from PyQt6.QtGui import QColor, QFont, QFontMetricsF, QKeyEvent, QPainter, QClipboard
from PyQt6.QtWidgets import QLayout, QGraphicsAnchorLayout, QScrollBar, QWidget

from simpleterminal import SimpleTerminal

class QLightTerminal(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.scrollbar = QScrollBar(Qt.Orientation.Vertical)
        self.boxLayout = QLayout(self)
        self.cursorTimer = QTimer(self)
        self.selectionTimer = QTimer(self)
        self.st = SimpleTerminal()
        self.closed = False
        self.cursorVisible = True
        self.defaultBackground = 256
        self.colors = [QColor()] * 258
        self.win = {
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "font-size": 100,
            "lineheight": 10,
            "charWith": 10,
            "lineHeightScale": 1.25,
            "vPadding": 10,
            "hPadding": 8.42,
            "scrollMultiplier": 0,
            "histi": 8
        }
        self.setAttribute(Qt.WidgetAttribute.WA_StyledBackground, True)
        self.setFontSize(10, 500)
        self.updateStyleSheet()

        self.boxLayout.setSpacing(0)
        self.boxLayout.setContentsMargins(0, 0, 0, 0)
        self.boxLayout.addWidget(self.scrollbar)
        self.boxLayout.setAlignment(self.scrollbar, Qt.AlignmentFlag.AlignRight)

        self.scrollbar.valueChanged.connect(self.scrollX)

        self.win["viewPortHeight"] = self.win["height"] / self.win["lineheight"]
        self.setupScrollbar()

        self.st.s_error.connect(lambda error: self.s_error.emit(f"Error from st: {error}"))
        self.st.s_updateView.connect(self.updateTerminal)

        self.cursorTimer.timeout.connect(lambda: self.updateCursor(not self.cursorVisible))
        self.cursorTimer.start(750)

        self.selectionTimer.timeout.connect(self.updateSelection)
        self.resizeTimer = QTimer(self)
        self.resizeTimer.timeout.connect(self.resize)

        self.st.s_closed.connect(self.close)

    def close(self):
        self.setDisabled(True)
        self.closed = True
        self.scrollbar.setVisible(False)

        self.cursorTimer.stop()
        self.selectionTimer.stop()
        self.update()

        self.s_closed.emit()

    def updateTerminal(self, term):
        self.cursorVisible = True
        self.cursorTimer.start(750)

        if self.st.term.histi != self.scrollbar.maximum():
            isMax = self.scrollbar.value() == self.scrollbar.value()
            self.scrollbar.setMaximum(self.st.term.histi * self.win["scrollMultiplier"])

            if isMax:
                self.scrollbar.setValue(self.scrollbar.maximum())

            self.scrollbar.setVisible(self.scrollbar.maximum() != 0)

        self.update()

    def scrollX(self, n):
        scroll = self.st.term.scr - (self.scrollbar.maximum() - self.scrollbar.value()) / self.win["scrollMultiplier"]
        if scroll < 0:
            self.st.kscrollup(-scroll)
        else:
            self.st.kscrolldown(scroll)
        self.update()

    def setFontSize(self, size, weight):
        mono = QFont("Monospace", size, weight)
        mono.setFixedPitch(True)
        mono.setStyleHint(QFont.Monospace)
        self.setFont(mono)

        metric = QFontMetricsF(mono)
        linespacing = metric.lineSpacing()
        self.win["lineheight"] = linespacing * self.win["lineHeightScale"]
        self.win["fontSize"] = size
        initialRect = metric.boundingRect("a")
        improvedRect = metric.boundingRect(initialRect, "a")
        self.win["charWith"] = improvedRect.width()
        self.win["charHeight"] = improvedRect.height()
        self.update()

    def setBackground(self, color):
        self.colors[self.defaultBackground] = color
        self.updateStyleSheet()

    def setLineHeightScale(self, scale):
        metric = QFontMetricsF(self.font())
        self.win["lineheight"] = metric.lineSpacing() * scale
        self.win["lineHeightScale"] = scale
        self.update()

    def setPadding(self, vertical, horizontal):
        self.win["hPadding"] = horizontal
        self.win["vPadding"] = vertical
        self.update()

    def updateStyleSheet(self):
        styleSheet = ""
        for i in range(0, 258):
            styleSheet += f"span({i}).bg-color: {self.colors[i].name()}; "
        self.setStyleSheet(styleSheet)

    def setupScrollbar(self):
        self.win["scrollMultiplier"] = 1
        self.scrollbar.setPageStep(int(self.win["viewPortHeight"] * self.win["scrollMultiplier"]))
        self.scrollbar.setSingleStep(1)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.fillRect(event.rect(), self.colors[self.defaultBackground])
        painter.setPen(self.colors[7])

        topLine = self.scrollbar.value() / self.win["lineheight"]
        bottomLine = topLine + self.win["viewPortHeight"]

        for i in range(int(topLine), int(bottomLine)):
            if i < len(self.st.term.line):
                self.paintLine(painter, self.st.term.line[i], i)

        if self.st.term.c.y < topLine or self.st.term.c.y > bottomLine:
            self.scrollbar.setValue(self.st.term.c.y * self.win["lineheight"])

        if self.cursorVisible:
            self.paintCursor(painter)

    def updateCursor(self, visible):
        self.cursorVisible = visible
        self.update()

    def paintLine(self, painter, line, lineNumber):
        x = self.win["hPadding"]
        y = lineNumber * self.win["lineheight"] - self.scrollbar.value()

        for i, cell in enumerate(line):
            if cell.bg != self.defaultBackground or cell.fg != 7:
                painter.setPen(self.colors[cell.fg])
                painter.fillRect(x, y, self.win["charWith"], self.win["lineheight"], self.colors[cell.bg])
                painter.drawText(x, y + self.win["lineheight"] - self.win["charHeight"] - 1, cell.c)
            else:
                painter.drawText(x, y + self.win["lineheight"] - self.win["charHeight"] - 1, cell.c)

            x += self.win["charWith"]

    def paintCursor(self, painter):
        if self.st.term.mode & self.st.MODE_HIDE:
            return

        x = self.win["hPadding"] + self.st.term.c.x * self.win["charWith"]
        y = self.st.term.c.y * self.win["lineheight"] - self.scrollbar.value()

        painter.fillRect(x, y, self.win["charWith"], self.win["charHeight"], self.colors[7])
        painter.setPen(self.colors[self.defaultBackground])
        painter.drawText(x, y + self.win["lineheight"] - self.win["charHeight"] - 1, self.st.term.line[self.st.term.c.y][self.st.term.c.x].c)

    def resize(self):
        self.win["width"] = self.width()
        self.win["height"] = self.height()

        self.win["viewPortHeight"] = self.win["height"] / self.win["lineheight"]
        self.setupScrollbar()

        self.update()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key.Key_C and event.modifiers() & Qt.KeyboardModifier.ControlModifier:
            clipboard = QGuiApplication.clipboard()
            clipboard.setText(self.st.selectionText())
        else:
            self.st.kpress(event)
        self.update()

    def keyReleaseEvent(self, event):
        self.st.krelease(event)
        self.update()

    def mousePressEvent(self, event):
        self.st.mpress(event)
        self.update()

    def mouseReleaseEvent(self, event):
        self.st.mrelease(event)
        self.update()

    def mouseMoveEvent(self, event):
        self.st.mmove(event)
        self.update()

    def contextMenuEvent(self, event):
        menu = self.createStandardContextMenu()
        menu.exec_(event.globalPos())

    def updateSelection(self):
        if not self.st.hasSelection():
            self.selectionTimer.stop()
            return

        if self.st.selectionNeedsUpdate():
            self.update()

    def copy(self):
        clipboard = QGuiApplication.clipboard()
        clipboard.setText(self.st.selectionText())
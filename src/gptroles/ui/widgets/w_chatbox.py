import os
import html
import json
import base64
import requests
import threading


from PyQt6.QtGui import (
    QAction,
    QGuiApplication,
    QFontMetrics,
    QTextCursor,
    QDragEnterEvent,
    QDropEvent,
    QDesktopServices
)
from PyQt6.QtCore import (
    Qt,
    QUrl,
    pyqtSignal,
    pyqtSlot,
    QVariant,
    QObject,
    QCoreApplication,
    QEvent,
)
from PyQt6.QtWidgets import (
    QApplication,
    QVBoxLayout,
    QHBoxLayout,
    QWidget,
    QLineEdit,
    QMainWindow,
    QTextEdit,
    QWidgetAction,
)
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEnginePage, QWebEngineSettings
from PyQt6.QtWebChannel import QWebChannel
from PyQt6.QtTest import QTest

from gptroles.ui.widgets.chatmsg import ChatMessage
from gptroles.ui.widgets.w_input_toolbar import InputToolbar
from gptroles.ui.widgets.w_memory_toolbar import MemoryToolbar
from gptroles.ui.widgets.w_netprompts import PromptsWindow

from gptroles.ai.connectors.connector import run_shell
from gptroles.ui.interfaces.GptConnectorDI import GptConnectorDI


from typing import TYPE_CHECKING

from gptroles.utils import convert_image_to_base64

if TYPE_CHECKING:
    from gptroles.ui.w_mainwindow import MainWindow


import uuid


class Bridge(QObject):
    dataChanged = pyqtSignal(QVariant)
    # Define a function that can be called from Javascript

    @pyqtSlot(QVariant)
    def setData(self, data):
        self.dataChanged.emit(data)


class ChatPage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.view: QWebEngineView = parent
        self.chatbox: ChatBox = self.view.parent()
        self.bridge = Bridge()
        self.bridge.dataChanged.connect(self.jsMessageRecieved)
        self.channel = QWebChannel()
        self.channel.registerObject("bridge", self.bridge)
        self.setWebChannel(self.channel)
        page_path = os.path.join(
            os.path.dirname(__file__), "..", "webapp", "dist", "index.html"
        )
        chatpage_url = QUrl("file://" + page_path)

        self.setFeaturePermission(
            chatpage_url,
            QWebEnginePage.Feature.Notifications,
            QWebEnginePage.PermissionPolicy.PermissionGrantedByUser,
        )
        self.setZoomFactor(1.2)
        self.load(chatpage_url)

    def acceptNavigationRequest(self, url: QUrl, _type, isMainFrame):
        """Open links in external browser"""
        # print(f"Navigation request: {url.toString()}, Type: {_type}, Is Main Frame: {isMainFrame}")
        if _type == QWebEnginePage.NavigationType.NavigationTypeLinkClicked:
            QDesktopServices.openUrl(url)
            return False
        return super().acceptNavigationRequest(url, _type, isMainFrame)

    def sendMessageToJS(self, cmd, args: list):
        # Escapes for passing markdown ticked blocks etc into js template literals passed to the webview
        args = [str(arg).replace("`", "|TICK|").replace("${", "$|{") for arg in args]
        js_args = f"`{'`, `'.join([str(a) for a in args])}`"
        # TODO track the ids

        script = f"window.addBusMessage({{ id: '{uuid.uuid4()}', cmd: '{cmd}', args: [{js_args}] }});"
        self.runJavaScript(script)

    def jsMessageRecieved(self, data):
        if type(data) is str:
            data = json.loads(data)

        print(f"Received JS message: {data}", type(data))

        id, sourceMessageId, message = data

        if type(message) is list:
            command, *params = data
            if command == "run_code":
                msgid, blockindex, lang, code = params
                shell = (
                    lang
                    if lang in ("bash", "sh", "zsh", "python", "js", "javascript")
                    else "bash"
                )
                string_flag = None
                if lang == "javascript":
                    shell = "node"
                    string_flag = "-e"
                out, err, rcode = run_shell(code, shell, string_flag, True)
                if err or rcode:
                    print("Command failure:", rcode, err)
                    self.sendMessageToJS(
                        "updateBlockOutput", [msgid, f"{out}{err}", blockindex, rcode]
                    )
                else:
                    print("Command complete:", out)
                    self.sendMessageToJS("updateBlockOutput", [msgid, out, blockindex])
            elif command == "save":
                msgid, blockindex, lang, code = params
                from gptroles.ui.utils import find_lang_extension

                file_name = find_lang_extension(lang) or "snippet.txt"
                res = self.chatbox.mwindow.app.save_file(
                    "Save snippet", code, file_name=file_name
                )


class InputBox(QTextEdit):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.chatbox: ChatBox = parent
        self.document().setDefaultStyleSheet(
            """
a {
    border-radius: 2px;
    border: 6px solid red;
    text-decoration: none;
}
        """
        )

    def focusInEvent(self, e) -> None:
        self.setSize()
        return super().focusInEvent(e)

    def dragEnterEvent(self, e: QDragEnterEvent) -> None:
        mimedata = e.mimeData()
        if mimedata.hasUrls():
            e.acceptProposedAction()
        return super().dragEnterEvent(e)

    def addFile(self, file_path, contents, position):
        file_path = "/path/to/file.txt"
        file_name = os.path.basename(file_path)
        html_code = f'<a href="file://{file_path}" x-path="{file_path}" title="{file_path}">📁 {file_name}</a>'
        cursor_pos = self.textCursor().position()
        tcursor = self.textCursor()
        self.setTextCursor(self.cursorForPosition(position))

        self.insertHtml(html_code)
        # set the block and format to read-only
        block_format = tcursor.blockFormat()
        block_format.setProperty(Qt.ItemDataRole.EditRole, False)
        tcursor.mergeBlockFormat(block_format)
        text_format = tcursor.charFormat()
        text_format.setProperty(Qt.ItemDataRole.EditRole, False)
        tcursor.setCharFormat(text_format)
        tcursor.setBlockFormat(block_format)

        # reset cursor
        self.textCursor().setPosition(cursor_pos)

        # set the text format back to writable
        block_format.setProperty(Qt.ItemDataRole.EditRole, True)
        tcursor.setBlockFormat(block_format)
        text_format.setProperty(Qt.ItemDataRole.EditRole, True)
        tcursor.setCharFormat(text_format)

    def dropEvent(self, e: QDropEvent) -> None:
        mimedata = e.mimeData()
        if mimedata.hasUrls():
            for url in mimedata.urls():
                print("Dropped file:", url.toLocalFile(), self.cursor().pos())
                self.addFile(url.toLocalFile(), "", e.position().toPoint())
        else:
            return super().dropEvent(e)

    def setSize(self, lines=None):
        doc = self.document()
        # lines = lines or doc.lineCount()
        lines = lines or self.toPlainText().count("\n") + 1
        metrics = QFontMetrics(doc.defaultFont())
        margins = self.contentsMargins()
        lheight = (
            (metrics.lineSpacing() * lines)
            + ((doc.documentMargin() + self.frameWidth()) * 2)
            + margins.top()
            + margins.bottom()
        )
        # print("Setting height:", lines, lheight, self.document().lineCount(), self.document().blockCount())
        height = min([self.chatbox.height() / 1.6, lheight])
        self.setMaximumHeight(int(height))

    def keyPressEvent(self, event):
        modifiers = QGuiApplication.keyboardModifiers()
        shifting = False
        if modifiers & Qt.KeyboardModifier.ShiftModifier:
            shifting = True
        if event.key() == Qt.Key.Key_Return and not shifting:
            user_input = self.toPlainText()
            self.chatbox.add_message(ChatMessage("You", user_input))
            self.clear()
            self.moveCursor(
                QTextCursor.MoveOperation.Start, QTextCursor.MoveMode.MoveAnchor
            )
            thread = threading.Thread(target=self.chatbox.ask, args=(user_input,))
            thread.start()
            self.setSize()
        elif event.key() == Qt.Key.Key_Up and not shifting and not self.toPlainText():
            user_messages = [m for m in self.chatbox.messages if m.username == "You"]
            if len(user_messages):
                self.setText(user_messages[-1].content)
                self.setSize()
        # elif event.key() in (Qt.Key.Key_Delete, Qt.Key.Key_Backspace):
        #     super().keyPressEvent(event)
        #     self.setSize()
        else:
            super().keyPressEvent(event)
            self.setSize()

        # Call the base class implementation to handle other keys


class ChatBox(QWidget):
    chatMessageSignal = pyqtSignal(ChatMessage)

    def __init__(self, parent=None):
        super(ChatBox, self).__init__(parent)
        GptConnectorDI(self)
        self.mwindow: MainWindow = parent
        self.messages: ChatMessage = []
        self.setContentsMargins(0, 0, 0, 0)

        self.layout: QVBoxLayout = QVBoxLayout(self)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.layout.setSpacing(0)

        self.input_box = InputBox(self)
        self.chatMessageSignal.connect(
            self.add_message, Qt.ConnectionType.QueuedConnection
        )

        self.webview = QWebEngineView(self)
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.FocusOnNavigationEnabled, True
        )
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.JavascriptEnabled, True
        )
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.JavascriptCanAccessClipboard, True
        )
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.JavascriptCanPaste, True
        )
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True
        )
        # self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.ErrorPageEnabled, True
        )
        # self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, True)
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.NavigateOnDropEnabled, False
        )
        self.webview.settings().setAttribute(
            QWebEngineSettings.WebAttribute.PdfViewerEnabled, False
        )
        self.page = ChatPage(self.webview)
        self.page.setVisible(True)
        self.webview.setPage(self.page)

        self.layout.addWidget(self.webview)

        self.memory_toolbar = MemoryToolbar(self)
        self.layout.addWidget(self.memory_toolbar)

        self.input_toolbar: InputToolbar = InputToolbar()
        self.layout.addWidget(self.input_toolbar)

        self.layout.addWidget(self.input_box)

        menu = self.parent().menuBar()
        netaction = QAction("Online Prompts", self)
        netaction.triggered.connect(self.toggleNetPrompts)
        menu.addAction(netaction)
        # Dev view for ChatPage
        if self.mwindow.app.debug_mode:
            self.dev_view = QWebEngineView()
            self.dev_view.setMaximumHeight(440)
            self.dev_view.setVisible(False)
            self.layout.addWidget(self.dev_view, 100)
            self.page.setDevToolsPage(self.dev_view.page())

            devt_action = QAction("DevTools", self)
            devt_action.triggered.connect(self.toggleDevTools)
            menu.addAction(devt_action)
            # msgaction = QAction("PyMessage", self)
            # msgaction.triggered.connect(lambda: self.page.sendMessageToJS("Hello from Python!"))
            # menu.addAction(msgaction)

        self.webview.loadFinished.connect(self.onLoadFinished)
        self.netPromptsWindow = None

    def toggleNetPrompts(self):
        if not self.netPromptsWindow:
            self.netPromptsWindow = PromptsWindow(self)
        self.netPromptsWindow.toggleAppear()

    def toggleDevTools(self):
        self.dev_view.setVisible(not self.dev_view.isVisible())

    def onLoadFinished(self, ok):
        if ok:
            print("Page ready")
            chat_user, chat_response = self.gpt_connector.confirm_role()
            self.add_message(ChatMessage(chat_user, chat_response))
            self.input_box.setSize()
            self.input_box.setFocus()

    def ask(self, prompt):
        photo_button = self.input_toolbar.photo_button

        def fn(*args, **kwargs):
            return (
                self.gpt_connector.ask_image(
                    *args,
                    **kwargs,
                    size=photo_button.resolution_mode,
                    quality=photo_button.quality_mode,
                    model=photo_button.model_mode,
                )
                if photo_button.photo_button_pressed
                else self.gpt_connector.ask(*args, **kwargs)
            )

        role, answer = fn(prompt)
        self.chatMessageSignal.emit(ChatMessage(role, answer))

    @pyqtSlot(ChatMessage)
    def add_message(self, chat_message: ChatMessage):
        self.messages.append(chat_message)
        chat_message_content = chat_message.content

        if "dall-e" in chat_message.username:
            data_url = convert_image_to_base64(chat_message_content)
            chat_message_content = f"<img src='{data_url}' width='80%' height='80%'/>"

        self.page.sendMessageToJS(
            "addMessage",
            [
                chat_message.id,
                chat_message.receivedAt,
                html.escape(chat_message.username),
                chat_message_content,
                chat_message.isInContext or ""
            ],
        )

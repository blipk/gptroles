import os
import html
import threading
from PyQt6.QtGui import QAction, QGuiApplication, QFontMetrics, QTextCursor
from PyQt6.QtCore import Qt, QUrl, pyqtSignal, pyqtSlot, QVariant, QObject
from PyQt6.QtWidgets import QApplication, QVBoxLayout, QHBoxLayout, QWidget, QLineEdit, QMainWindow, QTextEdit
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEnginePage, QWebEngineSettings
from PyQt6.QtWebChannel import QWebChannel

from .chatmsg import ChatMessage
from .netprompts import BorderlessWindow
from ..gpt import RoleGpt, system_role, gptroles, run_shell

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .mainwindow import MainWindow

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
        page_path = os.path.join(os.path.dirname(__file__), "web", "chatpage.html")
        chatpage_url = QUrl("file://" + page_path)

        self.setFeaturePermission(chatpage_url, QWebEnginePage.Feature.Notifications, QWebEnginePage.PermissionPolicy.PermissionGrantedByUser)
        self.setZoomFactor(1.2)
        self.load(chatpage_url)

    def sendMessageToJS(self, message):
        script = f"window.handlePyMessage('{message}');"
        self.runJavaScript(script)

    def jsMessageRecieved(self, data):
        print(f"Received JS message: {data}")
        if type(data) is list:
            command, *params = data
            if command == "run_code":
                msgid, blockindex, lang, code = params
                shell = "python" if lang == "python" else "bash"
                out, err, rcode = run_shell(code, shell, True)
                if err or rcode:
                    print("Command failure:", rcode, err)
                else:
                    print("Command complete:", out)
                    js = f"window.chatPage.updateMessage('{msgid}', `{out}`, '{blockindex}')"
                    self.runJavaScript(js)
            elif command == "save":
                msgid, blockindex, lang, code = params
                from .utils import find_lang_extension
                file_name = find_lang_extension(lang) or "snippet.txt"
                res = self.chatbox.mwindow.app.save_file("Save snippet", code, file_name=file_name)

class InputBox(QTextEdit):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.chatbox: ChatBox = parent

    def focusInEvent(self, e) -> None:
        self.setSize()
        return super().focusInEvent(e)

    def setSize(self, lines=None):
        doc = self.document()
        # lines = lines or doc.lineCount()
        lines = lines or self.toPlainText().count("\n") + 1
        metrics = QFontMetrics(doc.defaultFont())
        margins = self.contentsMargins()
        lheight = (metrics.lineSpacing() * lines) + ((doc.documentMargin() + self.frameWidth()) * 2) + margins.top() + margins.bottom()
        # print("Setting height:", lines, lheight, self.document().lineCount(), self.document().blockCount())
        height = min([self.chatbox.height()/1.6, lheight])
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
            self.moveCursor(QTextCursor.MoveOperation.Start, QTextCursor.MoveMode.MoveAnchor)
            thread = threading.Thread(target=self.chatbox.ask, args=(user_input,))
            thread.start()
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
        self.mwindow: MainWindow = parent
        self.rolegpt = RoleGpt(parent.settings, gptroles)
        self.messages = []

        self.layout: QVBoxLayout = QVBoxLayout(self)
        self.input_box = InputBox(self)
        # self.input_box.returnPressed.connect(self.on_input_entered)
        self.chatMessageSignal.connect(self.add_message, Qt.ConnectionType.QueuedConnection)

        self.webview = QWebEngineView(self)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.JavascriptCanAccessClipboard, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.JavascriptCanPaste, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True)
        # self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.ErrorPageEnabled, True)
        # self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.NavigateOnDropEnabled, False)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.PdfViewerEnabled, False)
        self.page = ChatPage(self.webview)
        self.page.setVisible(True)
        self.webview.setPage(self.page)

        self.layout.addWidget(self.webview)
        self.layout.addWidget(self.input_box)

        menu = self.parent().menuBar()
        netaction = QAction("JailBreakChat", self)
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
            self.netPromptsWindow = BorderlessWindow(self)
        self.netPromptsWindow.toggleAppear()

    def toggleDevTools(self):
        self.dev_view.setVisible(not self.dev_view.isVisible())

    def onLoadFinished(self, ok):
        if ok:
            chat_user, chat_response = self.rolegpt.confirm_role()
            self.add_message(ChatMessage(chat_user, chat_response))

    def ask(self, prompt):
        role, answer = self.rolegpt.ask(prompt)
        self.chatMessageSignal.emit(ChatMessage(role, answer))

    @pyqtSlot(ChatMessage)
    def add_message(self, chat_message: ChatMessage):
        self.messages.append(chat_message)
        chat_message_text = chat_message.text.replace('`', '|TICK|').replace("${", "$|{")
        js = f"window.chatPage.addMessage('{html.escape(chat_message.user)}', `{chat_message_text}`, '{chat_message.time}', '{chat_message.id}')"
        self.page.runJavaScript(js)
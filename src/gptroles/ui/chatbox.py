import os
import html
import threading
from PyQt6.QtGui import QAction
from PyQt6.QtCore import Qt, QUrl, pyqtSignal, pyqtSlot, QVariant, QObject
from PyQt6.QtWidgets import QApplication, QVBoxLayout, QWidget, QLineEdit, QMainWindow
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEnginePage, QWebEngineSettings
from PyQt6.QtWebChannel import QWebChannel
from gptroles.gpt import rolegpt, RoleGpt
from gptroles.ui.netprompts import BorderlessWindow

class Bridge(QObject):
    dataChanged = pyqtSignal(QVariant)
    # Define a function that can be called from Javascript
    @pyqtSlot(QVariant)
    def setData(self, data):
        self.dataChanged.emit(data)

class ChatPage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.bridge = Bridge()
        self.bridge.dataChanged.connect(self.jsMessageRecieved)
        self.channel = QWebChannel()
        self.channel.registerObject("bridge", self.bridge)
        self.setWebChannel(self.channel)
        page_path = os.path.join(os.path.dirname(__file__), "web", "chatpage.html")
        self.load(QUrl("file://" + page_path))

    def jsMessageRecieved(self, data):
        print(f"Received JS message: {data}")

    def sendMessageToJS(self, message):
        script = f"window.handlePyMessage('{message}');"
        self.runJavaScript(script)

class ChatBox(QWidget):
    sig = pyqtSignal(str, str)

    def __init__(self, parent=None):
        super(ChatBox, self).__init__(parent)
        self.rolegpt = rolegpt

        self.layout: QVBoxLayout = QVBoxLayout(self)
        self.input_box = QLineEdit(self)
        self.input_box.returnPressed.connect(self.on_input_entered)
        self.sig.connect(self.after_input_entered, Qt.ConnectionType.QueuedConnection)

        self.webview = QWebEngineView(self)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True)
        self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.ErrorPageEnabled, True)
        # self.webview.settings().setAttribute(QWebEngineSettings.WebAttribute.PluginsEnabled, True)
        self.page = ChatPage(self.webview)
        self.page.setVisible(True)
        self.webview.setPage(self.page)

        self.layout.addWidget(self.webview)
        self.layout.addWidget(self.input_box)

        # Dev view for ChatPage
        self.dev_view = QWebEngineView()
        self.dev_view.setMaximumHeight(440)
        self.dev_view.setVisible(False)
        self.layout.addWidget(self.dev_view, 100)
        self.page.setDevToolsPage(self.dev_view.page())

        menu = self.parent().menuBar()
        # menu.addMenu("File")
        devt_action = QAction("DevTools", self)
        devt_action.triggered.connect(self.toggleDevTools)
        menu.addAction(devt_action)
        msgaction = QAction("PyMessage", self)
        msgaction.triggered.connect(lambda: self.page.sendMessageToJS("Hello from Python!"))
        menu.addAction(msgaction)
        netaction = QAction("JailBreakChat", self)
        netaction.triggered.connect(self.toggleNetPrompts)
        menu.addAction(netaction)

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
            chat_user, chat_response = rolegpt.confirm_role()
            self.after_input_entered(chat_user, chat_response)

    def on_input_entered(self):
        user_input = self.input_box.text().strip()
        self.after_input_entered("You", user_input)
        self.input_box.clear()
        thread = threading.Thread(target=self.ask, args=(user_input,))
        thread.start()

    def ask(self, prompt):
        role, answer = rolegpt.ask(prompt)
        self.sig.emit(role, answer)

    @pyqtSlot(str, str)
    def after_input_entered(self, chat_user, chat_response):
        # chat_response = html.escape(chat_response)
        chat_response = chat_response.replace('`', '|TICK|').replace("${", "$|{")
        js = f"window.chatPage.addChatMessage('{html.escape(chat_user)}', `{chat_response}`, 'Now')"
        self.page.runJavaScript(js)
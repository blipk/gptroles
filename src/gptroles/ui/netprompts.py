import requests
from PyQt6.QtGui import *
from PyQt6.QtCore import *
from PyQt6.QtWidgets import *


class CustomListView(QListWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.prompts = []
        self.itemClicked.connect(self.on_item_click)
        self.itemSelectionChanged.connect(self.on_item_select)
        self.fetch_data()

    def on_item_click(self, item: QListWidgetItem):
        print(f"{item.text()} {item.id} clicked")
        prompt = item.toolTip()
        # print("Setting prompt:", prompt)
        chatbox = self.parent().parent()
        rolegpt = chatbox.rolegpt
        rolegpt.system_role = prompt
        rolegpt.sub_role = ""
        rolegpt.prompt_chain = []
        chat_user, chat_response = rolegpt.confirm_role()
        chatbox.after_input_entered(chat_user, chat_response)

    def on_item_select(self):
        return
        for item in self.selectedItems():
            print(f"{item.text()} selected")

    def fetch_data(self):
        url = "https://www.jailbreakchat.com/api/getprompts"
        try:
            response = requests.get(url)
            prompts = response.json()
            prompts = sorted(prompts, key=lambda x: x["created_at"])
            self.prompts = prompts
            self.kprompts = {prompt["uuid"]: prompt for prompt in prompts}
            # print(prompts[0])
            for prompt in prompts:
                name = prompt["name"]
                if name:
                    list_item = QListWidgetItem(name)
                    list_item.setToolTip(prompt["text"])
                    list_item.id = prompt["id"]
                    list_item.uuid = prompt["uuid"]
                    self.addItem(list_item)
                    # list_item.clicked.connect(lambda item: print(f"Clicked on item: {item.text()}"))
        except requests.exceptions.RequestException as e:
            print("Error fetching data:", e)


class BorderlessWindow(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        self.setWindowFlags(
            Qt.WindowType.Window | Qt.WindowType.FramelessWindowHint | Qt.WindowType.WindowStaysOnTopHint)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        layout = QVBoxLayout(self)
        self.custom_list_view = CustomListView(self)
        layout.addWidget(self.custom_list_view)
        self.setStyleSheet('''
            BorderlessWindow{
                 background-color: rgba(255, 255, 255, 255);
            }
            QListWidget{
                border: 1px solid #d9d9d9;
                outline: none;
            }
            QListWidget::item{
                padding: 5px;
            }
            QListWidget::item:selected{
                background-color: #f5f5f5;
            }
            QListWidget::item:hover{
                background-color: #f5f5f5;
            }
            ''')
        self.resize(350, 500)

    def toggleAppear(self):
        if self.isVisible():
            self.hide()
        else:
            self.appear()

    def appear(self):
        self.show()
        self.raise_()
        self.activateWindow()

    # def mousePressEvent(self, event):
    #     if event.button() == Qt.LeftButton:
    #         self.dragPos = event.globalPos() - self.frameGeometry().topLeft()
    #         event.accept()

    # def mouseMoveEvent(self, event):
    #     if event.buttons() == Qt.LeftButton:
    #         self.move(event.globalPos() - self.dragPos)
    #         event.accept()

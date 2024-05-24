import typing
from PyQt6.QtWidgets import QToolBar, QToolButton, QWidget, QWidgetAction, QMenu
from PyQt6.QtGui import QIcon, QAction
from PyQt6.QtCore import Qt, QSize, QEvent


class ImageGenerationButton(QToolButton):

    def __init__(self, parent: QWidget | None = ...) -> None:
        super().__init__(parent)

        self.photo_button_pressed = False
        self.resolution_mode = "1792x1024"
        self.quality_mode = "standard"
        self.model_mode = "dall-e-3"

        self.dalle2modes = ("1024x1024", "512x512", "256x256")
        self.dalle3modes = ("1024x1024", "1024x1792", "1792x1024")

        icon = QIcon.fromTheme("image-x-generic")
        self.setIcon(icon)
        self.setToolTip("Toggle Image Generation Mode")
        self.setStatusTip("Toggle Image Generation Mode")
        self.setIconSize(QSize(12, 12))
        self.setStyleSheet(
            """
            QToolButton {
                border: none;
                background: none;
            }
            QToolButton:hover {
                background-color: rgba(155, 144, 144, 0.9);
            }
        """
        )
        self.clicked.connect(self.on_photo_click)

    def mousePressEvent(self, event: QEvent):
        if event.button() == Qt.MouseButton.RightButton:
            self.show_context_menu(event.pos())
        else:
            super().mousePressEvent(event)

    def show_context_menu(self, position):
        context_menu = QMenu(self)

        self.resolution_actions = {}
        for r in (
            self.dalle3modes if self.model_mode == "dall-e-3" else self.dalle2modes
        ):
            checkable_action = QAction(r, self)
            self.resolution_actions[r] = checkable_action
            checkable_action.setCheckable(True)
            checkable_action.setChecked(r == self.resolution_mode)
            context_menu.addAction(checkable_action)
            checkable_action.toggled.connect(
                lambda state, x=r: self.resolution_action_toggled(state, x)
            )

        context_menu.addSeparator()

        self.quality_actions = {}
        for m in ("standard", "hd"):
            checkable_action = QAction(m, self)
            self.quality_actions[m] = checkable_action
            checkable_action.setCheckable(True)
            checkable_action.setChecked(m == self.quality_mode)
            context_menu.addAction(checkable_action)
            checkable_action.toggled.connect(
                lambda state, x=m: self.quality_action_toggled(state, x)
            )

        context_menu.addSeparator()

        self.model_actions = {}
        for m in ("dall-e-3", "dall-e-2"):
            checkable_action = QAction(m, self)
            self.model_actions[m] = checkable_action
            checkable_action.setCheckable(True)
            checkable_action.setChecked(m == self.model_mode)
            context_menu.addAction(checkable_action)
            checkable_action.toggled.connect(
                lambda state, x=m: self.model_action_toggled(state, x)
            )

        context_menu.exec(self.mapToGlobal(position))

    def model_action_toggled(self, state, model_name):
        qaction: QAction = self.model_actions[model_name]
        # print("clicked", quality, qaction, qaction.isChecked(), state, self.quality_actions)
        if model_name == "dall-e-2" and self.resolution_mode not in self.dalle2modes:
            self.resolution_mode = self.dalle2modes[0]
        if model_name == "dall-e-3" and self.resolution_mode not in self.dalle3modes:
            self.resolution_mode = self.dalle3modes[0]
        self.model_mode = model_name

    def quality_action_toggled(self, state, quality):
        qaction: QAction = self.quality_actions[quality]
        # print("clicked", quality, qaction, qaction.isChecked(), state, self.quality_actions)
        self.quality_mode = quality

    def resolution_action_toggled(self, state, resolution):
        qaction: QAction = self.resolution_actions[resolution]
        print(
            "clicked",
            resolution,
            qaction,
            qaction.isChecked(),
            state,
            self.resolution_mode,
        )
        self.resolution_mode = resolution
        # qaction.setChecked(not qaction.isChecked())

    def on_photo_click(self):
        # Toggle the boolean state
        self.photo_button_pressed = not self.photo_button_pressed
        # Update the button's style
        if self.photo_button_pressed:
            self.setStyleSheet(
                """
                QToolButton {
                    border: 1px dashed lightgray;
                    background-color: lightblue;
                }
                QToolButton:hover {
                    background-color: lightgray;
                }
            """
            )
        else:
            self.setStyleSheet(
                """
                QToolButton {
                    border: none;
                    background: none;
                }
                QToolButton:hover {
                    background-color: lightgray;
                }
            """
            )


class InputToolbar(QToolBar):
    def __init__(self):
        super().__init__("Input Toolbar")

        self.setMovable(False)
        self.setContentsMargins(0, 0, 0, 0)
        self.layout().setSpacing(0)
        self.setIconSize(QSize(16, 16))
        self.setupUi()

    def setupUi(self):
        # Create a custom QToolButton
        self.photo_button = ImageGenerationButton(self)

        # Create a QWidgetAction to hold the custom button
        photo_action = QWidgetAction(self)
        photo_action.setDefaultWidget(self.photo_button)

        # Add the QWidgetAction to the toolbar
        self.addAction(photo_action)

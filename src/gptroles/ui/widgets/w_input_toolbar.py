from PyQt6.QtWidgets import QToolBar, QToolButton, QWidgetAction
from PyQt6.QtGui import QIcon
from PyQt6.QtCore import Qt, QSize


class InputToolbar(QToolBar):
    def __init__(self):
        super().__init__("Input Toolbar")

        self.setMovable(False)
        self.setContentsMargins(0, 0, 0, 0)
        self.layout().setSpacing(0)
        self.setIconSize(QSize(16, 16))
        self.setupUi()

        # Initialize the boolean state
        self.photo_button_pressed = False

    def setupUi(self):
        # Create an action with a system default icon for picture/photo
        icon = QIcon.fromTheme("image-x-generic")

        # Create a custom QToolButton
        self.photo_button = QToolButton(self)
        self.photo_button.setIcon(icon)
        self.photo_button.setToolTip("Toggle Image Generation Mode")
        self.photo_button.setStatusTip("Toggle Image Generation Mode")
        self.photo_button.setIconSize(QSize(12, 12))
        self.photo_button.setStyleSheet(
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
        self.photo_button.clicked.connect(self.on_photo_click)

        # Create a QWidgetAction to hold the custom button
        photo_action = QWidgetAction(self)
        photo_action.setDefaultWidget(self.photo_button)

        # Add the QWidgetAction to the toolbar
        self.addAction(photo_action)

    def on_photo_click(self):
        # Toggle the boolean state
        self.photo_button_pressed = not self.photo_button_pressed
        # Update the button's style
        if self.photo_button_pressed:
            self.photo_button.setStyleSheet(
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
            self.photo_button.setStyleSheet(
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

from PyQt6.QtCore import QPropertyAnimation, QSize
from PyQt6.QtGui import QIcon

from PyQt6.QtWidgets import (
    QLabel,
    QLayout,
    QApplication,
    QMainWindow,
    QVBoxLayout,
    QWidget,
    QPushButton,
    QFrame,
    QGraphicsOpacityEffect,
    QHBoxLayout,
)

from gptroles.ui.w_tools import CustomQVBoxLayout, DebugStyle, QHBoxWidget


class DrawerWidget(QWidget):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        DebugStyle(self)

        layout = CustomQVBoxLayout()
        layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)

        # Create vertical toolbar buttons
        for i in range(1, 6):
            button = QPushButton(f"Button {i}")
            button.setIcon(
                QIcon("icon.png")
            )  # Replace 'icon.png' with your 32x32 image icon path
            button.setIconSize(QSize(32, 32))
            button.clicked.connect(lambda checked, i=i: self.toggleDrawer(i))
            layout.addWidget(button)

        self.drawer_frame = QFrame()
        drawerEffect = QGraphicsOpacityEffect()
        self.drawer_frame.setGraphicsEffect(drawerEffect)

        self.drawer = QHBoxWidget(self.drawer_frame)
        self.drawer.setFixedWidth(0)

        text_label = QLabel("Some text in the QFrame")
        self.drawer.boxLayout.addWidget(text_label)

        mainLayout = QHBoxLayout()
        mainLayout.addLayout(layout)
        mainLayout.addWidget(self.drawer_frame)

        self.setLayout(mainLayout)

    def toggleDrawer(self, button_num):
        drawer = self.drawer_frame
        width = drawer.width()
        print("X", width)
        self.animation = None
        if width == 0:
            self.animation = QPropertyAnimation(drawer, b"size")
            self.animation.setDuration(1000)
            self.animation.setStartValue(QSize(0, self.width()))
            self.animation.setEndValue(QSize(800, self.width()))
            self.animation.start()
        elif self.animation:
            self.animation.setStartValue(QSize(200, self.width()))
            self.animation.setEndValue(QSize(0, self.width()))
            self.animation.start()

from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QLayout, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QCheckBox, QListWidget, QGroupBox, QSlider

class DictWidget(QWidget):
    def __init__(self, data, parent=None):
        super().__init__(parent)
        self.data = data
        self.layout = QVBoxLayout()
        self.layout.setSpacing(0)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.layout)
        self.setMaximumWidth(450)
        self.display_dict(self.data, self.layout)
        self.layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.setVisible(False)

    def toggle(self):
        self.setVisible(not self.isVisible())

    def display_dict(self, data, layout, vertical=False):
        for key, value in data.items():
            hlayout = QVBoxLayout() if vertical else QHBoxLayout()
            widget = None
            label = None
            if isinstance(value, bool):
                widget = QCheckBox()
                widget.setChecked(value)
                label = QLabel(key)
            elif isinstance(value, str):
                widget = QLineEdit()
                widget.setText(value)
                label = QLabel(key)
            elif isinstance(value, list):
                widget = QListWidget()
                widget.addItems(value)
                label = QLabel(key)
            elif isinstance(value, int):
                widget = QSlider(Qt.Orientation.Horizontal)
                widget.setRange(0, 10)
                widget.setValue(value)
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                widget.valueChanged.connect(lambda val, l=label: l.setText(key + ': ' + str(val)))
            elif isinstance(value, float):
                widget = QSlider(Qt.Orientation.Horizontal)
                widget.setRange(-45, 45)
                widget.setValue(int(value * 10))
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                widget.valueChanged.connect(lambda val, l=label: l.setText(key + ': ' + str(val / 10)))
            elif isinstance(value, dict):
                groupbox = QGroupBox(key)
                groupbox.setFlat(True)
                groupbox.setMaximumHeight(300)
                groupbox_layout = QVBoxLayout()
                groupbox_layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                # groupbox_layout.setSpacing(0)
                # groupbox_layout.setContentsMargins(0, 0, 0, 0)
                groupbox.setLayout(groupbox_layout)
                self.display_dict(value, groupbox_layout, True)
                layout.addWidget(groupbox)

            if widget:
                # hlayout.setSpacing(0)
                # hlayout.setContentsMargins(0, 0, 0, 0)
                label.setMargin(0)
                label.setContentsMargins(0, 0, 0, 0)
                hlayout.addWidget(label)
                hlayout.addWidget(widget)
                hlayout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                layout.addLayout(hlayout)
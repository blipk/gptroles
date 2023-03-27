from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QLayout, QWidget, QVBoxLayout, QHBoxLayout, QSpinBox, QDoubleSpinBox, QLabel, QLineEdit, QCheckBox, QListWidget, QGroupBox, QSlider
from ..settings import Settings

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from . import MainWindow

class SettingsWidget(QWidget):
    def __init__(self, settings_instance: Settings, parent=None):
        super().__init__(parent)
        self.mwindow: MainWindow = parent
        self.settings_instance = settings_instance
        self.data = settings_instance._settings
        self.layout = QVBoxLayout()
        self.layout.setAlignment(Qt.AlignmentFlag.AlignTop)
        self.layout.setSpacing(2)
        self.layout.setContentsMargins(0, 50, 0, 0)
        self.setLayout(self.layout)
        self.setMaximumWidth(450)
        self.display_dict(self.data, self.layout)
        self.layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
        self.setVisible(False)
        # self.setAttribute(QtCore.Qt.WA_StyledBackground, True)
        self.setStyleSheet("""
            color: white;
            background-color: rgba(50, 50, 50, 0.8);
        """)

    def toggle(self):
        self.setVisible(not self.isVisible())

    def update_setting(self, key, value, parent_key=None):
        if parent_key:
            new = self.settings_instance._settings[parent_key] | {key: value}
            self.settings_instance.__setattr__(parent_key, new)
            self.settings_instance._settings[parent_key][key] = value
            self.data[parent_key][key] = value
        else:
            self.settings_instance.__setattr__(key, value)
            self.settings_instance._settings[key] = value
            self.data[key] = value
        self.settings_instance.saveSettings()
        self.mwindow.chatbox.rolegpt.settings = self.settings_instance

    def display_dict(self, data, layout, vertical=True, use_spin_box=True, parent_key=None):
        for key, value in data.items():
            hlayout = QVBoxLayout() if vertical else QHBoxLayout()
            l, h, step = self.settings_instance.default_ranges.get(key, (-50.0, 50.0, 1))
            step_digits = len(str(step).split(".")[-1])
            widget = None
            label = None
            if isinstance(value, bool):
                widget = QCheckBox()
                widget.setChecked(value)
                label = QLabel(key)
                widget.stateChanged.connect(lambda state, k=key: self.update_setting(k, bool(state), parent_key))
            elif isinstance(value, str):
                widget = QLineEdit()
                widget.setText(value)
                label = QLabel(key)
                widget.textChanged.connect(lambda text, k=key: self.update_setting(k, text, parent_key))
            elif isinstance(value, list):
                widget = QListWidget()
                widget.addItems(value)
                label = QLabel(key)
            elif isinstance(value, int):
                if use_spin_box:
                    widget = QSpinBox()
                    widget.setRange(l, h)
                    widget.setSingleStep(step)
                else:
                    widget = QSlider(Qt.Orientation.Horizontal)
                    widget.setRange(l, h)
                widget.setValue(value)
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                if use_spin_box:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, round(val, step_digits), parent_key), l.setText(k + ': ' + str(round(val, step_digits)))))
                else:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, round(val, step_digits), parent_key), l.setText(k + ': ' + str(round(val, step_digits)))))
            elif isinstance(value, float):
                if use_spin_box:
                    widget = QDoubleSpinBox()
                    widget.setRange(l, h)
                    # step = 1/pow(10, len(str(value).split(".")[-1]))
                    widget.setSingleStep(step)
                    widget.setValue(value)
                else:
                    widget = QSlider(Qt.Orientation.Horizontal)
                    widget.setRange(l, h)
                    widget.setValue(int(value * 10))
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                if use_spin_box:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, round(val, step_digits), parent_key), l.setText(k + ': ' + str(round(val, step_digits)))))
                else:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, round(val / 10, step_digits), parent_key), l.setText(k + ': ' + str(round(val / 10, step_digits)))))
            elif isinstance(value, dict):
                groupbox = QGroupBox(key)
                groupbox.setFlat(True)
                groupbox.setMaximumHeight(300)
                groupbox_layout = QVBoxLayout()
                groupbox_layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                groupbox.setLayout(groupbox_layout)
                self.display_dict(value, groupbox_layout, True, parent_key=key)
                layout.addWidget(groupbox)
            if widget:
                label.setMargin(0)
                label.setContentsMargins(0, 0, 0, 0)
                hlayout.addWidget(label)
                hlayout.addWidget(widget)
                hlayout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                layout.addLayout(hlayout)
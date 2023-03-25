from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QLayout, QWidget, QVBoxLayout, QHBoxLayout, QSpinBox, QDoubleSpinBox, QLabel, QLineEdit, QCheckBox, QListWidget, QGroupBox, QSlider


class SettingsWidget(QWidget):
    def __init__(self, settings_instance, parent=None):
        super().__init__(parent)
        self.mwindow = parent
        self.settings_instance = settings_instance
        self.data = settings_instance._settings
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

    def update_setting(self, key, value):
        self.settings_instance.__setattr__(key, value)
        self.settings_instance._settings[key] = value
        self.data[key] = value
        self.settings_instance.saveSettings()
        self.mwindow.chatbox.rolegpt.settings = self.settings_instance

    def display_dict(self, data, layout, vertical=False, use_spin_box=True):
        for key, value in data.items():
            hlayout = QVBoxLayout() if vertical else QHBoxLayout()
            widget = None
            label = None
            if isinstance(value, bool):
                widget = QCheckBox()
                widget.setChecked(value)
                label = QLabel(key)
                widget.stateChanged.connect(lambda state, k=key: self.update_setting(k, bool(state)))
            elif isinstance(value, str):
                widget = QLineEdit()
                widget.setText(value)
                label = QLabel(key)
                widget.textChanged.connect(lambda text, k=key: self.update_setting(k, text))
            elif isinstance(value, list):
                widget = QListWidget()
                widget.addItems(value)
                label = QLabel(key)
            elif isinstance(value, int):
                if use_spin_box:
                    widget = QSpinBox()
                    widget.setRange(0, 8192)
                else:
                    widget = QSlider(Qt.Orientation.Horizontal)
                    widget.setRange(0, 8192)
                widget.setValue(value)
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                if use_spin_box:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, val), l.setText(k + ': ' + str(val))))
                else:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, val), l.setText(k + ': ' + str(val))))
            elif isinstance(value, float):
                if use_spin_box:
                    widget = QDoubleSpinBox()
                    widget.setRange(-150, 150)
                    widget.setSingleStep(0.1)
                else:
                    widget = QSlider(Qt.Orientation.Horizontal)
                    widget.setRange(-1500, 1500)
                widget.setValue(int(value * 10))
                label = QLabel(key + ': ' + str(value))
                hlayout = QHBoxLayout()
                if use_spin_box:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, val), l.setText(k + ': ' + str(val))))
                else:
                    widget.valueChanged.connect(lambda val, l=label, k=key: (self.update_setting(k, val / 10), l.setText(k + ': ' + str(val / 10))))
            elif isinstance(value, dict):
                groupbox = QGroupBox(key)
                groupbox.setFlat(True)
                groupbox.setMaximumHeight(300)
                groupbox_layout = QVBoxLayout()
                groupbox_layout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                groupbox.setLayout(groupbox_layout)
                self.display_dict(value, groupbox_layout, True)
                layout.addWidget(groupbox)
            if widget:
                label.setMargin(0)
                label.setContentsMargins(0, 0, 0, 0)
                hlayout.addWidget(label)
                hlayout.addWidget(widget)
                hlayout.setSizeConstraint(QLayout.SizeConstraint.SetMinimumSize)
                layout.addLayout(hlayout)
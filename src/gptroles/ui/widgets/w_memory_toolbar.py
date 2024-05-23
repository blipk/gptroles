import os
from PyQt6.QtWidgets import QToolBar, QToolButton, QWidgetAction
from PyQt6.QtGui import QIcon, QPixmap
from PyQt6.QtCore import Qt, QSize
from dataclasses import dataclass
import requests
from io import BytesIO

from gptroles.ai.engines.orto.memory import Memory

# Define a more extensive mapping of file extensions to theme icons
icon_mapping = {
    # Text files
    ".txt": "text-x-generic",
    ".md": "text-x-markdown",
    ".xml": "text-xml",
    ".csv": "text-csv",
    # Documents
    ".pdf": "application-pdf",
    ".doc": "application-msword",
    ".docx": "application-vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".odt": "application-vnd.oasis.opendocument.text",
    ".rtf": "application-rtf",
    # Spreadsheets
    ".xls": "application-vnd.ms-excel",
    ".xlsx": "application-vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".ods": "application-vnd.oasis.opendocument.spreadsheet",
    # Presentations
    ".ppt": "application-vnd.ms-powerpoint",
    ".pptx": "application-vnd.openxmlformats-officedocument.presentationml.presentation",
    ".odp": "application-vnd.oasis.opendocument.presentation",
    # Images
    ".jpg": "image-jpeg",
    ".jpeg": "image-jpeg",
    ".png": "image-png",
    ".gif": "image-gif",
    ".svg": "image-svg+xml",
    ".bmp": "image-bmp",
    ".tiff": "image-tiff",
    # Audio
    ".mp3": "audio-mpeg",
    ".wav": "audio-x-wav",
    ".flac": "audio-flac",
    ".ogg": "audio-ogg",
    ".m4a": "audio-m4a",
    # Video
    ".mp4": "video-mp4",
    ".mkv": "video-x-matroska",
    ".avi": "video-x-msvideo",
    ".mov": "video-quicktime",
    ".wmv": "video-x-ms-wmv",
    ".flv": "video-x-flv",
    # Archives
    ".zip": "application-zip",
    ".rar": "application-x-rar",
    ".tar": "application-x-tar",
    ".gz": "application-gzip",
    ".bz2": "application-x-bzip",
    ".7z": "application-x-7z-compressed",
    # Code
    ".py": "text-x-python",
    ".js": "application-javascript",
    ".html": "text-html",
    ".css": "text-css",
    ".java": "text-x-java-source",
    ".c": "text-x-csrc",
    ".cpp": "text-x-c++src",
    ".h": "text-x-chdr",
    ".hpp": "text-x-c++hdr",
    ".php": "application-x-php",
    ".rb": "application-x-ruby",
    ".go": "text-x-go",
    ".rs": "text-rust",
    # Others
    ".iso": "application-x-cd-image",
    ".exe": "application-x-ms-dos-executable",
    ".msi": "application-x-msi",
    ".apk": "application-vnd.android.package-archive",
}


class MemoryButton(QToolButton):
    action: QWidgetAction | None = None

    def __init__(self, memory: Memory, parent=None):
        super().__init__(parent)
        self.memory = memory
        self.setText(memory.resource_uri_string)

        # Load image from resource_uri if it's a valid URL
        path, file_extension = os.path.splitext(memory.resource_uri_string)
        icon_name = icon_mapping.get(file_extension, "text-x-generic")
        if "image" in icon_name:
            try:
                image = QPixmap()
                image.loadFromData(memory.content)
                self.setIcon(QIcon(image))
                self.setIconSize(QSize(128, 128))
            except Exception as e:
                self.setIcon(QIcon.fromTheme(icon_name))
                self.setIconSize(QSize(32, 32))
        else:
            self.setIcon(QIcon.fromTheme(icon_name))
            self.setIconSize(QSize(32, 32))

        memory_info = f"{memory.description + ' | ' if memory.description else ""}{memory.resource_uri_string}"
        self.setToolTip(memory_info)
        self.setStatusTip(memory_info)

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

        # Connect button click to toggle function
        self.clicked.connect(self.on_button_click)

    def on_button_click(self, checked):
        # Toggle the state of the button
        self.memory.active = not self.memory.active

        # Update the button's style based on its state
        if self.memory.active:
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


class MemoryToolbar(QToolBar):
    def __init__(self):
        super().__init__("Input Toolbar")

        self.setMovable(False)
        self.setContentsMargins(0, 0, 0, 0)
        self.layout().setSpacing(0)
        self.setIconSize(QSize(64, 64))

        self.memory_buttons = []

    def update_memory_buttons(self, memories):
        # Clear current buttons and their state
        for button in self.memory_buttons:
            button: MemoryButton
            self.removeAction(button.action)
            button.deleteLater()

        self.memory_buttons = []

        # Create new buttons for each memory and add them to the layout
        for memory in memories:
            button = MemoryButton(memory)

            action = QWidgetAction(self)
            button.action = action
            action.setDefaultWidget(button)
            self.addAction(action)

            self.memory_buttons.append(button)
            self.addAction(action)

        print("Updated memory buttons")

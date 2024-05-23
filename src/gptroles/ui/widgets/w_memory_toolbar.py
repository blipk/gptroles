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


class MemoryToolbar(QToolBar):
    def __init__(self):
        super().__init__("Input Toolbar")

        self.setMovable(False)
        self.setContentsMargins(0, 0, 0, 0)
        self.layout().setSpacing(0)
        self.setIconSize(QSize(32, 32))

        # Dictionary to keep track of button states
        self.button_states = {}

    def add_memory_button(self, memory: Memory):
        # Create a QToolButton
        button = QToolButton(self)

        # Load image from resource_uri if it's a valid URL
        try:
            image = QPixmap()
            image.loadFromData(memory.content)
            button.setIcon(QIcon(image))
        except Exception as e:
            print(e)
            path, file_extension = os.path.splitext(memory.resource_uri)
            icon_name = icon_mapping.get(file_extension, "text-x-generic")
            button.setIcon(QIcon.fromTheme(icon_name))

        memory_info = f"{memory.description + ' | ' if memory.description else ""}{memory.resource_uri}"
        button.setToolTip(memory_info)
        button.setStatusTip(memory_info)
        button.setIconSize(QSize(12, 12))

        button.setStyleSheet(
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

        # Add button to toolbar
        action = QWidgetAction(self)
        action.setDefaultWidget(button)
        self.addAction(action)

        # Connect button click to toggle function
        button.clicked.connect(lambda checked, b=button: self.on_button_click(b))

        # Initialize button state
        self.button_states[button] = False

    def on_button_click(self, button):
        # Toggle the state of the button
        self.button_states[button] = not self.button_states[button]

        # Update the button's style based on its state
        if self.button_states[button]:
            button.setStyleSheet(
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
            button.setStyleSheet(
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

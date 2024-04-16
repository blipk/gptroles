#!/usr/bin/env python3
import os
import sys
import signal

from gptroles.ui.application import RoleChat


os.environ["QT_QPA_PLATFORM"] = "xcb"  # Required for Qt to move windows on wayland
signal.signal(signal.SIGINT, signal.SIG_DFL)


def main():
    # print("Creating RoleChat()")
    app = RoleChat(sys.argv)
    sys.exit(app.exec())


if __name__ == "__main__":
    main()

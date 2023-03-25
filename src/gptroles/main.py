#!/usr/bin/env python
import sys
import signal
signal.signal(signal.SIGINT, signal.SIG_DFL)

from gptroles.ui import RoleChat

def main():
    app = RoleChat(sys.argv)
    sys.exit(app.exec())

if __name__ == "__main__":
    main()

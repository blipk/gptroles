from PyQt6.QtCore import QIODevice, QIODeviceBase
from PyQt6.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLabel, QMessageBox
from PyQt6.QtSerialPort import QSerialPort
from .console import Console


class SerialPortWidget(QWidget):
    def __init__(self, parent):
        super().__init__(parent)

        # Set up members
        self.m_status = QLabel()
        self.m_console = Console()
        # self.m_settings = SettingsDialog(self)
        self.m_serial = QSerialPort(self)

        # Create layout and add widgets
        layout = QVBoxLayout(self)
        layout.addWidget(self.m_console)
        layout.addWidget(self.m_status)

        # Create buttons
        button_layout = QHBoxLayout()
        connect_button = QPushButton("Connect", self)
        connect_button.clicked.connect(self.openSerialPort)
        disconnect_button = QPushButton("Disconnect", self)
        disconnect_button.clicked.connect(self.closeSerialPort)
        configure_button = QPushButton("Configure", self)
        # configure_button.clicked.connect(self.m_settings.show)
        button_layout.addWidget(connect_button)
        button_layout.addWidget(disconnect_button)
        button_layout.addWidget(configure_button)
        layout.addLayout(button_layout)

        # Connect signals and slots
        self.m_serial.readyRead.connect(self.readData)

    def openSerialPort(self):
        # Get settings
        # p = self.m_settings.settings()
        settings = dict(
            name="localhost",
            baudRate = 9600,#QSerialPort.BaudRate.Baud9600,
            dataBits = QSerialPort.DataBits.Data8,
            parity = QSerialPort.Parity.NoParity,
            stopBits = QSerialPort.StopBits.OneStop,
            flowControl = QSerialPort.FlowControl.NoFlowControl,
            localEchoEnabled = False,
        )
        print(settings)
        # s_settings = {f"string{k.capitalize()}": str(v)
        #             for (k, v) in settings}
        # settings = settings + s_settings
        p = settings

        # Set serial port settings
        self.m_serial.setPortName(p["name"])
        self.m_serial.setBaudRate(p["baudRate"])
        self.m_serial.setDataBits(p["dataBits"])
        self.m_serial.setParity(p["parity"])
        self.m_serial.setStopBits(p["stopBits"])
        self.m_serial.setFlowControl(p["flowControl"])

        # Attempt to open serial port
        if self.m_serial.open(QIODeviceBase.OpenModeFlag.ReadWrite):
            self.m_console.setEnabled(True)
            self.m_console.setLocalEchoEnabled(p["localEchoEnabled"])
            # self.parent().ui.actionConnect.setEnabled(False)
            # self.parent().ui.actionDisconnect.setEnabled(True)
            # self.parent().ui.actionConfigure.setEnabled(False)
            self.showStatusMessage(f"""Connected to {p["name"]}: {p["baudRate"]}, {p["dataBits"]}, {p["parity"]}, {p["stopBits"]}, {p["flowControl"]}""")
        else:
            QMessageBox.critical(self, "Error", self.m_serial.errorString())
            self.showStatusMessage("Open error")

    def closeSerialPort(self):
        if self.m_serial.isOpen():
            self.m_serial.close()

        self.m_console.setEnabled(False)
        # self.parent().ui.actionConnect.setEnabled(True)
        # self.parent().ui.actionDisconnect.setEnabled(False)
        # self.parent().ui.actionConfigure.setEnabled(True)
        self.showStatusMessage("Disconnected")

    def writeData(self, data):
        self.m_serial.write(data)

    def readData(self):
        data = self.m_serial.readAll()
        self.m_console.putData(data)

    def showStatusMessage(self, message):
        self.m_status.setText(message)
from PyQt6.QtWidgets import QDialog, QComboBox, QLineEdit
from PyQt6.QtGui import QIntValidator
from PyQt6.QtSerialPort import QSerialPortInfo, QSerialPort

from ui_settingsdialog import Ui_SettingsDialog

class SettingsDialog(QDialog):

    class Settings:
        def __init__(self):
            self.name = ''
            self.baudRate = QSerialPort.BaudRate.Baud9600
            self.stringBaudRate = str(self.baudRate)
            self.dataBits = QSerialPort.DataBits.Data8
            self.stringDataBits = str(self.dataBits)
            self.parity = QSerialPort.Parity.NoParity
            self.stringParity = str(self.parity)
            self.stopBits = QSerialPort.StopBits.OneStop
            self.stringStopBits = str(self.stopBits)
            self.flowControl = QSerialPort.FlowControl.NoFlowControl
            self.stringFlowControl = str(self.flowControl)
            self.localEchoEnabled = False

    def __init__(self, parent=None):
        super(SettingsDialog, self).__init__(parent)
        self.ui = Ui_SettingsDialog()
        self.ui.setupUi(self)

        self.ui.baudRateBox.setInsertPolicy(QComboBox.InsertPolicy.NoInsert)

        self.ui.applyButton.clicked.connect(self.apply)
        self.ui.serialPortInfoListBox.currentIndexChanged.connect(self.showPortInfo)
        self.ui.baudRateBox.currentIndexChanged.connect(self.checkCustomBaudRatePolicy)
        self.ui.serialPortInfoListBox.currentIndexChanged.connect(self.checkCustomDevicePathPolicy)

        self.m_currentSettings = SettingsDialog.Settings()
        self.m_intValidator = QIntValidator(0, 4000000, self)

        self.fillPortsParameters()
        self.fillPortsInfo()
        self.updateSettings()

    def settings(self):
        return self.m_currentSettings

    def showPortInfo(self, idx):
        if idx == -1:
            return

        blankString = self.tr("N/A")

        list = self.ui.serialPortInfoListBox.itemData(idx)
        description = list[1] if len(list) > 1 else blankString
        manufacturer = list[2] if len(list) > 2 else blankString
        serialNumber = list[3] if len(list) > 3 else blankString
        location = list[4] if len(list) > 4 else blankString
        vid = list[5] if len(list) > 5 else blankString
        pid = list[6] if len(list) > 6 else blankString

        self.ui.descriptionLabel.setText(self.tr("Description: {}").format(description))
        self.ui.manufacturerLabel.setText(self.tr("Manufacturer: {}").format(manufacturer))
        self.ui.serialNumberLabel.setText(self.tr("Serial number: {}").format(serialNumber))
        self.ui.locationLabel.setText(self.tr("Location: {}").format(location))
        self.ui.vidLabel.setText(self.tr("Vendor Identifier: {}").format(vid))
        self.ui.pidLabel.setText(self.tr("Product Identifier: {}").format(pid))

    def apply(self):
        self.updateSettings()
        self.hide()

    def checkCustomBaudRatePolicy(self, idx):
        isCustomBaudRate = not self.ui.baudRateBox.itemData(idx).isValid()
        self.ui.baudRateBox.setEditable(isCustomBaudRate)
        if isCustomBaudRate:
            self.ui.baudRateBox.clearEditText()
            edit = self.ui.baudRateBox.lineEdit()
            edit.setValidator(self.m_intValidator)

    def checkCustomDevicePathPolicy(self, idx):
        isCustomPath = not self.ui.serialPortInfoListBox.itemData(idx).isValid()
        self.ui.serialPortInfoListBox.setEditable(isCustomPath)
        if isCustomPath:
            self.ui.serialPortInfoListBox.clearEditText()

    def fill_ports_parameters(self):
        self.ui.baudRateBox.addItem("9600", QSerialPort.Baud9600)
        self.ui.baudRateBox.addItem("19200", QSerialPort.Baud19200)
        self.ui.baudRateBox.addItem("38400", QSerialPort.Baud38400)
        self.ui.baudRateBox.addItem("115200", QSerialPort.Baud115200)
        self.ui.baudRateBox.addItem(self.tr("Custom"))

        self.ui.dataBitsBox.addItem("5", QSerialPort.Data5)
        self.ui.dataBitsBox.addItem("6", QSerialPort.Data6)
        self.ui.dataBitsBox.addItem("7", QSerialPort.Data7)
        self.ui.dataBitsBox.addItem("8", QSerialPort.Data8)
        self.ui.dataBitsBox.setCurrentIndex(3)

        self.ui.parityBox.addItem(self.tr("None"), QSerialPort.NoParity)
        self.ui.parityBox.addItem(self.tr("Even"), QSerialPort.EvenParity)
        self.ui.parityBox.addItem(self.tr("Odd"), QSerialPort.OddParity)
        self.ui.parityBox.addItem(self.tr("Mark"), QSerialPort.MarkParity)
        self.ui.parityBox.addItem(self.tr("Space"), QSerialPort.SpaceParity)

        self.ui.stopBitsBox.addItem("1", QSerialPort.OneStop)
        # Add 1.5 stop bits option only on Windows
        if sys.platform.startswith('win'):
            self.ui.stopBitsBox.addItem(self.tr("1.5"), QSerialPort.OneAndHalfStop)
        self.ui.stopBitsBox.addItem("2", QSerialPort.TwoStop)

        self.ui.flowControlBox.addItem(self.tr("None"), QSerialPort.NoFlowControl)
        self.ui.flowControlBox.addItem(self.tr("RTS/CTS"), QSerialPort.HardwareControl)
        self.ui.flowControlBox.addItem(self.tr("XON/XOFF"), QSerialPort.SoftwareControl)

    def fill_ports_info(self):
        self.ui.serialPortInfoListBox.clear()
        infos = QSerialPortInfo.availablePorts()

        for info in infos:
            list = []
            description = info.description()
            manufacturer = info.manufacturer()
            serialNumber = info.serialNumber()
            vendorId = info.vendorIdentifier()
            productId = info.productIdentifier()
            list.append(info.portName())
            if description:
                list.append(description)
            else:
                list.append("")
            if manufacturer:
                list.append(manufacturer)
            else:
                list.append("")
            if serialNumber:
                list.append(serialNumber)
            else:
                list.append("")
            list.append(info.systemLocation())
            if vendorId:
                list.append('{:04x}'.format(vendorId))
            else:
                list.append("")
            if productId:
                list.append('{:04x}'.format(productId))
            else:
                list.append("")

            self.ui.serialPortInfoListBox.addItem(list[0], list)

        self.ui.serialPortInfoListBox.addItem(self.tr("Custom"))

    def update_settings(self):
        self.currentSettings.name = self.ui.serialPortInfoListBox.currentText()

        if self.ui.baudRateBox.currentIndex() == 4:
            self.currentSettings.baudRate = int(self.ui.baudRateBox.currentText())
        else:
            baudRateData = self.ui.baudRateBox.currentData()
            self.currentSettings.baudRate = baudRateData.value(QSerialPort.BaudRate)
        self.currentSettings.stringBaudRate = str(self.currentSettings.baudRate)

        dataBitsData = self.ui.dataBitsBox.currentData()
        self.currentSettings.dataBits = dataBitsData.value(QSerialPort.DataBits)
        self.currentSettings.stringDataBits = self.ui.dataBitsBox.currentText()

        parityData = self.ui.parityBox.currentData()
        self.currentSettings.parity = parityData.value(QSerialPort.Parity)
        self.currentSettings.stringParity = self.ui.parityBox.currentText()

        stopBitsData = self.ui.stopBitsBox.currentData()
        self.currentSettings.stopBits = stopBitsData.value(QSerialPort.StopBits)
        self.currentSettings.stringStopBits = self.ui.stopBitsBox.currentText()

        flowControlData = self.ui.flowControlBox.currentData()
        self.currentSettings.flowControl = flowControlData.value(QSerialPort.FlowControl)
        self.currentSettings.stringFlowControl = self.ui.flowControlBox.currentText()

        self.currentSettings.localEchoEnabled = self.ui.localEchoCheckBox.isChecked()
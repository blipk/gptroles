#!/usr/bin/bash
USER_DATA_HOME="$HOME/.local/share"
USER_CONFIG_HOME="$HOME/.config"
USER_STATE_HOME="$HOME/.local/state"
USER_CACHE_HOME="$HOME/.cache"
USER_BIN_HOME="$HOME/.local/bin"
USER_LIB_HOME="$HOME/.local/lib"


install_file() {
    # if [ -f "$2" ]
    # then
    #     echo "File already installed"
    # else
        cp $1 $2
        echo "File copied"
    # fi
}

install_file "./res/gptroles" $USER_BIN_HOME
PNG_ICON_FILE="$USER_DATA_HOME/icons/hicolor/256x256/apps/gptroles.png"
SVG_ICON_FILE="$USER_DATA_HOME/icons/hicolor/scalable/apps/gptroles.svg"
install_file "./res/gptroles.png" $PNG_ICON_FILE
# install_file "./res/gptroles.svg" $SVG_ICON_FILE
xdg-icon-resource install --novendor --context apps --size 256 $PNG_ICON_FILE gptroles
gtk-update-icon-cache -f ~/.local/share/icons/hicolor --ignore-theme-index
xdg-desktop-menu install ./res/gptroles.desktop --novendor

# systemctl start sshd.service
# Required for terminal (Currently not fully implemented)
# USER="gptroles"
# PASSWD="p4ssw0rd"
# sudo useradd -m -U $USER
# if ! command -v chpasswd &> /dev/null
# then
#     echo "$USER:$PASSWD" | chpasswd
# else
#     echo -e "$PASSWD\n$PASSWD" | passwd gptroles
# fi
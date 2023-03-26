CMD=$1

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

if [[ "x$CMD" == "xinstall" ]]; then
    # Install locally, but it isnt copying the pyproject web includes
    pip install .
    yes | cp -rf src/gptroles/ui/* $(python3 -m site --user-site)/gptroles/ui/
elif [[ "x$CMD" == "xsysinstall" ]]; then
    ./install.sh
elif [[ "x$CMD" == "xrun" ]]; then
    yes | cp -rf src/gptroles/ui/* $(python3 -m site --user-site)/gptroles/ui/
    ./src/gptroles/main.py --debug
elif [[ "x$CMD" == "xbuild" ]]; then
    poetry install
    rm -rf build
    rm -rf dist
    poetry build
    poetry -v build --format=wheel
else
  echo "Unknown command: $CMD"
fi


CMD=$1


if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

buildWeb() {
    START_DIR=$PWD
    cd src/gptroles/ui/web && npm run build && \
    cd $START_DIR
}

watchWeb() {
    START_DIR=$PWD
    cd ./src/gptroles/ui/web && npm run start & \
    cd $START_DIR
}

build() {
    buildWeb && \
    poetry install && \
    rm -rf build && \
    rm -rf dist && \
    poetry build && \
    poetry -v build --format=wheel
}

publish() {
    poetry publish
}

if [[ "x$CMD" == "xinstall" ]]; then
    # Install locally, but it isnt copying the pyproject web includes
    buildWeb && \
    pip install .
    yes | cp -rf src/gptroles/ui/* $(python3 -m site --user-site)/gptroles/ui/
elif [[ "x$CMD" == "xsysinstall" ]]; then
    buildWeb && \
    ./install.sh
elif [[ "x$CMD" == "xrun" ]]; then
    buildWeb && \
    yes | cp -rf src/gptroles/* $(python3 -m site --user-site)/gptroles/ && \
    ./src/gptroles/main.py --debug
    # poetry run main --debug
elif [[ "x$CMD" == "xbuild" ]]; then
    build
    if [[ "x$2" == "xpublish" ]]; then
        publish
    fi
elif [[ "x$CMD" == "xpublish" ]]; then
    publish
else
  echo "Unknown command: $CMD"
fi
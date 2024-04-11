#!/usr/bin/env bash

CMD=$1

set -x
set -e


if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

buildWeb() {
    START_DIR=$PWD
    cd src/gptroles/ui/web && pnpm install && pnpm run build && \
    cd $START_DIR
}

watchWeb() {
    START_DIR=$PWD
    cd ./src/gptroles/ui/web && pnpm run start && \
    cd $START_DIR
}

BUILT="0"
build() {
    buildWeb && \
    poetry install && \
    rm -rf build && \
    rm -rf dist && \
    poetry build && \
    poetry -v build --format=wheel
    BUILT="1"
}

publish() {
    if [[ "x$BUILT" == "x0" ]]; then
        build
    fi
    poetry publish
}

# poetry export -f requirements.txt > requirements.txt

if [[ "x$CMD" == "xinstall" ]]; then
    # Install locally, but it isnt copyingdev the pyproject web includes
    buildWeb && \
    pip install . --no-cache-dir --no-binary=gptroles --upgrade --break-system-packages &&
    # pip install -e . --no-cache-dir --no-binary=gptroles --upgrade --break-system-packages &&
    # poetry install
    yes | cp -rf src/* "$(python3 -m site --user-site)"
elif [[ "x$CMD" == "xsysinstall" ]]; then
    buildWeb && \
    ./install.sh
elif [[ "x$CMD" == "xrun" ]]; then
    buildWeb && \
    yes | cp -rf src/gptroles/* "$(python3 -m site --user-site)/gptroles/" && \
    ./src/gptroles/main.py --debug
    # poetry run main --debug
elif [[ "x$CMD" == "xwatch" ]]; then
    watchWeb
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
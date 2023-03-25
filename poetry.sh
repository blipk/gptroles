# poetry init   # create config
# poetry shell  # create venv
# poetry add <package> # add packagers
poetry install
rm -rf build
rm -rf dist
poetry build
poetry -v build --format=wheel
# poetry publish
# pip install .
# Install locally, but it isnt copying the pyproject web includes
# poetry install
# rm -rf build
# rm -rf dist
# poetry build
pip install .
yes | cp -rf src/gptroles/ui/**/* $(python3 -m site --user-site)/gptroles/ui/
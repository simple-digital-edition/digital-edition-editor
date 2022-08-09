# Digital Edition Editor

The Digital Edition Editor is a generic web application for managing a digital edition

## Development

To build and run the server locally the following tools are required:

* Python version 3.10 or greater: https://www.python.org/
* Poetry: https://python-poetry.org/
* NodeJS version 16 or greater: https://nodejs.org/en/

All further local dependencies are installed using the following commands:

```
poetry install
cd digi_edit/server/frontend
npm install
```

To activate the virtual environment run

```
poetry shell
```

To build the JavaScript / CSS libraries run

```
cd digi_edit/server/frontend
npm run dev
```

To run the server for development run (after activating the virtual environment):

```
python -m digi_edit app server
```

The application is then available at http://localhost:6543/

## Release

1. Run python prepare_release.py
2. Commit changes
3. Tag changes with v{version}
4. Push commit and tags

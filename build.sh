#!/bin/bash

source local-config

git pull
export PIPENV_VENV_IN_PROJECT=True
pipenv install
pipenv run python manage.py collectstatic --settings digital_edition_editor.deploy_settings

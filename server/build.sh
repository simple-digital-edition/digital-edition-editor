#!/bin/bash
git pull --rebase
export PIPENV_VENV_IN_PROJECT=True
pipenv install

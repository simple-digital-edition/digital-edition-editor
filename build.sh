#!/bin/bash

export http_proxy="http://192.168.5.200:3128"
export https_proxy="http://192.168.5.200:3128"

git checkout -- .
git pull
export PIPENV_VENV_IN_PROJECT=True
pipenv install
pipenv run pip install -e .

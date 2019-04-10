#!/bin/bash

source local-config

git pull
export PIPENV_VENV_IN_PROJECT=True
pipenv install

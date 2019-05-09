#!/usr/bin/env bash

pybabel extract --mapping-file babel.cfg --output locale/django.pot editor/
pybabel update -i locale/django.pot -l en_GB -d locale/ -D django --ignore-obsolete
pybabel update -i locale/django.pot -l de_DE -d locale/ -D django --ignore-obsolete

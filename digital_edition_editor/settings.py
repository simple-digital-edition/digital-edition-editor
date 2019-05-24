"""
Django settings for digital_edition_editor project.

Generated by 'django-admin startproject' using Django 2.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import re

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'kpn*al#l1gyg2+n_!_ua4!cvfztm!nl+33u30yp9dsuo8w#dpx'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'editor.apps.EditorConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'widget_tweaks'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'digital_edition_editor.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': 'digital_edition_editor.jinja2.environment'
        },
    },
]

WSGI_APPLICATION = 'digital_edition_editor.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'de-de'

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"), )

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'


# Version information
VERSION = None
HISTORY = []
_icon_mappings = {'new': 'new-box',
                  'update': 'alert-decagram',
                  'bugfix': 'bug'}
with open('CHANGES.md') as in_f:
    last_version = None
    last_date = None
    changes = []
    for line in in_f:
        match = re.match('## ([0-9]+\\.[0-9]+\\.[0-9]+) \\(([0-9]{2}\\.[0-9]{2}\\.[0-9]{4})\\)', line.strip())
        if match is None:
            match = re.match('## (Development) \(()\)', line.strip())
        if match and last_version != match.group(1):
            if len(changes) > 0:
                HISTORY.append((last_version, last_date, tuple(changes)))
                changes = []
            last_version = match.group(1)
            last_date = match.group(2)
        else:
            match = re.match('\\* \\*\\*([a-zA-Z]+):\*\*\s((?:\w|\s|[-,.:;"\'])+)', line.strip())
            if match:
                changes.append((match.group(1).lower(), _icon_mappings[match.group(1).lower()], match.group(2)))
    if last_version and len(changes) > 0:
        HISTORY.append((last_version, last_date, tuple(changes)))
HISTORY = tuple(HISTORY)
if HISTORY:
    VERSION = HISTORY[0][0]

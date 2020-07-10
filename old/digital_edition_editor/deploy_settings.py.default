"""Settings base for deployment. Adapt as needed on the server. Extends the settings from settings.py"""
from os import path

from .settings import *

# Turn off debug mode
DEBUG = False

# Set the allowed hosts
ALLOWED_HOSTS = []

# Security config
SECRET_KEY = ''
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Static data config
STATIC_URL = ''
STATIC_ROOT = path.join(BASE_DIR, 'static')
LOGIN_URL = ''

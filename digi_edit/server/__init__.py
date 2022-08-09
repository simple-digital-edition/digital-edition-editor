"""The Digital Edition Editor Server application."""
import logging

from tornado.web import Application, RedirectHandler, StaticFileHandler
from tornado.ioloop import IOLoop

from .handlers import (FrontendHandler, JsonStaticHandler, UserLoginHandler, BranchCollectionHandler, BranchItemHandler,
                       FileCollectionHandler, FileItemHandler, GitlabWebhookHandler)

from ..utils import config


logger = logging.getLogger(__name__)


def run_application_server() -> None:
    """Run the Digital Edition Editor server."""
    logger.debug('Application server starting up...')
    routes = [
        ('/', RedirectHandler, {'permanent': False, 'url': '/app'}),
        ('/app(.*)', FrontendHandler),
        ('/static/config/(.*)', JsonStaticHandler, {'path': f'{config()["server"]["static-files"]}/config'}),
        ('/static/theme/(.*)', StaticFileHandler, {'path': f'{config()["server"]["static-files"]}/theme'}),
        ('/api/users/login', UserLoginHandler),
        ('/api/branches', BranchCollectionHandler),
        ('/api/branches/([0-9]+)', BranchItemHandler),
        ('/api/branches/([0-9]+)/files', FileCollectionHandler),
        ('/api/branches/([0-9]+)/files/([a-zA-Z0-9\\-_=]+)', FileItemHandler),
        ('/webhooks/gitlab', GitlabWebhookHandler),
    ]
    app = Application(
        routes,
        debug=config()['debug'],
        xsrf_cookies=True,
        cookie_secret=config()['server']['cookie-secret'],
        websocket_ping_interval=10)
    logger.debug(f'Application listening on {config()["server"]["host"]} port {config()["server"]["port"]}')
    app.listen(config()['server']['port'], config()['server']['host'])
    IOLoop.current().start()

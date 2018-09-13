import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('editor', {path: '/'}, function() {
    this.route('repositories');
    this.route('repository', {path: 'repositories/:rid'});
    this.route('files', {path: 'repositories/:rid/files'});
    this.route('file', {path: 'repositories/:rid/files/:fid'});
  });

  this.route('users', function() {
    this.route('login');
  });
});

export default Router;

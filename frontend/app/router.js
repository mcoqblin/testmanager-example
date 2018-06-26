import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('features');
  this.route('feature', { path: 'feature/:feature_id' });
  this.route('feature', { path: 'features/:feature_id' });
  this.route('index', { path: '*'});
});

export default Router;

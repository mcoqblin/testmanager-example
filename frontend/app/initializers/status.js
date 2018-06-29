export function initialize(application) {
  application.inject('model:test', 'status-tools', 'util:status');
  application.inject('controller:feature', 'status-tools', 'util:status');
  application.inject('component:test-status', 'status-tools', 'util:status');
}

export default {
  initialize
};

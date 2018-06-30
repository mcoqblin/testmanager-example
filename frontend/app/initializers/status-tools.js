export function initialize(application) {
  application.inject('model:test', 'status-tools', 'util:status-tools');
  application.inject('controller:feature', 'status-tools', 'util:status-tools');
  application.inject('component:test-status', 'status-tools', 'util:status-tools');
}

export default {
  initialize
};

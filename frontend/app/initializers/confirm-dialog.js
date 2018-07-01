export function initialize(application) {
  application.inject('controller', 'confirm-dialog', 'util:confirm-dialog');
  application.inject('component', 'confirm-dialog', 'util:confirm-dialog');
}

export default {
  initialize
};

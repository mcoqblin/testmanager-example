export function initialize(application) {
  application.inject('util:page-title', 'trim-name', 'util:trim-name');
  application.inject('util:confirm-dialog', 'trim-name', 'util:trim-name');
  application.inject('helper:trim-name', 'trim-name', 'util:trim-name');
}

export default {
  initialize
};

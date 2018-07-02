export function initialize(application) {
  application.inject('route', 'page-title', 'util:page-title');
}

export default {
  initialize
};

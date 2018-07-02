import EmberObject from '@ember/object';

const MAX_TITLE_LENGTH = 100;

export default EmberObject.extend({
  setRawTitle(title) {
    title = this.get('trim-name').trimName(title, MAX_TITLE_LENGTH);
    Ember.$(document).attr('title', title);
  },

  setTitle(title) {
    let baseTitle = Ember.$(document).attr('title');
    this.setRawTitle(baseTitle + ' - ' + title);
  }
});

import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('number'),
  feature: DS.belongsTo('feature'),

  validStatus: computed('state', function() {
    let status = this.get('state');
    return this.get('status-tools').validateStatus(status);
  }),

  cssForStatus: computed('validStatus', function() {
    let status = this.get('validStatus');
    return this.get('status-tools').cssForStatus(status);
  }),

  textForStatus: computed('validStatus', function() {
    let status = this.get('validStatus');
    return this.get('status-tools').textForStatus(status);
  })
});

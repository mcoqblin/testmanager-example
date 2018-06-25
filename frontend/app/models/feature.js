import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tests: DS.hasMany('test')
});

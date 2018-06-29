import DS from 'ember-data';
import { computed } from '@ember/object';

const TEST_STATUS_UNDEFINED = 0;
const TEST_STATUS_PASSED =    1;
const TEST_STATUS_FAILED =    2;

const valuesForStatus = {
  statusUndefined:  TEST_STATUS_UNDEFINED,
  statusPassed:     TEST_STATUS_PASSED,
  statusFailed:     TEST_STATUS_FAILED
};

const cssForStatus = [];
cssForStatus[TEST_STATUS_UNDEFINED] = 'test-undefined';
cssForStatus[TEST_STATUS_PASSED] = 'test-passed';
cssForStatus[TEST_STATUS_FAILED] = 'test-failed';

export class Status {

  static validateStatus(status) {
    status = parseInt(status);
    if (isNaN(status))
      status = 0;
    
    if ((status === TEST_STATUS_UNDEFINED)
        || (status === TEST_STATUS_PASSED)
        || (status === TEST_STATUS_FAILED)) {
      return status;
    }
    return TEST_STATUS_UNDEFINED;
  }
  
  static valuesForStatus() {
    return valuesForStatus;
  }
}

export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('number'),
  feature: DS.belongsTo('feature'),

  validStatus: computed('state', function() {
    let status = this.get('state');
    return Status.validateStatus(status);
  }),

  cssForStatus: computed('validStatus', function() {
    let status = this.get('validStatus');
    return cssForStatus[status];
  })
});

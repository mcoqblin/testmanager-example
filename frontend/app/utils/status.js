import EmberObject, { computed } from '@ember/object';

const TEST_STATUS_UNDEFINED = 0;
const TEST_STATUS_PASSED =    1;
const TEST_STATUS_FAILED =    2;

const cssForStatus = [];
cssForStatus[TEST_STATUS_UNDEFINED] = 'test-undefined';
cssForStatus[TEST_STATUS_PASSED] =    'test-passed';
cssForStatus[TEST_STATUS_FAILED] =    'test-failed';

const textForStatus = [];
textForStatus[TEST_STATUS_UNDEFINED] = 'Undefined';
textForStatus[TEST_STATUS_PASSED] =    'Passed';
textForStatus[TEST_STATUS_FAILED] =    'Failed';

const valueForStatus = {
  statusUndefined:  TEST_STATUS_UNDEFINED,
  statusPassed:     TEST_STATUS_PASSED,
  statusFailed:     TEST_STATUS_FAILED
};

export default EmberObject.extend({
  validateStatus(status) {
    status = parseInt(status);

    if (isNaN(status))
      return TEST_STATUS_UNDEFINED;
    
    if ((status === TEST_STATUS_UNDEFINED)
        || (status === TEST_STATUS_PASSED)
        || (status === TEST_STATUS_FAILED)) {
      return status;
    }

    return TEST_STATUS_UNDEFINED;
  },

  cssForStatus(status) {
    status = this.validateStatus(status);
    return cssForStatus[status];
  },

  textForStatus(status) {
    status = this.validateStatus(status);
    return textForStatus[status];
  },
  
  valueForStatus: valueForStatus
});

import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    valueForStatus: alias('status-tools.valueForStatus'),
    
    actions: {
        testStatusChanged(testId, value) {
            this.get('testStatusChanged')(testId,value);
        }
    }
});

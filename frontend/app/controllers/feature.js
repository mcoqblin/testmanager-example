import Controller from '@ember/controller';
import { Status } from '../models/test';

export default Controller.extend({
    valuesForStatus: Status.valuesForStatus(),
    
    actions: {
        testStatusChanged(testId, status) {
            this.changeTestStatus(testId, status);
        }
    },

    changeTestStatus(testId, status) {
        this.get('store').findRecord('test',testId).then(function(test) {
            test.set('state', status);
            test.save().catch(function(error) {
                console.error('There was an error updating test. Rolling back.');
                test.rollbackAttributes();
            });
        }).catch(function(error) {
            console.error('There was an error fetching test. Test ID is probably invalid.');
        });
    }
});

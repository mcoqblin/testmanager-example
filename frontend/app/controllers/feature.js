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
        let logger = this.get('logger');
        status = Status.validateStatus(status);
        
        this.get('store').findRecord('test',testId).then(function(test) {
            test.set('state', status);
            test.save().then(function(test) {
                logger.success(test.get('name') + ' was updated.');
            }).catch(function(error) {
                logger.error('There was an error updating test. Rolling back.');
                test.rollbackAttributes();
            });
        }).catch(function(error) {
            logger.error('There was an error fetching test. Test ID is probably invalid.');
        });
    }
});

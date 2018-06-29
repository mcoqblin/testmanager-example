import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        testStatusChanged(testId, status) {
            this.changeTestStatus(testId, status);
        }
    },

    changeTestStatus(testId, status) {
        let logger = this.get('logger');
        let statusTools = this.get('status-tools');
        
        status = statusTools.validateStatus(status);
        
        this.get('store').findRecord('test',testId).then(function(test) {
            test.set('state', status);
            test.save().then(function(test) {
                logger.success(test.get('name') + ' was updated to '
                                + test.get('textForStatus') + '.');
            }).catch(function(error) {
                logger.error('There was an error updating test. Rolling back.');
                test.rollbackAttributes();
            });
        }).catch(function(error) {
            logger.error('There was an error fetching test. Test ID is probably invalid.');
        });
    }
});

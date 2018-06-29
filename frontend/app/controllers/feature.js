import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        onTestStatusChanged(testId, status) {
            this.changeTestStatus(testId, status);
        },

        onCreateTest(featureId, name) {
            this.createTest(featureId, name);
        },

        onRenameTest(testId, name) {
            this.renameTest(testId, name);
        },

        onDeleteTest(testId) {
            this.deleteTest(testId);
        }
    },

    changeTestStatus(testId, status) {
        let logger = this.get('logger');

        let statusTools = this.get('status-tools');
        
        status = statusTools.validateStatus(status);

        // Safe version, always fetching the test, instead of assuming it's valid
        this.get('store').findRecord('test',testId).then(function(test) {
            test.set('state', status);
            test.save().then(function(test) {
                logger.success(test.get('name') + ' was updated to '
                                + test.get('textForStatus') + '.');
            }).catch(function() {
                logger.failure('There was an error updating test. Rolling back.');
                test.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error fetching test. Test ID is probably invalid.');
        });
        
        // Unsafe but faster version
        /*let test = this.get('store').peekRecord('test',testId);
        if (test === null) {
            logger.failure('There was an error fetching test. Test ID is probably invalid.');
            return;
        }

        test.set('state', status);
        test.save().then(function(test) {
            logger.success(test.get('name') + ' was updated to '
                            + test.get('textForStatus') + '.');
        }).catch(function() {
            logger.failure('There was an error updating test. Rolling back.');
            test.rollbackAttributes();
        });*/
    },

    createTest(featureId, name) {
        let logger = this.get('logger');
        logger.log('Creating Test "' + name + '" for Feature ID ' + featureId + '.');
    },

    renameTest(testId, name) {
        let logger = this.get('logger');
        logger.log('Renaming Test ID ' + testId + ' to "' + name + '".');
    },

    deleteTest(testId) {
        let logger = this.get('logger');
        logger.log('Deleting Test ID ' + testId + '.');
    }
});

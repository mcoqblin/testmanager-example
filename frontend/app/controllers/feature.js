import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';

export default Controller.extend({
    dialogComponent: oneWay('confirm-dialog.component'),
    dialogAction: computed('confirm-dialog.action', function() {
        let action = this.get('confirm-dialog.action');
        if (action === null)
            return this.get('createTest');
        return action;
    }),

    createCreateDialog() {
        this.get('confirm-dialog').createCreateDialog(this.createTest,
            'Test',
        );
    },
    
    createRenameDialog(testId) {
        this.get('store').findRecord('test', testId).then(test => {
            this.get('confirm-dialog').createRenameDialog(this.renameTest,
                'Test',
                testId,
                test.get('name')
            );
        });
        
    },
    
    createDeleteDialog(testId) {
        this.get('store').findRecord('test', testId).then(test => {
            this.get('confirm-dialog').createDeleteDialog(this.deleteTest,
                'Test',
                test.get('name'),
                testId
            );
        });
        
    },

    actions: {
        onTestStatusChanged(testId, status) {
            this.changeTestStatus(testId, status);
        },

        onCreateTest() {
            this.createCreateDialog();
        },

        onRenameTest(testId) {
            this.createRenameDialog(testId);
        },

        onDeleteTest(testId) {
            this.createDeleteDialog(testId);
        },
    },

    changeTestStatus(testId, status) {
        let logger = this.get('logger');

        let statusTools = this.get('status-tools');
        
        status = statusTools.validateStatus(status);

        // Safe version, always fetching the test, instead of assuming it's valid
        this.get('store').findRecord('test', testId).then(function(test) {
            test.set('state', status);
            test.save().then(function(test) {
                logger.success('Test "' + test.get('name') + '" status was updated to '
                                + test.get('textForStatus') + '.');
            }).catch(function() {
                logger.failure('There was an error when updating test status.');
                test.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error when updating test status: Test is invalid.');
        });
        
        // Unsafe but faster version
        /*let test = this.get('store').peekRecord('test',testId);
        if (test === null) {
            logger.failure('There was an error updating test status: Test is invalid.');
            return;
        }

        test.set('state', status);
        test.save().then(function(test) {
            logger.success('Test "' + test.get('name') + '" status was updated to '
                            + test.get('textForStatus') + '.');
        }).catch(function() {
            logger.failure('There was an error updating test status.');
            test.rollbackAttributes();
        });*/
    },

    createTest(name) {
        let logger = this.get('logger');
        let store = this.get('store');
        let defaultStatus = this.get('status-tools').get('defaultStatus');

        let featureId = this.get('model').get('id');

        if ((typeof name) !== 'string')
            name = '';
        if (name.length === 0) {
            logger.failure('There was an error when creating test: Test name is empty.');
            return;
        }
        
        this.get('store').findRecord('feature', featureId).then(function(feature) {
            let test = store.createRecord('test', { name: name, state: defaultStatus, feature: feature });
            
            test.save().then(function(test) {
                logger.success('Test "' + test.get('name') + '" was created.');
            }).catch(function() {
                logger.failure('There was an error when creating test.');
            });
        }).catch(function() {
            logger.failure('There was an error when creating test: Feature is invalid.');
        });
    },

    renameTest(name, testId) {
        let logger = this.get('logger');

        if ((typeof name) !== 'string')
            name = '';
        if (name.length === 0) {
            logger.failure('There was an error when renaming test: Test name is empty.');
            return;
        }
        
        this.get('store').findRecord('test', testId).then(function(test) {
            let oldName = test.get('name');

            test.set('name', name);
            test.save().then(function(test) {
                logger.success('Test "' + oldName + '" was renamed to "'
                                + test.get('name') + '".');
            }).catch(function() {
                logger.failure('There was an error when renaming test "' + oldName + '".');
                test.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error when renaming test: Test is invalid.');
        });
    },

    deleteTest(testId) {
        let logger = this.get('logger');

        this.get('store').findRecord('test', testId, { backgroundReload: false }).then(function(test) {
            let oldName = test.get('name');

            test.destroyRecord().then(function(test) {
                logger.success('Test "' + oldName + '" was deleted.');
            }).catch(function() {
                logger.failure('There was an error when deleting test "' + oldName + '".');
                test.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error when deleting test: Test is invalid.');
        });
    }
});

import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';

export default Controller.extend({
    dialogComponent: oneWay('confirm-dialog.component'),
    dialogAction: computed('confirm-dialog.action', function() {
        let action = this.get('confirm-dialog.action');
        if (action === null)
            return this.get('onCreateFeature');
        return action;
    }),

    onCreateFeature(name) {
        this.get('logger').log('Reached onCreateFeature with name: ' + name);
    },

    onRenameFeature(name, featureId) {
        this.get('logger').log('Reached onRenameFeature with ID: ' + featureId
                                + ' and new name: ' + name);
    },

    onDeleteFeature(featureId) {
        this.get('logger').log('Reached onDeleteFeature with ID: ' + featureId);
    },
    
    createCreateDialog() {
        this.get('confirm-dialog').createCreateDialog(this.onCreateFeature,
            'Create a new feature',
            'Feature name'
        );
    },
    
    createRenameDialog(featureId) {
        this.get('store').findRecord('feature', featureId).then(feature => {
            this.get('confirm-dialog').createRenameDialog(this.onRenameFeature,
                'Rename feature',
                'Feature name',
                featureId,
                feature.get('name')
            );
        });
    },
    
    createDeleteDialog(featureId) {
        this.get('store').findRecord('feature', featureId).then(feature => {
            this.get('confirm-dialog').createDeleteDialog(this.onDeleteFeature,
                'Delete feature',
                'This will remove "' + feature.get('name') + '". Continue?',
                featureId
            );
        });
    },

    actions: {
        onCreateFeature() {
            this.createCreateDialog();
        },
        
        onRenameFeature(featureId) {
            this.createRenameDialog(featureId);
        },
        
        onDeleteFeature(featureId) {
            this.createDeleteDialog(featureId);
        },

        /*onCreateFeature(name) {
            this.createFeature(name);
        },
        
        onRenameFeature(featureId, name) {
            this.renameFeature(featureId, name);
        },
        
        onDeleteFeature(featureId) {
            this.deleteFeature(featureId);
        },*/

        onShowTextDialog() {
            this.set('dialog.component', 'text-confirm-dialog');
            this.set('dialog.info.title', 'Text Dialog');
            this.set('dialog.info.text', 'Text Dialog text.');
            this.set('dialog.info.value', '');
            this.set('dialog.info.okButton', 'OK');
            this.set('dialog.info.cancelButton', 'Cancel');
            this.set('dialog.action', this.onTextDialogConfirmed);
            this.showDialog();
        },

        onShowInputDialog() {
            this.set('dialog.component', 'input-confirm-dialog');
            this.set('dialog.info.title', 'Input Dialog');
            this.set('dialog.info.text', 'Input Dialog text.');
            this.set('dialog.info.value', 'Test');
            this.set('dialog.info.okButton', 'OK');
            this.set('dialog.info.cancelButton', 'Cancel');
            this.set('dialog.action', this.onInputDialogConfirmed);
            this.showDialog();
        },
        
        onDialogConfirmed() {
            this.get('logger').log('onDialogConfirmed(): Back in controller. Text was: '
                                    + this.get('dialog.info.text'));
        }
    },

    createFeature(name) {
        let logger = this.get('logger');

        if ((typeof name) !== 'string')
            name = '';
        if (name.length === 0) {
            logger.failure('There was an error when creating feature: Feature name is empty.');
            return;
        }
        
        let feature = this.get('store').createRecord('feature', { name: name });
        
        feature.save().then(function(feature) {
            logger.success('Feature "' + feature.get('name') + '" was created.');
        }).catch(function() {
            logger.failure('There was an error when creating feature.');
        });
    },

    renameFeature(name, featureId) {
        let logger = this.get('logger');

        if ((typeof name) !== 'string')
            name = '';
        if (name.length === 0) {
            logger.failure('There was an error when renaming feature: Feature name is empty.');
            return;
        }

        this.get('store').findRecord('feature', featureId).then(function(feature) {
            let oldName = feature.get('name');

            feature.set('name', name);
            feature.save().then(function(feature) {
                logger.success('Feature "' + oldName + '" was renamed to "'
                                + feature.get('name') + '".');
            }).catch(function() {
                logger.failure('There was an error when renaming feature "' + oldName + '".');
                feature.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error when renaming feature: Feature is invalid.');
        });
    },

    deleteFeature(featureId) {
        let logger = this.get('logger');

        this.get('store').findRecord('feature', featureId, { backgroundReload: false, include: 'tests' })
                            .then(function(feature) {
            let oldName = feature.get('name');

            feature.get('tests').toArray().forEach(test => {
                test.unloadRecord();
            });

            feature.destroyRecord().then(function(feature) {
                logger.success('Feature "' + oldName + '" was deleted.');
            }).catch(function() {
                logger.failure('There was an error when deleting feature "' + oldName + '".');
                feature.rollbackAttributes();
            });
        }).catch(function() {
            logger.failure('There was an error when deleting feature: Feature is invalid.');
        });
    }
});

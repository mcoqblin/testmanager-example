import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';

export default Controller.extend({
    dialogComponent: oneWay('confirm-dialog.component'),
    dialogAction: computed('confirm-dialog.action', function() {
        let action = this.get('confirm-dialog.action');
        if (action === null)
            return this.get('createFeature');
        return action;
    }),
    
    createCreateDialog() {
        this.get('confirm-dialog').createCreateDialog(this.createFeature,
            'Feature'
        );
    },
    
    createRenameDialog(featureId) {
        this.get('store').findRecord('feature', featureId).then(feature => {
            this.get('confirm-dialog').createRenameDialog(this.renameFeature,
                'Feature',
                featureId,
                feature.get('name')
            );
        });
    },
    
    createDeleteDialog(featureId) {
        this.get('store').findRecord('feature', featureId).then(feature => {
            this.get('confirm-dialog').createDeleteDialog(this.deleteFeature,
                'Feature',
                feature.get('name'),
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

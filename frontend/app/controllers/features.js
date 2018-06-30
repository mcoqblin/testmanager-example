import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        onCreateFeature(name) {
            let logger = this.get('logger');
            logger.log('Creating Feature "' + name + '".');
            this.createFeature(name);
        },
        
        onRenameFeature(featureId, name) {
            let logger = this.get('logger');
            logger.log('Renaming Feature ID ' + featureId + ' to "' + name + '".');
            this.renameFeature(featureId, name);
        },
        
        onDeleteFeature(featureId) {
            let logger = this.get('logger');
            logger.log('Deleting Feature ID ' + featureId + '.');
            this.deleteFeature(featureId);
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

    renameFeature(featureId, name) {
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

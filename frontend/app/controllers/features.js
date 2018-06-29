import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        onCreateFeature(name) {
            this.createFeature(name);
        },
        
        onRenameFeature(featureId, name) {
            this.renameFeature(featureId, name);
        },
        
        onDeleteFeature(featureId) {
            this.deleteFeature(featureId);
        }
    },

    createFeature(name) {
        let logger = this.get('logger');
        logger.log('Creating Feature "' + name + '".');
    },

    renameFeature(featureId, name) {
        let logger = this.get('logger');
        logger.log('Renaming Feature ID ' + featureId + ' to "' + name + '".');
    },

    deleteFeature(featureId) {
        let logger = this.get('logger');
        logger.log('Deleting Feature ID ' + featureId + '.');
    }
});

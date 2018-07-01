import Component from '@ember/component';

export default Component.extend({
    actions: {
        onConfirm() {
            // Usage for this type of dialog is inputing a text value
            // Usage examples: creating or renaming
            // We might not need the ID if creating, so value comes first
            this.get('onConfirm')(this.get('info.value'), this.get('info.id'));
        }
    }
});

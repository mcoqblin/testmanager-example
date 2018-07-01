import Component from '@ember/component';

export default Component.extend({
    actions: {
        onConfirm() {
            // Usage for this type of dialog is confirming we're doing something
            // Usage example: deleting
            // No input to get, all we need is an ID
            this.get('onConfirm')(this.get('info.id'));
        }
    }
});

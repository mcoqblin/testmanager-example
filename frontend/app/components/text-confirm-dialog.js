import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    info: alias('confirm-dialog.info'),
    data: alias('confirm-dialog.data'),

    actions: {
        onConfirm() {
            // Usage for this type of dialog is confirming we're doing something
            // Usage example: deleting
            // No input to get, all we need is an ID
            this.get('onConfirm')(this.get('data.id'));
        }
    }
});

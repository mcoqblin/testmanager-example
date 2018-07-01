import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    info: alias('confirm-dialog.info'),
    data: alias('confirm-dialog.data'),

    actions: {
        onConfirm() {
            // Usage for this type of dialog is inputing a text value
            // Usage examples: creating or renaming
            // We might not need the ID if creating, so value comes first
            this.get('onConfirm')(this.get('data.value'), this.get('data.id'));
        }
    }
});

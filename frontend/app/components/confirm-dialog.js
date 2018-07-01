import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    classNames: ['dialog'],
    classNameBindings: ['isShown:show-dialog:hide-dialog'],

    isShown: alias('confirm-dialog.isShown'),
    info: alias('confirm-dialog.info'),

    showDialog() {
        this.set('isShown', true);
    },

    hideDialog() {
        this.set('isShown', false);
    },

    actions: {
        onShowDialog() {
            this.showDialog();
        },

        onHideDialog() {
            this.hideDialog();
        },

        // This is the generic dialog with buttons
        // We're only handling events here, parent components with handle data
        onConfirm() {
            this.get('onConfirm')();
            this.hideDialog();
        },

        onCancel() {
            this.hideDialog();
        }
    }
});

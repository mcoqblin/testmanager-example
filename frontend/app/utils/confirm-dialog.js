import EmberObject from '@ember/object';

export default EmberObject.extend({
  isShown: false,
  component: 'text-confirm-dialog',
  action: null,

  info: {
    title: '',
    text: '',
    okButton: '',
    cancelButton: ''
  },

  data: {
    id: 0,
    value: ''
  },

  showDialog() {
    this.set('isShown', true);
  },

  hideDialog() {
    this.set('isShown', false);
  },

  createDialog(component, action, title, text, okButton, cancelButton, id, value) {
    this.hideDialog();

    let info = {
      title: title,
      text: text,
      okButton: okButton,
      cancelButton: cancelButton
    };
    let data = {
      id: id,
      value: value
    };

    this.set('component', component);
    this.set('action', action);
    this.set('info', info);
    this.set('data', data);

    this.showDialog();
  },

  createCreateDialog(action, title, text) {
    this.createDialog('input-confirm-dialog', action, title, text, 'OK', 'Cancel', 0, '');
  },

  createRenameDialog(action, title, text, id, value) {
    this.createDialog('input-confirm-dialog', action, title, text, 'OK', 'Cancel', id, value);
  },

  createDeleteDialog(action, title, text, id) {
    this.createDialog('text-confirm-dialog', action, title, text, 'OK', 'Cancel', id, '');
  }
});

import EmberObject from '@ember/object';

const MAX_NAME_LENGTH = 100;

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

  trimName(name) {
    return this.get('trim-name').trimNameSimple(name, MAX_NAME_LENGTH);
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

  createCreateDialog(action, what) {
    this.createDialog(
      'input-confirm-dialog',
      action,
      'Create ' + what,
      what + ' name',
      'OK',
      'Cancel',
      0,
      ''
    );
  },

  createRenameDialog(action, what, id, value) {
    this.createDialog(
      'input-confirm-dialog',
      action,
      'Rename ' + what,
      what + ' name',
      'OK',
      'Cancel',
      id,
      value
    );
  },

  createDeleteDialog(action, what, name, id) {
    this.createDialog(
      'text-confirm-dialog',
      action,
      'Delete ' + what,
      'This will delete "' + this.trimName(name) + '". Continue?',
      'OK',
      'Cancel',
      id,
      ''
    );
  }
});

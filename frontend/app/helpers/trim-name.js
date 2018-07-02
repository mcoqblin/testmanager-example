import Helper from '@ember/component/helper';

const MAX_NAME_LENGTH = 100;

export default Helper.extend({
  compute([name, ...rest], args) {

    let maxLength = (args.size === undefined) ? MAX_NAME_LENGTH : args.size;
    if ((typeof maxLength) !== 'number')
      maxLength = MAX_NAME_LENGTH;
    
    let full = (args.full === undefined) ? true : args.full;
    if ((typeof full) !== 'boolean')
      full = true;

    if (full)
      return this.get('trim-name').trimNameFull(name, maxLength);
    return this.get('trim-name').trimNameSimple(name, maxLength);
  }
});

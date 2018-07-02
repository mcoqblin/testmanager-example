import EmberObject from '@ember/object';

export default EmberObject.extend({
  trimName(name, maxLength, closingString) {
    if (closingString === undefined)
      closingString = '...';
      
    if ((typeof name) !== 'string')
      return '';
    if (name.length < (closingString+1))
      return name;
    
    if (name.length > maxLength)
      name = name.substr(0, maxLength-closingString.length).trim() + closingString;
    return name;
  },

  trimNameSimple(name, maxLength) {
    return this.trimName(name, maxLength, '...');
  },
  
  trimNameFull(name, maxLength) {
    return this.trimName(name, maxLength, ' (...)');
  }
});

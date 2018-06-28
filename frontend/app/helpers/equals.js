import { helper } from '@ember/component/helper';

export function equals([value1, value2]) {
  return (value1 === value2);
}

export default helper(equals);

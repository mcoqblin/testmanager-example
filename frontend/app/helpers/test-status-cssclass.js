import { helper } from '@ember/component/helper';

export function testStatusCssclass([status]) {
  if (status === 1) {
    return 'test-passed';
  }
  if (status === 2) {
    return 'test-failed';
  }
  return 'test-undefined';
}

export default helper(testStatusCssclass);

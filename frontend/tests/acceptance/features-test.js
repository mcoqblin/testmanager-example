import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | features', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / (should redirect to /features)', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/features');
  });

  test('visiting /features', async function(assert) {
    await visit('/features');

    assert.equal(currentURL(), '/features');
  });
});

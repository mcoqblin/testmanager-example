import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | feature', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /feature (should redirect to /features)', async function(assert) {
    await visit('/feature');

    assert.equal(currentURL(), '/features');
  });

  test('visiting /feature/[existing id]', async function(assert) {
    await visit('/feature/1');

    assert.equal(currentURL(), '/feature/1');
  });

  test('visiting /feature/[invalid id]', async function(assert) {
    await visit('/feature/0');

    assert.equal(currentURL(), '/features');
  });
});

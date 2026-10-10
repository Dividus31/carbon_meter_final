//Tests for health check and authentication
const test = require('node:test');
const assert = require('node:assert/strict');

test('GET /api/health returns status ok', async () => {
  const response = await fetch('http://host.docker.internal:3000/api/health');

  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.status, 'ok');
});

//Authentication tests for customer routes
test('GET /api/customer/favorites rejects unauthenticated requests', async () => {
  const response = await fetch(
    'http://host.docker.internal:3000/api/customer/favorites'
  );

  assert.equal(response.status, 401);
});
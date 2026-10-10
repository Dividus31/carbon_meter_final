//Tests for health check and authentication
const test = require('node:test');
const assert = require('node:assert/strict');
const API_BASE_URL =
  process.env.API_BASE_URL || 'http://localhost:3000';

test('GET /api/health returns status ok', async () => {
  let response;

try {
  response = await fetch(`${API_BASE_URL}/api/health`);
} catch (error) {
  console.error('API request failed:', error);
  throw error;
}

  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.status, 'ok');
});

//Authentication tests for customer routes
test('GET /api/customer/favorites rejects unauthenticated requests', async () => {
  const response = await fetch(
  `${API_BASE_URL}/api/customer/favorites`
    );

  assert.equal(response.status, 401);
});
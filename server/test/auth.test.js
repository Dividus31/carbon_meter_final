
const test = require('node:test');
const assert = require('node:assert/strict');

process.env.JWT_SECRET = 'test-secret';

const jwt = require('jsonwebtoken');
const { requireAuth } = require('../src/middleware/auth');

function createResponse() {
  return {
    statusCode: null,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    },
  };
}

test('requireAuth rejects requests without a token', () => {
  const req = { cookies: {} };
  const res = createResponse();
  let nextCalled = false;

  requireAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error, 'Not authenticated.');
  assert.equal(nextCalled, false);
});

test('requireAuth accepts a valid token', () => {
  const token = jwt.sign(
    { email: 'test@example.com', name: 'Test User' },
    process.env.JWT_SECRET,
    { subject: '123' }
  );

  const req = { cookies: { cm_session: token } };
  const res = createResponse();
  let nextCalled = false;

  requireAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.user, {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
  });
});

test('requireAuth rejects an invalid token', () => {
  const req = { cookies: { cm_session: 'invalid-token' } };
  const res = createResponse();

  requireAuth(req, res, () => {
    assert.fail('next() must not be called');
  });

  assert.equal(res.statusCode, 401);
  assert.equal(
    res.body.error,
    'Your session has expired. Please log in again.'
  );
});

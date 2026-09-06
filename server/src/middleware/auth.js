const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const COOKIE_NAME = 'cm_session';

function requireAuth(req, res, next) {
  const token = req.cookies ? req.cookies[COOKIE_NAME] : undefined;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email, name: payload.name };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }
}

// Must run after requireAuth. Re-checks the role straight from the database
// on every request rather than trusting the JWT claim, so a demoted admin
// loses access immediately instead of waiting out an old token.
async function requireAdmin(req, res, next) {
  try {
    const result = await pool.query('SELECT role FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    return next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Admin check failed:', err);
    return res.status(500).json({ error: 'Could not verify admin access.' });
  }
}

module.exports = { requireAuth, requireAdmin, COOKIE_NAME };

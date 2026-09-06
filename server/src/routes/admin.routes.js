const express = require('express');
const { pool } = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Every route below requires a valid session AND role = 'admin'.
router.use(requireAuth, requireAdmin);

// GET /api/admin/customers - list every registered customer
router.get('/customers', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, created_at
       FROM users
       ORDER BY created_at DESC`
    );
    return res.json({ customers: result.rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Listing customers failed:', err);
    return res.status(500).json({ error: 'Could not load customers.' });
  }
});

module.exports = router;

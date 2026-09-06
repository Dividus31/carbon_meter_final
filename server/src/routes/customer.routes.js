const express = require('express');
const { pool } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Every route in this file is part of the logged-in customer area.
router.use(requireAuth);

// GET /api/customer/favorites - list the current user's tracked countries
router.get('/favorites', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, country_code, country_name, created_at
       FROM user_favorites
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    return res.json({ favorites: result.rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Listing favorites failed:', err);
    return res.status(500).json({ error: 'Could not load your tracked countries.' });
  }
});

// POST /api/customer/favorites - add a country to the current user's tracker
router.post('/favorites', async (req, res) => {
  const { countryCode, countryName } = req.body || {};

  if (typeof countryCode !== 'string' || countryCode.trim().length === 0) {
    return res.status(400).json({ error: 'countryCode is required.' });
  }
  if (typeof countryName !== 'string' || countryName.trim().length === 0) {
    return res.status(400).json({ error: 'countryName is required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_favorites (user_id, country_code, country_name)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, country_code) DO NOTHING
       RETURNING id, country_code, country_name, created_at`,
      [req.user.id, countryCode.trim().toUpperCase(), countryName.trim()]
    );

    if (result.rowCount === 0) {
      return res.status(409).json({ error: 'That country is already in your tracker.' });
    }

    return res.status(201).json({ favorite: result.rows[0] });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Adding favorite failed:', err);
    return res.status(500).json({ error: 'Could not add country.' });
  }
});

// DELETE /api/customer/favorites/:id - remove a tracked country
router.delete('/favorites/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid favorite id.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM user_favorites WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Favorite not found.' });
    }

    return res.status(204).send();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Removing favorite failed:', err);
    return res.status(500).json({ error: 'Could not remove country.' });
  }
});

module.exports = router;

// One-off CLI helper: promotes an already-registered user to admin.
// Deliberately NOT exposed as an HTTP route - admin accounts are created by
// whoever controls the server/database, not through the public sign-up form.
//
// Usage: npm run make-admin -- someone@example.com
require('dotenv').config();
const { pool } = require('./db');

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: npm run make-admin -- <email>');
    process.exitCode = 1;
    return;
  }

  const normalized = email.trim().toLowerCase();
  const result = await pool.query(
    `UPDATE users SET role = 'admin' WHERE email = $1 RETURNING id, name, email, role`,
    [normalized]
  );

  if (result.rowCount === 0) {
    console.error(
      `No user found with email ${normalized}. Register that account on the site first, then run this again.`
    );
    process.exitCode = 1;
    return;
  }

  console.log('Promoted to admin:', result.rows[0]);
}

main()
  .catch((err) => {
    console.error('Failed to promote user:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

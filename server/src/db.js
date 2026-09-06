const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    'DATABASE_URL is not set. Copy server/.env.example to server/.env and fill it in.'
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  // A background/idle client failed - this is unrecoverable for that
  // connection, log it loudly instead of letting it crash the process silently.
  // eslint-disable-next-line no-console
  console.error('Unexpected error on idle Postgres client', err);
});

module.exports = { pool };

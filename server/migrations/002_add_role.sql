-- Adds a simple admin role. Idempotent (safe to run every migrate run,
-- since server/src/migrate.js re-applies every *.sql file each time).

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.disable('x-powered-by');

const LOCALHOST_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

app.use(
  cors({
    origin: function (origin, callback) {
      // No Origin header at all (curl, server-to-server, same-origin) - allow.
      if (!origin) return callback(null, true);

      // In development, accept ANY localhost/127.0.0.1 origin regardless of
      // port, since static dev servers (Live Preview, `serve`, http.server,
      // ...) rarely agree on a port. Production only accepts CLIENT_ORIGIN.
      if (process.env.NODE_ENV !== 'production' && LOCALHOST_ORIGIN_RE.test(origin)) {
        return callback(null, true);
      }

      if (origin === process.env.CLIENT_ORIGIN) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS: ' + origin));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health check for load balancers / CI-CD deploy probes.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/admin', adminRoutes);

// 404 for anything else under /api
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Carbon-Meter API listening on port ${PORT}`);
});

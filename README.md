# Carbon-Meter

Tracks carbon emissions and green energy usage worldwide. Has a customer
area with login, backed by Postgres.

## Run the site

```bash
npx serve .
# or: python3 -m http.server 8080
```

## Run the backend (needed for login)

Need Postgres running first:

```bash
docker run --name carbon-meter-db \
  -e POSTGRES_USER=carbonmeter -e POSTGRES_PASSWORD=carbonmeter -e POSTGRES_DB=carbonmeter \
  -p 5432:5432 -d postgres:16
```

Then:

```bash
cd server
cp .env.example .env
npm install
npm run migrate
npm run dev
```

API runs on `http://localhost:3000`. Open `login.html` once it's up.

## Admin

Register an account on the site, then run:

```bash
cd server
npm run make-admin -- your-email@example.com
```

Log back in and an Admin button shows up.

---
title: 10 Production practices
tier: advanced
platform: javascript
position: 10
---

# 10 — Production practices

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 10 Production practices

**Goal:** harden the API for production — env vars, graceful shutdown, rate
limiting, and a health check endpoint.

## Environment variables

Create `.env.example`:

```bash
PORT=3000
JWT_SECRET=generate-a-real-secret

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=todos

RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

Install dotenv:

```bash
npm install dotenv
```

Load it at the top of `server.js`:

```js
require("dotenv").config();
```

> Add `.env` to `.gitignore` immediately. Never commit secrets.

## Graceful shutdown

Update `server.js`:

```js
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown(signal) {
  console.log(`\n${signal} received — shutting down`);
  server.close(async () => {
    await db.pool.end();
    console.log("Connections closed");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
```

## Health check endpoint

Add to `app.js`:

```js
app.get("/api/health", async (_req, res) => {
  try {
    await db.pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});
```

## Rate limiting

Install `express-rate-limit`:

```bash
npm install express-rate-limit
```

Add to `app.js`:

```js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

Place it early in the middleware chain, after the logger but before routes.

## CORS

If the API is consumed by a frontend, add CORS:

```bash
npm install cors
```

```js
const cors = require("cors");
app.use(cors());
```

## Final directory structure

```
.
├── .env.example
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── app.js
├── db.js
├── auth.js
├── middleware/
│   ├── logger.js
│   ├── auth.js
│   └── errorHandler.js
└── tests/
    ├── helpers.js
    ├── auth.test.js
    └── todos.test.js
```

## Checkpoint

```bash
# Start with production settings
JWT_SECRET=my-secret PGDATABASE=todos_test node server.js &
sleep 1

# Health check
curl -s http://localhost:3000/api/health
# {"status":"ok","database":"connected"}

# SIGINT test
kill -2 %1
# ^CSIGINT received — shutting down
# Connections closed

# Rate limit test (send 101 requests quickly)
for i in $(seq 1 101); do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/health; done | sort | uniq -c
#     100 200
#       1 429
```

## What you've built

| Tier | Artifact |
|------|----------|
| Beginner | CLI todo (add, list) |
| Intermediate | CLI todo (done, remove, filter, seed) |
| **Advanced** | **Express API + PostgreSQL + JWT auth + Docker + CI** |

From `node cli.js add "buy milk"` to a production-ready REST API deployed via
CI/CD. Each skill composes: the database CRUD wraps the CLI logic, the Express
routes wrap the database, the auth middleware wraps the routes, and Docker
wraps it all.

---

Next: back to [Advanced overview](./index)

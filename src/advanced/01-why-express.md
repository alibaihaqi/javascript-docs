---
title: 01 Why Express
tier: advanced
platform: javascript
position: 1
---

# 01 — Why Express

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 01 Why Express

**Goal:** understand why a CLI todo needs to become a web API and why Express is
the right tool for the job.

## What the CLI does well

The CLI todo works fine for one person on one machine:

```bash
node cli.js add "buy milk"
node cli.js list
```

But it has hard limits:

| Limit | Why it matters |
|-------|----------------|
| Single user | Only the person at the terminal can use it |
| No persistence contract | The JSON file lives on one filesystem — no sharing |
| No access control | Anyone who can run the file can edit todos |
| No remote access | You can't use it from your phone, another laptop, or a web app |

## What a web API gives you

A web server exposes the same logic over HTTP. Any client — web app, mobile app,
curl, another server — can call it:

```
GET  /api/todos      → list all todos
POST /api/todos      → create a todo
PATCH /api/todos/1   → mark done
DELETE /api/todos/1  → remove a todo
```

## Why Express

[Express](https://expressjs.com/) is the most popular Node.js web framework:

- **Minimal** — a few lines to handle a request
- **Middleware ecosystem** — auth, logging, rate limiting as plugins
- **Stable** — v4 has been production-tested for a decade
- **Zero config** — no CLI boilerplate, just `npm install express`

## The stack you'll build

| Layer | Technology |
|-------|-----------|
| HTTP server | Express |
| Database | PostgreSQL via `pg` |
| Auth | bcrypt + jsonwebtoken |
| Container | Docker + docker-compose |
| CI/CD | GitHub Actions |
| Tests | Jest + supertest |

---

Next: [02 Express server](./02-express-server)

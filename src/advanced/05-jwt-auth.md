---
title: 05 JWT auth
tier: advanced
platform: javascript
position: 5
---

# 05 — JWT auth

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 05 JWT auth

**Goal:** add user registration and login with bcrypt password hashing and JSON
Web Tokens so only authenticated users can manage todos.

## Install dependencies

```bash
npm install jsonwebtoken bcrypt
```

## User model

Add to `db.js`:

```js
const crypto = require("crypto");

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id       SERIAL PRIMARY KEY,
      email    TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  // ... existing todos table migration
}
```

Add user helpers to `db.js`:

```js
const bcrypt = require("bcrypt");

async function createUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, hash]
  );
  return rows[0];
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] || null;
}
```

## Auth routes

Create `auth.js`:

```js
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

router.post("/api/auth/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }
    const user = await db.createUser(email, password);
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "email already taken" });
    }
    next(err);
  }
});

router.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }
    const user = await db.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "invalid credentials" });
    const match = await require("bcrypt").compare(password, user.password);
    if (!match) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

## Wire into app

Add to `app.js`:

```js
const authRouter = require("./auth");
app.use(authRouter);
```

## Add userId column to todos

Add to `db.js` `migrate()`:

```js
ALTER TABLE todos ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
```

Update `getAllTodos` and `createTodo` in `db.js` to accept/filter by `userId`:

```js
async function getAllTodos(userId) {
  const { rows } = await pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id",
    [userId]
  );
  return rows;
}

async function createTodo(text, userId) {
  const { rows } = await pool.query(
    "INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *",
    [text, userId]
  );
  return rows[0];
}
```

## Checkpoint

```bash
node bin/migrate.js
# Migration complete

# Sign up
curl -s -X POST http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@test.com","password":"secret123"}'
# {"user":{"id":1,"email":"alice@test.com","created_at":"..."},"token":"eyJ..."}

# Login
curl -s -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@test.com","password":"secret123"}'
# {"user":{"id":1,"email":"alice@test.com"},"token":"eyJ..."}
```

---

Next: [06 Middleware](./06-middleware)

---
title: 03 PostgreSQL with pg
tier: advanced
platform: javascript
position: 3
---

# 03 — PostgreSQL with pg

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 03 PostgreSQL with pg

**Goal:** connect to a PostgreSQL database using the `pg` Node.js driver, run
migrations, and perform basic CRUD from a script.

## Prerequisites

- [PostgreSQL](https://www.postgresql.org/download/) installed locally
- A running Postgres server on port 5432

## Install pg

```bash
npm install pg
```

## Connect and create a table

Create `db.js`:

```js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "todos",
});

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id    SERIAL PRIMARY KEY,
      text  TEXT NOT NULL,
      done  BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log("Migration complete");
}

module.exports = { pool, migrate };
```

## Create the database

```bash
createdb todos
```

## Run the migration

Create `bin/migrate.js`:

```js
const { migrate } = require("../db");

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
```

```bash
node bin/migrate.js
# Migration complete
```

## CRUD helpers

Add these to `db.js`:

```js
async function getAllTodos() {
  const { rows } = await pool.query(
    "SELECT * FROM todos ORDER BY id"
  );
  return rows;
}

async function createTodo(text) {
  const { rows } = await pool.query(
    "INSERT INTO todos (text) VALUES ($1) RETURNING *",
    [text]
  );
  return rows[0];
}

async function updateTodo(id, fields) {
  const setClauses = [];
  const values = [];
  let idx = 1;

  if (fields.done !== undefined) {
    setClauses.push(`done = $${idx++}`);
    values.push(fields.done);
  }
  if (fields.text) {
    setClauses.push(`text = $${idx++}`);
    values.push(fields.text);
  }

  if (setClauses.length === 0) return null;

  values.push(id);
  const { rows } = await pool.query(
    `UPDATE todos SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function deleteTodo(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM todos WHERE id = $1",
    [id]
  );
  return rowCount > 0;
}

module.exports = { pool, migrate, getAllTodos, createTodo, updateTodo, deleteTodo };
```

## Checkpoint

```bash
node -e "
const { createTodo, getAllTodos } = require('./db');
createTodo('hello from pg').then(() => getAllTodos()).then(console.log).then(() => process.exit());
"
# [ { id: 1, text: 'hello from pg', done: false, created_at: 2026-07-05T... } ]
```

---

Next: [04 REST API](./04-rest-api)

---
title: 04 REST API
tier: advanced
platform: javascript
position: 4
---

# 04 — REST API

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 04 REST API

**Goal:** replace the in-memory todo store with PostgreSQL-backed CRUD,
turning the Express server into a real REST API.

## Full server with Postgres

Create `app.js` — the Express app exported without `listen()` (for testing later):

```js
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/api/todos", async (_req, res, next) => {
  try {
    const todos = await db.getAllTodos();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

app.post("/api/todos", async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text is required" });
    const todo = await db.createTodo(text);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

app.patch("/api/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.updateTodo(Number(req.params.id), req.body);
    if (!todo) return res.status(404).json({ error: "not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/todos/:id", async (req, res, next) => {
  try {
    const deleted = await db.deleteTodo(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = app;
```

Create `server.js` that imports `app.js` and starts listening:

```js
const app = require("./app");
const { migrate } = require("./db");

const PORT = process.env.PORT || 3000;

migrate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
```

## Checkpoint

```bash
node server.js &
sleep 1

curl -s -X POST http://localhost:3000/api/todos -H 'Content-Type: application/json' -d '{"text":"restful todo"}'
# {"id":1,"text":"restful todo","done":false,"created_at":"2026-07-05T..."}

curl -s http://localhost:3000/api/todos
# [{"id":1,"text":"restful todo","done":false,"created_at":"2026-07-05T..."}]

curl -s -X PATCH http://localhost:3000/api/todos/1 -H 'Content-Type: application/json' -d '{"done":true}'
# {"id":1,"text":"restful todo","done":true,"created_at":"2026-07-05T..."}

curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:3000/api/todos/1
# 204

kill %1 2>/dev/null
```

The API now persists across restarts. The data lives in PostgreSQL, not in memory.

---

Next: [05 JWT auth](./05-jwt-auth)

---
title: 02 Express server
tier: advanced
platform: javascript
position: 2
---

# 02 — Express server

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 02 Express server

**Goal:** scaffold an Express server that responds with JSON, with an in-memory
todo list so you can test it with curl.

## Install Express

```bash
npm install express
```

## Your first server

Create `server.js`:

```js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Todo API" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Run it

```bash
node server.js
```

In another terminal:

```bash
curl http://localhost:3000
# {"message":"Todo API"}
```

Press Ctrl+C to stop.

## In-memory CRUD

Add these routes before `app.listen`:

```js
const todos = [];
let nextId = 1;

app.get("/api/todos", (_req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });
  if (req.body.done !== undefined) todo.done = req.body.done;
  if (req.body.text) todo.text = req.body.text;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const idx = todos.findIndex((t) => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "not found" });
  todos.splice(idx, 1);
  res.status(204).end();
});
```

## Checkpoint

Restart the server (`node server.js`) then run:

```bash
curl -s http://localhost:3000/api/todos | node -e "process.stdin.pipe(require('fs').createWriteStream('/dev/null')) && console.log('OK')"
curl -s -X POST http://localhost:3000/api/todos -H 'Content-Type: application/json' -d '{"text":"buy milk"}'
# {"id":1,"text":"buy milk","done":false}

curl -s http://localhost:3000/api/todos
# [{"id":1,"text":"buy milk","done":false}]

curl -s -X PATCH http://localhost:3000/api/todos/1 -H 'Content-Type: application/json' -d '{"done":true}'
# {"id":1,"text":"buy milk","done":true}

curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:3000/api/todos/1
# 204
```

---

Next: [03 PostgreSQL with pg](./03-postgresql-with-pg)

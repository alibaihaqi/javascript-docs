---
title: 06 Middleware
tier: advanced
platform: javascript
position: 6
---

# 06 — Middleware

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 06 Middleware

**Goal:** add logging, error handling, and auth enforcement as Express middleware.

## Logging middleware

Create `middleware/logger.js`:

```js
function logger(req, _res, next) {
  const start = Date.now();
  const originalEnd = res.end;
  res.end = function (...args) {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
    return originalEnd.apply(this, args);
  };
  next();
}

module.exports = logger;
```

## Auth middleware

Create `middleware/auth.js`:

```js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing authorization header" });
  }
  try {
    const payload = jwt.verify(header.split(" ")[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}

module.exports = authenticate;
```

## Error handler

Create `middleware/errorHandler.js`:

```js
function errorHandler(err, _req, res, _next) {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "internal server error" });
}

module.exports = errorHandler;
```

## Wire all middleware into app.js

```js
const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./auth");

app.use(logger);
app.use(express.json());
app.use(authRouter);

// Protected routes
app.get("/api/todos", authenticate, async (req, res, next) => {
  try {
    const todos = await db.getAllTodos(req.user.userId);
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

app.post("/api/todos", authenticate, async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text is required" });
    const todo = await db.createTodo(text, req.user.userId);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// PATCH and DELETE follow the same pattern — add authenticate, pass req.user.userId

app.use(errorHandler);
```

> Remove the old unprotected route handlers for `/api/todos` — they are replaced
> by these authenticated versions.

## Checkpoint

```bash
node server.js &
sleep 1

# Without token
curl -s http://localhost:3000/api/todos
# {"error":"missing authorization header"}

# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@test.com","password":"secret123"}' | node -e "process.stdin.on('data',d=>console.log(JSON.parse(d).token))")

# Create with token
curl -s -X POST http://localhost:3000/api/todos \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"text":"authenticated todo"}'
# {"id":1,"text":"authenticated todo","done":false,"user_id":1,"created_at":"..."}

kill %1 2>/dev/null
```

The server log should show something like:

```
POST /api/auth/login 200 42ms
POST /api/todos 201 8ms
```

---

Next: [07 Docker deploy](./07-docker-deploy)

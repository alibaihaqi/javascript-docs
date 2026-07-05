---
title: 08 Integration tests
tier: advanced
platform: javascript
position: 8
---

# 08 — Integration tests

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 08 Integration tests

**Goal:** write integration tests with Jest and supertest that exercise the full
API against a test database.

## Install dev dependencies

```bash
npm install -D jest supertest
```

## Update package.json

Add to `package.json`:

```json
{
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/.bin/jest --forceExit --detectOpenHandles"
  }
}
```

## Test setup

Create `tests/helpers.js`:

```js
const { Pool } = require("pg");

const testPool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "todos_test",
});

async function cleanDb() {
  await testPool.query("DELETE FROM todos");
  await testPool.query("DELETE FROM users");
}

module.exports = { testPool, cleanDb };
```

Override the db module in tests by setting `PGDATABASE=todos_test`.

## Create test database

```bash
createdb todos_test
node bin/migrate.js
# (ensure PGDATABASE=todos_test is set)
```

## Auth tests

Create `tests/auth.test.js`:

```js
const request = require("supertest");
const app = require("../app");
const { cleanDb } = require("./helpers");

beforeEach(cleanDb);

describe("POST /api/auth/signup", () => {
  it("creates a user and returns a token", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "test@test.com", password: "secret" });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("test@test.com");
  });

  it("rejects duplicate email", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ email: "dup@test.com", password: "secret" });
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "dup@test.com", password: "secret" });
    expect(res.status).toBe(409);
  });
});
```

## Todo tests

Create `tests/todos.test.js`:

```js
const request = require("supertest");
const app = require("../app");
const { cleanDb } = require("./helpers");

let token;

beforeEach(async () => {
  await cleanDb();
  const res = await request(app)
    .post("/api/auth/signup")
    .send({ email: "todo@test.com", password: "pass" });
  token = res.body.token;
});

describe("POST /api/todos", () => {
  it("creates a todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "test todo" });
    expect(res.status).toBe(201);
    expect(res.body.text).toBe("test todo");
    expect(res.body.done).toBe(false);
  });

  it("rejects when not authenticated", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ text: "test" });
    expect(res.status).toBe(401);
  });
});

describe("GET /api/todos", () => {
  it("returns empty list initially", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
```

## Run tests

```bash
PGDATABASE=todos_test npm test
```

Expected output:

```
 PASS  tests/auth.test.js
 PASS  tests/todos.test.js

Tests:       6 passed, 6 total
```

## Checkpoint

```bash
PGDATABASE=todos_test npm test 2>&1 | tail -5
# Tests:       6 passed, 6 total
```

---

Next: [09 GitHub Actions](./09-github-actions)

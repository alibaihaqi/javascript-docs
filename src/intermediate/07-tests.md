---
title: 07 Tests
tier: intermediate
platform: javascript
---

# 07 — Tests

## Goal

Extend the test suite with four new cases covering every function added in this
tier. Uses the same built-in `node:test` + `node:assert/strict` combo from the
beginner tier — still zero new dependencies.

## The test file

```js
// todo.test.js — add these four tests below the existing beginner tests
const test = require("node:test");
const assert = require("node:assert/strict");
const { completeTodo, removeTodo, pendingTodos, formatList } = require("./todo");

test("completeTodo marks a todo done", () => {
  const out = completeTodo([{ text: "a", done: false }], 0);
  assert.equal(out[0].done, true);
});

test("removeTodo drops by index", () => {
  assert.deepEqual(
    removeTodo([{ text: "a" }, { text: "b" }], 0),
    [{ text: "b" }],
  );
});

test("pendingTodos keeps only not-done", () => {
  const out = pendingTodos([
    { text: "a", done: true },
    { text: "b", done: false },
  ]);
  assert.equal(out.length, 1);
  assert.equal(out[0].text, "b");
});

test("formatList shows [x]/[ ] markers", () => {
  assert.equal(
    formatList([
      { text: "a", done: true },
      { text: "b", done: false },
    ]),
    "1. [x] a\n2. [ ] b",
  );
});
```

## Run the tests

```bash
node --test
```

Expected output (4 tests passing):

```
✔ completeTodo marks a todo done (Xms)
✔ removeTodo drops by index (Xms)
✔ pendingTodos keeps only not-done (Xms)
✔ formatList shows [x]/[ ] markers (Xms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
```

## What each test covers

| Test | Function | Assertion |
|------|----------|-----------|
| completeTodo marks a todo done | `completeTodo` | `out[0].done === true` |
| removeTodo drops by index | `removeTodo` | result equals `[{ text: 'b' }]` |
| pendingTodos keeps only not-done | `pendingTodos` | length 1, item is `'b'` |
| formatList shows [x]/[ ] markers | `formatList` | exact string with markers |

## Why `assert/strict`?

`assert.equal` in strict mode uses `===` (no type coercion). `assert.deepEqual`
in strict mode recursively compares object values — `{ text: 'b' }` only passes
if the structure and values match exactly.

## Next steps

- Add a test for `seedTodos` using a mock `fetch` (swap the global with a
  function that returns a resolved Promise — no network needed).
- Wire `node --test` into a `package.json` script (`"test": "node --test"`) and
  run it in CI.

---
title: 07 Tests
---

# 07 Tests

**Goal:** verify the `todo` module's logic using Node's built-in test runner —
no extra packages required.

## node:test basics

`node:test` ships with Node 18+ and is fully stable in Node 26. Import `test`
and `assert` from built-in modules:

```js
const test = require("node:test");
const assert = require("node:assert/strict");
```

- `test(name, fn)` registers a test case.
- `assert.equal(actual, expected)` fails the test if the values differ.

## Test the todo module

Create `todo.test.js`:

```js
// todo.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { addTodo, formatList } = require("./todo");

test("addTodo appends a todo", () => {
  const out = addTodo([], "buy milk");
  assert.equal(out.length, 1);
  assert.equal(out[0].text, "buy milk");
});

test("formatList numbers rows", () => {
  assert.equal(formatList([{ text: "a" }, { text: "b" }]), "1. a\n2. b");
});

test("formatList handles empty", () => {
  assert.equal(formatList([]), "No todos yet.");
});
```

## Checkpoint

```bash
node --test todo.test.js
```

Expected output (3 passing):

```
▶ addTodo appends a todo
✔ addTodo appends a todo (Xms)
▶ formatList numbers rows
✔ formatList numbers rows (Xms)
▶ formatList handles empty
✔ formatList handles empty (Xms)

ℹ tests 3
ℹ pass 3
ℹ fail 0
```

All 3 tests pass — the `todo` module is correct.

---

You have completed the JavaScript Beginner ladder. Return to the
[Beginner overview](./index.md) for a summary of what you built.

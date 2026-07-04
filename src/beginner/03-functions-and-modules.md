---
title: 03 Functions and modules
---

# 03 Functions and modules

**Goal:** write reusable functions and split code across files using CommonJS
modules. Introduce the `todo` module that the rest of the ladder builds on.

## Functions

A function groups code you want to reuse.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));   // Hello, Alice!
```

## CommonJS modules

Node uses `require` / `module.exports` to share code between files.

**Exporting:**

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

**Importing:**

```js
// main.js
const { add } = require('./math');
console.log(add(2, 3));   // 5
```

## The todo module

Create `todo.js` with two pure functions — no file system yet, just logic:

```js
// todo.js
function addTodo(todos, text) {
  return [...todos, { text, done: false }];
}

function formatList(todos) {
  if (todos.length === 0) return "No todos yet.";
  return todos.map((t, i) => `${i + 1}. ${t.text}`).join("\n");
}

module.exports = { addTodo, formatList };
```

## Checkpoint

Create `scratch.js` in the same directory:

```js
// scratch.js
const { addTodo, formatList } = require('./todo');

const todos = addTodo([], 'buy milk');
console.log(formatList(todos));   // 1. buy milk
```

```bash
node scratch.js   # 1. buy milk
```

---

Next: [04 Read and write JSON](./04-read-write-json.md)

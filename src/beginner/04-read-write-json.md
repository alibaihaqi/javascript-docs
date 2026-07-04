---
title: 04 Read and write JSON
---

# 04 Read and write JSON

**Goal:** persist todos to a file using Node's built-in `node:fs` module and
extend `todo.js` with `readTodos` and `writeTodos`.

## JSON basics

`JSON.stringify` converts a JavaScript value to a JSON string;
`JSON.parse` converts it back.

```js
const todos = [{ text: "buy milk", done: false }];
const json = JSON.stringify(todos, null, 2);  // pretty-print
console.log(json);
// [
//   {
//     "text": "buy milk",
//     "done": false
//   }
// ]

const parsed = JSON.parse(json);
console.log(parsed[0].text);   // buy milk
```

## Reading and writing files

`node:fs` provides synchronous file operations. Using the `node:` prefix is
preferred for built-in modules:

```js
const fs = require("node:fs");

// write
fs.writeFileSync("data.json", JSON.stringify([]), "utf8");

// read
const raw = fs.readFileSync("data.json", "utf8");
console.log(JSON.parse(raw));   // []
```

## Extend the todo module

Add `readTodos` and `writeTodos` to `todo.js`:

```js
// todo.js
const fs = require("node:fs");

function readTodos(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch {
    return []; // missing or invalid file → start empty
  }
}

function writeTodos(path, todos) {
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
}

function addTodo(todos, text) {
  return [...todos, { text, done: false }];
}

function formatList(todos) {
  if (todos.length === 0) return "No todos yet.";
  return todos.map((t, i) => `${i + 1}. ${t.text}`).join("\n");
}

module.exports = { readTodos, writeTodos, addTodo, formatList };
```

## Checkpoint

Create `persist.js`:

```js
// persist.js
const { readTodos, writeTodos, addTodo } = require('./todo');

const FILE = 'todos.json';
writeTodos(FILE, addTodo(readTodos(FILE), 'buy milk'));
console.log(readTodos(FILE));
// [ { text: 'buy milk', done: false } ]
```

```bash
node persist.js
# [ { text: 'buy milk', done: false } ]
```

The todos round-trip through `todos.json` correctly.

---

Next: [05 The add command](./05-add-command.md)

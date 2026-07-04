---
title: 02 The done command
tier: intermediate
platform: javascript
---

# 02 — The done command

## Goal

Add a `done` property to each todo object and a `completeTodo` function that
returns a new array with the target item marked done. Update `formatList` so the
output shows `[x]` or `[ ]` markers.

## Why a `done` flag?

The beginner `addTodo` creates `{ text }` objects — simple, but there's nowhere
to store completion state. Adding `done: false` by default (on creation) keeps
the shape consistent for every function that follows.

## Update `addTodo` (one line)

```js
// todo.js — change addTodo so new items carry a done flag
function addTodo(todos, text) {
  return [...todos, { text, done: false }];
}
```

## Add `completeTodo`

```js
// todo.js — add below addTodo
function completeTodo(todos, index) {
  return todos.map((t, i) => (i === index ? { ...t, done: true } : t));
}
```

`completeTodo` never mutates the array — it returns a brand-new one with the
target item spread-merged (`{ ...t, done: true }`). All other items are
returned unchanged.

## Update `formatList`

```js
// todo.js — replace the existing formatList
function formatList(todos) {
  if (todos.length === 0) return "No todos yet.";
  return todos
    .map((t, i) => `${i + 1}. [${t.done ? "x" : " "}] ${t.text}`)
    .join("\n");
}
```

## Updated `module.exports`

```js
module.exports = { readTodos, writeTodos, addTodo, completeTodo, formatList };
```

## Checkpoint

Open a Node REPL (`node`) and paste:

```js
const { completeTodo } = require('./todo');
const result = completeTodo([{ text: 'a', done: false }], 0);
console.log(result[0].done); // true
```

Expected output: `true`

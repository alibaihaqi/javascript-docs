---
title: 04 Filtering
tier: intermediate
platform: javascript
---

# 04 — Filtering

## Goal

Add `pendingTodos` — a function that returns only the todos that are not yet
done. This powers the `list --pending` flag in the CLI.

## Add `pendingTodos`

```js
// todo.js — add below removeTodo
function pendingTodos(todos) {
  return todos.filter((t) => !t.done);
}
```

The callback keeps every item where `done` is falsy (`false` or `undefined` —
beginner-era items without a `done` field also pass through, so old data stays
compatible).

## Updated `module.exports`

```js
module.exports = {
  readTodos, writeTodos, addTodo, completeTodo, removeTodo, pendingTodos, formatList,
};
```

## Checkpoint

```js
const { pendingTodos } = require('./todo');
const result = pendingTodos([
  { text: 'a', done: true },
  { text: 'b', done: false },
]);
console.log(result.length);    // 1
console.log(result[0].text);   // b
```

Expected output:
```
1
b
```

## Why keep `formatList` unchanged?

`pendingTodos` returns the same shape as `readTodos` — an array of todo objects.
That means you can pass it straight to `formatList` without any adapter:

```js
// inside cli.js later
console.log(formatList(pendingTodos(readTodos(FILE))));
```

Keeping functions focused on one thing (filter vs. format vs. persist) is what
makes them composable.

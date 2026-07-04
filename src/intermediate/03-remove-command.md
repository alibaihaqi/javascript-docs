---
title: 03 The remove command
tier: intermediate
platform: javascript
---

# 03 — The remove command

## Goal

Add `removeTodo` — a function that drops one todo by index and returns the rest
as a new array.

## Add `removeTodo`

```js
// todo.js — add below completeTodo
function removeTodo(todos, index) {
  return todos.filter((_, i) => i !== index);
}
```

`Array.filter` visits every element. `_` is the element itself (unused); `i` is
its index. The callback keeps every item whose index is **not** the target —
equivalent to slicing the array around that position, but shorter.

## Updated `module.exports`

```js
module.exports = {
  readTodos, writeTodos, addTodo, completeTodo, removeTodo, formatList,
};
```

## Checkpoint

```js
const { removeTodo } = require('./todo');
const result = removeTodo([{ text: 'a' }, { text: 'b' }], 0);
console.log(JSON.stringify(result)); // [{"text":"b"}]
```

Expected output: `[{"text":"b"}]`

## Why not splice?

`Array.splice` mutates the original array, which makes functions harder to
compose and test. `filter` returns a new array, keeping the same pattern as
`completeTodo` — both functions are pure: same input always produces same output,
no side effects.

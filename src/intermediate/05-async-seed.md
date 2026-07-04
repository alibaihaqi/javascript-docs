---
title: 05 Async seed with fetch
tier: intermediate
platform: javascript
---

# 05 — Async seed with fetch

## Goal

Add `seedTodos` — an `async` function that fetches three sample todos from a
public API using Node's built-in global `fetch` (available since Node 18, so
Node 26 already has it). No package installs needed.

## The public API

[JSONPlaceholder](https://jsonplaceholder.typicode.com) is a free, keyless,
read-only REST API for testing. The endpoint:

```
https://jsonplaceholder.typicode.com/todos?_limit=3
```

returns an array like:

```json
[
  { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
  { "userId": 1, "id": 2, "title": "quis ut nam facilis ...", "completed": false },
  { "userId": 1, "id": 3, "title": "fugiat veniam minus", "completed": false }
]
```

## Add `seedTodos`

```js
// todo.js — add below pendingTodos (Node 18+/26 has a global fetch)
async function seedTodos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=3",
  );
  const data = await res.json();
  return data.map((d) => ({ text: d.title, done: d.completed }));
}
```

Two `await` calls:
1. `await fetch(url)` — waits for the HTTP response headers.
2. `await res.json()` — waits for the body to be fully read and parsed as JSON.

The `.map` reshapes each item to the todo shape `{ text, done }` the rest of the
module expects.

## Updated `module.exports`

```js
module.exports = {
  readTodos, writeTodos, addTodo, completeTodo, removeTodo, pendingTodos,
  seedTodos, formatList,
};
```

## Checkpoint

```bash
node -e "require('./todo').seedTodos().then(t => console.log(t.length))"
```

Expected output: `3`

(Requires a live internet connection. JSONPlaceholder is always available.)

## How `async/await` works here

`seedTodos` is marked `async`, so it always returns a `Promise`. Callers use
`.then()` or `await` to get the resolved value:

```js
// .then() style (used in cli.js)
seedTodos().then((seeded) => {
  writeTodos(FILE, seeded);
  console.log(`Seeded ${seeded.length} todos`);
});

// await style (inside another async function)
const seeded = await seedTodos();
```

Both do the same thing; the CLI uses `.then()` so it doesn't need a top-level
`async` wrapper.

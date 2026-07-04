---
title: 02 Values and types
---

# 02 Values and types

**Goal:** learn the minimum JavaScript vocabulary you'll use throughout this
ladder — variables, strings, numbers, booleans, arrays, and objects.

## Variables

Use `const` for values that won't be reassigned and `let` for values that will.

```js
const name = "Alice";      // string — fixed
let score = 0;             // number — will change
```

## Strings and template literals

```js
const item = "buy milk";
const msg = `Todo: ${item}`;   // template literal
console.log(msg);              // Todo: buy milk
```

## Numbers and booleans

```js
const count = 3;
const active = true;
console.log(count + 1);   // 4
console.log(!active);     // false
```

## Arrays

An ordered list of values. You'll use arrays to hold your todos.

```js
const todos = [];
todos.push("buy milk");
todos.push("walk dog");
console.log(todos.length);   // 2
console.log(todos[0]);       // buy milk
```

## Objects

A key-value record. Each todo will be an object with `text` and `done` fields.

```js
const todo = { text: "buy milk", done: false };
console.log(todo.text);   // buy milk
```

## Checkpoint

Create `types.js` and run it:

```js
// types.js
const todos = [
  { text: "buy milk", done: false },
  { text: "walk dog", done: false },
];
const first = todos[0];
console.log(`${todos.length} todos — first: ${first.text}`);
```

```bash
node types.js   # 2 todos — first: buy milk
```

---

Next: [03 Functions and modules](./03-functions-and-modules.md)

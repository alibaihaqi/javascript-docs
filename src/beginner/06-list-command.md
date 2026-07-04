---
title: 06 The list command
---

# 06 The list command

**Goal:** add the `list` command and a fallback for unknown commands, completing
`cli.js`.

## Extend cli.js

Add `else if` branches below the `add` block:

```js
// cli.js (complete)
const { readTodos, writeTodos, addTodo, formatList } = require("./todo");

const FILE = process.env.TODO_FILE || "todos.json";
const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "add") {
  const text = rest.join(" ");
  if (!text) {
    console.error('usage: node cli.js add "text"');
    process.exit(1);
  }
  writeTodos(FILE, addTodo(readTodos(FILE), text));
  console.log(`Added: ${text}`);
} else if (cmd === "list") {
  console.log(formatList(readTodos(FILE)));
} else {
  console.error("commands: add, list");
  process.exit(1);
}
```

## Checkpoint

Add two todos and list them:

```bash
node cli.js add "buy milk"
# Added: buy milk

node cli.js add "walk dog"
# Added: walk dog

node cli.js list
# 1. buy milk
# 2. walk dog
```

Test the empty-list message by using a fresh file:

```bash
TODO_FILE=empty.json node cli.js list
# No todos yet.
```

Test the fallback:

```bash
node cli.js oops
# commands: add, list
```

---

Next: [07 Tests](./07-tests.md)

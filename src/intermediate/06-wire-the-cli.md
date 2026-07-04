---
title: 06 Wire the CLI
tier: intermediate
platform: javascript
---

# 06 — Wire the CLI

## Goal

Replace the beginner `cli.js` with a full command switch that wires every
function from `todo.js` to a named command. The file path can be overridden
with the `TODO_FILE` environment variable for easy testing.

## The full `cli.js`

```js
// cli.js
const {
  readTodos, writeTodos, addTodo, completeTodo, removeTodo, pendingTodos,
  seedTodos, formatList,
} = require("./todo");

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
} else if (cmd === "done") {
  const n = Number(rest[0]) - 1;
  writeTodos(FILE, completeTodo(readTodos(FILE), n));
  console.log(`Done: ${n + 1}`);
} else if (cmd === "remove") {
  const n = Number(rest[0]) - 1;
  writeTodos(FILE, removeTodo(readTodos(FILE), n));
  console.log(`Removed: ${n + 1}`);
} else if (cmd === "list") {
  const todos = readTodos(FILE);
  console.log(
    formatList(rest[0] === "--pending" ? pendingTodos(todos) : todos),
  );
} else if (cmd === "seed") {
  seedTodos().then((seeded) => {
    writeTodos(FILE, seeded);
    console.log(`Seeded ${seeded.length} todos`);
  });
} else {
  console.error("commands: add, done, remove, list [--pending], seed");
  process.exit(1);
}
```

## Key patterns

**`process.argv.slice(2)`** — `argv[0]` is `node`, `argv[1]` is the script
path, so arguments start at index 2. Destructuring `[cmd, ...rest]` gives the
command name and any trailing words.

**1-based → 0-based index** — users type `node cli.js done 1` (human-friendly
1-based), so `Number(rest[0]) - 1` converts to the 0-based array index.

**`TODO_FILE` env var** — lets you point to a different file without touching
the code:

```bash
TODO_FILE=test.json node cli.js add "isolated test item"
```

## Checkpoint walkthrough

```bash
node cli.js seed
# Seeded 3 todos

node cli.js list
# 1. [ ] delectus aut autem
# 2. [ ] quis ut nam facilis et possimus et asperiores
# 3. [ ] fugiat veniam minus

node cli.js done 1
# Done: 1

node cli.js list --pending
# 2. [ ] quis ut nam facilis et possimus et asperiores
# 3. [ ] fugiat veniam minus

node cli.js remove 2
# Removed: 2

node cli.js list
# 1. [x] delectus aut autem
# 2. [ ] fugiat veniam minus
```

::: tip
`list --pending` re-numbers from 1 in the display but the underlying array
indices stay fixed — `remove 2` after filtering may target a different item
than you expect. A future improvement would be to filter then persist the
filtered array before renumbering.
:::

---
title: 05 The add command
---

# 05 The add command

**Goal:** wire up the `add` command in `cli.js` so `node cli.js add "buy milk"`
persists the todo and confirms it.

## Reading command-line arguments

`process.argv` is an array of strings. The first two entries are the node binary
and the script path; everything after that is user input.

```js
// args.js
const [cmd, ...rest] = process.argv.slice(2);
console.log(cmd);    // first argument
console.log(rest);   // remaining arguments as an array
```

```bash
node args.js add "buy milk"
# add
# [ 'buy milk' ]
```

## The add command

Create `cli.js`:

```js
// cli.js
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
}
```

## Checkpoint

```bash
node cli.js add "buy milk"
# Added: buy milk
```

Check `todos.json` — it should contain:

```json
[
  {
    "text": "buy milk",
    "done": false
  }
]
```

Run again to add a second todo:

```bash
node cli.js add "walk dog"
# Added: walk dog
```

---

Next: [06 The list command](./06-list-command.md)

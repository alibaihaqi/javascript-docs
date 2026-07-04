---
title: 01 Install Node
---

# 01 Install Node

**Goal:** confirm Node is installed and run your first file.

## Check your Node version

```bash
node --version   # expect v26.x or similar
```

If the command is not found, download Node from [nodejs.org](https://nodejs.org)
or install it with [fnm](https://github.com/Schniz/fnm):

```bash
# install fnm (macOS / Linux)
curl -fsSL https://fnm.vercel.app/install | bash

# then install and use Node 26
fnm install 26
fnm use 26
```

## Run your first file

Create `hello.js`:

```js
// hello.js
console.log("hello from node");
```

Run it:

```bash
node hello.js    # prints: hello from node
```

**Checkpoint:** you see `hello from node` printed to the terminal.

---

Next: [02 Values and types](./02-values-and-types.md)

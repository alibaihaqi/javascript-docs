---
title: 01 Why grow it
tier: intermediate
platform: javascript
---

# 01 — Why grow it

The beginner CLI can only do two things: add a todo and list all todos. That's
enough to learn the basics, but it's not enough for real use.

## What's missing

| Feature | Problem |
|---------|---------|
| Completing a todo | Once you add it, there's no way to mark it done |
| Removing a todo | A completed or stale todo can only be deleted by editing the JSON file by hand |
| Filtering | `list` always dumps everything — no way to see just what's left |
| Seeding | Starting from scratch every time; no way to pull in real data |

## Where you're going

After this tier you'll be able to run:

```bash
node cli.js seed            # fetch 3 todos from the web
node cli.js list            # 1. [ ] delectus aut autem  2. [ ] quis ut …  3. [ ] …
node cli.js done 1          # mark first done
node cli.js list --pending  # only the two remaining
node cli.js remove 2        # drop one
node cli.js list            # 1. [x] delectus aut autem  2. [ ] …
```

Still plain Node, still zero dependencies. Each page adds one piece.

# Create Application

`bun` has a lot of commands, you can check it through this:
```bash
$ bun --help
```

There are 2 ways to initiate project with `bun`,
- If you prefer to start with blank template, then you could use `bun init`
- If you prefer to use existing template, you could use `bun create`

## Build with `bun init`

- You might need to create folder for your project first
- Then you could run `bun init`
    - You will be asked for the `package name` and `entrypoint`
- After finished, you will get the structure like this

```
.
├─ README.md
├─ package.json
├─ tsconfig.json
├─ bun.lockb
├─ .gitignore
└─ node_modules
```

- You could run `bun run index.ts` to make sure it runs properly
```bash
$ bun run index.ts
```

You will get response `console.log` `Hello via Bun!` by default.

## Build with `bun create`

You could use `bun create` when you want use existing template or you want refer to template from repository.

Based on documentation, you could run this command:
```bash
$ bun create <template_option> <destination>
```

Some available template options:
- elysia
- react-app
- preact
- vite (recommended)

You could see other options through the link above.

For example, I want to create `next` application to `bun-next` as destination, then you could run the command:
```bash
$ bun create next bun-next
```

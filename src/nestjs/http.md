# HTTP Module

You might ever use Axios on JavaScript project development. Based on documentation, Nest wraps Axios, and implement it via `HttpModule` and `HttpService`. The difference I found is the result from HTTP responses is not directly `JSON`data like we use Axios commonly but generate response as `Observable`.

## Installation

You can install the application based on your package manager:

::: code-group
```bash [npm]
$ npm install @nestjs/axios axios
```

```bash [yarn]
$ bun add @nestjs/axios axios
```

```bash [pnpm]
$ pnpm add @nestjs/axios axios
```

```bash [bun]
$ bun add @nestjs/axios axios
```
:::

## Getting Started

You need to add `HttpModule` on your related module.

```ts
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule, // Add http module on imports like the rest of modules
  ],
})

//
```
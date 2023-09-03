# Basic Implementation

Based on NestJS documentation, NestJS aims to be platform-agnostic framework. For current implementation, NestJS supports implementation with [ExpressJS](https://expressjs.com/) as the default config and [Fastify](https://fastify.dev/).

## Install Fastify (Optional)

To use Fastify, you can read this [documentation](https://docs.nestjs.com/techniques/performance) or you can add another package:

::: code-group
```bash [NPM]
npm i --save @nestjs/platform-fastify
```
```bash [YARN]
yarn add @nestjs/platform-fastify
```
:::

## Implementation on main.ts
::: code-group

```ts [Express]
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```ts [Fastify]
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
```
:::

## How to Generate Module, Controller, and Service

::: code-group
```bash [Module]
nest g module <module-name>
```

```bash [Controller]
nest g controller <controller-name>
```

```bash [Service]
nest g service <service-name>
```
:::

# General Info

Nest (NestJS) is a framework for building efficient, scalable [Node.js](https://nodejs.org/en) server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood, Nest makes use of robust HTTP Server frameworks like [Express](https://expressjs.com/) (the default) and optionally can be configured to use [Fastify](https://fastify.dev/) as well! - [Source](https://docs.nestjs.com/)


## Prerequisite

- Minimum [NodeJS](https://nodejs.org/en/download/package-manager) with version >= 16

## Installation

Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:

```bash
npm i -g @nestjs/cli
nest new nest-be # example project-name
```

::: tip HINT
To create a new project with TypeScript's stricter feature set, pass the `--strict` flag to the nest new command.
:::

After the installation, you'll see the result like this.

![nestjs-project](/assets/nestjs/project.png)

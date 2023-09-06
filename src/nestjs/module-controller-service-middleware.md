# Module, Controller, Middleware, and Service

The folder structure

```
.
├─ app.module.ts
└─ common
   ├─ common.module.ts
   ├─ common.controller.spec.ts
   ├─ common.controller.ts
   ├─ common.service.spec.ts
   └─ common.service.ts

```

## Module

A module is a class annotated with a `@Module()` decorator. The `@Module()` decorator provides metadata that *Nest* makes use of to organize the application structure. - [Source](https://docs.nestjs.com/modules)

You can create module through this [documentation](/nestjs/basic-implementation#how-to-generate-module-controller-and-service). After the module is finished, you can import that to the root module (or app.module.ts)

::: code-group
```ts [common.module.ts]
import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
```

```ts [app.module.ts]
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule],
})
export class AppModule {}
```
:::

![NestJS Module](/assets/nestjs/module.png)

## Controller

Controllers are responsible for handling incoming *requests* and *returning* responses to the client. - [Source](https://docs.nestjs.com/modules)

### Routing

`@Controller` decorator are required on the controller file. The `'common'` is optional route path prefix if you want to customise.

```ts [common.controller.ts]
import { Controller, Get } from '@nestjs/common';
import { CommonService, ICommonResponse } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  getCommonResponse(): ICommonResponse {
    return this.commonService.getCommonResponse();
  }
}
```

## Service / Providers

The service or provider handles the complex task after the task is delegated by the controller.

```ts [common.service.ts]
import { Injectable } from '@nestjs/common';

export interface ICommonResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class CommonService {
  getCommonResponse(): ICommonResponse {
    return {
      success: true,
      message: 'Nest JS is running!',
    };
  }
}
```

## Middleware

Middleware is a function that called **before** the route handler. The middleware can be used to intercept flow that need another handler before it get execute by the route handler like protected routes that you might need to extract the data from JSON Web Token (JWT).

Nest middleware are, by default, equivalent to express middleware. - [Source](https://docs.nestjs.com/middleware)

Example, Nest JS API for Authentication
::: details
![Middleware](/assets/nestjs/middleware.png)
:::

::: code-group
```ts [Express]
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ulid } from 'ulidx';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = ulid();
    if (!req.headers?.traceId) {
      req.headers.traceId = traceId;
      res.setHeader('traceId', traceId);
    }
    next();
  }
}
```

```ts [Fastify]
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ulid } from 'ulidx';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const traceId = ulid();
    if (!req.headers?.traceId) {
      req.headers.traceId = traceId;
      res.setHeader('traceId', traceId);
    }
    next();
  }
}
```
:::

For fastify, you can enable the log by passing `logger` to `true` in `FastifyAdapter`.

```ts [main.ts]
new FastifyAdapter({ logger: true })
```
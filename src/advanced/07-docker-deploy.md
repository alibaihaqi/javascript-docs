---
title: 07 Docker deploy
tier: advanced
platform: javascript
position: 7
---

# 07 — Docker deploy

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 07 Docker deploy

**Goal:** containerise the API and run it alongside PostgreSQL using Docker Compose.

## Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## .dockerignore

```gitignore
node_modules
.git
src
```

## docker-compose.yml

Create `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: todos
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      PGHOST: db
      PGPORT: "5432"
      PGUSER: postgres
      PGPASSWORD: postgres
      PGDATABASE: todos
      JWT_SECRET: change-me-in-production
      PORT: "3000"
    depends_on:
      - db

volumes:
  pgdata:
```

## Run with Docker Compose

```bash
docker compose up --build
```

In another terminal:

```bash
curl -s -X POST http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"docker@test.com","password":"docker123"}'
# {"user":{"id":1,"email":"docker@test.com"}, "token":"eyJ..."}
```

## Tear down

```bash
docker compose down
# Add -v to also remove the volume:
docker compose down -v
```

## Checkpoint

```bash
docker compose up --build -d && sleep 3
curl -s http://localhost:3000/api/todos
# {"error":"missing authorization header"}

curl -s -X POST http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"ci@test.com","password":"cipass"}' | node -e "
  process.stdin.on('data', d => {
    const r = JSON.parse(d);
    console.log(r.token ? 'Token received' : 'Signup failed: ' + r.error);
  });
"
# Token received

docker compose down -v
```

The API and database now run as containers. Anyone with Docker can start the
full stack with one command.

---

Next: [08 Integration tests](./08-integration-tests)

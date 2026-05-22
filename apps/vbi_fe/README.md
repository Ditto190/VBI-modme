# VBI Frontend

## Quick Start

`apps/vbi_fe` is the Next.js frontend for the VBI console. Runtime commands are
owned by the repository Docker workflow.

From the repository root:

```bash
pnpm run vbi:dev:build
```

The frontend is served at `http://localhost:3000` by default.

## Validation

Run validation inside the frontend container:

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe build
```

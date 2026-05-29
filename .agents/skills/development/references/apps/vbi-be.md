# VBI Backend Development

Use for `apps/vbi_be`, `docker/vbi_be/*`, and backend service configuration in
`docker/docker-compose.dev.yml`.

## Docker-Only Rule

- Run, debug, test, typecheck, lint, build, migrate, generate Prisma client, and
  seed `vbi_be` through Docker.
- Do not start NestJS, Postgres, Prisma, validation, or builds on the host.
- Host `pnpm --filter @visactor/headless-bi-be ...` commands are off-limits
  unless the user explicitly overrides this rule.
- Edit files locally, but verify runtime behavior in containers.
- If a root script is missing, call `docker compose` directly.

## Docker Entrypoints

```bash
pnpm run vbi:dev:build
pnpm run vbi:dev
docker compose -f ./docker/docker-compose.dev.yml logs -f vbi_be db
pnpm run vbi:dev:down
pnpm run vbi:dev:rebuild
```

Build or rebuild after Dockerfile, dependency, lockfile, package, Prisma, or
compose changes. Use `vbi:dev` for mounted source-only changes.

## Services

`vbi_be`: HTTP `3030`, collaboration `1234`, inspector `9229`. `db`: host
`5454`, container `db:5432`. Overrides: `VBI_BE_PORT`, `VBI_COLLAB_PORT`,
`VBI_DEBUG_PORT`, `VBI_DB_PORT`.

## Validation

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be build
docker compose -f ./docker/docker-compose.dev.yml run --rm vbi_be pnpm --filter @visactor/headless-bi-be <script>
```

## Ownership

- `apps/vbi_be` owns NestJS APIs, Hocuspocus collaboration, persistence, Prisma,
  and resource service boundaries.
- Prisma work stays inside the backend container; after schema, seed, Dockerfile,
  dependency, or compose changes, rebuild/recreate and inspect logs.
- API changes must keep `apps/vbi_fe/src/services` synchronized.
- Collaboration changes should verify both HTTP and collaboration flows in
  Docker.
- `docker/docker-compose.dev.yml` owns full-stack dev; `docker/vbi_be/Dockerfile.dev`
  owns the backend dev image. Avoid host-specific Docker assumptions.

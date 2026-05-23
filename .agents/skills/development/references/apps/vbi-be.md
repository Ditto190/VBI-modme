# VBI Backend Development

Use this reference when working on `apps/vbi_be` or backend-owned Docker runtime
files such as `docker/vbi_be/*` and backend service configuration in
`docker/docker-compose.dev.yml`.

## Non-Negotiable Docker Rule

- Develop, run, debug, test, typecheck, lint, build, migrate, generate Prisma
  client, and seed `vbi_be` through Docker.
- Do not start NestJS, Postgres, Prisma, backend tests, backend typecheck,
  backend lint, or backend build directly on the host machine.
- Treat host `pnpm --filter @visactor/headless-bi-be ...` commands as off-limits
  unless the user explicitly overrides the Docker-only rule.
- Local file editing is fine; runtime behavior must be verified in containers.
- If a command is missing from root scripts, call `docker compose` directly
  instead of falling back to host-local execution.

## Root Docker Entrypoints

Run VBI Docker scripts from the repository root. Prefer root `pnpm run vbi:*`
entrypoints for common Docker lifecycle operations:

```bash
pnpm run vbi:dev:build
pnpm run vbi:dev
docker compose -f ./docker/docker-compose.dev.yml logs -f vbi_be db
pnpm run vbi:dev:down
```

Use `pnpm run vbi:dev:build` after Dockerfile, dependency, lockfile, package,
Prisma, or compose changes. Use `pnpm run vbi:dev` when images are already
current and only mounted source files changed.

For clean container state:

```bash
pnpm run vbi:dev:rebuild
```

## Services and Ports

- `vbi_be`: NestJS backend, exposed on `localhost:3030` by default.
- `vbi_be`: collaboration server, exposed on `localhost:1234` by default.
- `vbi_be`: Node inspector, exposed on `localhost:9229` by default.
- `db`: Postgres, exposed on `localhost:5454` by default.
- Containers talk to Postgres through `db:5432`; host tools talk through
  `localhost:5454` only when absolutely necessary for inspection.
- Host ports can be overridden with `VBI_BE_PORT`, `VBI_COLLAB_PORT`,
  `VBI_DEBUG_PORT`, and `VBI_DB_PORT`.

## Validation Commands

Run backend validation inside the compose environment:

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_be pnpm --filter @visactor/headless-bi-be build
```

If services are not running yet, start them first with `pnpm run vbi:dev` or
`pnpm run vbi:dev:build`. Do not run the equivalent backend commands directly
on the host as a shortcut.

For one-off commands that must not depend on a running container:

```bash
docker compose -f ./docker/docker-compose.dev.yml run --rm vbi_be pnpm --filter @visactor/headless-bi-be test
```

## Backend Ownership

- `apps/vbi_be` owns NestJS HTTP APIs, Hocuspocus collaboration servers,
  persistence orchestration, Prisma access, and resource service boundaries.
- Keep database work inside the backend container. The dev backend entrypoint
  runs `prisma migrate deploy`, `prisma generate`, and `prisma db seed` before
  starting the app.
- If Prisma schema or seed behavior changes, rebuild or recreate the backend
  container and inspect backend logs before changing application code again.
- API changes should keep frontend service clients in `apps/vbi_fe/src/services`
  synchronized in the same change.
- Collaboration document behavior spans backend handlers and frontend resource
  sessions; verify both HTTP and collaboration flows in Docker when touched.

## Docker Runtime Ownership

- `docker/docker-compose.dev.yml` is the source of truth for local full-stack VBI
  development.
- `docker/vbi_be/Dockerfile.dev` defines the backend dev runtime image. Keep
  image changes aligned with `.dockerignore`, `package.json`, and
  `pnpm-lock.yaml`.
- Mounted backend volumes intentionally cover `apps/vbi_be/src`,
  `apps/vbi_be/test`, and shared `packages`. If a newly edited file is not
  reflected in the container, check compose volumes before assuming application
  code is stale.
- Do not add host-specific assumptions to backend Dockerfiles, entrypoints, or
  compose environment. Containers should remain the reproducible backend runtime.

## Reporting Back

When finishing backend work, report:

- The Docker command used to start or rebuild the stack.
- The backend in-container validation commands that passed.
- Any validation skipped because Docker services, images, or environment values
  were unavailable.

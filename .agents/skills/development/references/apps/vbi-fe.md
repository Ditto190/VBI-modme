# VBI Frontend Development

Use this reference when working on `apps/vbi_fe` or frontend-owned Docker runtime
files such as `docker/vbi_fe/*` and frontend service configuration in
`docker/docker-compose.dev.yml`.

## Non-Negotiable Docker Rule

- Develop, run, debug, test, typecheck, lint, and build `vbi_fe` through Docker.
- Do not start Next.js, frontend tests, frontend typecheck, frontend lint, or
  frontend build directly on the host machine.
- Treat host `pnpm --filter @visactor/headless-bi-fe ...` commands as off-limits
  unless the user explicitly overrides the Docker-only rule.
- Local file editing is fine; runtime behavior must be verified in containers.
- If a command is missing from root scripts, call `docker compose` directly
  instead of falling back to host-local execution.

## Non-Negotiable Turbo Rule

- Keep the frontend Docker dev runtime on Turbo: dependency prebuilds must go
  through `pnpm exec turbo build --filter=@visactor/headless-bi-fe^...`, and the
  Next.js dev server must use Turbopack.
- Do not add `--webpack`, environment switches, package scripts, Docker commands,
  or documentation that move `apps/vbi_fe` development back to webpack.
- Keep `apps/vbi_fe/next.config.ts` as the source of truth for Turbopack
  aliases. If an alias is needed for dev, add it to `turbopack.resolveAlias`.
- Do not delete the existing `webpack` callback in `next.config.ts` just to
  enforce Turbo; it remains compatibility configuration for Next.js paths that
  still read webpack config.

## Root Docker Entrypoints

Run VBI Docker scripts from the repository root. Prefer root `pnpm run vbi:*`
entrypoints for common Docker lifecycle operations:

```bash
pnpm run vbi:dev:build
pnpm run vbi:dev
docker compose -f ./docker/docker-compose.dev.yml logs -f vbi_fe
pnpm run vbi:dev:down
```

Use `pnpm run vbi:dev:build` after Dockerfile, dependency, lockfile, package,
Next.js config, or compose changes. Use `pnpm run vbi:dev` when images are
already current and only mounted source files changed.

For clean container state:

```bash
pnpm run vbi:dev:rebuild
```

## Services and Ports

- `vbi_fe`: Next.js frontend, exposed on `localhost:3000` by default.
- Inside Docker, frontend-to-backend traffic uses
  `VBI_API_ORIGIN=http://vbi_be:3030`.
- Inside Docker, collaboration traffic uses
  `VBI_COLLABORATION_ORIGIN=http://vbi_be:1234`.
- Host frontend port can be overridden with `VBI_FE_PORT`.
- For browser verification, open the Docker-served frontend at
  `http://localhost:3000` after the containers are up.

## Validation Commands

Run frontend validation inside the compose environment:

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe build
```

If services are not running yet, start them first with `pnpm run vbi:dev` or
`pnpm run vbi:dev:build`. Do not run the equivalent frontend commands directly
on the host as a shortcut.

For one-off commands that must not depend on a running container:

```bash
docker compose -f ./docker/docker-compose.dev.yml run --rm vbi_fe pnpm --filter @visactor/headless-bi-fe test
```

## Frontend Ownership

- `apps/vbi_fe` owns the Next.js UI, resource stores, service clients,
  collaboration provider wiring, app preferences, and report/chart/insight
  management views.
- The active UI implementation uses Next.js `src/app/*` route files and
  `src/views/*` view modules. Do not revive deleted legacy `src/pages/*`
  modules; update route/view imports to the `src/views` tree.
- The Docker frontend command is owned by `docker/vbi_fe/Dockerfile.dev`; it
  builds frontend workspace dependencies and starts Next.js bound to `0.0.0.0`.
  Do not replace it with host-local `next dev`.
- API changes should stay synchronized with backend contracts and service
  clients in `apps/vbi_fe/src/services`.
- Provider detail responses can be partially populated while resources are being
  created or collaboration sessions are reconnecting. Service mappers should
  treat nested DSL payloads such as `detail.dsl` as optional and normalize
  missing content to empty values instead of throwing and surfacing toast loops.
- Collaboration document behavior spans frontend resource sessions and backend
  handlers; verify both HTTP and collaboration flows in Docker when touched.
- When UI code relies on packages, provider code, or practice code mounted into
  the frontend container, validate in the running Docker frontend so workspace
  dependency behavior matches the app runtime.

## Report Detail UI Notes

- Report detail state lives in `src/stores/report-detail.store.ts`; resource
  builders are retained and released through the chart, insight, and report
  builder models. UI components should mutate report pages through the Builder
  APIs exposed by the store, not by rebuilding DSL objects in React components.
- Report detail rendering is CSS-sensitive. Vertical report pages should size to
  their rendered content; do not force `.report-detail-vertical-page` to
  `min-height: 100%`, because dividers then lay out against the viewport instead
  of the page content and can overlap long pages while creating large gaps after
  short pages.
- Chart editing embeds the `standard` practice app through
  `src/components/StandardChartApp.tsx`. Keep every wrapper in the drawer chain
  constrained with `height: 100%`, `min-height: 0`, and `overflow: hidden`; the
  inner Standard app uses `demo-app-*` classes and expects the parent to provide
  a bounded height.
- Global drawer CSS in `src/app/globals.css` is imported after report-detail
  CSS. Drawer-specific overrides must have enough specificity, for example
  `.ui-drawer-body.report-detail-chart-drawer-body`, otherwise the global
  `.ui-drawer-body` padding and `overflow: auto` rules can reintroduce unwanted
  scrollbars in full-height editors.
- When checking report detail regressions, start from
  `http://localhost:3000/manage/reports`, then enter the report detail through
  the list action. This catches lifecycle issues that direct detail URLs can
  miss, including repeated enter/leave session cleanup and fallback resource
  fetches.

## Docker Runtime Ownership

- `docker/docker-compose.dev.yml` is the source of truth for local full-stack VBI
  development.
- `docker/vbi_fe/Dockerfile.dev` defines the frontend dev runtime image. Keep
  image changes aligned with `.dockerignore`, `package.json`, and
  `pnpm-lock.yaml`.
- Mounted frontend volumes intentionally cover `apps/vbi_fe/src`,
  `apps/vbi_fe/public`, Next.js/PostCSS config, `apps/vbi_provider`, shared
  `packages`, and `practices`. If a newly edited file is not reflected in the
  container, check compose volumes before assuming application code is stale.
- The running `vbi_fe` dev container does not mount `apps/vbi_fe/tests`. Test
  file edits may not be visible to `docker compose ... exec vbi_fe`; use a fresh
  one-off container, rebuild, or update the compose volume intentionally before
  trusting test results for changed tests.
- Do not add host-specific assumptions to frontend Dockerfiles or compose
  environment. Containers should remain the reproducible frontend runtime.

## Reporting Back

When finishing frontend work, report:

- The Docker command used to start or rebuild the stack.
- The frontend in-container validation commands that passed.
- Any validation skipped because Docker services, images, or environment values
  were unavailable.

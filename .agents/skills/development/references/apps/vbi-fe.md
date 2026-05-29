# VBI Frontend Development

Use for `apps/vbi_fe`, `docker/vbi_fe/*`, and frontend service configuration in
`docker/docker-compose.dev.yml`. `apps/vbi_fe` owns Next.js UI, stores,
services, collaboration wiring, preferences, and chart/insight/report views.

## Non-Negotiable Runtime Rules

- Develop, run, debug, test, typecheck, lint, and build `vbi_fe` through Docker.
- Do not start Next.js, frontend validation, or frontend builds on the host.
- Host `pnpm --filter @visactor/headless-bi-fe ...` commands are off-limits
  unless the user explicitly overrides this rule.
- If a root script is missing, call `docker compose` directly.
- Keep the Docker dev runtime on Turbo/Turbopack. Do not add `--webpack`,
  switches, scripts, commands, or docs that move development back to webpack.
- `apps/vbi_fe/next.config.ts` owns Turbopack aliases. Keep the existing
  `webpack` callback for Next.js compatibility paths.

## Docker Entrypoints

```bash
pnpm run vbi:dev:build
pnpm run vbi:dev
docker compose -f ./docker/docker-compose.dev.yml logs -f vbi_fe
pnpm run vbi:dev:down
pnpm run vbi:dev:rebuild
```

Build or rebuild after Dockerfile, dependency, lockfile, package, Next.js config,
or compose changes. Use `vbi:dev` for mounted source-only changes.

## Services

- Browser verification uses the Docker-served frontend at `http://localhost:3000`.
- In Docker, backend traffic uses `VBI_API_ORIGIN=http://vbi_be:3030`.
- In Docker, collaboration uses `VBI_COLLABORATION_ORIGIN=http://vbi_be:1234`.
- Host frontend port override: `VBI_FE_PORT`.

## Validation

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe build
docker compose -f ./docker/docker-compose.dev.yml run --rm vbi_fe pnpm --filter @visactor/headless-bi-fe <script>
```

## Docker Runtime Ownership

- `docker/docker-compose.dev.yml` owns local full-stack VBI development.
- `docker/vbi_fe/Dockerfile.dev` owns the frontend image and `0.0.0.0` Next
  server.
- Mounted volumes cover frontend source/public/config, provider code, packages,
  and practices, but not every file.
- After dependency, lockfile, package, or test file changes, rebuild or use a
  one-off container before trusting in-container results.
- Avoid host-specific Dockerfile or compose assumptions.

## Frontend Contracts

- Active UI uses `src/app/*` routes and `src/views/*`; do not revive legacy
  `src/pages/*`.
- API changes must stay synchronized with backend contracts and `src/services`.
- Service mappers should tolerate partially populated Provider detail responses
  and normalize optional nested DSL payloads.
- Collaboration spans frontend sessions and backend handlers; verify HTTP and
  collaboration flows in Docker when touched.
- Validate mounted workspace dependency behavior in the running Docker frontend.

## UI Stack

- Use Tailwind utilities and shadcn/ui components.
- `components.json` owns the stack: `radix-nova`, Tailwind v4 variables, lucide,
  RSC App Router, and `src/components/ui`.
- Add reusable primitives through the shadcn CLI from `apps/vbi_fe`, then adapt
  generated files to local aliases and tokens.
- Do not introduce CSS modules, page stylesheets, handwritten class systems,
  inline styles, or raw Radix when shadcn/local wrappers fit.
- Use semantic tokens and shadcn variables; keep `src/app/globals.css`
  token/global-only.
- Keep Tailwind classes static, use `cn()`, use lucide through local exports,
  and keep controls accessible.
- Operational UI stays compact, scannable, stable, and restrained; avoid nested
  card layouts for app chrome or report bodies.

## Resource and Report Architecture

- Chart, insight, and report management pages are adapters over one
  resource-management workflow.
- Shared search, selection, create, delete, rename, drawer, list reload, empty,
  and loading behavior belongs in common modules.
- Keep Provider-first ownership: views consume Provider, sessions, and
  Builder-facing commands.
- React presentation components receive projections and commands; they do not
  rebuild DSL payloads or duplicate lifecycle logic.
- Report detail runtime owns session graph updates, child retain/release, active
  page resolution, page mutation, and editor state.
- Child resource diff/retain/release stays near `resource-session.store.ts`.
- Public exports from `src/i18n`, `src/theme`, `src/models`, and `src/types`
  should be intentional.

## Agent UI

- Use `@assistant-ui/react`, `@earendil-works/pi-agent-core`, and
  `@earendil-works/pi-ai`.
- Do not hand-roll chat protocol, composer lifecycle, scrolling, message status,
  or tool-call rendering when existing primitives fit.
- shadcn/Tailwind owns product chrome; assistant-ui owns chat surface.
- Runtime, storage, stream proxying, and Provider/Builder tool wiring stay
  outside React presentation components.
- Tool calls, reasoning, attachments, usage, abort/retry, and streaming states
  are typed adapter states, not console-only diagnostics.

## Report Detail and Embedded Standard App

- Report detail mutates pages through Builder APIs exposed by
  `src/stores/report-detail.store.ts`.
- Pages size to content; avoid viewport-height constraints that create overlap or
  large gaps.
- Regression path: enter from `/manage/reports` and repeatedly enter/leave.
- Maintain one active page source of truth.
- `src/components/StandardChartApp.tsx` owns embedded `standard` runtime
  integration.
- Chart view/edit are intents over the same embedded runtime.
- Drawer wrappers must preserve `height: 100%`, `min-height: 0`, and
  `overflow: hidden`.
- Heavy runtime modules stay behind dynamic imports unless needed first.

## Internationalization, Preferences, and Performance

- Locale resolution has first-render default plus stored user preference; avoid
  hydration language flicker.
- Store selected locale/theme in browser storage; resolve defaults from
  `Accept-Language` and `navigator.languages`.
- Runtime translation helpers read the current preference store at call time.
- Theme palettes should affect real UI tokens while preserving readability.
- Optimize from route and chunk behavior first; load heavy editors/runtime on
  demand.
- Frontend app dependencies should be used directly by the app, not duplicated
  from `standard`, `@visactor/vbi`, or provider packages.

Report the Docker start/rebuild command, passed in-container validation, and any
skipped validation.

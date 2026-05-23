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

## Architecture Habits

- Treat `chart`, `insight`, and `report` management pages as three adapters over
  one resource-management workflow. Search, selection, create, delete, rename,
  drawer open/close, list reload, and empty/loading states should be implemented
  through shared modules where possible. Keep resource-specific differences in
  small adapters instead of copying page/store/drawer flows.
- Prefer deep frontend modules with small interfaces over pass-through helpers.
  If a UI fix must be repeated in all three asset types, first look for a common
  `manage-resource` or drawer-flow module before editing each page separately.
- Keep Provider-first ownership intact. Frontend views consume Provider,
  resource session stores, and Builder-facing commands; they should not rebuild
  resource DSL payloads or duplicate provider lifecycle logic in React
  components.
- Keep report-detail runtime concerns separate from presentation concerns.
  Session graph updates, child chart/insight retain/release, active-page
  resolution, page mutation, and editor open state should live behind a report
  workspace/runtime interface. Sidebar, stage, and drawer components should
  receive projections and commands, not reconstruct Builder/session state.
- When a report references multiple child resources, model it as a resource
  session graph. Diffing child resource ids and ordering retain/release should be
  centralized near `resource-session.store.ts`, not repeated in view modules.
- Avoid barrel exports that expose internal helpers just because they exist.
  Public exports from `src/i18n`, `src/theme`, `src/models`, and `src/types`
  should be intentionally consumed by app modules.

## UI And Interaction Notes

- VBIFE UI should stay compact, quiet, and operational. Prefer small controls,
  restrained borders, subtle motion, and clear hierarchy over large marketing
  surfaces or decorative cards.
- Theme selection should expose a compact trigger in the sidebar, not all colors
  inline. The full palette belongs in a popover/dropdown, with clear light/dark
  grouping and immediate preview. Persist the selected theme in browser storage.
- Language selection should default from browser/server headers when the user has
  not chosen a language. Once the user chooses, persist it in browser storage and
  avoid weak-network flicker where Chinese renders first and then switches.
- Search controls in asset pages should be compact by default, expand smoothly
  on focus, and keep the table toolbar stable. If this interaction is tuned for
  one asset page, apply it through the shared manage-resource module.
- Destructive actions should use icons, confirmation, and subdued placement.
  Avoid prominent red text labels in dense tables unless the action is the
  primary focus of the flow.
- Table operation columns for all three asset types should remain visually
  consistent. If alignment, icon style, or spacing changes for one kind, update
  the shared resource-column implementation.
- Drawers for `chart`, `insight`, and `report` should use the same width,
  header, title-edit, close, and footer conventions. Do not leave one asset type
  with a special close button or mismatched drawer chrome unless the workflow
  genuinely differs.
- Titles in editor drawers should be edited from the drawer title itself:
  support double-click and a hover-only edit icon. Avoid adding a second full-row
  input for the same title.
- Loading states should be scoped to the component or panel that is loading.
  Avoid global overlays for Standard/chart rendering, report panels, or detail
  drawers unless the whole app is genuinely blocked.
- Prefer subtle animation for open/close, popovers, search focus, hover actions,
  and page transitions. Respect `prefers-reduced-motion` for global motion.

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
- Repeatedly entering and leaving a report detail page is a required regression
  path. It must not leave stale chart/insight/report sessions, duplicate active
  page highlights, or toast loops from partially populated detail payloads.
- The left page sidebar must have a single active page at any time. Selection
  state should derive from one active page id and one page projection; avoid
  mixing scroll-derived active state with click-derived state in separate
  components.
- The right report body should read like a report, not a nested card layout.
  Keep page separators when useful, but avoid redundant frames around the whole
  report. Charts in report pages should be centered and constrained instead of
  filling all available drawer width by default.
- Report pages should size to content. Do not add viewport-height constraints
  that force short pages to occupy the viewport or inject large gaps between page
  dividers.

## Embedded Standard App Notes

- `src/components/StandardChartApp.tsx` is the integration point for embedding
  the `standard` practice app. Prefer deepening this module over duplicating
  connector readiness, fallback, theme, locale, and sizing logic at each caller.
- Treat chart view and chart edit as two intents over the same embedded chart
  runtime. Callers should pass a builder and intent; the embedded runtime should
  own Standard app props, demo connector readiness, loading fallback, and height
  contract.
- Standard/chart drawers must keep every wrapper constrained with `height: 100%`,
  `min-height: 0`, and `overflow: hidden`. A stray parent `overflow: auto` or
  missing `min-height: 0` will reintroduce drawer scrollbars.
- Heavy dependencies such as `standard`, VChart/VTable, DuckDB WASM, markdown
  rendering, and collaboration providers should stay behind dynamic imports
  unless they are needed for the first interaction on the current route.

## Internationalization And Preferences

- Locale resolution has two phases: server/browser default for first render, then
  stored user preference when it exists. Keep these paths aligned so hydration
  does not visibly switch languages after initial paint.
- Store user-selected locale and theme in browser storage. If there is no stored
  locale, resolve from `Accept-Language` on the server and from
  `navigator.languages` on the client.
- Runtime translation helpers used by stores and services must read the current
  preference store at call time. Do not capture a stale translator in long-lived
  stores or async service helpers.
- Theme palettes should change meaningful UI tokens, not only decorative accents.
  Sidebar selection, buttons, focus rings, hover backgrounds, and key surfaces
  should visibly respond to theme changes while preserving readability.

## Performance And Dependency Hygiene

- Validate Next.js performance from route and chunk behavior before changing
  `next.config.ts`. The config is not the first place to optimize VBIFE.
- Keep asset list routes lightweight. Heavy editor/runtime modules should load
  when a drawer or report workspace is opened, not with the management table.
- Report detail is allowed to load collaboration/runtime code, but split the
  shell from the runtime when possible so title/header/chrome can render before
  Yjs/provider-heavy modules.
- `apps/vbi_fe/package.json` should list dependencies used directly by the
  frontend app. Do not duplicate dependencies that are only used by `standard`,
  `@visactor/vbi`, or provider packages.
- When cleaning dead code, run static tools after reading the code: `oxlint`,
  `typecheck`, and an unused-code pass such as `knip` can catch residual exports
  and dependencies, but Next route files and workspace mounts can produce false
  positives. Verify before deleting.
- The running `vbi_fe` container does not mount `apps/vbi_fe/package.json` or
  `pnpm-lock.yaml`. After dependency or lockfile changes, rebuild and recreate
  the frontend container before trusting dependency-analysis output from inside
  the container.

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

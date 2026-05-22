# Standard Practice

Reference material for `practices/standard`. It is the standard structural
template for VBI UI examples. Use it when a task needs maintainable directory
boundaries and the clearest reusable implementation patterns.

## Positioning

Standard is the structural baseline app:

- It currently has the largest source surface: about 100 source files and fairly
  complete tests.
- It has the full practice hook suite under `src/hooks/**`.
- It uses `@dnd-kit` for shelf drag/drop.
- It uses local JSON data through `localConnector.ts` and supports CSV upload and
  schema customization.
- It has complete `src/i18n/**` covering `zh-CN` and `en-US`.
- The store provides `switchSource` for replacing the current connector/data.

Compared with `minimalist`, it shows a scalable version of the same ideas.
Compared with `streamlined`, it favors explicit layering over the fast path.
Compared with `professional`, it is the template baseline; do not add
business-style overlays or high-density interaction polish unless the task asks
for them.

## Structure

- Entry: `src/index.tsx`, `src/App/App.tsx`.
- App shell: `src/App/**`.
- Reusable UI: `src/components/**`.
- Shelves: `src/components/Shelves/**`.
- Hooks: `src/hooks/**`, exported from `src/hooks/index.ts`.
- Store: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Connector/data: `src/utils/localConnector.ts`, `dataset.ts`, `parseCsv.ts`,
  `supermarketSchema.ts`.
- i18n: `src/i18n/**`.

## Differences

- App initialization waits for `initVBIConnector()`, then calls store
  `initialize(builder)`.
- The store caches built VSeed by builder and DSL snapshot, exposes
  `switchSource`, and preserves theme, locale, and limit when switching sources.
- `CSVModal` is the standard reference for user CSV import and schema editing.
- `VSeedRender` includes a pivot chart legend filtering helper and uses console
  logging to capture render failures.
- Date filter utilities use `dayjs`; date behavior must be covered by focused
  utility tests.
- Toolbar, shelves, filter panels, chart type selector, store provider, and i18n
  are the preferred structural references for new practice UI.

## Development Rules

- Do not import from other practices.
- Keep standard as the standard example; avoid professional-only complexity.
- Put Builder mutation in hooks or focused utilities.
- Keep shelf and filter panels thin; extract pure list, date, and operator logic
  into utilities and add tests.
- Visible copy must be updated in both `zh-CN.json` and `en-US.json`.

## Validation

```bash
pnpm --filter standard run test
pnpm --filter standard run lint
pnpm --filter standard run typecheck
pnpm --filter standard run build
```

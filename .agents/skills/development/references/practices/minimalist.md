# Minimalist Practice

Reference for `practices/minimalist`, the smallest standalone VBI practice app:
compact, readable, and learning-oriented rather than a source of standard
architecture patterns.

## Positioning

Keep Minimalist flat and local: native HTML drag/drop, a remote CSV demo
connector, compact store/rendering code, and lightweight locale/theme/limit
controls. Do not absorb standard/professional hook suites, drag/drop systems,
upload/source-switching flows, or business UI polish unless explicitly
requested.

## Structure

- Entry/app shell: `src/index.tsx`, `src/App/App.tsx`.
- Edit composition: `src/components/EditMode.tsx` and flat `src/components/**`.
- State: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Data/render/utils: `src/utils/demoConnector.ts`,
  `src/components/Render/VSeedRender.tsx`, and focused `src/utils/*`.

## Rules

- `createVBIStore` initializes immediately; there is no explicit initialize
  lifecycle.
- The demo connector owns CSV-backed dataset bootstrap.
- Builder APIs are the mutation boundary for chart type, fields, filters,
  locale, theme, and limit.
- Native drag/drop and field/filter helpers stay local.
- `VSeedRender` remains compact, not the reference for advanced rendering,
  overlays, or error handling.
- Do not import from other practices.
- Prefer local utilities over new abstraction layers.

## Validation

```bash
pnpm --filter minimalist run test
pnpm --filter minimalist run lint
pnpm --filter minimalist run typecheck
pnpm --filter minimalist run build
```

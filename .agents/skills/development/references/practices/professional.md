# Professional Practice

Reference for `practices/professional`, the high-fidelity business practice for
real hook signatures, tested drag/drop, overlays, slot behavior,
filter/having-filter models, and production-grade interaction behavior.

## Role and Boundaries

- Treat it as the richest behavior reference, not the baseline template.
- Compared with `standard`, it prioritizes business interaction polish.
- Compared with `streamlined`, it uses tested drag/drop and editor models.
- It depends on `@visactor/vbi-react`, but behavior belongs in local hooks,
  models, utils, and config.
- Do not import from other practices.

## Primary Surfaces

- Initialization: `createDefaultBuilder()`, `useInitializeProfessional`,
  `prepareProfessionalVBI()`.
- Editor/drag/drop: `components/Editor/**`, `components/Editor/dnd/**`,
  `types/dnd.ts`, and focused tests.
- Filters: `components/Filter/**` and filter/having-filter model hooks.
- Store/data/rendering: `model/VBIStore.ts`, `model/VBIStoreProvider.tsx`,
  `utils/localConnector.ts`, dataset/schema utilities, `components/Render/**`.

## Rules

- Keep Builder mutation in hooks, models, or focused utils; components compose
  UI and interactions.
- Preserve full hook signatures and edge-case behavior.
- Keep drag/drop payload, target, drop, and overlay decisions testable outside
  React where practical.
- Use `localConnector.ts` as the local data and schema normalization boundary.
- Update visible copy across supported locale files, or document intentional
  fallback behavior.
- Surface render failures through the existing user-facing message pattern.

## Validation

```bash
pnpm --filter professional run test
pnpm --filter professional run lint
pnpm --filter professional run typecheck
pnpm --filter professional run build
```

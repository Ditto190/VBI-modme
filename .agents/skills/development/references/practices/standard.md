# Standard Practice

Reference for `practices/standard`, the structural baseline for VBI UI examples:
reusable hooks, maintainable boundaries, CSV/source switching, i18n, and standard
implementation patterns.

## Positioning

Standard is more scalable than `minimalist`, more layered than `streamlined`,
and not a home for `professional` business overlays or high-density polish.

## Boundaries

- App shell: `src/App/**`; reusable UI: `src/components/**`.
- Builder behavior: `src/hooks/**`, exported from `src/hooks/index.ts`.
- Store: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Data/source: `src/utils/localConnector.ts`, dataset/schema utilities,
  `CSVModal`, and store `switchSource`.
- Shelves use `@dnd-kit`; keep drag/drop decisions in focused utilities/models.
- i18n lives in `src/i18n/**`; update every supported locale for visible copy.

## Rules

- Initialization waits for `initVBIConnector()`, then calls store `initialize`.
- Store caches built VSeed by builder and DSL snapshot.
- `switchSource` replaces connector/data while preserving theme, locale, and
  limit.
- Date filter behavior uses `dayjs` and needs focused utility tests.
- Do not import from other practices.
- Keep standard as the baseline; avoid professional-only complexity.
- Put Builder mutation in hooks or focused utilities, and keep shelf/filter
  panels thin.

## Validation

```bash
pnpm --filter standard run test
pnpm --filter standard run lint
pnpm --filter standard run typecheck
pnpm --filter standard run build
```

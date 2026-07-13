# Streamlined Practice

Use `practices/streamlined` for the fast path through the main VBI pipeline:
demo connector bootstrap, CSV URL data flow, explicit initialization, and a
lightweight three-column workbench.

## Positioning

Streamlined is more workflow-shaped than `minimalist`, lighter than `standard`,
and simpler than `professional`. It has no CSV upload, source switching, cache
layers, or full hook suite unless explicitly requested; i18n is present but
lightweight.

## Structure

- Entry/workbench: `src/App/App.tsx`,
  `src/components/Workbench/EditorWorkbench.tsx`.
- UI: `src/components/Fields/**`, `src/components/Config/**`,
  `src/components/Chart/**`.
- Store/connector: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`,
  `src/utils/demoConnector.ts`.
- Mutations/styles: `src/utils/*Actions.ts`, `dragDrop.ts`, `filterInput.ts`,
  `src/styles/**`.

## Rules

- Do not import from other practices.
- Keep connector behavior centralized in `demoConnector.ts`.
- Preserve the remote CSV path: `type: 'csv'`, `rawDataset: url`.
- Keep `VBIStore` simple: initialize, sync schema, subscribe to doc updates, and
  rebuild VSeed.
- Builder mutation belongs in `mappingActions.ts`, `fieldActions.ts`, and
  `filterActions.ts`; slot behavior is driven by
  `src/components/Config/slotConfig.ts`.
- Components compose fields/config/chart UI instead of rebuilding DSL internals.

## Validation

```bash
pnpm --filter streamlined run test
pnpm --filter streamlined run lint
pnpm --filter streamlined run typecheck
pnpm --filter streamlined run build
```

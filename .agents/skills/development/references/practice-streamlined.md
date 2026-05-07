# Streamlined Practice

Reference material for `practices/streamlined`. It is the fast path for
connector bootstrap, CSV URL data flow, and lightweight workbench behavior. Use
it when a task needs the main VBI pipeline but not the full standard app
framework.

## Positioning

Streamlined is a lightweight workflow app:

- It has a medium source surface: about 57 source files and one focused test
  file.
- Like `minimalist`, it uses a remote CSV demo connector.
- It adds explicit initialization through `useInitializeVBI`.
- It uses a three-column workbench: fields, config, and chart workspace.
- It has modular styles under `src/styles/**`.
- Hooks stay minimal: initialization and fullscreen.

Compared with `minimalist`, it has clearer workflow panels and more reusable
action utilities. Compared with `standard`, it intentionally omits i18n files,
CSV upload, source switching, and the full hook suite. Compared with
`professional`, it is a simple implementation of slot/config behavior rather than
a business UI.

## Structure

- Entry: `src/index.tsx`, `src/App/App.tsx`.
- Workbench: `src/components/Workbench/EditorWorkbench.tsx`.
- Chart area: `src/components/Chart/**`.
- Config and fields: `src/components/Config/**`, `src/components/Fields/**`.
- Store: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Connector: `src/utils/demoConnector.ts`.
- Feature logic: `src/utils/*Actions.ts`, `dragDrop.ts`, `filterInput.ts`.
- Styles: `src/styles/app.css` imports feature CSS files.

## Differences

- The connector registers `demo` and directly creates a VQuery CSV dataset from
  the public supermarket URL.
- The store has explicit `initialize`, `initialized`, `schema`, `loading`, and
  `vseed`, but no cache and no source switching.
- `useFullscreen` includes fallback fullscreen state when browser fullscreen
  fails.
- Config slots are driven by `slotConfig.ts`; Builder mutation lives in
  `mappingActions.ts`, `fieldActions.ts`, and `filterActions.ts`.
- `VSeedRender` includes a pivot chart legend filtering helper like standard, but
  keeps rendering code compact.

## Development Rules

- Do not import from other practices.
- Keep connector behavior centralized in `demoConnector.ts`.
- Preserve the CSV URL path: `type: 'csv'`, `rawDataset: url`.
- Keep `VBIStore` simple: subscribe to doc changes and rebuild VSeed.
- Use focused utilities for mapping, filtering, and drag/drop mutation.

## Validation

```bash
pnpm --filter streamlined run test
pnpm --filter streamlined run lint
pnpm --filter streamlined run typecheck
pnpm --filter streamlined run build
```

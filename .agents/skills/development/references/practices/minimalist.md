# Minimalist Practice

Reference material for `practices/minimalist`. It is the smallest standalone VBI
app, suited to tasks that need a compact, readable implementation rather than a
full demo.

## Positioning

Minimalist is a low-ceremony app:

- It currently has the smallest source surface: about 30 source files and one
  focused test file.
- Its only custom hook is `useFullscreen`.
- It uses native HTML drag/drop instead of `@dnd-kit`.
- It uses a remote CSV demo connector and a hard-coded schema.
- It has no i18n module; labels live in `src/config/labels.ts`.
- It does not provide CSV upload, source switching, a full hook suite, or complex
  modals.

Compared with `streamlined`, it is flatter and has fewer workflows. Compared
with `standard` and `professional`, it is a learning sample rather than the
source for standard implementation patterns.

## Structure

- Entry: `src/index.tsx`, `src/App/App.tsx`.
- Editing UI: `src/components/EditMode.tsx`.
- UI panels: kept flat under `src/components/**`.
- State: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Rendering: `src/components/Render/VSeedRender.tsx`.
- Bootstrap: `src/utils/demoConnector.ts`.
- Field/filter helpers: `src/utils/fields.ts`, `src/utils/filter.ts`.

## Differences

- The store initializes immediately in `createVBIStore`; there is no explicit
  `initialize` lifecycle.
- The connector registers `demo` and creates a VQuery CSV dataset from the public
  supermarket URL.
- Drag payloads are stored through `dataTransfer` and the in-memory fallback in
  `src/utils/fields.ts`.
- `VSeedRender` is the barest renderer: VChart, list table, pivot table, and
  pivot chart. It has no legend filtering helper and no Ant Design error
  message.
- View/edit mode stays in `AppContent`; edit mode directly composes the toolbar,
  field panel, shelf panel, filter panel, and chart body.

## Development Rules

- Do not import from other practices.
- Keep components short; extract only when rendering, state, and mutation logic
  are mixed together.
- Use the Builder API as the mutation boundary.
- Do not add standard/professional features unless the task explicitly asks to
  expand the minimal sample.
- Prefer local utilities over new abstraction layers.

## Validation

```bash
pnpm --filter minimalist run test
pnpm --filter minimalist run lint
pnpm --filter minimalist run typecheck
pnpm --filter minimalist run build
```

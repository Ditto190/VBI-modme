# Professional Practice

Reference material for `practices/professional`. It is the most complete
business-oriented practice and the main reference for real hook signatures, edge
cases, drag/drop, and production-grade interaction behavior.

## Positioning

Professional is a high-fidelity app:

- It has a broad source surface: about 110 source files, with focused tests for
  the drag/drop model, field token menu, overlay, slot behavior, and more.
- It has the full hook suite, plus `useInitializeProfessional` and
  `useProfessionalFields`.
- It uses `@dnd-kit/core` for custom drag/drop, overlay positioning, and slot
  drop targets.
- It uses local JSON data through `professionalLocalData`.
- It has complete `src/i18n/**`, theme config, slot config, and segmented style
  files.
- It depends on `@visactor/vbi-react`, but practice behavior is still
  implemented through local hooks and models.

Compared with `standard`, it is a richer behavior reference rather than a simpler
template. Compared with `streamlined`, it replaces direct slot logic with tested
drag/drop and editor models. Compared with `minimalist`, it sits at the other end
of the complexity ladder.

## Structure

- Entry: `src/index.tsx`, `src/App.tsx`.
- Editor shell: `src/components/Editor/**`.
- Filters: `src/components/Filter/**`.
- Drag/drop: `src/components/Editor/dnd/**`.
- Hooks: `src/hooks/**`, exported from `src/hooks/index.ts`.
- Store: `src/model/VBIStore.ts`, `src/model/VBIStoreProvider.tsx`.
- Connector/data: `src/utils/localConnector.ts`, `localDataset.ts`,
  `parseCsv.ts`, `supermarketSchema.ts`.
- Styles: `src/App.css` imports `src/styles/**`.

## Differences

- `createDefaultBuilder()` registers the connector and immediately sets the
  default locale, theme, and limit.
- Initialization is delegated to `useInitializeProfessional`, which calls
  `prepareProfessionalVBI()` before running store `initialize`.
- Editor state is assembled through `useProfessionalEditorModel`; shell
  components keep composition responsibility.
- Drag/drop behavior is split into payload, target model, drop logic, overlay
  position, and provider files, with tests for pure decision logic.
- Filter and having-filter UI use modal/model composition instead of the standard
  shelf-panel style.
- `VSeedRender` delegates to `renderVSeed` and reports render failures through
  Ant Design `message.error`.

## Development Rules

- Do not import from other practices.
- Put behavior in hooks, models, or utils; components should focus on view and
  interaction composition.
- Preserve full hook signatures and edge-case handling.
- Keep drag/drop model logic testable outside React where possible.
- Update visible copy in both locales.
- Use `localConnector.ts` as the boundary for local data and schema
  normalization.

## Validation

```bash
pnpm --filter professional run test
pnpm --filter professional run lint
pnpm --filter professional run typecheck
pnpm --filter professional run build
```

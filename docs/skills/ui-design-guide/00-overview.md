# UI Design Guide

> A complete reference for AI agents designing UI panels for the VBI project. Use the **professional** / **streamlined** practices as the primary references, with **standard** and **vbi-react-starter** as supporting references. See [20-practices-reference.md](./20-practices-reference.md).

---

## Document Structure

| File                                                               | Contents                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [01-folder-structure.md](./01-folder-structure.md)                 | Folder structure conventions, constraints, and checklist                                      |
| [02-dsl-types.md](./02-dsl-types.md)                               | DSL type quick reference (VBIChartDSL / VBIDimension / VBIMeasure, etc.)                      |
| [03-builder-api-summary.md](./03-builder-api-summary.md)           | Builder API quick reference (sub-builder method overview)                                     |
| [04-hooks-overview.md](./04-hooks-overview.md)                     | Hooks overview and import rules                                                               |
| [05-hooks-useVBIDimensions.md](./05-hooks-useVBIDimensions.md)     | useVBIDimensions — dimension management                                                       |
| [06-hooks-useVBIMeasures.md](./06-hooks-useVBIMeasures.md)         | useVBIMeasures — measure management                                                           |
| [07-hooks-useVBIWhereFilter.md](./07-hooks-useVBIWhereFilter.md)   | useVBIWhereFilter — WHERE filters                                                             |
| [08-hooks-useVBIHavingFilter.md](./08-hooks-useVBIHavingFilter.md) | useVBIHavingFilter — HAVING filters                                                           |
| [09-hooks-useVBIChartType.md](./09-hooks-useVBIChartType.md)       | useVBIChartType — chart type                                                                  |
| [10-hooks-useVBIBuilder.md](./10-hooks-useVBIBuilder.md)           | useVBIBuilder — locale/theme/limit                                                            |
| [11-hooks-useVBISchemaFields.md](./11-hooks-useVBISchemaFields.md) | useVBISchemaFields — field list                                                               |
| [12-hooks-useVBIUndoManager.md](./12-hooks-useVBIUndoManager.md)   | useVBIUndoManager — Undo/Redo                                                                 |
| [13-hooks-useVBIStore.md](./13-hooks-useVBIStore.md)               | useVBIStore — global state                                                                    |
| [14-vseed-render.md](./14-vseed-render.md)                         | VSeedRender implementation rules and complete code                                            |
| [15-vbi-store.md](./15-vbi-store.md)                               | VBIStore implementation rules and complete code                                               |
| [16-vbi-store-provider.md](./16-vbi-store-provider.md)             | VBIStoreProvider + useVBIStore hook                                                           |
| [17-demo-connector.md](./17-demo-connector.md)                     | Complete Connector/bootstrap module code (demoConnector/localConnector)                       |
| [18-component-patterns.md](./18-component-patterns.md)             | Core UI component patterns: Toolbar / FieldsPanel / ShelfPanel / ChartPanel                   |
| [19-ui-considerations.md](./19-ui-considerations.md)               | UI development notes: floating dropdowns, light mode, filter operators, Connector type rules  |
| [20-practices-reference.md](./20-practices-reference.md)           | Practice reference index and API-grouped reference sources                                    |
| [21-undocumented-apis.md](./21-undocumented-apis.md)               | Correct usage found by reading practice code: WHERE op+value rules, TidyDatum, replaceFilters |

---

## Core Principles

### Independence

Each practice is a fully independent project:

- **No cross-practice imports**: all `src/` paths are valid only inside the current practice.
- **Independent VSeedRender implementation**: each practice must implement its own copy and must not import another practice's version.
- **Independent hook wrappers**: each practice has its own hook set exported through `src/hooks/index.ts`.
- **Independent model management**: each practice has its own Zustand store.

### Data Flow

```
User action → Builder API → Yjs Doc update → VBIStore listener → buildVSeed() → VSeedRender rendering
```

AI agents only need to operate through the Builder API (`builder.dimensions.add`, etc.); everything downstream is automatic.

### Import Source Quick Reference

| What you need                              | Import source                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| VBI types (VBIDimension, etc.)             | `@visactor/vbi`                                                                    |
| VSeed / VSeedBuilder                       | `@visactor/vbi` (types), `@visactor/vseed` (implementation)                        |
| VChart rendering                           | `@visactor/vchart`                                                                 |
| VTable rendering                           | `@visactor/vtable`                                                                 |
| hooks (standard/minimalist/professional)   | `src/hooks/` (the current practice)                                                |
| hooks (vbi-react-starter)                  | `@visactor/vbi-react`                                                              |
| VBI core API (VBI / VBIChartBuilder, etc.) | Main `@visactor/vbi` entry point (often used with a bootstrap module in practices) |

---

## Source References

See [20-practices-reference.md](./20-practices-reference.md).

| Module                      | Recommended source location                                    |
| --------------------------- | -------------------------------------------------------------- |
| hooks (complete signatures) | `practices/professional/src/hooks/`                            |
| hooks (compact pattern)     | `practices/streamlined/src/hooks/`                             |
| VBIStore                    | `practices/professional/src/model/VBIStore.ts`                 |
| VBIStoreProvider            | `practices/standard/src/model/VBIStoreProvider.tsx`            |
| demoConnector (CSV URL)     | `practices/streamlined/src/utils/demoConnector.ts`             |
| localConnector (local data) | `practices/professional/src/utils/localConnector.ts`           |
| VSeedRender                 | `practices/professional/src/components/Render/VSeedRender.tsx` |
| Complete UI example         | `practices/standard/src/App/`                                  |
| vbi-react-starter           | `practices/vbi-react-starter/src/`                             |

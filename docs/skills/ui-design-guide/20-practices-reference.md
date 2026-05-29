# 20. Practices for UI Development Reference

> This document records the practices that can be used as references when developing VBI UI, and the specific value each practice provides. It only includes practices that currently exist in this repository.

---

## Reference Index

### professional

- **Location**: `practices/professional/`
- **Reference value**: the most complete and reliable reference implementation; suitable for validating actual hooks/API behavior.
- **Coverage**:
  - Complete hook implementations with full signatures.
  - `useVBISchemaFields` returns `fieldRoleMap` / `fieldTypeMap`.
  - `replaceFilters` in `useVBIWhereFilter` / `useVBIHavingFilter`.
  - `theme` / `setTheme` / `limit` / `setLimit` in `useVBIBuilder`.
  - `availableChartTypes` in `useVBIChartType`.
  - VSeedRender error handling with filter-condition fallback.
  - Local data connection and type normalization in `localConnector.ts`.

---

### standard

- **Location**: `practices/standard/`
- **Reference value**: the most complete standardized structure; suitable as a documentation example and template baseline.
- **Coverage**:
  - Complete UI folder organization and component layering.
  - VBIStore + VBIStoreProvider template.
  - Collaboration pattern between hooks and Shelf/Toolbar components.
  - `localConnector.ts` + `createDefaultBuilder()` initialization path.

---

### streamlined

- **Location**: `practices/streamlined/`
- **Reference value**: the simplest Connector and data-flow implementation; useful for quickly understanding the main path.
- **Coverage**:
  - `demoConnector.ts` (`registerDemoConnector` + `defaultBuilder`).
  - Lightweight VBIStore that directly listens to `buildVSeed()`.
  - `vbi-filter-error` event synchronization pattern.
  - CSV URL data-source wiring (`type: 'csv', rawDataset: url`).

---

### minimalist

- **Location**: `practices/minimalist/`
- **Reference value**: the smallest self-contained UI that still follows the VBI data-flow.
- **Coverage**:
  - Compact app shell.
  - Minimal VBIStore and VSeedRender.
  - Direct Builder API usage for fields, shelves, filters, and toolbar.
  - Good reference when a generated UI should stay small but still draw charts correctly.

---

### vbi-react-starter

- **Location**: `practices/vbi-react-starter/`
- **Reference value**: official `@visactor/vbi-react` package integration example.
- **Coverage**:
  - Usage of package hooks such as `useVBI` / `useVSeed` / `useDimensions`.
  - Wiring for `ChartRenderer` / `FieldPanel` / `BuilderLayout` components.

---

## API-Grouped Reference Sources

| API / Feature                           | Primary Reference                                        | Alternative Reference                                     |
| --------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| Connector/bootstrap (CSV URL)           | `streamlined`                                            | `minimalist`                                              |
| Connector/bootstrap (local data)        | `standard`                                               | `professional`                                            |
| VBIStore                                | `professional`                                           | `standard`                                                |
| VBIStoreProvider                        | `standard`                                               | -                                                         |
| Hook signatures (practice version)      | `professional`                                           | `standard`                                                |
| VSeedRender                             | `professional`                                           | `standard`                                                |
| WHERE filters                           | `professional`                                           | `streamlined`                                             |
| HAVING filters                          | `professional`                                           | `standard`                                                |
| WHERE operator serialization            | `standard/src/components/Filter/whereFilterUtils.ts`     | `professional/src/components/Filter/`                     |
| HAVING aggregate/operator normalization | `standard/src/components/Filter/havingFilterUtils.ts`    | `standard/src/components/Shelves/shelves/HavingShelf.tsx` |
| Filter shelf Builder writes             | `standard/src/components/Shelves/shelves/WhereShelf.tsx` | `standard/src/components/Shelves/shelves/HavingShelf.tsx` |
| VBI -> VQuery pipeline                  | `packages/vbi/src/chart-builder/pipeline/vqueryDSL/`     | `packages/vquery/src/sql-builder/builders/`               |
| ChartTypeSelector                       | `standard`                                               | `professional`                                            |
| FieldsPanel                             | `standard`                                               | `professional`                                            |
| FilterPanel / HavingFilterPanel         | `professional`                                           | `standard`                                                |
| Theme switching                         | `standard`                                               | `professional`                                            |
| i18n internationalization               | `standard`                                               | `professional`                                            |
| CSV upload + schema inference           | `professional`                                           | `standard`                                                |
| Undo/Redo                               | `professional`                                           | `standard`                                                |
| `@visactor/vbi-react` hooks/components  | `vbi-react-starter`                                      | -                                                         |

---

## Usage Guidance

### When Creating a New VBI UI

1. Use `standard` as the structure template (folders, Provider, Store, component layering).
2. Use `professional` as the logic reference (complete hook behavior and edge handling).
3. Use `streamlined` as the simplest Connector reference (quickly wire the data path).
4. Use `minimalist` when the target UI should be compact but still complete.
5. If you explicitly need the `@visactor/vbi-react` package, then reference `vbi-react-starter`.

### Patterns Not to Mix

- Mixing `@visactor/vbi-react` hooks with a practice's own hooks.
- Directly importing `src/*` components or hooks across practices.

### Key Principles

- **Each practice must implement core modules independently**; do not import them across practices.
- Connector and builder initialization are completed in the target practice's bootstrap module (file names may differ).
- VSeedRender must be implemented by the current practice.
- Except for `vbi-react-starter`, prefer the target practice's `src/hooks/`.

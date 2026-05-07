# 1. Folder Structure Conventions

Each practice is a fully independent project with its own complete folder structure. **Do not import components or hooks across practices**.

---

## 1.1 Standard Folder Structure

```
practices/{name}/src/
├── App/
│   └── App.tsx              # Main application entry; manages layout
├── components/
│   ├── ChartType/
│   │   └── Selector.tsx     # Chart type selector
│   ├── Fields/
│   │   ├── FieldList/       # Field list panel (dimensions + measures combined)
│   │   ├── DimensionsList/  # Available dimension list
│   │   └── MeasuresList/    # Available measure list
│   ├── Filter/
│   │   ├── FilterPanel.tsx      # WHERE filter panel
│   │   └── HavingFilterPanel.tsx # HAVING filter panel
│   ├── Render/
│   │   └── VSeedRender.tsx  # VSeed renderer (independent implementation)
│   └── Shelves/
│       ├── DimensionShelf.tsx  # Dimension shelf
│       ├── MeasureShelf.tsx    # Measure shelf
│       ├── WhereShelf.tsx      # WHERE filter shelf
│       ├── HavingShelf.tsx     # HAVING filter shelf
│       └── (dnd/ drag-and-drop related)
├── hooks/                    # React hooks (VBI wrappers)
│   ├── index.ts              # Unified exports
│   ├── useVBIBuilder.ts      # locale/theme/limit configuration
│   ├── useVBIChartType.ts    # Chart type
│   ├── useVBIDimensions.ts   # Dimension operations
│   ├── useVBIMeasures.ts     # Measure operations
│   ├── useVBIWhereFilter.ts  # WHERE filters
│   ├── useVBIHavingFilter.ts # HAVING filters
│   ├── useVBISchemaFields.ts # Field list
│   ├── useVBIUndoManager.ts  # Undo/Redo
│   ├── useVBIStore.ts        # store hook
│   └── useBuilderDocState.ts # Internal: Yjs state subscription
├── model/
│   ├── VBIStore.ts          # Zustand store (builder state + VSeed cache)
│   └── VBIStoreProvider.tsx # React Context provider + useVBIStore
├── utils/
│   ├── {connector-bootstrap}.ts # Data source Connector + builder factory (for example demoConnector/localConnector)
│   └── fieldRole.ts        # Field role mapping (getFieldRoleBySchemaType)
├── constants/
│   └── builder.ts           # Constant configuration (default limit, theme, locale)
├── i18n/
│   └── (internationalization related)
└── index.tsx               # Application entry
```

---

## 1.2 Key Constraints

| Constraint                      | Description                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| No cross-practice imports       | `src/` paths are valid only inside the current practice                                  |
| Independent VSeedRender         | Each practice must implement its own copy and must not import another practice's version |
| Independent hook wrappers       | Each practice has its own hook set                                                       |
| Independent model management    | Each practice has its own Zustand store                                                  |
| Independent connector/bootstrap | Each practice wraps its own VBI initialization code (file names may differ)              |

---

## 1.3 Design Checklist

### Initialization

- [ ] The connector/bootstrap module is implemented (for example `demoConnector.ts`/`localConnector.ts`) and includes connector registration plus a builder factory.
- [ ] `VBIStore` is implemented with `initialize` and `bindEvent` methods.
- [ ] `VBIStoreProvider` is implemented, and the `useVBIStore` hook is available.
- [ ] `App.tsx` wraps the application with `VBIStoreProvider`.
- [ ] Initialization calls `initialize(builder)` to bind Yjs events.

### Hooks

- [ ] `src/hooks/index.ts` exports all hooks from one place.
- [ ] `useVBIDimensions` supports adding dimensions in callback mode.
- [ ] `useVBIMeasures` supports adding measures in callback mode.
- [ ] Hooks do not depend on the `@visactor/vbi-react` package.

### Rendering

- [ ] `VSeedRender` lives at `src/components/Render/VSeedRender.tsx` and is implemented independently.
- [ ] `VSeedBuilder`, `VSeed`, and type guard functions are imported correctly from `@visactor/vseed`.
- [ ] All four rendering paths are handled: `isVChart`/`isPivotChart`/`isTable`/`isPivotTable`.
- [ ] `useEffect` cleanup calls `release()` correctly.

### Data Flow

- [ ] User actions configure charts through the Builder API (no direct DSL mutation).
- [ ] Yjs doc update events are listened to correctly.
- [ ] `bindEvent` is cleaned up correctly when the component unmounts.

### Independence

- [ ] All `src/` imports are valid only inside the current practice.
- [ ] No components or hooks are imported from other practices.
- [ ] `VSeedRender` is the current practice's own implementation.

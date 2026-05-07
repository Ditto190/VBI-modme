# 10. Feature Status Overview

## 10.1 Legend

- ✅ **Available**: the feature is implemented and AI can use it directly.
- ⚠️ **Alternative available**: the core capability exists but must be accessed another way.
- 🔧 **Can be added to vbi-react**: the feature is implemented in standard and can be moved into the vbi-react package.

---

## 10.2 @visactor/vbi Exports

The `@visactor/vbi` main entry (`src/index.ts`) already exports the main runtime APIs. The following features can be used directly from the package entry:

| Feature                                              | Actual location                     | Status       |
| ---------------------------------------------------- | ----------------------------------- | ------------ |
| `VBI` namespace / `createVBI()`                      | `src/vbi/create-vbi.ts`             | ✅ Available |
| `VBIChartBuilder`                                    | `src/chart-builder/builder.ts`      | ✅ Available |
| `registerConnector` / `getConnector`                 | `src/chart-builder/connector.ts`    | ✅ Available |
| `createEmptyChart` / `VBI.chart.createEmpty()`       | `src/vbi/create-empty-chart.ts`     | ✅ Available |
| `VBIChartDSL` and all DSL types                      | `src/types/chartDSL/`               | ✅ Available |
| All Builder types                                    | `src/types/builder/`                | ✅ Available |
| `builder.dsl.get(path)` / `.set()`                   | `builder.dsl`, native Y.Map methods | ✅ Available |
| `builder.doc.transact(fn)`                           | `builder.doc`, native Y.Doc methods | ✅ Available |
| `builder.chartType.getSupportedMeasureEncodings()`   | `chart-type-builder.ts`             | ✅ Available |
| `builder.chartType.getSupportedDimensionEncodings()` | `chart-type-builder.ts`             | ✅ Available |

The following features **exist in the main entry**:

| Feature                                               | Location           |
| ----------------------------------------------------- | ------------------ |
| `isVBIFilter`, `isVBIWhereGroup`, `isVBIHavingFilter` | `filter-guards.ts` |

**Recommendation**: Even when the main entry can be accessed directly, still prefer the **target practice's own** connector/bootstrap module, such as `demoConnector.ts` or `localConnector.ts`, and its default builder wrapper. Those modules usually contain connector registration, the default data source, and page-level initialization logic.

---

## 10.3 Core VBIChartBuilder Methods

| Method                                                                                                  | Status                                                                         |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `builder.build()`                                                                                       | ✅ Available                                                                   |
| `builder.buildVQuery()`                                                                                 | ✅ Available                                                                   |
| `builder.buildVSeed()`                                                                                  | ✅ Available. Data fetching and rendering are called automatically internally. |
| `builder.isEmpty()`                                                                                     | ✅ Available                                                                   |
| `builder.getSchema()`                                                                                   | ✅ Available                                                                   |
| `builder.applyUpdate()` / `builder.encodeStateAsUpdate()`                                               | ✅ Available                                                                   |
| All sub-builders: dimensions/measures/whereFilter/havingFilter/chartType/theme/locale/limit/undoManager | ✅ Available                                                                   |

---

## 10.4 VBI-react Hooks

| Hook              | Status       | Description                                                                                |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `useVBI`          | ✅ Available | Gets builder and DSL snapshot                                                              |
| `useVSeed`        | ✅ Available | Runs the buildVSeed pipeline                                                               |
| `useChartType`    | ✅ Available | Subscribes to chart type state                                                             |
| `useDimensions`   | ✅ Available | Subscribes to dimensions. `updateDimension` currently only updates `alias`.                |
| `useMeasures`     | ✅ Available | Subscribes to measures. `updateMeasure` currently only updates `alias/aggregate/encoding`. |
| `useWhereFilter`  | ✅ Available | Subscribes to WHERE filters                                                                |
| `useHavingFilter` | ✅ Available | Subscribes to HAVING filters                                                               |

**Note**: Hooks in `@visactor/vbi-react` have completely different signatures from the same-named hooks in `practices/standard/src/hooks/`. Real development should prefer standard hooks. See [05-react-integration.md](./05-react-integration.md).

---

## 10.5 VBI-react Components

| Component           | Status       | Description                                                                                                                            |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `ChartRenderer`     | ✅ Available | Chart rendering container. Accepts the `renderVSeed` prop                                                                              |
| `ChartTypeSelector` | ✅ Available | Chart type selector                                                                                                                    |
| `FieldPanel`        | ✅ Available | Field management panel. Accepts props such as `dimensionOptions`/`measureOptions`; **does not accept** `onAddDimension`/`onAddMeasure` |
| `BuilderLayout`     | ✅ Available | Layout container                                                                                                                       |

---

## 10.6 Features That Can Be Added to VBI-react

The following features are already implemented in `practices/standard/src/hooks/` and can be moved into the `@visactor/vbi-react` package:

| Feature                                                         | Current location                                                           |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `useVBISchemaFields` - field list with role/type classification | `practices/standard/src/hooks/useVBISchemaFields.ts`                       |
| `useVBIUndoManager` - Undo/Redo state subscription              | `practices/standard/src/hooks/useVBIUndoManager.ts`                        |
| `useVBIStore` - Zustand store hook                              | `practices/standard/src/hooks/useVBIStore.ts`                              |
| `useBuilderDocState` - Yjs doc state subscription               | `practices/standard/src/hooks/useBuilderDocState.ts`                       |
| `useVBIBuilder` - locale/theme/limit config                     | `practices/standard/src/hooks/useVBIBuilder.ts`                            |
| `useVBIChartType` - chart type subscription                     | `practices/standard/src/hooks/useVBIChartType.ts`                          |
| `useVBIWhereFilter` - complete WHERE filter support             | `practices/standard/src/hooks/useVBIWhereFilter.ts`                        |
| `useVBIHavingFilter` - complete HAVING filter support           | `practices/standard/src/hooks/useVBIHavingFilter.ts`                       |
| `useVBIDimensions` - dimension management with callback mode    | `practices/standard/src/hooks/useVBIDimensions.ts`                         |
| `useVBIMeasures` - measure management with callback mode        | `practices/standard/src/hooks/useVBIMeasures.ts`                           |
| `useFilterRootOperator` - switches the filter root operator     | `practices/standard/src/components/Shelves/hooks/useFilterRootOperator.ts` |

---

## 10.7 AI Usage Boundaries

**AI only needs to operate on the VBI + VBI-react layers**. The following parts are invisible to AI and do not need to be understood:

| Layer           | Package                          | Description                                                 |
| --------------- | -------------------------------- | ----------------------------------------------------------- |
| Query layer     | `@visactor/vquery`               | Called automatically inside VBI; AI does not operate on it. |
| Rendering layer | `@visactor/vseed`                | Called automatically inside VBI; AI does not operate on it. |
| Renderer        | practices/standard's VSeedRender | Implemented by standard itself; AI does not operate on it.  |

**Data flow**: Builder API -> Yjs update -> useVSeed observes the update -> buildVSeed runs internally -> VSeed object is generated -> VSeedRender renders it. AI only participates in the first step; everything after that is automatic.

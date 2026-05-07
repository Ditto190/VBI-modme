# 1. Core Concepts

## 1.1 Data Flow

```
User configuration (DSL) -> VBIChartBuilder -> VQuery (SQL) -> VSeed (rendering Spec) -> Chart rendering
```

| Concept           | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `VBIChartBuilder` | Yjs-backed configuration builder. All chart config is managed by sub-builders.         |
| `VBIChartDSL`     | JSON snapshot of the configuration, returned by `builder.build()`                      |
| `VQueryDSL`       | Generated SQL query DSL, returned by `builder.buildVQuery()`                           |
| `VSeed`           | Rendering-layer Spec returned by `builder.buildVSeed()`, passable to VChart/VTable     |
| `connectorId`     | Data source identifier. It must first be registered through `VBI.registerConnector()`. |

## 1.2 Yjs Doc Structure

`VBIChartBuilder` internally owns a `Y.Doc` and a `Y.Map<any>` (`builder.dsl`). All configuration changes are Yjs transactions, so collaborative editing and Undo/Redo are supported by design.

```ts
builder.doc // Y.Doc instance. Listening to the 'update' event can trigger re-rendering.
builder.dsl // Y.Map<any>, storing the full configuration tree.
builder.undoManager // Y.UndoManager with undo/redo support.
```

### Yjs Update -> UI Re-render Flow

When AI calls a Builder API such as `builder.dimensions.add()`:

1. A Yjs transaction runs and `doc` emits the `'update'` event.
2. Hooks such as `useVSeed`, `useDimensions`, and `useMeasures` observe the change.
3. React components re-render automatically and call `builder.buildVSeed()` to get the new Spec.
4. The chart component re-renders with the new Spec.

This flow is **automatic**. AI only needs to call Builder APIs to trigger UI updates.

## 1.3 Builder Sub-builder Overview

| Sub-builder            | Responsibility   | Key methods                                        |
| ---------------------- | ---------------- | -------------------------------------------------- |
| `builder.chartType`    | Chart type       | `changeChartType(type)`                            |
| `builder.dimensions`   | Dimension config | `add(field, cb)`, `remove(id)`, `update(id, cb)`   |
| `builder.measures`     | Measure config   | `add(field, cb)`, `remove(id)`, `update(id, cb)`   |
| `builder.whereFilter`  | WHERE filter     | `add(field, cb)`, `addGroup(op, cb)`, `remove(id)` |
| `builder.havingFilter` | HAVING filter    | `add(field, cb)`, `addGroup(op, cb)`, `remove(id)` |
| `builder.theme`        | Theme            | `setTheme('light' \| 'dark')`                      |
| `builder.locale`       | Locale           | `setLocale('zh-CN' \| 'en-US')`                    |
| `builder.limit`        | Row limit        | `setLimit(n: number)`                              |
| `builder.undoManager`  | Undo/Redo        | `undo()`, `redo()`, `canUndo()`, `canRedo()`       |

## 1.4 Supported Chart Types

| Type                   | Value                                   | Description                          |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| Table                  | `table`                                 | Standard list table                  |
| Pivot table            | `pivotTable`                            | Crosstab pivot table                 |
| Column chart           | `column`                                | Vertical column chart                |
| Bar chart              | `bar`                                   | Horizontal bar chart                 |
| Line chart             | `line`                                  | Line chart                           |
| Area chart             | `area`                                  | Area chart                           |
| Pie chart              | `pie`                                   | Pie chart                            |
| Donut chart            | `donut`                                 | Donut chart                          |
| Rose chart             | `rose`                                  | Nightingale rose chart               |
| Scatter chart          | `scatter`                               | Scatter chart                        |
| Dual-axis chart        | `dualAxis`                              | Dual Y-axis chart                    |
| Radar chart            | `radar`                                 | Radar chart                          |
| Funnel chart           | `funnel`                                | Funnel chart                         |
| Heatmap                | `heatmap`                               | Heatmap                              |
| Box plot               | `boxPlot`                               | Box plot                             |
| Histogram              | `histogram`                             | Histogram                            |
| Sunburst chart         | `sunburst`                              | Sunburst chart                       |
| Treemap                | `treeMap`                               | Rectangular treemap                  |
| Circle packing chart   | `circlePacking`                         | Circle packing chart                 |
| Animated ranking chart | `raceBar/Column/Line/Scatter/Pie/Donut` | Animated ranking chart               |
| Parallel column/bar    | `columnParallel/barParallel`            | Parallel coordinate column/bar chart |
| Percent column/bar     | `columnPercent/barPercent`              | Percent column/bar chart             |

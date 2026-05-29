# 5. React Integration Patterns

> ⚠️ **Important distinction**: Hooks implemented by each practice, such as `useVBIDimensions` and `useVBIWhereFilter`, have **completely different signatures** from hooks in the `@visactor/vbi-react` package, such as `useDimensions` and `useWhereFilter`. They must not be mixed. **Most practices use their own independent hooks; only vbi-react-starter uses @visactor/vbi-react**. See [09-standard-practice.md](./09-standard-practice.md).

## 5.1 Two Hook Sets Compared

| vbi-react hook                      | Practice-owned hook                     | Key difference                        |
| ----------------------------------- | --------------------------------------- | ------------------------------------- |
| `useDimensions(builder)` required   | `useVBIDimensions(builder?)` optional   | The builder parameter is optional     |
| `useMeasures(builder)` required     | `useVBIMeasures(builder?)` optional     | The builder parameter is optional     |
| `useWhereFilter(builder)` required  | `useVBIWhereFilter(builder?)` optional  | Return value is completely different  |
| `useHavingFilter(builder)` required | `useVBIHavingFilter(builder?)` optional | Return value is completely different  |
| `useChartType(builder)` required    | `useVBIChartType(builder?)` optional    | Return value differs slightly         |
| -                                   | `useVBIBuilder(builder?)`               | Practice-specific: locale/theme/limit |
| -                                   | `useVBISchemaFields(builder?)`          | Practice-specific: field list         |
| -                                   | `useVBIUndoManager(builder?)`           | Practice-specific: undo/redo          |

## 5.2 What the VBI-react Package Provides (Only Used by vbi-react-starter)

The VBI-react package lives in `packages/vbi-react/` and contains **8 hooks** and **6 components**. Only `vbi-react-starter` uses this package. Other practices (minimalist/streamlined/professional/standard) use their own independent implementations.

### Hooks

| Hook              | Purpose                              | Key return value                                                             |
| ----------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| `useVBI`          | Gets builder + complete DSL snapshot | `{ builder, dsl }`                                                           |
| `useVSeed`        | Runs the buildVSeed pipeline         | `{ vseed, loading, error, refetch }`                                         |
| `useDimensions`   | Subscribes to dimension state        | `{ dimensions, addDimension, removeDimension, updateDimension }`             |
| `useMeasures`     | Subscribes to measure state          | `{ measures, addMeasure, removeMeasure, updateMeasure }`                     |
| `useWhereFilter`  | Subscribes to WHERE filter state     | `{ whereFilter, mutateWhereFilter, clearWhereFilter, removeWhereEntry }`     |
| `useHavingFilter` | Subscribes to HAVING filter state    | `{ havingFilter, mutateHavingFilter, clearHavingFilter, removeHavingEntry }` |
| `useChartType`    | Subscribes to chart type state       | `{ chartType, availableChartTypes, setChartType }`                           |
| `useTheme`        | Subscribes to theme state            | `{ theme, setTheme }`                                                        |

### Components

| Component           | Purpose                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| `ChartRenderer`     | Chart rendering container. Requires the `renderVSeed` prop for rendering. |
| `ChartTypeSelector` | Chart type selector dropdown                                              |
| `FieldPanel`        | Field management panel for dimension/measure lists                        |
| `FilterPanel`       | WHERE/HAVING filter editing panel                                         |
| `ThemeSelector`     | Theme selector dropdown                                                   |
| `BuilderLayout`     | Layout container: leftPanel/main/rightPanel                               |

### Internal Mechanism

All hooks depend on `useBuilderObserver` (`src/internal/useBuilderObserver.ts`) internally. It is essentially React 18's `useSyncExternalStore`, subscribing to the Yjs `doc` `'update'` event. This guarantees that the **Yjs document change -> automatic React re-render** flow is fully automatic.

---

## 5.3 How AI Triggers UI Updates

After AI generates chart configuration, Yjs changes automatically trigger re-rendering. No manual page refresh is needed.

### Method 1: Call Builder APIs Directly (Recommended)

AI operates on the builder directly, and Yjs changes automatically trigger re-rendering:

```tsx
function ChartConfig() {
  const { builder } = useVBI(builder)

  // AI calls Builder APIs -> Yjs doc updates -> doc emits the 'update' event
  // -> useVSeed observes the change -> buildVSeed runs automatically -> chart re-renders.
  const configureChart = () => {
    builder.chartType.changeChartType('column')
    builder.dimensions.add('category', (node) => {
      node.setAlias('Category')
      node.setEncoding('xAxis')
    })
    builder.measures.add('sales', (node) => {
      node.setAlias('Sales')
      node.setAggregate({ func: 'sum' })
      node.setEncoding('yAxis')
    })
  }

  return <button onClick={configureChart}>Generate column chart</button>
}
```

**Key point**: AI only needs to call Builder APIs. All later re-rendering is handled automatically by VBI-react.

### Method 2: Operate Through React Hooks Imperatively

```tsx
function ChartConfig() {
  const { addDimension, removeDimension } = useDimensions(builder)
  const { addMeasure } = useMeasures(builder)
  const { setChartType } = useChartType(builder)

  const configureBarChart = () => {
    setChartType('column')
    addDimension('category')
    addMeasure('sales', { aggregate: { func: 'sum' }, alias: 'Sales' })
  }

  return <button onClick={configureBarChart}>Generate column chart</button>
}
```

### Method 3: Operate Through Filter Mutation

```tsx
function FilterPanel() {
  const { mutateWhereFilter } = useWhereFilter(builder)

  const addRegionFilter = () => {
    mutateWhereFilter((f) => {
      f.add('region', (node) => {
        node.setOperator('=')
        node.setValue('North China')
      })
    })
  }

  return <button onClick={addRegionFilter}>Add region filter</button>
}
```

---

## 5.4 useVBI: Get Full State

```tsx
import { useVBI } from '@visactor/vbi-react'

function ChartConfig() {
  const { builder, dsl } = useVBI(builder)

  return (
    <div>
      <div>Current chart type: {dsl.chartType}</div>
      <div>Dimension count: {dsl.dimensions.length}</div>
      <div>Measure count: {dsl.measures.length}</div>
    </div>
  )
}
```

---

## 5.5 useVSeed: Run the Rendering Pipeline

```tsx
import { useVSeed } from '@visactor/vbi-react'

function ChartView() {
  const { vseed, loading, error, refetch } = useVSeed(builder, {
    debounce: 300, // Debounce delay. Default: 300ms.
    onError: (e) => console.error(e),
  })

  if (error) {
    return (
      <div>
        Render failed: {error.message} <button onClick={refetch}>Retry</button>
      </div>
    )
  }

  if (loading && !vseed) {
    return <div>Loading...</div>
  }

  return vseed ? <VSeedRender vseed={vseed} /> : null
}
```

---

## 5.6 useDimensions: Dimension Management

```tsx
import { useDimensions } from '@visactor/vbi-react'

function DimensionPanel() {
  const { dimensions, addDimension, removeDimension, updateDimension } = useDimensions(builder)

  return (
    <div>
      {dimensions.map((dim) => (
        <div key={dim.id}>
          {dim.alias || dim.field}
          <button onClick={() => removeDimension(dim.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => addDimension('category')}>+ Add category dimension</button>
    </div>
  )
}
```

`VBIDimension` structure:

```ts
{
  id: string;
  field: string;        // Original field name.
  alias: string;        // Display alias.
  encoding?: 'xAxis' | 'yAxis' | 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column' | 'angle' | 'hierarchy' | 'player';
  aggregate?: { func: 'toYear' | 'toQuarter' | 'toMonth' | 'toWeek' | 'toDay' | 'toHour' | 'toMinute' | 'toSecond' };
  sort?: { order: 'asc' | 'desc' };
}
```

> Note: `useDimensions.updateDimension` supports `alias`, `encoding`, and `aggregate`. It does not expose `sort`; use `builder.dimensions.update(id, callback)` directly for sorting.

---

## 5.7 useMeasures: Measure Management

```tsx
import { useMeasures } from '@visactor/vbi-react'

function MeasurePanel() {
  const { measures, addMeasure, removeMeasure, updateMeasure } = useMeasures(builder)

  return (
    <div>
      {measures.map((m) => (
        <div key={m.id}>
          {m.alias || m.field} [{m.aggregate?.func}] -> {m.encoding}
          <button onClick={() => removeMeasure(m.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => addMeasure('sales', { aggregate: { func: 'sum' } })}>+ Add sales measure</button>
    </div>
  )
}
```

`VBIMeasure` structure:

```ts
{
  id: string;
  field: string;
  alias: string;
  encoding?: 'yAxis' | 'xAxis' | 'primaryYAxis' | 'secondaryYAxis' | 'angle' | 'radius' | 'size' | 'color' | 'detail' | 'column' | 'label' | 'tooltip' | 'value' | 'q1' | 'q3' | 'min' | 'max' | 'median' | 'outliers' | 'x0' | 'x1';
  aggregate?: { func: string; quantile?: number } | { func: 'quantile'; quantile: number };
  format?: { autoFormat: true } | { autoFormat?: false; prefix?: string; suffix?: string; decimalCount?: number; thousandsSeparator?: boolean };
  sort?: { order: 'asc' | 'desc' };
}
```

> ⚠️ `useMeasures.updateMeasure` currently only supports updating `alias`, `aggregate`, and `encoding`. To update `format`/`sort`, use `builder.measures.update(id, callback)` directly.

---

## 5.8 useWhereFilter: WHERE Filters

```tsx
import { useWhereFilter } from '@visactor/vbi-react'

function WherePanel() {
  const { whereFilter, mutateWhereFilter, clearWhereFilter, removeWhereEntry } = useWhereFilter(builder)

  return (
    <div>
      {whereFilter.conditions.map((cond) => (
        <div key={cond.id}>
          {cond.field} {cond.op} {JSON.stringify(cond.value)}
          <button onClick={() => removeWhereEntry(cond.id)}>Delete</button>
        </div>
      ))}
      <button
        onClick={() => {
          mutateWhereFilter((f) =>
            f.add('region', (n) => {
              n.setOperator('=')
              n.setValue('North China')
            }),
          )
        }}
      >
        + Add filter
      </button>
    </div>
  )
}
```

---

## 5.9 useHavingFilter: HAVING Filters

```tsx
import { useHavingFilter } from '@visactor/vbi-react'

function HavingPanel() {
  const { havingFilter, mutateHavingFilter, clearHavingFilter, removeHavingEntry } = useHavingFilter(builder)

  return (
    <div>
      {havingFilter.conditions.map((cond) => (
        <div key={cond.id}>
          {cond.field} {cond.aggregate?.func}({cond.op} {cond.value})
          <button onClick={() => removeHavingEntry(cond.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

---

## 5.10 useChartType: Chart Type

```tsx
import { useChartType } from '@visactor/vbi-react'

function ChartTypeSelector() {
  const { chartType, availableChartTypes, setChartType } = useChartType(builder)

  return (
    <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
      {availableChartTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}
```

---

## 5.11 useTheme: Theme

```tsx
import { useTheme } from '@visactor/vbi-react'

function ThemeControl() {
  const { theme, setTheme } = useTheme(builder)

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
    </select>
  )
}
```

---

## 5.12 ChartRenderer Component

```tsx
import { ChartRenderer } from '@visactor/vbi-react/components'
;<ChartRenderer
  builder={builder}
  debounce={300}
  renderVSeed={(vseed) => <VSeedRender vseed={vseed} />}
  emptyFallback={<div>Please configure a chart</div>}
  renderError={(error, refetch) => (
    <div>
      Error: {error.message}
      <button onClick={refetch}>Retry</button>
    </div>
  )}
/>
```

---

## 5.13 ChartTypeSelector Component

```tsx
import { ChartTypeSelector } from '@visactor/vbi-react/components'
;<ChartTypeSelector
  builder={builder}
  label='Chart type'
  getOptionLabel={(type) =>
    ({
      column: 'Column Chart',
      bar: 'Bar Chart',
      line: 'Line Chart',
      pie: 'Pie Chart',
    })[type] ?? type
  }
/>
```

---

## 5.14 ThemeSelector Component

```tsx
import { ThemeSelector } from '@visactor/vbi-react/components'
;<ThemeSelector
  builder={builder}
  label='Theme'
  themeOptions={[
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ]}
/>
```

---

## 5.15 FieldPanel Component

> ⚠️ Note: The `FieldPanel` API differs from older documentation.

The actual `FieldPanel` accepts these props:

```tsx
import { FieldPanel } from '@visactor/vbi-react/components'
;<FieldPanel
  builder={builder}
  dimensionOptions={[
    { label: 'Product Category', value: 'category' },
    { label: 'Region', value: 'region' },
  ]} // Optional dimension dropdown options.
  measureOptions={[
    { label: 'Sales', value: 'sales' },
    { label: 'Profit', value: 'profit' },
  ]} // Optional measure dropdown options.
  measureAggregateOptions={[
    // Optional custom aggregate function options.
    { label: 'Sum', value: 'sum' },
    { label: 'Average', value: 'avg' },
  ]}
  measureEncodingOptions={[
    // Optional custom encoding options.
    { label: 'Y Axis', value: 'yAxis' },
    { label: 'Color', value: 'color' },
  ]}
  dimensionsTitle='Dimensions'
  measuresTitle='Measures'
/>
```

> ⚠️ `FieldPanel` **does not accept** `onAddDimension` / `onAddMeasure` props. Dimension/measure addition and deletion are handled through buttons inside the component.

---

## 5.16 FilterPanel Component

```tsx
import { FilterPanel } from '@visactor/vbi-react/components'
;<FilterPanel
  builder={builder}
  fieldOptions={[
    { label: 'Region', value: 'region' },
    { label: 'Sales', value: 'sales' },
  ]}
  havingFieldOptions={[{ label: 'Sales', value: 'sales' }]}
  whereTitle='Where'
  havingTitle='Having'
/>
```

`FilterPanel` mutates `builder.whereFilter` and `builder.havingFilter` directly. Use `fieldOptions` for WHERE fields and `havingFieldOptions` for measure fields used in HAVING conditions.

---

## 5.17 BuilderLayout Component

```tsx
import { BuilderLayout } from '@visactor/vbi-react/components'
;<BuilderLayout
  topBar={<TopBar />}
  leftPanel={<FieldsPanel />}
  leftPanelWidth={320}
  main={<ChartPanel />}
  rightPanel={<ShelfPanel />}
  rightPanelWidth={320}
  footer={<Footer />}
/>
```

---

## 5.18 Complete Signatures for Practice-owned Hooks

> The hooks below come from each practice's own `src/hooks/` directory. When AI operates on a specific practice, import from that practice's `src/hooks/`; do not reference hooks across practices. Each practice's hooks have mostly the same signatures and behavior.

### useVBIWhereFilter

```tsx
import { useVBIWhereFilter } from 'src/hooks'

const {
  filters, // VBIWhereClause[], the original nested condition tree.
  flattenFilters, // VBIWhereFilter[], all leaf conditions flattened.
  addFilter, // (field: string, operator?: string, value?: unknown) => void
  addGroup, // (op: 'and'|'or', callback?: (group) => void) => void
  removeFilter, // (id: string) => void
  clearFilters, // () => void
  updateFilter, // (id: string, updates: { operator?: string; value?: unknown }) => void
  findFilter, // (id: string) => node | undefined
  updateGroup, // (id: string, updates: { operator?: 'and'|'or' }) => void
  addToGroup, // (groupId: string, field: string, operator?: string, value?: unknown) => void
  removeFromGroup, // (groupId: string, idOrIndex: string|number) => void
  findGroup, // (id: string) => node | undefined
} = useVBIWhereFilter(builder)

// Add a filter condition with direct parameters. No callback is needed.
addFilter('region', '=', 'North China')

// Add a nested group.
addGroup('and', (group) => {
  group.add('sales', (node) => {
    node.setOperator('>')
    node.setValue(1000)
  })
})

// Add a condition to a nested group.
addToGroup(groupId, 'profit', '<', 0)

// Flatten all leaf conditions.
const flat = flattenFilters()

// Update a condition.
updateFilter(filterId, { operator: '>=', value: 5000 })

// Update a nested group's operator.
updateGroup(groupId, { operator: 'or' })
```

### useVBIHavingFilter

```tsx
import { useVBIHavingFilter } from 'src/hooks'

const {
  filters, // VBIHavingClause[]
  addFilter, // (field: string, aggregate?: VBIHavingAggregate, operator?: string, value?: unknown) => void
  addGroup, // (op: 'and'|'or', callback?: (group) => void) => void
  removeFilter, // (id: string) => void
  clearFilters, // () => void
  updateFilter, // (id: string, updates: { aggregate?: VBIHavingAggregate; operator?: string; value?: unknown }) => void
  findFilter, // (id: string) => node | undefined
} = useVBIHavingFilter(builder)

// Add a HAVING condition.
addFilter('sales', { func: 'sum' }, '>', 5000)

// Update.
updateFilter(filterId, { operator: '>=', value: 10000 })
```

### useVBIDimensions / useVBIMeasures (Callback Mode)

```tsx
import { useVBIDimensions, useVBIMeasures } from 'src/hooks'

// Callback mode supports any node method.
const { dimensions, addDimension, removeDimension, updateDimension, findDimension } = useVBIDimensions(builder)
const { measures, addMeasure, removeMeasure, updateMeasure, findMeasure } = useVBIMeasures(builder)

addDimension('category', (node) => {
  node.setEncoding('xAxis')
  node.setSort({ order: 'asc' })
})

updateDimension(dimId, (node) => {
  node.setEncoding('color')
  node.clearAggregate()
})

findDimension(dimId) // Returns node or undefined.

addMeasure('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setFormat({ autoFormat: false, prefix: '$', decimalCount: 2 })
})

updateMeasure(meaId, (node) => {
  node.setEncoding('size')
  node.clearSort()
})
```

### useVBIBuilder (locale / theme / limit)

```tsx
import { useVBIBuilder } from 'src/hooks'

const { locale, theme, limit, setLocale, setTheme, setLimit } = useVBIBuilder(builder)

setLocale('zh-CN')
setTheme('dark')
setLimit(1000)
```

### useVBIChartType

```tsx
import { useVBIChartType } from 'src/hooks'

const { chartType, changeChartType, getAvailableChartTypes } = useVBIChartType(builder)

changeChartType('column')
const types = getAvailableChartTypes()
```

### useVBISchemaFields (Field List)

```tsx
import { useVBISchemaFields } from 'src/hooks'

const { schemaFields, fieldRoleMap, fieldTypeMap } = useVBISchemaFields(builder)
// schemaFields: { name, type, role: 'dimension'|'measure', isDate }[]
// fieldRoleMap: { [fieldName]: 'dimension'|'measure' }
// fieldTypeMap: { [fieldName]: typeString }
```

### useVBIUndoManager

```tsx
import { useVBIUndoManager } from 'src/hooks'

const { canUndo, canRedo, undo, redo, clear } = useVBIUndoManager(builder)

undo() // Undo.
redo() // Redo.
clear() // Clear history.
clear(true, false) // Clear only the undo stack.
```

### useFilterRootOperator (Switch the and/or Root Operator)

Location: `practices/standard/src/components/Shelves/hooks/useFilterRootOperator.ts`. It is not exported from `src/hooks`; import it separately when needed.

```tsx
import { useFilterRootOperator } from 'src/components/Shelves/hooks'

const { operator, setOperator } = useFilterRootOperator({
  builder,
  type: 'where', // Or 'having'.
})
// operator: 'and' | 'or'
// setOperator('or');
```

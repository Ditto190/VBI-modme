# 3. VBIChartBuilder API

## 3.1 Entry Notes

`VBIChartBuilder` is exported from the `@visactor/vbi` main entry. Common usage:

```ts
// Option 1: Use the builder wrapped by standard.
import { createDefaultBuilder } from 'practices/standard/src/utils/localConnector'
const builder = createDefaultBuilder()

// Option 2: Create one manually.
import { VBI } from '@visactor/vbi'
const manualBuilder = VBI.chart.create(VBI.chart.createEmpty('connector-id'))
```

---

## 3.2 Builder Instance Properties

```ts
builder.doc // Y.Doc. Listening to the 'update' event can trigger re-rendering.
builder.dsl // Y.Map<any>, storing the full configuration tree.
builder.undoManager // Y.UndoManager with undo/redo support.
builder.chartType // Chart type sub-builder.
builder.dimensions // Dimension sub-builder.
builder.measures // Measure sub-builder.
builder.whereFilter // WHERE filter sub-builder.
builder.havingFilter // HAVING filter sub-builder.
builder.theme // Theme sub-builder.
builder.locale // Locale sub-builder.
builder.limit // Row limit sub-builder.
```

---

## 3.3 Builder Methods

| Method                          | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| `builder.build()`               | Returns a `VBIChartDSL` snapshot                                            |
| `builder.buildVQuery()`         | Returns `VQueryDSL`, the query DSL                                          |
| `builder.buildVSeed()`          | Returns `VSeed`, the rendering data. Data fetching is automatic internally. |
| `builder.isEmpty()`             | Checks whether the configuration is empty                                   |
| `builder.getSchema()`           | Asynchronously fetches the builder schema                                   |
| `builder.applyUpdate()`         | Applies a Yjs update                                                        |
| `builder.encodeStateAsUpdate()` | Encodes the current state as a Yjs update                                   |

---

## 3.3.2 Native Y.Map / Yjs Methods

`builder.dsl` is a `Y.Map<any>` and `builder.doc` is a `Y.Doc`. UI code should treat
`builder.dsl` as a low-level implementation detail. Prefer Builder APIs for mutations.
Use native Yjs/Y.Map writes only when there is no public Builder API, such as local
reorder utilities inside a practice.

```ts
// Read a value from Y.Map by path.
const whereFilterNode = builder.dsl.get('whereFilter')

// Avoid direct writes in generated UI:
// whereFilterNode.set('op', 'or')
// Prefer builder.whereFilter / builder.havingFilter APIs instead.

// Batched Yjs transaction: merge multiple changes into one undo/redo step.
builder.doc.transact(() => {
  builder.chartType.changeChartType('column')
  builder.dimensions.add('category', (node) => {
    node.setAlias('Category')
    node.setEncoding('xAxis')
  })
  builder.measures.add('sales', (node) => {
    node.setAlias('Sales').setAggregate({ func: 'sum' }).setEncoding('yAxis')
  })
})

// Listen to Yjs document changes.
builder.doc.on('update', () => {
  console.log('Configuration changed')
})
```

| API                                   | Description                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `builder.dsl.get(path)`               | Reads a value from Y.Map by path, such as `'whereFilter'` or `'chartType'`       |
| `builder.dsl.get(path).set(key, val)` | Low-level escape hatch only; do not use when a Builder API exists                |
| `builder.dsl.observe(fn)`             | Observes Y.Map changes                                                           |
| `builder.dsl.unobserve(fn)`           | Stops observing Y.Map changes                                                    |
| `builder.doc.transact(fn)`            | Runs a batched Yjs transaction, merging multiple changes into one undo/redo step |
| `builder.doc.on('update', fn)`        | Listens for Yjs document updates                                                 |
| `builder.doc.off('update', fn)`       | Removes a Yjs document update listener                                           |

---

## 3.4 Sub-builder: ChartType

```ts
// Switch chart type.
builder.chartType.changeChartType('column')

// Get the current type.
const chartType = builder.chartType.getChartType()

// Get measure encoding channels supported by the current chart.
const measureEncodings = builder.chartType.getSupportedMeasureEncodings()
// -> ['yAxis', 'size', 'color', 'tooltip', 'label', ...]

// Get dimension encoding channels supported by the current chart.
const dimEncodings = builder.chartType.getSupportedDimensionEncodings()
// -> ['xAxis', 'color', 'detail', 'tooltip', 'label', ...]

// Get all available types.
const types = builder.chartType.getAvailableChartTypes()

// Observe changes.
builder.chartType.observe(() => {
  console.log('Type changed:', builder.chartType.getChartType())
})
```

---

## 3.5 Sub-builder: Dimensions

```ts
// Add a dimension.
builder.dimensions.add('category', (node) => {
  node.setAlias('Product Category')
  node.setEncoding('xAxis')
  node.setAggregate({ func: 'toMonth' })
  node.setSort({ order: 'asc' })
})

// Remove a dimension.
builder.dimensions.remove(dimensionId)

// Update a dimension.
builder.dimensions.update(dimensionId, (node) => {
  node.setAlias('New Alias')
  node.setEncoding('color')
  node.setAggregate({ func: 'toYear' })
  node.clearAggregate()
})

// Query dimensions.
const dims = builder.dimensions.find((d) => d.getField() === 'category')
const all = builder.dimensions.findAll()

// Get JSON.
const json = builder.dimensions.toJSON()

// Observe changes.
builder.dimensions.observe(() => {
  /* ... */
})
```

**DimNodeBuilder methods** (`node` inside the callback):

| Method                        | Description                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `node.getId()`                | Gets the dimension ID                                                                 |
| `node.getField()`             | Gets the field name                                                                   |
| `node.getEncoding()`          | Gets the current encoding, or undefined if unset                                      |
| `node.getSort()`              | Gets the sort config, or undefined if unset                                           |
| `node.setAlias(alias)`        | Sets the display alias                                                                |
| `node.setEncoding(enc)`       | Sets the encoding: xAxis/yAxis/color/detail/tooltip/label/row/column/player/hierarchy |
| `node.setAggregate({ func })` | Sets date aggregation: toYear/toQuarter/toMonth/toWeek/toDay/toHour/toMinute/toSecond |
| `node.setSort({ order })`     | Sets sorting: asc/desc                                                                |
| `node.clearAggregate()`       | Clears date aggregation                                                               |
| `node.clearSort()`            | Clears sorting                                                                        |

---

## 3.6 Sub-builder: Measures

```ts
// Add a measure.
builder.measures.add('sales', (node) => {
  node.setAlias('Sales')
  node.setEncoding('yAxis')
  node.setAggregate({ func: 'sum' })
  node.setFormat({ autoFormat: true })
  node.setSort({ order: 'desc' })
})

// Remove a measure.
builder.measures.remove(measureId)

// Update a measure.
builder.measures.update(measureId, (node) => {
  node.setAlias('New Alias')
  node.setEncoding('size')
  node.setAggregate({ func: 'avg' })
  node.setFormat({ autoFormat: false, prefix: '$', suffix: '', decimalCount: 2, thousandsSeparator: true })
})

// Query measures.
const meas = builder.measures.find((m) => m.getField() === 'sales')
const all = builder.measures.findAll()

// Get JSON.
const json = builder.measures.toJSON()

// Observe changes.
builder.measures.observe(() => {
  /* ... */
})
```

**MeaNodeBuilder methods** (`node` inside the callback):

| Method                                   | Description                                                                                                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node.getId()`                           | Gets the measure ID                                                                                                                                      |
| `node.getField()`                        | Gets the field name                                                                                                                                      |
| `node.getEncoding()`                     | Gets the current encoding, or undefined if unset                                                                                                         |
| `node.getFormat()`                       | Gets the format config, or undefined if unset                                                                                                            |
| `node.getSort()`                         | Gets the sort config, or undefined if unset                                                                                                              |
| `node.setAlias(alias)`                   | Sets the display alias                                                                                                                                   |
| `node.setEncoding(enc)`                  | Sets the encoding: yAxis/xAxis/primaryYAxis/secondaryYAxis/angle/radius/size/color/detail/column/label/tooltip/value/q1/q3/min/max/median/outliers/x0/x1 |
| `node.setAggregate({ func, quantile? })` | Sets aggregation: count/countDistinct/sum/avg/min/max/variance/variancePop/stddev/median/quantile                                                        |
| `node.setFormat(cfg)`                    | Sets formatting, either autoFormat or manual prefix/suffix/decimalCount/thousandsSeparator                                                               |
| `node.setSort({ order })`                | Sets sorting                                                                                                                                             |
| `node.clearFormat()`                     | Clears formatting                                                                                                                                        |
| `node.clearSort()`                       | Clears sorting                                                                                                                                           |

---

## 3.7 Sub-builder: WhereFilter

```ts
// Add a filter condition.
builder.whereFilter.add('region', (node) => {
  node.setOperator('=')
  node.setValue('North China')
})

// Add a nested group.
builder.whereFilter.addGroup('and', (group) => {
  group.add('sales', (node) => {
    node.setOperator('>')
    node.setValue(1000)
  })
})

// Update a condition.
builder.whereFilter.update(filterId, (node) => {
  node.setOperator('!=')
  node.setValue('East China')
})

// Update a nested group.
builder.whereFilter.updateGroup(groupId, (group) => {
  group.add('profit', (node) => {
    node.setOperator('<')
    node.setValue(0)
  })
})

// Remove.
builder.whereFilter.remove(filterIdOrIndex)

// Clear.
builder.whereFilter.clear()

// Query.
const found = builder.whereFilter.find((f) => f.getField() === 'region')

// Get JSON.
const json = builder.whereFilter.toJSON()

// Observe changes.
builder.whereFilter.observe(() => {
  /* ... */
})
```

**WhereNodeBuilder methods**:

| Method                    | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| `node.getId()`            | Gets the ID                                                                    |
| `node.getField()`         | Gets the field name                                                            |
| `node.getOperator()`      | Gets the operator                                                              |
| `node.getValue()`         | Gets the value                                                                 |
| `node.setField(field)`    | Sets the field name                                                            |
| `node.setOperator(op)`    | Sets the operator: =/!=/>/</>=/<= /contains/startsWith/endsWith/in/not in/date |
| `node.setValue(val)`      | Sets the value                                                                 |
| `node.setDate(predicate)` | Sets a date range, used when op=date                                           |

---

## 3.8 Sub-builder: HavingFilter

```ts
// Add a HAVING condition. An aggregate function is required.
builder.havingFilter.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setOperator('>')
  node.setValue(5000)
})

// Add a nested group.
builder.havingFilter.addGroup('or', (group) => {
  group.add('profit', (node) => {
    node.setAggregate({ func: 'avg' })
    node.setOperator('<')
    node.setValue(100)
  })
})

// Update.
builder.havingFilter.update(filterId, (node) => {
  node.setOperator('>=')
  node.setValue(10000)
})

// Update a group.
builder.havingFilter.updateGroup(groupId, (group) => {
  /* ... */
})

// Remove.
builder.havingFilter.remove(filterIdOrIndex)

// Clear.
builder.havingFilter.clear()

// Query.
const found = builder.havingFilter.find((f) => f.getField() === 'sales')

// Get JSON.
const json = builder.havingFilter.toJSON()

// Observe changes.
builder.havingFilter.observe(() => {
  /* ... */
})
```

**HavingNodeBuilder methods**:

| Method                        | Description                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `node.getId()`                | Gets the ID                                                                                       |
| `node.getField()`             | Gets the field name                                                                               |
| `node.getOperator()`          | Gets the operator                                                                                 |
| `node.getAggregate()`         | Gets the aggregate config                                                                         |
| `node.getValue()`             | Gets the value                                                                                    |
| `node.setOperator(op)`        | Sets the operator: >/</>=/<= /=/!=                                                                |
| `node.setAggregate({ func })` | Sets aggregation: count/countDistinct/sum/avg/min/max/variance/variancePop/stddev/median/quantile |
| `node.setValue(val)`          | Sets the value                                                                                    |

---

## 3.9 Sub-builder: Theme / Locale / Limit

```ts
// Theme.
builder.theme.setTheme('dark')
builder.theme.setTheme('light')
const theme = builder.theme.getTheme()

// Locale.
builder.locale.setLocale('zh-CN')
builder.locale.setLocale('en-US')
const locale = builder.locale.getLocale()

// Row limit.
builder.limit.setLimit(1000)
const limit = builder.limit.getLimit()
```

---

## 3.10 Sub-builder: UndoManager

```ts
// Undo / redo.
builder.undoManager.undo()
builder.undoManager.redo()

// Check whether undo / redo is available.
const canUndo = builder.undoManager.canUndo()
const canRedo = builder.undoManager.canRedo()

// Clear the undo stack.
builder.undoManager.clear()
builder.undoManager.clear(true, true) // Clear both undo and redo.
```

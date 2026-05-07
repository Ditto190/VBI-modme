# 3. Builder API Quick Reference

The following APIs come from a `VBIChartBuilder` instance (`builder`), usually obtained through the target practice's connector/bootstrap module, such as `demoConnector.ts` or `localConnector.ts`.

---

## 3.1 Builder Instance Properties

```ts
builder.doc // Y.Doc; listen for 'update' events to trigger re-rendering
builder.dsl // Y.Map<any>; stores the full configuration tree
builder.undoManager // Y.UndoManager; supports undo/redo
builder.chartType // Chart type sub-builder
builder.dimensions // Dimension sub-builder
builder.measures // Measure sub-builder
builder.whereFilter // WHERE filter sub-builder
builder.havingFilter // HAVING filter sub-builder
builder.theme // Theme sub-builder
builder.locale // Locale sub-builder
builder.limit // Row-limit sub-builder
```

---

## 3.2 Builder Methods

```ts
builder.build() // -> VBIChartDSL snapshot
builder.buildVQuery() // -> VQueryDSL (query DSL)
builder.buildVSeed() // -> VSeed (rendering data; internally fetches data automatically)
builder.isEmpty() // -> boolean; checks whether the configuration is empty
builder.getSchema() // -> Promise<DatasetColumn[]>; gets the field list
builder.applyUpdate(update) // Applies a Yjs update
builder.encodeStateAsUpdate() // Encodes the current state as a Yjs update
```

---

## 3.3 Sub-builder Method Quick Reference

### chartType

```ts
builder.chartType.changeChartType(type: string)           // Change chart type
builder.chartType.getChartType()                          // -> string; current type
builder.chartType.getAvailableChartTypes()                // -> string[]; all available types
builder.chartType.getSupportedMeasureEncodings()          // -> MeasureEncoding[]; supported measure encodings
builder.chartType.getSupportedDimensionEncodings()         // -> DimensionEncoding[]; supported dimension encodings
```

### dimensions

```ts
builder.dimensions.add(field, (node) => { ... })          // Add a dimension
builder.dimensions.remove(id)                             // Remove a dimension
builder.dimensions.update(id, (node) => { ... })        // Update a dimension
builder.dimensions.find(fn)                               // Find a dimension node
builder.dimensions.findAll()                             // → node[]
builder.dimensions.toJSON()                               // → VBIDimension[]
builder.dimensions.observe(fn)                            // Listen for changes
```

### measures

```ts
builder.measures.add(field, (node) => { ... })            // Add a measure
builder.measures.remove(id)                               // Remove a measure
builder.measures.update(id, (node) => { ... })          // Update a measure
builder.measures.find(fn)                                 // Find a measure node
builder.measures.findAll()                               // → node[]
builder.measures.toJSON()                                 // → VBIMeasure[]
builder.measures.observe(fn)                              // Listen for changes
```

### whereFilter

```ts
builder.whereFilter.add(field, (node) => { ... })         // Add a filter condition
builder.whereFilter.addGroup(op, (group) => { ... })      // Add a nested group
builder.whereFilter.update(id, (node) => { ... })         // Update a condition
builder.whereFilter.updateGroup(id, (group) => { ... })   // Update a group
builder.whereFilter.remove(idOrIndex)                     // Remove
builder.whereFilter.clear()                               // Clear
builder.whereFilter.find(fn)                             // Find
builder.whereFilter.toJSON()                             // → VBIWhereGroup
builder.whereFilter.observe(fn)                          // Listen for changes
```

### havingFilter

```ts
builder.havingFilter.add(field, (node) => { ... })         // Add a HAVING condition
builder.havingFilter.addGroup(op, (group) => { ... })    // Add a nested group
builder.havingFilter.update(id, (node) => { ... })        // Update a condition
builder.havingFilter.remove(idOrIndex)                   // Remove
builder.havingFilter.clear()                             // Clear
builder.havingFilter.find(fn)                           // Find
builder.havingFilter.toJSON()                            // → VBIHavingGroup
builder.havingFilter.observe(fn)                        // Listen for changes
```

### theme / locale / limit

```ts
builder.theme.setTheme('dark' | 'light')   // Set theme
builder.theme.getTheme()                    // → 'dark' | 'light'
builder.locale.setLocale('zh-CN' | 'en-US') // Set locale
builder.locale.getLocale()               // → 'zh-CN' | 'en-US'
builder.limit.setLimit(n: number)         // Set row limit
builder.limit.getLimit()                   // → number
```

### undoManager

```ts
builder.undoManager.undo()                    // Undo
builder.undoManager.redo()                    // Redo
builder.undoManager.canUndo()                 // → boolean
builder.undoManager.canRedo()                // → boolean
builder.undoManager.clear(undo?, redo?)      // Clear history
```

---

## 3.4 Node Method Quick Reference

The `node` parameter type and available methods inside callbacks:

### DimNodeBuilder

```ts
node.getId()                          // → string
node.getField()                       // → string
node.getEncoding()                    // → DimEncoding | undefined
node.setEncoding('xAxis' | 'color' | ...)  // Set encoding
node.getSort()                        // → { order: 'asc'|'desc' } | undefined
node.setSort({ order: 'asc' })       // Set sort
node.clearSort()                      // Clear sort
node.setAlias('Alias')                // Set alias
node.setAggregate({ func: 'toMonth' }) // Set date aggregation
node.clearAggregate()                // Clear aggregation
```

### MeaNodeBuilder

```ts
node.getId()
node.getField()
node.getEncoding()                   // → MeaEncoding | undefined
node.setEncoding('yAxis' | 'size' | 'color' | ...)
node.getAggregate()                  // → { func: string; quantile?: number } | undefined
node.setAggregate({ func: 'sum' })
node.getFormat()                     // → VBIMeasureFormat | undefined
node.setFormat({ autoFormat: false, prefix: '$', decimalCount: 2 })
node.clearFormat()
node.getSort()
node.setSort({ order: 'desc' })
node.clearSort()
node.setAlias('Alias')
```

### WhereNodeBuilder

```ts
node.getId()
node.getField()
node.getOperator()                   // → string
node.setOperator('=' | '!=' | '>' | 'contains' | 'in' | 'date' | ...)
node.getValue()                      // → unknown
node.setValue('North China')
node.setDate({ type: 'relative', mode: 'last', amount: 30, unit: 'day' })
```

### HavingNodeBuilder

```ts
node.getId()
node.getField()
node.getOperator() // → string
node.setOperator('>' | '<' | '>=' | '<=' | '=' | '!=')
node.getAggregate() // → { func: string; quantile?: number }
node.setAggregate({ func: 'sum' })
node.getValue()
node.setValue(5000)
```

---

## 3.5 Y.Map / Y.Doc Native Methods

```ts
// Read a value by path from Y.Map
builder.dsl.get('chartType') // → 'column'

// Mutate Y.Map directly (advanced usage)
builder.dsl.get('whereFilter').set('op', 'or')

// Batched Yjs transaction: merge multiple changes into a single undo/redo step
builder.doc.transact(() => {
  builder.dimensions.add('category')
  builder.measures.add('sales', (node) => {
    node.setAggregate({ func: 'sum' })
  })
  builder.chartType.changeChartType('column')
})

// Listen for Yjs document changes
builder.doc.on('update', () => {
  /* Configuration changed */
})
builder.dsl.observe((event) => {
  /* Y.Map change event */
})
```

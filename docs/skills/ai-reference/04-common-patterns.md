# 4. Common Intents -> Code Patterns

> Each intent includes an example user request and the corresponding code. All examples are based on `builder`, a `VBIChartBuilder` instance.

## 4.1 Create a Chart

**Q: "I want a column chart with category on the X axis and sales on the Y axis."**

```ts
builder.chartType.changeChartType('column')
builder.dimensions.add('category')
builder.measures.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
})
```

**Q: "Change the chart to a line chart."**

```ts
builder.chartType.changeChartType('line')
// The dimension/measure config stays unchanged, and encoding is remapped automatically.
```

**Q: "Switch to a pie chart so I can see category share."**

```ts
builder.chartType.changeChartType('pie')
```

## 4.2 Dimension Operations

**Q: "Aggregate by month."**

```ts
// Find the date dimension and update its aggregation.
const dateDim = builder.dimensions.find((n) => n.getField() === 'order_date')
dateDim?.setAggregate({ func: 'toMonth' })
```

**Q: "Aggregate by quarter."**

```ts
builder.dimensions.update('dimension-id-here', (node) => {
  node.setAggregate({ func: 'toQuarter' })
})
```

**Q: "Sort the dimension."**

```ts
builder.dimensions.update('dimension-id-here', (node) => {
  node.setSort({ order: 'desc' })
})
```

**Q: "Add a second dimension as a color grouping."**

```ts
builder.dimensions.add('region', (node) => {
  node.setEncoding('color')
})
```

## 4.3 Measure Operations

**Q: "Average sales instead of summing it."**

```ts
builder.measures.update('measure-id-here', (node) => {
  node.setAggregate({ func: 'avg' })
})
```

**Q: "Add a unit format to the measure."**

```ts
builder.measures.update('measure-id-here', (node) => {
  node.setFormat({ autoFormat: false, suffix: 'USD', decimalCount: 0 })
})
```

**Q: "Add a secondary Y-axis metric for a dual-axis chart."**

```ts
// First switch to a dual-axis chart.
builder.chartType.changeChartType('dualAxis')
// The first measure uses the primary Y axis.
builder.measures.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setEncoding('primaryYAxis')
})
// The second measure uses the secondary Y axis.
builder.measures.add('profit', (node) => {
  node.setAggregate({ func: 'avg' })
  node.setEncoding('secondaryYAxis')
})
```

## 4.4 Filters

**Q: "Only show data from the last 30 days."**

```ts
builder.whereFilter.add('order_date', (node) => {
  node.setOperator('date')
  node.setDate({
    type: 'relative',
    mode: 'last',
    amount: 30,
    unit: 'day',
  })
})
```

**Q: "Only show data from 2024."**

```ts
builder.whereFilter.add('order_date', (node) => {
  node.setOperator('date')
  node.setDate({
    type: 'period',
    unit: 'year',
    year: 2024,
  })
})
```

**Q: "Only show data for a specific category."**

```ts
builder.whereFilter.add('category', (node) => {
  node.setOperator('=')
  node.setValue('Electronics')
})
```

**Q: "Exclude some regions."**

```ts
builder.whereFilter.add('region', (node) => {
  node.setOperator('not in')
  node.setValue(['Northeast', 'Northwest'])
})
```

**Q: "Only show categories where sales are greater than 1000 (HAVING)."**

```ts
builder.havingFilter.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setOperator('>')
  node.setValue(1000)
})
```

**Q: "Combine HAVING conditions."**

```ts
builder.havingFilter.addGroup('and', (group) => {
  group.add('sales', (node) => {
    node.setAggregate({ func: 'sum' })
    node.setOperator('>')
    node.setValue(5000)
  })
  group.add('profit', (node) => {
    node.setAggregate({ func: 'avg' })
    node.setOperator('>=')
    node.setValue(200)
  })
})
```

## 4.5 Theme and Locale

**Q: "Switch to the dark theme."**

```ts
builder.theme.setTheme('dark')
```

**Q: "Switch to English."**

```ts
builder.locale.setLocale('en-US')
```

## 4.6 Undo/Redo

**Q: "Undo the last action."**

```ts
if (builder.undoManager.canUndo()) {
  builder.undoManager.undo()
}
```

**Q: "Redo the undone action."**

```ts
if (builder.undoManager.canRedo()) {
  builder.undoManager.redo()
}
```

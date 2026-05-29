# 6. useVBIMeasures — Measure Management

## Signature

```ts
const {
  measures, // VBIMeasure[]; current measure list
  addMeasure, // (field: string, callback?: (node) => void) => void
  updateMeasure, // (id: string, callback: (node) => void) => void
  removeMeasure, // (id: string) => void
  findMeasure, // (id: string) => node | undefined
} = useVBIMeasures(builder)
```

## Source

`practices/standard/src/hooks/useVBIMeasures.ts`

## Usage Examples

### Add a Measure

```ts
// Simple add (default sum aggregation)
addMeasure('sales')

// Configure alias, aggregation, encoding, and format when adding
addMeasure('profit', (node) => {
  node.setAlias('Profit')
  node.setAggregate({ func: 'avg' })
  node.setEncoding('yAxis')
  node.setFormat({ autoFormat: false, prefix: '$', decimalCount: 2 })
  node.setSort({ order: 'desc' })
})
```

### Update a Measure

```ts
updateMeasure(meaId, (node) => {
  node.setAlias('New Alias')
  node.setEncoding('size') // Change to size encoding
  node.setAggregate({ func: 'median' })
  node.setFormat({ autoFormat: false, suffix: 'USD', decimalCount: 0 })
  node.setSort({ order: 'desc' })
})
```

### Remove a Measure

```ts
removeMeasure(meaId)
```

### Find a Measure Node

```ts
const node = findMeasure(meaId)
if (node) {
  console.log(node.getField(), node.getEncoding(), node.getFormat())
}
```

---

## Available Node Methods (Inside Callbacks)

| Method                                   | Description                                                                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node.setAlias(alias)`                   | Sets the display alias                                                                                                                                                                         |
| `node.setEncoding(enc)`                  | Sets encoding: `yAxis`/`xAxis`/`primaryYAxis`/`secondaryYAxis`/`angle`/`radius`/`size`/`color`/`detail`/`column`/`label`/`tooltip`/`value`/`q1`/`q3`/`min`/`max`/`median`/`outliers`/`x0`/`x1` |
| `node.setAggregate({ func, quantile? })` | Sets aggregation: `sum`/`avg`/`count`/`countDistinct`/`min`/`max`/`median`/`stddev`/`variance`/`quantile`                                                                                      |
| `node.setFormat(cfg)`                    | Sets format: `{ autoFormat: true }` or `{ autoFormat: false, prefix, suffix, decimalCount, thousandsSeparator }`                                                                               |
| `node.setSort({ order })`                | Sets sorting: `asc`/`desc`                                                                                                                                                                     |
| `node.clearFormat()`                     | Clears format                                                                                                                                                                                  |
| `node.clearSort()`                       | Clears sorting                                                                                                                                                                                 |
| `node.getId()`                           | Gets the measure ID                                                                                                                                                                            |
| `node.getField()`                        | Gets the field name                                                                                                                                                                            |
| `node.getEncoding()`                     | Gets the current encoding                                                                                                                                                                      |
| `node.getFormat()`                       | Gets the current format config                                                                                                                                                                 |
| `node.getSort()`                         | Gets the current sort config                                                                                                                                                                   |

---

## Common Encoding Combinations

| Chart Type       | Common Encodings                                                  |
| ---------------- | ----------------------------------------------------------------- |
| Column/bar chart | `yAxis` (primary measure), `xAxis` (dimension)                    |
| Scatter chart    | `size` (measure), `color` (dimension)                             |
| Dual-axis chart  | `primaryYAxis` (first measure), `secondaryYAxis` (second measure) |
| Pie chart        | `angle` (measure), `color` (dimension)                            |
| Radar chart      | `size` (multiple measures)                                        |
| Box plot         | `q1`/`q3`/`min`/`max`/`median`/`outliers`                         |

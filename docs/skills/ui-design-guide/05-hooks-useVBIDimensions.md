# 5. useVBIDimensions — Dimension Management

## Signature

```ts
const {
  dimensions, // VBIDimension[]; current dimension list
  addDimension, // (field: string, callback?: (node) => void) => void
  updateDimension, // (id: string, callback: (node) => void) => void
  removeDimension, // (id: string) => void
  findDimension, // (id: string) => node | undefined
} = useVBIDimensions(builder)
```

## Source

`practices/standard/src/hooks/useVBIDimensions.ts`

## Usage Examples

### Add a Dimension

```ts
// Simple add (encoding and alias are inferred automatically)
addDimension('category')

// Configure alias, encoding, and sort when adding
addDimension('order_date', (node) => {
  node.setAlias('Order Date')
  node.setEncoding('xAxis')
  node.setAggregate({ func: 'toMonth' }) // Aggregate date dimensions with toMonth
  node.setSort({ order: 'desc' })
})
```

### Update a Dimension

```ts
updateDimension(dimId, (node) => {
  node.setAlias('New Alias')
  node.setEncoding('color')
  node.setAggregate({ func: 'toQuarter' })
  node.setSort({ order: 'asc' })
})
```

### Remove a Dimension

```ts
removeDimension(dimId)
```

### Find a Dimension Node

```ts
const node = findDimension(dimId)
if (node) {
  console.log(node.getField(), node.getEncoding())
}
```

---

## Available Node Methods (Inside Callbacks)

| Method                        | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `node.setAlias(alias)`        | Sets the display alias                                                                                |
| `node.setEncoding(enc)`       | Sets encoding: `xAxis`/`yAxis`/`color`/`detail`/`tooltip`/`label`/`row`/`column`/`player`/`hierarchy` |
| `node.setAggregate({ func })` | Sets date aggregation: `toYear`/`toQuarter`/`toMonth`/`toWeek`/`toDay`, etc.                          |
| `node.setSort({ order })`     | Sets sorting: `asc`/`desc`                                                                            |
| `node.clearAggregate()`       | Clears date aggregation                                                                               |
| `node.clearSort()`            | Clears sorting                                                                                        |
| `node.getId()`                | Gets the dimension ID                                                                                 |
| `node.getField()`             | Gets the field name                                                                                   |

---

## Notes

- All operations are wrapped with `builder.doc.transact()` and support undo/redo automatically.
- When adding date dimensions, set date aggregation (`toMonth`/`toYear`, etc.) unless no aggregation is intended.
- The `id` of each item in the `dimensions` array is used for update/remove/delete operations.

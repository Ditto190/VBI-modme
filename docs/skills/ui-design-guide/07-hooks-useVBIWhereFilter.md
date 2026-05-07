# 7. useVBIWhereFilter — WHERE Filters

WHERE filters are applied **before aggregation** and correspond to SQL WHERE clauses.

## Signature

```ts
const {
  filters, // VBIWhereClause[]; original nested condition tree
  flattenFilters, // () => VBIWhereFilter[]; flattens all leaf conditions
  addFilter, // (field: string, operator?: string, value?: unknown) => void
  addGroup, // (op: 'and'|'or', callback?: (group) => void) => void
  removeFilter, // (id: string) => void
  clearFilters, // () => void
  updateFilter, // (id: string, updates: { operator?, value? }) => void
  findFilter, // (id: string) => node | undefined
  updateGroup, // (id: string, updates: { operator?: 'and'|'or' }) => void
  addToGroup, // (groupId: string, field: string, operator?: string, value?: unknown) => void
  removeFromGroup, // (groupId: string, idOrIndex: string|number) => void
  findGroup, // (id: string) => node | undefined
} = useVBIWhereFilter(builder)
```

## Source

`practices/standard/src/hooks/useVBIWhereFilter.ts`

## Usage Examples

### Add a Filter Condition

```ts
// Equality filter
addFilter('region', '=', 'North China')

// Fuzzy search
addFilter('product_name', 'contains', 'phone')

// Range filter
addFilter('sales', '>', 1000)

// IN list
addFilter('category', 'in', ['Electronics', 'Apparel'])

// Relative date range (last 30 days)
addFilter('order_date', 'date', undefined) // Complex date structures must be set through the builder API
```

### Add a Nested Group

```ts
addGroup('and', (group) => {
  group.add('sales', (node) => {
    node.setOperator('>')
    node.setValue(1000)
  })
  group.add('profit', (node) => {
    node.setOperator('<')
    node.setValue(0)
  })
})
```

### Update a Filter Condition

```ts
updateFilter(filterId, {
  operator: '>=',
  value: 5000,
})
```

### Remove and Clear

```ts
removeFilter(filterId)
clearFilters()
```

### Add a Condition to a Nested Group

```ts
addToGroup(groupId, 'region', '=', 'East China')
```

### Flatten All Leaf Conditions

```ts
const flat = flattenFilters()
// flat: VBIWhereFilter[]; excludes nested groups
flat.forEach((f) => console.log(f.field, f.op, f.value))
```

---

## Operator Reference

| Operator     | Description           | Example Value                             |
| ------------ | --------------------- | ----------------------------------------- |
| `=`          | Equals                | `'North China'`                           |
| `!=`         | Not equals            | `'East China'`                            |
| `>`          | Greater than          | `1000`                                    |
| `<`          | Less than             | `5000`                                    |
| `>=`         | Greater than or equal | `0`                                       |
| `<=`         | Less than or equal    | `10000`                                   |
| `contains`   | Contains              | `'phone'`                                 |
| `startsWith` | Starts with           | `'Apple'`                                 |
| `endsWith`   | Ends with             | `'Pro'`                                   |
| `in`         | In list               | `['A', 'B', 'C']`                         |
| `not in`     | Not in list           | `['X', 'Y']`                              |
| `date`       | Date range            | Complex structure set through `setDate()` |

---

## Notes

- WHERE filters run **before** aggregation.
- Date filters must set relative/absolute date ranges through `builder.whereFilter.update(id, (node) => node.setDate(...))`.
- `flattenFilters()` returns a flat array of leaf nodes, which is suitable for list rendering.
- Nested group operators (`and`/`or`) must be updated with `updateGroup`.

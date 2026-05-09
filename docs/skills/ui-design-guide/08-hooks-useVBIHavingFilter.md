# 8. useVBIHavingFilter — HAVING Filters

HAVING filters are applied **after aggregation** and correspond to SQL HAVING clauses. They filter aggregated results, such as regions where total sales are greater than 5000.

## Signature

```ts
const {
  filters, // VBIHavingClause[]; nested condition tree
  addFilter, // (field: string, aggregate?: VBIHavingAggregate, operator?: string, value?: unknown) => void
  addGroup, // (op: 'and'|'or', callback?: (group) => void) => void
  removeFilter, // (id: string) => void
  clearFilters, // () => void
  updateFilter, // (id: string, updates: { aggregate?, operator?, value? }) => void
  findFilter, // (id: string) => node | undefined
} = useVBIHavingFilter(builder)
```

## Source

`practices/standard/src/hooks/useVBIHavingFilter.ts`

## Usage Examples

### Add a HAVING Condition

```ts
// Simple add (default operator and aggregate)
addFilter('sales', { func: 'sum' }, '>', 5000)

// Specify the aggregate function
addFilter('profit', { func: 'avg' }, '>=', 0)

// Specify only aggregation (defaults to > 0)
addFilter('order_count', { func: 'count' })
```

### Add a Nested Group

```ts
addGroup('and', (group) => {
  // You can continue calling builder.havingFilter.add(...) inside group
})
```

### Update a Filter Condition

```ts
updateFilter(filterId, {
  aggregate: { func: 'sum' },
  operator: '>=',
  value: 10000,
})
```

### Remove and Clear

```ts
removeFilter(filterId)
clearFilters()
```

### Find a Filter Node

```ts
const node = findFilter(filterId)
if (node) {
  console.log(node.getField(), node.getAggregate(), node.getOperator())
}
```

---

## HAVING vs WHERE

| Feature          | WHERE                        | HAVING                                  |
| ---------------- | ---------------------------- | --------------------------------------- |
| Execution timing | **Before** aggregation       | **After** aggregation                   |
| Available fields | Any source field             | Must be used with an aggregate function |
| Typical use case | Filter region to North China | Filter total sales > 5000               |

---

## Operator Reference

| Operator | Description           | Example Value |
| -------- | --------------------- | ------------- |
| `>`      | Greater than          | `5000`        |
| `<`      | Less than             | `1000`        |
| `>=`     | Greater than or equal | `0`           |
| `<=`     | Less than or equal    | `10000`       |
| `=`      | Equals                | `100`         |
| `!=`     | Not equals            | `50`          |

---

## Notes

- HAVING filters run **after** aggregation and are used to filter aggregated results.
- The `aggregate` parameter is `{ func: string; quantile?: number }`; common values include `sum`/`avg`/`count`/`countDistinct`/`min`/`max`/`median`.
- All operations are wrapped with `builder.doc.transact()` and support undo/redo automatically.

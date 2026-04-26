# Filters

- `whereFilter` filters raw rows before aggregation.
- `havingFilter` filters grouped values after aggregation.
- Having conditions should set aggregate metadata when filtering a measure.

Common operators:

- `==`, `!=`, `<`, `>`, `<=`, `>=`
- `contains`, `startsWith`, `in`, `between`

Example:

```js
b.whereFilter.add('region', (n) => {
  n.setOperator('==')
  n.setValue('East')
})

b.havingFilter.add('sales', (n) => {
  n.setAggregate({ func: 'sum' })
  n.setOperator('>')
  n.setValue(1000)
})
```

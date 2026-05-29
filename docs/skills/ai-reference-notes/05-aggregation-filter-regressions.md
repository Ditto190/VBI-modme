# 5. Aggregation and Filter Regression Notes

This note records implementation findings that should be preserved for future
agent-generated VBI UIs.

## Aggregate Changes Must Query Raw Rows

Symptom:

- `count` returns `1` for every group.
- `sum`, `avg`, `min`, `max`, and `median` all return the same value for each
  group.

Likely cause:

- The connector is querying a dataset that already contains grouped/aggregated
  rows instead of querying the original raw data source.

Correct rule:

- Keep raw data separate from query results.
- Never write `result.dataset` back into the connector's raw data source.
- When dataset source changes, recreate or refresh the VQuery dataset from raw
  rows.
- Every `query()` call must execute the current `queryDSL` from raw rows.

Implementation references:

- `practices/standard/src/utils/localConnector.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildSelect.ts`
- `packages/vquery/src/sql-builder/builders/select.ts`

## WHERE Multi-value Filters

VBI's WHERE pipeline maps array values to SQL `in` / `not in`.

Store UI `in` as:

```ts
node.setOperator('=')
node.setValue(['A', 'B'])
```

Store UI `not in` as:

```ts
node.setOperator('!=')
node.setValue(['A', 'B'])
```

Do not build SQL text in the UI.

## HAVING Aggregates

HAVING filters must always include an aggregate.

Dimension fields should usually expose only:

- `count`
- `countDistinct`

Measure fields may expose numeric aggregates such as:

- `sum`
- `avg`
- `min`
- `max`
- `median`
- `count`
- `countDistinct`

Implementation references:

- `practices/standard/src/components/Filter/havingFilterUtils.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildHaving.ts`
- `packages/vquery/src/sql-builder/builders/having.ts`

## UI Interaction Trap

Avoid wrapping a full filter slot that contains Antd `Select` controls in a
click-triggered `Popover`. Select dropdown focus can close the popover and clear
the draft before Apply.

Preferred patterns:

- Modal editor.
- Drawer editor.
- Inline editor below the slot.
- Popover attached only to a chip edit button.

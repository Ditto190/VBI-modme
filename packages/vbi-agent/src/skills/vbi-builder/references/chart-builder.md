# VBIChartBuilder

Use `VBIChartBuilder` for chart DSL changes. Open with `const c = await chart.open(id?)`.

Core methods:

- `build()` returns validated `VBIChartDSL`; `buildVQuery()` returns query DSL.
- `await buildVSeed(options?)` returns render DSL from current DSL, query DSL, and adapter.
- `getSchema()` reads schema from connector context; in CLI flows register the connector first through `workspace.connectors`; `isEmpty()` checks chart content.
- `getUUID()` returns resource uuid.
- `applyUpdate(update, origin?)` and `encodeStateAsUpdate(stateVector?)` sync Yjs state.

Chart type:

- `getChartType()` defaults to `table`.
- `changeChartType(type)` sets type and reapplies dimension/measure encodings.
- `getAvailableChartTypes()` lists chart types from `@visactor/vseed`.
- `getSupportedDimensionEncodings()`, `getSupportedMeasureEncodings()`, `getRecommendedDimensionEncodings(count?)`, `getRecommendedMeasureEncodings(count?)` help pick encodings.

Dimensions:

- `add(field, cb)` creates `{ id, field, alias: field, encoding }` with recommended encoding.
- `update(id, cb)` throws when id is missing; `remove(id)` is a no-op when missing.
- `find`, `findAll`, `toJSON`, `observe` are available.
- Node methods: `getId`, `getField`, `getEncoding`, `getSort`, `setAlias`, `setEncoding`, `setSort`, `setAggregate`, `clearSort`, `clearAggregate`, `toJSON`.
- Date aggregate funcs: `toYear`, `toQuarter`, `toMonth`, `toWeek`, `toDay`, `toHour`, `toMinute`, `toSecond`.

Measures:

- `add(field, cb)` creates `{ id, field, alias: field, encoding, aggregate: { func: 'sum' } }`.
- `update(id, cb)` throws when id is missing; `remove(id)` is a no-op when missing.
- `find`, `findAll`, `toJSON`, `observe` are available.
- Node methods: `getId`, `getField`, `getEncoding`, `getSort`, `getFormat`, `setAlias`, `setEncoding`, `setAggregate`, `setFormat`, `setSort`, `clearFormat`, `clearSort`, `toJSON`.
- Aggregate funcs: `sum`, `count`, `countDistinct`, `avg`, `min`, `max`, `variance`, `variancePop`, `stddev`, `median`, `quantile`; `quantile` may include `{ quantile: 0..1 }`.

Filters:

- `whereFilter` filters raw rows; `havingFilter` filters grouped values.
- Both support `add`, `addGroup`, `update`, `updateGroup`, `remove`, `find`, `clear`, `toJSON`, `observe`.
- `addGroup` and group `setOperator` accept `and` or `or`.
- `update` throws when id is missing or points to a group; `updateGroup` throws when id is missing or points to a leaf.
- `remove(idOrIndex)` removes nested matches by id; numeric remove applies to current collection.
- Where nodes: `setField`, `setOperator`, `setValue`, `setDate`, `getDate`, `toJSON`.
- Having nodes default to `aggregate: { func: 'sum' }` and support `setOperator`, `setValue`, `setAggregate`, `getAggregate`, `toJSON`.

Other builders and values:

- Theme defaults to `light`; locale defaults to `zh-CN`; limit is optional.
- `undoManager` supports `undo`, `redo`, `canUndo`, `canRedo`, `clear`.
- Dimension encodings include `xAxis`, `yAxis`, `color`, `detail`, `tooltip`, `label`, `row`, `column`, `hierarchy`, `angle`, `player`.
- Measure encodings include `primaryYAxis`, `secondaryYAxis`, `xAxis`, `yAxis`, `angle`, `radius`, `size`, `color`, `detail`, `column`, `label`, `tooltip`, `value`, `q1`, `q3`, `min`, `max`, `median`, `outliers`, `x0`, `x1`.
- DSL requires `connectorId`, `chartType`, `dimensions`, `measures`, `theme`, `locale`, and `version`; filters default to empty root groups.
- Always get ids from `find`, `findAll`, `toJSON`, or `build()` before `update` or `remove`.

## Examples

Create a bar chart:

```js
const c = await chart.open()
c.chartType.changeChartType('bar')
c.dimensions.add('region', (n) => n.setAlias('Region').setEncoding('yAxis'))
c.measures.add('sales', (n) => n.setAlias('Sales').setEncoding('xAxis').setAggregate({ func: 'sum' }))
c.whereFilter.add('region', (n) => n.setOperator('!=').setValue(''))
c.limit.setLimit(100)
return json({ chart: c.build(), query: c.buildVQuery() })
```

Update existing fields safely:

```js
const c = await chart.open()
const category = c.dimensions.find((n) => n.getField() === 'category')
assert(category, 'dimension "category" not found')
c.dimensions.update(category.getId(), (n) => n.setAlias('Category').setEncoding('xAxis').clearSort())
const revenue = c.measures.find((n) => n.getField() === 'revenue')
assert(revenue, 'measure "revenue" not found')
c.measures.update(revenue.getId(), (n) => n.setAlias('Revenue').setEncoding('yAxis').setAggregate({ func: 'sum' }))
return json({ chart: c.build() })
```

Use date filters:

```js
const c = await chart.open()
c.whereFilter.add('order_date', (n) => n.setDate({ type: 'relative', mode: 'last', amount: 30, unit: 'day' }))
return json({ whereFilter: c.whereFilter.toJSON() })
```

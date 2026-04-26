# Chart Builder API

Top-level builder members:

- `chartType`, `dimensions`, `measures`, `whereFilter`, `havingFilter`
- `theme`, `locale`, `limit`, `undoManager`
- `build()`, `buildVQuery()`, `buildVSeed(options?)`, `isEmpty()`, `getSchema()`

Chart types include `table`, `pivotTable`, `column`, `columnParallel`,
`columnPercent`, `line`, `area`, `areaPercent`, `bar`, `barParallel`,
`barPercent`, `pie`, `donut`, `scatter`, `heatmap`, `sunburst`, `treeMap`,
`funnel`, `boxplot`, `histogram`, `radar`, `rose`, `dualAxis`, and race charts.

Dimensions:

- `add(field, node => ...)`, `remove(id)`, `update(id, cb)`
- `find(p)`, `findAll()`, `toJSON()`
- Node setters: `setAlias`, `setEncoding`, `setSort`, `setAggregate`,
  `clearSort`, `clearAggregate`, `getId`
- Common encodings: `xAxis`, `yAxis`, `color`, `detail`, `tooltip`, `label`,
  `row`, `column`, `hierarchy`, `angle`, `player`

Measures:

- `add(field, node => ...)`, `remove(id)`, `update(id, cb)`
- `find(p)`, `findAll()`, `toJSON()`
- Node setters: `setAlias`, `setEncoding`, `setAggregate`, `setFormat`,
  `setSort`, `clearSort`, `clearFormat`, `getId`
- Aggregate funcs: `sum`, `count`, `countDistinct`, `avg`, `min`, `max`,
  `variance`, `variancePop`, `stddev`, `median`, `quantile`

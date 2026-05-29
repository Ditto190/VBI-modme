# 10. Builder 绘图正确性规则

生成 UI 时，不能只检查页面是否有字段面板和按钮。最终能否绘图，取决于
Builder、connector、query、VSeedRender 是否形成一致链路。

## 正确参考

优先参考这些 practice：

- `practices/professional`
- `practices/standard`
- `practices/streamlined`
- `practices/minimalist`

## 必须成立的链路

```text
schema field name
  -> builder.dimensions/measures.add(field)
  -> Builder node id
  -> buildVQuery() select alias
  -> connector.query(queryDSL)
  -> returned dataset column names
  -> VSeed dimensions/measures id
  -> VSeedRender
```

关键点：VBI 的 `buildVQuery()` 会把 select alias 写成 dimension / measure 节点
的 `id`。connector 返回的数据列名必须和这些 alias 对齐，否则 VSeed 里有
字段配置，但渲染层取不到数据。

## 禁止的坏写法

### 1. connector 直接返回原始数据

```ts
query: async () => {
  return { dataset: rawRows }
}
```

这通常是错的。原始数据列名一般是 `sales`、`category`，但 VSeed 需要的是
Builder 节点 `id`。

正确做法：

```ts
const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
return { dataset: result.dataset }
```

本地 JSON/CSV 上传场景还应参考 `standard` / `professional` 的
`normalizeDataset(queryDSL, result.dataset)`，确保数值列保持 number 类型。

### 2. 直接写 `builder.dsl`

```ts
builder.dsl.get('whereFilter').set('op', 'or')
```

默认不要这样写。Builder API 存在时必须使用 Builder API。直接写 Y.Map 容易绕过
id、encoding、aggregate、filter group 等结构约束。

只有在 reorder 这类没有公开 API 的局部场景，才可以参考 practice 内部工具函数
操作 Y.Array，并且要放在 `builder.doc.transact()` 里。

### 3. 添加字段但不设置适合当前图表的 encoding

```ts
builder.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
```

Builder 会给默认推荐 encoding，但完整 UI 更应该根据当前 chartType 的支持列表
显式写入：

```ts
const [encoding] = builder.chartType.getRecommendedMeasureEncodings(nextMeasureCount).slice(-1)
builder.measures.add('sales', (node) => node.setAlias('sales').setAggregate({ func: 'sum' }).setEncoding(encoding))
```

如果是 slot/drop UI，则必须使用 slot 上的 `dimensionEncoding` / `measureEncoding`。

### 4. 切换图表类型后不重新读取 DSL

`builder.chartType.changeChartType(type)` 会重新应用推荐 encoding。UI 切换图表类型后，
不能继续使用旧的本地 dimensions/measures 快照。store 必须监听 `builder.doc.on('update')`
并重新读取 `builder.build()`。

## VBI -> VQuery Pipeline Details

Agents should not guess the query shape. The source of truth is:

- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/index.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildSelect.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildGroupBy.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildWhere.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildHaving.ts`
- `packages/vquery/src/sql-builder/builders/select.ts`
- `packages/vquery/src/sql-builder/builders/where.ts`
- `packages/vquery/src/sql-builder/builders/having.ts`

Pipeline order:

```text
buildSelect -> buildGroupBy -> buildWhere -> buildHaving -> buildOrderBy -> buildLimit
```

Important behavior:

- Measures become VQuery select items with `field`, `alias: measure.id`, and
  `aggr: mapAggregateForVQuery(measure.aggregate)`.
- Dimensions become VQuery select items with `field`, `alias: dimension.id`, and
  optional date aggregate mapping.
- `groupBy` uses `dimension.field` for raw dimensions and `dimension.id` for
  aggregated date dimensions.
- VSeed later reads dataset columns by the node `id`; connector results must
  keep those aliases.

Aggregate mapping:

| VBI aggregate     | VQuery aggregate |
| ----------------- | ---------------- |
| `sum`             | `sum`            |
| `avg`             | `avg`            |
| `min`             | `min`            |
| `max`             | `max`            |
| `median`          | `median`         |
| `count`           | `count`          |
| `countDistinct`   | `count_distinct` |
| `variancePop`     | `variance_pop`   |
| `toDay` dimension | `to_day`         |

Aggregate correctness checks:

- Changing a measure aggregate must change `builder.buildVQuery().select[*].aggr`
  for that measure.
- The connector must run the new `queryDSL`; do not reuse the old VSeed or old
  query result.
- Queries must run on raw rows. If they run on a previously grouped dataset,
  `count` often becomes `1` and `sum` / `avg` / `min` / `max` all match the
  single grouped row.
- If multiple aggregate functions produce identical results, inspect the
  connector first, then inspect query alias normalization, then inspect
  VSeedRender cleanup.

## Filter Pipeline Details

WHERE multi-value filters should normally be stored as equality operators with
array values:

```ts
node.setOperator('=')
node.setValue(['A', 'B'])
```

`buildWhere.ts` maps array values from `=` to `in` and from `!=` to `not in`.
This is the practice-compatible path documented by `standard`.

HAVING filters must include `aggregate`; `buildHaving.ts` passes that aggregate
through `mapAggregateForVQuery()`, then `vquery` renders SQL such as:

```sql
sum("sales") > 100
count(distinct "customer_id") >= 10
```

Do not expose invalid aggregate choices in the UI. Dimensions should usually use
`count` or `countDistinct`; measures can expose numeric aggregates.

## 生成 UI 前的硬检查

- connectorId 与 `VBI.chart.createEmpty(connectorId)` 一致。
- `discoverSchema()` 返回的字段名和真实数据列名一致。
- 添加 dimension/measure 时使用 schema 中存在的 field。
- measure 必须有 aggregate，通常是 `{ func: 'sum' }`。
- dimension / measure encoding 必须来自当前 chartType 支持列表，或来自当前可见 slot。
- connector 必须执行 `queryDSL`，或者手动返回以节点 `id` 为列名的数据。
- `buildVSeed()` 前检查 `builder.isEmpty()`。
- 异步 `buildVSeed()` 返回后检查当前 builder 没有被替换。
- `VSeedRender` 必须注册 `registerAll()` 和 `register.chartModule('vchart', VChart)`。
- 每次重新渲染都要释放旧的 VChart/VTable 实例。

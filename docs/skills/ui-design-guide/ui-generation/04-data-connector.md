# 04. 数据加载和 Connector

Connector 是 VBI UI 的数据入口。Builder 只保存配置，真实 schema 和 query 通过 connector 完成。

## Connector 基本结构

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

const vquery = new VQuery()

VBI.registerConnector(connectorId, async () => ({
  discoverSchema: async () => schema,
  query: async ({ queryDSL, schema }) => {
    if (!(await vquery.hasDataset(connectorId))) {
      await vquery.createDataset(
        connectorId,
        schema as DatasetColumn[],
        { type: 'csv', rawDataset: url } as RawDatasetSource,
      )
    }
    const dataset = await vquery.connectDataset(connectorId)
    const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
    return { dataset: result.dataset }
  },
}))
```

这个示例的关键不是 `VQuery` 本身，而是必须执行 `queryDSL`。VBI 生成的 query
会把 select alias 写成 dimension / measure 的节点 `id`，VSeed 后续按这些 `id`
读取数据。直接返回原始数据会让字段名停留在原始列名上，常见结果是 builder
看起来有配置，但图表没有数据或无法绘制。

## UI 需要的数据能力

- `discoverSchema()`：返回字段列表，用于字段面板。
- `query()`：接收 `builder.buildVQuery()` 生成的 query DSL，返回 dataset。
- 数据源切换：更新本地数据，刷新 schema，清空 builder 选择项。
- schema 推断：CSV 上传时根据字段类型区分 dimension / measure。

## 模式一：Demo CSV URL

适合快速 demo。connector 中使用 `@visactor/vquery` 读取远程 CSV。

要点：

- `RawDatasetSource` 使用 `{ type: 'csv', rawDataset: url }`。
- schema 可以手写，避免推断不稳定。
- 第一次 query 时创建 dataset，后续复用。

参考：

- `practices/streamlined/src/utils/demoConnector.ts`
- `practices/standard/src/utils/localConnector.ts`

最小正确链路：

```ts
const queryResult = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
return { dataset: queryResult.dataset }
```

不要写成：

```ts
return { dataset: rawRows }
```

除非你已经把 `rawRows` 规范化成 queryDSL select alias 对应的列名。

## 模式二：本地 JSON / CSV 上传

适合完整 UI。

流程：

1. 用户上传 CSV。
2. 解析 header 和 rows。
3. 推断 schema，或使用显式 schema。
4. 调用 `setLocalDataWithSchema(data, schema)`。
5. 清空当前 builder selections。
6. 刷新字段列表。

示意：

```ts
const applyDataset = async (data, schema, sourceLabel) => {
  setLocalDataWithSchema(data, schema)
  clearBuilderSelections(builder)
  await refreshAvailableFields()
  setDataSourceLabel(sourceLabel)
}
```

## 清空 Builder 选择项

数据源变化后，旧字段可能不存在，必须清空配置：

```ts
builder.doc.transact(() => {
  builder.dimensions
    .toJSON()
    .toReversed()
    .forEach((item) => builder.dimensions.remove(item.id))
  builder.measures
    .toJSON()
    .toReversed()
    .forEach((item) => builder.measures.remove(item.id))
  builder.whereFilter.clear()
  builder.havingFilter.clear()
})
```

`reverse` 或 `toReversed` 很重要，因为 Yjs 删除数组项会影响后续 index。

## 字段角色推断

常用规则：

```ts
const role = field.type === 'number' ? 'measure' : 'dimension'
const isDate = ['date', 'datetime', 'timestamp'].includes(field.type)
```

UI 中应把字段转换为统一结构：

```ts
type SchemaField = {
  name: string
  type: string
  role: 'dimension' | 'measure'
  isDate: boolean
}
```

## Source-of-truth Query Rules From Code

The connector must always execute the current `queryDSL` against the original
raw data source, not against a previous query result. This matters for aggregate
changes. If a query runs on already-aggregated rows, `count` can become `1` per
group and `sum` / `avg` / `min` / `max` / `median` can all collapse to the same
single-row value.

Implementation references:

- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildSelect.ts`
- `packages/vbi/src/chart-builder/pipeline/vqueryDSL/buildGroupBy.ts`
- `packages/vquery/src/sql-builder/builders/select.ts`
- `practices/standard/src/utils/localConnector.ts`

For local JSON/CSV connectors, keep a separate raw-data variable and use that as
the VQuery dataset source. Never assign `result.dataset` back to the connector's
raw source.

```ts
let localData: Array<Record<string, string | number | boolean | null | undefined>> = []
let localSchema: DatasetColumn[] | null = null
let datasetNeedsRefresh = true

export function setLocalDataWithSchema(data: typeof localData, schema: DatasetColumn[] | null): void {
  localData = data
  localSchema = schema
  datasetNeedsRefresh = true
}

query: async ({ queryDSL, schema }) => {
  if ((await vquery.hasDataset(connectorId)) && datasetNeedsRefresh) {
    await vquery.dropDataset(connectorId)
  }

  if (!(await vquery.hasDataset(connectorId))) {
    await vquery.createDataset(
      connectorId,
      schema as DatasetColumn[],
      { rawDataset: localData, type: 'json' } as RawDatasetSource,
    )
    datasetNeedsRefresh = false
  }

  const dataset = await vquery.connectDataset(connectorId)
  const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
  return { dataset: normalizeDataset(queryDSL, result.dataset) }
}
```

For small demo connectors where correctness is more important than query setup
cost, it is acceptable to drop and recreate the VQuery dataset from raw data
inside `query()`. This guarantees every aggregate change starts from raw rows.

## Query Result Normalization

`buildVQuery()` writes select aliases as dimension/measure node `id` values. The
returned dataset must preserve those alias columns and numeric aggregate values.
Use the `standard` / `professional` `normalizeDataset(queryDSL, result.dataset)`
pattern when local JSON/CSV inputs can turn numbers into strings.

The implementation should:

- Read `queryDSL.select`.
- Separate dimension selects from measure selects by `item.aggr`.
- For measure aliases, coerce numeric-looking values back to `number`.
- Preserve dimension alias values.
- Return rows keyed by the alias (`item.alias ?? item.field`), not by display
  labels.

This is not optional for charts: VSeed reads values by VBI node `id`, not by raw
field names or aliases shown in the UI.

## 防错规则

- 本地 JSON 数据必须是扁平对象，值只允许 number/string/boolean/null/undefined。
- nested object 不适合作为 `RawDatasetSource.rawDataset`。
- query 返回 dataset 后，字段名必须与 VBI/VSeed 中 measures/dimensions 的节点 `id` 对齐。
- 对本地 JSON/CSV 上传，优先参考 `standard` / `professional` 的 `normalizeDataset(queryDSL, result.dataset)` 写法。
- 上传新数据后要刷新 schema，并清理旧字段配置。

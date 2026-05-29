# 06. Slot 和 Encoding 指南

Slot 是 UI 中“字段放到哪里”的表达，Encoding 是 VBI/VSeed 中“字段映射到哪个视觉通道”的表达。完整 UI 应让 slot 随图表类型变化。

## 为什么要动态 slot

不同图表支持的 encoding 不同：

- column：常见 `xAxis`、`yAxis`、`color`、`tooltip`。
- pie：常见 `angle`、`color`、`label`。
- scatter：常见 `xAxis`、`yAxis`、`size`、`color`。
- table / pivotTable：常见 `row`、`column`、`value`。

不要把所有 encoding 都展示出来。应该只展示当前 chartType 支持的 slot。

## 获取当前图表支持的 encoding

```ts
const dimensionEncodings = builder.chartType.getSupportedDimensionEncodings()
const measureEncodings = builder.chartType.getSupportedMeasureEncodings()
```

推荐添加字段时使用：

```ts
builder.chartType.getRecommendedDimensionEncodings(nextDimensionCount)
builder.chartType.getRecommendedMeasureEncodings(nextMeasureCount)
```

## Slot 定义

```ts
type FieldSlot = {
  accepts: Array<'dimension' | 'measure'>
  title: string
  dimensionEncoding?: VBIDimension['encoding']
  measureEncoding?: VBIMeasure['encoding']
}
```

基础 slot 列表可以包含所有候选 encoding：

```ts
const slots = [
  { dimensionEncoding: 'xAxis', measureEncoding: 'xAxis' },
  { dimensionEncoding: 'yAxis', measureEncoding: 'yAxis' },
  { measureEncoding: 'primaryYAxis' },
  { measureEncoding: 'secondaryYAxis' },
  { dimensionEncoding: 'angle', measureEncoding: 'angle' },
  { measureEncoding: 'radius' },
  { measureEncoding: 'size' },
  { measureEncoding: 'value' },
  { dimensionEncoding: 'color', measureEncoding: 'color' },
  { dimensionEncoding: 'tooltip', measureEncoding: 'tooltip' },
  { dimensionEncoding: 'label', measureEncoding: 'label' },
  { dimensionEncoding: 'row' },
  { dimensionEncoding: 'column', measureEncoding: 'column' },
]
```

## 过滤可见 slot

```ts
const getFieldSlots = (builder: VBIChartBuilder): FieldSlot[] => {
  const dimensionEncodings = builder.chartType.getSupportedDimensionEncodings()
  const measureEncodings = builder.chartType.getSupportedMeasureEncodings()

  return slots.flatMap((slot) => {
    const accepts = [
      ...(slot.dimensionEncoding && dimensionEncodings.includes(slot.dimensionEncoding) ? ['dimension' as const] : []),
      ...(slot.measureEncoding && measureEncodings.includes(slot.measureEncoding) ? ['measure' as const] : []),
    ]

    if (!accepts.length) return []

    return [
      {
        accepts,
        dimensionEncoding: accepts.includes('dimension') ? slot.dimensionEncoding : undefined,
        measureEncoding: accepts.includes('measure') ? slot.measureEncoding : undefined,
        title: getEncodingTitle(slot),
      },
    ]
  })
}
```

## 添加字段时的推荐 encoding

```ts
const addRecommendedField = (builder, dsl, field) => {
  if (field.role === 'measure') {
    const [encoding] = builder.chartType.getRecommendedMeasureEncodings(dsl.measures.length + 1).slice(-1)
    if (!encoding) return
    builder.measures.add(field.name, (node) =>
      node.setAlias(field.name).setAggregate({ func: 'sum' }).setEncoding(encoding),
    )
    return
  }

  const [encoding] = builder.chartType.getRecommendedDimensionEncodings(dsl.dimensions.length + 1).slice(-1)
  if (!encoding) return
  builder.dimensions.add(field.name, (node) => {
    node.setAlias(field.name).setEncoding(encoding)
    if (field.isDate) node.setAggregate({ func: 'toDay' })
  })
}
```

## Unmatched fields

切换图表类型后，已有字段可能使用了当前图表不展示的 encoding。不要直接删除它们。

推荐 UI：

- 支持的字段显示在对应 slot。
- 不支持或未匹配的字段显示在 `unmatched` 区域。
- 用户可以从 unmatched 区域移动到当前图表支持的 slot。

## 防错规则

- 切换 chartType 后，Builder 会重新应用推荐 encoding，但 UI 仍要能显示旧字段。
- slot 的 `accepts` 必须和当前图表支持的 encoding 对齐。
- measure 默认 aggregate 使用 `{ func: 'sum' }`。
- date dimension 可以默认 `{ func: 'toDay' }`，但应允许用户修改或清除。
- slot 标题应来自统一 mapping，不要在组件里散落硬编码。

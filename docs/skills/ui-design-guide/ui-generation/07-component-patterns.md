# 07. 组件模式

完整 VBI UI 的组件应该围绕“数据字段 -> 配置映射 -> 图表渲染”组织，而不是围绕营销型页面组织。

## 推荐顶层结构

```text
src/
  App/
  components/
    Editor/
    Fields/
    Config/
    Filter/
    Chart/
    Render/
  hooks/
  model/
  utils/
  config/
  styles/
```

## APP

责任：

- 接收 `builder`、`mode`、`theme`、`locale` 等 props。
- 挂载 `VBIStoreProvider`。
- 不直接放复杂业务 UI。

示意：

```tsx
export const APP = ({ builder, mode = 'edit', theme, locale }: APPProps) => (
  <VBIStoreProvider builder={builder} theme={theme} locale={locale}>
    <Editor builder={builder} mode={mode} />
  </VBIStoreProvider>
)
```

## Editor / Workbench

责任：

- 初始化 connector 和 store。
- 派生视图模型。
- 组织整体布局。

常见形态：

- `standard`：`FieldsPanel + ShelfPanel + ChartPanel`。
- `streamlined`：`FieldListPanel + ConfigPanel + ChartWorkspace`。
- `professional`：`LeftDataPanel + ChartWorkspace + ConfigOverlay`。

## Field Panel

责任：

- 展示 schema fields。
- 搜索字段。
- 按 dimension / measure 分组。
- 点击或拖拽字段到配置区。

字段结构建议：

```ts
type SchemaField = {
  name: string
  type: string
  role: 'dimension' | 'measure'
  isDate: boolean
}
```

UI 规则：

- dimensions 和 measures 使用不同颜色。
- 长字段名必须省略。
- 字段列表内部滚动，不撑高整个布局。
- 字段项可点击添加，也可拖拽。

## Config Panel / Shelves

两种主要形态：

### Shelves

适合 `standard` 类型 UI：

```text
Dimensions shelf
Measures shelf
WHERE shelf
HAVING shelf
```

每个 shelf 管理一组 token，token 支持：

- 删除；
- 重命名；
- encoding；
- aggregate；
- sort；
- format；
- 拖拽排序。

### Slot Config Panel

适合 `streamlined` / `professional` 类型 UI：

```text
Chart type
Encodings
Filters
Facet
Unmatched fields
```

slot 随 chartType 动态变化，更适合 agent 生成复杂配置面板。

## Filter UI

WHERE 和 HAVING 应分开建模：

- WHERE：过滤原始行。
- HAVING：过滤聚合结果。

推荐组件：

- `FilterPanel`
- `HavingFilterPanel`
- `FilterChip`
- `FilterModal`
- `RootOperatorControl`

规则：

- WHERE 的多选值使用 `op='=' + array`，让 VBI 自动转成 SQL `in`。
- HAVING 必须带 aggregate。
- UI 可以用 chip 展示已添加条件，用 modal/popover 编辑复杂条件。

### Filter Implementation Details

Use the implementation rules from:

- `practices/standard/src/components/Filter/whereFilterUtils.ts`
- `practices/standard/src/components/Filter/havingFilterUtils.ts`
- `practices/standard/src/components/Shelves/shelves/WhereShelf.tsx`
- `practices/standard/src/components/Shelves/shelves/HavingShelf.tsx`
- `practices/professional/src/components/Filter/`

Recommended UI model:

```ts
type FilterDraftValue = string | string[] | { min?: string; max?: string }
type FilterInputMode = 'none' | 'number' | 'range' | 'tags' | 'text'
type FilterDraft = {
  aggregate?: 'sum' | 'avg' | 'min' | 'max' | 'count' | 'countDistinct'
  field: SchemaField
  operator: string
  value: FilterDraftValue
}
```

Operator input modes:

| Operator                         | Input mode |
| -------------------------------- | ---------- |
| `is null`, `is not null`         | `none`     |
| `between`, `not between`         | `range`    |
| `in`, `not in`                   | `tags`     |
| numeric field or HAVING numeric  | `number`   |
| dimension/string field otherwise | `text`     |

Serialization rules:

- Empty string means `undefined`; do not write meaningless empty filters.
- `number` mode parses numeric strings into numbers.
- `tags` mode trims empty items and returns an array.
- `range` mode follows the target builder path: WHERE in `standard` uses
  `{ min, max, leftOp, rightOp }`; VQuery-style HAVING ranges use `[min, max]`.
- Disable Apply until the value is complete, except for `none` mode.

WHERE write rule:

```ts
builder.whereFilter.add(field.name, (node) => {
  node.setOperator(operator)
  if (value !== undefined) node.setValue(value)
})
```

For multi-value WHERE filters, store arrays with equality operators. VBI's
pipeline maps array values to SQL `in` / `not in`:

```ts
// UI operator "in"
node.setOperator('=')
node.setValue(['A', 'B'])

// UI operator "not in"
node.setOperator('!=')
node.setValue(['A', 'B'])
```

HAVING write rule:

```ts
builder.havingFilter.add(field.name, (node) => {
  node.setAggregate({ func: aggregate })
  node.setOperator(operator)
  if (value !== undefined) node.setValue(value)
})
```

HAVING aggregate restrictions:

- Measure fields may use `sum`, `avg`, `min`, `max`, `count`,
  `countDistinct`, `median`, and other VBI-supported measure aggregates.
- Dimension fields should default to `count` and usually expose only `count`
  and `countDistinct`; do not offer `sum` / `avg` for dimensions.
- `countDistinct` in VBI maps to `count_distinct` in VQuery.

Popover and Select interaction rule:

- Do not wrap an entire slot that contains an Antd `Select` in a click-triggered
  `Popover` if the popover closes on outside/open-state changes. The Select
  dropdown can steal focus and clear the draft before Apply.
- Prefer a modal, drawer, inline editor, or a popover attached only to an edit
  button/chip.

## Chart Toolbar

责任：

- chart type；
- undo/redo；
- theme；
- locale；
- row limit；
- fullscreen；
- config overlay 开关；
- 数据源入口。

推荐控件：

- chart type：`Select`、Popover grid 或 segmented/icon list。
- theme/locale：`Select` 或 `Segmented`。
- undo/redo/fullscreen：icon button。
- limit：`InputNumber`。

## Chart Workspace

责任：

- 放 toolbar。
- 放筛选条或配置入口。
- 管理 loading / empty / error 状态。
- 承载 `VSeedRender`。

规则：

- chart body 必须 `min-height: 0`，允许内部渲染器撑满。
- loading 用 overlay 或固定容器，不改变布局尺寸。
- empty 状态要告诉用户下一步：添加字段、加载数据、打开字段面板。

## Config Overlay

`professional` 的核心模式：

- 图表区域既是渲染区，也是配置入口。
- 空配置、拖拽中、手动打开配置时显示 overlay。
- overlay 中展示当前图表支持的 slots。
- unmatched fields 单独展示，不丢失已有配置。

适合产品级 UI，因为它减少右侧面板常驻占用，让图表成为主工作区。

## VSeedRender

责任只做一件事：把 VSeed 渲染到 DOM。

不要在 `VSeedRender` 中处理：

- 字段选择；
- filters UI；
- chart type 控制；
- store 初始化；
- schema 获取。

这些应放在上层组件。

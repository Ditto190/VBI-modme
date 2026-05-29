# 02. React 使用方式和适用位置

VBI UI 的 React 层有三种使用方式：完整 UI 的 practice-owned store/hooks、轻量集成的 `@visactor/vbi-react`、以及局部直接调用 Builder API。不要混用它们的职责。

## 1. 完整 UI：practice 自己的 Store + Hooks

完整编辑器优先使用这种模式：

```text
VBIStoreProvider
  -> useVBIStore()
  -> src/hooks
  -> UI components
  -> Builder API
  -> store 监听 builder.doc update
  -> buildVSeed()
  -> VSeedRender
```

适用场景：

- 完整 practice：`standard`、`streamlined`、`professional`。
- 需要统一管理 builder、dsl、schema、loading、vseed、initialized。
- 需要 undo/redo、theme、locale、limit、filters、drag/drop、schema refresh。
- 需要产品级 UI，而不是简单 demo。

推荐入口：

- `src/model/VBIStore.ts`
- `src/model/VBIStoreProvider.tsx`
- `src/hooks/index.ts`
- `src/components/Render/VSeedRender.tsx`

使用规则：

- 组件通过 `useVBIStore((s) => s.builder)` 获取 builder。
- UI 操作通过 practice hooks 或 Builder API 修改 builder。
- store 负责监听 `builder.doc.on('update')` 并重建 VSeed。
- 不跨 practice 导入 hooks、components、store。

## 2. 简单集成：`@visactor/vbi-react`

`@visactor/vbi-react` 适合轻量 starter 或包级集成，不适合作为完整产品 UI 的唯一来源。

hooks：

```ts
import {
  useVBI,
  useVSeed,
  useDimensions,
  useMeasures,
  useWhereFilter,
  useHavingFilter,
  useChartType,
  useTheme,
} from '@visactor/vbi-react'
```

components：

```ts
import {
  BuilderLayout,
  ChartRenderer,
  ChartTypeSelector,
  FieldPanel,
  FilterPanel,
  ThemeSelector,
} from '@visactor/vbi-react/components'
```

适用场景：

- `vbi-react-starter` 类型的低门槛 demo。
- 快速验证 Builder + VSeed + renderer 是否跑通。
- 需要基础字段面板、筛选面板、图表类型选择器、主题选择器。

边界：

- `ChartRenderer` 默认只展示 VSeed JSON，真正渲染图表必须传 `renderVSeed`。
- `FieldPanel` 和 `FilterPanel` 是基础控件，不等于完整产品 UI。
- 复杂 drag/drop、slot overlay、字段菜单、format/sort 面板，应参考 `professional` 自己实现。
- 不要把 `@visactor/vbi-react` hooks 和 practice 自己的 `src/hooks` 混用。

## 3. 局部动作：直接调用 Builder API

明确拥有 builder 的工具函数或按钮动作，可以直接调用 Builder API：

```ts
builder.doc.transact(() => {
  builder.chartType.changeChartType('column')
  builder.dimensions.add('category', (node) => node.setEncoding('xAxis'))
  builder.measures.add('sales', (node) => node.setAlias('Sales').setAggregate({ func: 'sum' }).setEncoding('yAxis'))
})
```

适用场景：

- 点击按钮自动生成推荐图表。
- 拖拽字段到 slot 后执行映射。
- 重置配置、清空筛选、切换数据源。
- agent script 或工具层操作。

规则：

- 多个相关修改用 `builder.doc.transact()` 包起来，保证 undo/redo 体验。
- 更新和删除前先通过 `find()`、`findAll()` 或 `toJSON()` 获取 id。
- Builder API 存在时，不直接写 `builder.dsl`。

## 4. 渲染层：React 只挂载容器

VSeed 不应该作为 JSX 直接渲染。正确边界是：

```text
React component
  -> ref DOM
  -> VSeedBuilder.from(vseed).build()
  -> new VChart / new PivotTable / new ListTable / new PivotChart
  -> cleanup release()
```

适用位置：

- `src/components/Render/VSeedRender.tsx`
- `ChartPanel`
- `ChartWorkspace`
- `ChartRenderer.renderVSeed`

规则：

- `VSeedRender` 每个 practice 自己实现。
- `useEffect` 依赖 `vseed` 和 `themeMode`。
- 每次渲染都清理旧实例。
- theme 要同时传给 Antd `ConfigProvider` 和 `VSeedBuilder.from({ ...vseed, theme })`。

## 5. 推荐组件分层

```text
APP
  -> Provider / initialization
  -> Workbench / EditorFrame
  -> Data panel
  -> Config panel or shelves
  -> Chart workspace
  -> VSeedRender
```

| 层级                     | 责任                                                     |
| ------------------------ | -------------------------------------------------------- |
| `APP`                    | 接收 props，挂 Provider，处理 mode/theme/locale 默认值。 |
| `Provider`               | 创建 store，保存 builder 和配置。                        |
| `Initialize hook`        | 初始化 connector、schema、builder listener。             |
| `Workbench`              | 组织整体布局。                                           |
| `Field panel`            | 展示 schema fields，触发添加字段。                       |
| `Config panel / shelves` | 管理 dimensions、measures、filters、encoding slots。     |
| `Chart workspace`        | 管理 toolbar、loading、empty、error、render surface。    |
| `VSeedRender`            | 把 VSeed 转为 VChart/VTable 实例。                       |

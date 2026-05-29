# 22. UI Skills 更新计划

> 这是一份用于更新 VBI UI 生成 skills 的草案。你先审阅这份计划，
> 确认方向后，我再按计划去正式改写更大范围的 skills 文档。

---

## 目标

让 skills 足够完整，使 agent 只看 skills 就能独立生成一份完整、可用的
VBI 图表构建器 UI。

最终 skills 应该教会 agent 组装完整产品闭环：

```text
connector / 数据加载
  -> VBIChartBuilder
  -> practice 自己的 store，或 vbi-react hooks
  -> 字段 / 配置 / 筛选 UI
  -> buildVSeed()
  -> VSeedRender
  -> VChart / VTable 渲染
```

---

## 已完成的文档修正

下面这些过期内容已经先修掉了：

- `@visactor/vbi-react` 已按当前源码记录为 8 个 hooks 和 6 个 components。
- vbi-react 的 components 改为从 `@visactor/vbi-react/components` 导入。
- `useTheme`、`ThemeSelector`、`FilterPanel` 已补进 vbi-react 文档。
- `useDimensions.updateDimension` 已按当前行为更新：支持 `alias`、`encoding`、`aggregate`，但不支持 `sort`。
- `VSeedRender` 的注册说明已修正：`registerAll` 来自 `@visactor/vseed`，再配合 `@visactor/vtable` 的 `register.chartModule('vchart', VChart)`。
- `VSeed` / `VSeedBuilder` 已改为记录来源于 `@visactor/vseed`。

---

## Practice 阅读总结

### minimalist

主要价值：最小但完整的编辑器。

模式：

- 固定尺寸的紧凑 app shell。
- 使用 `ConfigProvider` 包住整个应用。
- 一个左侧字段面板，一个 shelf 区域，一个图表区域。
- 用 CSS variables 定义明暗主题 token。
- 字段添加、删除、排序直接调用 Builder API。
- 适合作为“先完整跑通，再考虑精致度”的最小 UI 参考。

适合用在：

- 小型嵌入式图表构建器。
- “完整但紧凑”的基础实现。
- 理解字段列表 -> shelf -> 图表的直接流程。

### standard

主要价值：标准文件结构和组件分层。

模式：

- `VBIStoreProvider` 负责 builder / store 生命周期。
- `AppShell` 初始化 connector、store、theme、locale。
- 布局是 `FieldsPanel + ShelfPanel + ChartPanel`。
- `Toolbar` 负责图表类型、撤销/重做、locale、theme、limit、全屏。
- `ShelfPanel` 有四行：dimensions、measures、WHERE、HAVING。
- 通过 `theme.useToken()` 使用 Ant Design token，保证主题一致。

适合用在：

- 新建独立 practice 时的推荐结构。
- hooks / store / provider 约定。
- Antd 驱动的控制面板。

### streamlined

主要价值：清晰的三栏编辑器组合。

模式：

- `FieldListPanel`、`ConfigPanel`、`ChartWorkspace` 是 workbench 里的三个并列区域。
- `ConfigPanel` 把控制项分成可折叠区块：图表类型、编码、筛选、分面。
- 编码槽位由 `builder.chartType.getSupported*Encodings()` 动态生成。
- Chart workspace 负责 toolbar、loading/empty 状态、行数统计和渲染区域。
- CSS 按职责拆分：theme、layout、chart、toolbar、fields、controls、config、filters、tokens。

适合用在：

- 需要明确、易扫描的生成式 UI。
- 基于 slot 的配置面板。
- 学习“随图表类型变化的编码槽位”。

### professional

主要价值：最完整、最接近产品级的编辑器。

模式：

- `ProfessionalEditor` 把初始化、模型派生、外框、左侧数据面板、图表工作区分开。
- `useProfessionalEditorModel` 从 store / hooks 派生所有视图 props。
- `EditorFrame` 统一处理 theme、locale、fullscreen、mode class。
- 左侧是字段浏览器，图表区域是主要工作区。
- `ConfigOverlay` 在空状态、拖拽中、或手动打开配置时覆盖在图表上方。
- DnD、slot drop target、字段 token 菜单、筛选面板、图表 toolbar 都拆成专门模块。
- 主题同时使用 CSS variables 和 Antd `ConfigProvider` token。

适合用在：

- 完整 UI 的目标参考。
- 需要 overlay 配置、拖拽、撤销/重做、筛选、响应式 view/edit 模式的 agent 生成 UI。
- 查边界情况和真实 UI 行为的最佳源码参考。

### vbi-react-starter

主要价值：`@visactor/vbi-react` 包级集成示例。

模式：

- 使用 `@visactor/vbi-react` hooks 和 `@visactor/vbi-react/components`。
- 通过 `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`ThemeSelector`、`FilterPanel` 搭建编辑器。
- 自己实现了 `CompactFieldPanel`，因为包内置组件刻意保持轻量。
- 包含本地 connector、CSV 上传、schema 推断、状态 footer、debug state、响应式面板切换。

适合用在：

- 确认 vbi-react 的正确导入路径和组件 props。
- 低门槛集成路径。
- 理解包级组件能做到哪里，哪些还需要 app 自己补。

---

## 建议改写的 skills 内容

### 1. 新增一份“完整 UI 生成流程”文档

新增一个顶层指南，说明生成 UI 时必须按什么顺序搭建：

1. 注册或初始化 connector。
2. 创建或接收 `VBIChartBuilder`。
3. 创建应用状态：builder、DSL、schema、loading、VSeed。
4. 监听 `builder.doc.on('update')`。
5. 通过 `builder.buildVSeed()` 重建 VSeed。
6. 使用当前 practice 自己的 `VSeedRender` 渲染 VSeed。
7. 围绕 Builder API 搭建 UI 控件。

这份文档应该成为 agent 写 UI 前最先阅读的文档。

### 2. 按复杂度拆分 UI 模板

记录三类推荐模板：

- 最小模板：基于 `minimalist`。
- 标准模板：基于 `standard`。
- 产品级模板：基于 `professional`。

每个模板都应该包含：

- 文件夹结构；
- 状态模型；
- 组件关系图；
- 核心 imports；
- 必需文件；
- 应该自定义的地方；
- 不应该复制的地方。

### 3. 更新组件模式指南

重写 `18-component-patterns.md`，让它反映当前真实 practice：

- 字段浏览器 / 字段列表。
- mapping slots / shelves。
- 筛选 chips 和筛选 modal。
- 图表 toolbar。
- 配置 overlay。
- 图表 workspace。
- VSeedRender。
- empty / loading / error 状态。

它不应该再暗示 `standard` 的 shelf row 是唯一推荐 UI 形态。

### 4. 增加 VBI Store 和 React 状态决策指南

说明什么时候用哪种状态模式：

- practice 自己的 Zustand store：推荐用于完整 UI。
- `@visactor/vbi-react` hooks：适合 starter 或简单包级集成。
- 直接调用 Builder API：适合工具函数、一次性动作、agent script。

指南里应包含标准 store 字段：

```ts
builder
dsl
schema
loading
vseed
initialized
initialize()
```

也需要说明 `standard` 和 `vbi-react` 里的 cache / debounce 处理方式。

### 5. 增加 Slot / Encoding 指南

说明如何创建“随图表类型变化”的编码槽位：

- 调用 `builder.chartType.getSupportedDimensionEncodings()`；
- 调用 `builder.chartType.getSupportedMeasureEncodings()`；
- 只展示当前图表类型支持的槽位；
- 添加字段时使用推荐 encoding；
- 不支持当前槽位的字段仍然作为 unmatched token 保留可见。

主要参考：

- `practices/professional/src/config/slotConfig.ts`
- `practices/streamlined/src/components/Config/slotConfig.ts`
- `practices/professional/src/components/Editor/ConfigOverlay.tsx`

### 6. 增加数据加载和 Connector 指南

记录两类 app 层数据模式：

- demo CSV URL connector；
- 本地 JSON / CSV 上传，并带显式 schema。

指南应覆盖：

- `VBI.registerConnector`；
- `discoverSchema`；
- `query`；
- `setLocalDataWithSchema`；
- schema 推断；
- 数据源变更后清空 builder 选择项。

### 7. 增加 VSeedRender 强化指南

记录一份生产可用的 `VSeedRender`：

- 从 `@visactor/vseed` 调用 `registerAll()`；
- 调用 `register.chartModule('vchart', VChart)`；
- 按 `isPivotChart`、`isVChart`、`isTable`、`isPivotTable` 分流；
- 把当前 theme 传入 `VSeedBuilder.from({ ...vseed, theme })`；
- cleanup 时 release 图表 / 表格实例；
- 保持 full-height 响应式尺寸；
- 渲染失败时不要让整个 app 崩掉。

### 8. 增加 VBI Builder 的视觉设计规则

总结从 practices 里学到的设计模式：

- VBI 编辑器 UI 应该是高密度、偏操作型的，不应该像 landing page。
- 默认组合使用左侧字段面板 + 中央图表 workspace。
- 全局控制放在顶部 toolbar。
- 用 slots / shelves 表示字段到 encoding 的映射。
- 字段角色要有颜色区分：dimensions 和 measures 应明显不同。
- 控件要紧凑，高度稳定，面板内部滚动，不让整个布局跳动。
- CSS variables 和 Antd tokens 要一起使用。
- 图表 canvas 保持 full-height，避免层层嵌套卡片。
- 必须提供 empty、loading、error、no-data 状态。

### 9. 增加验证清单

生成 UI 后必须检查：

- TypeScript 通过。
- 没有跨 practice 导入。
- Builder API 存在时，不直接改原始 DSL。
- VSeedRender 会释放旧的 chart / table 实例。
- theme / locale 在 Antd 和 VSeed 两边保持一致。
- empty / loading 状态不会改变整体布局尺寸。
- 长字段名会省略显示，不撑破布局。
- 无数据、已加载数据、schema 变化后 UI 都能工作。

---

## React 使用方式和适用位置

### 1. 完整 UI：优先使用 practice 自己的 Store + Hooks

完整编辑器推荐采用这种方式：

```text
VBIStoreProvider
  -> useVBIStore()
  -> practice-owned hooks
  -> UI components
  -> Builder API
  -> store 监听 builder.doc update
  -> buildVSeed()
  -> VSeedRender
```

适用场景：

- `standard`、`streamlined`、`professional` 这种完整 practice。
- 需要统一管理 builder、dsl、schema、loading、vseed、initialized。
- 需要 undo/redo、theme、locale、limit、filters、drag/drop、schema refresh。
- 需要更强的 UI 自定义能力。

推荐入口：

- `src/model/VBIStore.ts`
- `src/model/VBIStoreProvider.tsx`
- `src/hooks/index.ts`
- `src/components/Render/VSeedRender.tsx`

使用规则：

- React 组件通过 `useVBIStore((s) => s.builder)` 获取 builder。
- UI 操作通过 practice hooks 或 Builder API 修改状态。
- store 负责监听 `builder.doc.on('update')` 并重建 VSeed。
- 不跨 practice 导入 hooks、components、store。

### 2. 简单集成：使用 `@visactor/vbi-react`

`@visactor/vbi-react` 适合轻量 starter 或包级集成，不适合作为完整产品 UI 的唯一来源。

可用 hooks：

```ts
useVBI(builder)
useVSeed(builder)
useDimensions(builder)
useMeasures(builder)
useWhereFilter(builder)
useHavingFilter(builder)
useChartType(builder)
useTheme(builder)
```

可用 components：

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
- 需要一个轻量的字段面板、筛选面板、图表类型选择器、主题选择器。

使用边界：

- `ChartRenderer` 默认只展示 VSeed JSON；真正渲染图表必须传 `renderVSeed`。
- `FieldPanel` 和 `FilterPanel` 是基础控件，不等于完整产品 UI。
- 如果需要复杂 drag/drop、slot overlay、字段菜单、format/sort 面板，应参考 `professional` 自己实现。
- 不要把 `@visactor/vbi-react` hooks 和 practice 自己的 `src/hooks` 混用。

### 3. 工具函数和按钮动作：可以直接调用 Builder API

在明确拥有 builder 的位置，可以直接调用 Builder API：

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

使用规则：

- 多个相关修改用 `builder.doc.transact()` 包起来，保证 undo/redo 体验。
- 更新和删除前先通过 `find()` / `toJSON()` 获取 id。
- 不直接写 `builder.dsl`，除非 Builder API 没有覆盖该能力。

### 4. 渲染层：React 只负责挂载容器，VSeedRender 负责实例生命周期

React 组件中不要直接把 VSeed 当作 JSX 渲染。正确做法是：

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

使用规则：

- `VSeedRender` 每个 practice 自己实现。
- `useEffect` 依赖 `vseed` 和 `themeMode`。
- 每次渲染都要清理旧实例。
- theme 要同时传给 Antd `ConfigProvider` 和 `VSeedBuilder.from({ ...vseed, theme })`。

### 5. React 组件应该如何分层

推荐分层：

```text
APP
  -> Provider / initialization
  -> Workbench / EditorFrame
  -> Data panel
  -> Config panel or shelves
  -> Chart workspace
  -> VSeedRender
```

各层职责：

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

---

## 建议改动文件

| 文件                                | 动作                                                               |
| ----------------------------------- | ------------------------------------------------------------------ |
| `00-overview.md`                    | 增加完整 UI 生成的阅读顺序。                                       |
| `01-folder-structure.md`            | 增加 standard / product 模板的完整 UI 文件结构。                   |
| `04-hooks-overview.md`              | 用当前包 API 重新说明 practice hooks 和 vbi-react hooks 的区别。   |
| `14-vseed-render.md`                | 扩展成更完整、更可靠的 VSeedRender 实现指南。                      |
| `15-vbi-store.md`                   | 加入 professional / streamlined 两种 store 变体。                  |
| `17-demo-connector.md`              | 加入 CSV URL 和本地上传两种模式。                                  |
| `18-component-patterns.md`          | 围绕字段浏览器、slots/shelves、filters、toolbar、workspace 重写。  |
| `19-ui-considerations.md`           | 增加布局、token、loading/empty/error、响应式、字段角色颜色等规则。 |
| `20-practices-reference.md`         | 更新各 practice 的参考价值，补充 minimalist 和设计模式总结。       |
| 新增 `23-react-usage.md`            | 添加 React 使用方式、适用场景、组件分层和 vbi-react 边界。         |
| 新增 `22-complete-ui-generation.md` | 添加 agent 生成完整 UI 的主 playbook。                             |

---

## 建议执行顺序

1. 更新参考索引和阅读顺序。
2. 重写完整 UI 生成流程。
3. 更新 store、connector、VSeedRender 文档。
4. 重写组件模式和视觉设计模式文档。
5. 增加一个 compact starter 模板和一个 product 模板。
6. 如果仓库有 Markdown 格式化 / 检查命令，就运行一遍。
7. 最后对照源码再检查一遍，移除所有过期 API 说法。

---

## 已开始落地的文档

当前已新增 `ui-generation/` 子目录，用来承载完整 UI 生成的主指南：

- `ui-generation/README.md`
- `ui-generation/01-complete-flow.md`
- `ui-generation/02-react-usage.md`
- `ui-generation/03-state-store.md`
- `ui-generation/04-data-connector.md`
- `ui-generation/05-vseed-render.md`
- `ui-generation/06-slot-encoding.md`
- `ui-generation/07-component-patterns.md`
- `ui-generation/08-visual-design.md`
- `ui-generation/09-validation-checklist.md`
- `ui-generation/10-builder-correctness.md`
- `ui-generation/templates/compact-template.md`
- `ui-generation/templates/standard-template.md`
- `ui-generation/templates/product-template.md`

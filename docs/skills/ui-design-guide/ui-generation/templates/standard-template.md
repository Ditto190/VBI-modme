# Standard 模板

参考：`practices/standard`

适合大多数新 practice。它的价值是结构稳定、组件边界清晰、方便维护。

## 文件结构

```text
src/
  App/
    App.tsx
    app.css
    components/
      ChartPanel.tsx
      FieldsPanel.tsx
      ShelfPanel.tsx
      ShelfRow.tsx
      ViewPanel.tsx
  components/
    ChartType/
    CSVModal/
    Fields/
    Filter/
    Render/
    Shelves/
    Toolbar/
  hooks/
    useBuilderDocState.ts
    useConfiguredVSeed.ts
    useVBIBuilder.ts
    useVBIChartType.ts
    useVBIDimensions.ts
    useVBIMeasures.ts
    useVBIWhereFilter.ts
    useVBIHavingFilter.ts
    useVBISchemaFields.ts
    useVBIUndoManager.ts
    index.ts
  model/
    VBIStore.ts
    VBIStoreProvider.tsx
    index.ts
  utils/
    localConnector.ts
    dataset.ts
    fieldRole.ts
    parseCsv.ts
  i18n/
  constants/
```

## 组件组合

```text
APP
  -> VBIStoreProvider
  -> AppShell
  -> ConfigProvider
  -> Toolbar
  -> FieldsPanel
  -> ShelfPanel
      -> DimensionShelf
      -> MeasureShelf
      -> WhereShelf
      -> HavingShelf
  -> ChartPanel
  -> VSeedRender
```

## 推荐特点

- 适合作为新的独立 practice 基线。
- hooks 包装 Builder API，组件不直接处理 Yjs。
- ShelfRow 统一 dimensions / measures / where / having 的显示结构。
- Toolbar 管理全局配置。
- ChartPanel 管理 loading / empty / VSeedRender。

## 适合 agent 生成时采用

- 用户要完整但不过度复杂的 UI。
- 需要标准化目录和可维护组件。
- 需要 i18n、theme、locale、limit、undo/redo。

## 注意

- 不要跨 practice 复制 import 路径。
- 如果要实现复杂 slot overlay，参考 product 模板而不是强行塞进 ShelfPanel。

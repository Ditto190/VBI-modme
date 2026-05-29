# Compact 模板

参考：`practices/minimalist`

适合小型嵌入式场景。目标是最少结构跑通完整闭环。

## 文件结构

```text
src/
  App/
    App.tsx
    app.css
  components/
    Toolbar.tsx
    FieldPanel.tsx
    FieldGroup.tsx
    ShelfPanel.tsx
    ShelfToken.tsx
    FilterPanel.tsx
    ChartBody.tsx
    Render/
      VSeedRender.tsx
      index.ts
  config/
    theme.ts
    labels.ts
    aggregates.ts
  constants/
    builder.ts
  hooks/
    useFullscreen.ts
  model/
    VBIStore.ts
    VBIStoreProvider.tsx
    index.ts
  utils/
    demoConnector.ts
    fields.ts
    filter.ts
    limit.ts
  types.ts
```

## 组件组合

```text
APP
  -> VBIStoreProvider
  -> ConfigProvider
  -> Toolbar
  -> FieldPanel
  -> ShelfPanel
  -> FilterPanel
  -> ChartBody
  -> VSeedRender
```

## 推荐特点

- 使用 CSS variables 控制主题。
- 左侧字段面板固定宽度。
- shelf 只保留核心 dimensions / measures。
- 图表区域占剩余空间。
- 控件使用 Antd small size。

## 适合 agent 生成时采用

- 用户只要求一个可用编辑器。
- 页面空间有限。
- 不需要复杂 overlay、slot 拖拽、字段菜单。

## 不适合

- 复杂产品工作台。
- 多数据源管理。
- 完整 field token 菜单、format/sort 配置。

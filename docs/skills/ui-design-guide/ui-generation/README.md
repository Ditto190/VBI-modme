# VBI 完整 UI 生成指南

这组文档是给 agent 生成完整 VBI UI 时优先阅读的主入口。旧的编号文档继续保留，用于查询具体 API；这里负责把“如何组装一份完整 UI”讲清楚。

## 推荐阅读顺序

1. [01-complete-flow.md](./01-complete-flow.md)：完整 UI 的总流程。
2. [02-react-usage.md](./02-react-usage.md)：React 使用方式、hooks/store/vbi-react 的边界。
3. [03-state-store.md](./03-state-store.md)：完整 UI 推荐的 store 模型。
4. [04-data-connector.md](./04-data-connector.md)：connector、schema、数据加载模式。
5. [05-vseed-render.md](./05-vseed-render.md)：VSeedRender 渲染层实现规则。
6. [06-slot-encoding.md](./06-slot-encoding.md)：随图表类型变化的 encoding slot。
7. [07-component-patterns.md](./07-component-patterns.md)：组件分层和核心 UI 组件。
8. [08-visual-design.md](./08-visual-design.md)：VBI builder 的视觉设计规则。
9. [09-validation-checklist.md](./09-validation-checklist.md)：生成 UI 后的检查清单。
10. [10-builder-correctness.md](./10-builder-correctness.md)：避免生成不能绘图的坏 builder。

## 模板

- [templates/compact-template.md](./templates/compact-template.md)：紧凑最小模板，参考 `minimalist`。
- [templates/standard-template.md](./templates/standard-template.md)：标准结构模板，参考 `standard`。
- [templates/product-template.md](./templates/product-template.md)：产品级模板，参考 `professional`。

## 正确 UI 参考范围

- 主要参考：`practices/professional`、`practices/standard`。
- 辅助参考：`practices/streamlined`、`practices/minimalist`。
- 轻量 React 包参考：`practices/vbi-react-starter`，只用于理解 `@visactor/vbi-react` 的 hooks/components 边界。

## 使用原则

- 完整 UI 优先参考 `professional` 和 `standard`，不要只依赖 `@visactor/vbi-react` 的基础组件。
- 每个 practice 必须独立实现自己的 store、hooks、VSeedRender 和组件，不跨 practice 导入。
- UI 只通过 Builder API 修改配置；除非确实没有公开 API，否则不直接写 `builder.dsl`。
- `VSeedRender` 是当前 practice 自己的渲染边界，不从其他 practice 复制路径导入。
- 生成 UI 时必须包含数据加载、字段选择、配置映射、筛选、图表渲染、loading/empty/error 状态。

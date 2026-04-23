# ADR: packages/vbi report 资源引用模型

## Summary

基于当前实现，`packages/vbi` 中的 report 已经落成“结构资源”而不是“内容容器”：

- `report` 只保存 page 结构与资源引用
- `chart` 与 `insight` 作为独立资源创建和维护
- `createVBI()` 维护实例级 `ResourceRegistry`
- `reportBuilder.build()` 返回结构 DSL
- `reportBuilder.snapshot()` 在本地聚合完整闭包

这让 `packages/vbi` 的 DSL 边界与后续前后端资源模型保持一致。

## Decision

### 1. Report page 只保存引用

当前实现中的 `VBIReportPageDSL` 为：

```ts
type VBIReportPageDSL = {
  id: string
  title: string
  chartId?: string
  insightId?: string
}
```

规范化后默认值为空字符串，`report` 本身不再内嵌 chart 或 text 内容。

对应实现：

- `packages/vbi/src/types/reportDSL/page.ts`
- `packages/vbi/src/vbi/create-empty-report-page.ts`

### 2. Insight 成为一等资源

当前实现已新增独立的 `VBIInsightDSL`、empty helper 与 builder 入口：

- `createEmptyInsight()`
- `createInsight(...)`
- `VBIInsightBuilder`

对应实现：

- `packages/vbi/src/types/insightDSL/insight.ts`
- `packages/vbi/src/vbi/create-empty-insight.ts`
- `packages/vbi/src/insight-builder/builder.ts`

### 3. createVBI 维护实例级资源注册表

当前 `createVBI()` 为每个实例创建独立 `ResourceRegistry`，并在资源创建时注册：

- `createChart(...)` 注册 chart builder
- `createInsight(...)` 注册 insight builder
- `createReport(...)` 共享该 registry，但不把 report 本身注册进去

当前 registry 只覆盖 report 快照和页面引用真正需要的资源：

```ts
type VBIResourceRegistry = {
  charts: Map<string, VBIChartBuilder | VBIChartDSL>
  insights: Map<string, VBIInsightBuilder | VBIInsightDSL>
}
```

对应实现：

- `packages/vbi/src/vbi/create-vbi.ts`
- `packages/vbi/src/vbi/resources/resource-registry.ts`

### 4. ReportBuilder 分离结构构建与聚合快照

当前实现把 report 的两个出口明确拆开：

- `build()` 只返回 `VBIReportDSL`
- `snapshot()` 返回 `VBIReportSnapshotDSL = { report, charts, insights }`

`snapshot()` 的行为约束：

- 只遍历 report page 上出现的 `chartId` / `insightId`
- 只从当前实例的 registry 聚合资源
- 不触发业务层 IO
- 缺失引用时直接抛错，避免产出不完整快照

对应实现：

- `packages/vbi/src/report-builder/builder.ts`
- `packages/vbi/src/report-builder/modules/build-snapshot.ts`

### 5. Report page builder 只操作引用，并支持懒解析

当前 page builder 只暴露结构与引用相关能力：

- `setTitle(...)`
- `setChartId(...)`
- `setInsightId(...)`

其中 `setChartId` / `setInsightId` 既可接收字符串，也可接收具备 `getUUID()` 的 builder。

同时，page builder 提供：

- `page.chart`
- `page.insight`

它们会通过 registry 懒解析 builder；若 registry 中暂存的是原始 DSL，会在访问时补建 builder 并回填 registry。

对应实现：

- `packages/vbi/src/report-builder/features/page/page-builder.ts`
- `packages/vbi/src/vbi/resources/resource-registry.ts`

## Consequences

收益：

- report / chart / insight 的职责边界清晰
- report DSL 可以稳定作为结构事实源
- 同一 chart / insight 可以被多个 report page 引用
- `snapshot()` 可作为纯 DSL 层导出闭包的统一出口

约束：

- `snapshot()` 依赖同一个 `createVBI()` 实例内的 registry
- 跨实例只传 `report DSL` 时，无法自动补齐未注册的资源
- 缺失引用会在 `snapshot()` 时失败，而不是静默跳过

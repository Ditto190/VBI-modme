# ADR: standard-report 重构为资源编排壳层

## Summary

`practices/standard-report` 不再直接编辑内嵌在 report 内的 chart / insight 内容，而是只负责 report page 容器和子资源编排。

## Decision

### 1. 入口改为 `reportBuilder + resourceGateway`

`standard-report` 的公共入口显式依赖：

- `reportBuilder`
- `resourceGateway`

其中 `resourceGateway` 至少提供：

- `openChart(chartId)`
- `openInsight(insightId)`
- `createChart()`
- `createInsight()`
- `resolveReference(ids)`

同时还需要接入 report 结构编排能力，用于：

- `createPage(...)`
- `removePage(...)`
- `updatePage(...)`
- `reorderPages(...)`
- `bindPageResource(...)`

### 2. page 只保存资源引用

page 内图表区和洞察区都通过引用资源渲染和编辑：

- 图表体验继续复用 standard
- insight 通过独立资源编辑器或只读视图接入

### 3. page 生命周期只改 report 结构

- 新增 page: 先调用后端创建 page，再决定新建资源还是绑定已有资源
- 删除 page: 先调用后端删除 page，再同步本地 report 结构投影
- 切换 page: 按需加载当前活跃 page 的子资源

`standard-report` 不再把本地 report builder 当作 page 结构事实源，它只消费后端成功返回后的最新结构。

## Consequences

优点：

- `standard-report` 职责边界清晰
- 子资源复用能力成立
- chart 体验继续以 standard 为唯一来源
- report 结构与数据库事实源保持一致

代价：

- 需要改造现有 preview / editor 绑定方式
- page 生命周期动作需要显式接后端编排接口

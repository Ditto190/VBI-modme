# ADR: Report Detail 页面改造为滚动式双向布局

## Summary

`vbi_fe` 的 Report Detail 页面将从当前页面式交互重构为“滚动编排”模型：核心展示采用纵向分页堆叠，支持按需切换横向滚动模式；左侧目录与页面内容建立联动，滚动时自动激活当前页目录项；每页聚焦最少单元（1 个 report + 1 个 insight），并在 report/insight hover 时提供一致的工具栏编辑入口。

## Context

当前 Report Detail 页面缺少以下能力：

- 页面间连续滚动阅读体验。
- 目录与页面浏览位置强绑定，滚动后高亮错位。
- 横向浏览模式缺失（部分用户场景需要沿水平方向逐页滑动）。
- 单页内容承载边界不稳定，存在 report 与 insight 混排行为。
- report 与 insight 上缺少就近编辑入口。

## Decision

### 1. 采用“报告内容区双模式滚动容器”

`ReportDetailPage` 使用统一容器组件承载页面集合，默认使用纵向滚动模式。

- 纵向模式：`flex-col + overflow-y-auto` 的逐页堆叠容器。
- 横向模式：切换后使用 `flex-row + overflow-x-auto` 的横向排列。
- 两种模式共享同一 page model 与锚点索引，保证行为一致。

### 2. 页面与左侧目录建立双向同步机制

- 页面节点统一挂载稳定 `pageId`。
- 使用 `IntersectionObserver` 监听页面可见度，滚动时更新左侧目录 active 状态。
- 目录点击通过锚点定位到目标页面（`scrollIntoView`），并强制同步 active。
- 活动态在纵向与横向模式下保持同一 source of truth。

### 3. 固化每页内容结构

每页仅承载：

- `report`（固定高度，固定为页面容器主显示高度）
- `insight`（根据内容高度自适应）

规则：

- 每页最多一个 `report`。
- 每页最多一个 `insight`。

此约束降低布局复杂性，并让目录语义映射到 page 粒度。

### 4. 左侧目录功能保持不变并增强定位能力

- 保留目录展现、层级和交互策略。
- 仅增强“跳转行为”：点击目录项跳转对应 page，滚动后回填对应 active。
- 保持现有菜单权限与筛选逻辑不变。

### 5. 增加悬浮工具栏以提升编辑入口就近化

- 在 report/insight 卡片 hover 时，在右上角显示 toolbar。
- toolbar 提供 `edit` 等核心动作（与当前编辑流一致）。
- 不改变 report/insight 的持久化模型，仅复用现有编辑协议。

## Consequences

### 正向影响

- 用户阅读体验统一：页面更符合“文档式长页面”与“章节导航”预期。
- 右侧内容与左侧目录建立确定同步路径，避免内容跳转与高亮错位。
- 布局边界清晰：单页结构受控，减少复杂组合布局引入的回归。
- 编辑动作从全局菜单下沉到内容卡片，降低找对目标元素成本。

### 风险与对策

- 横向滚动与右侧工具栏 hover 可能带来滚动事件/鼠标交互噪声：使用统一滚动状态管理与节流更新。
- 长列表页面性能与 observer 内存压力：采用按需注册 observer 与合理阈值，避免全局高频回调。
- 兼容性风险：保留现有左侧菜单交互，逐步替换内容层样式，避免一次性大改。

## Assumptions

- 左侧目录已有稳定 pageId 与标题映射。
- `report` 与 `insight` 都已有独立的编辑入口与能力。
- 现有 report/insight 的渲染能力支持在固定容器内完整展示，并能适配 hover 交互。

## Migration Plan

1. 梳理现有 `Report Detail` 的页面数据模型，明确 pageId、目录索引、report/insight 映射。
2. 落地双模式容器基础实现（默认纵向，支持横向切换）。
3. 接入页面与目录双向同步，优先保证目录跳转正确。
4. 实施页面内容规范：每页最多 1 report 与 1 insight，report 固高 + insight 自适应。
5. 在 report/insight 卡片添加 hover toolbar。
6. 完成兼容性回归：菜单功能、现有权限与数据状态不受影响。
7. 补充可视化验收：页面滚动、目录同步、横向切换、hover toolbar 覆盖场景验证。

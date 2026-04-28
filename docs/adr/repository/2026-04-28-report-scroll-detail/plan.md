# Plan: Report Detail 页面滚动式改造执行计划

> 基于 [`./adr.md`](./adr.md)
> 本文件用于指导 `vbi_fe` Report Detail 页的落地执行。

## 目标

1. 将 Report Detail 页面改造为纵向滚动展示主线，并保留横向滚动切换。
2. 实现滚动驱动目录联动：滚动时高亮左侧目录，目录跳转可精确定位目标 page。
3. 强化页面结构约束：每页最多 1 个 report 与 1 个 insight，report 固定高度，insight 依据内容自适应。
4. 保持左侧目录功能不变，只增强“点击定位”能力。
5. 在 report / insight hover 时显示右上角 toolbar，并提供编辑入口。

## 范围

包含：`apps/vbi_fe` Report Detail 页、相关目录与滚动交互、report/insight hover toolbar。

不包含：

- `apps/vbi_be` 数据模型与 API 改造（本计划不修改持久化语义）。
- insight 编辑器本体重构（仅复用现有编辑逻辑）。
- 与 report 根因模型相关的后端资源关系重构。

## 坏味道扫描

1. 左右区域耦合：当前目录与内容定位边界模糊，滚动与点击同步逻辑散落在多个 handler。
2. 页面结构无统一约束：不同页面对 report / insight 的组合规则不一致，排版容易漂移。
3. hover 编辑入口分散：编辑入口依赖全局菜单，内容内缺少就近操作。
4. 滚动模式切换可配置性不足：纵向与横向没有共享状态与入口。

## 开发原则

### 单一滚动源

所有导航与定位行为以统一的 page 列表 state 驱动，避免每个组件维护独立活动索引。

### 可达性优先

目录点击与滚动同步均有明确可回退行为：点击后可定位 page，滚动后可更新目录。

### 局部编辑入口就近化

report 与 insight 的 toolbar 均以内嵌 hover 机制呈现，编辑动作与当前内容区域语义一致。

### 回退友好

横向模式作为布局变体，不影响纵向主流程；切换后保持 active page 的一致性。

## 执行顺序

1. 内容模型整理：定义 page 数据模型、report/insight 容器约束与 page id。
2. 纵向滚动容器落地：先完成主要展示流（默认纵向）。
3. 横向模式接入：复用同一 page 索引与目录映射。
4. 目录联动：接入 `IntersectionObserver` + 点击定位。
5. hover toolbar：在 report/insight 卡片上补齐编辑入口。
6. 兼容回归与验收。

## 执行清单

### Step 1: 建立页面骨架与状态模型

完成定义：

- 定义 page 列表 model（包含 `id/title/reportId/insightId`）。
- 确定 `activePageId` / `activePageIndex` 及 `viewMode`（`vertical | horizontal`）的 source of truth。
- 拆分目录组件与内容容器组件，建立稳定 prop 和回调接口。

阻塞项：无

### Step 2: 实现纵向滚动主流程

完成定义：

- 内容区域改为纵向分页容器，支持整页顺序渲染。
- 每页渲染约束：`
  - report 容器固定高度（与页面视觉基准一致）；
  - insight 容器按内容高度增长；
  - 单页最多 1 个 report 与 1 个 insight。
- 提供 page 锚点能力（`ref` + `dataset` + pageId）。

阻塞项：Step 1

### Step 3: 实现横向模式

完成定义：

- 增加视图模式开关，横向时改为行向排列并保留滑动体验。
- 复用同一 page 渲染组件和 anchor 映射。
- 目录 active 仍基于统一 `activePage` 状态。

阻塞项：Step 2

### Step 4: 实现目录联动

完成定义：

- 滚动监听：使用 `IntersectionObserver` 更新可见优先 page。
- 目录点击：`scrollIntoView` 精确滚到目标 page，并回填 active。
- 解决边界竞态：滚动动画中的点击高亮与 observer 频繁更新冲突，保证最终一致。

阻塞项：Step 2

### Step 5: 上线 hover toolbar 与编辑入口

完成定义：

- report 卡片 hover 时在右上角显示 toolbar。
- insight 卡片 hover 时在右上角显示 toolbar。
- toolbar 动作复用现有 edit/open 逻辑，不新增独立编辑协议。

阻塞项：Step 2

### Step 6: 验收与收尾

完成定义：

- 目录点击与滚动联动覆盖核心路径。
- 横向/纵向切换不会重置 active page（保留语义一致）。
- report/insight 栏位未超限（1+1）规则。
- 老菜单能力不回退：目录筛选、展开、跳转仍可用。
- 与已有样式系统兼容，hover 工具栏不影响滚动手势。

## 验收场景

1. 默认进入 report detail，页面按纵向展示，滚轮可顺序切页。
2. 滚动过程中，左侧目录自动高亮当前 page。
3. 点击左侧目录，右侧内容定位到对应 page。
4. 横向模式下可按页水平滚动，左侧目录仍正常高亮。
5. report 或 insight 被 hover 时，右上角出现 toolbar。
6. 点击 toolbar 可打开对应编辑入口，编辑流程与现有行为一致。
7. 单个 page 不出现两个 report 或两个 insight。

## 风险与对策

- 风险：长列表页面可能出现 observer 回调抖动。
  - 对策：提升阈值策略，减少高频状态更新。
- 风险：横向模式下 page 高度/宽度 mismatch。
  - 对策：固定容器基线尺寸与溢出策略。
- 风险：toolbar 与 page hover 发生事件冒泡冲突。
  - 对策：统一事件命名空间和阻断无关点击传播。

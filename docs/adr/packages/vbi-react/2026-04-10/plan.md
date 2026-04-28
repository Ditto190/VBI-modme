# Plan: vbi-react-starter Demo 组件扩展（2026-04-10）

- 目标：在不回归现有 demo 功能的前提下，把 UI 从页面级实现升级为可复用组件层，并为后续向 package 级组件沉淀打基础。
- 范围：本期仅改造 `practices/vbi-react-starter`（demo-first），不新增 `packages/vbi-react` 对外导出，不触达 `packages/vbi`、`packages/vquery`、`packages/vseed`。

## Start Gate（开工前冻结）

1. 本期仅做组件边界收敛与样式系统化，不做 DSL 逻辑重写。
2. 现有功能行为作为基线，以下路径必须保持可用：
   - 加载 demo 数据 -> 字段面板出现可选维度/指标
   - 上传 CSV -> 数据源与行数更新，字段可选
   - 选择维度/指标 -> 主区出图或可见可操作的占位提示
   - 切换图表类型 -> 渲染区和 DSL 快照联动更新
3. 所有 UI 变更必须可在桌面与窄屏下操作（最小 375px 宽）。

## 执行计划

## Phase 1：收敛 UI Token 与基础样式层

1. 固化统一 token（颜色、间距、圆角、阴影、字号）与全局样式入口。
2. 消减 `App.tsx` 的大块 inline style，迁移到样式层。
3. 统一主题变量使用（避免深浅主题混用）。

产物清单：

- `practices/vbi-react-starter/src/styles/tokens.css`
- `practices/vbi-react-starter/src/styles/styleObjects.ts`
- `practices/vbi-react-starter/src/App.css`

Exit Criteria:

1. `App.tsx` 中页面级 inline 样式对象数量收敛到 `<= 3`（其余迁移到样式层）。
2. 页面主要区域（顶部、侧栏、内容区）使用同一套主题变量。
3. 构建通过：`pnpm --filter=vbi-react-starter run build`。

## Phase 2：组件边界收敛（核心区块）

1. 收敛 `StarterTopBar`（标题、图表类型切换、操作按钮）边界。
2. 收敛 `FieldPanel` 集成边界（仅通过显式 props 传入可选字段与 builder）。
3. 收敛 `StarterFooter`（状态汇总 + DSL 快照）职责。
4. 收敛主区空态/渲染态边界（`StarterEmptyState`、`StarterLoadingSkeleton`、`StarterRenderError`）。

产物清单：

- `practices/vbi-react-starter/src/App.tsx`
- `practices/vbi-react-starter/src/components/StarterTopBar.tsx`
- `practices/vbi-react-starter/src/components/StarterFooter.tsx`
- `practices/vbi-react-starter/src/components/StarterEmptyState.tsx`
- `practices/vbi-react-starter/src/components/StarterLoadingSkeleton.tsx`
- `practices/vbi-react-starter/src/components/StarterRenderError.tsx`

Exit Criteria:

1. `App.tsx` 仅保留编排与状态流转逻辑，文件行数收敛到 `<= 260` 行。
2. 各组件 props 边界清晰，不依赖隐式全局变量。
3. 字段区在默认视口下可见且可操作（不再出现“高度过小无法选”问题）。

## Phase 3：状态体验与响应式补齐

1. 为关键区块补充 loading/empty/error 的可识别状态和触达路径。
2. 补齐 375px~768px 的响应式规则（面板可折叠或重排）。
3. 优化 DSL 展示可读性（保留结构化展示，不出现不可读的大段堆叠）。
4. 增加稳定的错误态触发机制（开发态开关），例如 `?debugState=error` 或显式调试按钮，避免依赖偶发数据条件。

验收证据（截图 + 操作说明）：

1. 空态：未加载数据时主区提示。
2. 加载态：触发渲染时 skeleton 可见。
3. 错误态：通过固定触发机制进入错误态，错误卡片可见。
4. 375px 关键路径：选图表 -> 选字段 -> 查看配置可完整走通。

Exit Criteria:

1. 三类状态都可通过本地操作触达并可截图验收。
2. 375px 宽下关键路径可完整走通。
3. 页面不存在内容被压扁导致不可点击的区域。

## Phase 4：回归验证与提交策略

1. 功能回归：图表类型切换、字段增删、配置区联动、上传 CSV/加载 demo。
2. 质量校验：test + lint + typecheck + build。
3. 采用小步提交（每一阶段至少一个独立 commit）。

验证命令：

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run lint
pnpm --filter=vbi-react-starter run typecheck
pnpm --filter=vbi-react-starter run build
```

Exit Criteria:

1. 上述命令全通过。
2. 无跨包污染改动（特别是 `packages/vbi`、`packages/vquery`、`packages/vseed`）。
3. PR 描述可对应每个阶段的产出、命令结果与截图证据。

## 风险与回滚

1. 风险：窄屏下字段面板折叠后，关键操作路径中断。
2. 回滚策略：默认展开字段面板，并优先保留“选字段 -> 出图”路径；次要信息区（如 footer 扩展内容）可延后折叠。

## DoD（完成定义）

1. demo 关键功能完整可用。
2. UI 样式统一且组件化边界清晰。
3. `App.tsx` 行数与 inline 样式均达到量化门槛，组件职责可独立演进。
4. 验证命令与人工验收（桌面/移动）均通过，且有对应证据可复核。
5. 改动仅限 `practices/vbi-react-starter`，不引入跨包副作用。

## 备注

- 当前验证命令沿用包名过滤：`--filter=vbi-react-starter`。若后续统一为 scope 命名，再同步调整。

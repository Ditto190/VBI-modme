# Plan: `vbi_agent` 拆分为 CLI 壳与 Builder Agent 包

> 基于 [`./adr.md`](./adr.md)
> 本文件用于指导 `apps/vbi_agent` 到 `apps/vbi_cli` + `packages/vbi-agent` 的迁移顺序。

## 目标

把当前混在应用目录里的 agent runtime、模型接入、TUI、平台 provider、资源 CRUD 和 builder 工具拆开：

- `packages/vbi-agent` 成为只操作 Builder 的通用 Agent 包
- `apps/vbi_cli` 成为连接 provider、模型 provider、资源工具和 TUI 的应用壳
- `packages/vbi`、`packages/vquery`、`packages/vseed` 继续保持平台无关
- 资源 CRUD 通过 CLI 注入通用 tool，不进入 Agent 包和 Builder 工作区抽象

## 范围

包含：`apps/vbi_agent` 重命名与收敛、`packages/vbi-agent` 新包、runtime / history / activity-log / types / builder tools 迁移、CLI provider 适配层、ResourceToolset、旧引用清理。

不包含：权限系统、多租户、资源版本历史、新模型 provider 产品化、`packages/vbi` / `vquery` / `vseed` 业务语义改造。

## 坏味道扫描

1. `apps/vbi_agent` 同时承担 runtime、TUI、模型 provider、provider 接入、资源能力和 builder 工具，职责过大。
2. package 名称是 `@visactor/vbi-agent`，但 README 和使用示例已出现 `vbi_cli` 语义，命名事实不一致。
3. builder 工具位于应用目录内，阻碍 `packages` 级复用。
4. CLI 构建脚本直接依赖 provider 构建，应用壳与平台接入存在强耦合。

## 开发原则

### Builder First

`packages/vbi-agent` 只接收调用方注入的 `VBIAgentWorkspace`，只围绕 Builder 持有的 VBIChartDSL、VBIReportDSL、VQueryDSL、VSeedDSL 工作。

禁止：在 Agent 包中创建平台 client、读取环境变量、感知 `resourceId` / HTTP / Hocuspocus / 鉴权 / 资源列表，或把 ResourceToolset 定义进 `VBIAgentWorkspace`。

### CLI Composition

`apps/vbi_cli` 负责组合 provider workspace 适配层、BuilderToolset、ResourceToolset、模型 provider、TUI、命令解析和具体应用流程。

### 质量约束

1. 所有迁移行为必须有对应单元测试或最小可执行验证。
2. 每个阶段结束必须执行该模块最小验证命令。
3. 合并前必须通过仓库级 `lint` 和 `typecheck`。
4. 不允许保留旧 `apps/vbi_agent` 死路径、死导入、死脚本或死文档。
5. `packages/vbi-agent` 不允许依赖 `@visactor/vbi-provider`、React、Ink、dotenv 或具体模型 SDK。

## 执行顺序

1. 定义 `packages/vbi-agent` 公共接口
2. 抽出 BuilderToolset 与 Agent runtime
3. 重命名并收敛 `apps/vbi_cli`
4. 在 CLI 中实现 provider workspace 适配层与 ResourceToolset
5. 补齐测试与边界验证
6. 清理旧引用并完成仓库级验证

原因：先稳定 Agent 包契约，CLI 才能按契约组合平台能力；先抽 Builder 工具，才能阻断资源 CRUD 对 Agent 核心的污染；最后清理旧路径，避免迁移中断导致命令不可运行。

## 执行清单

### Step 1: 建立 `packages/vbi-agent`

完成定义：新增包名 `@visactor/vbi-agent`；导出 `VBITool`、`VBIAgentWorkspace`、`VBIBuilderAgentInput`；导出 runtime、history、activity-log、agent types 最小公共入口；依赖只包含通用 runtime 需要的依赖与 `@visactor/vbi`；包级 typecheck 通过。使用一致的rslib, 提供node和浏览器环境的运行时agent.

阻塞项：无

### Step 2: 迁移 BuilderToolset

完成定义：`createBuilderTools(workspace)` 不依赖 CLI、provider、环境变量或资源 ID；chart builder 与 report builder 的读取、修改、生成、检查工具迁入包内；测试使用本地夹具或 mock workspace；应用目录不保留重复 builder 工具。

阻塞项：依赖 Step 1

### Step 3: 迁移通用 Agent runtime

完成定义：runtime、history、activity-log、tool 协议和上下文构建迁入 `packages/vbi-agent`；runtime 接收调用方注入的模型 provider 与 tools；provider-script 通用执行器进入包内，CLI 专属加载逻辑留在应用壳；原 runtime 测试迁移到包内。

阻塞项：依赖 Step 1

### Step 4: 收敛 `apps/vbi_cli`

完成定义：`apps/vbi_agent` 重命名为 `apps/vbi_cli`；CLI 应用不再占用 `@visactor/vbi-agent` 包名；保留 `cli.ts`、`parse.ts`、`tui/*`、模型 provider、平台 provider 接入；CLI 从 `@visactor/vbi-agent` 导入 runtime 与 BuilderToolset；README、bin、脚本、测试路径全部改为 `apps/vbi_cli`。

阻塞项：依赖 Step 2 和 Step 3

### Step 5: 实现 workspace 适配层与 ResourceToolset

完成定义：CLI 基于 `@visactor/vbi-provider` 或 `apps/vbi_provider` 打开资源；provider 被适配成 `VBIAgentWorkspace`；ResourceToolset 只在 CLI 中定义；agent 入口注入 `[...createBuilderTools(workspace), ...createResourceTools(client)]`；Agent 包源码不出现 provider、HTTP、Hocuspocus、鉴权和资源列表类型。

阻塞项：依赖 Step 4

### Step 6: 清理、验证与验收

完成定义：旧 `apps/vbi_agent` 路径、导入、脚本、文档、测试引用全部清理；`packages/vbi-agent` 单测不依赖平台 provider；`apps/vbi_cli` 单测覆盖命令解析、模型配置、workspace 适配和 ResourceToolset；仓库级 `pnpm run lint` 与 `pnpm run typecheck` 通过。

## 验收场景

1. 本地测试夹具可以直接运行 `@visactor/vbi-agent` 并操作 chart builder。
2. CLI 可以通过 provider 打开远端 chart 并把 builder 注入 Agent。
3. CLI 可以同时注入 ResourceToolset 与 BuilderToolset。
4. Agent 包源码中搜不到平台 provider、`resourceId`、HTTP、Hocuspocus、dotenv、Ink、React。
5. 仓库中搜不到旧 `apps/vbi_agent` 主路径引用。
6. 验证VBI Docker的配置, 正确COPY资源

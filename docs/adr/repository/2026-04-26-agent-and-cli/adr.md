# ADR-001: CLI 组合工具集，Agent 核心只操作 Builder

状态：Accepted；日期：2026-04-26

## 背景

- `packages/vbi` 负责 VBIChartDSL、VBIReportDSL、Builder 与 DSL 转换；`packages/vquery` 负责 QueryDSL 到 SQL；`packages/vseed` 负责 VSeedDSL 到 VChart/VTable Spec。
- `apps/vbi_provider`、`apps/vbi_fe`、`apps/vbi_be` 负责平台资源、远端协同、鉴权与具体业务流程。
- `apps/vbi_agent` 当前同时包含 agent runtime、模型 provider、TUI、平台 provider 接入、资源 CRUD 和 builder 操作工具。

LLM 需要同时使用 Builder 能力和平台资源能力。问题不是 agent 是否存在，而是 agent、CLI、provider、资源 CRUD 混在同一个应用目录里，导致 `packages` 中的原子能力反向感知平台实现，影响独立开源与复用。

## 决策

将现有 `apps/vbi_agent` 重命名并收敛为 `apps/vbi_cli`。CLI 是应用壳，只负责连接 provider、处理平台资源和承载具体交互流程。

新增 `packages/vbi-agent`。Agent 包提供通用 runtime/tool 抽象和 BuilderToolset；资源 CRUD 由 CLI 基于 provider 创建 ResourceToolset 后注入 runtime。依赖倒置发生在通用 tool 层，不发生在 resource domain 层。

### 职责边界

`apps/vbi_cli`：

- 对接 `apps/vbi_provider`、`@visactor/vbi-provider` 或其他平台 provider。
- 打开远端资源，取得 `VBIChartBuilder`、`VBIReportBuilder` 或其他 Builder。
- 将 Builder 适配为 `packages/vbi-agent` 需要的工作区。
- 创建受控 ResourceToolset，并和 BuilderToolset 一起注入 LLM runtime。
- 对接模型 provider，承载资源 CRUD、权限鉴权、TUI、命令解析和 app 业务流程。

`packages/vbi-agent`：

- 接收调用方注入的 Builder 工作区。
- 读取、修改、生成和检查 Builder 持有的 VBIChartDSL、VQueryDSL、VSeedDSL。
- 提供 BuilderToolset、上下文说明、agent runtime 抽象，并运行调用方注入的通用 tools。
- 不创建平台 client，不定义 ResourceToolset，不读取环境变量，不感知 `resourceId`、HTTP、Hocuspocus、鉴权或资源列表。

```text
apps/vbi_cli -> packages/vbi-agent
apps/vbi_cli -> @visactor/vbi-provider 或 apps/vbi_provider
apps/vbi_cli -> 模型 provider SDK
packages/vbi-agent -> @visactor/vbi
@visactor/vbi -> @visactor/vquery -> @visactor/vseed
```

## 核心接口

Agent 通过抽象工作区获取 Builder。工作区由 CLI 创建，Agent 不知道 Builder 来自本地文件、远端协同还是测试夹具。资源能力通过通用 tool 注入，不进入 `VBIAgentWorkspace`。

```ts
export type VBITool = {
  name: string
  description: string
  execute(input: unknown): Promise<unknown>
}

export interface VBIAgentWorkspace {
  getActiveChartBuilder(): Promise<VBIChartBuilder>
  getActiveReportBuilder?(): Promise<VBIReportBuilder>
  close?(): Promise<void>
}

export type VBIBuilderAgentInput = { workspace: VBIAgentWorkspace; tools?: VBITool[] }
```

CLI 负责组合 BuilderToolset 和 ResourceToolset：

```ts
const provider = client.chart(resourceId)

const workspace: VBIAgentWorkspace = {
  getActiveChartBuilder: () => provider.open(),
  close: () => provider.close(),
}

await runAgent({
  model,
  tools: [...createBuilderTools(workspace), ...createResourceTools(client)],
})
```

## 后果

正向影响：

- `packages/vbi`、`packages/vquery`、`packages/vseed` 保持平台无关，便于独立开源。
- `packages/vbi-agent` 作为 Builder 智能操作层独立复用。
- `apps/vbi_cli` 可以按不同平台 provider、模型 provider、权限系统和资源工具组合。
- 平台资源逻辑不会污染 Builder 与 Agent；新增模式时只需要新增 CLI 适配器。

代价：

- CLI 需要显式实现 provider 到 Builder 的适配层和 ResourceToolset。
- Agent runtime 需要稳定的通用 tool 协议。
- 需要把现有 `apps/vbi_agent` 拆分为 `apps/vbi_cli` 和 `packages/vbi-agent`。

## 迁移计划

1. 从 `apps/vbi_agent` 抽出 `VBIAgentWorkspace` 与 builder 操作工具，让工具只依赖 Builder。
2. 创建 `packages/vbi-agent`，迁入 runtime、history、activity-log、agent 类型、上下文构建和 builder 工具。
3. 将 `apps/vbi_agent` 重命名为 `apps/vbi_cli`，保留 `cli.ts`、`parse.ts`、`tui/*`、模型 provider 和平台 provider 接入。
4. 在 `apps/vbi_cli` 中实现 provider 到 `VBIAgentWorkspace` 的适配层和 ResourceToolset。
5. 为 `packages/vbi-agent` 增加不依赖平台 provider 的单元测试。
6. 清理旧 `apps/vbi_agent` 路径、package 名称、脚本、导入、文档和测试引用。

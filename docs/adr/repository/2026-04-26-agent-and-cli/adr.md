# ADR-001: CLI 连接 Provider，Agent 只操作 Builder

状态：Accepted；日期：2026-04-26

## 背景

- `packages/vbi` 负责 VBIChartDSL、VBIReportDSL、Builder 与 DSL 转换。
- `packages/vquery` 负责 QueryDSL 到 SQL。
- `packages/vseed` 负责 VSeedDSL 到 VChart/VTable Spec。
- `apps/vbi_provider`、`apps/vbi_fe`、`apps/vbi_be` 负责平台资源、远端协同、鉴权与具体业务流程。
- `apps/vbi_agent` 当前同时包含 agent runtime、模型 provider、TUI、平台 provider 接入和 builder 操作工具。

当前问题不是 agent 是否存在，而是 agent 与 CLI、provider、平台资源混在同一个应用目录里。这样会让 `packages` 中的原子能力反向感知平台实现，影响独立开源与复用。

## 决策

将现有 `apps/vbi_agent` 重命名并收敛为 `apps/vbi_cli`。CLI 是应用壳，只负责连接 provider、处理平台资源和承载具体交互流程。

新增 `packages/vbi-agent`。Agent 是可复用包，只对接 Builder，不对接 provider。

### 职责边界

`apps/vbi_cli`：

- 对接 `apps/vbi_provider`、`@visactor/vbi-provider` 或其他平台 provider。
- 打开远端资源，取得 `VBIChartBuilder`、`VBIReportBuilder` 或其他 Builder。
- 将 Builder 适配为 `packages/vbi-agent` 需要的工作区。
- 对接模型 provider，注入模型客户端、系统提示词和运行参数。
- 承载资源 CRUD、权限鉴权、TUI、命令解析和具体 app 业务流程。

`packages/vbi-agent`：

- 接收调用方注入的 Builder 工作区。
- 读取、修改、生成和检查 Builder 持有的 VBIChartDSL、VQueryDSL、VSeedDSL。
- 提供 builder 级工具、上下文说明、agent runtime 抽象和可测试的执行流程。
- 不创建平台 client，不读取环境变量，不处理资源 CRUD，不感知 `resourceId`、HTTP、Hocuspocus、鉴权或资源列表。

```text
apps/vbi_cli
  -> packages/vbi-agent
  -> @visactor/vbi-provider 或 apps/vbi_provider
  -> 模型 provider SDK

packages/vbi-agent
  -> @visactor/vbi

@visactor/vbi
  -> @visactor/vquery
  -> @visactor/vseed
```

## 核心接口

Agent 通过抽象工作区获取 Builder。工作区由 CLI 创建，Agent 不知道 Builder 来自本地文件、远端协同还是测试夹具。

```ts
export interface VBIBuilderWorkspace {
  getActiveChartBuilder(): Promise<VBIChartBuilder>
  getActiveReportBuilder?(): Promise<VBIReportBuilder>
  close?(): Promise<void>
}

export interface VBIBuilderAgentInput {
  workspace: VBIBuilderWorkspace
}
```

CLI 将 provider 资源适配成 `VBIBuilderWorkspace`：

```ts
const provider = client.chart(resourceId)

const workspace: VBIBuilderWorkspace = {
  getActiveChartBuilder: () => provider.open(),
  close: () => provider.close(),
}
```

## 后果

正向影响：

- `packages/vbi`、`packages/vquery`、`packages/vseed` 保持平台无关，便于独立开源。
- `packages/vbi-agent` 作为 Builder 智能操作层独立复用。
- `apps/vbi_cli` 可以按不同平台 provider、模型 provider、权限系统进行组合。
- 平台资源逻辑不会污染 Builder 与 Agent；新增本地、远端或测试模式时，只需要新增 CLI 适配器。

代价：

- CLI 需要显式实现 provider 到 Builder 的适配层。
- Agent 不能直接做资源 CRUD；如确实需要，必须由 CLI 注入受控平台工具。
- 需要把现有 `apps/vbi_agent` 拆分为 `apps/vbi_cli` 和 `packages/vbi-agent`。

## 迁移计划

1. 从 `apps/vbi_agent` 抽出 `VBIBuilderWorkspace` 与 builder 操作工具，让工具只依赖 Builder。
2. 创建 `packages/vbi-agent`，迁入 runtime、history、activity-log、agent 类型、上下文构建和 builder 工具。
3. 将 `apps/vbi_agent` 重命名为 `apps/vbi_cli`，保留 `cli.ts`、`parse.ts`、`tui/*`、模型 provider 和平台 provider 接入。
4. 在 `apps/vbi_cli` 中实现 provider 到 `VBIBuilderWorkspace` 的适配层。
5. 为 `packages/vbi-agent` 增加不依赖平台 provider 的单元测试。
6. 清理旧 `apps/vbi_agent` 路径、package 名称、脚本、导入、文档和测试引用。

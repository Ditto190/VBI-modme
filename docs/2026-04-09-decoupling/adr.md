# ADR: 面向 Provider 的平台级 Headless BI 架构

## Summary

VBI 的下一阶段目标，不再只是提供 `packages/` 下的原子能力，也不只是完成 `vbi_fe` 和 `vbi_be` 这套验证型应用，而是要演进为一个真正的平台级 Headless BI 系统。

为达到这个目标，系统必须从“页面驱动资源”升级为“由 `@visactor/vbi-provider` 承载的 Provider 驱动资源”：

- `chart`、`insight`、`report` 是三个独立资源
- `@visactor/vbi-provider` 是平台级应用 SDK
- `ChartProvider`、`InsightProvider`、`ReportProvider` 是 SDK 中的三个一等入口
- 页面、CLI、任意 JS 运行时都通过 Provider 获取资源能力
- Provider 可以直接返回对应 Builder
- 资源的编辑本体建立在协同文档之上，而不是建立在 REST detail DTO 之上

这份 ADR 的核心决策是：

- 平台对外统一通过 `@visactor/vbi-provider` 暴露 Provider 语义，而不是 UI 语义
- Builder 的创建权属于 Provider
- REST 是管理面，协同协议是数据面
- `Bytes` 留在持久化和协同链路内部，业务层统一暴露 JSON 与 Builder

## Context

当前系统已经具备以下基础：

- `@visactor/vbi` 负责配置 DSL 与 Builder
- `@visactor/vquery` 负责查询 DSL 与 SQL 执行
- `@visactor/vseed` 负责渲染 DSL 与 Spec 生成
- `apps/vbi_be` 已具备 `chart / insight / report` 三类资源的基础后端能力
- `apps/vbi_fe` 已具备管理页与协同编辑页的基础能力

但当前模型仍然存在以下问题：

### 1. 调用入口分散

资源能力目前主要通过页面交互暴露，未来再引入 CLI，容易继续分裂出第二套调用方式。再往后如果还要支持 Node.js 脚本、嵌入式应用或其他宿主，很可能出现第三套调用方式。

这会导致：

- 能力语义不统一
- Builder 初始化逻辑分散
- 不同运行时对同一资源的操作方式不一致

### 2. 资源本体与业务接口边界不稳定

资源本体在底层其实是协同文档，但业务接口很容易退化为“把数据库里的内容投影给页面”，从而出现：

- 协同连接由页面自己拼装
- Builder 由消费端自己构造
- 存储细节容易泄漏到业务层

### 3. Headless BI 平台能力尚未收敛

如果一个能力只能被页面调用，而不能被 CLI 或任意 JS 运行时调用，那么它仍然只是应用能力，不是平台能力。

因此，必须把资源能力收敛到统一的 SDK 抽象上，而这个 SDK 就是 `@visactor/vbi-provider`。

## Decision

### 1. 平台采用由 `@visactor/vbi-provider` 承载的 Provider First 架构

VBI 平台对外通过 `@visactor/vbi-provider` 暴露一等 Provider，而不是以页面组件、页面服务或特定应用 API 为入口。

Provider 是资源运行时入口，直接承担：

- 建立后端连接
- 打开协同文档
- 获取 Builder
- 提供资源 CRUD
- 提供资源详情、快照与导出能力
- 提供资源特定的业务动作

### 2. 只存在三种一等 Provider

平台只定义以下三种一等 Provider：

- `ChartProvider`
- `InsightProvider`
- `ReportProvider`

不把一个过于泛化的 `ResourceProvider<T>` 作为主要对外模型。内部允许复用，但对外语义必须明确区分三类资源。

原因：

- `report` 是结构编排资源
- `chart` 是配置、查询、渲染相关资源
- `insight` 是语义内容资源

三者共享一部分资源生命周期语义，但不共享完整操作集。

### 3. Provider 可以直接返回对应 Builder

Provider 必须支持直接返回对应 Builder：

- `ChartProvider -> VBIChartBuilder`
- `InsightProvider -> VBIInsightBuilder`
- `ReportProvider -> VBIReportBuilder`

这意味着：

- Builder 的创建权属于 Provider
- 页面、CLI、脚本都不应自行 new Builder 并自行恢复文档
- 消费端只关心拿到一个可操作 Builder，而不关心底层 YDoc 如何恢复

### 4. 所有资源操作都可在任意 JS 运行时执行

Provider 设计必须是纯 TypeScript / JavaScript 运行时对象，可被以下环境统一消费：

- `apps/vbi_fe`
- `apps/vbi_cli`
- Node.js 脚本
- 浏览器普通 JS 运行时
- 未来其他宿主应用

这意味着 Provider 不得绑定：

- React
- DOM
- 某个具体页面状态管理方案

页面只是 Provider 的消费者，而不是 Provider 的定义场所。

### 5. 资源编辑以协同连接为核心

资源的编辑本体是协同文档，不是 REST detail。

因此：

- Provider 打开资源时，以协同连接为主
- Builder 绑定在协同文档上
- 持续编辑与状态同步通过协同链路完成

REST 继续存在，但职责收敛为：

- 创建 / 删除资源
- 资源 summary 查询
- 资源元信息查询
- 引用关系检查
- 结构编排命令
- 快照导出等命令式能力

### 6. 后端分为管理面和数据面

后端必须显式分成两面：

- 管理面：REST 或等价命令接口
- 数据面：协同协议接口

其中：

- 管理面负责元信息、命令和查询
- 数据面负责文档打开、快照恢复和增量同步

Provider 是同时消费这两面能力的客户端抽象。

### 7. `Bytes` 只留在持久化与协同链路中

数据库中使用 `Bytes` 保存 Yjs 快照与增量，是合理的。

但业务层必须保持边界清晰：

- `Bytes` 属于持久化与协同协议
- JSON 属于业务语义投影
- Builder 属于可操作运行时视图

REST 业务接口不应直接暴露原始 `Bytes`。

## Detailed Decisions

### A. 平台对象模型

`@visactor/vbi-provider` 提供顶层平台客户端：

```ts
const client = await createVBIProviderClient(config)

const chartProvider = client.chart(chartId)
const insightProvider = client.insight(insightId)
const reportProvider = client.report(reportId)
```

三层关系固定为：

`client -> provider -> builder`

职责分层：

- `client`: 认证、配置、transport 组装
- `provider`: 资源级能力
- `builder`: DSL 级操作

### B. 三种 Provider 的最小能力集合

所有 Provider 应共享最小资源语义：

- `create`
- `remove`
- `rename`
- `open`
- `close`
- `getBuilder`
- `getSummary`
- `getDetail`
- `snapshot`

然后按资源类型扩展。

#### ChartProvider

额外职责：

- 返回 `VBIChartBuilder`
- 暴露与 `VQuery` / `VSeed` 相关的派生能力

#### InsightProvider

额外职责：

- 返回 `VBIInsightBuilder`
- 处理 insight 内容投影

#### ReportProvider

额外职责：

- 返回 `VBIReportBuilder`
- 管理 page 结构
- 管理 `chartId / insightId` 引用绑定
- 提供 report snapshot / export 能力

### C. `report` 的边界

即使在 Provider First 模型下，也必须坚持：

- `report` 是结构资源
- `chart`、`insight` 是内容资源

因此：

- `ReportProvider` 管理结构和引用
- `ChartProvider` 管理 chart 内容
- `InsightProvider` 管理 insight 内容
- `ReportProvider` 不吞掉另外两个 Provider 的职责

### D. 页面、CLI、脚本的关系

#### 页面

页面只负责：

- 展示
- 交互
- 生命周期管理
- 把用户动作翻译成 Provider 调用

#### CLI

CLI 只负责：

- 解析命令
- 调用 Provider
- 输出结果

CLI 不应绕过 Provider 直接实现第二套资源语义。

#### 普通脚本 / 外部运行时

脚本只负责：

- 初始化平台客户端
- 获取 Provider
- 调用 Provider 或 Builder

如果一个能力只能在页面里做，不能在脚本里做，它就还不是平台能力。

## Consequences

### 正向影响

#### 1. 统一能力入口

页面、CLI、脚本、宿主应用都通过 Provider 访问同一套能力，平台语义稳定。

#### 2. Builder 生命周期统一

Builder 的创建、恢复和连接统一由 Provider 管理，避免不同运行时行为不一致。

#### 3. 更符合 Headless BI 定位

系统真正从“前端应用驱动”转向“资源运行时驱动”，更适合嵌入和自动化。

#### 4. 更利于 SDK 化

一旦 Provider 接口稳定，`vbi_cli` 与外部 SDK 都可以建立在同一套模型上。

### 成本与风险

#### 1. 当前前端调用方式需要迁移

现有 `vbi_fe` 中直接调用 API 和直接拼协同连接的逻辑，需要逐步迁移到 Provider。

#### 2. 后端接口需要重新分层

后端必须更清晰地区分管理面与数据面，避免继续混用“业务 detail”与“协同资源本体”。

#### 3. Provider 设计必须克制

Provider 是一等入口，但不能演变成新的“万能对象”。三种 Provider 的职责边界必须保持清晰。

## Alternatives Considered

### 方案一：继续以页面服务为主

做法：

- 前端页面继续直接调用 API
- CLI 再单独封一层 service
- Builder 由各端自行构造

不采用原因：

- 能力入口持续分裂
- Builder 生命周期分散
- 不利于平台化和 Headless 化

### 方案二：对外只暴露泛型 `ResourceProvider<T>`

做法：

- 把三类资源都统一成一个抽象 provider

不采用原因：

- `report / chart / insight` 的能力差异明显
- 抽象过度会降低可读性和平台语义清晰度

### 方案三：完全以 REST 为主，协同只做页面增强

做法：

- 资源 detail 主要依赖 REST
- 协同只在少数页面场景生效

不采用原因：

- 资源编辑本体会退化成 DTO 驱动
- Provider 无法真正统一页面、CLI 和脚本
- 不符合“资源以协同文档为本体”的目标

## Package Placement

`@visactor/vbi-provider` 作为新的子包，放置在：

- `apps/packages/vbi-provider`

原因：

- 该包不属于底层 DSL 原子能力本身
- 该包面向应用运行时与平台接入
- 它天然更靠近 `apps/` 一侧，而不是纯 `packages/` 内核能力一侧

这个包应遵循现有 monorepo 规范：

- 使用 `rslib` 构建
- 使用与现有包一致的 `eslint` / `prettier` / `typescript` 约定
- 作为纯 TypeScript SDK 提供稳定导出

## Scope

本次 ADR 包含：

- `@visactor/vbi-provider` 的定位
- Provider First 平台方向
- 三种一等 Provider 的边界
- 平台客户端对象模型
- 管理面 / 数据面分层原则
- Builder 归属与获取方式

本次 ADR 不包含：

- 具体 TypeScript 接口签名细节
- 鉴权模型
- 多租户模型
- Provider 的缓存策略与连接复用细节
- CLI 子命令清单

## Follow-up

基于本 ADR，后续应继续产出：

1. `plan.md`
   - 明确 Provider First 的执行顺序
2. `@visactor/vbi-provider` 接口设计稿
   - 明确 `VBIProviderClient` 与三个 Provider 的接口细化
3. `vbi_cli` 目标命令集
   - 明确 CLI 如何映射 Provider
4. 前后端迁移计划
   - 页面从直接 API / hook 调用迁移到 Provider 调用

## Final Position

VBI 平台后续演进的核心方向，确定为：

- 用 `@visactor/vbi-provider`，而不是页面服务，作为平台一等能力入口
- 用三个 Provider，而不是一个模糊泛型抽象，承载资源语义
- 用协同文档，而不是 REST detail，作为资源编辑本体
- 用 Builder，作为资源操作面
- 用页面、CLI、脚本，作为 Provider 的不同消费者

这是 VBI 从“能力集合”走向“平台级 Headless BI”的核心架构决策。

# Discussion: 面向 Provider 的平台级 Headless BI 解耦

## 目标重述

这次解耦的目标，不只是把 `chart / insight / report` 从页面逻辑里拆出来，也不只是让 REST 接口更干净。

真正的目标应该是：

1. 所有 `Report / Insight / Chart` 操作，本质上都建立在协同文档之上
2. 所有资源操作，既能被页面调用，也能被 CLI 调用，还能被任意 JS 运行时调用
3. 调用入口不应直接依赖页面或具体后端接口细节，而应依赖统一的 Provider 抽象
4. Provider 不只是“连接器”，而是资源能力入口，可以直接返回 `ReportBuilder`、`ChartBuilder`、`InsightBuilder`
5. 全平台只有 3 种一等 Provider：`ReportProvider`、`ChartProvider`、`InsightProvider`

这里的核心变化是：

- 过去是“页面驱动资源”
- 现在应该变成“Provider 驱动资源”

页面、CLI、Node 脚本、浏览器沙箱、服务端渲染环境，都只是 Provider 的消费者。

## 为什么之前的讨论还不够

前一版讨论强调了：

- 资源独立
- `report` 只负责编排
- 存储层与业务层分离

这些都对，但还不够，因为它没有把“统一接入点”收敛出来。

如果只有：

- 后端 REST API
- 前端页面 hook
- 未来 CLI 命令

那系统仍然可能继续分裂成三套调用方式：

- 页面一套
- CLI 一套
- 业务脚本一套

这样最终会出现“能力一样，入口三套，语义三套”的问题。

要避免这种分裂，就必须把平台能力收敛到 Provider。

## 新的核心判断

未来判断一个能力是否已经平台化，只问两个问题：

1. 它是否可以通过某个 Provider 在任意 JS 运行时被调用？
2. 它是否返回 Builder / 业务语义，而不是暴露底层存储和传输细节？

如果不能，说明这个能力还只是应用层能力，不是平台能力。

## Provider First 的架构方向

### 1. Provider 是平台能力入口，不是 UI 辅助对象

Provider 不是 React hook 的替代品，也不是简单 API client。

Provider 应该直接承担这些职责：

- 与后端建立连接
- 打开协同文档
- 提供资源 CRUD
- 提供资源详情读取
- 提供 Builder 获取
- 提供结构编排操作
- 提供快照、导出、引用检查等能力

也就是说，Provider 是“资源运行时入口”。

### 2. Provider 应该统一页面、CLI、任意 JS 运行时

同一套 Provider，应该能被这些入口消费：

- `apps/vbi_fe`
- `apps/vbi_cli`
- Node.js 脚本
- 浏览器中的普通 JS
- 未来其他宿主应用

这意味着 Provider 设计时就不能绑定 React、不能绑定 DOM、不能绑定某个具体页面状态管理方案。

Provider 必须是纯 JavaScript / TypeScript 运行时对象。

### 3. Provider 的底层是协同，不是 REST DTO

资源的本体是协同文档，而不是 REST 返回的 JSON。

更准确地说：

- `Bytes` / Yjs update 是资源事实源的底层编码
- Builder 是资源事实源的可操作形态
- JSON 是资源事实源的业务投影

所以 Provider 需要以协同连接为核心，而不是以 REST 拉取 detail 为核心。

REST 仍然需要存在，但职责要收敛：

- 列表查询
- 元信息查询
- 创建和删除这类命令式操作
- 引用关系检查
- 非协同业务动作

真正的资源编辑和持续状态同步，应通过 Provider 持有的协同文档完成。

## 三种一等 Provider

这里建议明确只有 3 种一等 Provider：

- `ChartProvider`
- `InsightProvider`
- `ReportProvider`

不要继续抽象成一个过于泛化的 `ResourceProvider<T>` 作为对外主模型。内部可以复用，但对外语义应保持清晰。

原因很简单：

- `chart`、`insight`、`report` 的操作集并不相同
- `report` 有结构编排职责
- `chart` 有查询和渲染相关能力
- `insight` 是文本或语义内容资源

如果对外强行统一，很容易得到一个“看起来复用，实际上模糊”的抽象。

### 1. ChartProvider

职责：

- 创建 / 删除 / 重命名 chart
- 连接 chart 协同文档
- 返回 `VBIChartBuilder`
- 提供 chart 的 summary / detail / snapshot
- 提供与 `VQuery`、`VSeed` 相关的派生能力

示意：

```ts
const chartProvider = await platform.getChartProvider(chartId)
const chartBuilder = await chartProvider.open()
chartBuilder.chartType.changeChartType('bar')
```

### 2. InsightProvider

职责：

- 创建 / 删除 / 重命名 insight
- 连接 insight 协同文档
- 返回 `VBIInsightBuilder`
- 提供 insight 的 summary / detail / snapshot

示意：

```ts
const insightProvider = await platform.getInsightProvider(insightId)
const insightBuilder = await insightProvider.open()
insightBuilder.setContent('Monthly overview')
```

### 3. ReportProvider

职责：

- 创建 / 删除 / 重命名 report
- 连接 report 协同文档
- 返回 `VBIReportBuilder`
- 提供 page 结构编排能力
- 提供对子资源引用的绑定能力
- 提供 snapshot / export 能力

示意：

```ts
const reportProvider = await platform.getReportProvider(reportId)
const reportBuilder = await reportProvider.open()
await reportProvider.addPage({
  title: 'Q1',
  chartId,
  insightId,
})
```

## Provider 提供什么能力

Provider 至少应该提供两类能力。

### 1. 资源连接能力

- `open()`
- `connect()`
- `disconnect()`
- `getBuilder()`
- `getSnapshot()`

这一层解决“如何连上资源”。

### 2. 资源操作能力

- `create()`
- `delete()`
- `rename()`
- `getSummary()`
- `getDetail()`

以及资源特定操作：

- `ReportProvider.addPage()`
- `ReportProvider.removePage()`
- `ReportProvider.reorderPages()`
- `ReportProvider.bindChart()`
- `ReportProvider.bindInsight()`

这一层解决“连上以后能做什么”。

## 为什么 Builder 必须从 Provider 拿

如果 Builder 仍然由页面自己 new，或者由不同入口各自构造，会出现三个问题：

1. 文档初始化逻辑分散
2. 协同连接状态分散
3. CLI / 页面 / 脚本环境拿到的 Builder 行为可能不一致

因此更合理的方向是：

- Builder 的创建权属于 Provider
- Consumer 不关心底层如何恢复 YDoc
- Consumer 只关心拿到一个可操作的 Builder

也就是：

- 页面拿 `builder`
- CLI 拿 `builder`
- 普通脚本也拿 `builder`

Builder 是统一操作面，Provider 是统一接入面。

## 页面、CLI、任意 JS 运行时之间的关系

### 页面

页面只负责：

- 展示
- 交互
- 生命周期管理
- 把用户动作翻译成 Provider 调用

页面不负责定义资源协议。

### CLI

CLI 只负责：

- 解析命令
- 调用 Provider
- 输出结果

CLI 不应该直接绕开 Provider 去调一套私有 service。

### 任意 JS 运行时

普通脚本或外部应用只负责：

- 初始化平台客户端
- 获取对应 Provider
- 调用 Provider 或 Builder

这才是 Headless BI 真正成立的标志。

## 后端应该如何配合这种模型

后端要从“页面后端”演进成“Provider 后端”。

这意味着后端至少要同时提供两类能力：

### 1. 命令与查询能力

例如：

- 创建 / 删除资源
- 获取资源 summary
- 获取元信息
- 引用关系检查
- 导出快照

这类能力适合走 REST 或等价命令接口。

### 2. 协同连接能力

例如：

- 打开资源文档
- 同步资源状态
- 恢复快照与增量

这类能力适合走 Hocuspocus / Yjs Provider 协议。

因此可以把后端理解成：

- REST 是管理面
- 协同连接是数据面

Provider 就是同时消费这两面能力的客户端抽象。

## 资源操作的统一语义

为了让三种 Provider 真正可复用，建议统一一组最小语义：

- `create`
- `remove`
- `rename`
- `open`
- `close`
- `getBuilder`
- `getSummary`
- `getDetail`
- `snapshot`

再在各 Provider 上增加自己的专属动作。

这样做的意义是：

- 页面团队理解一致
- CLI 命令映射自然
- 文档和 SDK 稳定

## 对 `report` 的特殊处理

即使采用 Provider First，仍要坚持一个边界：

- `report` 是结构编排资源
- `chart`、`insight` 是内容资源

所以 `ReportProvider` 虽然能管理 page 和引用，但不应该直接吞掉 `ChartProvider` 和 `InsightProvider` 的职责。

更合理的模式是：

- `ReportProvider` 管结构
- `ChartProvider` 管 chart 内容
- `InsightProvider` 管 insight 内容
- `ReportProvider` 通过 `chartId / insightId` 组织它们

## 推荐的平台对象模型

可以考虑增加一个更上层的 `VBIProviderClient`：

```ts
const client = await createVBIProviderClient(config)

const reportProvider = client.report(reportId)
const chartProvider = client.chart(chartId)
const insightProvider = client.insight(insightId)
```

其中：

- `client` 负责认证、连接配置、transport 组装
- `provider` 负责资源级能力
- `builder` 负责 DSL 级操作

三层关系应稳定为：

`client -> provider -> builder`

而不是：

`page -> api -> service -> builder`

## 推荐落地顺序

### 阶段 1：先把 Provider 概念立起来

- 明确 `ChartProvider / InsightProvider / ReportProvider`
- 定义统一接口和最小方法集
- 明确 Builder 从 Provider 获取

### 阶段 2：把现有前端调用改成 Provider 消费

- 页面不再直接拼 REST 调用和协同 hook
- 页面通过 Provider 拿 builder 和执行操作

### 阶段 3：实现 `vbi_cli`

- CLI 只做 Provider 的薄封装
- 不再设计第二套业务语义

### 阶段 4：开放给任意 JS 运行时

- 提供纯 TS SDK
- 文档示例覆盖 Node / Browser 两种运行时

## 结论

这次解耦应该再往前走一步，从“资源服务解耦”升级为“Provider 优先的平台架构”。

最终应形成下面这个稳定模型：

- `chart / insight / report` 是三个独立资源
- `ChartProvider / InsightProvider / ReportProvider` 是三个一等入口
- Provider 可以在任何 JS 运行时连接后端并操作资源
- Provider 可以直接返回对应 Builder
- 页面、CLI、脚本只是 Provider 的不同消费者
- REST 负责管理面，协同协议负责数据面
- `Bytes` 留在持久化与协同协议内部，业务层统一暴露 JSON 与 Builder 语义

只有这样，VBI 才真正从“可嵌入的能力集合”走向“平台级 Headless BI”。

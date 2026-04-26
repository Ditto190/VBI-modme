# ADR: vbi_fe / vbi_be 接入 standard-report 的资源化报表方案

## Summary

目标不是把 practices/standard-report 原样塞进 vbi_fe，而是把前后端从“单 chart document”升级为“多资源协同系统”：

- 后端不能继续把所有业务对象都塞进单一 `Document / DocumentUpdate` 语义，而要显式区分 `chart`、`report`、`insight` 三类资源
- 每个资源独立 YDoc、独立 room；room 命名统一为 `{type}:{id}`
- report 不再内嵌 chart / text DSL，而只保存 page 结构和资源引用
- `packages/vbi` 内部区分“结构 DSL”与“聚合快照 DSL”：`build()` 返回引用型 `VBIReportDSL`，`snapshot()` 返回完整闭包内容
- vbi_fe 提供报告路由和管理路由：report 在 `/reports` 下管理，chart / insight 在 `/manage` 下独立管理
- standard-report 从“接收内嵌 VBIReportBuilder”调整为“接收 report builder + 资源访问器 + report 结构编排接口”，内部按 page 引用挂载子资源

## Key Changes

### 1. 领域建模改为“引用型 report”

需要把当前 packages/vbi 的 report 建模从内嵌子 DSL 改成引用式：

- VBIReportPageDSL 从 { chart: VBIChartDSL, text: { content } } 改为 { chartId: string, insightId: string }
- VBIReportDSL 继续只保存 pages 顺序、title、version，不承担子资源内容
- 新增独立 VBIInsightDSL，作为 insight 资源的协同内容模型
- 新增 `VBIReportSnapshotDSL = { report, charts, insights }`，作为 `reportBuilder.snapshot()` 的返回值
- `createVBI()` 实例内置 `ResourceRegistry`，保存当前 DSL 工作区已装载的 chart / insight builder 或 DSL
- reportBuilder.page.add(...) 只负责 page 结构；子资源创建由应用服务层负责，不在 builder 内隐式创建数据库记录

对外接口要明确调整：

- `VBI.report.create(...)` 产出的 builder 默认面向“结构文档”
- `VBI.chart.create(...)` 继续面向 chart 资源
- `VBI.insight.create(...)` 作为 insight builder 入口
- `reportBuilder.build(): VBIReportDSL`
- `reportBuilder.snapshot(): VBIReportSnapshotDSL`
- `snapshot()` 只汇总当前 `ResourceRegistry` 中已装载资源，不触发任何业务层 IO
- standard-report 的公共入口改为接收：
  - reportBuilder
  - resourceGateway，至少提供 openChart(chartId)、openInsight(insightId)、createChart()、createInsight()、resolveReference(ids)

需要明确边界：

- `VBIReportDSL` 是运行时结构事实源
- `VBIChartDSL` / `VBIInsightDSL` 是各自资源的内容事实源
- `VBIReportSnapshotDSL` 只是导出、复制、预加载时使用的聚合快照，不反向成为新的运行时事实源
- `ResourceRegistry` 属于 `createVBI()` 实例上下文，不进入资源 DSL 本体

### 2. vbi_be 改为 `report / chart / insight` 三表模型，由数据库主导结构关系

后端不能继续沿用“一个 `document` 表承载所有资源”的模式，也不采用统一 `Resource` 主表和单独引用关系表，而是直接围绕三类业务对象建模：

- 业务主表只有 `report`、`chart`、`insight`
- `page` 是 report 的内嵌结构，不单独建表，也不是独立资源
- report 内的 `page.chartId` / `page.insightId` 直接表达引用关系
- 数据库中的 `report / chart / insight` 关系是事实源；前端 DSL 只是接口成功后的投影
- 后端提供 report 结构编排接口，而不是允许前端仅靠本地 DSL 修改 page 结构：
  - 创建 report 时，只保证首个 page 能拿到引用资源
  - 新增 page、删除 page、修改标题、重排 page、绑定或解绑 `chartId / insightId`，都先走后端接口
  - 删除 page 时，只删除 report 结构中的引用，不删除被引用资源
  - 删除 chart / insight 前必须检查是否仍被任一 report page 引用
- 后端同时提供独立的 report / chart / insight CRUD 接口，用于前端列表页和管理页
- Hocuspocus `onLoadDocument` 按 `type` 初始化空文档：
  - chart -> 空 chart DSL
  - report -> 空 report-ref DSL
  - insight -> 空 insight DSL
- 协同房间统一使用 `type:id`，避免不同资源类型共享同一 room 语义

### 3. vbi_fe 改为“报告路由 + 管理路由 + 按类型进入编辑器”

前端入口按新的信息架构拆分：

- `/reports`
  - 展示 report 列表
  - 支持 report 增删改查
  - 点击 report 后进入 `/reports/:id`
- `/manage`
  - 作为资源管理页容器
  - 下挂 `/manage/charts`
  - 下挂 `/manage/insights`
- `/manage/charts`
  - 支持 chart 独立增删改查
  - chart 详情或编辑能力继续复用 standard
- `/manage/insights`
  - 支持 insight 独立增删改查
  - insight 使用独立详情或编辑视图
- `/reports/:id`
  - 打开 report 详情与编辑页
  - 页面形态采用 standard-report 风格的类似 PPT 结构

前端协同层改为通用资源 hook：

- 现有 `useCollaborativeBuilder` 抽象为按 `type` 创建 builder 的工厂
- chart 管理页中的单资源编辑只连接一个 chart room
- report 页连接 report room；页面内 chart/insight preview/edit 再按需连接对应子 room
- report 页默认只连接当前 active page 所需的 chart/insight room，非激活页资源按需懒加载
- report 页不自己拼装 chart DSL；始终通过 chartId / insightId 打开子资源
- report 页上的 page 结构动作必须先调用后端接口，再刷新本地 report DSL / builder 投影

### 4. standard-report 改为资源编排壳层，而不是内嵌 report editor

standard-report 的职责边界需要收敛为：

- 它只负责 report page 容器、切页、active page、全屏编辑态、page 生命周期动作
- page 内图表区通过 chartId 打开 standard 的 view / edit 模式
- page 内洞察区通过 insightId 打开 insight 资源编辑器或只读视图
- 新增 page、删除 page、更新标题、排序、绑定资源时，不直接把本地 builder 当事实源，而是先调用后端编排接口
- 接口成功后，再把返回的最新 report 结构同步回本地 builder / DSL 投影
- 删除 page 时，只删除 report 结构中的引用，不触发 chart/insight 资源清理

这样能保证：

- report 是结构文档
- chart/insight 是内容文档
- chart/insight 可以被多个 report 复用
- report 可以在纯 DSL 层通过 `snapshot()` 导出完整闭包内容
- standard 仍是 chart 体验唯一来源
- standard-report 不再依赖旧的“page 内嵌 chart/text”假设

必须覆盖以下场景：

- 在 `/manage/charts` 中可以独立增删改查 chart，并进入 chart 编辑体验
- 在 `/manage/insights` 中可以独立增删改查 insight，并进入 insight 编辑体验
- 在 `/reports` 中可以独立增删改查 report
- 创建 report 文档后，后端会自动为首个 page 建立可用引用，且这些资源后续可被其他 report 复用
- 点击某个 report 后，进入 `/reports/:id`，并能基于 chartId / insightId 正确渲染第一页
- report 内新增 page 时，可以选择新建 chart/insight 资源，也可以绑定已有资源，且新 page 自动激活；整个过程先落后端再更新本地结构
- 删除 page 时，只移除引用关系，report 激活页回退到合法 page，被引用资源仍可被其他 report 使用
- 同时打开两个 chart 页、一个 report 页时，多个 room 互不串写
- 同一 chart 或 insight 被两个 report 引用时，在任一 report 中编辑后，另一 report 中应看到同一资源的最新结果
- report 页中编辑某个 chart 后，返回 report 视图能看到更新；切换 page 不影响其他 chart room
- insight 资源编辑只影响对应 insightId，不会污染 report 结构文档
- `reportBuilder.snapshot()` 在不调用业务接口的前提下，能返回当前 report 引用到的完整 chart / insight DSL 闭包
- Hocuspocus 对不同 `type` 能正确初始化空文档，且 `type:id` room 能恢复快照与增量更新

## Assumptions

- 本次 ADR 接受 packages/vbi report 模型从“内嵌 chart/text”升级为“引用 chart/insight”，这是接入方案成立的前提
- insight 不是 report 私有子资源，而是可独立被引用的资源；首期不作为顶层常用创建入口暴露
- report 的 page 顺序、标题、active page 由 report 结构负责，但结构事实源以数据库编排结果为准，本地 DSL 只保存其投影
- chart 与 insight 必须支持跨 report 复用；删除 page 只删除引用，不删除资源本体
- 删除资源本体前必须经过引用校验，避免破坏其他 report
- `ResourceRegistry` 只代表当前 `createVBI()` 实例内已装载资源，不负责远端拉取、持久化或引用校验
- 不重新引入泛化根事实模型 `VBIDSL`；聚合能力通过 `VBIReportSnapshotDSL` 表达
- 不引入 report 根级 buildVQuery() / buildVSeed()；查询与渲染仍属于 chart 资源

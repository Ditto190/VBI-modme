# ADR: apps/vbi_be 采用 report / chart / insight 三表模型

## Summary

`apps/vbi_be` 不再把所有协同对象都抽象成统一 `Resource` 主表，也不为 `page` 单独建表。

本次后端资源模型只保留三类业务主对象：

- `report`
- `chart`
- `insight`

其中：

- `page` 是 `report` 的内嵌结构，不是独立资源
- 数据库中的 `report / chart / insight` 关系是事实源
- DSL 只是在接口成功后同步更新的投影，不再承担结构事实源职责

## Decision

### 1. 只保留三张业务主表

后端只维护三张业务主表：

- `report`
- `chart`
- `insight`

每张表至少包含：

- `id`
- `name`
- `meta`
- `createdAt`
- `updatedAt`

不再引入：

- 统一 `Resource` 主表
- 独立 `page` 表

### 2. Page 归属 report，不单独落表

`page` 是 report 的结构子对象，只存在于 report 的结构内容中。

它至少包含：

- `pageId`
- `title`
- `chartId`
- `insightId`
- `position`

这意味着：

- 一个 page 的生命周期由所属 report 管理
- page 不能脱离 report 独立存在
- page 不拥有独立协同 room
- page 的增删改都表现为 report 结构变更

### 3. 数据库是结构事实源，DSL 是投影

report / page / chart / insight 的关系以数据库为准。

具体约束：

- 创建、查询、更新、删除 report、chart、insight 后，前端再同步更新本地 DSL 或页面状态
- 新增 page、删除 page、page 排序、page 改标题、page 绑定或解绑 `chartId` / `insightId`，都必须先走后端接口
- 接口成功后，前端或协同层再把最新结构反映到 DSL

因此：

- DSL 不再被视为 page 结构的最终事实源
- 不能只改本地 report DSL 再期望后端反向推断真实关系
- 后端服务层必须显式负责 report 结构编排

### 4. 引用关系由 report 结构直接表达

不单独建引用关系表。

引用关系直接由 report 内的 page 结构表达：

- `page.chartId` 指向 chart
- `page.insightId` 指向 insight

后端查询关系时，以 report 结构为准推导：

- 一个 report 使用了哪些 chart / insight
- 某个 chart / insight 被哪些 report page 使用

这类查询可以通过解析 report 结构实现，必要时再做索引或物化优化，但不在本次 ADR 内引入新的业务事实表。

### 5. 删除策略改为“先校验引用，再删除资源”

- 删除 page：只修改 report 结构，不删除 chart / insight
- 删除 report：只删除 report 本身，不级联删除 chart / insight
- 删除 chart / insight：先校验是否仍被任一 report page 引用；若仍被引用，则拒绝删除

这保证：

- chart / insight 可以被多个 report 复用
- page 删除不会误删底层资源
- 删除资源的约束由数据库侧关系检查负责

### 6. 后端提供独立资源 CRUD 接口

为了支撑前端“报告页 + 管理页”的信息架构，后端必须提供独立资源 CRUD：

- report 的增删改查
- chart 的增删改查
- insight 的增删改查

其中：

- report 列表接口用于 `/reports`
- chart / insight 管理接口用于 `/manage/charts` 与 `/manage/insights`
- report 详情接口返回可驱动 standard-report 的结构数据
- chart / insight 详情接口返回可驱动独立管理页和编辑页的数据

### 7. 协同存储附着在三类资源上

协同快照和增量更新仍然归属于 `report`、`chart`、`insight` 三类资源之一。

本 ADR 不要求为此额外抽象出新的业务主表，只要求：

- 每份协同内容都能明确归属到一个 report/chart/insight
- report 的协同内容保存 report 自身结构
- chart 的协同内容保存 chart DSL
- insight 的协同内容保存 insight DSL

## Consequences

优点：

- 模型更直觉，直接贴合产品对象
- `page` 不会被误建成独立资源
- 数据库关系与前端页面结构一致
- 后端可以明确掌控 page 生命周期与引用校验

代价：

- report 结构变更必须走后端接口，不能继续默认“本地 DSL 先改”
- 查询“某资源被哪些 report page 引用”时，需要解析 report 结构
- 需要迁移当前 `Document / DocumentUpdate` 的单表式服务边界

## Non-Goals

本 ADR 不包含：

- page 独立资源化
- 通用 `Resource` 超类型抽象
- 引用关系物化表或统计优化表
- 前端如何缓存或合并后端返回的结构细节

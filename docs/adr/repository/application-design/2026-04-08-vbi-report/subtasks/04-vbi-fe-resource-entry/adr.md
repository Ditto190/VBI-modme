# ADR: apps/vbi_fe 改为资源列表与按类型编辑入口

## Summary

前端不能再默认所有文档都是 chart。新的资源方案要求页面信息架构显式区分：

- report 管理与 report 编辑
- chart 独立管理
- insight 独立管理

同时，report 结构仍由后端接口主导。

## Decision

### 1. 页面分为“报告路由”和“管理路由”

前端至少提供两类顶层路由：

- 报告路由：`/reports`
- 管理路由：`/manage`

其中：

- `/reports` 负责 report 列表与 report CRUD
- `/manage` 负责资源管理导航与子路由容器

### 2. 管理页拆分 chart / insight 子路由

管理页下至少拆出：

- `/manage/charts`
- `/manage/insights`

要求：

- chart 支持独立增删改查管理
- insight 支持独立增删改查管理
- 管理页能在两个子路由间切换

### 3. report 路由同时承担列表与进入编辑器

report 路由至少包含：

- `/reports`：report 列表与 CRUD
- `/reports/:id`：report 详情与编辑页

其中：

- `/reports` 允许用户新增、删除、重命名、查看 report
- 点击某个 report 后进入 `/reports/:id`
- `/reports/:id` 使用 standard-report 风格的类似 PPT 页面结构

### 4. 编辑页按资源类型装配

- chart 管理页中的 chart 详情或编辑能力继续复用 standard
- report 详情页使用 standard-report
- insight 管理页使用独立 insight 编辑或详情视图

### 5. 协同 hook 抽象为资源工厂

原有面向单 chart 的协同 hook 需要收敛为：

- 按资源类型创建 builder
- 按资源类型生成 room
- 为 report 页按需打开子资源

### 6. report 结构变更改为“后端先写，前端再投影”

前端对 report 的 page 结构不再做本地事实修改。

report 页上的以下动作都必须先调用后端接口：

- 新增 page
- 删除 page
- 更新 page 标题
- page 排序
- 绑定或解绑 `chartId` / `insightId`

接口成功后，前端再用返回结果刷新本地 report DSL / builder 投影。

## Consequences

优点：

- 前端信息架构与资源模型一致
- chart / insight 可以被独立管理
- report 页面可以显式管理子资源连接
- report 结构不会与数据库事实源漂移

代价：

- 路由、页面装配、状态管理都需要进一步拆分
- report 页面除了协同 hook，还需要接入结构编排 API
- 管理页需要额外承担 chart / insight 的 CRUD UI

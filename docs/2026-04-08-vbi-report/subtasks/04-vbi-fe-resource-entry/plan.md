# Plan: apps/vbi_fe 报告路由、管理路由与资源协同接入改造

> 基于 ADR: `./adr.md`

## 范围

本计划覆盖 `apps/vbi_fe` 的报告路由、管理路由、页面装配和资源协同 hook。

## TDD 与质量约束

1. 先补列表页、路由分流、管理页子路由、资源 hook 的失败测试
2. 页面壳子可以先搭，但可交互行为必须由测试锁定
3. report 页对子资源的访问行为不能只靠手工点击验证
4. chart / insight 的独立管理不能只靠接口调通判断完成
5. 收尾前至少覆盖页面入口、路由命中、资源连接、独立 CRUD 四类行为

## Phase 1: 搭建报告路由与管理路由骨架

任务：

1. 先补顶层路由分流与导航的失败测试
2. 新增 `/reports`
3. 新增 `/manage`
4. 在 `/manage` 下挂出 charts / insights 子导航

## Phase 2: 实现 report 列表与编辑入口

任务：

1. 先补 report 列表 CRUD 的失败测试
2. `/reports` 展示 report 列表
3. `/reports` 支持 report 新增、删除、重命名、进入详情
4. 新增 `/reports/:id`
5. `/reports/:id` 接入 standard-report 风格的类似 PPT 页面结构

## Phase 3: 实现 chart / insight 独立管理页

任务：

1. 先补 chart / insight 管理页 CRUD 的失败测试
2. 新增 `/manage/charts`
3. 新增 `/manage/insights`
4. `/manage/charts` 支持 chart 独立增删改查
5. `/manage/insights` 支持 insight 独立增删改查
6. chart 的详情或编辑能力继续复用 standard
7. insight 的详情或编辑能力接入独立视图

## Phase 4: 收敛协同 hook

任务：

1. 抽象按资源类型创建 builder 的通用 hook
2. 统一 room 生成规则
3. 为 report 页提供 `resourceGateway`
4. 支持按需打开 chart / insight 子资源

## Phase 5: 接入 report 结构编排接口

任务：

1. 为 report 页接入新增 page、删除 page、更新 page、重排 page 的后端接口
2. 为 report 页接入绑定 / 解绑 `chartId` 与 `insightId` 的后端接口
3. 确保 page 结构变更总是“接口成功后再更新本地 DSL 投影”
4. 补 report 结构接口与本地 builder 同步的失败测试

## Phase 6: 验证

任务：

1. 验证 `/reports` 下 report 列表 CRUD
2. 验证点击 report 后进入类似 PPT 的 standard-report 页面
3. 验证 `/manage/charts` 下 chart 独立 CRUD
4. 验证 `/manage/insights` 下 insight 独立 CRUD
5. 验证 report 页对子资源的按需连接
6. 验证 report 页结构变更必须经过后端接口

验收标准：

1. 页面上存在 `/reports` 与 `/manage` 两类顶层入口
2. `/manage/charts` 与 `/manage/insights` 可独立管理 chart / insight
3. `/reports` 可完成 report 列表 CRUD
4. 点击 report 后可进入 standard-report 风格的类似 PPT 页面
5. report 结构变更不再以本地 DSL 为事实源
6. 关键页面流转、资源连接、结构同步、独立 CRUD 行为有自动化测试

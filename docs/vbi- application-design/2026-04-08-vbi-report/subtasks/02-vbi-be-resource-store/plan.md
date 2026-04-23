# Plan: apps/vbi_be 三表资源模型与 report 结构编排

> 基于 ADR: `./adr.md`

## 范围

本计划只覆盖 `apps/vbi_be`：

- `report / chart / insight` 三张业务主表
- 归属于三类资源的协同存储映射
- report page 结构编排接口
- 删除资源前的引用校验

本计划不覆盖：

- 前端接入
- page 独立资源化
- 通用 `Resource` 超类型抽象
- 引用关系物化表或统计优化表

## TDD 与质量约束

1. 先写服务层测试，再改 Prisma 模型和接口实现
2. page 新增、page 删除、page 重排、绑定资源、删除资源校验必须先有失败测试
3. 不允许只靠解析 DSL 的手工验证代替自动化测试
4. 收尾前必须完成资源生命周期和 report 结构编排的自动化测试
5. 任何“数据库为准”的行为，都必须通过服务层接口体现，不能只改本地 DSL

## Phase 1: 落三张业务主表与协同归属

任务：

1. 先补 `report / chart / insight` 创建、查询、删除的失败测试
2. 在 Prisma 中定义 `report`、`chart`、`insight` 三张业务表
3. 明确协同 snapshot / update 如何归属到三类资源之一
4. 移除仅以统一 `Document` 语义承载业务对象的接口假设

完成标准：

1. 后端可以独立表达 `report / chart / insight`
2. 每份协同内容都能明确归属到其中一种资源
3. 测试能覆盖三类资源的基础生命周期

## Phase 2: 落 report 结构编排接口

任务：

1. 先补 report page 生命周期的失败测试
2. 提供创建 report 接口，并支持返回初始 page 结构
3. 提供新增 page、删除 page、更新 page、page 重排接口
4. 提供 page 绑定 / 解绑 `chartId` 与 `insightId` 的接口
5. 确保所有 page 结构变更都由后端落库后再返回最新结构

完成标准：

1. page 不需要独立表也能被稳定编排
2. report 结构修改都有明确后端写路径
3. 接口返回结果可以直接作为前端 DSL 投影来源

## Phase 3: 落独立资源 CRUD 接口

任务：

1. 先补 report、chart、insight 独立增删改查的失败测试
2. 提供 report 列表、详情、创建、更新、删除接口
3. 提供 chart 列表、详情、创建、更新、删除接口
4. 提供 insight 列表、详情、创建、更新、删除接口
5. 保证这些接口能直接服务 `/reports`、`/manage/charts`、`/manage/insights`

完成标准：

1. report 可以被单独管理
2. chart 可以被单独管理
3. insight 可以被单独管理

## Phase 4: 落引用查询与删除校验

任务：

1. 先补“资源仍被 page 引用时拒绝删除”的失败测试
2. 基于 report 结构解析 `chartId / insightId`，实现引用查询
3. 提供查询“一个 report 使用了哪些 chart / insight”的接口或服务能力
4. 提供查询“某个 chart / insight 被哪些 report page 使用”的接口或服务能力
5. 在删除 chart / insight 前增加引用校验
6. 保证删除 page 只修改 report 结构，不删除底层资源

完成标准：

1. chart / insight 被引用时不能被误删
2. 删除 page 不会级联删除 chart / insight
3. report 与资源的引用关系可被稳定查询

## Phase 5: 迁移协同加载与初始化边界

任务：

1. 让协同加载能按 `report / chart / insight` 三类资源识别内容归属
2. 为三类资源分别定义空内容初始化策略
3. 保证 report 协同内容保存 report 自身结构，而不是内嵌 chart / insight 生命周期
4. 清理旧的单 `Document` 业务语义在协同层的耦合点

完成标准：

1. 三类资源的协同内容边界清晰
2. report 空文档初始化不会退回 chart-only 假设
3. 协同层与三表业务模型对齐

## Phase 6: 验证

任务：

1. 为 `report / chart / insight` 三类资源补服务层测试
2. 为 report、chart、insight 独立 CRUD 补服务层测试
3. 为 page 新增、删除、重排、绑定、解绑补服务层测试
4. 为删除资源前的引用校验补回归测试
5. 为协同内容归属和空文档初始化补测试

验收标准：

1. 后端存在 `report / chart / insight` 三张业务主表
2. page 不是独立资源，但可以通过 report 接口稳定编排
3. report、chart、insight 都支持独立 CRUD
4. 数据库关系是事实源，前端只能在接口成功后更新 DSL 投影
5. report page 删除不会级联删除底层资源
6. 删除 chart / insight 前存在引用校验
7. 三类资源的协同内容归属清晰，且初始化策略正确

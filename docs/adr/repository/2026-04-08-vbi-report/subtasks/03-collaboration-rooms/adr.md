# ADR: 协同房间统一为 `{type}:{id}`

## Summary

新的资源模型下，协同上下文只属于三类业务资源：

- `report`
- `chart`
- `insight`

因此 room 不能再只依赖 `id`，必须显式带上资源类型；同时 `page` 不拥有独立 room。

## Decision

### 1. room 命名统一为 `{type}:{id}`

示例：

- `chart:123`
- `report:456`
- `insight:789`

这样可以避免同一个 `id` 在不同资源类型下共享状态语义。

明确约束：

- `report` 有自己的 room
- `chart` 有自己的 room
- `insight` 有自己的 room
- `page` 没有自己的 room，page 结构始终归属 report room

### 2. Hocuspocus 按资源类型初始化空文档

`onLoadDocument` 根据 `type` 初始化：

- `chart` -> 空 chart DSL
- `report` -> 空 report 引用结构 DSL
- `insight` -> 空 insight DSL

### 3. 协同内容按资源类型与资源 id 读写

协同存储层需要确保：

- 加载路径与 room 解析一致
- 持久化对象与资源类型匹配
- 断连恢复后仍能得到正确类型的默认文档

这里不再假设存在统一 `Resource` 主表，只要求：

- 每份 snapshot / update 都明确归属于某个 `report/chart/insight`
- report 内容只保存 report 自身结构
- chart / insight 内容分别保存各自 DSL

## Consequences

优点：

- 不同资源类型彻底隔离
- `page` 不会被误接成独立协同对象
- room 命名可直接用于排障和观测

代价：

- 前后端所有协同接入点都要同步改造

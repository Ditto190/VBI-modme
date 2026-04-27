# ADR History

本目录统一管理仓库的历史上下文、架构决策、执行计划与主题讨论。

目录约定：

- `repository/`: 仓库级架构与决策历史
- `packages/`: package 级设计与演进记录
- `practices/`: practice 示例的设计与计划

组织原则：

- 一个主题一个目录，保留 `goal.md`、`adr.md`、`plan.md` 等原始材料
- 示例源、讨论稿、验收记录等上下文文件，跟随所属主题或所属 package 保存
- 新增历史文档时，优先放入 `repository/`、`packages/`、`practices/` 的对应子目录，不再在仓库其他位置分散创建 `docs/`

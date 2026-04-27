# Plan: `@visactor/vbi-agent` 的假设-实验-验证循环

> 基于 [`./adr.md`](./adr.md)

## 目标

为 `@visactor/vbi-agent` 增加稳定的分析方法论和批量实验能力，让数据分析任务默认走“提出多个假设 -> 批量实验 -> 查看 DSL 验证 -> 继续迭代”。

## 范围

包含：

- 新增内建 skill `hypothesis-loop`
- 新增 tool `vbi_experiment`
- 更新 skill registry 与 history 提示
- 补充测试
- 新增 package 级 ADR

不包含：

- 自动生成实验脚本的高阶 planner
- 并行执行沙箱
- 持久化实验历史

## 坏味道扫描

1. 只有 builder skill，没有分析 loop skill，职责缺口明显。
2. 只有单脚本工具，没有批量实验工具，分析任务存在重复操作。
3. 验证口径分散，容易把自然语言判断当作证据。

## 执行顺序

1. 新增 `hypothesis-loop` skill
2. 新增 `vbi_experiment` tool
3. 更新 registry / history / tests
4. 补齐 `docs/adr/packages/vbi-agent`
5. 执行仓库级验证

## 验收

1. Agent 能通过 `read_skill` 读取 `hypothesis-loop`
2. Agent 能通过 `vbi_experiment` 一次处理多个假设
3. 结论格式包含 `supported` / `rejected` / `inconclusive`
4. `pnpm lint` 与 `pnpm typecheck` 通过

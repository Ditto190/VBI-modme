# ADR: 为 `@visactor/vbi-agent` 增加“假设-实验-验证”循环

状态：Accepted；日期：2026-04-27

## 背景

`@visactor/vbi-agent` 当前已经有 Builder 操作能力，但缺少分析方法论。面对“为什么这个图表结果不对”“字段为什么没有生效”“哪个 DSL 改动更合理”这类问题时，Agent 容易一次性押注单个解释，直接修改 DSL 或给出口头答案。

这有三个问题：

1. 没有显式假设列表，思考过程不可验证。
2. 没有批量实验工具，多个假设只能零散手工执行。
3. 没有统一的验证口径，容易把感觉当成结论。

## 决策

在 `@visactor/vbi-agent` 内新增一个内建 skill 和一个批量实验 tool，形成稳定的分析闭环。

### Skill

新增内建 skill `hypothesis-loop`，职责只有一个：把分析任务收敛为“假设-实验-验证”的循环。

它要求 Agent：

- 默认提出 2-4 个可区分的假设
- 按信息价值和成本排序
- 每个实验只测试一个假设
- 通过 `build()`、`buildVQuery()`、`buildVSeed()` 或结构化结果验证
- 用 `supported` / `rejected` / `inconclusive` 标记结论

### Tool

新增 tool `vbi_experiment`。

输入是实验数组，每个实验至少包含：

- `hypothesis`
- `code`
- `goal`（可选）

执行方式：

- 顺序执行每个实验脚本
- 为每个实验注入 `workspace`、`chart`、`report`、`experiment`
- 捕获日志、结果和错误
- 单个实验失败不终止整批

输出方式：

- 返回每个实验的 `status`
- 返回结构化 `result` 或 `error`
- 汇总成功 / 失败数量

## 边界

1. `vbi_experiment` 负责批量执行，不负责替模型自动裁决业务真相。
2. 实验结论仍然必须基于 DSL 或工具输出中的结构化证据。
3. 打开 Builder 资源不等于保存资源；默认验证发生在查看 DSL 阶段，而不是写回阶段。
4. Skill 负责方法论约束，Tool 负责执行载体，二者分离。

## 后果

正向影响：

- Agent 在分析类任务中不再只有单路径推断。
- 多个假设可以在一次工具调用里完成对照实验。
- 结论能回溯到具体 DSL、QueryDSL、VSeedDSL 或实验产物。

代价：

- 工具调用输入更长，需要模型遵守结构化实验格式。
- 如果实验脚本写得过宽，仍可能得到混杂证据，因此 skill 必须限制实验粒度。

## 验证要求

至少覆盖以下验证：

1. `read_skill` 能列出并读取 `hypothesis-loop`
2. `vbi_experiment` 能批量执行实验
3. 单个实验失败时，其他实验结果仍然返回
4. 仓库级 `lint` 和 `typecheck` 通过

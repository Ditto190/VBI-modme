---
name: development
description: >
  当任务涉及 VBI monorepo 开发时使用：apps、packages、practices、website
  文档、仓库级工作流、生成物、验证命令、事实源决策、软件熵治理、
  可维护性、重构、删除死代码，以及约束 LLM 生成的混乱代码。
---

# VBI 开发手册

这是 VBI 仓库级开发手册。主文件只保留核心原则；只在改动对应包、实践
或软件熵风险时加载相关参考资料。

## 熵预算

每次改动都必须降低或至少不增加维护成本。编辑前必须完成：

1. 读取相关代码，确认责任归属。
2. 明确列出发现的坏味道：重复代码、长函数、大文件、死导出、紧耦合、
   过期注释、生成文件、历史兼容别名、霰弹式修改、临时字段。
3. 选择最小的降熵动作：删除、简化、抽取、迁移责任归属，或修改
   事实源后重新生成。
4. 删除时同步清理下游引用：import、调用、类型、注释、测试、文档和生成物。

优先删除未使用路径，而不是保留可选分支。不要留下注释掉的代码；不要新增
没有明确迁移理由的兼容 alias。

## 仓库责任归属

除非 package 脚本另有要求，命令都从仓库根目录执行。

- `packages/vbi`：VBIChartDSL、Builder、协同状态。
- `packages/vquery`：VQueryDSL 到 SQL 与查询执行。
- `packages/vseed`：VSeedDSL 到 VChart/VTable spec。
- `packages/vbi-agent`：Builder Agent runtime 与工具协议。
- `packages/vbi-react`：React 集成包。
- `apps/*`：产品应用、官网、后端、provider、CLI。
- `practices/*`：独立实践示例应用。

如果一次改动跨越多个责任归属，先判断边界是否错误。平台 app 消费 package
公开 API；package 不应感知 app、provider、页面、CLI 的实现细节。

## 事实源

- VBIChartDSL、VQueryDSL、VSeedDSL 驱动核心行为。
- Provider 负责平台资源访问和 Builder 创建。
- Builder 负责 DSL mutation；UI、CLI、agent 层应调用 Builder 或 package
  公开 API，不要手写 DSL 内部变更逻辑。
- 先修改源模块；派生文档、测试、构建产物必须通过责任归属方的生成器更新。
- 不要把手改生成文件作为主要修复方式。
- 每个 practice 保持独立：不要从另一个 practice import `src/*`。
- 使用 package 公开 API 或本地抽象，不要越级依赖实现细节。

## 参考资料

只加载相关参考资料：

- `references/software-entropy.md`：熵审计流程、VBI 专属坏味道、编辑前检查清单。
- `references/vseed.md`：`packages/vseed`、VSeed 示例、生成的 VSeed 文档。
- `references/practice-minimalist.md`：`practices/minimalist`。
- `references/practice-standard.md`：`practices/standard`。
- `references/practice-streamlined.md`：`practices/streamlined`。
- `references/practice-professional.md`：`practices/professional`。

`practices/vbi-react-starter` 是 `@visactor/vbi-react` package 集成 starter。
它和四个自包含 practice app 分开处理。

## 验证

代码改动后的仓库级门禁：

```bash
pnpm run lint:check
pnpm run typecheck
```

有责任归属范围内的脚本时，同时执行聚焦验证：

```bash
pnpm --filter <package-name> run test
pnpm --filter <package-name> run lint
pnpm --filter <package-name> run typecheck
```

如果改动涉及生成物，先运行生成器，再检查生成 diff。无法执行的必要验证
必须明确报告。

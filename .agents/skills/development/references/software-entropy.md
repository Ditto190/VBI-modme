# 软件熵治理

当任务涉及可维护性、重构、清理、约束 LLM 生成代码，或任何可能扩大 VBI
长期维护面的改动时，使用这份参考资料。

## VBI 熵源

这些是风险信号，不代表自动缺陷：

- 生成文件会掩盖真实责任归属。示例、文档、API 页面、聚合测试必须追溯到
  源类型、示例或生成器。
- 大文件会集中行为知识。当前热点包括 VSeed lowering/sandbox 代码、官网
  guide 的大数据文件、大型生成示例测试，以及 `practices/standard` 的密集
  UI panel。
- legacy 和 TODO 路径主要聚集在 DSL 兼容、filter、axis、selector API、
  demo drag/drop payload。
- 跨层捷径代价很高：package 依赖 app 行为、UI 重建 Builder 内部逻辑、
  practice 共享私有 `src/*` 都会增加变更成本。
- LLM 输出容易新增平行抽象，而不是复用 Builder、Provider、DSL、
  local connector 或 practice 内已有 utility。

## 编辑前检查清单

改代码前简要写下这些结论：

- Owner：package、app、practice、generator 或 docs。
- 事实源：DSL type、Builder method、Provider API、example JSON、
  generator script 或本地 utility。
- 坏味道：重复代码、长方法、大组件、死导出、过期注释、临时字段、
  长参数列表、数据泥团、紧耦合、霰弹式修改。
- 生成面：哪些文件必须重新生成，而不是手动 patch。
- 删除影响：必须同步移除的 import、调用、export、测试、文档、注释、
  生成引用。
- 验证：仓库门禁，加责任归属范围内的聚焦测试或生成器。

## VBI 反模式

- 把手改生成官网文档、生成 API 页面、生成示例测试作为主要修复方式。
- 新增没有日期、迁移理由和窄测试保护的兼容 alias。
- 让 `packages/*` import `apps/*`、practice 代码、页面 store、CLI adapter、
  provider internal 或 test helper。
- 让一个 practice import 另一个 practice 的 `src/*`；要么把思路复制到本地
  utility，要么把可复用 API 上移到 package。
- UI 代码绕过 Builder 或 package 公开 API，自己重建 VBIChartDSL、VQueryDSL、
  VSeedDSL mutation。
- 在 UI 层透传宽泛 prop bag，而不是用 hook、store selector 或小型本地对象
  表达数据边界。
- 删除实现后继续保留注释代码、未使用样式类、死测试或过期文档。

## 重构规则

- 遵循第一性原理，做符合直觉的设计和实现
- 遵循小函数, 小文件理念, 单个文件不超过 100 行, 单个函数不超过 50 行
- 过长方法/函数（Long Method） — 超过 30-40 行就该拆分。
- 过大类/God Class — 一个类/模块承担太多职责，必须拆分。
- 一旦发现坏味道，必须果断重构或删除，绝不留情。删除时必须同时清理所有相关引用：包括导入语句、函数调用、变量引用、类型定义、注释、测试用例、文档等下游影响。绝不允许留下“孤儿代码”或“死引用”。
- 常见坏味道清单（必须熟练内化并主动检测）：重复代码（Duplicated Code） — 相同或高度相似的逻辑出现两次以上，必须提取成函数/工具函数/组件。
- 重构后代码必须更简洁、可读性更高、职责更单一。遵循 Single Source of Truth 原则：VBIChartDSL、VQueryDSL、VSeedDSL 驱动核心功能
- 过度耦合（Tight Coupling） — 模块间直接依赖具体实现，应改用接口或依赖注入。
- 冗余注释（Redundant Comments） — 代码本身能表达的含义不需要注释，删除无用注释。
- 死代码/未使用代码（Dead Code） — 任何未被调用、未被导入、未被测试使用的代码，必须彻底删除。
- 长参数列表（Long Parameter List） — 超过 4-5 个参数应使用对象或配置对象。
- 数据泥团（Data Clumps） — 总是成组出现的变量，应封装成类或对象。
- 临时字段（Temporary Field） — 只在某些情况下使用的字段，应重构。
- 不恰当的暴露（Inappropriate Intimacy） — 模块之间过度了解彼此内部实现。
- 发散式变化 / 霰弹式修改（Divergent Change / Shotgun Surgery） — 一个变化需要改动多个地方，说明需要重新划分模块。
- 在每次修改前，先扫描一遍代码，列出发现的所有坏味道。
- 重构时优先使用删除而不是“保留但注释掉”。
- 删除后必须验证：代码仍能正常编译/运行，且功能不变或更好。
- 输出时只给出最终干净代码 + 必要的简短说明（说明删除了哪些坏味道）。
- 绝不输出“可以保留”“看情况”“为了兼容”等优柔寡断的语言。

记住： 优秀的代码不是写出来的，而是删出来的。保持极致简洁是你的最高使命。

## 验证

降熵工作必须同时证明“已删除”和“行为仍正确”：

- 用 `rg` 检查被删 symbol、旧名称、TODO marker、兼容 alias、被删文件名。
- 源变更影响生成文件时，先运行生成器，再跑仓库门禁。
- 先跑责任归属范围内的聚焦测试，再跑 `pnpm run lint:check` 和
  `pnpm run typecheck`。
- 即使只改 Markdown，也执行仓库门禁，除非用户明确缩小验证范围。

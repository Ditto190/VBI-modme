# AGENTS.md

This file provides guidance to Coding Agent when working with code in this repository.

## 目录结构

```
VBI/
├── apps/                           # 应用层：文档站点、前端、后端
│   ├── vbi_be/                     # VBI 后端应用
│   ├── vbi_cli/                    # VBI CLI 应用壳
│   ├── vbi_fe/                     # VBI 前端应用
│   ├── vbi_provider/               # VBI Provider 应用
│   └── website/                    # 官网文档、示例与 playground
├── packages/                       # 包级实现
│   ├── vbi/                        # 配置层，负责 VBIChartDSL、Builder、协同编辑
│   ├── vbi-agent/                  # Builder Agent runtime 与工具协议
│   ├── vquery/                     # 查询层，负责 QueryDSL → SQL 与数据查询
│   ├── vseed/                      # 渲染层，负责 VSeedDSL → VChart/VTable Spec
│   └── vbi-react/                  # React 适配与集成层
├── practices/                      # 不同复杂度的实践示例
│   ├── standard/                   # 标准版示例
│   ├── minimalist/                 # 极简实现示例
│   ├── professional/               # 偏业务化的完整示例
│   ├── streamlined/                # 精简结构示例
│   └── vbi-react-starter/          # React Starter 示例
├── docs/                           # 仓库文档与历史上下文
│   ├── adr/                        # 历史决策、主题设计、实践记录统一入口
│   │   ├── repository/             # 仓库级 ADR 与跨应用主题设计
│   │   ├── packages/               # package 级历史文档
│   │   └── practices/              # practice 级历史文档
│   ├── skills/                     # 面向 agent 的参考资料
│   └── superpowers/                # 其他专题文档
├── tools/                          # 开发辅助脚本与工具
├── docker/                         # 本地运行与部署相关容器配置
├── skills/                         # 仓库内置的开发辅助技能
├── README.md                       # 项目总览与使用说明
├── AGENTS.md                       # Coding Agent 协作说明
└── CLAUDE.md                       # Claude Code 协作说明
```

## 常用命令

请查阅`scripts`(packages.json), 在根目录下执行.

## 验证|

每次修改必须执行并通过项目仓库级别的 lint 和 typecheck

## 规范

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

## 执行纪律
- 在每次修改前，先扫描一遍代码，列出发现的所有坏味道。
- 重构时优先使用删除而不是“保留但注释掉”。
- 删除后必须验证：代码仍能正常编译/运行，且功能不变或更好。
- 输出时只给出最终干净代码 + 必要的简短说明（说明删除了哪些坏味道）。
- 绝不输出“可以保留”“看情况”“为了兼容”等优柔寡断的语言。

记住： 优秀的代码不是写出来的，而是删出来的。保持极致简洁是你的最高使命。

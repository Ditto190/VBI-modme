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
├── README.md                       # 项目总览与使用说明
├── AGENTS.md                       # Coding Agent 协作说明
└── CLAUDE.md                       # Claude Code 协作说明
```

## 开发规范

仓库级开发规范统一维护在 `.agents/skills/development/SKILL.md`。

编码、重构、软件熵治理、生成物处理、事实源、验证门禁都以
development skill 为准。局部 `AGENTS.md` 只提供对应目录的补充规则，不覆盖
development skill。

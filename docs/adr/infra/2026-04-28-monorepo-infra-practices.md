# ADR: Monorepo 工程化实践基线

状态：Accepted；日期：2026-04-28

## 背景

VBI 是 pnpm workspace + Turborepo 管理的 monorepo，仓库同时包含 `apps/`、`packages/`、`practices/`、`tools/` 和文档站。工程化配置如果分散，会带来几个直接问题：

- 根脚本、Turbo 任务、CI 步骤三处语义漂移，导致本地和 CI 跑的不是同一套任务。
- `build`、`typecheck`、`test`、`lint` 的产物语义混在一起，缓存命中后难以判断结果是否可信。
- 多套 TS base config 让新增 package 时必须霰弹式复制 `target`、`lib`、`paths`、`references`、`noEmit`、`composite`。
- workspace 范围如果同时由 `package.json.workspaces` 和 `pnpm-workspace.yaml` 描述，会产生两个 source of truth。

本 ADR 沉淀当前仓库的工程化基线，后续新增任务、package、CI job 或 TS 配置时应优先遵循。

## 决策

### 根脚本只保留稳定入口

根 `package.json` 应作为开发者和 CI 的统一入口。适合放在根脚本里的命令必须满足以下条件：

- 仓库级行为清晰，例如 `build`、`typecheck`、`test`。
- 本地与 CI 可以复用同一条命令。
- 不隐藏副作用。会修改文件的命令用独立入口表达，例如 `lint` 执行 fix，`lint:check` 只检查。

当前约定：

```json
{
  "build": "turbo build",
  "typecheck": "turbo typecheck",
  "test": "turbo test",
  "test:update": "turbo test:update",
  "format": "oxfmt .",
  "format:check": "oxfmt --check .",
  "lint": "oxlint --fix .",
  "lint:check": "oxlint ."
}
```

`dev` 不强行纳入 Turbo。交互式、本地长驻、只服务单个应用的入口可以直接 `pnpm --filter=<pkg> run dev`，避免 Turbo 任务图承担非缓存型流程。

`tui` 可以先通过 Turbo 构建依赖，再进入 CLI 自身命令。这个模式适合“先保证依赖产物存在，再运行 app 壳”的场景：

```json
{
  "tui": "turbo build --filter=@visactor/headless-bi-cli && pnpm --filter=@visactor/headless-bi-cli run tui"
}
```

### Turbo 只缓存真实产物

Turbo 任务必须区分“产生文件”和“只校验”：

- `build` 声明真实产物，默认 `outputs: ["dist/**"]`。
- 特殊包单独覆盖产物，例如 `website#build` 使用 `outputs: ["doc_build/**"]`。
- `typecheck`、`test` 只校验，不声明产物，使用 `outputs: []`。
- `test:update` 会更新快照或 fixtures，必须关闭缓存。
- 上游包的 `dist` 仍是当前 TS references 和 package `types` 的事实依赖，所以 `typecheck`、`test` 继续 `dependsOn: ["^build"]`。

这条规则的核心是：缓存的是可复用产物，不是命令名称。校验类任务不能把 `dist/**` 或 `doc_build/**` 伪装成自己的输出，否则缓存命中会掩盖真实验证。

### 全局输入进入 `globalDependencies`

会影响全仓库任务结果的文件必须放入 `turbo.json.globalDependencies`。当前应至少覆盖：

- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `tsconfig.test.json`
- `.oxlintrc.json`
- `.oxfmtrc.json`

新增全局配置时，先判断它是否会影响 build/typecheck/test 的结果。会影响就加入 `globalDependencies`，否则不要扩大缓存失效面。

### CI 只做检查，不做修复

CI 不能运行会修改文件的命令。格式和 lint 在 CI 中必须使用 check 入口：

```yaml
- run: pnpm run format:check
- run: pnpm run lint:check
```

本地可以使用 `pnpm run lint` 做自动修复，但 CI 只能报告失败。这样可以避免 PR 在 CI 环境中产生未提交修改，也能让 lint 失败保持可复现。

CI 中的 Turbo cache 先使用 GitHub Actions 本地 cache：

```yaml
path: .turbo/cache
key: turbo-${{ runner.os }}-${{ github.job }}-${{ github.sha }}
restore-keys: |
  turbo-${{ runner.os }}-${{ github.job }}-
  turbo-${{ runner.os }}-
```

这个方案优先服务 build/typecheck/test 的本地缓存复用。remote cache 是否接入，后续单独评估权限、隔离、成本和 cache poisoning 风险。

### TS 配置保持单一基线

根部只保留两个通用配置：

- `tsconfig.base.json`：生产和库构建的默认基线。
- `tsconfig.test.json`：测试类型检查的覆盖层，只覆盖测试必须不同的选项。

`target` 和 `lib` 应全仓库统一，当前基线为：

```json
{
  "target": "ES2022",
  "lib": ["ES2022", "DOM"]
}
```

除非有明确编译失败或运行时约束，否则 package、app、practice 不应重复声明 `target` 和 `lib`。继承 base 后，只保留局部真正需要的配置，例如：

- app 需要 `jsx`、`noEmit`、`composite: false`。
- library 需要 `outDir`、`rootDir`、`paths`、`references`。
- test config 需要 `noEmit: true`、`emitDeclarationOnly: false`。
- NodeNext 或 CommonJS 工具如果暂不继承 base，也必须手动保持同一组 `target/lib`。

不要重新拆出 `tsconfig.app.json`、`tsconfig.library.json` 这类中间层，除非出现多个无法用局部覆盖表达的稳定类型族。新增中间层前必须证明它减少了重复，而不是增加继承链。

### Workspace 只认 pnpm

workspace 范围只由 `pnpm-workspace.yaml` 管理。不要在根 `package.json` 中再添加 `workspaces` 字段。一个仓库只能有一个 workspace source of truth。

### 测试脚本不要伪造

有真实测试套件的 package 才添加 `test` 或 `test:update`。没有测试的 package 不要添加 no-op 脚本，否则 Turbo 会把“没有测试”伪装成“测试通过”。

已有测试但缺少更新入口时，按测试框架补对应命令：

- Rstest 使用 `rstest --update`。
- Jest 使用 `jest --updateSnapshot`。

## 维护规则

新增或调整工程化配置时，按以下顺序判断：

1. 这个改动是否改变根入口、Turbo 任务图、CI 行为或 TS 全局基线。
2. 如果会改变，先更新单一 source of truth，再删除重复局部配置。
3. 如果新增缓存输出，确认它是真实产物。
4. 如果新增校验任务，默认 `outputs: []`。
5. 如果新增会修改文件的任务，不要在 CI 中直接运行。
6. 如果新增 package，优先继承 `tsconfig.base.json`，只写局部差异。

## 验证清单

工程化改动必须至少执行：

```bash
pnpm run format:check
pnpm run lint:check
pnpm run typecheck
pnpm run build
pnpm run test
```

涉及 TS 配置时，额外检查：

```bash
rg '"target"|"lib"' --glob 'tsconfig*.json'
rg 'tsconfig\.app|tsconfig\.library' --glob 'tsconfig*.json' --glob 'turbo.json'
```

涉及 Turbo 配置时，额外检查：

```bash
pnpm turbo build --dry
pnpm turbo typecheck --dry
pnpm turbo test --dry
pnpm turbo test:update --dry
```

检查重点：

- website 构建产物只声明 `doc_build/**`。
- 其他 build 产物默认只声明 `dist/**`。
- `typecheck`、`test` 的 `outputs` 为空。
- `test:update` 不缓存。
- `globalDependencies` 覆盖所有会影响全仓库结果的配置文件。

## 后果

收益：

- 本地与 CI 使用同一套入口，验证路径更短。
- Turbo cache 语义更可信，构建产物和校验任务边界清晰。
- TS 配置更少，新增 package 不再复制大段 compiler options。
- workspace、TS base、Turbo global input 都有单一事实源。

代价：

- `typecheck` 和 `test` 仍依赖 `^build`，干净环境会先构建上游包。
- app 需要显式覆盖 `noEmit`、`emitDeclarationOnly` 和 `composite`，避免继承 library 构建语义。
- remote cache 暂未纳入，需要后续单独决策。

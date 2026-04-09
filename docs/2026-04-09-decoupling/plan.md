# Plan: 基于 `@visactor/vbi-app-sdk` 的平台级 Headless BI 执行计划

> 基于 [`./adr.md`](./adr.md)
> 本文件用于指导落地顺序，目标是把当前 `vbi_fe / vbi_be` 雏形演进为真正的平台级 Headless BI

## 目标

围绕 `@visactor/vbi-app-sdk` 建立统一的平台接入层，使页面、CLI、任意 JS 运行时都通过同一套 Provider 操作 `chart / insight / report` 资源。

完成后应具备：

- `apps/packages/vbi-app-sdk` 作为平台级应用 SDK
- `ChartProvider / InsightProvider / ReportProvider` 三种一等入口
- Provider 可直接返回对应 Builder
- 后端明确分成管理面与数据面
- `vbi_fe` 通过 SDK 而不是页面私有逻辑访问资源
- 新增 `vbi_cli` 作为 SDK 的命令行消费者

## 范围

包含：

- `apps/packages/vbi-app-sdk`
- `packages/vbi`
- `apps/vbi_be`
- `apps/vbi_fe`
- `apps/vbi_cli`

不包含：

- 权限系统、多租户、版本历史
- 非 JS 运行时 SDK
- 复杂缓存策略与离线同步
- 第三方开放协议适配

## 开发原则

### Provider First

任何新增资源能力，都优先思考：

1. 这个能力是否应该先进入 `@visactor/vbi-app-sdk` 的 Provider 接口
2. 页面和 CLI 是否只是它的消费者
3. 它是否建立在协同文档和 Builder 之上

禁止：

- 先在页面里做一套私有能力，再考虑抽 SDK
- 先在 CLI 里做一套私有命令逻辑，再考虑复用

### TDD 约束

所有有行为变化的任务都遵循：

1. 先写失败测试
2. 再写最小实现
3. 最后重构与命名收敛

### 质量约束

1. Provider 接口变更必须有对应测试或最小可执行验证
2. 每个阶段结束必须执行该模块最小验证命令
3. 合并前必须通过仓库级 `lint` 和 `typecheck`
4. 不允许把 `Bytes` 继续泄漏到业务层 REST 接口
5. 不允许页面绕过 SDK 直接成为长期主路径

## 执行顺序

必须按以下顺序推进：

1. `vbi-app-sdk` 包稳定
2. 后端管理面 / 数据面收敛
3. SDK 远程 Provider 运行时实现
4. `vbi_fe` 接入 SDK
5. `vbi_cli` 接入 SDK
6. 联调验收与示例文档

原因：

- 没有稳定 SDK 契约，前后端都会各自发明接口
- 没有后端双平面，Provider 无法成为真正的一等入口
- 没有 SDK 运行时，前端和 CLI 都无法复用

## 执行清单

### Step 1: 稳定 `apps/packages/vbi-app-sdk` 包结构与接口边界

目标：

- 把 `@visactor/vbi-app-sdk` 从脚手架升级为正式契约包

包含：

- 包目录结构、构建配置、lint / typecheck 对齐 monorepo
- `VBIPlatformClient`
- `ChartProvider / InsightProvider / ReportProvider`
- 共享资源语义：`create / remove / rename / open / close / getBuilder / getSummary / getDetail / snapshot`
- Provider 返回 Builder 的类型契约

完成定义：

- `apps/packages/vbi-app-sdk` 可独立 `build / lint / typecheck`
- 对外导出稳定
- README 与 docs 说明该包定位
- 不依赖 React / DOM

阻塞项：

- 无

### Step 2: 收敛后端双平面能力

目标：

- 把 `apps/vbi_be` 从“页面后端”收敛为“Provider 后端”

包含：

- 管理面：
  - 资源创建 / 删除 / 重命名
  - 资源 summary / detail 查询
  - report 结构编排命令
  - 引用检查与快照导出
- 数据面：
  - `chart / insight / report` 协同文档打开
  - 快照恢复
  - 增量同步

完成定义：

- REST 只暴露业务 JSON
- Hocuspocus / Yjs 协议只承担协同数据面
- `chart / insight / report` 三类资源都能独立连接协同文档
- `report` 仍只负责编排，不吞掉内容资源

阻塞项：

- 依赖 Step 1 的 SDK 接口边界初步稳定

### Step 3: 在 `vbi-app-sdk` 中实现远程 Provider 运行时

目标：

- 让 SDK 不只是类型契约，而是可连接后端的真实运行时

包含：

- `createVBIPlatformClient(config)` 的真正实现
- transport 抽象：
  - 管理面请求
  - 数据面协同连接
- Provider 生命周期：
  - `open / close`
  - Builder 缓存与复用
  - detail / snapshot 获取

完成定义：

- `ChartProvider.open()` 可返回可操作的 `VBIChartBuilder`
- `InsightProvider.open()` 可返回可操作的 `VBIInsightBuilder`
- `ReportProvider.open()` 可返回可操作的 `VBIReportBuilder`
- SDK 既可在浏览器环境运行，也可在 Node.js 环境运行

阻塞项：

- 依赖 Step 2 的后端双平面能力可用

### Step 4: `vbi_fe` 从页面私有逻辑迁移到 SDK

目标：

- 页面不再直接拼 REST 调用和协同 hook，而是统一消费 `@visactor/vbi-app-sdk`

包含：

- 把现有资源 services 收敛成 SDK 调用
- 把现有协同 hook 收敛成 Provider 消费
- 管理页通过 Provider 完成资源 CRUD
- report 页通过 `ReportProvider` 获取 report builder，并按引用打开 chart / insight provider

完成定义：

- `vbi_fe` 页面主路径不再直接依赖私有资源访问逻辑
- 页面通过 SDK 拿 Builder
- 页面里的资源操作语义与 CLI 保持一致

阻塞项：

- 依赖 Step 3 的 SDK 运行时可用

### Step 5: 新建 `apps/vbi_cli`，作为 SDK 的命令行消费者

目标：

- 让 CLI 成为平台能力的第二个正式入口

包含：

- 新建 `apps/vbi_cli`
- 设计首批命令：
  - `chart create/get/update/remove`
  - `insight create/get/update/remove`
  - `report create/get/remove`
  - `report page add/remove/reorder`
  - `report snapshot`
- CLI 内部统一通过 `@visactor/vbi-app-sdk` 调用 Provider

完成定义：

- CLI 不绕过 SDK 直接访问私有后端逻辑
- 常见资源操作可通过命令行完成
- CLI 输出结果为稳定 JSON 或可读文本

阻塞项：

- 依赖 Step 3 的 SDK 运行时可用

### Step 6: 联调验收与文档示例

目标：

- 验证 SDK 真正成为平台一等入口

必须验证以下场景：

1. 页面能通过 SDK 独立管理 chart
2. 页面能通过 SDK 独立管理 insight
3. 页面能通过 SDK 独立管理 report
4. 页面能通过 `ReportProvider` 打开 report，并通过引用打开 chart / insight
5. CLI 能创建并操作三类资源
6. CLI 能编排 report page
7. Node.js 脚本能直接通过 SDK 打开 Builder
8. Builder 编辑结果能通过协同链路正确同步
9. REST 不再泄漏原始 `Bytes`
10. `report` 结构编排与 `chart / insight` 内容编辑边界清晰

完成定义：

- 页面、CLI、脚本三种入口都能通过 SDK 操作资源
- Builder 生命周期由 Provider 管理
- 无页面私有主路径残留

## 建议并行方式

允许并行：

- Step 2 后端双平面设计 与 Step 3 SDK transport 设计可交叉推进
- Step 4 页面迁移 与 Step 5 CLI 骨架搭建可并行

不要并行：

- 在 Step 1 未稳定前同时推进页面和 CLI 主路径改造
- 在 Step 2 未稳定前锁定 Provider 远程实现细节

## 验证命令

阶段性验证优先执行最小命令：

```bash
pnpm --filter=@visactor/vbi-app-sdk run build
pnpm --filter=@visactor/vbi-app-sdk run lint
pnpm --filter=@visactor/vbi-app-sdk run typecheck
pnpm --filter=vbi_be run lint
pnpm --filter=vbi_be run typecheck
pnpm --filter=vbi_fe run lint
pnpm --filter=vbi_fe run typecheck
```

联调前执行仓库级验证：

```bash
pnpm run lint
pnpm run typecheck
```

## 退出条件

以下条件全部满足，才算本主题完成：

1. `@visactor/vbi-app-sdk` 已成为稳定的一等平台入口
2. 三种 Provider 的边界清晰且可直接返回 Builder
3. 后端已完成管理面 / 数据面分层
4. `vbi_fe` 已以 SDK 为主路径
5. `vbi_cli` 已能通过 SDK 操作资源
6. 任意 JS 运行时都可以通过 SDK 连接资源
7. 业务层不再泄漏原始协同二进制

# Acceptance

## Summary

本主题的主路径已经收敛到：

- 页面通过 `@visactor/vbi-provider` 访问资源
- CLI 通过 `@visactor/vbi-provider` 访问资源
- Node.js 脚本可通过 `@visactor/vbi-provider` 直接打开 Builder
- 后端显式分成 REST 管理面与 collaboration 数据面

## Scenario Matrix

1. 页面管理 chart：`apps/vbi_fe/src/services/chartApi.ts` 只通过 SDK 调用 `listCharts / chart(id)`
2. 页面管理 insight：`apps/vbi_fe/src/services/insightApi.ts` 只通过 SDK 调用 `listInsights / insight(id)`
3. 页面管理 report：`apps/vbi_fe/src/services/reportApi.ts` 只通过 SDK 调用 `listReports / report(id)`
4. 页面打开 report / chart / insight builder：`apps/vbi_fe/src/hooks/useCollaborativeBuilder.ts`
5. CLI 管理三类资源：`apps/vbi_cli/src/chart-command.ts`、`apps/vbi_cli/src/insight-command.ts`、`apps/vbi_cli/src/report-command.ts`
6. CLI 编排 report page：`apps/vbi_cli/src/report-command.ts`
7. Node.js 脚本通过 SDK 打开 Builder：`apps/packages/vbi-provider/README.md`
8. Builder 协同链路：`apps/packages/vbi-provider/src/remote-collaboration.ts` 通过 session 元信息连接 Hocuspocus
9. REST 不泄漏 `Bytes`：`apps/vbi_be/src/chart/chart.controller.ts`、`apps/vbi_be/src/insight/insight.controller.ts`、`apps/vbi_be/src/report/report.controller.ts`
10. `report` 结构编排边界清晰：`apps/vbi_be/src/report/report.service.ts` 只编排 page 与引用，不吞并 chart / insight 内容

## Validation

已通过的代码级验证：

```bash
pnpm --filter=@visactor/vbi-provider run test
pnpm --filter=@visactor/vbi-provider run build
pnpm --filter=@visactor/vbi-provider run lint
pnpm --filter=@visactor/vbi-provider run typecheck
pnpm --filter=vbi_be run test
pnpm --filter=vbi_be run build
pnpm --filter=vbi_be run lint
pnpm --filter=vbi_be run typecheck
pnpm --filter=vbi_fe run test
pnpm --filter=vbi_fe run lint
pnpm --filter=vbi_fe run typecheck
pnpm --filter=vbi_cli run test
pnpm --filter=vbi_cli run build
pnpm --filter=vbi_cli run lint
pnpm --filter=vbi_cli run typecheck
pnpm run lint
pnpm run typecheck
```

已通过的 docker 联调验证：

```bash
docker compose -f docker/docker-compose.dev.yml up --build -d
curl http://localhost:3000
curl http://localhost:3030/api/v1/charts
node apps/vbi_cli/dist/cli.js chart list
node apps/vbi_cli/dist/cli.js chart create --name AcceptanceChart-20260409
node apps/vbi_cli/dist/cli.js report create --name AcceptanceCliReport-20260409
node apps/vbi_cli/dist/cli.js report get <reportId>
node apps/vbi_cli/dist/cli.js report snapshot <reportId>
```

已通过的 SDK runtime 实测：

- Node.js 脚本通过远程 Provider 成功执行 `chart / insight / report create`
- Node.js 脚本通过 `ReportProvider` 成功执行 `createPage / reorderPages / exportSnapshot`
- Node.js 脚本通过 `ChartProvider.open()`、`InsightProvider.open()`、`ReportProvider.open()` 成功拿到 Builder
- CLI 在 docker 后端上成功执行 `chart list / create / get` 与 `report create / get / snapshot`
- 前端 dev 容器成功编译，`useCollaborativeBuilder` 对应的 SDK data-plane 路径已恢复可用

联调中修复的真实问题：

- `docker-compose.dev.yml` 前端容器缺少 `apps/packages` 挂载，导致容器内找不到 `apps/packages/vbi-provider`
- `remote-collaboration.ts` 在使用外部 `websocketProvider` 时未执行 `provider.attach()`，导致 websocket 已连接但 provider 永远不同步
- `remote-collaboration.ts` 的 `waitForSync` 存在监听竞态，已补成无竞态实现
- `remote-report-provider.ts` 对 report page 编排接口的 DTO 投影错误，后端返回 `pages`，SDK 之前错误地按 `dsl.pages` 读取
- `vbi_cli` 在 Node 运行时显式加载 SDK CJS 入口，避免 ESM 依赖链干扰 CLI 管理面路径

建议联调顺序：

```bash
pnpm --filter=vbi_be run start:dev
pnpm --filter=vbi_fe run dev
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js chart create --name Revenue
node apps/vbi_cli/dist/cli.js report create --name Review
node apps/vbi_cli/dist/cli.js report page reorder <reportId> --page-ids <pageIds>
```

## Exit Check

- 页面、CLI、脚本三种入口都已通过 SDK 收口
- Provider 已成为 Builder 生命周期唯一主入口
- 管理面与数据面职责边界清晰
- 页面私有主路径残留已删除

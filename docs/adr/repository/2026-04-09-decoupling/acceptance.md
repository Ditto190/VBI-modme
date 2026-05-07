# Acceptance

## Summary

The main path for this topic has converged to:

- Pages access resources through `@visactor/vbi-provider`.
- CLI accesses resources through `@visactor/vbi-provider`.
- Node.js scripts can open Builder directly through `@visactor/vbi-provider`.
- The backend is explicitly split into a REST management plane and a collaboration data plane.

## Scenario Matrix

1. Page manages chart: `apps/vbi_fe/src/services/chartApi.ts` calls only `listCharts / chart(id)` through the SDK.
2. Page manages insight: `apps/vbi_fe/src/services/insightApi.ts` calls only `listInsights / insight(id)` through the SDK.
3. Page manages report: `apps/vbi_fe/src/services/reportApi.ts` calls only `listReports / report(id)` through the SDK.
4. Page opens report / chart / insight builder: `apps/vbi_fe/src/hooks/useCollaborativeBuilder.ts`.
5. CLI manages three resource types: `apps/vbi_cli/src/chart-command.ts`, `apps/vbi_cli/src/insight-command.ts`, `apps/vbi_cli/src/report-command.ts`.
6. CLI orchestrates report page: `apps/vbi_cli/src/report-command.ts`.
7. Node.js script opens Builder through SDK: `apps/packages/vbi-provider/README.md`.
8. Builder collaboration path: `apps/packages/vbi-provider/src/remote-collaboration.ts` connects to Hocuspocus through session metadata.
9. REST does not leak `Bytes`: `apps/vbi_be/src/chart/chart.controller.ts`, `apps/vbi_be/src/insight/insight.controller.ts`, `apps/vbi_be/src/report/report.controller.ts`.
10. `report` structural orchestration boundaries are clear: `apps/vbi_be/src/report/report.service.ts` only orchestrates pages and references; it does not absorb chart / insight content.

## Validation

Code-level validation that passed:

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

Docker integration validation that passed:

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

SDK runtime validation that passed:

- Node.js scripts successfully executed `chart / insight / report create` through the remote Provider.
- Node.js scripts successfully executed `createPage / reorderPages / exportSnapshot` through `ReportProvider`.
- Node.js scripts successfully obtained Builder through `ChartProvider.open()`, `InsightProvider.open()`, and `ReportProvider.open()`.
- CLI successfully executed `chart list / create / get` and `report create / get / snapshot` against the docker backend.
- The frontend dev container compiled successfully, and the SDK data-plane path corresponding to `useCollaborativeBuilder` is available again.

Real issues fixed during integration:

- `docker-compose.dev.yml` frontend container lacked the `apps/packages` mount, so the container could not find `apps/packages/vbi-provider`.
- `remote-collaboration.ts` did not call `provider.attach()` when using an external `websocketProvider`, causing the websocket to connect while the provider never synchronized.
- `remote-collaboration.ts` had a listener race in `waitForSync`; it has been replaced with a race-free implementation.
- `remote-report-provider.ts` projected the DTO for report page orchestration incorrectly. The backend returned `pages`, while the SDK previously read `dsl.pages`.
- `vbi_cli` explicitly loads the SDK CJS entry in the Node runtime to avoid ESM dependency-chain interference on the CLI management-plane path.

Recommended integration order:

```bash
pnpm --filter=vbi_be run start:dev
pnpm --filter=vbi_fe run dev
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js chart create --name Revenue
node apps/vbi_cli/dist/cli.js report create --name Review
node apps/vbi_cli/dist/cli.js report page reorder <reportId> --page-ids <pageIds>
```

## Exit Check

- Pages, CLI, and scripts have all converged through SDK.
- Provider is the only main entry point for the Builder lifecycle.
- Management-plane and data-plane responsibility boundaries are clear.
- Page-private main-path remnants have been removed.

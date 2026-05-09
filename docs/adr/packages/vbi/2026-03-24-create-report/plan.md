# Implementation Plan: VBI `createReport` and ReportBuilder

> Based on ADR: `./adr.md`
> TDD-driven: lock schema and API first, then reorganize directories and implement.

## Scope

This plan only covers `packages/vbi`: the `createReport` root entry point, renaming `types/dsl -> types/chartDSL`, adding `types/reportDSL`, implementing `VBIReportDSL` / `VBIReportBuilder` / `reportBuilder.page.*`, and updating related tests and generated artifacts. It does not include report-level `buildVQuery()` / `buildVSeed()`, multi-chart pages, or a rich-text system.

## Phase 1: Lock Public Behavior First

### 1.1 Schema tests

**Test file**: `packages/vbi/tests/types/reportSchemas.test.ts` (new)

Test coverage:

1. `zVBIReportDSL` correctly parses the minimal report DSL.
2. Missing `page.title` / `page.chart` / `page.text` is rejected.
3. `page.chart` continues to reuse `zVBIChartDSL` validation.
4. Defaults for `createEmptyReport()` and `createEmptyReportPage(connectorId)` are stable.

### 1.2 Builder API tests

**Test file**: `packages/vbi/tests/builder/reportBuilder.test.ts` (new)

Test coverage:

1. `VBI.report.create(report)` and `createVBI(...).report.create(report)` can create builders.
2. `reportBuilder.page.add('Story One', page => page.setChart(chartBuilder).setText('hello world'))` outputs the correct DSL.
3. `reportBuilder.page.remove(id)` / `update(id, callback)` behave correctly.
4. `setChart(chartBuilder)` copies the result of `chartBuilder.build()` instead of sharing a builder instance.
5. `build()` / `isEmpty()` / `applyUpdate()` / `encodeStateAsUpdate()` behavior is stable.

## Phase 2: Rename ChartDSL Directory and Add ReportDSL Types

**Changed scope**:

- `packages/vbi/src/types/dsl/**` -> `packages/vbi/src/types/chartDSL/**`
- `packages/vbi/src/types/reportDSL/**` (new)
- `packages/vbi/src/types/index.ts`

Changes:

1. Move existing chart schemas, types, and exports to `types/chartDSL`.
2. Add `report.ts` / `page.ts` / `text.ts` defining `VBIReportDSL`, `VBIReportPageDSL`, `VBIReportTextDSL`, and zod schemas.
3. Update all internal imports in `src/**` and `tests/**` to remove direct dependencies on the old `types/dsl` path.

## Phase 3: Empty DSL Helpers and Builder Core Preparation

**Changed files**:

- `packages/vbi/src/vbi/create-empty-report.ts` (new)
- `packages/vbi/src/vbi/create-empty-report-page.ts` (new)
- `packages/vbi/src/builder/builder.ts`
- `packages/vbi/src/builder/modules/**`
- `packages/vbi/src/types/builder/**`

Changes:

1. Add `createEmptyReport()` and `createEmptyReportPage(connectorId)`.
2. Extract `VBIChartBuilder` internals into a mode that can bind to any DSL map, so `page.chart` can reuse it.
3. Preserve root `createChart(...)` behavior; make "bind root map" just one special case.

## Phase 4: ReportBuilder and Page API

**Changed files**:

- `packages/vbi/src/builder/report-builder.ts` (new)
- `packages/vbi/src/builder/features/report-page/page-collection-builder.ts` (new)
- `packages/vbi/src/builder/features/report-page/page-builder.ts` (new)
- `packages/vbi/src/builder/index.ts`
- `packages/vbi/src/types/builder/VBIInterface.ts`

Changes:

1. Add `VBIReportBuilder` and `VBIReportBuilderInterface`.
2. Provide the main `reportBuilder.page.add/remove/update/get` entry points.
3. `page.add(title, callback)` writes the first argument to `page.title`.
4. `ReportPageBuilder` provides chainable `setChart(chartBuilder)` and `setText(content)` APIs.

## Phase 5: Root Entry, Exports, and Internal Migration

**Changed files**:

- `packages/vbi/src/vbi/create-vbi.ts`
- `packages/vbi/src/vbi/from/from-vbi-report-dsl-input.ts` (new)
- `packages/vbi/src/index.ts`
- `packages/vbi/src/vbi.ts`

Changes:

1. Add `report.create(...)` to the instance returned by `createVBI()`.
2. Export `report.create`, `report.createEmpty`, and `report.createEmptyPage` from `VBI`.
3. Default internal source and tests to `types/chartDSL` / `types/reportDSL` and the new report API.

## Phase 6: Generated Artifacts and Verification

```bash
pnpm --filter=@visactor/vbi run g
pnpm --filter=@visactor/vbi run test
pnpm run lint
pnpm run typecheck
```

Acceptance criteria:

1. `createReport`, `VBIReportDSL`, and `reportBuilder.page.*` pass tests and can build DSL reliably.
2. `types/chartDSL` / `types/reportDSL` paths are clear, with no old `types/dsl` references left inside the package.
3. Generated diffs only reflect report capability and directory naming alignment, with no unrelated behavior changes.

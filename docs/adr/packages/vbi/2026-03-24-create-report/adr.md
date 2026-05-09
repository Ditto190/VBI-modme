# ADR-006: VBI Report DSL and ReportBuilder

## Context

`ADR-005` aligned the single-chart capability around `createChart`, `VBIChartBuilder`, and `VBIChartDSL`. With those names clarified, VBI can introduce reports without overloading chart terminology.

This task only covers report modeling and builder design inside `packages/vbi`:

1. Add `VBI.report.create(...)` so report becomes a first-class entry point alongside chart.
2. A `report` contains multiple `page` nodes. Each `page` contains exactly one `chart` and one `text` block.
3. `VBIReportDSL`, its zod schema, and empty DSL helpers should follow the same style as `VBIChartDSL`.
4. `reportBuilder` should reuse `chartBuilder` usage patterns, implementation patterns, and collaborative editing behavior as much as possible.

There are three immediate risks:

1. Repeating chart fields at the report root would break Single Source of Truth.
2. Starting with a generic widgets/layout system would exceed current requirements.
3. Building a separate chart editing implementation for report would quickly cause behavior drift between chart and report.

## Decision

### 1. Use `createReport(...)` as the root entry

Add and document:

```ts
VBI.report.create(vbiReport, options)
createVBI(...).report.create(vbiReport, options)
```

Public names are unified as `VBIReportDSL` / `VBIReportDSLInput` / `zVBIReportDSL` / `createEmptyReport` / `createEmptyReportPage` / `VBIReportBuilder` / `VBIReportBuilderInterface` / `VBIReportBuilderOptions`. `chart` and `report` are peer capabilities under `VBI`.

### 2. Rename `types/dsl` to `types/chartDSL`, next to `types/reportDSL`

The current `types/dsl` directory actually contains the chart domain model. After report is introduced, it should not keep occupying a generic name. The directory layout should become:

1. `types/chartDSL/*`: existing `VBIChartDSL` and child node schemas.
2. `types/reportDSL/*`: new `VBIReportDSL`, `VBIReportPageDSL`, and `VBIReportTextDSL`.
3. `types/index.ts`: aggregate exports only; chart and report should not share the vague `dsl` directory name.

### 3. Report DSL uses a fixed page structure, not a generic block union

Initial DSL:

```ts
type VBIReportTextDSL = { content: string }
type VBIReportPageDSL = { id: string; title: string; chart: VBIChartDSL; text: VBIReportTextDSL }
type VBIReportDSL = { pages: VBIReportPageDSL[]; version: number }
```

Constraints:

1. `pages` must be an array because page order is business semantics.
2. `page.title` is the page display name. The first argument of `page.add('Story One', ...)` is written here directly.
3. `page.chart` embeds `VBIChartDSL` directly and is the single source of truth for chart configuration.
4. `page.text` stays minimal as `{ content }`; do not introduce rich-text schema in the first phase.
5. The `report` root does not add `connectorId`, avoiding double writes with `page.chart.connectorId`.

### 4. Defaults and empty DSL helpers follow chart style

Initial helper contract:

```ts
createEmptyReport() => { pages: [], version: 0 }
createEmptyReportPage(connectorId) => ({ id, title: '', chart: createEmptyChart(connectorId), text: { content: '' } })
```

`zVBIReportDSL` and `zVBIReportPageDSL` should use defaults in the same style, so `build()` output stays stable, minimal, and predictable.

### 5. `VBIReportBuilder` provides `reportBuilder.page.*`; chart lowering remains under `page.chart`

Initial builder shape:

```ts
class VBIReportBuilder {
  page: ReportPageCollectionBuilder
  build(): VBIReportDSL
  isEmpty(): boolean
  applyUpdate(...)
  encodeStateAsUpdate(...)
}
class ReportPageBuilder {
  setChart(chartBuilder: VBIChartBuilder): this
  setText(content: string): this
}
```

Rules:

1. `reportBuilder.page.add(title, callback)` / `remove(id)` / `update(id, callback)` are the main entries. `add` and `update` both return `reportBuilder` for chaining.
2. Recommended usage is `reportBuilder.page.add('Story One', page => page.setChart(chartBuilder).setText('hello world'))`.
3. `setChart(chartBuilder)` copies the result of `chartBuilder.build()` into the current page's `chart` subtree; it does not share the same builder instance.
4. `VBIReportBuilder` does not provide report-level `buildVQuery()` / `buildVSeed()`. Those capabilities still belong to `page.chart`.

### 6. Reuse the same chart builder core in implementation

Use one chart builder core bound to different DSL maps:

1. Each report `page.chart` is stored as an independent `Y.Map` in Yjs.
2. `ReportPageBuilder.chart` directly reuses `VBIChartBuilder`, but binds it to the `page.chart` subtree instead of the root `doc.getMap('dsl')`.
3. `VBI.chart.create(...)` is the special case where the chart builder binds to the root DSL map; inside a report page, it binds to a child map.
4. `VBIReportBuilderOptions` only passes chart-related adapters/options through to each `page.chart` builder.

## Reference

- `docs/adr/packages/vbi/2026-03-23-create-chart/adr.md`
- `packages/vbi/src/vbi/create-vbi.ts`
- `packages/vbi/src/vbi/create-empty-chart.ts`
- `packages/vbi/src/builder/builder.ts`
- `packages/vbi/src/types/builder/VBIInterface.ts`
- `packages/vbi/src/types/dsl/vbi/vbi.ts`
- `docs/adr/packages/vbi/2026-03-24-create-report/goal.md`

## Rejected Designs

- Do not design pages as generic `blocks: Array<Widget>`.
- Do not keep the generic `types/dsl` directory name.
- Do not duplicate chart fields such as `connectorId` at the report root.
- Do not add report-level `buildVQuery()` / `buildVSeed()`.
- Do not write a separate chart editing and lowering implementation for report.
- Do not support multiple charts per page or a rich-text style system in the first phase.

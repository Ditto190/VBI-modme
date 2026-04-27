---
name: report-builder
description: VBIReportBuilder page composition and snapshots.
version: 1.0.0
tags:
  - report
  - builder
  - dsl
tools:
  - vbi_builder
capabilities:
  - edit report pages and resource references
  - inspect report snapshots when embedded DSLs are needed
references: []
---

# VBIReportBuilder

Use `VBIReportBuilder` for report DSL and page composition. Open with `const r = await report.open(id?)`.

Core methods:

- `build()` returns validated `VBIReportDSL`: `{ uuid, pages, version }`.
- `snapshot()` returns `{ report, charts, insights }`; it requires a resource registry and throws when referenced resources are missing.
- `isEmpty()` checks report content; `getUUID()` returns resource uuid.
- `getChartBuilder(chartId)` and `getInsightBuilder(insightId)` resolve registry builders or return `undefined`.
- `applyUpdate(update, origin?)` and `encodeStateAsUpdate(stateVector?)` sync Yjs state.

Pages:

- `r.page.add(title, cb?)` creates an empty page with generated id, title, empty `chartId`, and empty `insightId`; it returns the report builder.
- `r.page.update(pageId, cb)` throws when page id is missing.
- `r.page.remove(pageId)` is a no-op when id is missing.
- `r.page.get(pageId)` returns a page builder or `undefined`.
- Page builder methods: `getId`, `setTitle`, `setChartId`, `setInsightId`, `toJSON`.
- Page builder getters: `page.chart` and `page.insight` resolve current ids through the report registry.

Resource references:

- `setChartId` and `setInsightId` accept a string id or any object with `getUUID()`.
- Use id strings for existing platform resources.
- Use builder objects only when they came from the same report registry.
- Read page references with `r.build().pages`.

Report DSL:

- Page DSL shape: `{ id, title, chartId, insightId }`.
- `chartId` and `insightId` default to empty strings.
- Report DSL shape: `{ uuid, pages, version }`; `pages` defaults to `[]`, `version` defaults to `0`.

Workflow:

1. Read `r.build()` before page updates or removals.
2. Use `assert(page, '...')` before `r.page.update(page.id, ...)`.
3. Use `snapshot()` only when embedded chart and insight DSLs are needed.
4. Return `json({ report: r.build() })` after mutations.

## Examples

Add pages:

```js
const r = await report.open()
r.page.add('Sales Overview', (p) => p.setChartId('chart-sales-overview'))
r.page.add('Key Findings', (p) => p.setInsightId('insight-sales-summary'))
return json({ report: r.build() })
```

Update a page title:

```js
const r = await report.open()
const firstPage = r.build().pages[0]
assert(firstPage, 'report has no pages')
r.page.update(firstPage.id, (p) => p.setTitle('Executive Summary'))
return json({ report: r.build() })
```

Edit a referenced chart when registry can resolve it:

```js
const r = await report.open()
const page = r.build().pages.find((item) => item.chartId)
assert(page, 'report has no chart page')
const c = r.getChartBuilder(page.chartId)
assert(c, `chart builder not found: ${page.chartId}`)
c.theme.setTheme('dark')
return json({ report: r.build(), chart: c.build() })
```

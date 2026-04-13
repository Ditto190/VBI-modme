---
'@visactor/vbi': patch
---

Refactor the VBI runtime API around `chart`/`insight`/`report` namespaces and align report APIs with the resource model.

Breaking changes:

- `createVBI()` no longer returns flat helpers such as `createChart`, `createInsight`, `createReport`, `generateEmptyChartDSL`, `generateEmptyInsightDSL`, `generateEmptyReportDSL`, or `generateEmptyReportPageDSL`. Use `chart.create`, `insight.create`, `report.create`, `chart.generateEmptyDSL`, `insight.generateEmptyDSL`, `report.generateEmptyDSL`, and `report.generateEmptyPageDSL` instead.
- Legacy report text DSL exports were removed. `VBIReportTextDSL`, `VBIReportTextDSLInput`, `zVBIReportTextDSL`, and the old `ReportTextBuilder` are no longer available.

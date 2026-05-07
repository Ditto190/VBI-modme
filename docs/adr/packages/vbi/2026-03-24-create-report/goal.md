## status: in-progress

Generate an architecture decision record named `./adr.md`.

Planned `packages/vbi` development tasks:

[] Add a new VBI feature, `VBI.report.create`, that creates a report container for organizing multiple charts.
[] A report contains multiple pages. Each page contains one chart and one text block.
[] Design an appropriate `VBIReportDSL`, including zod schema, with a style consistent with the current `VBIChartDSL`.
[] A `VBIReportDSL` should contain multiple pages. Each page should contain one `VBIChartDSL` and one text block.
[] Design `reportBuilder` so its usage style, API style, and implementation style are consistent with `chartBuilder` in VBI.

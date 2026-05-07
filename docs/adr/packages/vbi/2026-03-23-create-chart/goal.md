------
status: in-progress
---

---

Generate an architecture decision record named `./adr.md`.

Planned `packages/vbi` development tasks:

[] Deprecate the `from` API in VBI and replace it with `createChart(vbi)`.
[] Classify all existing builders under `chartBuilder`.
[] Use a consistent `VBIChart` prefix in the DSL, including the zod schema.
[] Rename `VBIDSL` to `VBIChartDSL`.

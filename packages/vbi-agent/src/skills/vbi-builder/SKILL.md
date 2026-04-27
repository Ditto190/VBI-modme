---
name: vbi-builder
description: Use when writing or reviewing vbi_builder scripts for VBI Chart, Report, or Insight builders inside VBI Agent.
---

# VBI Builder

Use this skill before writing or reviewing non-trivial `vbi_builder` scripts.

## Decision

- For chart DSL changes, read `chart-builder`.
- For report pages and snapshots, read `report-builder`.
- For insight text, read `insight-builder`.
- Builder references include focused examples.

## Runtime

Call `vbi_builder` with JavaScript. The script runs as an async function.

Globals:

- `workspace`: injected Builder workspace.
- `chart`: chart workspace slot with `open(id?)`, optional `describe(id?)`, optional `save(id?)`.
- `report`: report workspace slot with `open(id?)`, optional `describe(id?)`, optional `save(id?)`.
- `json(value)`: return `value` as the tool result.
- `assert(condition, message)`: throw a clear tool error when a precondition fails.
- `console.log/warn/error`: captured into tool logs.

Opening resources:

- use `vbi_resource` to list resources, then pass the id to `open(id)`.

Result rules:

- Return `json({ ... })` with only the information needed by the next step.
- Use `build()` for editable DSL, `buildVQuery()` for query DSL, `buildVSeed()` for render DSL.
- Use `snapshot()` on reports only when referenced chart or insight DSLs are needed.
- Throw with `assert` instead of returning ambiguous partial state.

## Workflow

1. Discover the target resource id when the CLI did not start with one.
2. Open the builder with `chart.open(id?)` or `report.open(id?)`.
3. After opening a resource, automatically save while editing. Validate the result by inspecting the DSL with `build()`, `buildVQuery()`, or `buildVSeed()` as needed.
4. Inspect the current DSL with `build()` before destructive updates.
5. Mutate only through public Builder APIs.
6. Use `assert(condition, message)` for missing fields, ids, pages, or builders.
7. Return concise structured data with `json(value)`.

## References

- `chart-builder`: VBIChartBuilder, dimensions, measures, filters, theme, locale, limit, and chart examples.
- `report-builder`: VBIReportBuilder page composition, snapshots, and report examples.
- `insight-builder`: VBIInsightBuilder content editing and insight examples.

Read only the references needed for the current task.

---
name: vbi-builder
description: Use when writing or reviewing vbi_builder scripts that operate VBI Chart or Report builders inside VBI Agent.
---

# VBI Builder

Use this skill before writing non-trivial `vbi_builder` scripts.

## Workflow

1. Open the active builder with `chart.open(id?)` or `report.open(id?)`.
2. Mutate the builder through public Builder APIs.
3. Inspect with `build()` unless rendered data is needed.
4. Return structured data with `json(value)`.

## References

- `runtime`: script globals, opening resources, result conventions.
- `chart-builder-api`: chart builder operations, encodings, chart types.
- `filters`: where/having filter rules and operators.
- `report-builder-api`: report page operations.

Read only the references needed for the current task.

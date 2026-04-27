---
name: insight-builder
description: VBIInsightBuilder content editing and runtime access.
version: 1.0.0
tags:
  - insight
  - builder
  - dsl
tools:
  - vbi_builder
  - vbi_resource
capabilities:
  - edit narrative insight content through report registries
  - describe when direct resource updates are required
references: []
---

# VBIInsightBuilder

Use `VBIInsightBuilder` for narrative insight content.

Core methods:

- `setContent(content: string): this` replaces insight text.
- `build()` returns validated `VBIInsightDSL`: `{ uuid, content, version }`.
- `isEmpty()` checks whether content is blank.
- `getUUID()` returns resource uuid.
- `applyUpdate(update, origin?)` and `encodeStateAsUpdate(stateVector?)` sync Yjs state.
- `undoManager` supports `undo`, `redo`, `canUndo`, `canRedo`, `clear`.

Defaults:

- Constructor ensures `uuid`.
- Missing `content` becomes `''`.
- Missing `version` becomes `0`.

Runtime access:

- `vbi_builder` currently exposes `chart` and `report` workspace slots.
- There is no top-level `insight.open()` slot in the current CLI runtime.
- Direct platform updates should use `vbi_resource` with `resource: 'insight'` and `action: 'update'`.
- Script edits should open a report and resolve with `r.getInsightBuilder(insightId)` or `page.insight`.

Guidelines:

- Keep content concise and user-facing.
- Do not store chart DSL, SQL, or debugging notes in `content` unless requested.
- Read existing `insight.build().content` before replacing long analysis.
- Use `assert(insight, '...')` because registry resolution can return `undefined`.

## Example

Resolve an insight builder from a report page and replace its content.

```js
const r = await report.open()
const page = r.build().pages.find((item) => item.insightId)
assert(page, 'report has no page with insightId')
const insight = r.getInsightBuilder(page.insightId)
assert(insight, `insight builder not found: ${page.insightId}`)
insight.setContent(['销售额主要由华东区域贡献。', '利润率低于平均值的品类需要进一步排查折扣和成本。'].join('\n'))
return json({ insight: insight.build(), report: r.build() })
```

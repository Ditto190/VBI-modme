---
'@visactor/vbi': patch
---

Refactor the VBI runtime API around explicit `chart` / `insight` / `report` namespaces and align report resource handling with dedicated resource stores.

Breaking changes:

- Rename empty DSL helpers on the namespace API:
  - `chart.generateEmptyDSL(...)` -> `chart.createEmpty(...)`
  - `insight.generateEmptyDSL(...)` -> `insight.createEmpty(...)`
  - `report.generateEmptyDSL(...)` -> `report.createEmpty(...)`
  - `report.generateEmptyPageDSL(...)` -> `report.createEmptyPage(...)`
- Remove the old `generate-empty-*` source files and helper names from `@visactor/vbi`.
- Split the internal resource registry into explicit chart and insight stores and move the implementation under `src/vbi/resources/`.

This change also updates the in-repo downstream usages in practices and apps to the new API.

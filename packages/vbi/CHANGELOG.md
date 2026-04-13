# @visactor/vbi

## 0.4.23

### Patch Changes

- f5a9ad0: Refactor the VBI runtime API around `chart`/`insight`/`report` namespaces and align report APIs with the resource model.

  Breaking changes:
  - `createVBI()` no longer returns flat helpers such as `createChart`, `createInsight`, or `createReport`, and the old empty helper names were removed. Use `chart.create`, `insight.create`, `report.create`, `chart.createEmpty`, `insight.createEmpty`, `report.createEmpty`, and `report.createEmptyPage` instead.
  - Legacy report text DSL exports were removed. `VBIReportTextDSL`, `VBIReportTextDSLInput`, `zVBIReportTextDSL`, and the old `ReportTextBuilder` are no longer available.
  - @visactor/vseed@0.4.23

## 0.4.22

### Patch Changes

- Updated dependencies [238fd91]
  - @visactor/vseed@0.4.22

## 0.4.21

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.21

## 0.4.20

### Patch Changes

- Updated dependencies [dbaada2]
  - @visactor/vseed@0.4.20

## 0.4.19

### Patch Changes

- 76dbf5c: feat: add adapters options for vbi create method, for custom buildQuery and buildChart
  - @visactor/vseed@0.4.19

## 0.4.18

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.18

## 0.4.17

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.17

## 0.4.16

### Patch Changes

- fba7871: feat: vtable allow empty dataset
- Updated dependencies [fba7871]
  - @visactor/vseed@0.4.16

## 0.4.15

### Patch Changes

- fix: ci not working
- Updated dependencies
  - @visactor/vseed@0.4.15

## 0.4.14

### Patch Changes

- 0179551: feat: vbi add undoManager
  - @visactor/vseed@0.4.14

## 0.4.13

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.13

## 0.4.12

### Patch Changes

- release vbi
- Updated dependencies
  - @visactor/vseed@0.4.12

## 0.4.11

### Patch Changes

- release packages/vbi
- Updated dependencies
  - @visactor/vseed@0.4.11

## 0.0.1

### Patch Changes

- d42ef8e: feat: release @visactor/vbi
- Updated dependencies [d42ef8e]
  - @visactor/vseed@0.4.10

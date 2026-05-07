# ADR-001: VBI Measure and Dimension Encoding

## Status

Proposed

## Context

VSeed measures and dimensions support an encoding design that maps data fields to visual channels. VBI needs to support this at the builder layer so users can:

1. Get the supported encoding types for a chart type.
2. Automatically set default encoding when adding dimensions or measures.
3. Dynamically update dimension or measure encoding.
4. Apply encoding correctly during `buildVSeed`.

### VSeed Encoding Type Definitions

**Dimension Encoding:**

```typescript
type DimensionEncoding =
  | 'xAxis' // X axis
  | 'yAxis' // Y axis
  | 'angle' // angle channel
  | 'color' // color channel
  | 'detail' // detail channel
  | 'tooltip' // tooltip channel
  | 'label' // label channel
  | 'row' // row channel
  | 'column' // column channel
  | 'player' // player axis channel
  | 'hierarchy' // hierarchy channel
```

**Measure Encoding:**

```typescript
type MeasureEncoding =
  | 'primaryYAxis' // primary Y axis
  | 'secondaryYAxis' // secondary Y axis
  | 'xAxis' // X axis
  | 'yAxis' // Y axis
  | 'angle' // angle channel
  | 'radius' // radius channel
  | 'size' // size channel
  | 'color' // color channel
  | 'detail' // detail channel
  | 'column' // column channel
  | 'label' // label channel
  | 'tooltip' // tooltip channel
  | 'value' // value channel
  | 'q1'
  | 'median'
  | 'q3' // box plot quartile
  | 'min'
  | 'max' // box plot extreme value
  | 'outliers' // box plot outliers
  | 'x0'
  | 'x1' // box plot range
```

### Dimension Encoding Supported by Chart Type

| Chart Type  | Supported Dimension Encoding                                    |
| ----------- | --------------------------------------------------------------- |
| PivotTable  | `row`, `column`                                                 |
| Table       | `column`                                                        |
| Line        | `xAxis`, `color`, `detail`, `tooltip`, `label`, `row`, `column` |
| Column      | `xAxis`, `color`, `detail`, `tooltip`, `label`, `row`, `column` |
| Bar         | `yAxis`, `color`, `detail`, `tooltip`, `label`, `row`, `column` |
| Pie         | `color`, `detail`, `tooltip`, `label`, `row`, `column`          |
| Donut       | `color`, `detail`, `tooltip`, `label`, `row`, `column`          |
| Scatter     | `color`, `detail`, `tooltip`, `label`, `row`, `column`          |
| Rose        | `angle`, `color`, `detail`, `tooltip`, `label`, `row`, `column` |
| Radar       | `angle`, `color`, `detail`, `tooltip`, `label`, `row`, `column` |
| Heatmap     | `color`, `tooltip`                                              |
| Funnel      | `color`, `label`, `tooltip`                                     |
| Histogram   | `xAxis`, `color`, `tooltip`, `label`                            |
| BoxPlot     | `color`, `tooltip`, `label`                                     |
| DualAxis    | `xAxis`, `color`, `detail`, `tooltip`, `label`                  |
| Hierarchy   | `hierarchy`                                                     |
| RaceColumn  | `player`, `color`, `detail`, `tooltip`, `label`                 |
| RaceBar     | `player`, `color`, `detail`, `tooltip`, `label`                 |
| RaceLine    | `player`, `color`, `detail`, `tooltip`, `label`                 |
| RacePie     | `player`, `color`, `detail`, `tooltip`, `label`                 |
| RaceDonut   | `player`, `color`, `detail`, `tooltip`, `label`                 |
| RaceScatter | `player`, `color`, `detail`, `tooltip`, `label`                 |

### Measure Encoding Supported by Chart Type

| Chart Type                    | Supported Measure Encoding                                         |
| ----------------------------- | ------------------------------------------------------------------ |
| PivotTable                    | `detail`                                                           |
| Table                         | `column`                                                           |
| Line                          | `yAxis`, `color`, `detail`, `label`, `tooltip`                     |
| Column                        | `yAxis`, `color`, `label`, `tooltip`                               |
| Bar                           | `xAxis`, `color`, `label`, `tooltip`                               |
| Pie                           | `angle`, `color`, `label`, `tooltip`                               |
| Donut                         | `angle`, `radius`, `color`, `label`, `tooltip`                     |
| Scatter                       | `xAxis`, `yAxis`, `size`, `color`, `label`, `tooltip`              |
| Rose                          | `angle`, `color`, `label`, `tooltip`                               |
| Radar                         | `angle`, `color`, `label`, `tooltip`                               |
| Heatmap                       | `color`, `label`, `tooltip`                                        |
| Funnel                        | `label`, `tooltip`                                                 |
| Histogram                     | `label`, `tooltip`                                                 |
| BoxPlot                       | `q1`, `median`, `q3`, `min`, `max`, `outliers`, `label`, `tooltip` |
| DualAxis                      | `primaryYAxis`, `secondaryYAxis`, `color`, `label`, `tooltip`      |
| Hierarchy                     | `label`, `tooltip`                                                 |
| Area                          | `yAxis`, `color`, `label`, `tooltip`                               |
| RaceColumn/Bar/Line/Pie/Donut | `label`, `tooltip`                                                 |
| RaceScatter                   | `size`, `label`, `tooltip`                                         |

## Decision

### 1. `builder.chartType` exposes supported encoding methods

```typescript
// Get supported dimension encoding types.
builder.chartType.getSupportedDimensionEncodings(): DimensionEncoding[]

// Get supported measure encoding types.
builder.chartType.getSupportedMeasureEncodings(): MeasureEncoding[]
```

### 2. Dimension nodes add `getEncoding` / `setEncoding`

```typescript
interface DimensionNode {
  getEncoding(): DimensionEncoding | undefined
  setEncoding(encoding: DimensionEncoding): void
}
```

### 3. Measure nodes add `getEncoding` / `setEncoding`

```typescript
interface MeasureNode {
  getEncoding(): MeasureEncoding | undefined
  setEncoding(encoding: MeasureEncoding): void
}
```

### 4. `buildVSeed` applies encoding correctly

VSeed's encoding pipe already creates the correct `Encoding` object from `dimension.encoding` / `measure.encoding`. VBI needs to ensure:

1. When users set encoding, the dimension/measure object passed to VSeed includes the `encoding` property.
2. VSeed's `encodingFor*` functions handle user-defined encoding automatically.

### 5. `builder.dimensions.addDimension` / `builder.measures.add` set default encoding automatically

```typescript
// Get the suggested default dimension encoding by chart type.
builder.chartType.getDefaultDimensionEncoding(): DimensionEncoding

// Get the suggested default measure encoding by chart type.
builder.chartType.getDefaultMeasureEncoding(): MeasureEncoding
```

When adding a dimension or measure, call the relevant method automatically to set default encoding.

### 6. Demo shelf components add encoding dropdowns

Add encoding dropdown selectors to dimension and measure shelf items in the demo project.

## Consequences

### Positive

- Users can choose different visual channel mappings for dimensions and measures.
- Default encoding is set automatically, simplifying user operations.
- VBI stays consistent with VSeed's encoding design.

### Negative

- Encoding logic needs to be added in several places.
- The demo UI needs to be updated.

## Reference

- VSeed encoding implementation: `packages/vseed/src/pipeline/advanced/chart/pipes/encoding/`
- VSeed table encoding implementation: `packages/vseed/src/pipeline/advanced/table/pipes/encoding/`
- VSeed dimension types: `packages/vseed/src/types/properties/dimensions/`
- VSeed encoding types: `packages/vseed/src/types/properties/encoding/`

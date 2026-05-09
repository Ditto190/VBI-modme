# 9. useVBIChartType — Chart Type Management

## Signature

```ts
const {
  chartType, // string; current chart type
  changeChartType, // (type: string) => void
  getAvailableChartTypes, // () => string[]; gets all available types
} = useVBIChartType(builder)
```

## Source

`practices/standard/src/hooks/useVBIChartType.ts`

## Usage Examples

### Change Chart Type

```ts
// Change to a column chart
changeChartType('column')

// Change to a pie chart
changeChartType('pie')

// Change to a data table
changeChartType('table')
```

### Get the Available Type List

```ts
const types = getAvailableChartTypes()
console.log('Supported chart types:', types)
```

---

## Chart Type Categories

| Category     | Types                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------- |
| Tables       | `table`, `pivotTable`                                                                       |
| Comparison   | `column`, `columnParallel`, `columnPercent`, `bar`, `barParallel`, `barPercent`, `dualAxis` |
| Trend        | `line`, `area`, `areaPercent`                                                               |
| Proportion   | `pie`, `donut`, `rose`, `roseParallel`, `funnel`                                            |
| Distribution | `scatter`, `heatmap`, `boxPlot`, `histogram`, `radar`                                       |
| Hierarchy    | `treeMap`, `sunburst`, `circlePacking`                                                      |
| Dynamic      | `raceBar`, `raceColumn`, `raceLine`, `raceScatter`, `racePie`, `raceDonut`                  |

---

## Implementation Details

- State subscription uses `builder.dsl.observe()` and listens for changes to the `chartType` field.
- `changeChartType` calls `builder.chartType.changeChartType(type)` directly; no transaction wrapper is required.
- The initial value is synchronized from `builder.chartType.getChartType()`.

---

## Notes

- After changing the chart type, VSeed rebuilds automatically and triggers a chart rendering update.
- Some chart types require specific encodings, such as `boxPlot` requiring q1/q3/min/max/median. VSeed fills these automatically.
- Prefer the `ChartTypeSelector` component (see component-patterns) for type selection instead of calling this hook directly.

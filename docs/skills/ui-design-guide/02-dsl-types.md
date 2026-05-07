# 2. DSL Type Quick Reference

Import types from `@visactor/vbi`.

---

## 2.1 VBIChartDSL (Root Type)

```ts
interface VBIChartDSL {
  connectorId: string // Connector identifier
  chartType: string // Chart type: 'column' | 'bar' | 'line' | 'pie' | ...
  dimensions: VBIDimension[] // Dimension array
  measures: VBIMeasure[] // Measure array
  whereFilter: VBIWhereGroup // WHERE filter tree
  havingFilter: VBIHavingGroup // HAVING filter tree
  theme: 'light' | 'dark' // Theme
  locale: 'zh-CN' | 'en-US' // Locale
  limit?: number // Row limit
  version: number
}
```

---

## 2.2 VBIDimension (Dimension)

```ts
interface VBIDimension {
  id: string
  field: string // Source field name
  alias: string // Display alias
  encoding?:
    | 'xAxis'
    | 'yAxis'
    | 'angle'
    | 'color'
    | 'detail'
    | 'tooltip'
    | 'label'
    | 'row'
    | 'column'
    | 'player'
    | 'hierarchy'
  aggregate?: {
    // Date aggregation
    func: 'toYear' | 'toQuarter' | 'toMonth' | 'toWeek' | 'toDay' | 'toHour' | 'toMinute' | 'toSecond'
  }
  sort?: { order: 'asc' | 'desc' }
}
```

---

## 2.3 VBIMeasure (Measure)

```ts
interface VBIMeasure {
  id: string
  field: string
  alias: string
  encoding?:
    | 'yAxis'
    | 'xAxis'
    | 'primaryYAxis'
    | 'secondaryYAxis'
    | 'angle'
    | 'radius'
    | 'size'
    | 'color'
    | 'detail'
    | 'column'
    | 'label'
    | 'tooltip'
    | 'value'
    | 'q1'
    | 'q3'
    | 'min'
    | 'max'
    | 'median'
    | 'outliers'
    | 'x0'
    | 'x1'
  aggregate?: {
    func:
      | 'count'
      | 'countDistinct'
      | 'sum'
      | 'avg'
      | 'min'
      | 'max'
      | 'variance'
      | 'variancePop'
      | 'stddev'
      | 'median'
      | 'quantile'
    quantile?: number // Valid only when func='quantile'; range 0-1
  }
  format?:
    | { autoFormat: true }
    | {
        autoFormat?: false
        prefix?: string
        suffix?: string
        decimalCount?: number
        thousandsSeparator?: boolean
      }
  sort?: { order: 'asc' | 'desc' }
}
```

---

## 2.4 VBIWhereGroup (WHERE Filter Tree)

```ts
interface VBIWhereGroup {
  id: string
  op: 'and' | 'or'
  conditions: VBIWhereClause[]
}

type VBIWhereClause = VBIWhereFilter | VBIWhereGroup

interface VBIWhereFilter {
  id: string
  field: string
  op: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'not in' | 'date'
  value?: unknown
  // Use a date range structure when op='date'
}
```

---

## 2.5 VBIHavingGroup (HAVING Filter Tree)

```ts
interface VBIHavingGroup {
  id: string
  op: 'and' | 'or'
  conditions: VBIHavingClause[]
}

type VBIHavingClause = VBIHavingFilter | VBIHavingGroup

interface VBIHavingFilter {
  id: string
  field: string
  aggregate: VBIHavingAggregate // An aggregate function is required
  op: '>' | '<' | '>=' | '<=' | '=' | '!='
  value?: unknown
}

// VBIHavingAggregate = { func: string; quantile?: number }
```

---

## 2.6 VBISchemaField (Field Metadata)

```ts
interface VBISchemaField {
  name: string // Field name
  type: string // 'string' | 'number' | 'date' | 'datetime' | 'timestamp' | 'boolean'
  role: 'dimension' | 'measure' // Inferred automatically from type
  isDate: boolean // Whether this is a date type
}
```

Field role inference rules (`getFieldRoleBySchemaType`):

- `number` → `measure`
- `string` → `dimension`
- `date` / `datetime` / `timestamp` → `dimension`

---

## 2.7 Type Guards

Type guards exported from `@visactor/vbi` (`filter-guards.ts`) identify node types in Where/Having condition trees:

```ts
import { isVBIFilter, isVBIWhereGroup, isVBIHavingFilter } from '@visactor/vbi'

// Check Where condition nodes
if (isVBIFilter(item)) {
  // item is a leaf filter node: VBIWhereFilter
} else if (isVBIWhereGroup(item)) {
  // item is a nested group: VBIWhereGroup
}

// Check Having condition nodes
if (isVBIHavingFilter(item)) {
  // This is a leaf node with an aggregate property
}
```

---

## 2.8 Supported Chart Types

| Group            | Types                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Tables           | `table`, `pivotTable`                                                                       |
| Comparison       | `column`, `columnParallel`, `columnPercent`, `bar`, `barParallel`, `barPercent`, `dualAxis` |
| Trend            | `line`, `area`, `areaPercent`                                                               |
| Proportion       | `pie`, `donut`, `rose`, `roseParallel`, `funnel`                                            |
| Distribution     | `scatter`, `heatmap`, `boxPlot`, `histogram`, `radar`                                       |
| Hierarchy        | `treeMap`, `sunburst`, `circlePacking`                                                      |
| Animated ranking | `raceBar`, `raceColumn`, `raceLine`, `raceScatter`, `racePie`, `raceDonut`                  |

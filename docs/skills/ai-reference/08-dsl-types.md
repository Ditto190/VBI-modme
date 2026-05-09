# 8. DSL Type Quick Reference

## 8.1 VBIChartDSL (Root Type)

```ts
interface VBIChartDSL {
  connectorId: string // Connector identifier.
  chartType: string // Chart type.
  dimensions: VBIDimension[] // Dimension array.
  measures: VBIMeasure[] // Measure array.
  whereFilter: VBIWhereGroup // WHERE filter tree.
  havingFilter: VBIHavingGroup // HAVING filter tree.
  theme: string // 'light' | 'dark'
  locale: string // 'zh-CN' | 'en-US'
  limit?: number // Row limit.
  version: number // Version number.
}
```

## 8.2 VBIDimension (Dimension)

```ts
interface VBIDimension {
  id: string
  field: string
  alias: string
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
    func: 'toYear' | 'toQuarter' | 'toMonth' | 'toWeek' | 'toDay' | 'toHour' | 'toMinute' | 'toSecond'
  }
  sort?: { order: 'asc' | 'desc' }
}
```

## 8.3 VBIMeasure (Measure)

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
    quantile?: number // Only valid when func='quantile'; range 0-1.
  }
  format?: { autoFormat: true } | ({ autoFormat?: false } & NumFormat)
  sort?: { order: 'asc' | 'desc' }
}
```

## 8.4 VBIWhereGroup (WHERE Filter Tree)

```ts
interface VBIWhereGroup {
  id: string
  op: 'and' | 'or'
  conditions: VBIWhereClause[] // Array of VBIWhereFilter | VBIWhereGroup.
}

type VBIWhereClause = VBIWhereFilter | VBIWhereGroup

interface VBIWhereFilter {
  id: string
  field: string
  op: string // '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'not in' | 'date'
  value?: unknown
  // When op='date', use the value structure below.
  // value?: VBIWhereDatePredicate
}
```

## 8.5 VBIHavingGroup (HAVING Filter Tree)

```ts
interface VBIHavingGroup {
  id: string
  op: 'and' | 'or'
  conditions: VBIHavingClause[] // Array of VBIHavingFilter | VBIHavingGroup.
}

type VBIHavingClause = VBIHavingFilter | VBIHavingGroup

interface VBIHavingFilter {
  id: string
  field: string
  aggregate: VBIAggregate // An aggregate function must be specified.
  op: string // '>' | '<' | '>=' | '<=' | '=' | '!='
  value?: unknown
}
```

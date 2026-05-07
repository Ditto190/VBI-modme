# ADR-002: VBI Date Filter DSL and Demo UI Design

## Status

Proposed

## Context

The current VBI `whereFilter` only supports generic comparison operations. Date fields do not have stable first-class semantics:

1. Common BI filters such as "this month", "last quarter", and "last 7 days" cannot be expressed directly.
2. Natural periods such as "2024", "2024-Q1", and "2024-03" cannot be expressed in a stable way.
3. The older draft used flat fields such as `dateOp`, `dateValue`, and `granularity`, which can create invalid combinations and split date semantics across multiple fields.

At the same time, the current `where` UI in `practices/standard` is still a scalar-only form:

1. [`FilterPanel.tsx`](../../practices/standard/src/components/Filter/FilterPanel.tsx) only supports generic comparison forms and input strategies such as `range` and `tags`.
2. [`WhereShelf.tsx`](../../practices/standard/src/components/Shelves/shelves/WhereShelf.tsx) and [`useVBIWhereFilter.ts`](../../practices/standard/src/hooks/useVBIWhereFilter.ts) only know `setOperator(...)` / `setValue(...)`.
3. Date dimensions already have an `isDate` marker, but there is no dedicated date filter editor.

The underlying `vquery` layer already has the base validation needed for this phase:

1. `where` unit tests cover `=` / `>=` / `<` / `between` for date strings.
2. `where` unit tests cover timestamp comparisons and `between` with `Date` input.
3. Example tests cover date `between`, timestamp windows, date `where`, and date aggregate `select` together.
4. Example output now uses formatted date aliases, so validation results no longer display only epoch timestamps.

Relevant validation files:

- `packages/vquery/tests/unit/sql-builder/builders/where.test.ts`
- `packages/vquery/tests/examples/where/date_between.json`
- `packages/vquery/tests/examples/where/timestamp_window.json`
- `packages/vquery/tests/examples/select/date/toMonth_with_date_filter.json`

## Decision

### 1. Align type names to `VBIWhereFilter` / `zVBIWhereFilter`

Rename the filter node type inside the `whereFilter` module:

- `VBIFilter` -> `VBIWhereFilter`
- `zVBIFilter` -> `zVBIWhereFilter`

The related union types are also aligned:

- `VBIWhereClause = VBIWhereFilter | VBIWhereGroup`
- `zVBIWhereClause = z.union([zVBIWhereFilter, zVBIWhereGroup])`

This is not just a rename. The point is to make naming inside the `whereFilter` system consistent, avoiding an asymmetric module where `VBIWhereGroup` and `VBIFilter` coexist.

### 2. Date filters use `op: 'date' + DatePredicate`

Do not add flat fields such as `dateOp` / `dateValue` / `granularity`.

```typescript
type DateInput = string | Date
type DateUnit = 'year' | 'quarter' | 'month' | 'week' | 'day'
type DateBounds = '[)' | '[]'

type DatePeriod =
  | { unit: 'year'; year: number }
  | { unit: 'quarter'; year: number; quarter: 1 | 2 | 3 | 4 }
  | { unit: 'month'; year: number; month: number }
  | { unit: 'week'; year: number; week: number }
  | { unit: 'day'; date: DateInput }

type DatePredicate =
  | {
      type: 'range'
      start: DateInput
      end: DateInput
      bounds?: DateBounds
    }
  | {
      type: 'relative'
      mode: 'last' | 'next'
      amount: number
      unit: DateUnit
      complete?: boolean
    }
  | {
      type: 'current'
      unit: DateUnit
      offset?: number
    }
  | ({
      type: 'period'
    } & DatePeriod)

type VBIWhereScalarFilter = {
  id: string
  field: string
  op: string
  value?: unknown
}

type VBIWhereDateFilter = {
  id: string
  field: string
  op: 'date'
  value: DatePredicate
}

type VBIWhereFilter = VBIWhereScalarFilter | VBIWhereDateFilter
```

This structure keeps a single date entry point. All date semantics are captured inside `DatePredicate`, instead of splitting natural periods, rolling windows, and absolute ranges across multiple top-level field combinations.

### 3. `DatePredicate.type` is fixed to `range | relative | current | period`

The four semantic modes have clear responsibilities:

- `range`: An explicit absolute time range.
- `relative`: A rolling window relative to the current time.
- `current`: The current natural period, optionally offset.
- `period`: A specified natural period.

Examples:

```typescript
{
  field: 'order_date',
  op: 'date',
  value: {
    type: 'range',
    start: '2024-01-01',
    end: '2024-02-01',
    bounds: '[)'
  }
}

{
  field: 'order_date',
  op: 'date',
  value: {
    type: 'relative',
    mode: 'last',
    amount: 7,
    unit: 'day'
  }
}

{
  field: 'order_date',
  op: 'date',
  value: {
    type: 'current',
    unit: 'month'
  }
}

{
  field: 'order_date',
  op: 'date',
  value: {
    type: 'period',
    unit: 'quarter',
    year: 2024,
    quarter: 1
  }
}
```

### 4. Builder API only adds `WhereFilterNodeBuilder.setDate(...)`

`WhereFilterBuilder` keeps the existing `add(field, callback)` shape and does not add:

- `addDate`
- `addDateRange`
- `addCurrentDate`
- `addRelativeDate`
- `addDatePeriod`

Only `WhereFilterNodeBuilder` gets a date-specific entry point:

```typescript
class WhereFilterNodeBuilder {
  setOperator(operator: string): this
  setValue(value: unknown): this
  setDate(predicate: DatePredicate): this
}
```

Usage:

```typescript
builder.whereFilter.add('order_date', (node) => {
  node.setDate({ type: 'current', unit: 'month' })
})
```

This keeps the constraint explicit: DSL complexity stays inside `DatePredicate`; it is not copied into a chain of builder sugar methods.

### 5. Lowering only targets validated `vquery` where atoms

VBI resolves date filters during the `buildWhere` phase and lowers them only to currently validated `vquery` where atoms:

- `=`
- `>`
- `>=`
- `<`
- `<=`
- `between`
- `and`
- `or`

Constraints:

1. `vquery` does not know business semantics such as `relative`, `current`, or `period`.
2. VBI is responsible for resolving date semantics into ordinary where conditions.
3. `range` can lower directly to range comparisons or `between`.
4. Boundaries for `relative` / `current` / `period` must be resolved in VBI before entering `vquery`.

One extra constraint must be explicit: this ADR does not treat untested boundary formulas as established behavior. For example, how `period(year: 2024)` expands is a VBI implementation responsibility. It must be locked by dedicated tests before it becomes stable behavior; the document alone is not enough.

### 6. Time resolution depends on execution context

Date semantic resolution depends at least on:

1. `now`
2. timezone
3. week rule

This ADR establishes the following principles:

1. `week` uses ISO-8601.
2. `current` / `relative` / `period` must be resolved in the same time context.
3. Any boundary behavior across days, weeks, months, quarters, or years must be covered by tests before it is considered stable semantics.

### 7. Runtime schema uses discriminated unions and aligned names

```typescript
const zDatePredicate = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('range'),
    start: z.union([z.string(), z.date()]),
    end: z.union([z.string(), z.date()]),
    bounds: z.enum(['[)', '[]']).optional(),
  }),
  z.object({
    type: z.literal('relative'),
    mode: z.enum(['last', 'next']),
    amount: z.number().int().positive(),
    unit: z.enum(['year', 'quarter', 'month', 'week', 'day']),
    complete: z.boolean().optional(),
  }),
  z.object({
    type: z.literal('current'),
    unit: z.enum(['year', 'quarter', 'month', 'week', 'day']),
    offset: z.number().int().optional(),
  }),
  z.object({
    type: z.literal('period'),
    unit: z.literal('year'),
    year: z.number().int(),
  }),
  z.object({
    type: z.literal('period'),
    unit: z.literal('quarter'),
    year: z.number().int(),
    quarter: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  }),
  z.object({
    type: z.literal('period'),
    unit: z.literal('month'),
    year: z.number().int(),
    month: z.number().int().min(1).max(12),
  }),
  z.object({
    type: z.literal('period'),
    unit: z.literal('week'),
    year: z.number().int(),
    week: z.number().int().min(1).max(53),
  }),
  z.object({
    type: z.literal('period'),
    unit: z.literal('day'),
    date: z.union([z.string(), z.date()]),
  }),
])

const zVBIWhereDateFilter = z.object({
  id: z.string(),
  field: z.string(),
  op: z.literal('date'),
  value: zDatePredicate,
})

const zVBIWhereScalarFilter = z.object({
  id: z.string(),
  field: z.string(),
  op: z.string().refine((op) => op !== 'date'),
  value: z.any().optional(),
})

export const zVBIWhereFilter = z.union([zVBIWhereDateFilter, zVBIWhereScalarFilter])
```

### 8. `practices/standard` UI uses one entry point with date-specific branching

The UI goal is not to force more fields into the existing scalar form. Instead, the same `where` edit entry should switch date fields into a dedicated date edit mode.

#### UI principles

1. `WhereShelf` still has only one edit entry and does not split out a second shelf.
2. Non-date fields continue to use the existing scalar `op + value` form.
3. When a date field enters edit mode, the form switches directly to a `DatePredicate` editor and no longer reuses the scalar operator dropdown.
4. Do not flatten all inputs for `range` / `relative` / `current` / `period` into one form. Select `type` first, then show the matching sub-form.

#### Recommended form model

`practices/standard` can keep reusing the existing `FilterItem` shape internally, but the date branch should be represented explicitly in types:

```typescript
type DemoWhereScalarFilterItem = {
  id?: string
  field: string
  op: Exclude<string, 'date'>
  value?: unknown
}

type DemoWhereDateFilterItem = {
  id?: string
  field: string
  op: 'date'
  value: DatePredicate
}

type DemoWhereFilterItem = DemoWhereScalarFilterItem | DemoWhereDateFilterItem
```

In other words, the demo does not need to invent a second persisted DSL. It only needs to treat `op: 'date'` as the explicit date-editing branch at the UI layer.

#### Date sub-form structure

- `range`
  - Inputs: `start`, `end`, `bounds`
  - Suggested components: `DatePicker` / `RangePicker` + boundary switch
- `relative`
  - Inputs: `mode`, `amount`, `unit`, `complete`
  - Suggested components: `Select` + `InputNumber` + `Switch`
- `current`
  - Inputs: `unit`, `offset`
  - Suggested components: `Select` + `InputNumber`
- `period`
  - Select `unit` first.
  - Render dynamic fields by `unit`:
    - `year`: `year`
    - `quarter`: `year` + `quarter`
    - `month`: `year` + `month`
    - `week`: `year` + `week`
    - `day`: `date`

#### Component changes

- [`practices/standard/src/components/Filter/FilterPanel.tsx`](../../practices/standard/src/components/Filter/FilterPanel.tsx)
  - Branch by `field.isDate` into the scalar editor or date editor.
  - Use `type` selection to drive the date editor's dynamic sub-form.
  - On submit, output `{ op: 'date', value: DatePredicate }` when in date mode.

- [`practices/standard/src/components/Filter/whereFilterUtils.ts`](../../practices/standard/src/components/Filter/whereFilterUtils.ts)
  - Keep existing scalar operator/input strategy helpers.
  - Add helpers for date form defaults, serialization, deserialization, and display text.
  - `getWhereDisplayText(...)` must support readable display for `op === 'date'`.

- [`practices/standard/src/components/Shelves/shelves/WhereShelf.tsx`](../../practices/standard/src/components/Shelves/shelves/WhereShelf.tsx)
  - Add an `item.op === 'date'` branch.
  - On add/update, date nodes use `node.setDate(...)`; non-date nodes continue to use `setOperator(...)` / `setValue(...)`.

- [`practices/standard/src/hooks/useVBIWhereFilter.ts`](../../practices/standard/src/hooks/useVBIWhereFilter.ts)
  - Add `setDate(...)` to mutator typing.
  - Sync names from old `VBIFilter` to `VBIWhereFilter`.

#### i18n requirements

Add the following to both Chinese and English locales:

- Date type names: `range` / `relative` / `current` / `period`
- Date unit names: `year` / `quarter` / `month` / `week` / `day`
- `last` / `next` / `complete`
- `bounds`
- Field labels such as `quarter`, `week`, and `offset`

#### UI test requirements

`practices/standard` needs at least:

1. A test that fills a date filter form from the builder value.
2. A test that serializes the date form to `{ op: 'date', value: DatePredicate }`.
3. Display text tests for the four modes: `range`, `relative`, `current`, and `period`.
4. A test that form state resets correctly when switching between date and non-date fields.

### 9. Pre-merge test requirements

#### Completed base validation

- `packages/vquery/tests/unit/sql-builder/builders/where.test.ts`
- `packages/vquery/tests/examples/where/date_between.test.ts`
- `packages/vquery/tests/examples/where/timestamp_window.test.ts`
- `packages/vquery/tests/examples/select/date/toMonth_with_date_filter.test.ts`

These validations show that current `vquery` capabilities can support the base where conditions needed after date filters are lowered.

#### Required VBI tests

Before the VBI date DSL is merged, add and pass:

1. Schema and serialization tests for `VBIWhereFilter` / `zVBIWhereFilter`.
2. Builder tests for `WhereFilterNodeBuilder.setDate(...)`.
3. `buildWhere` lowering tests for `range` / `relative` / `current` / `period`.
4. Parsing tests for timezone, ISO week, and boundary inclusion rules.

#### Required demo tests

Before the `practices/standard` UI is merged, add and pass:

1. Date serialization and display text tests for `whereFilterUtils`.
2. Date edit mode tests for `FilterPanel`.
3. Date add/update tests for `WhereShelf`.

## Consequences

### Positive

1. `whereFilter` type names become consistent with the module style.
2. Date filter DSL converges on one stable entry point instead of flat field composition.
3. Builder API stays restrained, with complexity concentrated in `DatePredicate`.
4. `practices/standard` can support four date filter categories without duplicating DSL.
5. Lowering depends entirely on validated base capabilities in `vquery`.

### Negative

1. VBI must own date semantic resolution and time context management.
2. `practices/standard` form state changes from one path to two paths: scalar mode and date mode.
3. If date boundary behavior is not locked by tests, risk will surface directly in query results.

## Implementation Impact

- `packages/vbi/src/types/dsl/whereFilter/filters.ts`
- `packages/vbi/src/types/dsl/index.ts`
- `packages/vbi/src/index.ts`
- `packages/vbi/src/builder/features/whereFilter/where-node-builder.ts`
- `packages/vbi/src/pipeline/vqueryDSL/buildWhere.ts`
- `packages/vbi/tests/builder/features/whereFilter.test.ts`
- `practices/standard/src/components/Filter/FilterPanel.tsx`
- `practices/standard/src/components/Filter/whereFilterUtils.ts`
- `practices/standard/src/components/Shelves/shelves/WhereShelf.tsx`
- `practices/standard/src/hooks/useVBIWhereFilter.ts`
- `practices/standard/src/i18n/locales/zh-CN.json`
- `practices/standard/src/i18n/locales/en-US.json`
- `practices/standard/tests/whereFilterUtils.test.ts`

## Reference

- VBI WhereFilter types: `packages/vbi/src/types/dsl/whereFilter/filters.ts`
- VBI WhereFilter node builder: `packages/vbi/src/builder/features/whereFilter/where-node-builder.ts`
- VBI buildWhere: `packages/vbi/src/pipeline/vqueryDSL/buildWhere.ts`
- Demo Filter Panel: `practices/standard/src/components/Filter/FilterPanel.tsx`
- Demo Where Utils: `practices/standard/src/components/Filter/whereFilterUtils.ts`
- Demo Where Shelf: `practices/standard/src/components/Shelves/shelves/WhereShelf.tsx`
- Demo Where Hook: `practices/standard/src/hooks/useVBIWhereFilter.ts`
- VQuery where tests: `packages/vquery/tests/unit/sql-builder/builders/where.test.ts`

## Rejected Designs

The following approaches are explicitly rejected:

1. Flat modeling with `dateOp` + `dateValue` + `granularity`.
2. Stacking convenience methods such as `WhereFilterBuilder.addDate*`.
3. Forcing every date filter type back into the existing scalar `op + value` form.
4. Hard-coding date semantic boundary expansion as fact without tests.

# ADR-001: VQuery Custom Expression Fields

## Status

Proposed

## Context

The clauses in the current `@visactor/vquery` implementation all reference physical field names directly. There is no "logical field" layer yet, which creates four direct problems:

1. Aliases defined in `select` cannot be reused reliably in `where/groupBy/having`.
2. Calculated fields such as `sales - profit as cost` cannot participate in all clauses like ordinary fields.
3. If each clause gets its own `expr`, expressions are duplicated and VBI cannot maintain a Single Source of Truth.
4. `Where<T>` / `Having<T>` depend on `keyof T`, which cannot cover expr fields added at runtime.

## Decision

### 1. Add a `fields` registry and define every referenceable field there first

```ts
type VQueryExpr =
  | { type: 'column'; name: string }
  | { type: 'field'; id: string }
  | { type: 'literal'; value: string | number | boolean | null }
  | { type: 'unary'; op: '+' | '-'; expr: VQueryExpr }
  | { type: 'binary'; op: '+' | '-' | '*' | '/' | '%'; left: VQueryExpr; right: VQueryExpr }
  | { type: 'call'; name: string; args?: VQueryExpr[] }
type VQueryField = { id: string; expr: VQueryExpr }
type QueryDSL = {
  fields?: VQueryField[]
  select: Array<string | { field: string; alias?: string; aggr?: Aggregate }>
  where?: Where
  groupBy?: string[]
  having?: Having
  orderBy?: Array<{ field: string; order?: 'asc' | 'desc' }>
  limit?: number
}
```

Semantic constraints:

1. `fields` is the SSOT. Physical columns are also expressed through `expr`, for example `sales -> column(sales)`.
2. Clauses only reference field `id` values and do not carry duplicated `expr` values inside clauses.
3. `select.aggr` / `having.aggr` only keep true aggregations; field transformations such as `to_year/to_month/...` move into `expr`.
4. `call.name` and `op` only allow whitelisted values. Raw SQL fragments are not accepted.

### 2. Collapse `Where` / `Having` into runtime structures

```ts
type WhereLeaf = { field: string; op: Operator; value?: unknown }
type HavingLeaf = { field: string; op: HavingOperator; aggr: HavingAggregation; value?: unknown }
```

This no longer tries to enumerate all fields with `keyof T`. Expr fields are runtime definitions by nature, so the first phase prioritizes DSL consistency and correct compilation.

### 3. Change SQL compilation to two-level lowering

1. Normalize legacy DSL at the entry point, automatically filling old `field: 'sales'` references with column definitions in `fields`.
2. Recursively expand `{ type: 'field' }` inside `expr` and detect circular dependencies.
3. Generate the inner projection first: `from (select <expr as id>... from source) as __vquery_base`.
4. Continue reusing the existing `select/where/groupBy/having/orderBy/limit` builders for the outer query, with fields sourced from `__vquery_base`.

This allows fields such as `cost/profit_margin/rand` to enter `where`, `groupBy`, `having`, `orderBy`, and `select` like ordinary columns.

### 4. Example

```ts
{
  fields: [{ id: 'sales', expr: { type: 'column', name: 'sales' } }, { id: 'profit', expr: { type: 'column', name: 'profit' } }, { id: 'cost', expr: { type: 'binary', op: '-', left: { type: 'field', id: 'sales' }, right: { type: 'field', id: 'profit' } } }, { id: 'profit_margin', expr: { type: 'binary', op: '/', left: { type: 'field', id: 'profit' }, right: { type: 'call', name: 'nullif', args: [{ type: 'field', id: 'sales' }, { type: 'literal', value: 0 }] } } }, { id: 'rand', expr: { type: 'call', name: 'random' } }],
  select: [{ field: 'cost' }, { field: 'profit_margin' }],
  where: { op: 'and', conditions: [{ field: 'cost', op: '>', value: 0 }] },
  orderBy: [{ field: 'profit_margin', order: 'desc' }]
}
```

### 5. Non-Goals

1. Do not support raw SQL string `expr`.
2. Do not support window functions / `over` / `lag` / true cross-row growth rates.
3. Do not support subquery expressions.
4. Do not implement cross-dialect function mapping in the first phase; only safely concatenate structured AST into SQL.

## Consequences

Positive: clause structures remain mostly unchanged, and the changes are concentrated in `types`, `expr builder`, and `dslToSQL`; VBI only needs to emit `id + expr` for each field.
Negative: the static types for `Where/Having` become wider than they are today; complex year-over-year / period-over-period logic requires adding a `window` node in a second phase.

## Reference

- `packages/vquery/src/types/dsl/Select.ts`
- `packages/vquery/src/types/dsl/Where.ts`
- `packages/vquery/src/types/dsl/Having.ts`
- `packages/vquery/src/sql-builder/builders/select.ts`
- `packages/vquery/src/sql-builder/builders/where.ts`
- `packages/vquery/src/sql-builder/builders/having.ts`
- `packages/vquery/src/sql-builder/dslToSQL.ts`

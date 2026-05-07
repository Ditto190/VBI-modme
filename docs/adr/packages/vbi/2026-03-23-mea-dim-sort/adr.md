# ADR-004: VBI Measure / Dimension Sort DSL and `buildVQuery` Lowering

## Context

`@visactor/vquery` already supports `orderBy?: Array<{ field: string; order?: 'asc' | 'desc' }>`, but VBI's current `buildVQuery()` only builds `select`, `groupBy`, `where`, `having`, and `limit`. Sorting is not yet a first-class capability.

`VBIDimension` and `VBIMeasure` also do not have sort DSL fields. That creates three direct problems:

1. Users cannot explicitly express "sort by this dimension ascending" or "sort by this measure descending" in VBI.
2. `buildVQuery()` cannot provide a stable default order for grouped results, so query result order is unpredictable.
3. Adding a separate root-level `orderBy` to the DSL would duplicate state already owned by measure and dimension nodes, which violates Single Source of Truth.

This ADR is limited to `packages/vbi`:

1. Measures and dimensions both support sort configuration.
2. If there is no explicit sort, `buildVQuery()` sorts by the first dimension ascending by default.
3. If any measure or dimension has sort configured, output only the explicit sort configuration and ignore the default logic.

## Decision

### 1. Store sort configuration on measure and dimension nodes

VBI adds shared sort types:

```typescript
type VBISortOrder = 'asc' | 'desc'
type VBISort = { order: VBISortOrder }
```

and extends both node types:

```typescript
type VBIDimension = {
  id: string
  field: string
  alias: string
  sort?: VBISort
}

type VBIMeasure = {
  id: string
  field: string
  alias: string
  sort?: VBISort
}
```

Do not add root-level `vbiDSL.orderBy`. Sort semantics belong to the field node itself and should be created, updated, deleted, and reordered with that node.

### 2. Node builders only add `get/set/clearSort`

Both `DimensionNodeBuilder` and `MeasureNodeBuilder` add:

```typescript
setSort(sort: VBISort): this
getSort(): VBISort | undefined
clearSort(): this
```

Do not add sugar APIs such as `sortAsc()` or `sortDesc()`. The builder API directly follows the DSL shape, which keeps the mental model small and leaves room for later extension.

### 3. `buildVQuery()` adds an independent `buildOrderBy` pipe

VBI adds `packages/vbi/src/pipeline/vqueryDSL/buildOrderBy.ts` and wires it into the main pipeline:

```typescript
select -> groupBy -> where -> having -> orderBy -> limit
```

`buildOrderBy` follows these rules:

1. Collect dimensions with configured `sort`, preserving their current order in the `dimensions` array.
2. Collect measures with configured `sort`, preserving their current order in the `measures` array.
3. If the explicit sort list is not empty, write `queryDSL.orderBy` from that list and ignore the default sort.
4. If the explicit sort list is empty and a first dimension exists, write `[{ field: firstDimension.id, order: 'asc' }]`.
5. If there is neither explicit sort nor any dimension, do not write `orderBy`.

For this phase, the total explicit sort order is deterministic: dimensions first, then measures. This matches the fallback rule that defaults to the first dimension.

### 4. `orderBy.field` always uses the node `id`

VBI emits node IDs as VQuery sort fields instead of source field names:

```typescript
{ field: node.id, order: node.sort.order }
```

Reasons:

1. `buildSelect()` already aliases each measure and dimension to its own `id`.
2. Measures usually include aggregation, so sorting by the raw `field` can be unstable or invalid.
3. Date dimensions with `aggregate` also sort by the derived select alias, not by the raw column.

Using `id` consistently avoids duplicating measure / dimension / aggregate branching inside `buildOrderBy`.

### 5. Default sorting only appears in `buildVQuery()`

"Sort by the first dimension ascending" is only a query-lowering fallback. It is not written back to `VBIChartDSL`, and it does not appear in builder JSON output as a default `sort`.

This means:

1. `builder.build()` keeps the DSL minimal.
2. `builder.buildVQuery()` snapshots may change because of the new default sort.
3. This snapshot change is an allowed breaking change and generated artifacts can be updated with `pnpm --filter=@visactor/vbi run g`.

### 6. Test scope

Tests must cover at least:

1. `zVBIDimensionSchema` / `zVBIMeasure` correctly accept and reject `sort`.
2. `DimensionNodeBuilder` / `MeasureNodeBuilder` `setSort`, `getSort`, and `clearSort`.
3. Without explicit sort, `buildVQuery()` sorts by the first dimension ascending.
4. With dimension sort, default logic is ignored and `orderBy` is emitted correctly.
5. With measure sort, default logic is ignored and `orderBy` is emitted correctly.
6. With multiple sorted dimensions and measures, output order is stable and follows "dimensions first, then measures".
7. Aggregated measures and date-aggregated dimensions both use node `id` as the sort field.

## Reference

- `packages/vbi/src/types/dsl/dimensions/dimensions.ts`
- `packages/vbi/src/types/dsl/measures/measures.ts`
- `packages/vbi/src/builder/features/dimensions/dim-node-builder.ts`
- `packages/vbi/src/builder/features/measures/mea-node-builder.ts`
- `packages/vbi/src/pipeline/vqueryDSL/index.ts`
- `packages/vbi/src/pipeline/vqueryDSL/buildSelect.ts`
- `packages/vquery/src/types/dsl/OrderBy.ts`

## Rejected Designs

- Do not add root-level `vbiDSL.orderBy`.
- Do not model `sort` as a flat string field such as `sort: 'asc' | 'desc'`.
- Do not add builder sugar such as `sortAsc()` / `sortDesc()`.
- Do not introduce an independent cross-shelf sort priority field in the first phase.
- Do not write default sorting back to the DSL.

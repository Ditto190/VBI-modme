# Implementation Plan: VBI Measure / Dimension Sort Support

> Based on ADR: `./adr.md`
> TDD-driven: write tests first, then implement, regenerate artifacts, and pass all verification.

## Scope

This plan focuses on the VBI core package (`packages/vbi`). It only covers sort DSL, builders, `buildVQuery().orderBy` lowering, and generated artifacts or snapshot updates caused by default sorting. It does not include `practices/standard` UI changes.

## Phase 1: Sort Types and Schema

### 1.1 Write schema tests first

**Test file**: `packages/vbi/tests/types/sortSchemas.test.ts` (new)

Test coverage:

1. `zVBISort` accepts `{ order: 'asc' }` and `{ order: 'desc' }`.
2. Invalid `order` values are rejected.
3. `zVBIDimensionSchema` accepts dimensions with `sort`.
4. `zVBIMeasure` accepts measures with `sort`.
5. `zVBIChartDSL` accepts a complete DSL that contains sorted nodes.

### 1.2 Implement shared sort types

**New file**: `packages/vbi/src/types/dsl/sort.ts`

Changes:

1. Add `VBISortOrder = 'asc' | 'desc'`.
2. Add `VBISort = { order: VBISortOrder }`.
3. Add `zVBISortOrder` and `zVBISort`.

**Changed files**:

- `packages/vbi/src/types/dsl/dimensions/dimensions.ts`
- `packages/vbi/src/types/dsl/measures/measures.ts`
- `packages/vbi/src/types/dsl/index.ts`

Changes:

1. Add optional `sort` to dimension / measure schemas.
2. Add `sort?: VBISort` to dimension / measure types.
3. Export `VBISort` / `VBISortOrder` from `types/dsl/index.ts`.

## Phase 2: Builder Extension

### 2.1 Write builder tests first

**Test file**: `packages/vbi/tests/builder/features/sort.test.ts` (new)

Test coverage:

1. `DimensionNodeBuilder.setSort()` stores sort configuration correctly.
2. `DimensionNodeBuilder.getSort()` returns the current `sort` or `undefined`.
3. `DimensionNodeBuilder.clearSort()` clears sort configuration.
4. `MeasureNodeBuilder.setSort()` / `getSort()` / `clearSort()` behave correctly.
5. `setSort()` supports chaining.
6. `toJSON()` output is correct after setting and clearing sort.

### 2.2 Implement node builders

**Changed files**:

- `packages/vbi/src/builder/features/dimensions/dim-node-builder.ts`
- `packages/vbi/src/builder/features/measures/mea-node-builder.ts`

Changes:

1. Add `setSort(sort: VBISort): this`.
2. Add `getSort(): VBISort | undefined`.
3. Add `clearSort(): this`.

## Phase 3: `buildVQuery` Sort Lowering

### 3.1 Write query tests first

**Test file**: `packages/vbi/tests/query/orderBy.test.ts` (new)

Test coverage:

1. Without explicit sort, `buildVQuery()` sorts by the first dimension ascending by default.
2. Without explicit sort and without dimensions, `orderBy` is omitted.
3. Explicit dimension sort ignores the default logic.
4. Explicit measure sort ignores the default logic.
5. Multiple sorted dimensions preserve the current `dimensions` order.
6. Multiple sorted measures preserve the current `measures` order.
7. When dimensions and measures are both sorted, output order is fixed as dimensions first, then measures.
8. Aggregated measure sorting uses node `id`.
9. Date-aggregated dimension sorting uses node `id`.

### 3.2 Implement `buildOrderBy`

**New file**: `packages/vbi/src/pipeline/vqueryDSL/buildOrderBy.ts`

Responsibilities:

1. Collect dimension / measure nodes with configured `sort`.
2. Map sorted nodes to `VQueryDSL.orderBy`.
3. Apply the "first dimension ascending" default when there is no explicit sort.

**Changed file**: `packages/vbi/src/pipeline/vqueryDSL/index.ts`

Changes:

1. Wire in `buildOrderBy`.
2. Update the pipeline order to `select -> groupBy -> where -> having -> orderBy -> limit`.

## Phase 4: Generated Artifacts and Snapshot Updates

### 4.1 Regenerate tests, examples, and API artifacts

**Command**:

```bash
pnpm --filter=@visactor/vbi run g
```

Purpose:

1. Update tests and snapshots changed by the new default sort.
2. Update generated examples.
3. Update generated API artifacts.

### 4.2 Inspect generated results

Focus areas:

1. Whether existing examples' `buildVQuery()` output now includes default `orderBy`.
2. Whether generated tests match the ADR's sort rules.
3. Whether there are unexpected diffs unrelated to sorting.

## Phase 5: Verification

```bash
pnpm --filter=@visactor/vbi run test
pnpm run lint
pnpm run typecheck
```

All commands must pass before the task is complete.

## Execution Order

| Step | Action                                  | File                                                                |
| ---- | --------------------------------------- | ------------------------------------------------------------------- |
| 1    | Write schema tests                      | `tests/types/sortSchemas.test.ts`                                   |
| 2    | Implement shared sort types and exports | `src/types/dsl/sort.ts` + `src/types/dsl/{dimensions,measures}/...` |
| 3    | Write builder tests                     | `tests/builder/features/sort.test.ts`                               |
| 4    | Implement builder methods               | `src/builder/features/{dimensions,measures}/*-node-builder.ts`      |
| 5    | Write query sort tests                  | `tests/query/orderBy.test.ts`                                       |
| 6    | Implement `buildOrderBy` and wiring     | `src/pipeline/vqueryDSL/buildOrderBy.ts` + `index.ts`               |
| 7    | Run `pnpm --filter=@visactor/vbi run g` | Update generated artifacts and snapshots                            |
| 8    | Full verification                       | `test + lint + typecheck`                                           |

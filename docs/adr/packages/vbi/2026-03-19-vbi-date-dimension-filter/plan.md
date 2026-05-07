# Implementation Plan: VBI Date Filter Support

> Based on ADR: `./adr.md`
> TDD-driven: write tests first, then implement until all tests pass.

## Scope

This plan focuses on the VBI core package (`packages/vbi`) and does not include `practices/standard` UI changes.

## Phase 1: Types and Schema

### 1.1 Add date filter type tests first

**Test file**: `packages/vbi/tests/types/dateFilterSchemas.test.ts`

Test coverage:

- `zDatePredicate` correctly validates the four modes: `range`, `relative`, `current`, and `period`.
- `zVBIWhereDateFilter` correctly validates `{ op: 'date', value: DatePredicate }`.
- `zVBIWhereScalarFilter` correctly validates ordinary filters where `op !== 'date'`.
- `zVBIWhereFilter` correctly distinguishes date filters from scalar filters.
- Invalid inputs are rejected.

### 1.2 Implement type files

**Changed file**: `packages/vbi/src/types/dsl/whereFilter/filters.ts`

Changes:

1. Rename `VBIFilter` to `VBIWhereFilter` and `zVBIFilter` to `zVBIWhereFilter`.
2. Add `DateInput`, `DateUnit`, `DateBounds`, `DatePeriod`, and `DatePredicate`.
3. Add zod schemas: `zDatePredicate`, `zVBIWhereDateFilter`, and `zVBIWhereScalarFilter`.
4. Define `VBIWhereFilter = VBIWhereScalarFilter | VBIWhereDateFilter`.

**Changed file**: `packages/vbi/src/types/dsl/index.ts`

Changes:

- Update exports from `VBIFilter` to `VBIWhereFilter`, and export types such as `DatePredicate`.

## Phase 2: Builder Extension

### 2.1 Write tests first

**Test file**: `packages/vbi/tests/builder/features/whereFilter.test.ts` (append cases)

Test coverage:

1. `WhereFilterNodeBuilder.setDate({ type: 'range', ... })` stores the predicate correctly.
2. `WhereFilterNodeBuilder.setDate({ type: 'relative', ... })` stores the predicate correctly.
3. `WhereFilterNodeBuilder.setDate({ type: 'current', ... })` stores the predicate correctly.
4. `WhereFilterNodeBuilder.setDate({ type: 'period', ... })` stores the predicate correctly.
5. After `setDate()`, `toJSON()` includes `op: 'date'` and `value: DatePredicate`.
6. `getDate()` returns the current `DatePredicate` or `undefined`.

### 2.2 Implement builder support

**Changed file**: `packages/vbi/src/builder/features/whereFilter/where-node-builder.ts`

Changes:

- Add `setDate(predicate: DatePredicate): this`.
- Add `getDate(): DatePredicate | undefined`.

## Phase 3: Pipeline Lowering

### 3.1 Write tests first

**Test file**: `packages/vbi/tests/builder/features/whereFilter.test.ts` (append `buildVQuery` cases)

Test coverage:

1. `range` lowers to `>= start AND < end` by default with `[)` bounds.
2. `range` with `bounds: '[]'` lowers to `>= start AND <= end`.
3. `period(year)` lowers to `>= 2024-01-01 AND < 2025-01-01`.
4. `period(quarter)` lowers to quarter start and quarter end.
5. `period(month)` lowers to month start and next month start.
6. `period(week)` lowers to ISO-8601 week start and next week start.
7. `period(day)` lowers to the day start and next day start.
8. `relative(last 7 day)` calculates the range from `now`.
9. `current(month)` calculates the current month range from `now`.
10. `current(month, offset: -1)` calculates the previous month range from `now`.
11. Date filters can be combined with ordinary filters.

### 3.2 Implement lowering

**New file**: `packages/vbi/src/pipeline/vqueryDSL/resolveDatePredicate.ts`

Responsibilities:

- Resolve `DatePredicate` into an absolute `{ start: string, end: string, bounds: DateBounds }` range.
- Support injected `now` for deterministic tests.

**Changed file**: `packages/vbi/src/pipeline/vqueryDSL/buildWhere.ts`

Changes:

- Add an `op === 'date'` branch in `mapFilterToCondition`.
- Call `resolveDatePredicate` to resolve date semantics to an absolute range.
- Convert the absolute range to VQuery `>=`, `<`, and `<=` conditions.

## Phase 4: Backward Compatibility and Type Exports

### 4.1 Keep old type names available

**Changed file**: `packages/vbi/src/types/dsl/whereFilter/filters.ts`

- Keep `VBIFilter` as an alias of `VBIWhereFilter`.
- Keep `zVBIFilter` as an alias of `zVBIWhereFilter`.

### 4.2 Update references

- Update `isVBIFilter` references in `src/utils/filter-guards.ts`.
- Update type references in `src/pipeline/vqueryDSL/buildWhere.ts`.
- Ensure `src/index.ts` exports the new types.

## Phase 5: Verification

```bash
pnpm --filter=@visactor/vbi run test
pnpm run lint
pnpm run typecheck
```

All commands must pass before the task is complete.

## Execution Order

| Step | Action                     | File                                                               |
| ---- | -------------------------- | ------------------------------------------------------------------ |
| 1    | Write schema tests         | `tests/types/dateFilterSchemas.test.ts`                            |
| 2    | Implement types and schema | `src/types/dsl/whereFilter/filters.ts`                             |
| 3    | Run schema tests           | Verification passes                                                |
| 4    | Write builder tests        | `tests/builder/features/whereFilter.test.ts`                       |
| 5    | Implement builder methods  | `src/builder/features/whereFilter/where-node-builder.ts`           |
| 6    | Run builder tests          | Verification passes                                                |
| 7    | Write lowering tests       | `tests/builder/features/whereFilter.test.ts`                       |
| 8    | Implement lowering         | `src/pipeline/vqueryDSL/resolveDatePredicate.ts` + `buildWhere.ts` |
| 9    | Run lowering tests         | Verification passes                                                |
| 10   | Update exports             | `src/types/dsl/index.ts`, `src/index.ts`                           |
| 11   | Full verification          | `test + lint + typecheck`                                          |

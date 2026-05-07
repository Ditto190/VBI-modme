# Implementation Plan: VBI Measure Numeric Format Support

> Based on ADR: `./adr.md`
> TDD-driven: write tests first, then implement until all tests pass.

## Scope

This plan focuses on the VBI core package (`packages/vbi`) and does not include `practices/standard` UI changes.

## Phase 1: Type Definitions

### 1.1 Add `VBIMeasureFormat`

**Changed file**: `packages/vbi/src/types/dsl/measures/measures.ts`

Changes:

1. Import `NumFormat` from `@visactor/vseed`.
2. Add `VBIMeasureFormat = { autoFormat: true } | ({ autoFormat?: false } & NumFormat)`.
3. Add optional `format` to `zVBIMeasure`.
4. Add the corresponding zod schema: `zVBIMeasureFormat`.

### 1.2 Export the type

**Changed file**: `packages/vbi/src/types/dsl/index.ts`

Changes:

- Export `VBIMeasureFormat`.

## Phase 2: Builder Extension

### 2.1 Write tests first

**Test file**: `packages/vbi/tests/builder/features/measures.test.ts` (append cases)

Test coverage:

1. `MeasureNodeBuilder.setFormat({ autoFormat: true })` stores the value correctly.
2. `MeasureNodeBuilder.setFormat(customFormat)` stores custom format correctly.
3. `MeasureNodeBuilder.getFormat()` returns the current format or `undefined`.
4. `MeasureNodeBuilder.clearFormat()` clears format configuration.
5. After `setFormat`, `toJSON()` includes the `format` field.
6. After `clearFormat`, `toJSON()` omits the `format` field.
7. When format has not been set, `getFormat()` returns `undefined`.

### 2.2 Implement builder methods

**Changed file**: `packages/vbi/src/builder/features/measures/mea-node-builder.ts`

Changes:

- Add `setFormat(format: VBIMeasureFormat): this`.
- Add `getFormat(): VBIMeasureFormat | undefined`.
- Add `clearFormat(): this`.

## Phase 3: `buildVSeed` Adaptation

### 3.1 Write tests first

**Test file**: `packages/vbi/tests/builder/features/measures.test.ts` (append `buildVSeed` cases)

Test coverage:

1. `format: { autoFormat: true }` produces a VSeed measure with `autoFormat: true` and without `numFormat`.
2. `format: customFormat` produces a VSeed measure with `autoFormat: false` and `numFormat: customFormat`.
3. Without `format`, the VSeed measure omits both `autoFormat` and `numFormat`.

### 3.2 Implement adaptation

**Changed file**: `packages/vbi/src/builder/adapters/vquery-vseed/build-vseed.ts`

Changes:

- Add the measure mapping logic from `format` to `autoFormat` / `numFormat`.

## Phase 4: Verification

```bash
pnpm --filter=@visactor/vbi run test
pnpm run lint
pnpm run typecheck
```

All commands must pass before the task is complete.

## Execution Order

| Step | Action                                       | File                                                |
| ---- | -------------------------------------------- | --------------------------------------------------- |
| 1    | Implement `VBIMeasureFormat` type and schema | `src/types/dsl/measures/measures.ts`                |
| 2    | Update type exports                          | `src/types/dsl/index.ts`                            |
| 3    | Write builder tests                          | `tests/builder/features/measures.test.ts`           |
| 4    | Implement builder methods                    | `src/builder/features/measures/mea-node-builder.ts` |
| 5    | Run builder tests                            | Verification passes                                 |
| 6    | Write `buildVSeed` tests                     | `tests/builder/features/measures.test.ts`           |
| 7    | Implement `buildVSeed` adaptation            | `src/builder/adapters/vquery-vseed/build-vseed.ts`  |
| 8    | Run `buildVSeed` tests                       | Verification passes                                 |
| 9    | Full verification                            | `test + lint + typecheck`                           |

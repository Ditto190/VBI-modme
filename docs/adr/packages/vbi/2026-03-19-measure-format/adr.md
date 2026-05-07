# ADR-003: VBI Measure Numeric Format Support

## Status

Proposed

## Context

VSeed `Measure` already supports numeric format configuration:

- `autoFormat?: boolean`
- `numFormat?: NumFormat`

VBI does not yet fully connect this capability to its DSL, builder, and `buildVSeed` adapter. The `practices/standard` measure shelf also cannot edit format configuration in the UI.

The goal of this ADR is to expose measure formatting through one VBI interface and wire it through to the demo UI.

## Decision

### 1. VBI exposes a single `format` interface

Add the following to `VBIMeasure`:

```typescript
type VBIMeasureFormat = { autoFormat: true } | ({ autoFormat?: false } & NumFormat)

type VBIMeasure = {
  // ...existing fields
  format?: VBIMeasureFormat
}
```

Semantic constraints:

1. `format: { autoFormat: true }` enables automatic formatting.
2. Any other `format` object represents a custom numeric format.
3. If `format` is unset, VBI does not explicitly specify formatting and VSeed default behavior applies.

VBI does not directly expose `autoFormat` and `numFormat` as top-level DSL fields.

### 2. `MeasureNodeBuilder` only provides one group of format methods

Add to `MeasureNodeBuilder`:

```typescript
class MeasureNodeBuilder {
  setFormat(format: VBIMeasureFormat): this
  getFormat(): VBIMeasureFormat | undefined
  clearFormat(): this
}
```

Behavior:

1. `setFormat({ autoFormat: true })` switches to automatic formatting.
2. `setFormat(customFormat)` switches to custom formatting.
3. `clearFormat()` removes the format configuration and returns to the default "not explicitly set" state.

Recommended usage:

```typescript
builder.measures.add('sales', (node) => {
  node.setFormat({
    type: 'number',
    ratio: 10000,
    symbol: 'wan',
    prefix: '¥',
    fractionDigits: 2,
  })
})
```

Or:

```typescript
builder.measures.add('sales', (node) => {
  node.setFormat({ autoFormat: true })
})
```

### 3. `MeasuresBuilder` stays unchanged

Do not add format-specific convenience methods to `MeasuresBuilder`.

Continue using the existing entry:

```typescript
builder.measures.add(field, (node) => {
  node.setFormat(...)
})
```

Reasons:

1. `add(field, callback)` is enough to express format configuration.
2. Format is not an independent resource, so it does not need a new `add*` entry.
3. Keeping the builder API surface stable avoids continuous growth of shortcut methods.

### 4. `buildVSeed` maps `format` to VSeed fields

VBI adapts to VSeed as follows:

1. If `format` is `{ autoFormat: true }`, output `autoFormat: true` and do not output `numFormat`.
2. If `format` is a custom format object, output `autoFormat: false` and `numFormat`.
3. If `format` is unset, do not output `autoFormat` or `numFormat`.

VBI does not pass its own `format` field through to VSeed.

VBI's responsibility is to express a unified configuration and map it to the fields VSeed expects during adaptation. VBI does not implement formatter creation logic or copy VSeed formatting rules.

### 5. `practices/standard` needs a format settings UI

The demo should expose this capability in the measure shelf.

Integration approach:

1. Add a `Format` entry to the measure menu in `practices/standard/src/components/Shelves/shelves/MeasureShelf.tsx`.
2. Do not make `Format` a nested submenu. Open a standalone modal instead.
3. Reuse the current shelf interaction pattern. A peer helper such as `openMeasureFormatModal`, next to `openShelfRenameModal`, is recommended.

UI structure:

1. Provide a format mode switch at the top: `Auto` / `Custom`.
2. When `Auto` is selected, save `{ autoFormat: true }`.
3. When `Custom` is selected, edit a `NumFormat` form.
4. Show common fields directly: `type`, `ratio`, `symbol`, `prefix`, `suffix`, `thousandSeparator`, `fractionDigits`.
5. Put less common fields in an advanced area: `significantDigits`, `roundingPriority`, `roundingMode`.

Save and reset behavior:

1. Save automatic format with `setFormat({ autoFormat: true })`.
2. Save custom format with `setFormat(customFormat)`.
3. Reset to default behavior with `clearFormat()`.

Related changes:

1. Add `setFormat` / `getFormat` / `clearFormat` to `MeasureNodeLike` in `practices/standard/src/hooks/useVBIMeasures.ts`.
2. Add format-related text to `practices/standard/src/i18n/locales/zh-CN.json` and `practices/standard/src/i18n/locales/en-US.json`.
3. If the list should indicate current state, add a lightweight summary to the measure label, such as "Auto" or "Custom". This is not required for the first batch.

### 6. Test scope

VBI core tests cover:

1. `MeasureNodeBuilder` can set, read, and clear `format`.
2. `setFormat({ autoFormat: true })` correctly represents automatic format.
3. `setFormat(customFormat)` correctly represents custom format.
4. `clearFormat()` clears format configuration.
5. `buildVSeed` correctly maps `format -> autoFormat / numFormat`.
6. When `format` is unset, redundant default values are not written.

Demo tests cover:

1. The measure menu contains a `Format` entry.
2. Opening the modal fills in the current `format`.
3. Saving automatic format writes back to the builder correctly.
4. Saving custom format writes back to the builder correctly.
5. Reset calls `clearFormat()` and returns to default behavior.

Do not test the following in VBI / demo:

1. Final tooltip / label formatting strings.
2. VSeed formatter internals.
3. Exhaustive rendering correctness for each formatting rule.

Those should be validated by VSeed itself.

## Reference

- VSeed `NumFormat`: `packages/vseed/src/types/properties/format/numFormat.ts`
- VSeed `BaseMeasure`: `packages/vseed/src/types/properties/measures/baseMeasure.ts`
- VSeed formatter entry: `packages/vseed/src/pipeline/utils/format/createFormatterByMeasure.ts`
- VBI `VBIMeasure`: `packages/vbi/src/types/dsl/measures/measures.ts`
- VBI `MeasureNodeBuilder`: `packages/vbi/src/builder/features/measures/mea-node-builder.ts`
- VBI `MeasuresBuilder`: `packages/vbi/src/builder/features/measures/mea-builder.ts`
- VBI `buildVSeed`: `packages/vbi/src/builder/adapters/vquery-vseed/build-vseed.ts`
- Demo measure shelf: `practices/standard/src/components/Shelves/shelves/MeasureShelf.tsx`
- Demo measures hook: `practices/standard/src/hooks/useVBIMeasures.ts`

## Rejected Designs

This plan explicitly excludes:

- Exposing `setAutoFormat` / `getAutoFormat` / `setNumFormat` / `getNumFormat`.
- Adding `MeasuresBuilder` convenience entries such as `addWithFormat`, `addCurrency`, or `addPercent`.
- Adding many sugar methods such as `setCurrency`, `setWan`, `setK`, or `setFractionDigits`.
- Passing VBI's `format` field itself through to VSeed instead of mapping it to `autoFormat` / `numFormat` during adaptation.
- Making VBI / demo responsible for implementing or validating VSeed formatter behavior.

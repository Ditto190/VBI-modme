# Annotation Difference Line Spec Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compile `annotationDifferenceLine` into VChart `markLine` step annotations for `column`, `bar`, `columnParallel`, and `barParallel`, with stacked `column`/`bar` anchors lifted to stack totals and fail-fast selector validation.

**Architecture:** Add a dedicated `annotationDifferenceLine` spec pipe that resolves logical anchors from `advancedVSeed.dataset`, then emits a `type-step` `markLine` whose `coordinates` callback returns runtime datum-like items for VChart to map through the current series fields. Keep style sourcing in `config.[chartType].annotation.annotationDifferenceLine`; do not bind v1 to VChart's raw `markLineStrokeColor` token because existing annotation primitives are not token-colorized that way.

**Tech Stack:** TypeScript, VChart marker APIs, Vitest, VSeed chart spec pipeline.

---

## File Map

- Create: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLine.ts`
- Create: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLineCommon.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/index.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/column.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/bar.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/columnParallel.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/barParallel.ts`
- Modify: `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`

## Non-Negotiable Rules

- `differenceType: 'percent'` always means `(end - start) / start`.
- `start.selector` and `end.selector` must each resolve to exactly one logical anchor.
- In stacked `column`/`bar`, a logical anchor is one stack group total, not one segment.
- Mixed-sign stacked totals are out of scope for v1. If one stack group contains both positive and negative segments, throw a descriptive error instead of guessing.
- `columnPercent` and `barPercent` remain unsupported.

### Task 1: Lock The Spec Contract With Failing Tests

**Files:**

- Modify: `packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts`

- [ ] **Step 1: Add a focused spec-compile helper**

```ts
const buildSpec = (vseed: VSeed) => {
  const builder = Builder.from(vseed)
  const advanced = builder.buildAdvanced()

  if (!advanced) {
    throw new Error('Expected advanced vseed to be built before spec assertions')
  }

  return builder.buildSpec(advanced)
}
```

- [ ] **Step 2: Add a failing vertical-column case that locks the step-line mapping**

```ts
test('column compiles annotationDifferenceLine into a top step markLine', () => {
  const spec = buildSpec({
    chartType: 'column',
    dataset: baseDataset,
    dimensions: [{ id: 'year', encoding: 'xAxis' }],
    measures: [{ id: 'autocracies', encoding: 'yAxis' }],
    annotationDifferenceLine,
  }) as { markLine?: any[] }

  expect(spec.markLine?.[0]).toMatchObject({
    type: 'type-step',
    connectDirection: 'top',
    label: expect.objectContaining({
      text: '-31%',
    }),
  })
})
```

- [ ] **Step 3: Add a failing horizontal-bar case that locks direction inference**

```ts
test('bar compiles annotationDifferenceLine into a right step markLine', () => {
  const spec = buildSpec({
    chartType: 'bar',
    dataset: baseDataset,
    dimensions: [{ id: 'year', encoding: 'yAxis' }],
    measures: [{ id: 'autocracies', encoding: 'xAxis' }],
    annotationDifferenceLine,
  }) as { markLine?: any[] }

  expect(spec.markLine?.[0]).toMatchObject({
    type: 'type-step',
    connectDirection: 'right',
  })
})
```

- [ ] **Step 4: Add a failing parallel case that proves selector-based subgroup anchoring works**

```ts
test('columnParallel keeps anchors on the selected subgroup rather than the band center', () => {
  const spec = buildSpec({
    chartType: 'columnParallel',
    dataset: baseDataset,
    dimensions: [{ id: 'year', encoding: 'xAxis' }],
    measures: [
      { id: 'autocracies', encoding: 'yAxis' },
      { id: 'democracies', encoding: 'yAxis' },
    ],
    annotationDifferenceLine,
  }) as { markLine?: any[] }

  expect(spec.markLine?.[0]).toMatchObject({
    type: 'type-step',
    connectDirection: 'top',
  })
  expect(spec.markLine?.[0]?.coordinates).toBeTypeOf('function')
})
```

- [ ] **Step 5: Add a failing stacked-total case**

```ts
test('stacked column lifts both anchors to stack totals', () => {
  const spec = buildSpec({
    chartType: 'column',
    dataset: [
      { year: '1930', autocracies: 129, democracies: 23 },
      { year: '2000', autocracies: 89, democracies: 87 },
    ],
    dimensions: [{ id: 'year', encoding: 'xAxis' }],
    measures: [
      { id: 'autocracies', encoding: 'yAxis' },
      { id: 'democracies', encoding: 'yAxis' },
    ],
    annotationDifferenceLine: {
      start: { selector: { year: '1930' } },
      end: { selector: { year: '2000' } },
      differenceType: 'absolute',
    },
  }) as { markLine?: any[] }

  expect(spec.markLine?.[0]).toMatchObject({
    type: 'type-step',
    label: expect.objectContaining({
      text: '24',
    }),
  })
})
```

- [ ] **Step 6: Add failing error-path tests for ambiguity and zero-start percent**

```ts
test('throws when a non-stacked anchor selector matches more than one datum', () => {
  expect(() =>
    buildSpec({
      chartType: 'columnParallel',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'yAxis' },
        { id: 'democracies', encoding: 'yAxis' },
      ],
      annotationDifferenceLine: {
        start: { selector: { year: '1930' } },
        end: { selector: { year: '2000', autocracies: 89 } },
        differenceType: 'percent',
      },
    }),
  ).toThrow(/annotationDifferenceLine.*start.*exactly one/i)
})

test('throws when percent difference uses a zero start value', () => {
  expect(() =>
    buildSpec({
      chartType: 'column',
      dataset: [
        { year: '1930', autocracies: 0 },
        { year: '2000', autocracies: 10 },
      ],
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: 0 } },
        end: { selector: { year: '2000', autocracies: 10 } },
        differenceType: 'percent',
      },
    }),
  ).toThrow(/annotationDifferenceLine.*start value is 0/i)
})
```

- [ ] **Step 7: Run the focused test file and confirm the new assertions fail for the right reasons**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

Expected: FAIL with missing `markLine`, wrong direction, or missing validation errors.

- [ ] **Step 8: Commit the test-only change**

```bash
git add packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts
git commit -m "test(annotation): lock difference line spec contract"
```

### Task 2: Implement Logical Anchor Resolution And Label Formatting

**Files:**

- Create: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLineCommon.ts`

- [ ] **Step 1: Add small internal types that separate logical anchors from runtime coordinates**

```ts
type DifferenceAxisValue = string | number | Array<string | number>

type ResolvedDifferenceAnchor = {
  selectorLabel: 'start' | 'end'
  matchedDatum: Datum | Datum[]
  stackGroupKey?: Record<string, string | number>
  value: number
}
```

- [ ] **Step 2: Implement band-field and value-field helpers off the built spec**

```ts
const getBandFields = (spec: IBarChartSpec) => {
  return spec.direction === 'horizontal' ? array(spec.yField) : array(spec.xField)
}

const getValueField = (spec: IBarChartSpec) => {
  return spec.direction === 'horizontal' ? spec.xField : spec.yField
}
```

- [ ] **Step 3: Implement logical-anchor resolution with stacked and non-stacked branches**

```ts
export const resolveDifferenceAnchor = (options: {
  dataset: Datum[]
  selectorLabel: 'start' | 'end'
  selectorValue: Selector | Selectors
  spec: IBarChartSpec
  isStacked: boolean
}): ResolvedDifferenceAnchor => {
  const { dataset, selectorLabel, selectorValue, spec, isStacked } = options
  const matches = dataset.filter((datum) => selector(datum, selectorValue))

  if (!isStacked) {
    if (matches.length !== 1) {
      throw new Error(
        `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one datum, got ${matches.length}`,
      )
    }

    return {
      selectorLabel,
      matchedDatum: matches[0],
      value: Number(matches[0][array(getValueField(spec))[0] as string]),
    }
  }

  const bandFields = getBandFields(spec)
  const grouped = new Map<string, Datum[]>()

  matches.forEach((datum) => {
    const key = JSON.stringify(Object.fromEntries(bandFields.map((field) => [field, datum[field]])))
    grouped.set(key, [...(grouped.get(key) ?? []), datum])
  })

  if (grouped.size !== 1) {
    throw new Error(
      `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one stack group, got ${grouped.size}`,
    )
  }

  const [, groupedMatches] = [...grouped.entries()][0]
  const total = groupedMatches.reduce(
    (sum, datum) => sum + Number(array(getValueField(spec)).map((field) => datum[field])[0]),
    0,
  )

  return {
    selectorLabel,
    matchedDatum: groupedMatches,
    stackGroupKey: Object.fromEntries(bandFields.map((field) => [field, groupedMatches[0][field]])),
    value: total,
  }
}
```

- [ ] **Step 4: Replace the provisional stacked sum with a strict runtime-total strategy**

```ts
export const getStackRuntimeTotal = (runtimeMatches: Datum[]) => {
  const ends = runtimeMatches.map((datum) => Number(datum.__VCHART_STACK_END))
  const hasPositive = ends.some((value) => value > 0)
  const hasNegative = ends.some((value) => value < 0)

  if (hasPositive && hasNegative) {
    throw new Error('annotationDifferenceLine does not support mixed-sign stack totals in v1')
  }

  return hasNegative ? Math.min(...ends) : Math.max(...ends)
}
```

- [ ] **Step 5: Implement label formatting in one place**

```ts
export const buildDifferenceText = (startValue: number, endValue: number, differenceType: 'absolute' | 'percent') => {
  if (differenceType === 'percent') {
    if (startValue === 0) {
      throw new Error('annotationDifferenceLine percent difference cannot be computed because start value is 0')
    }

    return `${(((endValue - startValue) / startValue) * 100).toFixed(0)}%`
  }

  return `${endValue - startValue}`
}
```

- [ ] **Step 6: Add direction inference as a pure helper**

```ts
export const inferDifferenceConnectDirection = (vseed: VSeed) => {
  return isBarLikeChart(vseed) ? 'right' : 'top'
}
```

- [ ] **Step 7: Run tests and keep them failing only because the pipe is not wired yet**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

Expected: FAIL because `annotationDifferenceLine` still does not populate `spec.markLine`.

- [ ] **Step 8: Commit the helper layer**

```bash
git add packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLineCommon.ts
git commit -m "refactor(annotation): add difference line resolution helpers"
```

### Task 3: Build The Spec Pipe And Emit VChart Step MarkLines

**Files:**

- Create: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLine.ts`

- [ ] **Step 1: Add a pipe skeleton that reads annotation config and theme**

```ts
export const annotationDifferenceLine: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const annotation = advancedVSeed.annotation?.annotationDifferenceLine

  if (!annotation) {
    return spec
  }

  const theme = advancedVSeed.config?.[vseed.chartType as 'column']?.annotation?.annotationDifferenceLine
  const annotationList = Array.isArray(annotation) ? annotation : [annotation]

  // build markLine here
  return spec
}
```

- [ ] **Step 2: Pre-resolve logical anchors before creating mark lines**

```ts
const dataset = advancedVSeed.dataset.flat()
const barSpec = spec as IBarChartSpec
const isStackedChart =
  (vseed.chartType === 'column' || vseed.chartType === 'bar') &&
  (advancedVSeed.reshapeMeasures?.length ?? advancedVSeed.measures?.length ?? 0) > 1

const resolved = annotationList.map((item) => {
  const start = resolveDifferenceAnchor({
    dataset,
    selectorLabel: 'start',
    selectorValue: item.start.selector,
    spec: barSpec,
    isStacked: isStackedChart,
  })
  const end = resolveDifferenceAnchor({
    dataset,
    selectorLabel: 'end',
    selectorValue: item.end.selector,
    spec: barSpec,
    isStacked: isStackedChart,
  })

  return { item, start, end }
})
```

- [ ] **Step 3: Build runtime coordinate callbacks that read the current series data and return datum-like items**

```ts
const buildCoordinateDatum = (anchor: ResolvedDifferenceAnchor, spec: IBarChartSpec) => {
  return (seriesData: Datum[]) => {
    const bandFields = getBandFields(spec)
    const runtimeMatches = seriesData.filter((datum) =>
      bandFields.every(
        (field) => datum[field] === (anchor.stackGroupKey?.[field] ?? (anchor.matchedDatum as Datum)[field]),
      ),
    )

    if (runtimeMatches.length === 0) {
      throw new Error(
        `annotationDifferenceLine ${anchor.selectorLabel} anchor could not be found in runtime series data`,
      )
    }
    if (!anchor.stackGroupKey && runtimeMatches.length !== 1) {
      throw new Error(
        `annotationDifferenceLine ${anchor.selectorLabel} anchor resolved to ${runtimeMatches.length} runtime data rows`,
      )
    }

    const runtimeDatum = runtimeMatches[0]
    if (!anchor.stackGroupKey) {
      return runtimeDatum
    }

    return {
      ...runtimeDatum,
      [array(getValueField(spec))[0] as string]: getStackRuntimeTotal(runtimeMatches),
    }
  }
}
```

- [ ] **Step 4: Emit the final step markLine spec with VSeed-owned styling**

```ts
const markLine = resolved.map(({ item, start, end }) => ({
  type: 'type-step' as const,
  zIndex: ANNOTATION_Z_INDEX,
  connectDirection: inferDifferenceConnectDirection(advancedVSeed as VSeed),
  specifiedDataSeriesId: 'all' as const,
  coordinates: (seriesData: Datum[]) => [
    buildCoordinateDatum(start, barSpec)(seriesData),
    buildCoordinateDatum(end, barSpec)(seriesData),
  ],
  line: {
    style: {
      visible: true,
      stroke: item.lineColor ?? theme?.lineColor ?? '#212121',
      lineWidth: 1,
    },
  },
  label: {
    visible: true,
    text: buildDifferenceText(start.value, end.value, item.differenceType ?? 'absolute'),
    style: {
      fill: item.textColor ?? theme?.textColor ?? '#ffffff',
      fontSize: item.textFontSize ?? theme?.textFontSize ?? 12,
      stroke: item.textBackgroundColor ?? theme?.textBackgroundColor ?? '#212121',
      lineWidth: 1,
    },
    labelBackground: {
      visible: true,
      style: {
        fill: item.textBackgroundColor ?? theme?.textBackgroundColor ?? '#212121',
      },
    },
  },
  startSymbol: {
    visible: false,
  },
  endSymbol: {
    visible: true,
    symbolType: 'arrow',
    style: {
      fill: item.lineColor ?? theme?.lineColor ?? '#212121',
    },
  },
}))
```

- [ ] **Step 5: Merge with any existing `spec.markLine` entries**

```ts
const specMarkLine = (spec as ILineChartSpec).markLine ?? []

return {
  ...spec,
  markLine: [...specMarkLine, ...markLine],
}
```

- [ ] **Step 6: Run the focused tests and make the new cases pass**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

Expected: PASS

- [ ] **Step 7: Commit the pipe implementation**

```bash
git add \
  packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLine.ts \
  packages/vseed/src/pipeline/spec/chart/pipes/annotation/annotationDifferenceLineCommon.ts \
  packages/vseed/tests/unit/builder/annotationDifferenceLine.test.ts
git commit -m "feat(annotation): compile difference lines into step mark lines"
```

### Task 4: Wire The Pipe Into The Supported Chart Pipelines And Verify Theme Strategy

**Files:**

- Modify: `packages/vseed/src/pipeline/spec/chart/pipes/annotation/index.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/column.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/bar.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/columnParallel.ts`
- Modify: `packages/vseed/src/pipeline/spec/chart/pipeline/barParallel.ts`

- [ ] **Step 1: Export the new pipe**

```ts
export { annotationDifferenceLine } from './annotationDifferenceLine'
```

- [ ] **Step 2: Insert the pipe after the existing line annotations and before area-band annotations**

```ts
annotationPoint,
annotationVerticalLine,
annotationHorizontalLine,
annotationDifferenceLine,
annotationAreaBand,
```

- [ ] **Step 3: Keep the current theme source and do not add new token-color mappings in this task**

```ts
const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationDifferenceLine
```

Reason: `annotationHorizontalLine`, `annotationVerticalLine`, and `annotationPoint` already get their light/dark color defaults from `theme/common/annotaion.ts`, while `tokenTheme.ts` only patches shared font sizes. Adding token-color logic for `annotationDifferenceLine` alone would create a one-off styling path that the other annotation primitives do not use.

- [ ] **Step 4: Re-run focused tests plus package typecheck**

Run: `cd packages/vseed && node_modules/.bin/vitest run tests/unit/builder/annotationDifferenceLine.test.ts`

Expected: PASS

Run: `pnpm --filter @visactor/vseed typecheck`

Expected: PASS

- [ ] **Step 5: Self-review the emitted spec shape**

Checklist:

- `column`/`columnParallel` use `connectDirection: 'top'`
- `bar`/`barParallel` use `connectDirection: 'right'`
- `label.text` matches `(end - start) / start` or `end - start`
- stacked `column`/`bar` selectors collapse to one stack group and callback returns a datum-like item with the runtime stack total value field
- non-stacked ambiguous selectors throw
- zero-start percent throws

- [ ] **Step 6: Commit the pipeline wiring**

```bash
git add \
  packages/vseed/src/pipeline/spec/chart/pipes/annotation/index.ts \
  packages/vseed/src/pipeline/spec/chart/pipeline/column.ts \
  packages/vseed/src/pipeline/spec/chart/pipeline/bar.ts \
  packages/vseed/src/pipeline/spec/chart/pipeline/columnParallel.ts \
  packages/vseed/src/pipeline/spec/chart/pipeline/barParallel.ts
git commit -m "feat(chart): wire difference line annotations into supported bar pipelines"
```

## Self-Review

- **Spec coverage:** This plan covers selector resolution, stacked-total lifting, label computation, direction inference, pipeline wiring, and verification.
- **Placeholder scan:** No `TODO`, `TBD`, or "appropriate handling" placeholders remain.
- **Type consistency:** The plan consistently uses `annotationDifferenceLine`, `ResolvedDifferenceAnchor`, `buildDifferenceText`, and `inferDifferenceConnectDirection`.

## Recommended Execution Mode

Use inline execution in this session. The work is tightly coupled around one spec pipe and one test file; splitting it into multiple workers adds coordination cost without reducing the critical path.

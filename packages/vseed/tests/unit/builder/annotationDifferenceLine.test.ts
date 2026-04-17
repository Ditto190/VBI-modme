import { beforeAll, describe, expect, test } from 'vitest'
import { Builder } from 'src/builder'
import { registerAll } from 'src/builder/register/all'
import type { Datum, VSeed } from 'src/types'

type DifferenceCoordinateCallback = (
  data: Datum[],
  relativeSeries: {
    getStackValueField: () => string
  },
) => Datum[]

const baseDataset = [
  { year: '1930', autocracies: 129, democracies: 23 },
  { year: '2000', autocracies: 89, democracies: 87 },
]

const negativeValueDataset = [
  { year: '1930', autocracies: -120 },
  { year: '1940', autocracies: -90 },
  { year: '2000', autocracies: -60 },
]

const negativeStackDataset = [
  { year: '1930', autocracies: -129, democracies: -23 },
  { year: '2000', autocracies: -89, democracies: -7 },
]

const annotationDifferenceLine = {
  start: {
    selector: { year: '1930', autocracies: 129 },
  },
  end: {
    selector: { year: '2000', autocracies: 89 },
  },
  differenceType: 'percent' as const,
  textFontSize: 14,
  textColor: '#ffffff',
  textBackgroundColor: '#212121',
  lineColor: '#212121',
}

const annotationDifferenceLineWithDefaults = {
  start: {
    selector: { year: '1930', autocracies: 129 },
  },
  end: {
    selector: { year: '2000', autocracies: 89 },
  },
  differenceType: 'percent' as const,
}

const cases: Array<{ name: string; vseed: VSeed; expectedAnnotation: typeof annotationDifferenceLineWithDefaults }> = [
  {
    name: 'column preserves annotationDifferenceLine',
    vseed: {
      chartType: 'column',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine,
    },
    expectedAnnotation: annotationDifferenceLine,
  },
  {
    name: 'line preserves annotationDifferenceLine',
    vseed: {
      chartType: 'line',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    },
    expectedAnnotation: annotationDifferenceLineWithDefaults,
  },
  {
    name: 'area preserves annotationDifferenceLine',
    vseed: {
      chartType: 'area',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    },
    expectedAnnotation: annotationDifferenceLineWithDefaults,
  },
  {
    name: 'bar preserves annotationDifferenceLine',
    vseed: {
      chartType: 'bar',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'yAxis' }],
      measures: [{ id: 'autocracies', encoding: 'xAxis' }],
      annotationDifferenceLine,
    },
    expectedAnnotation: annotationDifferenceLine,
  },
  {
    name: 'columnParallel preserves annotationDifferenceLine',
    vseed: {
      chartType: 'columnParallel',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'yAxis' },
        { id: 'democracies', encoding: 'yAxis' },
      ],
      annotationDifferenceLine,
    },
    expectedAnnotation: annotationDifferenceLine,
  },
  {
    name: 'barParallel preserves annotationDifferenceLine',
    vseed: {
      chartType: 'barParallel',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'yAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'xAxis' },
        { id: 'democracies', encoding: 'xAxis' },
      ],
      annotationDifferenceLine,
    },
    expectedAnnotation: annotationDifferenceLine,
  },
]

const buildSpec = (vseed: VSeed) => {
  const builder = Builder.from(vseed)
  const advanced = builder.buildAdvanced()

  if (!advanced) {
    throw new Error('Expected advanced vseed to be built before spec assertions')
  }

  return {
    advanced,
    spec: builder.buildSpec(advanced),
  }
}

describe('annotationDifferenceLine', () => {
  beforeAll(() => {
    registerAll()
  })

  cases.forEach(({ name, vseed, expectedAnnotation }) => {
    test(name, () => {
      const builder = Builder.from(vseed)
      const advanced = builder.buildAdvanced()

      expect(advanced).toBeDefined()
      expect(advanced?.annotation.annotationDifferenceLine).toEqual(expectedAnnotation)
      expect(builder.buildSpec(advanced!)).toBeDefined()
    })
  })

  test('column compiles annotationDifferenceLine into a top step markLine', () => {
    const { spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'top',
      expandDistance: 24,
      line: {
        style: {
          lineDash: [0],
          lineWidth: 2,
          cornerRadius: 4,
          stroke: '#BCC1CB',
        },
      },
      label: expect.objectContaining({
        text: '-31%',
        position: 'middle',
        style: expect.objectContaining({
          fill: '#ffffff',
          fontSize: 12,
        }),
        labelBackground: {
          visible: true,
          padding: 4,
          style: expect.objectContaining({
            fill: '#BCC1CB',
            stroke: '#BCC1CB',
            lineWidth: 1,
            cornerRadius: 4,
          }),
        },
      }),
      endSymbol: expect.objectContaining({
        visible: true,
        size: 12,
        refX: -4,
      }),
    })
    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]?.coordinates).toEqual(expect.any(Function))
    expect((spec as { markLine?: Array<Record<string, any>> }).markLine?.[0]?.endSymbol).not.toHaveProperty('symbolType')
  })

  test('bar compiles annotationDifferenceLine into a right step markLine', () => {
    const { spec } = buildSpec({
      chartType: 'bar',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'yAxis' }],
      measures: [{ id: 'autocracies', encoding: 'xAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'right',
      expandDistance: 24,
      line: {
        style: {
          lineDash: [0],
          lineWidth: 2,
          cornerRadius: 4,
        },
      },
    })
    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]?.coordinates).toEqual(expect.any(Function))
  })

  test('line compiles annotationDifferenceLine into a bracket step markLine', () => {
    const { spec } = buildSpec({
      chartType: 'line',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'right',
      expandDistance: 80,
      line: {
        multiSegment: true,
        mainSegmentIndex: 1,
        style: [
          {
            lineDash: [2, 2],
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
          {
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
          {
            lineDash: [2, 2],
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
        ],
      },
      label: expect.objectContaining({
        position: 'middle',
        style: expect.objectContaining({
          fill: '#ffffff',
          fontSize: 12,
        }),
        labelBackground: {
          visible: true,
          padding: 4,
          style: expect.objectContaining({
            fill: '#BCC1CB',
            stroke: '#BCC1CB',
            lineWidth: 1,
            cornerRadius: 4,
          }),
        },
      }),
    })
  })

  test('area compiles annotationDifferenceLine into a bracket step markLine', () => {
    const { spec } = buildSpec({
      chartType: 'area',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: annotationDifferenceLineWithDefaults,
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'right',
      expandDistance: 80,
      line: {
        multiSegment: true,
        mainSegmentIndex: 1,
        style: [
          {
            lineDash: [2, 2],
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
          {
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
          {
            lineDash: [2, 2],
            lineWidth: 2,
            stroke: '#BCC1CB',
          },
        ],
      },
    })
  })

  test('columnParallel compiles annotationDifferenceLine into a top step markLine', () => {
    const { spec } = buildSpec({
      chartType: 'columnParallel',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'yAxis' },
        { id: 'democracies', encoding: 'yAxis' },
      ],
      annotationDifferenceLine,
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'top',
    })
    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]?.coordinates).toEqual(expect.any(Function))
  })

  test('stacked column lifts anchors to stack totals for label calculation', () => {
    const { spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
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
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      label: expect.objectContaining({
        text: '24',
      }),
    })
    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]?.coordinates).toEqual(expect.any(Function))
  })

  test('stacked area uses the selected element stack-end value instead of full stack total', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'area',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'yAxis' },
        { id: 'democracies', encoding: 'yAxis' },
      ],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: 129 } },
        end: { selector: { year: '2000', autocracies: 89 } },
        differenceType: 'absolute',
      },
    })

    const markLine = (spec as { markLine?: Array<Record<string, any>> }).markLine?.[0]
    expect(markLine).toMatchObject({
      type: 'type-step',
      connectDirection: 'right',
      line: expect.objectContaining({
        multiSegment: true,
        mainSegmentIndex: 1,
      }),
      label: expect.objectContaining({
        formatMethod: expect.any(Function),
      }),
    })

    const coordinates = markLine?.coordinates as DifferenceCoordinateCallback | undefined
    const runtimeSeriesData = advanced.dataset.flat().map((datum) => {
      if (datum.year === '1930' && datum.autocracies === 129) {
        return { ...datum, __VCHART_STACK_END: 152 }
      }

      if (datum.year === '1930' && datum.democracies === 23) {
        return { ...datum, __VCHART_STACK_END: 23 }
      }

      if (datum.year === '2000' && datum.autocracies === 89) {
        return { ...datum, __VCHART_STACK_END: 176 }
      }

      if (datum.year === '2000' && datum.democracies === 87) {
        return { ...datum, __VCHART_STACK_END: 87 }
      }

      return datum
    })

    const coordinateData = coordinates?.(runtimeSeriesData, {
      getStackValueField: () => '__STACK_VALUE__',
    })

    expect(coordinateData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          year: '1930',
          __STACK_VALUE__: 152,
        }),
        expect.objectContaining({
          year: '2000',
          __STACK_VALUE__: 176,
        }),
      ]),
    )

    expect(markLine?.label?.formatMethod?.(coordinateData ?? [], runtimeSeriesData)).toBe('24')
  })

  test('stacked area label formatter falls back to empty text when runtime percent calculation is invalid', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'area',
      dataset: [
        { year: '1930', autocracies: 0, democracies: 23 },
        { year: '2000', autocracies: 89, democracies: 87 },
      ],
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'autocracies', encoding: 'yAxis' },
        { id: 'democracies', encoding: 'yAxis' },
      ],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: 0 } },
        end: { selector: { year: '2000', autocracies: 89 } },
        differenceType: 'percent',
      },
    })

    const markLine = (spec as { markLine?: Array<Record<string, any>> }).markLine?.[0]
    const coordinates = markLine?.coordinates as DifferenceCoordinateCallback | undefined
    const runtimeSeriesData = advanced.dataset.flat().map((datum) => {
      if (datum.year === '1930' && datum.autocracies === 0) {
        return { ...datum, __VCHART_STACK_END: 0 }
      }

      if (datum.year === '2000' && datum.autocracies === 89) {
        return { ...datum, __VCHART_STACK_END: 176 }
      }

      return datum
    })
    const coordinateData = coordinates?.(runtimeSeriesData, {
      getStackValueField: () => '__STACK_VALUE__',
    })

    expect(markLine?.label?.formatMethod?.(coordinateData ?? [], runtimeSeriesData)).toBe('')
  })

  test('stacked column coordinate callback does not require __VCHART_STACK_END on seriesData', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
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
    })

    const coordinates = (spec as { markLine?: Array<{ coordinates?: DifferenceCoordinateCallback }> }).markLine?.[0]
      ?.coordinates
    const coordinateData = coordinates?.(advanced.dataset.flat(), {
      getStackValueField: () => '__STACK_VALUE__',
    })

    expect(coordinateData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          year: '1930',
          __STACK_VALUE__: 152,
        }),
        expect.objectContaining({
          year: '2000',
          __STACK_VALUE__: 176,
        }),
      ]),
    )
  })

  test('column keeps percent difference calculation stable for negative values', () => {
    const { spec } = buildSpec({
      chartType: 'column',
      dataset: negativeValueDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: -120 } },
        end: { selector: { year: '2000', autocracies: -60 } },
        differenceType: 'percent',
      },
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'bottom',
      label: expect.objectContaining({
        text: '-50%',
      }),
    })
  })

  test('bar uses a left step markLine for negative values', () => {
    const { spec } = buildSpec({
      chartType: 'bar',
      dataset: negativeValueDataset,
      dimensions: [{ id: 'year', encoding: 'yAxis' }],
      measures: [{ id: 'autocracies', encoding: 'xAxis' }],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: -120 } },
        end: { selector: { year: '2000', autocracies: -60 } },
        differenceType: 'percent',
      },
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'left',
      label: expect.objectContaining({
        text: '-50%',
      }),
    })
  })

  test('stacked column supports all-negative stack totals', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'column',
      dataset: negativeStackDataset,
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
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      connectDirection: 'bottom',
      label: expect.objectContaining({
        text: '56',
      }),
    })

    const coordinates = (spec as { markLine?: Array<{ coordinates?: DifferenceCoordinateCallback }> }).markLine?.[0]
      ?.coordinates
    const coordinateData = coordinates?.(advanced.dataset.flat(), {
      getStackValueField: () => '__STACK_VALUE__',
    })

    expect(coordinateData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          year: '1930',
          __STACK_VALUE__: -152,
        }),
        expect.objectContaining({
          year: '2000',
          __STACK_VALUE__: -96,
        }),
      ]),
    )
  })

  test('non-stacked selectors can fall back to selector datum when dataset matches 0 items', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: {
        start: { selector: { year: '1930', autocracies: 150 } },
        end: { selector: { year: '2000', autocracies: 89 } },
        differenceType: 'absolute',
      },
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      label: expect.objectContaining({
        text: '-61',
      }),
    })

    const coordinates = (spec as { markLine?: Array<{ coordinates?: DifferenceCoordinateCallback }> }).markLine?.[0]
      ?.coordinates
    const coordinateData = coordinates?.(advanced.dataset.flat(), {
      getStackValueField: () => '__STACK_VALUE__',
    })

    expect(coordinateData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          year: '1930',
          autocracies: 150,
        }),
        expect.objectContaining({
          year: '2000',
          autocracies: 89,
        }),
      ]),
    )
  })

  test('difference line is skipped when selector matches 0 items and cannot provide a numeric value', () => {
    const { spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: {
        start: { selector: { year: '1930' } },
        end: { selector: { year: '9999' } },
        differenceType: 'absolute',
      },
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine).toEqual([])
  })

  test('skips the difference line when a non-stacked anchor selector matches more than one datum', () => {
    const { spec } = buildSpec({
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
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine).toEqual([])
  })

  test('skips the difference line when percent difference uses a zero start value', () => {
    const { spec } = buildSpec({
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
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine).toEqual([])
  })

  test('skips malformed difference line configs instead of throwing', () => {
    const { spec } = buildSpec({
      chartType: 'column',
      dataset: baseDataset,
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'autocracies', encoding: 'yAxis' }],
      annotationDifferenceLine: [
        {
          end: { selector: { year: '2000', autocracies: 89 } },
        } as any,
        {
          start: { selector: { year: '1930', autocracies: 129 } },
          end: { selector: { year: '2000', autocracies: 89 } },
          differenceType: 'absolute',
        },
        {
          start: {},
          end: { selector: { year: '2000', autocracies: 89 } },
        } as any,
        {
          start: { selector: { year: '1930', autocracies: 129 } },
        } as any,
        {
          start: { selector: { year: '1930', autocracies: 129 } },
          end: {},
        } as any,
      ],
    })

    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine).toHaveLength(1)
    expect((spec as { markLine?: Array<Record<string, unknown>> }).markLine?.[0]).toMatchObject({
      type: 'type-step',
      label: expect.objectContaining({
        text: '-40',
      }),
    })
  })

  test('light theme exposes annotationDifferenceLine defaults', () => {
    const theme = Builder.getTheme('light')

    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textFontSize).toBeDefined()
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.lineColor).toBe('#BCC1CB')
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textColor).toBe('#ffffff')
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textBackgroundColor).toBe('#BCC1CB')
  })

  test('dark theme exposes annotationDifferenceLine defaults', () => {
    const theme = Builder.getTheme('dark')

    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textFontSize).toBeDefined()
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.lineColor).toBe('#55595F')
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textColor).toBe('#E2E3E6')
    expect(theme.config?.column?.annotation?.annotationDifferenceLine?.textBackgroundColor).toBe('#55595F')
  })
})

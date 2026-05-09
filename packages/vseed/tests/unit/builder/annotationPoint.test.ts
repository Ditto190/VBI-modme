import { beforeAll, describe, expect, test } from 'vitest'
import { Builder } from 'src/builder'
import { registerAll } from 'src/builder/register/all'
import { MeasureId } from 'src/dataReshape/constant'
import type { Datum, VSeed } from 'src/types'

type AnnotationPointCoordinateCallback = (
  data: Datum[],
  context: {
    getStack: () => boolean
    getStackValueField: () => string
  },
) => Datum | undefined

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

describe('annotationPoint', () => {
  beforeAll(() => {
    registerAll()
  })

  test('line can disambiguate a multi-measure point by selector and measureId', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'line',
      dataset: [
        { year: '2021', sales: 100, profit: 50 },
        { year: '2022', sales: 120, profit: 60 },
      ],
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [
        { id: 'sales', encoding: 'yAxis' },
        { id: 'profit', encoding: 'yAxis' },
      ],
      annotationPoint: {
        selector: { year: '2022' },
        measureId: 'sales',
        text: '2022 销售额',
      },
    } satisfies VSeed)

    expect(advanced.annotation.annotationPoint).toMatchObject({
      selector: { year: '2022' },
      measureId: 'sales',
    })

    const markPoint = (spec as { markPoint?: Array<{ coordinate?: AnnotationPointCoordinateCallback }> }).markPoint
    expect(markPoint).toHaveLength(1)

    const coordinate = markPoint?.[0]?.coordinate
    expect(coordinate).toBeTypeOf('function')

    const point = coordinate?.(advanced.dataset.flat(), {
      getStack: () => false,
      getStackValueField: () => '__VCHART_STACK_END',
    })

    expect(point).toMatchObject({
      year: '2022',
      sales: 120,
      [MeasureId]: 'sales',
    })
  })

  test('dualAxis annotationPoint only targets the series matching measureId', () => {
    const { spec } = buildSpec({
      chartType: 'dualAxis',
      dataset: [
        { date_label: '11-17', event_revenue_m: 8, social_mentions_k: 12 },
        { date_label: '11-18', event_revenue_m: 10, social_mentions_k: 20 },
      ],
      dimensions: [{ id: 'date_label', encoding: 'xAxis', alias: '日期' }],
      measures: [
        {
          id: 'event_revenue_m',
          encoding: 'primaryYAxis',
          chartType: 'line',
          alias: '事件收入（百万美元）',
        },
        {
          id: 'social_mentions_k',
          encoding: 'secondaryYAxis',
          chartType: 'line',
          alias: '社交提及（千次）',
        },
      ],
      annotationPoint: [
        {
          selector: { field: 'date_label', operator: '=', value: '11-18' },
          measureId: 'event_revenue_m',
          text: '收入峰值',
        },
        {
          selector: { field: 'date_label', operator: '=', value: '11-18' },
          measureId: 'social_mentions_k',
          text: '声量峰值',
        },
      ],
    } satisfies VSeed)

    const markPoint = (spec as { markPoint?: Array<{ relativeSeriesIndex?: number }> }).markPoint

    expect(markPoint).toHaveLength(2)
    expect(markPoint?.map((point) => point.relativeSeriesIndex)).toEqual([0, 1])
  })
})

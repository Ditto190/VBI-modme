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
})

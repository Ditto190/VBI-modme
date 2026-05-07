import { barLoop } from 'src/pipeline/spec/chart/pipes/animation/bar'

const createVChartContext = (domain: string[]) => ({
  vchart: {
    getChart: () => ({
      getAllSeries: () => [
        {
          direction: 'vertical',
          fieldX: ['category'],
          scaleX: { domain: () => domain },
        },
      ],
    }),
  },
})

describe('bar animation', () => {
  it('should use configured duration for group highlight loop', () => {
    const spec = {
      direction: 'vertical',
      xField: 'category',
      data: [{ values: [{ category: 'A' }, { category: 'B' }, { category: 'C' }, { category: 'D' }] }],
    }

    const result = barLoop(
      {
        enable: true,
        interval: 1,
        loop: { enable: true, effects: ['highLight'], duration: 2 },
      },
      false,
      'column',
      spec,
    ) as any
    const duration = result.bar[0].timeSlices[0].duration(null, null, null, createVChartContext(['A', 'B', 'C', 'D']))

    expect(duration).toBe(250)
  })
})

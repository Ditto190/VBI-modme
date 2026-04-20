import { beforeAll, describe, expect, test } from 'vitest'
import { Builder } from 'src/builder'
import { registerAll } from 'src/builder/register/all'
import type { VSeed } from 'src/types'

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

describe('regionPadding', () => {
  beforeAll(() => {
    registerAll()
  })

  test('line maps object regionPadding to the first VChart region', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'line',
      dataset: [
        { year: '1930', value: 129 },
        { year: '2000', value: 89 },
      ],
      dimensions: [{ id: 'year', encoding: 'xAxis' }],
      measures: [{ id: 'value', encoding: 'yAxis' }],
      regionPadding: { top: 80, right: 24 },
    } satisfies VSeed)

    expect(advanced.config.line?.regionPadding).toEqual({ top: 80, right: 24 })
    expect((spec as { region?: Array<{ padding?: unknown }> }).region?.[0]?.padding).toEqual({ top: 80, right: 24 })
  })

  test('bar maps numeric regionPadding to the first VChart region', () => {
    const { advanced, spec } = buildSpec({
      chartType: 'bar',
      dataset: [
        { year: '1930', value: 129 },
        { year: '2000', value: 89 },
      ],
      dimensions: [{ id: 'year', encoding: 'yAxis' }],
      measures: [{ id: 'value', encoding: 'xAxis' }],
      regionPadding: 48,
    } satisfies VSeed)

    expect(advanced.config.bar?.regionPadding).toBe(48)
    expect((spec as { region?: Array<{ padding?: unknown }> }).region?.[0]?.padding).toBe(48)
  })
})

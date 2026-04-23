import { act, renderHook } from '@testing-library/react'

import { useDimensions, useMeasures } from '@visactor/vbi-react'

import { createTestBuilder } from '../utils/createTestBuilder'

describe('collection hooks', () => {
  it('manages measures by id', () => {
    const builder = createTestBuilder()
    const { result } = renderHook(() => useMeasures(builder))

    act(() => {
      result.current.addMeasure('sales', { alias: 'Sales', encoding: 'yAxis' })
    })

    expect(result.current.measures).toHaveLength(1)
    expect(result.current.measures[0]).toMatchObject({
      alias: 'Sales',
      encoding: 'yAxis',
      field: 'sales',
    })

    const measureId = result.current.measures[0].id

    act(() => {
      result.current.updateMeasure(measureId, { alias: 'Revenue' })
    })

    expect(result.current.measures[0].alias).toBe('Revenue')

    act(() => {
      result.current.removeMeasure(measureId)
    })

    expect(result.current.measures).toHaveLength(0)
  })

  it('manages dimensions by id', () => {
    const builder = createTestBuilder()
    const { result } = renderHook(() => useDimensions(builder))

    act(() => {
      result.current.addDimension('province', { aggregate: { func: 'toMonth' }, alias: 'Province', encoding: 'color' })
    })

    expect(result.current.dimensions).toHaveLength(1)
    expect(result.current.dimensions[0]).toMatchObject({
      aggregate: { func: 'toMonth' },
      alias: 'Province',
      encoding: 'color',
      field: 'province',
    })

    const dimensionId = result.current.dimensions[0].id

    act(() => {
      result.current.updateDimension(dimensionId, { aggregate: null, alias: 'Region', encoding: 'xAxis' })
    })

    expect(result.current.dimensions[0].alias).toBe('Region')
    expect(result.current.dimensions[0].aggregate).toBeUndefined()
    expect(result.current.dimensions[0].encoding).toBe('xAxis')

    act(() => {
      result.current.removeDimension(dimensionId)
    })

    expect(result.current.dimensions).toHaveLength(0)
  })
})

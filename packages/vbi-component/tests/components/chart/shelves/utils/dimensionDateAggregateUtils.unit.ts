import { describe, expect, it } from '@stencil/vitest'
import {
  formatDimensionDateAggregate,
  getDefaultDimensionDateAggregate,
  getDimensionDateAggregateItems,
  isDateDimensionField,
  normalizeDimensionDateAggregate,
} from 'src/components/chart/shelves/utils/dimensionDateAggregateUtils'

describe('isDateDimensionField', () => {
  it('should return true for date schema types', () => {
    expect(isDateDimensionField('date')).toBe(true)
    expect(isDateDimensionField('timestamp')).toBe(true)
  })

  it('should return false for non-date schema types', () => {
    expect(isDateDimensionField('string')).toBe(false)
    expect(isDateDimensionField('number')).toBe(false)
  })
})

describe('getDefaultDimensionDateAggregate', () => {
  it('should return toDay aggregate default', () => {
    expect(getDefaultDimensionDateAggregate()).toEqual({ func: 'toDay' })
  })
})

describe('normalizeDimensionDateAggregate', () => {
  it('should return undefined when schemaType is not date', () => {
    expect(normalizeDimensionDateAggregate({ func: 'toYear' }, 'string')).toBeUndefined()
  })

  it('should return aggregate when schemaType is date and func is supported', () => {
    expect(normalizeDimensionDateAggregate({ func: 'toYear' }, 'date')).toEqual({ func: 'toYear' })
  })

  it('should return undefined for unsupported date function', () => {
    expect(normalizeDimensionDateAggregate({ func: 'unknown' as any }, 'date')).toBeUndefined()
  })
})

describe('getDimensionDateAggregateItems', () => {
  it('should return all supported date aggregate items', () => {
    const items = getDimensionDateAggregateItems((key) => key)
    expect(items.length).toBe(8)
    expect(items[0].key).toBe('toYear')
  })
})

describe('formatDimensionDateAggregate', () => {
  it('should return short label translation key for valid aggregate', () => {
    const text = formatDimensionDateAggregate({ func: 'toMonth' }, (key) => key)
    expect(text).toBe('aggregatesDateToMonthShort')
  })
})

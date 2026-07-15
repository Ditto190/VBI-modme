import { describe, expect, it } from '@stencil/vitest'
import {
  getDateFilterDisplayText,
  getDefaultDatePredicate,
  isDateFilter,
} from 'src/components/chart/shelves/vbi-chart-where/helpers/date-filter-utils'

describe('isDateFilter', () => {
  it('should return true when op is "date"', () => {
    expect(isDateFilter({ op: 'date' })).toBe(true)
  })

  it('should return false for other ops', () => {
    expect(isDateFilter({ op: '=' })).toBe(false)
    expect(isDateFilter({})).toBe(false)
  })
})

describe('getDefaultDatePredicate', () => {
  it('should return default relative 7 day predicate', () => {
    expect(getDefaultDatePredicate()).toEqual({
      type: 'relative',
      mode: 'last',
      amount: 7,
      unit: 'day',
    })
  })
})

describe('getDateFilterDisplayText', () => {
  const mockTranslate = (key: string, params?: Record<string, unknown>) => {
    if (key === 'dateFilterDisplayRelative' && params) {
      return `${params.mode} ${params.amount} ${params.unit}`
    }
    return key
  }

  it('should format relative date predicate text', () => {
    const text = getDateFilterDisplayText({ type: 'relative', mode: 'last', amount: 7, unit: 'day' }, mockTranslate)
    expect(typeof text).toBe('string')
    expect(text.length).toBeGreaterThan(0)
  })

  it('should return empty string for invalid predicate', () => {
    expect(getDateFilterDisplayText(undefined as any, mockTranslate)).toBe('')
  })
})

import { describe, expect, it } from '@stencil/vitest'
import {
  getDefaultHavingAggregateByFieldRole,
  getHavingFilterInputStrategy,
  normalizeHavingOperator,
  serializeHavingFilterValue,
  toHavingDslOperator,
} from 'src/components/chart/shelves/vbi-chart-having/helpers/having-utils'

describe('normalizeHavingOperator', () => {
  it('should fallback to "=" when operator is empty or undefined', () => {
    expect(normalizeHavingOperator(undefined)).toBe('=')
    expect(normalizeHavingOperator('')).toBe('=')
  })

  it('should map DSL operator to UI operator correctly', () => {
    expect(normalizeHavingOperator('eq')).toBe('=')
    expect(normalizeHavingOperator('gte')).toBe('>=')
  })
})

describe('toHavingDslOperator', () => {
  it('should map UI operator to DSL operator', () => {
    expect(toHavingDslOperator('=')).toBe('eq')
    expect(toHavingDslOperator('>')).toBe('gt')
  })
})

describe('getDefaultHavingAggregateByFieldRole', () => {
  it('should return count for dimension and sum for measure', () => {
    expect(getDefaultHavingAggregateByFieldRole('dimension')).toEqual({ func: 'count' })
    expect(getDefaultHavingAggregateByFieldRole('measure')).toEqual({ func: 'sum' })
  })
})

describe('getHavingFilterInputStrategy', () => {
  it('should return strategy based on operator and numeric flag', () => {
    expect(getHavingFilterInputStrategy('is null', true)).toBe('none')
    expect(getHavingFilterInputStrategy('between', true)).toBe('range')
    expect(getHavingFilterInputStrategy('in', true)).toBe('tags')
    expect(getHavingFilterInputStrategy('=', true)).toBe('number')
    expect(getHavingFilterInputStrategy('=', false)).toBe('text')
  })
})

describe('serializeHavingFilterValue', () => {
  it('should serialize numeric range correctly', () => {
    const result = serializeHavingFilterValue({
      operator: 'between',
      isNumericValue: true,
      value: ['10', '20'],
    })
    expect(result).toEqual([10, 20])
  })

  it('should serialize number value correctly', () => {
    expect(serializeHavingFilterValue({ operator: '=', isNumericValue: true, value: '42' })).toBe(42)
  })
})

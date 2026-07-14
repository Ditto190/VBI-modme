import { describe, expect, it } from '@stencil/vitest'
import {
  getFilterOperatorKey,
  getWhereFilterInputStrategy,
  normalizeWhereOperator,
  normalizeWhereRangeValue,
  serializeWhereFilterValue,
} from 'src/components/chart/shelves/vbi-chart-where/helpers/where-utils'

describe('normalizeWhereOperator', () => {
  it('should fallback to "=" when operator is empty or undefined', () => {
    expect(normalizeWhereOperator(undefined)).toBe('=')
    expect(normalizeWhereOperator('')).toBe('=')
  })

  it('should resolve operator aliases', () => {
    expect(normalizeWhereOperator('eq')).toBe('=')
    expect(normalizeWhereOperator('ne')).toBe('!=')
    expect(normalizeWhereOperator('gte')).toBe('>=')
  })
})

describe('getFilterOperatorKey', () => {
  it('should map operator to translation key suffix', () => {
    expect(getFilterOperatorKey('=')).toBe('eq')
    expect(getFilterOperatorKey('in')).toBe('in')
    expect(getFilterOperatorKey('not in')).toBe('notIn')
  })
})

describe('getWhereFilterInputStrategy', () => {
  it('should return appropriate strategy for operator and role', () => {
    expect(getWhereFilterInputStrategy('is null', 'dimension')).toBe('none')
    expect(getWhereFilterInputStrategy('between', 'measure')).toBe('range')
    expect(getWhereFilterInputStrategy('in', 'dimension')).toBe('tags')
    expect(getWhereFilterInputStrategy('=', 'measure')).toBe('number')
    expect(getWhereFilterInputStrategy('=', 'dimension')).toBe('text')
  })
})

describe('normalizeWhereRangeValue', () => {
  it('should convert array to range object with default leftOp and rightOp', () => {
    expect(normalizeWhereRangeValue([10, 50])).toEqual({
      min: 10,
      max: 50,
      leftOp: '<=',
      rightOp: '<=',
    })
  })
})

describe('serializeWhereFilterValue', () => {
  it('should serialize number values for measure', () => {
    expect(serializeWhereFilterValue({ operator: '=', fieldRole: 'measure', value: '100' })).toBe(100)
  })

  it('should serialize tag arrays correctly', () => {
    expect(
      serializeWhereFilterValue({
        operator: 'in',
        fieldRole: 'dimension',
        value: 'A, B, C',
      }),
    ).toEqual(['A', 'B', 'C'])
  })
})

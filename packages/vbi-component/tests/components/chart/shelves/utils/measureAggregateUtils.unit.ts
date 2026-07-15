import { describe, expect, it } from '@stencil/vitest'
import {
  formatMeasureAggregate,
  getAggregateItemsByFieldRole,
  getDefaultAggregateByFieldRole,
  getMeasureFieldRoleBySchemaType,
  isAggregateSupportedByFieldRole,
} from 'src/components/chart/shelves/utils/measureAggregateUtils'

describe('getMeasureFieldRoleBySchemaType', () => {
  it('should return measure for number and dimension otherwise', () => {
    expect(getMeasureFieldRoleBySchemaType('number')).toBe('measure')
    expect(getMeasureFieldRoleBySchemaType('string')).toBe('dimension')
  })
})

describe('isAggregateSupportedByFieldRole', () => {
  it('should allow any aggregate for measure role', () => {
    expect(isAggregateSupportedByFieldRole({ func: 'sum' }, 'measure')).toBe(true)
    expect(isAggregateSupportedByFieldRole({ func: 'avg' }, 'measure')).toBe(true)
  })

  it('should restrict dimension role to count, countDistinct, min, max', () => {
    expect(isAggregateSupportedByFieldRole({ func: 'count' }, 'dimension')).toBe(true)
    expect(isAggregateSupportedByFieldRole({ func: 'sum' }, 'dimension')).toBe(false)
  })
})

describe('getDefaultAggregateByFieldRole', () => {
  it('should return sum for measure and count for dimension', () => {
    expect(getDefaultAggregateByFieldRole('measure')).toEqual({ func: 'sum' })
    expect(getDefaultAggregateByFieldRole('dimension')).toEqual({ func: 'count' })
  })
})

describe('getAggregateItemsByFieldRole', () => {
  it('should return filtered aggregate options based on role', () => {
    const items = getAggregateItemsByFieldRole('dimension', (key) => key)
    expect(items.every((item) => ['count', 'countDistinct', 'min', 'max'].includes(item.key))).toBe(true)
  })
})

describe('formatMeasureAggregate', () => {
  it('should format quantile as P<percent>', () => {
    expect(formatMeasureAggregate({ func: 'quantile', quantile: 0.95 }, (key) => key)).toBe('P95')
    expect(formatMeasureAggregate({ func: 'quantile', quantile: 0.5 }, (key) => key)).toBe('P50')
  })

  it('should format regular aggregates using translated short key', () => {
    expect(formatMeasureAggregate({ func: 'sum' }, (key) => key)).toBe('aggregatesMeasureSumShort')
  })
})

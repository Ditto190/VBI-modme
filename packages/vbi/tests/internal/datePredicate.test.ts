import { resolveDatePredicate } from 'src/chart-builder/pipeline/vqueryDSL/resolveDatePredicate'

describe('resolveDatePredicate', () => {
  const now = new Date('2026-04-13T08:00:00Z')

  test('resolves range and period predicates across all units', () => {
    expect(resolveDatePredicate({ type: 'range', start: '2026-01-01', end: '2026-02-01' })).toEqual({
      start: '2026-01-01',
      end: '2026-02-01',
      bounds: '[)',
    })
    expect(resolveDatePredicate({ type: 'period', unit: 'year', year: 2026 })).toEqual(
      expect.objectContaining({ start: '2026-01-01' }),
    )
    expect(resolveDatePredicate({ type: 'period', unit: 'quarter', year: 2026, quarter: 2 })).toEqual(
      expect.objectContaining({ start: '2026-04-01', end: '2026-07-01' }),
    )
    expect(resolveDatePredicate({ type: 'period', unit: 'month', year: 2026, month: 4 })).toEqual(
      expect.objectContaining({ start: '2026-04-01', end: '2026-05-01' }),
    )
    expect(resolveDatePredicate({ type: 'period', unit: 'week', year: 2026, week: 1 })).toEqual(
      expect.objectContaining({ start: '2025-12-29', end: '2026-01-05' }),
    )
    expect(resolveDatePredicate({ type: 'period', unit: 'day', date: '2026-04-13' })).toEqual(
      expect.objectContaining({ start: '2026-04-13', end: '2026-04-14' }),
    )
  })

  test('resolves relative and current predicates with offsets', () => {
    expect(resolveDatePredicate({ type: 'relative', mode: 'last', amount: 2, unit: 'week' }, now)).toEqual({
      start: '2026-03-30',
      end: '2026-04-13',
      bounds: '[)',
    })
    expect(resolveDatePredicate({ type: 'relative', mode: 'next', amount: 1, unit: 'month' }, now)).toEqual({
      start: '2026-04-13',
      end: '2026-05-13',
      bounds: '[)',
    })
    expect(resolveDatePredicate({ type: 'current', unit: 'quarter' }, now)).toEqual(
      expect.objectContaining({ start: '2026-04-01', end: '2026-07-01' }),
    )
    expect(resolveDatePredicate({ type: 'current', unit: 'week', offset: -1 }, now)).toEqual(
      expect.objectContaining({ start: '2026-04-06', end: '2026-04-13' }),
    )
    expect(resolveDatePredicate({ type: 'current', unit: 'day', offset: 2 }, now)).toEqual(
      expect.objectContaining({ start: '2026-04-15', end: '2026-04-16' }),
    )
    expect(
      resolveDatePredicate({
        type: 'range',
        start: new Date('2026-04-13T00:00:00Z'),
        end: new Date('2026-04-14T00:00:00Z'),
      }),
    ).toEqual({
      start: '2026-04-13',
      end: '2026-04-14',
      bounds: '[)',
    })
    expect(resolveDatePredicate({ type: 'current', unit: 'unknown' as any }, now)).toEqual(
      expect.objectContaining({ start: '2026-04-13', end: '2026-04-13' }),
    )
    expect(resolveDatePredicate({ type: 'relative', mode: 'next', amount: 1, unit: 'unknown' as any }, now)).toEqual(
      expect.objectContaining({ start: '2026-04-13', end: '2026-04-13' }),
    )
  })
})

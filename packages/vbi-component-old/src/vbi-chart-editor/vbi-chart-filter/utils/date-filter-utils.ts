import type { VBIWhereDatePredicate } from '@visactor/vbi'
import { translateVBIComponentText as t } from 'src/localization'
import { formatDateInput } from './date-picker-value-utils'

function tInt(key: string, args?: Record<string, string>): string {
  return t(key, undefined, args)
}

export function isDateFilter(filter: { operator?: string }): boolean {
  return filter.operator === 'date'
}

export function getDefaultDatePredicate(): VBIWhereDatePredicate {
  return { type: 'relative', mode: 'last', amount: 7, unit: 'day' }
}

const UNIT_KEYS: Record<string, string> = {
  year: 'filterDateUnitYear',
  quarter: 'filterDateUnitQuarter',
  month: 'filterDateUnitMonth',
  week: 'filterDateUnitWeek',
  day: 'filterDateUnitDay',
}

function unitLabel(unit: string): string {
  return t(UNIT_KEYS[unit] ?? unit)
}

function formatRangeText(p: Extract<VBIWhereDatePredicate, { type: 'range' }>): string {
  const start = formatDateInput(p.start)
  const end = formatDateInput(p.end)
  return tInt('filterDateDisplayRange', { start, end })
}

function formatRelativeText(p: Extract<VBIWhereDatePredicate, { type: 'relative' }>): string {
  const mode = t(p.mode === 'last' ? 'filterDateModeLast' : 'filterDateModeNext')
  const unit = unitLabel(p.unit)
  return tInt('filterDateDisplayRelative', { mode, amount: String(p.amount), unit })
}

function formatCurrentText(p: Extract<VBIWhereDatePredicate, { type: 'current' }>): string {
  const unit = unitLabel(p.unit)
  if (p.offset && p.offset !== 0) {
    return tInt('filterDateDisplayCurrentOffset', { unit, offset: String(p.offset) })
  }
  return tInt('filterDateDisplayCurrent', { unit })
}

function formatPeriodText(p: Extract<VBIWhereDatePredicate, { type: 'period' }>): string {
  switch (p.unit) {
    case 'year':
      return tInt('filterDateDisplayPeriodYear', { year: String(p.year) })
    case 'quarter':
      return tInt('filterDateDisplayPeriodQuarter', { year: String(p.year), quarter: String(p.quarter) })
    case 'month':
      return tInt('filterDateDisplayPeriodMonth', { year: String(p.year), month: String(p.month) })
    case 'week':
      return tInt('filterDateDisplayPeriodWeek', { year: String(p.year), week: String(p.week) })
    case 'day': {
      const date = formatDateInput(p.date)
      return tInt('filterDateDisplayPeriodDay', { date })
    }
    default:
      return ''
  }
}

export function getDateFilterDisplayText(predicate: VBIWhereDatePredicate): string {
  switch (predicate.type) {
    case 'range':
      return formatRangeText(predicate)
    case 'relative':
      return formatRelativeText(predicate)
    case 'current':
      return formatCurrentText(predicate)
    case 'period':
      return formatPeriodText(predicate)
    default:
      return ''
  }
}

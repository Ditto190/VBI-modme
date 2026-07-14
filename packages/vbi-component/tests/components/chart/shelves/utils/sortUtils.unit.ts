import { describe, expect, it } from '@stencil/vitest'
import {
  formatSortDisplaySuffix,
  formatSortMenuSummary,
  getSortMenuSelectedKeys,
} from 'src/components/chart/shelves/utils/sortUtils'

describe('getSortMenuSelectedKeys', () => {
  it('should return empty array when sort is undefined', () => {
    expect(getSortMenuSelectedKeys(undefined)).toEqual([])
  })

  it('should return ["sort:<order>"] when sort is provided', () => {
    expect(getSortMenuSelectedKeys({ order: 'asc' })).toEqual(['sort:asc'])
    expect(getSortMenuSelectedKeys({ order: 'desc' })).toEqual(['sort:desc'])
  })
})

describe('formatSortMenuSummary', () => {
  const mockTranslate = (key: string) => key

  it('should return undefined when sort is undefined', () => {
    expect(formatSortMenuSummary(undefined, mockTranslate)).toBeUndefined()
  })

  it('should return appropriate translation key for asc and desc', () => {
    expect(formatSortMenuSummary({ order: 'asc' }, mockTranslate)).toBe('shelvesSortAsc')
    expect(formatSortMenuSummary({ order: 'desc' }, mockTranslate)).toBe('shelvesSortDesc')
  })
})

describe('formatSortDisplaySuffix', () => {
  it('should return empty string when sort is undefined', () => {
    expect(formatSortDisplaySuffix(undefined)).toBe('')
  })

  it('should return up arrow for asc and down arrow for desc', () => {
    expect(formatSortDisplaySuffix({ order: 'asc' })).toBe(' ↑')
    expect(formatSortDisplaySuffix({ order: 'desc' })).toBe(' ↓')
  })
})

import { expect, test } from '@rstest/core'
import { normalizePageTitle, resolveActivePageId } from '../src/views/report-detail/page-state'

test('resolveActivePageId falls back to first page when selection disappears', () => {
  const pages = [
    {
      id: 'page-1',
      title: 'Page 1',
      chartId: 'chart-1',
      insightId: 'insight-1',
    },
    {
      id: 'page-2',
      title: 'Page 2',
      chartId: 'chart-2',
      insightId: 'insight-2',
    },
  ]

  expect(resolveActivePageId(pages, 'missing')).toBe('page-1')
  expect(resolveActivePageId(pages, 'page-2')).toBe('page-2')
})

test('normalizePageTitle keeps the current title when draft is blank', () => {
  expect(normalizePageTitle('  ', 'Page 1')).toBe('Page 1')
  expect(normalizePageTitle(' Revenue ', 'Page 1')).toBe('Revenue')
})

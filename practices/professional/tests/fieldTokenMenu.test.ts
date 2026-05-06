import { expect, test } from '@rstest/core'
import { getLabels } from '../src/config/labels'
import { buildFieldTokenMenuItems } from '../src/components/Editor/fieldTokenMenu'
import type { MappedField } from '../src/types'

const labels = getLabels('en-US')

const keysOf = (item: MappedField) =>
  (buildFieldTokenMenuItems(item, labels) ?? []).flatMap((menuItem) =>
    menuItem && 'key' in menuItem ? [menuItem.key] : [],
  )

test('measure field menu includes aggregate, sort, format, rename, and delete actions', () => {
  expect(
    keysOf({
      field: 'sales',
      id: 'sales-id',
      isDate: false,
      role: 'measure',
    }),
  ).toEqual(['aggregate', 'sort', 'format', 'rename', 'delete'])
})

test('measure format menu mirrors standard presets', () => {
  const items = buildFieldTokenMenuItems({ field: 'sales', id: 'sales-id', isDate: false, role: 'measure' }, labels)
  const format = items.find((item) => item && 'key' in item && item.key === 'format')
  const children = format && 'children' in format ? format.children : []

  expect(children?.map((item) => item && 'key' in item && item.key)).toEqual([
    'format:auto',
    'format:number-2',
    'format:percent-1',
    'format:cny-wan',
    'format:usd-k',
    'format:scientific-3',
    'format:clear',
  ])
})

test('date dimension field menu includes aggregate actions', () => {
  expect(
    keysOf({
      field: 'orderDate',
      id: 'date-id',
      isDate: true,
      role: 'dimension',
    }),
  ).toEqual(['aggregate', 'sort', 'rename', 'delete'])
})

test('plain dimension field menu skips aggregate and format actions', () => {
  expect(
    keysOf({
      field: 'region',
      id: 'region-id',
      isDate: false,
      role: 'dimension',
    }),
  ).toEqual(['sort', 'rename', 'delete'])
})

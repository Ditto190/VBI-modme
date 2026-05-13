import { expect, test } from '@rstest/core'
import { createEmptyChart, createVBI } from '@visactor/vbi'
import type { EditorField } from '../src/types'
import { addField } from '../src/utils/fields'
import { reorderField } from '../src/utils/fieldOrder'

const measure = (name: string): EditorField => ({ isDate: false, name, role: 'measure', type: 'number' })
const dimension = (name: string): EditorField => ({ isDate: false, name, role: 'dimension', type: 'string' })
const createBuilder = () => createVBI().chart.create(createEmptyChart('minimalist-test'))

test('fields can be inserted at a shelf index', () => {
  const builder = createBuilder()
  addField(builder, builder.build(), measure('sales'), 0)
  addField(builder, builder.build(), measure('amount'), 0)

  expect(builder.build().measures.map((item) => ('field' in item ? item.field : ''))).toEqual(['amount', 'sales'])
})

test('fields can be added to a different shelf role', () => {
  const builder = createBuilder()
  addField(builder, builder.build(), dimension('region'), 'measure', 0)

  expect(builder.build().measures.map((item) => ('field' in item ? item.field : ''))).toEqual(['region'])
  expect(builder.build().dimensions).toHaveLength(0)
})

test('shelf tokens can be reordered by insert index', () => {
  const builder = createBuilder()
  addField(builder, builder.build(), measure('sales'))
  addField(builder, builder.build(), measure('amount'))
  const sales = builder.build().measures.find((item) => 'field' in item && item.field === 'sales')
  if (!sales || !('id' in sales)) throw new Error('sales missing')

  reorderField(builder, 'measure', sales.id, 2)

  expect(builder.build().measures.map((item) => ('field' in item ? item.field : ''))).toEqual(['amount', 'sales'])
})

test('hierarchy sankey fields use recommended encodings', () => {
  const builder = createBuilder()
  builder.chartType.changeChartType('hierarchySankey')

  addField(builder, builder.build(), dimension('region'))
  addField(builder, builder.build(), measure('sales'))

  expect(builder.chartType.getAvailableChartTypes()).toContain('hierarchySankey')
  expect(builder.build().dimensions[0]).toMatchObject({ encoding: 'hierarchy', field: 'region' })
  expect(builder.build().measures[0]).toMatchObject({ encoding: 'size', field: 'sales' })
})

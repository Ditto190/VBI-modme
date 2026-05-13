import { expect, test } from '@rstest/core'
import { createEmptyChart, createVBI } from '@visactor/vbi'
import { normalizeLimit, readLimit } from '../src/utils/chartControlUtils'
import { getEncodingTitle } from '../src/components/Config/encodingLabels'
import { getLabels } from '../src/config/labels'
import { addStreamFilter } from '../src/utils/filterActions'
import { addOrMoveField, reorderMappedField } from '../src/utils/mappingActions'
import { getEncodingSlots, getFacetSlots, getVisibleSlots } from '../src/components/Config/slotConfig'
import type { FieldSlot, SchemaField } from '../src/types'

const createBuilder = () => createVBI().chart.create(createEmptyChart('demo'))

test('all supported chart encodings have streamlined mapping slots', () => {
  const builder = createBuilder()
  const labels = getLabels('zh-CN')

  for (const chartType of builder.chartType.getAvailableChartTypes()) {
    builder.chartType.changeChartType(chartType)
    const slots = getVisibleSlots(builder, labels)
    const dimensionSlots = new Set(
      slots.flatMap((slot) =>
        slot.accepts.includes('dimension') && slot.dimensionEncoding ? [slot.dimensionEncoding] : [],
      ),
    )
    const measureSlots = new Set(
      slots.flatMap((slot) => (slot.accepts.includes('measure') && slot.measureEncoding ? [slot.measureEncoding] : [])),
    )

    expect(
      builder.chartType.getSupportedDimensionEncodings().filter((encoding) => !dimensionSlots.has(encoding)),
    ).toEqual([])
    expect(builder.chartType.getSupportedMeasureEncodings().filter((encoding) => !measureSlots.has(encoding))).toEqual(
      [],
    )
  }
})

test('bar chart exposes categorical Y axis and metric X axis', () => {
  const builder = createBuilder()
  builder.chartType.changeChartType('bar')
  const slots = getVisibleSlots(builder, getLabels('zh-CN'))
  const yAxis = slots.find((slot) => slot.dimensionEncoding === 'yAxis')
  const xAxis = slots.find((slot) => slot.measureEncoding === 'xAxis')

  expect(yAxis?.accepts).toContain('dimension')
  expect(xAxis?.accepts).toContain('measure')
})

test('hierarchy sankey exposes hierarchy and size slots', () => {
  const builder = createBuilder()
  builder.chartType.changeChartType('hierarchySankey')
  const slots = getVisibleSlots(builder, getLabels('zh-CN'))

  expect(builder.chartType.getAvailableChartTypes()).toContain('hierarchySankey')
  expect(slots.find((slot) => slot.dimensionEncoding === 'hierarchy')?.accepts).toContain('dimension')
  expect(slots.find((slot) => slot.measureEncoding === 'size')?.accepts).toContain('measure')
})

test('table chart keeps column mapping in encodings', () => {
  const builder = createBuilder()
  const slots = getEncodingSlots(builder, getLabels('zh-CN'))

  expect(slots.some((slot) => slot.dimensionEncoding === 'column' || slot.measureEncoding === 'column')).toBe(true)
  expect(getFacetSlots(builder, getLabels('zh-CN'))).toEqual([])
})

test('facet is a config section and not the detail field slot', () => {
  const builder = createBuilder()
  const labels = getLabels('zh-CN')
  const facetSlots = getFacetSlots(builder, labels)
  const encodingSlots = getEncodingSlots(builder, labels)

  expect(getEncodingTitle(labels, { dimensionEncoding: 'detail' })).toBe('明细')
  expect(facetSlots.every((slot) => slot.dimensionEncoding === 'row' || slot.dimensionEncoding === 'column')).toBe(true)
  expect(encodingSlots.some((slot) => slot.title === labels.facet)).toBe(false)
})

test('limit control normalizes empty and decimal values', () => {
  expect(readLimit(undefined)).toBe(1000)
  expect(normalizeLimit(12.4)).toBe(12)
  expect(normalizeLimit(0)).toBe(1)
})

test('stream filters write where and having clauses', () => {
  const builder = createBuilder()
  const field: SchemaField = { isDate: false, name: 'sales', role: 'measure', type: 'number' }

  addStreamFilter({ builder, field, kind: 'where', operator: '>', value: 10 })
  addStreamFilter({ aggregate: 'sum', builder, field, kind: 'having', operator: '>=', value: 20 })

  expect(builder.build().whereFilter.conditions[0]).toMatchObject({ field: 'sales', op: '>', value: 10 })
  expect(builder.build().havingFilter.conditions[0]).toMatchObject({
    aggregate: { func: 'sum' },
    field: 'sales',
    op: '>=',
    value: 20,
  })
})

test('mapping fields can be inserted and reordered inside a channel', () => {
  const builder = createBuilder()
  const slot: FieldSlot = { accepts: ['measure'], measureEncoding: 'column', title: '列' }
  const fields: SchemaField[] = [
    { isDate: false, name: 'sales', role: 'measure', type: 'number' },
    { isDate: false, name: 'amount', role: 'measure', type: 'number' },
  ]

  addOrMoveField(builder, fields[0], slot, 0)
  addOrMoveField(builder, fields[1], slot, 0)
  expect(builder.build().measures.map((measure) => 'field' in measure && measure.field)).toEqual(['amount', 'sales'])

  const sales = builder.build().measures.find((measure) => 'field' in measure && measure.field === 'sales')
  if (!sales || !('id' in sales)) throw new Error('sales measure missing')
  reorderMappedField(builder, { id: sales.id, insertIndex: 0, role: 'measure', slot })
  expect(builder.build().measures.map((measure) => 'field' in measure && measure.field)).toEqual(['sales', 'amount'])
})

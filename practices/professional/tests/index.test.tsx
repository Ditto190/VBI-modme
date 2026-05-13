import { afterEach, expect, test } from '@rstest/core'
import { cleanup, render, screen } from '@testing-library/react'
import { createEmptyChart, createVBI } from '@visactor/vbi'
import { APP } from 'src/App'
import { createVBIStore } from 'src/model'
import { getFieldSlots } from 'src/config/slotConfig'
import { addRecommendedField } from 'src/utils/fieldActions'
import { createDefaultBuilder, setLocalDataWithSchema } from 'src/utils/localConnector'
import type { SchemaField } from 'src/types'

const schema = [
  { name: 'region', type: 'string' },
  { name: 'sales', type: 'number' },
]

const data = [{ region: 'East', sales: 10 }]
const createBuilder = () => createVBI().chart.create(createEmptyChart('professionalLocalData'))

afterEach(() => {
  cleanup()
  setLocalDataWithSchema([], null)
})

test('APP accepts standard practice props and renders the empty config container', async () => {
  setLocalDataWithSchema(data, schema)
  render(<APP builder={createDefaultBuilder()} hideLocale hideTheme locale='en-US' theme='light' />)

  expect(await screen.findByText('Fields')).toBeInTheDocument()
  expect(await screen.findByText('Config')).toBeInTheDocument()
  expect(screen.queryByText('Configured fields')).not.toBeInTheDocument()
  expect(screen.queryByText('EN')).not.toBeInTheDocument()
})

test('APP follows external locale and theme updates from website props', async () => {
  setLocalDataWithSchema(data, schema)
  const { container, rerender } = render(<APP builder={createDefaultBuilder()} locale='en-US' theme='light' />)

  expect(await screen.findByText('Fields')).toBeInTheDocument()
  expect(container.querySelector('.pro-app--light')).toBeTruthy()

  rerender(<APP builder={createDefaultBuilder()} locale='zh-CN' theme='dark' />)

  expect(await screen.findByText('数据字段')).toBeInTheDocument()
  expect(container.querySelector('.pro-app--dark')).toBeTruthy()
})

test('professional store initializes with an injected builder', () => {
  const builder = createBuilder()
  const store = createVBIStore(builder)
  const dispose = store.getState().initialize(builder)

  expect(store.getState().builder).toBe(builder)
  expect(store.getState().initialized).toBe(true)
  dispose()
})

test('recommended field add writes through VBI builder encodings', () => {
  const builder = createBuilder()
  const field: SchemaField = { isDate: false, name: 'sales', role: 'measure', type: 'number' }

  addRecommendedField(builder, builder.dsl.toJSON(), field)

  expect(builder.build().measures.map((measure) => 'field' in measure && measure.field)).toEqual(['sales'])
})

test('all supported encodings have professional config slots', () => {
  const builder = createBuilder()

  for (const chartType of builder.chartType.getAvailableChartTypes()) {
    builder.chartType.changeChartType(chartType)
    const slots = getFieldSlots(builder)
    const dimensionSlots = new Set(slots.flatMap((slot) => slot.dimensionEncoding ?? []))
    const measureSlots = new Set(slots.flatMap((slot) => slot.measureEncoding ?? []))

    expect(
      builder.chartType.getSupportedDimensionEncodings().filter((encoding) => !dimensionSlots.has(encoding)),
    ).toEqual([])
    expect(builder.chartType.getSupportedMeasureEncodings().filter((encoding) => !measureSlots.has(encoding))).toEqual(
      [],
    )
  }
})

test('hierarchy sankey exposes hierarchy and size config slots', () => {
  const builder = createBuilder()
  builder.chartType.changeChartType('hierarchySankey')
  const slots = getFieldSlots(builder)

  expect(builder.chartType.getAvailableChartTypes()).toContain('hierarchySankey')
  expect(slots.find((slot) => slot.dimensionEncoding === 'hierarchy')?.accepts).toContain('dimension')
  expect(slots.find((slot) => slot.measureEncoding === 'size')?.accepts).toContain('measure')
})

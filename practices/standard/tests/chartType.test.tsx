import { expect, test } from '@rstest/core'
import { createEmptyChart, createVBI } from '@visactor/vbi'
import { getChartTypeMeta } from 'src/components/Toolbar/config'

const createBuilder = () => createVBI().chart.create(createEmptyChart('standard-test'))
const t = (key: string) => key

test('standard chart gallery has hierarchy sankey metadata', () => {
  const builder = createBuilder()
  const meta = getChartTypeMeta('hierarchySankey', t)

  expect(builder.chartType.getAvailableChartTypes()).toContain('hierarchySankey')
  expect(meta).toMatchObject({
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsHierarchySankeyLabel',
    type: 'hierarchySankey',
  })
})

test('standard chart gallery has sankey metadata', () => {
  const builder = createBuilder()
  const meta = getChartTypeMeta('sankey', t)

  expect(builder.chartType.getAvailableChartTypes()).toContain('sankey')
  expect(meta).toMatchObject({
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSankeyLabel',
    type: 'sankey',
  })
})

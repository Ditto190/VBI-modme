import { VBI } from '@visactor/vbi'
import { getConnector, registerConnector } from 'src/chart-builder/connector'
import { getBuilderSchema, isEmptyVBIChartDSL } from 'src/chart-builder/modules'

describe('chart modules', () => {
  test('getBuilderSchema and builder.getSchema use registered connector schema', async () => {
    const connectorId = 'schema-connector'
    const schema = [{ name: 'sales', type: 'number' }]
    registerConnector(connectorId, {
      discoverSchema: async () => schema,
      query: async () => ({ dataset: [] }),
    })

    const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
    expect(await builder.getSchema()).toEqual(schema)
    expect(await getBuilderSchema(builder.dsl)).toEqual(schema)
    expect(await getConnector(connectorId)).toMatchObject({ discoverSchema: expect.any(Function) })
  })

  test('isEmptyVBIChartDSL handles Y.Array, array values and non-collections', () => {
    const builder = VBI.chart.create({} as any)
    const dsl = builder.dsl
    expect(isEmptyVBIChartDSL(dsl)).toBe(true)

    dsl.set('dimensions', ['area'])
    expect(isEmptyVBIChartDSL(dsl)).toBe(false)

    dsl.set('dimensions', 'invalid')
    builder.measures.add('sales', () => {})
    expect(isEmptyVBIChartDSL(dsl)).toBe(false)
  })
})

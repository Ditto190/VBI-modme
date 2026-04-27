import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, registerDemoConnector } from '../src'
import { describe, expect, test } from '@rstest/core'
import type { VQueryDSL } from '@visactor/vquery'

describe('demo connector', () => {
  test('registers the shared provider demo connector', async () => {
    VBI.connectorMap.delete(DEMO_CONNECTOR_ID)

    expect(registerDemoConnector()).toBe(DEMO_CONNECTOR_ID)

    const connector = await VBI.getConnector(DEMO_CONNECTOR_ID)
    await expect(connector.discoverSchema()).resolves.toEqual(
      expect.arrayContaining([
        { name: 'order_date', type: 'date' },
        { name: 'area', type: 'string' },
        { name: 'sales', type: 'number' },
        { name: 'profit', type: 'number' },
      ]),
    )
  })

  test('queries the bundled supermarket csv', async () => {
    VBI.connectorMap.delete(DEMO_CONNECTOR_ID)
    registerDemoConnector()

    const connector = await VBI.getConnector(DEMO_CONNECTOR_ID)
    const schema = await connector.discoverSchema()
    const queryDSL: VQueryDSL = {
      select: [
        'city',
        {
          field: 'sales',
          aggr: { func: 'sum' },
          alias: 'sales',
        },
      ],
      groupBy: ['city'],
      orderBy: [{ field: 'sales', order: 'desc' }],
      limit: 1,
    }

    await expect(connector.query({ connectorId: DEMO_CONNECTOR_ID, queryDSL, schema })).resolves.toEqual({
      dataset: [{ city: '上海', sales: 582450.5679999999 }],
    })
  })
})

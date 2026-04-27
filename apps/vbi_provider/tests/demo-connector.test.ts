import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, registerDemoConnector } from '../src'
import { describe, expect, test } from '@rstest/core'

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
})

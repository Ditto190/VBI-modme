import { LocalConnector } from 'src/utils/data/localConnector'

export const createTestBuilder = (connectorId = 'demo-connector') => {
  const connector = new LocalConnector(connectorId)
  connector.setDataWithSchema(
    [
      { category: 'A', region: 'North', sales: 100, profit: 20 },
      { category: 'B', region: 'South', sales: 200, profit: 50 },
    ],
    [
      { name: 'category', type: 'string' },
      { name: 'region', type: 'string' },
      { name: 'sales', type: 'number' },
      { name: 'profit', type: 'number' },
    ],
  )
  connector.register()
  return connector.createBuilder()
}

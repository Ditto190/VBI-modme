import { VBI, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

export const DEMO_CONNECTOR_ID = 'demo'

const DEMO_DATASET_URL = 'https://visactor.github.io/VBI/dataset/supermarket.csv'

const demoSchema: DatasetColumn[] = [
  { name: 'id', type: 'string' },
  { name: 'order_id', type: 'string' },
  { name: 'order_date', type: 'date' },
  { name: 'delivery_date', type: 'date' },
  { name: 'delivery_method', type: 'string' },
  { name: 'customer_id', type: 'string' },
  { name: 'customer_name', type: 'string' },
  { name: 'customer_type', type: 'string' },
  { name: 'city', type: 'string' },
  { name: 'province', type: 'string' },
  { name: 'country_or_region', type: 'string' },
  { name: 'area', type: 'string' },
  { name: 'product_id', type: 'string' },
  { name: 'product_type', type: 'string' },
  { name: 'product_sub_type', type: 'string' },
  { name: 'product_name', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'amount', type: 'number' },
  { name: 'discount', type: 'number' },
  { name: 'profit', type: 'number' },
]

const vquery = new VQuery()

const ensureDemoDataset = async (schema: DatasetColumn[]) => {
  if (await vquery.hasDataset(DEMO_CONNECTOR_ID)) return
  const source: RawDatasetSource = { type: 'csv', rawDataset: DEMO_DATASET_URL }
  await vquery.createDataset(DEMO_CONNECTOR_ID, schema, source)
}

export const demoConnector: VBIConnector = {
  discoverSchema: async () => demoSchema,
  query: async ({ queryDSL, schema }) => {
    await ensureDemoDataset(schema as DatasetColumn[])
    const dataset = await vquery.connectDataset(DEMO_CONNECTOR_ID)
    const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
    return { dataset: result.dataset }
  },
}

export const registerDemoConnector = () => {
  VBI.registerConnector(DEMO_CONNECTOR_ID, demoConnector)
  return DEMO_CONNECTOR_ID
}

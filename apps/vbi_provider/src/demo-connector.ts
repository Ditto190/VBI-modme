import { VBI, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'
import supermarketCsv from './dataset/supermarket-csv'
import { DEMO_CONNECTOR_ID, demoSchema } from './demo-connector-common'

type VQueryInstance = InstanceType<typeof VQuery>

let vquery: VQueryInstance | undefined

const getVQuery = async () => {
  if (vquery) return vquery
  vquery = new VQuery()
  return vquery
}

const ensureDemoDataset = async (schema: DatasetColumn[]) => {
  const vquery = await getVQuery()
  if (await vquery.hasDataset(DEMO_CONNECTOR_ID)) return
  const source: RawDatasetSource = { type: 'csv', rawDataset: supermarketCsv }
  await vquery.createDataset(DEMO_CONNECTOR_ID, schema, source)
}

export const demoConnector: VBIConnector = {
  discoverSchema: async () => demoSchema,
  query: async ({ queryDSL, schema }) => {
    await ensureDemoDataset(schema as DatasetColumn[])
    const vquery = await getVQuery()
    const dataset = await vquery.connectDataset(DEMO_CONNECTOR_ID)
    const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
    return { dataset: result.dataset }
  },
}

export { DEMO_CONNECTOR_ID }

export const registerDemoConnector = () => {
  VBI.connectors.register(DEMO_CONNECTOR_ID, demoConnector)
  return DEMO_CONNECTOR_ID
}

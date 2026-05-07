# 17. Demo Connector — Connector Registration and Builder Factory

## Source

- CSV URL pattern (recommended and most concise): `practices/streamlined/src/utils/demoConnector.ts`
- LocalConnector pattern (supports local data + type normalization): `practices/professional/src/utils/localConnector.ts`

## Connector Registration

Each practice must implement its own Connector independently. A Connector provides:

- `discoverSchema`: returns a field list (name + type).
- `query`: receives VQueryDSL, executes the query, and returns a dataset.

### Pattern 1: CSV URL (Most Concise, Recommended)

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

export const connectorId = 'demo'

export const registerDemoConnector = () => {
  const vquery = new VQuery()

  VBI.registerConnector(connectorId, async () => {
    return {
      discoverSchema: async () => {
        return [
          { name: 'order_date', type: 'date' },
          { name: 'province', type: 'string' },
          { name: 'sales', type: 'number' },
          // ...other fields
        ]
      },
      query: async ({ queryDSL, schema }) => {
        if (!(await vquery.hasDataset(connectorId))) {
          const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv'
          const datasetSource = { type: 'csv', rawDataset: url }
          await vquery.createDataset(connectorId, schema as DatasetColumn[], datasetSource as RawDatasetSource)
        }
        const dataset = await vquery.connectDataset(connectorId)
        const queryResult = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
        return { dataset: queryResult.dataset }
      },
    }
  })

  return connectorId
}

registerDemoConnector() // Register automatically when the module loads
```

## Builder Factory

```ts
import { VBI } from '@visactor/vbi'

// Create a builder instance (use connectorId to associate the Connector)
export const createDefaultBuilder = () => {
  return VBI.chart.create(VBI.chart.createEmpty(connectorId))
}

// Pre-created default builder (singleton, created when the module loads)
export const defaultBuilder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
```

## VBI.createChart — Create Builder

```ts
const builder = VBI.chart.create(dsl: VBIChartDSL): VBIChartBuilder
```

The parameter is a VBIChartDSL snapshot. `VBI.chart.createEmpty(connectorId)` generates an empty-configuration DSL:

```ts
const dsl = VBI.chart.createEmpty(connectorId)
// dsl: { chartType: 'table', dimensions: [], measures: [], whereFilter: ..., connectorId: 'demo' }
```

## Connector in the Data Flow

```
User configuration (dimensions/measures/filters)
  ↓ builder.buildVQuery()
  ↓ VQueryDSL (query description)
  ↓ Connector.query({ queryDSL, schema })
  ↓ Execute SQL / API query
  ↓ Return dataset
  ↓ builder.buildVSeed() (merge DSL + dataset)
  ↓ VSeed (rendering description)
  ↓ VSeedRender (render as chart)
```

## Custom Connector

To connect a real data source, replace the `discoverSchema` and `query` implementations with real APIs:

```ts
VBI.registerConnector('my-api', async () => {
  return {
    discoverSchema: async () => {
      const res = await fetch('/api/schema')
      return res.json()
    },
    query: async ({ queryDSL, schema }) => {
      const res = await fetch('/api/query', {
        method: 'POST',
        body: JSON.stringify(queryDSL),
      })
      return res.json()
    },
  }
})
```

## Notes

- **Each practice implements** its own connector/bootstrap module independently, such as `demoConnector.ts` or `localConnector.ts`; do not import across practices.
- `registerXxxConnector()` is called automatically when the module loads to register the Connector.
- `VBI.registerConnector` is safe to call at module scope because it has internal idempotency protection.
- `connectorId` must match the `connectorId` in the DSL.
- `createDefaultBuilder()` can be passed into `VBIStoreProvider` and supports multiple builder instances.
- **RawDatasetSource.rawDataset type constraint**: when using `type: 'json'`, `rawDataset` must be `TidyDatum[]`, namely `Record<string, number | string | null | boolean | undefined>[]`. Nested objects are not supported and must be converted with `toTidyDatum()`. See section 5 of [19-ui-considerations.md](./19-ui-considerations.md).

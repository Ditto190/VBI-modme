# 7. Connector System (Further Reading)

> This section is supplemental. Connector is the lower-level mechanism VBI uses to fetch data. AI usually does not need to operate on it directly; understanding the concept is enough.

## 7.1 Register a Connector

> `VBI.connectors.register()` is available from the `@visactor/vbi` main entry. In real projects, still prefer the target practice's connector/bootstrap module, such as standard's `practices/standard/src/utils/localConnector.ts`.

```ts
// ✅ Can be used directly from the main entry.
import { VBI } from '@visactor/vbi';

VBI.connectors.register('my-connector-id', async () => {
  return {
    discoverSchema: async () => [...],
    query: async ({ queryDSL, schema, connectorId, signal }) => {
      return { dataset: [...] };
    },
  };
});
```

## 7.2 VBIConnector Interface

```ts
interface VBIConnector {
  // Return the data source field list: name + type.
  discoverSchema(): Promise<Array<{ name: string; type: string }>>

  // Execute the query and return the dataset.
  query(props: {
    queryDSL: VQueryDSL // Generated SQL DSL.
    schema: SchemaField[] // Structure returned by discoverSchema.
    connectorId: string
    signal?: AbortSignal // Optional abort signal.
  }): Promise<{
    dataset: Array<Record<string, number | string | boolean | null>>
  }>
}
```

## 7.3 Standard Connector Example

Reference: `practices/standard/src/utils/localConnector.ts`.

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

export const registerDemoConnector = () => {
  const vquery = new VQuery()

  VBI.connectors.register('demo', async () => {
    return {
      discoverSchema: async () => [
        { name: 'order_date', type: 'date' },
        { name: 'category', type: 'string' },
        { name: 'region', type: 'string' },
        { name: 'sales', type: 'number' },
        { name: 'profit', type: 'number' },
      ],
      query: async ({ queryDSL, schema }) => {
        if (!(await vquery.hasDataset('demo'))) {
          await vquery.createDataset(
            'demo',
            schema as DatasetColumn[],
            { type: 'csv', rawDataset: 'https://visactor.github.io/VBI/dataset/supermarket.csv' } as RawDatasetSource,
          )
        }
        const dataset = await vquery.connectDataset('demo')
        const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
        return { dataset: result.dataset }
      },
    }
  })

  return 'demo'
}
```

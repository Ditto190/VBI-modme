# 2. Quick Start

> Each practice has its own connector/bootstrap module. File names may differ, such as `demoConnector.ts` or `localConnector.ts`. This section uses standard as the example. Other practices follow the same pattern, with different UI styles.

## 2.1 Note: Core VBI APIs Are Exported from the Main Entry

`@visactor/vbi` now exports core APIs from the main entry, including `VBI`, `createVBI`, `VBIChartBuilder`, `VBI.connectors.register()`, `VBI.chart.create()`, and `VBI.chart.createEmpty()`.

**Recommended usage**: Even though the main entry can be used directly, prefer the target practice's own connector/bootstrap module. Connector registration, the default builder, and local data wiring are usually wrapped there.

---

## 2.2 Step 1: Register a Data Source Connector

Reference: `practices/standard/src/utils/localConnector.ts`.

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

const connectorId = 'demo'

// Register the Connector once during module initialization.
VBI.connectors.register(connectorId, async () => {
  const vquery = new VQuery()

  return {
    // Return table schema: field name + type.
    discoverSchema: async () => [
      { name: 'order_date', type: 'date' },
      { name: 'category', type: 'string' },
      { name: 'region', type: 'string' },
      { name: 'sales', type: 'number' },
      { name: 'profit', type: 'number' },
    ],

    // Execute the query.
    query: async ({ queryDSL, schema }) => {
      if (!(await vquery.hasDataset(connectorId))) {
        await vquery.createDataset(
          connectorId,
          schema as DatasetColumn[],
          { type: 'csv', rawDataset: 'https://visactor.github.io/VBI/dataset/supermarket.csv' } as RawDatasetSource,
        )
      }
      const dataset = await vquery.connectDataset(connectorId)
      const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
      return { dataset: result.dataset }
    },
  }
})
```

---

## 2.3 Step 2: Create a Builder

```ts
import { VBI } from '@visactor/vbi'

const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
```

**More recommended**: Use the builder wrapper provided by standard:

```ts
import { createDefaultBuilder } from 'practices/standard/src/utils/localConnector'
const builder = createDefaultBuilder()
```

---

## 2.4 Step 3: Configure the Chart with Builder APIs

```ts
// Add a dimension for the X axis.
builder.dimensions.add('category', (node) => {
  node.setAlias('Product Category')
})

// Add a measure for the Y axis. The default aggregate is sum.
builder.measures.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setAlias('Sales')
})

// Switch the chart type to a column chart.
builder.chartType.changeChartType('column')
```

---

## 2.5 Step 4: React App Structure

Reference: `practices/standard/src/App/App.tsx`.

```tsx
// Entry file.
import { VBIChartBuilder } from '@visactor/vbi'
import { VBIStoreProvider, useVBIStore } from 'src/model'
import { APP } from 'src/App/App'
import { createDefaultBuilder } from 'src/utils/localConnector'

const builder = createDefaultBuilder()

// Render the app.
render(
  <VBIStoreProvider builder={builder}>
    <APP builder={builder} mode='edit' />
  </VBIStoreProvider>,
  dom,
)
```

Standard app panel layout:

```
┌─────────────┬──────────────────────────────────────┐
│ FieldsPanel │  ShelfPanel (Dimensions/Measures/    │
│ (field list)│  Where/Having)                       │
│             ├──────────────────────────────────────┤
│             │  ChartPanel (VSeedRender area)       │
└─────────────┴──────────────────────────────────────┘
```

---

## 2.6 VBIStore State Management

Zustand store in `practices/standard/src/model/VBIStore.ts`:

```ts
import { createVBIStore } from 'src/model'

const store = createVBIStore(builder)

// Listen to Yjs updates -> trigger VSeed rebuild automatically.
store.getState().bindEvent()

// Get current state.
const { dsl, vseed, loading } = store.getState()
```

Internal VBIStore logic, for reference:

```ts
// 1. The Yjs doc emits an update event.
builder.doc.on('update', updateAll)

// 2. updateAll calls buildVSeed.
const newVSeed = await builder.buildVSeed()

// 3. Update store state and trigger React re-rendering.
set({ dsl, vseed: newVSeed, loading: false })
```

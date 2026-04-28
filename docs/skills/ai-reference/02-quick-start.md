# 2. 快速上手

> 每个 practice 都有自己独立的 connector/bootstrap 模块（文件名可能不同，如 `demoConnector.ts` 或 `localConnector.ts`）。本节以 standard 为例说明模式，其他 practice 结构相同，只是 UI 风格不同。

## 2.1 说明：VBI 核心 API 已在主入口导出

`@visactor/vbi` 现在已经从主入口导出 `VBI`、`createVBI`、`VBIChartBuilder`、`VBI.registerConnector()`、`VBI.chart.create()`、`VBI.chart.createEmpty()` 等核心 API。

**实际使用方式**：即便主入口可直接使用，仍建议优先参考目标 practice 自己的 connector/bootstrap 模块，因为 connector 注册、默认 builder 和本地数据接线通常都封装在那里。

---

## 2.2 步骤 1：注册数据源 Connector

参考 `practices/standard/src/utils/localConnector.ts`：

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

const connectorId = 'demo'

// 注册 Connector（在模块初始化时执行一次）
VBI.registerConnector(connectorId, async () => {
  const vquery = new VQuery()

  return {
    // 返回表结构：字段名 + 类型
    discoverSchema: async () => [
      { name: 'order_date', type: 'date' },
      { name: 'category', type: 'string' },
      { name: 'region', type: 'string' },
      { name: 'sales', type: 'number' },
      { name: 'profit', type: 'number' },
    ],

    // 执行查询
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

## 2.3 步骤 2：创建 Builder

```ts
import { VBI } from '@visactor/vbi'

const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
```

**更推荐的方式**：直接使用 standard 封装好的 builder：

```ts
import { createDefaultBuilder } from 'practices/standard/src/utils/localConnector'
const builder = createDefaultBuilder()
```

---

## 2.4 步骤 3：配置图表（Builder API）

```ts
// 添加维度（X 轴）
builder.dimensions.add('category', (node) => {
  node.setAlias('产品类别')
})

// 添加度量（Y 轴，默认 sum 聚合）
builder.measures.add('sales', (node) => {
  node.setAggregate({ func: 'sum' })
  node.setAlias('销售额')
})

// 切换图表类型为柱状图
builder.chartType.changeChartType('column')
```

---

## 2.5 步骤 4：React 应用结构

参考 `practices/standard/src/App/App.tsx`：

```tsx
// 入口文件
import { VBIChartBuilder } from '@visactor/vbi'
import { VBIStoreProvider, useVBIStore } from 'src/model'
import { APP } from 'src/App/App'
import { createDefaultBuilder } from 'src/utils/localConnector'

const builder = createDefaultBuilder()

// 渲染应用
render(
  <VBIStoreProvider builder={builder}>
    <APP builder={builder} mode='edit' />
  </VBIStoreProvider>,
  dom,
)
```

标准应用面板布局：

```
┌─────────────┬──────────────────────────────────────┐
│ FieldsPanel │  ShelfPanel (维度/度量/Where/Having)  │
│ (字段列表)  ├──────────────────────────────────────┤
│             │  ChartPanel (VSeedRender 渲染区域)   │
└─────────────┴──────────────────────────────────────┘
```

---

## 2.6 VBIStore 状态管理

`practices/standard/src/model/VBIStore.ts` 中的 Zustand store：

```ts
import { createVBIStore } from 'src/model'

const store = createVBIStore(builder)

// 监听 Yjs 更新 → 触发 VSeed 重建（自动）
store.getState().bindEvent()

// 获取当前状态
const { dsl, vseed, loading } = store.getState()
```

VBIStore 内部逻辑（参考）：

```ts
// 1. Yjs doc 触发 update 事件
builder.doc.on('update', updateAll)

// 2. updateAll 中调用 buildVSeed
const newVSeed = await builder.buildVSeed()

// 3. 更新 store 状态，触发 React 重渲染
set({ dsl, vseed: newVSeed, loading: false })
```

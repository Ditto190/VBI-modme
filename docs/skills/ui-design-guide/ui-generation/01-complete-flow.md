# 01. 完整 UI 生成流程

完整 VBI UI 不是一个单独组件，而是一条从数据到渲染的产品链路。

```text
数据源 / connector
  -> VBI.registerConnector()
  -> VBI.chart.create()
  -> VBIChartBuilder
  -> React store/hooks
  -> 字段、配置、筛选 UI
  -> builder.buildVSeed()
  -> VSeedRender
  -> VChart / VTable
```

## 必需模块

一份完整 UI 至少需要这些模块：

| 模块                    | 责任                                                           |
| ----------------------- | -------------------------------------------------------------- |
| connector/bootstrap     | 注册数据源，创建默认 builder，提供 schema 和 query。           |
| store/provider          | 保存 builder、dsl、schema、loading、vseed、initialized。       |
| hooks                   | 把 Builder API 包成 React 可用状态和动作。                     |
| field panel             | 展示 schema 字段，区分 dimension / measure。                   |
| config panel 或 shelves | 管理 dimensions、measures、filters、encoding slots。           |
| chart toolbar           | 管理 chart type、theme、locale、limit、undo/redo、fullscreen。 |
| chart workspace         | 承载 toolbar、状态提示、图表渲染区域。                         |
| VSeedRender             | 把 VSeed 转成 VChart/VTable 实例并管理生命周期。               |

## 标准搭建顺序

1. 注册 connector。
2. 创建 builder。
3. 初始化 store。
4. 读取 schema。
5. 监听 `builder.doc.on('update')`。
6. 每次 builder 更新后读取 `builder.build()`。
7. 如果 builder 不为空，调用 `builder.buildVSeed()`。
8. 把 VSeed 传给 `VSeedRender`。
9. 用字段面板、slot/shelf、filter panel 和 toolbar 修改 builder。

## 初始化示意

```ts
import { VBI } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

const CONNECTOR_ID = 'demo'
const vquery = new VQuery()

VBI.registerConnector(CONNECTOR_ID, async () => ({
  discoverSchema: async () => schema,
  query: async ({ queryDSL, schema }) => {
    if (!(await vquery.hasDataset(CONNECTOR_ID))) {
      await vquery.createDataset(
        CONNECTOR_ID,
        schema as DatasetColumn[],
        { type: 'csv', rawDataset: 'https://visactor.github.io/VBI/dataset/supermarket.csv' } as RawDatasetSource,
      )
    }
    const dataset = await vquery.connectDataset(CONNECTOR_ID)
    const result = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
    return { dataset: result.dataset }
  },
}))

const builder = VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
```

不要在 connector 里直接返回原始 dataset。`builder.buildVQuery()` 会把 select alias 写成
dimension / measure 节点的 `id`，VSeed 渲染时也按这些 `id` 取数。connector 必须执行
`queryDSL`，或者手动保证返回数据列名和这些节点 `id` 完全对齐。

完整 UI 中通常不要把这段散落在组件里，而是放在 `utils/localConnector.ts`、`utils/demoConnector.ts` 或初始化 hook 中。

## Builder 更新后的标准反应

```ts
const updateAll = async () => {
  const dsl = builder.build()

  if (builder.isEmpty()) {
    set({ dsl, loading: false, vseed: null })
    return
  }

  set({ dsl, loading: true })
  try {
    const vseed = await builder.buildVSeed()
    if (get().builder !== builder) return
    set({ dsl: builder.build(), vseed })
  } finally {
    if (get().builder === builder) set({ loading: false })
  }
}

builder.doc.on('update', updateAll)
void updateAll()
```

## 生成 UI 时不要遗漏的状态

- 初始化中：connector / schema 还没准备好。
- 无数据：数据源未加载或 query 返回空。
- 空配置：还没有 dimension / measure。
- 构建中：`buildVSeed()` 正在执行。
- 构建失败：connector、filter、字段类型或渲染可能报错。
- 已渲染：`VSeedRender` 正常创建图表实例。

## 推荐源码参考

- `practices/professional/src/components/Editor/ProfessionalEditor.tsx`
- `practices/professional/src/components/Editor/useProfessionalEditorModel.ts`
- `practices/professional/src/model/VBIStore.ts`
- `practices/standard/src/App/App.tsx`
- `practices/standard/src/model/VBIStore.ts`
- `practices/standard/src/utils/localConnector.ts`
- `practices/streamlined/src/components/Workbench/EditorWorkbench.tsx`

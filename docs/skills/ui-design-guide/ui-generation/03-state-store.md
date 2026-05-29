# 03. Store 和状态模型

完整 VBI UI 推荐使用 practice 自己的 Zustand store。store 是 Builder 和 React UI 之间的同步层。

## 标准状态字段

```ts
type VBIStoreState = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  schema: Array<{ name: string; type: string }>
  loading: boolean
  vseed: VSeed | null
  initialized: boolean
  initialize: (builder?: VBIChartBuilder) => () => void
}
```

## Store 职责

- 保存当前 builder。
- 保存 `builder.build()` 或 `builder.dsl.toJSON()` 的快照。
- 调用 `builder.getSchema()` 获取字段列表。
- 监听 `builder.doc.on('update')`。
- 根据 builder 是否为空决定是否调用 `builder.buildVSeed()`。
- 处理 loading 状态和构建失败。
- 在卸载时解绑 listener。

## 推荐初始化流程

```ts
initialize: (nextBuilder) => {
  const activeBuilder = nextBuilder ?? get().builder

  set({
    builder: activeBuilder,
    dsl: activeBuilder.build(),
    initialized: true,
    loading: false,
    schema: [],
    vseed: null,
  })

  void syncSchema(activeBuilder, set, get)
  const dispose = bindBuilderEvents(activeBuilder, set, get)

  return () => {
    dispose()
    set({ initialized: false, loading: false, schema: [], vseed: null })
  }
}
```

## Builder 事件绑定

```ts
const bindBuilderEvents = (builder, set, get) => {
  const updateAll = async () => {
    if (get().builder !== builder) return

    const dsl = builder.build()
    if (builder.isEmpty()) {
      set({ dsl, loading: false, vseed: null })
      return
    }

    set({ dsl, loading: true })
    try {
      set({ dsl: builder.build(), vseed: await builder.buildVSeed() })
    } finally {
      if (get().builder === builder) set({ loading: false })
    }
  }

  builder.doc.on('update', updateAll)
  void updateAll()
  return () => builder.doc.off('update', updateAll)
}
```

## Production Store Pattern

For product-style editors, use the stronger pattern from
`practices/professional/src/model/VBIStore.ts`:

- Keep `builder.build()` as the DSL snapshot; do not rely on stale local
  dimensions/measures arrays after chart type or aggregate changes.
- Serialize the DSL snapshot with `JSON.stringify(dsl)` before async
  `buildVSeed()` starts.
- Cache VSeed by builder and DSL snapshot to avoid duplicate builds.
- If a later update changes the snapshot before `buildVSeed()` resolves, ignore
  the old result.
- Store a render/build `error` string separately from `loading` and `vseed`.

Skeleton:

```ts
type VSeedCacheEntry = {
  dslSnapshot: string
  pending?: Promise<VSeed | null>
  vseed: VSeed | null
}

const vseedCache = new WeakMap<VBIChartBuilder, VSeedCacheEntry>()

const readDslState = (builder: VBIChartBuilder) => {
  const dsl = builder.build()
  return { dsl, snapshot: JSON.stringify(dsl) }
}

const updateAll = async () => {
  if (get().builder !== builder) return

  const { dsl, snapshot } = readDslState(builder)
  if (builder.isEmpty()) {
    vseedCache.set(builder, { dslSnapshot: snapshot, vseed: null })
    set({ dsl, error: null, loading: false, vseed: null })
    return
  }

  set({ dsl, error: null, loading: true })
  try {
    const vseed = await loadVSeed(builder, snapshot)
    const current = readDslState(builder)
    if (get().builder !== builder || current.snapshot !== snapshot) return
    set({ dsl: current.dsl, error: null, vseed })
  } catch (error) {
    if (get().builder === builder) {
      set({ error: error instanceof Error ? error.message : String(error), vseed: null })
    }
  } finally {
    if (get().builder === builder) set({ loading: false })
  }
}
```

## 变体选择

| 变体            | 适用场景                                       | 参考                                 |
| --------------- | ---------------------------------------------- | ------------------------------------ |
| 简单 store      | 快速 demo，直接 buildVSeed，无缓存。           | `streamlined/src/model/VBIStore.ts`  |
| 标准 store      | 完整应用，支持 initialized、schema、provider。 | `standard/src/model/VBIStore.ts`     |
| 产品 store      | 更强的模型派生和初始化边界。                   | `professional/src/model/VBIStore.ts` |
| vbi-react hooks | 不维护全局 store 的轻量集成。                  | `vbi-react-starter/src/App.tsx`      |

## 防错规则

- `updateAll` 内要确认 `get().builder === builder`，避免异步结果写回旧 builder。
- 空配置时不要调用 `buildVSeed()`，否则可能触发无意义 query。
- 切换数据源后应清空 dimensions、measures、filters，保留 theme/locale/limit。
- schema 更新与 builder 更新要分开处理，schema 来自 connector，不来自 DSL。
- loading/empty 状态不要改变外层布局尺寸。

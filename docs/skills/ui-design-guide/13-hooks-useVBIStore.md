# 13. useVBIStore — Store Hook

## Signature

```ts
const storeState = useVBIStore(selector)
```

Equivalent to:

```ts
const storeState = useVBIStore((state) => state) // Gets all state
const builder = useVBIStore((state) => state.builder) // Gets only builder
const vseed = useVBIStore((state) => state.vseed) // Gets only vseed
const loading = useVBIStore((state) => state.loading) // Gets only loading
```

## Source

`practices/standard/src/hooks/useVBIStore.ts`

Actual implementation (thin wrapper):

```ts
export const useVBIStoreHook = (): VBIStoreState => {
  return useVBIStore((state) => state)
}
```

`useVBIStore` comes from the `VBIStoreProvider` Context and **must be used inside `VBIStoreProvider`**.

---

## Complete VBIStoreState Type

```ts
export interface VBIStoreState {
  loading: boolean // Whether VSeed is currently building
  vseed: VSeed | null // Current VSeed instance (rendering data)
  builder: VBIChartBuilder // VBI builder (configuration layer)
  initialized: boolean // Whether initialization has completed
  dsl: VBIChartDSL // Current DSL snapshot

  initialize: (builder?: VBIChartBuilder) => DestroyCallback
  bindEvent: () => DestroyCallback
  logState: () => Promise<void>

  setDsl: (dsl: VBIChartDSL) => void
  setLoading: (loading: boolean) => void
  setVSeed: (vseed: VSeed | null) => void
}
```

## Usage Examples

### Get builder (Most Common)

```ts
const builder = useVBIStore((state) => state.builder)
// Then pass it to other hooks.
const { dimensions } = useVBIDimensions(builder)
const { measures } = useVBIMeasures(builder)
```

### Get VSeed (For Rendering)

```ts
const vseed = useVBIStore((state) => state.vseed)
if (vseed) {
  // Pass it to the VSeedRender component.
}
```

### Get Loading State

```ts
const loading = useVBIStore((state) => state.loading);
if (loading) {
  return <Spin>Chart loading...</Spin>;
}
```

### Print Debug Information

```ts
const { logState } = useVBIStore((state) => ({
  logState: state.logState,
}))
await logState()
// Prints builder, vbi dsl, vquery dsl, and vseed to the console.
```

---

## Notes

- **Must be called inside `VBIStoreProvider`**, otherwise it throws `Error: useVBIStore must be used within VBIStoreProvider`.
- `builder` is the most commonly consumed field; other hooks need it as a parameter.
- When `vseed` is `null` (initial state or loading), do not pass it to `VSeedRender`.
- `logState()` is async and prints complete debug information to the console.

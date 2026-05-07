# 15. VBIStore — Zustand Store

## Source

`practices/standard/src/model/VBIStore.ts`

## Create Store

```ts
export const createVBIStore = (builder?: VBIChartBuilder): VBIStoreApi => {
  return createStore<VBIStoreState>((set, get) => ({
    loading: false,
    vseed: null,
    initialized: false,
    builder: getInitialBuilder(builder),
    dsl: initialBuilder.dsl.toJSON() as VBIChartDSL,
    // ...actions
  }))
}
```

## Core Responsibilities

1. **Manage the builder instance**: holds the `VBIChartBuilder` reference as the entry point for all configuration.
2. **VSeed cache**: caches the builder -> VSeed mapping through a `WeakMap` to avoid duplicate builds.
3. **DSL synchronization**: listens for Yjs doc changes and automatically synchronizes the DSL snapshot into `dsl` state.
4. **Automatic VSeed builds**: calls `builder.buildVSeed()` automatically after DSL changes to generate rendering data.
5. **Loading state management**: `loading: boolean` indicates that VSeed is building.

## VSeedCache Mechanism

```ts
const vseedCache = new WeakMap<VBIChartBuilder, VSeedCacheEntry>()

type VSeedCacheEntry = {
  dslSnapshot: string // DSL JSON string
  vseed: VSeed | null // Cached VSeed
  pending?: Promise<VSeed | null> // In-flight build Promise (debounced)
}
```

Cache hit condition: `dslSnapshot === current DSL JSON`. On a hit, return the cached value directly without rebuilding.

## bindEvent — Core Event Loop

```ts
bindEvent: () => {
  const updateAll = async () => {
    const { dsl, snapshot } = getDslState(builder);

    // Empty configuration: no VSeed
    if (builder.isEmpty()) {
      vseedCache.set(builder, { dslSnapshot: snapshot, vseed: null });
      set({ dsl, loading: false, vseed: null });
      return;
    }

    // Cache hit: use directly
    if (cached?.dslSnapshot === snapshot && !cached.pending) {
      set({ dsl, loading: false, vseed: cached.vseed });
      return;
    }

    // Cache miss: build VSeed
    set({ dsl, loading: true });
    try {
      const newVSeed = await loadVSeed(builder, snapshot);
      set({ dsl: currentState.dsl, vseed: newVSeed });
    } finally {
      set({ loading: false });
    }
  };

  builder.doc.on('update', updateAll);
  void updateAll(); // Run once initially

  return () => builder.doc.off('update', updateAll);
},
```

Flow: `Yjs doc change` -> `updateAll` -> `check cache` -> `build VSeed` -> `update store state` -> `React re-render`.

## Notes

- The store uses `createStore` from `zustand/vanilla`, **not** `create`, so it can be paired with React Context.
- `initialize()` initializes the builder and binds events, then returns a cleanup function.
- `logState()` prints debug information to the console, including builder, vbi dsl, vquery dsl, and vseed.
- `createVBIStore` accepts an optional builder parameter, allowing external injection for multi-instance scenarios.

# 16. VBIStoreProvider — Context Provider

## Source

`practices/standard/src/model/VBIStoreProvider.tsx`

## Signature

```tsx
// Provider
;<VBIStoreProvider builder={builder}>{children}</VBIStoreProvider>

// Consumer hook
const storeState = useVBIStore((state) => state)
```

## Complete Implementation

```tsx
const VBIStoreContext = createContext<VBIStoreApi | null>(null)

export const VBIStoreProvider = ({ builder, children }: VBIStoreProviderProps) => {
  const storeRef = useRef<VBIStoreApi | null>(null)

  // Create the store only once (SSR-safe and hot-reload-safe)
  if (!storeRef.current) {
    storeRef.current = createVBIStore(builder)
  }

  return <VBIStoreContext.Provider value={storeRef.current}>{children}</VBIStoreContext.Provider>
}

export const useVBIStore = <T,>(selector: (state: VBIStoreState) => T) => {
  const store = useContext(VBIStoreContext)

  if (!store) {
    throw new Error('useVBIStore must be used within VBIStoreProvider')
  }

  return useStore(store, selector)
}
```

## Hierarchy

```
VBIStoreProvider
  ├── Create / hold VBIStoreApi (Zustand store instance)
  └── Context.Provider
        └── App
              ├── Toolbar (useVBIStore -> builder / locale / theme / limit)
              ├── FieldsPanel (useVBIStore -> builder / schemaFields)
              ├── ShelfPanel (useVBIStore -> builder / dimensions / measures)
              └── ChartPanel (useVBIStore -> vseed / loading)
```

## Usage

### Wrap at the App Entry

```tsx
// App.tsx
import { VBIStoreProvider } from 'src/model'
import { defaultBuilder } from 'src/utils/demoConnector'

export const App = () => {
  return (
    <VBIStoreProvider builder={defaultBuilder}>
      <AppContent />
    </VBIStoreProvider>
  )
}
```

### Get State Inside Components

```tsx
// ChartPanel.tsx
import { useVBIStore } from 'src/model'

export const ChartPanel = () => {
  const vseed = useVBIStore((s) => s.vseed)
  const loading = useVBIStore((s) => s.loading)

  return loading ? <Spin /> : vseed ? <VSeedRender vseed={vseed} /> : null
}
```

## Notes

- `storeRef` uses `useRef` to keep the store instance stable across SSR and React hot reload.
- `VBIStoreProvider` creates the store only once and does not recreate it on later renders.
- `useVBIStore` throws outside Context to make usage safe.
- `useVBIStore` uses Zustand's `useStore(store, selector)` instead of `useStore(selector)` to support multiple store instances.

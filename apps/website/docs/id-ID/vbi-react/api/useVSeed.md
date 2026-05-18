# useVSeed

## Impor

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Tanda Tangan

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Deskripsi

Menjalankan alur query dan pembuatan VSeed, lalu mengembalikan state dan data yang diperlukan untuk rendering.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```

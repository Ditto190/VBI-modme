# useHavingFilter

## Impor

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## Tanda Tangan

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## Deskripsi

Mengelola pohon filter Having dan menyediakan titik masuk mutation.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

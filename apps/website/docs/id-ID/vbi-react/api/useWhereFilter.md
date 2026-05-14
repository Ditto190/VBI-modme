# useWhereFilter

## Import

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## Signature

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## Deskripsi

Mengelola pohon filter Where dan menyediakan entry mutation.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

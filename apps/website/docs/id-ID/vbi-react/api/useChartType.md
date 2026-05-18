# useChartType

## Impor

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Tanda Tangan

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Deskripsi

Membaca dan memperbarui jenis chart saat ini, sekaligus mengekspos daftar jenis chart yang tersedia.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

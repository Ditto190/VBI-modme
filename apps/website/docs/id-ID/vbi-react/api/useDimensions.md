# useDimensions

## Impor

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Tanda Tangan

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Deskripsi

Membaca dan memperbarui konfigurasi dimensi, serta menyediakan kemampuan untuk menambah, menghapus, dan mengubah dimensi.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

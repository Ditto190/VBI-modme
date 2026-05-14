# useMeasures

## Import

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Signature

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Deskripsi

Membaca dan memperbarui konfigurasi measure, serta menyediakan kemampuan untuk menambah, menghapus, dan mengubah measure.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

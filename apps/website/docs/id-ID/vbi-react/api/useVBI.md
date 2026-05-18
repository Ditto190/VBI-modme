# useVBI

## Impor

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Tanda Tangan

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Deskripsi

Berlangganan perubahan snapshot DSL pada builder, lalu mengembalikan `dsl` terbaru dan `builder` asli.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

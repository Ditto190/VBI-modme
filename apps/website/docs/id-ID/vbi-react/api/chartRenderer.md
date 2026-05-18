# ChartRenderer

## Impor

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Tanda Tangan

```ts
ChartRenderer(props: ChartRendererProps)
```

## Deskripsi

Merender chart berdasarkan output builder, serta menangani status pemuatan dan error.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```

# ChartTypeSelector

## Impor

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Tanda Tangan

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Deskripsi

Menyediakan pemilih dropdown untuk jenis chart.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```

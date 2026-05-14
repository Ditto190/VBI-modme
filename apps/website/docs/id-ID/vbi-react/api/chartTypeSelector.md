# ChartTypeSelector

## Import

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Signature

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Deskripsi

Menyediakan dropdown pemilih jenis chart.

## Contoh Minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```

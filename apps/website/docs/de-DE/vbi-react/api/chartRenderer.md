# ChartRenderer

## Import

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Signatur

```ts
ChartRenderer(props: ChartRendererProps)
```

## Beschreibung

Rendert den Chart auf Basis der builder-Ausgabe und behandelt Lade- und Fehlerzustände.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```

# ChartRenderer

## Import

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Signature

```ts
ChartRenderer(props: ChartRendererProps)
```

## Description

Rend le graphique à partir de la sortie du builder et gère les états de chargement et d’erreur.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```

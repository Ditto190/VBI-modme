# ChartTypeSelector

## Import

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Signatur

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Beschreibung

Stellt einen Dropdown-Selektor für Chart-Typen bereit.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```

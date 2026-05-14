# useDimensions

## Import

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Signatur

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Beschreibung

Liest und aktualisiert die Dimensionskonfiguration und bietet Funktionen zum Hinzufügen, Entfernen und Ändern von Dimensionen.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

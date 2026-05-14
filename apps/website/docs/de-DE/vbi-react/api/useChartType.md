# useChartType

## Import

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Signatur

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Beschreibung

Liest und aktualisiert den aktuellen Chart-Typ und stellt gleichzeitig die Liste der verfügbaren Chart-Typen bereit.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

# useVSeed

## Import

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Signatur

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Beschreibung

Führt den Abfrage- und VSeed-Generierungsablauf aus und gibt den für das Rendering erforderlichen Zustand sowie die Daten zurück.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```

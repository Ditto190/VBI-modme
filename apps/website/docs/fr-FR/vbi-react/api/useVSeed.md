# useVSeed

## Import

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Signature

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Description

Exécute le pipeline de requête et de génération VSeed, puis renvoie l’état et les données nécessaires au rendu.

## Exemple minimal

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

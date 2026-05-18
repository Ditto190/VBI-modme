# useHavingFilter

## Import

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## Signature

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## Description

Gère l’arbre de filtres Having et expose des points d’entrée mutation.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```

# Hooks de base

Cet exemple montre l'utilisation combinée de `useVBI` et `useVSeed`.

## Dépendances

- Dépendances de package : `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Contrainte d'entrée : nécessite un `VBIChartBuilder` initialisé avec un connector disponible déjà lié

## Extrait de code

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Réessayer : {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Résultat attendu

- Lorsque le builder change, `dsl` et `vseed` sont mis à jour de façon synchronisée.
- Affiche `Loading...` au premier chargement ou pendant une mise à jour; en cas d'échec, une nouvelle tentative manuelle est possible.
- Après réussite, le `chartType` actuel et le dernier VSeed JSON sont visibles.

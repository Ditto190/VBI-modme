# Édition des conditions de filtre

Cet exemple montre les points d'entrée mutation de `useWhereFilter` et `useHavingFilter`.

## Dépendances

- Dépendances de package : `@visactor/vbi-react`, `@visactor/vbi`, `react`
- Contrainte d'entrée : `builder` doit contenir au moins les champs `region` et `sales` pour démontrer les changements Where/Having

## Extrait de code

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Ajouter une condition Where
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Ajouter une condition Having
      </button>
      <button onClick={clearWhereFilter}>Vider Where</button>
      <button onClick={clearHavingFilter}>Vider Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## Résultat attendu

- Après clic sur les boutons, les conditions Where/Having sont ajoutées respectivement à l'arbre de filtres du builder.
- Les boutons de réinitialisation suppriment immédiatement les conditions de filtre correspondantes.
- Le JSON en bas de page permet de vérifier la structure DSL de filtre actuelle.

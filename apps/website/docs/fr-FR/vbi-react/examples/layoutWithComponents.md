# Mise en page avec composants

Cet exemple montre `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Dépendances

- Dépendances de package : `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Contrainte d'entrée : `builder` doit contenir des champs de dimension/mesure disponibles pour permettre à `FieldPanel` de démontrer l'ajout et la suppression

## Extrait de code

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Région', value: 'region' }]}
          measureOptions={[{ label: 'Ventes', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## Résultat attendu

- La barre supérieure permet de changer de type de graphique, le panneau gauche d'ajouter/supprimer des dimensions/mesures, et la zone principale affiche l'aperçu du DSL de graphique.
- Après les opérations sur les champs, la zone principale se rafraîchit automatiquement sans déclenchement manuel.
- Si le build échoue, `ChartRenderer` affiche l'erreur par défaut et un bouton de nouvelle tentative.

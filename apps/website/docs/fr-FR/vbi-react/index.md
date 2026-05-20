# VBI React

`@visactor/vbi-react` est la couche d'adaptation React de `@visactor/vbi`; elle connecte `VBIChartBuilder` à l'arbre de composants React.

Les exports actuels sont répartis sur deux niveaux :

- Export racine `@visactor/vbi-react` : `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Export de sous-chemin `@visactor/vbi-react/components` : `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Positionnement

- Encapsulation de la souscription d'état et du rendu pour React 18+
- Utilise `VBIChartBuilder` comme Single Source of Truth (SSOT), sans conserver de copie métier supplémentaire
- Adapté à la construction de panneaux de configuration BI, de zones de prévisualisation de graphiques et de panneaux de débogage DSL

## Installation

Installation dans un projet standard :

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Pour le développement local dans ce monorepo, vous pouvez utiliser les dépendances workspace :

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Démarrage rapide

L'exemple ci-dessous montre le flux minimal de bout en bout avec `useVBI` + `useVSeed` :

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.connectors.register(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Navigation

- [Vue d'ensemble de l'API](./api/index)
- [Exemples](./examples/index)

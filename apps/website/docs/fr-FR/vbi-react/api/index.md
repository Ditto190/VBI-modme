# Vue d'ensemble de l'API

Les exports actuels de `@visactor/vbi-react` sont répartis en deux parties :

| Module | Chemin d'import | Contenu |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Tous les hooks/components s'appuient sur `VBIChartBuilder` et ne maintiennent pas de source d'état métier supplémentaire.

# ChartTypeBuilder

Builder de type de graphique pour changer et récupérer le type de graphique. Prend en charge les tableaux, graphiques en barres, graphiques en courbes, graphiques en secteurs, nuages de points et d'autres types de graphiques

## Propriétés

## Méthodes

### constructor

Constructeur

**Définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Observer les changements de type de graphique

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### changeChartType

Définir le type de graphique

**Définition**:

```typescript
changeChartType(chartType: string)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `chartType` | string | - Type de graphique |

### getChartType

Obtenir le type de graphique courant

**Définition**:

```typescript
getChartType(): string
```

**Retour**: `string`

### getSupportedDimensionEncodings

Obtenir les encodages de dimensions pris en charge par le type de graphique courant

**Définition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Renvoyer les encodages de dimensions recommandés selon le type de graphique courant et l'ordre des dimensions

**Définition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `dimensionCount` | number | - Nombre de dimensions ; par défaut le nombre de dimensions dans la DSL courante |

### getSupportedMeasureEncodings

Obtenir les encodages de mesures pris en charge par le type de graphique courant

**Définition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Renvoyer les encodages de mesures recommandés selon le type de graphique courant et l'ordre des mesures

**Définition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `measureCount` | number | - Nombre de mesures ; par défaut le nombre de mesures dans la DSL courante |

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): string
```

**Retour**: `string`

### getAvailableChartTypes

Obtenir tous les types de graphiques pris en charge

**Définition**:

```typescript
getAvailableChartTypes(): string[]
```

**Retour**: `string[]`

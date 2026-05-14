# ChartTypeBuilder

Builder de type de graphique pour changer et lire le type de graphique. Prend en charge table, barres, lignes, secteurs, nuage de points et autres types

## Proprietes

## Methodes

### constructor

Constructeur

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Observer les changements de type de graphique

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### changeChartType

Definir le type de graphique

**Definition**:

```typescript
changeChartType(chartType: string)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `chartType` | string | - Type de graphique |

### getChartType

Obtenir le type de graphique courant

**Definition**:

```typescript
getChartType(): string
```

**Retour**: `string`

### getSupportedDimensionEncodings

Obtenir les encodages de dimensions pris en charge par le type de graphique courant

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Renvoyer les encodages de dimensions recommandes selon le type de graphique courant et l ordre des dimensions

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `dimensionCount` | number | - Nombre de dimensions ; par defaut le nombre de dimensions dans la DSL courante |

### getSupportedMeasureEncodings

Obtenir les encodages de mesures pris en charge par le type de graphique courant

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Renvoyer les encodages de mesures recommandes selon le type de graphique courant et l ordre des mesures

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `measureCount` | number | - Nombre de mesures ; par defaut le nombre de mesures dans la DSL courante |

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): string
```

**Retour**: `string`

### getAvailableChartTypes

Obtenir tous les types de graphiques pris en charge

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Retour**: `string[]`
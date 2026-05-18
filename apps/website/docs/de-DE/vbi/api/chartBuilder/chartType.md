# ChartTypeBuilder

Builder für Diagrammtypen zum Wechseln und Abrufen des Diagrammtyps. Unterstützt Tabellen, Balken-, Linien-, Kreis- und Streudiagramme sowie weitere Diagrammtypen

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Änderungen des Diagrammtyps beobachten

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### changeChartType

Diagrammtyp setzen

**Definition**:

```typescript
changeChartType(chartType: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chartType` | string | - Diagrammtyp |

### getChartType

Aktuellen Diagrammtyp abrufen

**Definition**:

```typescript
getChartType(): string
```

**Rückgabe**: `string`

### getSupportedDimensionEncodings

Vom aktuellen Diagrammtyp unterstützte Dimensions-Encodings abrufen

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Empfohlene Dimensions-Encodings anhand des aktuellen Diagrammtyps in Dimensionsreihenfolge zurückgeben

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `dimensionCount` | number | - Anzahl der Dimensionen; standardmäßig die Dimensionsanzahl in der aktuellen DSL |

### getSupportedMeasureEncodings

Vom aktuellen Diagrammtyp unterstützte Kennzahlen-Encodings abrufen

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Empfohlene Kennzahlen-Encodings anhand des aktuellen Diagrammtyps in Kennzahlenreihenfolge zurückgeben

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `measureCount` | number | - Anzahl der Kennzahlen; standardmäßig die Kennzahlenanzahl in der aktuellen DSL |

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`

### getAvailableChartTypes

Alle unterstützten Diagrammtypen abrufen

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Rückgabe**: `string[]`

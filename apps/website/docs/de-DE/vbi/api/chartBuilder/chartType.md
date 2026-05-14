# ChartTypeBuilder

Builder fuer Diagrammtypen zum Wechseln und Abrufen des Diagrammtyps. Unterstuetzt Tabelle, Balken, Linie, Kreis, Streuung und weitere Diagrammtypen

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

Aenderungen des Diagrammtyps beobachten

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rueckgabe**: `() => void`

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

**Rueckgabe**: `string`

### getSupportedDimensionEncodings

Vom aktuellen Diagrammtyp unterstuetzte Dimensions-Encodings abrufen

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Empfohlene Dimensions-Encodings anhand des aktuellen Diagrammtyps in Dimensionsreihenfolge zurueckgeben

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `dimensionCount` | number | - Anzahl der Dimensionen; standardmaessig die Dimensionsanzahl in der aktuellen DSL |

### getSupportedMeasureEncodings

Vom aktuellen Diagrammtyp unterstuetzte Kennzahlen-Encodings abrufen

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Empfohlene Kennzahlen-Encodings anhand des aktuellen Diagrammtyps in Kennzahlenreihenfolge zurueckgeben

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `measureCount` | number | - Anzahl der Kennzahlen; standardmaessig die Kennzahlenanzahl in der aktuellen DSL |

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rueckgabe**: `string`

### getAvailableChartTypes

Alle unterstuetzten Diagrammtypen abrufen

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Rueckgabe**: `string[]`
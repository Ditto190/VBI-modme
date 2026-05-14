# DimensionNodeBuilder

Dimensionsknoten-Builder zur Konfiguration einer einzelnen Dimension

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

Knoten-ID abrufen

**Definition**:

```typescript
getId(): string
```

**Rueckgabe**: `string`

### getField

Feldname abrufen

**Definition**:

```typescript
getField(): string
```

**Rueckgabe**: `string`

### getEncoding

Diagramm-Encoding-Position abrufen

**Definition**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Rueckgabe**: `VBIDimension['encoding'] \| undefined`

### getSort

Sortierkonfiguration abrufen

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Rueckgabe**: `VBISort \| undefined`

### setAlias

Anzeigenamen setzen

**Definition**:

```typescript
setAlias(alias: string): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `alias` | string | - Anzeigename |

### setEncoding

Diagramm-Encoding-Position setzen

**Definition**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Dimensions-Encoding-Position |

### setSort

Sortierkonfiguration setzen

**Definition**:

```typescript
setSort(sort: VBISort): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `sort` | VBISort | - Sortierkonfiguration |

### setAggregate

Datumsaggregationsfunktion setzen

**Definition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Datumsaggregationskonfiguration |

### clearAggregate

Datumsaggregationsfunktion loeschen

**Definition**:

```typescript
clearAggregate(): this
```

**Rueckgabe**: `this`

### clearSort

Sortierkonfiguration loeschen

**Definition**:

```typescript
clearSort(): this
```

**Rueckgabe**: `this`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIDimension
```

**Rueckgabe**: `VBIDimension`
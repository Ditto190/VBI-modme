# MeasureNodeBuilder

Kennzahlenknoten-Builder zur Konfiguration einer einzelnen Kennzahl

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Rueckgabe**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - Kennzahlen-Encoding-Position |

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

Aggregationsfunktion setzen

**Definition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - Aggregationskonfiguration |

### setFormat

Zahlenformat setzen

**Definition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Formatkonfiguration |

### getFormat

Zahlenformat abrufen

**Definition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Rueckgabe**: `VBIMeasureFormat \| undefined`

### clearFormat

Zahlenformatkonfiguration loeschen

**Definition**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Rueckgabe**: `VBIMeasure`
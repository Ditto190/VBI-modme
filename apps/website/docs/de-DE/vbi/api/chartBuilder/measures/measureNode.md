# MeasureNodeBuilder

Kennzahlenknoten-Builder zur Konfiguration einer einzelnen Kennzahl

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

**Rückgabe**: `string`

### getField

Feldname abrufen

**Definition**:

```typescript
getField(): string
```

**Rückgabe**: `string`

### getEncoding

Diagramm-Encoding-Position abrufen

**Definition**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Rückgabe**: `VBIMeasure['encoding'] \| undefined`

### getSort

Sortierkonfiguration abrufen

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Rückgabe**: `VBISort \| undefined`

### setAlias

Anzeigenamen setzen

**Definition**:

```typescript
setAlias(alias: string): this
```

**Rückgabe**: `this`

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

**Rückgabe**: `this`

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

**Rückgabe**: `this`

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

**Rückgabe**: `this`

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

**Rückgabe**: `this`

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

**Rückgabe**: `VBIMeasureFormat \| undefined`

### clearFormat

Zahlenformatkonfiguration löschen

**Definition**:

```typescript
clearFormat(): this
```

**Rückgabe**: `this`

### clearSort

Sortierkonfiguration löschen

**Definition**:

```typescript
clearSort(): this
```

**Rückgabe**: `this`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIMeasure
```

**Rückgabe**: `VBIMeasure`

# WhereFilterNodeBuilder

Where-Filterknoten-Builder zur Konfiguration einer einzelnen Where-Filterbedingung

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

### setField

Feldname setzen

**Definition**:

```typescript
setField(field: string): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |

### getOperator

Filteroperator abrufen

**Definition**:

```typescript
getOperator(): string | undefined
```

**Rueckgabe**: `string \| undefined`

### setOperator

Filteroperator setzen

**Definition**:

```typescript
setOperator(operator: string): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `operator` | string | - Operator |

### setValue

Filterwert setzen

**Definition**:

```typescript
setValue(value: unknown): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `value` | unknown | - Filterwert |

### setDate

Datumsfilterbedingung setzen

**Definition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Datumspraedikat |

### getDate

Datumsfilterbedingung abrufen; bei Nicht-Datumsfiltern undefined zurueckgeben

**Definition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Rueckgabe**: `VBIWhereDatePredicate \| undefined`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIWhereFilter
```

**Rueckgabe**: `VBIWhereFilter`
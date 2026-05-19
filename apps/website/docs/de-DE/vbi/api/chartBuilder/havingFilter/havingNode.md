# HavingFilterNodeBuilder

Having-Filterknoten-Builder zur Konfiguration einer einzelnen Having-Filterbedingung

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

### getOperator

Filteroperator abrufen

**Definition**:

```typescript
getOperator(): string | undefined
```

**Rückgabe**: `string \| undefined`

### getAggregate

Aggregationskonfiguration abrufen

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Rückgabe**: `VBIHavingAggregate \| undefined`

### setValue

Wert der Filterbedingung setzen

**Definition**:

```typescript
setValue(value: unknown): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `value` | unknown | - Filterwert |

### setOperator

Filteroperator setzen

**Definition**:

```typescript
setOperator(operator: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `operator` | string | - Operator |

### setAggregate

Aggregationskonfiguration setzen

**Definition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Aggregationskonfiguration |

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIHavingFilter
```

**Rückgabe**: `VBIHavingFilter`

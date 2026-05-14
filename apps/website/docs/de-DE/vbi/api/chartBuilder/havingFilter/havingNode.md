# HavingFilterNodeBuilder

Having-Filterknoten-Builder zur Konfiguration einer einzelnen Having-Filterbedingung

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

### getOperator

Filteroperator abrufen

**Definition**:

```typescript
getOperator(): string | undefined
```

**Rueckgabe**: `string \| undefined`

### getAggregate

Aggregationskonfiguration abrufen

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Rueckgabe**: `VBIHavingAggregate \| undefined`

### setValue

Wert der Filterbedingung setzen

**Definition**:

```typescript
setValue(value: unknown): this
```

**Rueckgabe**: `this`

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

**Rueckgabe**: `this`

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

**Rueckgabe**: `this`

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

**Rueckgabe**: `VBIHavingFilter`
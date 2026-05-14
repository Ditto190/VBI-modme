# WhereGroupBuilder

Where-Gruppen-Builder zur Konfiguration der logischen Beziehung (AND/OR) einer Bedingungsgruppe

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

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Rueckgabe**: `Y.Array<any>`

### getId

Gruppen-ID abrufen

**Definition**:

```typescript
getId(): string
```

**Rueckgabe**: `string`

### getOperator

Logischen Operator abrufen

**Definition**:

```typescript
getOperator(): 'and' | 'or'
```

**Rueckgabe**: `'and' \| 'or'`

### setOperator

Logischen Operator setzen

**Definition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logischer Operator |

### add

Eine Where-Filterbedingung zur Gruppe hinzufuegen

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Eine verschachtelte Gruppe zur aktuellen Gruppe hinzufuegen

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logischer Operator |
| `callback` | (group: WhereGroupBuilder) => void | - Callback-Funktion |

### remove

Bedingung mit angegebener ID oder Element an angegebenem Index entfernen

**Definition**:

```typescript
remove(idOrIndex: string | number): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### clear

Alle Bedingungen in der Gruppe leeren

**Definition**:

```typescript
clear(): this
```

**Rueckgabe**: `this`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Rueckgabe**: `VBIWhereGroup`
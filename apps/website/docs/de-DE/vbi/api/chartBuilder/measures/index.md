# MeasuresBuilder

Kennzahlen-Builder zum Hinzufügen, Ändern und Entfernen von Kennzahlenkonfigurationen. Kennzahlen sind numerische Datenfelder wie Umsatz, Gewinn oder Menge

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

Eine Kennzahl hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback-Funktion |

### remove

Kennzahl mit angegebener ID entfernen

**Definition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Kennzahlen-ID |

### update

Kennzahlenkonfiguration aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Kennzahlen-ID |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback-Funktion |

### find

Erste Kennzahl nach Callback-Bedingung finden, Verhalten wie Array.find

**Definition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Rückgabe**: `MeasureNodeBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Suchbedingung |

### findAll

Alle Kennzahlen abrufen

**Definition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Rückgabe**: `MeasureNodeBuilder[]`

### toJSON

Alle Kennzahlen als JSON-Array exportieren

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Rückgabe**: `VBIMeasure[]`

### observe

Kennzahlenänderungen beobachten

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Rückgabe**: `node is VBIMeasure`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Rückgabe**: `node is VBIMeasureGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

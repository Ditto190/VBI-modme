# MeasuresBuilder

Kennzahlen-Builder zum Hinzufuegen, Aendern und Entfernen von Kennzahlenkonfigurationen. Kennzahlen sind numerische Datenfelder wie Umsatz, Gewinn oder Menge

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

Eine Kennzahl hinzufuegen

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Rueckgabe**: `MeasuresBuilder`

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

**Rueckgabe**: `MeasuresBuilder`

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

**Rueckgabe**: `MeasuresBuilder`

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

**Rueckgabe**: `MeasureNodeBuilder \| undefined`

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

**Rueckgabe**: `MeasureNodeBuilder[]`

### toJSON

Alle Kennzahlen als JSON-Array exportieren

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Rueckgabe**: `VBIMeasure[]`

### observe

Kennzahlenaenderungen beobachten

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rueckgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Rueckgabe**: `node is VBIMeasure`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Rueckgabe**: `node is VBIMeasureGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |
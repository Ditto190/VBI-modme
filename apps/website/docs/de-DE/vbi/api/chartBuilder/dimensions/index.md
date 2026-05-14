# DimensionsBuilder

Dimensions-Builder zum Hinzufuegen, Aendern und Entfernen von Dimensionskonfigurationen. Dimensionen sind kategoriale Datenfelder wie Zeit, Region oder Produktkategorie

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

Eine Dimension hinzufuegen

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Rueckgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback-Funktion |

### remove

Dimension mit angegebener ID entfernen

**Definition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Rueckgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Dimensions-ID |

### update

Konfiguration der Dimension mit angegebener ID aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Rueckgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Dimensions-ID |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback-Funktion |

### find

Erste Dimension nach Callback-Bedingung finden, Verhalten wie Array.find

**Definition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Rueckgabe**: `DimensionNodeBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Suchbedingung |

### findAll

Alle Dimensionen abrufen

**Definition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Rueckgabe**: `DimensionNodeBuilder[]`

### toJSON

Alle Dimensionen als JSON-Array exportieren

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Rueckgabe**: `VBIDimension[]`

### observe

Dimensionsaenderungen beobachten und eine Funktion zum Abbestellen zurueckgeben

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rueckgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Rueckgabe**: `node is VBIDimension`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Rueckgabe**: `node is VBIDimensionGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |
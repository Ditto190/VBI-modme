# DimensionsBuilder

Dimensions-Builder zum Hinzufügen, Ändern und Entfernen von Dimensionskonfigurationen. Dimensionen sind kategoriale Datenfelder wie Zeit, Region oder Produktkategorie

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

Eine Dimension hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Rückgabe**: `DimensionsBuilder`

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

**Rückgabe**: `DimensionsBuilder`

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

**Rückgabe**: `DimensionsBuilder`

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

**Rückgabe**: `DimensionNodeBuilder \| undefined`

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

**Rückgabe**: `DimensionNodeBuilder[]`

### toJSON

Alle Dimensionen als JSON-Array exportieren

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Rückgabe**: `VBIDimension[]`

### observe

Dimensionsänderungen beobachten und eine Funktion zum Abbestellen zurückgeben

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Rückgabe**: `node is VBIDimension`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Rückgabe**: `node is VBIDimensionGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

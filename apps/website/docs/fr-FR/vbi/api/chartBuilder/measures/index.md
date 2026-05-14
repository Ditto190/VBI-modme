# MeasuresBuilder

Builder de mesures pour ajouter, modifier et supprimer la configuration des mesures. Les mesures sont des champs numeriques, par exemple ventes, profit ou quantite

## Proprietes

## Methodes

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

Ajouter une mesure

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: MeasureNodeBuilder) => void | - Fonction de rappel |

### remove

Supprimer la mesure avec l ID indique

**Definition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de mesure |

### update

Mettre a jour la configuration de mesure

**Definition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de mesure |
| `callback` | (node: MeasureNodeBuilder) => void | - Fonction de rappel |

### find

Trouver la premiere mesure selon une condition de callback, comme Array.find

**Definition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Retour**: `MeasureNodeBuilder \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Condition de recherche |

### findAll

Obtenir toutes les mesures

**Definition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Retour**: `MeasureNodeBuilder[]`

### toJSON

Exporter toutes les mesures en tableau JSON

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Retour**: `VBIMeasure[]`

### observe

Observer les changements de mesures

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Retour**: `node is VBIMeasure`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Retour**: `node is VBIMeasureGroup`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |
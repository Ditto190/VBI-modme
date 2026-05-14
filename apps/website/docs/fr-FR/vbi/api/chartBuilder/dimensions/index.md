# DimensionsBuilder

Builder de dimensions pour ajouter, modifier et supprimer la configuration des dimensions. Les dimensions sont des champs categoriels, par exemple temps, region ou categorie produit

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

Ajouter une dimension

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: DimensionNodeBuilder) => void | - Fonction de rappel |

### remove

Supprimer la dimension avec l ID indique

**Definition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de dimension |

### update

Mettre a jour la configuration de la dimension avec l ID indique

**Definition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de dimension |
| `callback` | (node: DimensionNodeBuilder) => void | - Fonction de rappel |

### find

Trouver la premiere dimension selon une condition de callback, comme Array.find

**Definition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Retour**: `DimensionNodeBuilder \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Condition de recherche |

### findAll

Obtenir toutes les dimensions

**Definition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Retour**: `DimensionNodeBuilder[]`

### toJSON

Exporter toutes les dimensions en tableau JSON

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Retour**: `VBIDimension[]`

### observe

Observer les changements de dimensions et renvoyer une fonction de desabonnement

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Retour**: `node is VBIDimension`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Retour**: `node is VBIDimensionGroup`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |
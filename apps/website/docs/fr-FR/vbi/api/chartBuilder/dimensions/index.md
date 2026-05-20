# DimensionsBuilder

Builder de dimensions pour ajouter, modifier et supprimer la configuration des dimensions. Les dimensions sont des champs catégoriels, par exemple le temps, la région ou la catégorie de produit

## Méthodes

### constructor

**Définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

Ajouter une dimension

**Définition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: DimensionNodeBuilder) => void | - Fonction de rappel |

### remove

Supprimer la dimension avec l'ID indiqué

**Définition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de dimension |

### update

Mettre à jour la configuration de la dimension avec l'ID indiqué

**Définition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour**: `DimensionsBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de dimension |
| `callback` | (node: DimensionNodeBuilder) => void | - Fonction de rappel |

### find

Trouver la première dimension selon une condition de callback, comme Array.find

**Définition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Retour**: `DimensionNodeBuilder \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Condition de recherche |

### findAll

Obtenir toutes les dimensions

**Définition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Retour**: `DimensionNodeBuilder[]`

### toJSON

Exporter toutes les dimensions en tableau JSON

**Définition**:

```typescript
toJSON(): VBIDimension[]
```

**Retour**: `VBIDimension[]`

### observe

Observer les changements de dimensions et renvoyer une fonction de désabonnement

**Définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isDimensionNode

**Définition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Retour**: `node is VBIDimension`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Définition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Retour**: `node is VBIDimensionGroup`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

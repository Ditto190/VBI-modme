# WhereFilterBuilder

Builder de filtre Where pour ajouter, modifier et supprimer des conditions de niveau ligne. Les filtres Where s'appliquent avant la requête et filtrent les données brutes

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

### getConditions

**Définition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour**: `Y.Array<any>`

### add

Ajouter une condition de filtre Where

**Définition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe Where

**Définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateur logique |
| `callback` | (group: WhereGroupBuilder) => void | - Fonction de rappel |

### update

Mettre à jour la condition de filtre avec l'ID indiqué

**Définition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de condition de filtre |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fonction de rappel |

### updateGroup

Mettre à jour le groupe avec l'ID indiqué

**Définition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de groupe |
| `callback` | (group: WhereGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l'ID indiqué ou l'élément à l'index indiqué

**Définition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Trouver la première condition (filtre ou groupe) selon un callback, comme Array.find

**Définition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Retour**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Condition de recherche |

### clear

Effacer toutes les conditions de filtre Where

**Définition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complète du filtre Where

**Définition**:

```typescript
toJSON(): VBIWhereGroup
```

**Retour**: `VBIWhereGroup`

### observe

Observer les changements de conditions de filtre et renvoyer une fonction de désabonnement

**Définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isGroup

Déterminer si le nœud est un nœud de groupe

**Définition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Déterminer si le nœud est un nœud feuille

**Définition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

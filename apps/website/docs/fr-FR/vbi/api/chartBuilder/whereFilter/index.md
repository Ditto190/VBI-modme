# WhereFilterBuilder

Builder de filtre Where pour ajouter, modifier et supprimer des conditions de niveau ligne. Les filtres Where s appliquent avant la requete et filtrent les donnees brutes

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

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour**: `Y.Array<any>`

### add

Ajouter une condition de filtre Where

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe Where

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operateur logique |
| `callback` | (group: WhereGroupBuilder) => void | - Fonction de rappel |

### update

Mettre a jour la condition de filtre avec l ID indique

**Definition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de condition de filtre |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fonction de rappel |

### updateGroup

Mettre a jour le groupe avec l ID indique

**Definition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de groupe |
| `callback` | (group: WhereGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l ID indique ou l element a l index indique

**Definition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Retour**: `WhereFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Trouver la premiere condition (filtre ou groupe) selon un callback, comme Array.find

**Definition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Retour**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Condition de recherche |

### clear

Effacer toutes les conditions de filtre Where

**Definition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complete du filtre Where

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Retour**: `VBIWhereGroup`

### observe

Observer les changements de conditions de filtre et renvoyer une fonction de desabonnement

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isGroup

Determiner si le noeud est un noeud de groupe

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Retour**: `boolean`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Determiner si le noeud est un noeud feuille

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Retour**: `boolean`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |
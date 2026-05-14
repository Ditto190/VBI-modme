# HavingFilterBuilder

Builder de filtre Having pour ajouter, modifier et supprimer des conditions apres regroupement. Les filtres Having s appliquent apres l agregation et filtrent les resultats groupes

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

Ajouter une condition de filtre Having

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe Having

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operateur logique |
| `callback` | (group: HavingGroupBuilder) => void | - Fonction de rappel |

### update

Mettre a jour la condition de filtre avec l ID indique

**Definition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de condition de filtre |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fonction de rappel |

### updateGroup

Mettre a jour le groupe avec l ID indique

**Definition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de groupe |
| `callback` | (group: HavingGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l ID indique ou l element a l index indique

**Definition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Trouver la premiere condition (filtre ou groupe) selon un callback, comme Array.find

**Definition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Retour**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Condition de recherche |

### clear

Effacer toutes les conditions de filtre Having

**Definition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complete du filtre Having

**Definition**:

```typescript
toJSON(): VBIHavingGroup
```

**Retour**: `VBIHavingGroup`

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
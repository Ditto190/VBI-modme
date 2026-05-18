# HavingFilterBuilder

Builder de filtre Having pour ajouter, modifier et supprimer des conditions après regroupement. Les filtres Having s'appliquent après l'agrégation et filtrent les résultats groupés

## Propriétés

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

Ajouter une condition de filtre Having

**Définition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe Having

**Définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateur logique |
| `callback` | (group: HavingGroupBuilder) => void | - Fonction de rappel |

### update

Mettre à jour la condition de filtre avec l'ID indiqué

**Définition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de condition de filtre |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fonction de rappel |

### updateGroup

Mettre à jour le groupe avec l'ID indiqué

**Définition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de groupe |
| `callback` | (group: HavingGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l'ID indiqué ou l'élément à l'index indiqué

**Définition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Retour**: `HavingFilterBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Trouver la première condition (filtre ou groupe) selon un callback, comme Array.find

**Définition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Retour**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Condition de recherche |

### clear

Effacer toutes les conditions de filtre Having

**Définition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complète du filtre Having

**Définition**:

```typescript
toJSON(): VBIHavingGroup
```

**Retour**: `VBIHavingGroup`

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

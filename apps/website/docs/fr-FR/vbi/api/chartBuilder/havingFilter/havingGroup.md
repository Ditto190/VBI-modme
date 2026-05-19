# HavingGroupBuilder

Builder de groupe Having pour configurer la relation logique (AND/OR) d'un groupe de conditions

## Méthodes

### constructor

**Définition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getConditions

**Définition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour**: `Y.Array<any>`

### getId

Obtenir l'ID du groupe

**Définition**:

```typescript
getId(): string
```

**Retour**: `string`

### getOperator

Obtenir l'opérateur logique

**Définition**:

```typescript
getOperator(): 'and' | 'or'
```

**Retour**: `'and' \| 'or'`

### setOperator

Définir l'opérateur logique

**Définition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateur logique |

### add

Ajouter une condition de filtre Having au groupe

**Définition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe imbriqué au groupe courant

**Définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateur logique |
| `callback` | (group: HavingGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l'ID indiqué ou l'élément à l'index indiqué

**Définition**:

```typescript
remove(idOrIndex: string | number): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### clear

Effacer toutes les conditions du groupe

**Définition**:

```typescript
clear(): this
```

**Retour**: `this`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): VBIHavingGroup
```

**Retour**: `VBIHavingGroup`

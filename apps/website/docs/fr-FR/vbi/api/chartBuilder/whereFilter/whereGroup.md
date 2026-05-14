# WhereGroupBuilder

Builder de groupe Where pour configurer la relation logique (AND/OR) d un groupe de conditions

## Proprietes

## Methodes

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour**: `Y.Array<any>`

### getId

Obtenir l ID du groupe

**Definition**:

```typescript
getId(): string
```

**Retour**: `string`

### getOperator

Obtenir l operateur logique

**Definition**:

```typescript
getOperator(): 'and' | 'or'
```

**Retour**: `'and' \| 'or'`

### setOperator

Definir l operateur logique

**Definition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operateur logique |

### add

Ajouter une condition de filtre Where au groupe

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fonction de rappel |

### addGroup

Ajouter un groupe imbrique au groupe courant

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operateur logique |
| `callback` | (group: WhereGroupBuilder) => void | - Fonction de rappel |

### remove

Supprimer la condition avec l ID indique ou l element a l index indique

**Definition**:

```typescript
remove(idOrIndex: string | number): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### clear

Effacer toutes les conditions du groupe

**Definition**:

```typescript
clear(): this
```

**Retour**: `this`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Retour**: `VBIWhereGroup`
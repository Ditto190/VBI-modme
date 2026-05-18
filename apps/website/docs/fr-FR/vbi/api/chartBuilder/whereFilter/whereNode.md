# WhereFilterNodeBuilder

Builder de nœud de filtre Where pour configurer une seule condition Where

## Propriétés

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

### getId

Obtenir l'ID du nœud

**Définition**:

```typescript
getId(): string
```

**Retour**: `string`

### getField

Obtenir le nom du champ

**Définition**:

```typescript
getField(): string
```

**Retour**: `string`

### setField

Définir le nom du champ

**Définition**:

```typescript
setField(field: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |

### getOperator

Obtenir l'opérateur de filtre

**Définition**:

```typescript
getOperator(): string | undefined
```

**Retour**: `string \| undefined`

### setOperator

Définir l'opérateur de filtre

**Définition**:

```typescript
setOperator(operator: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `operator` | string | - Opérateur |

### setValue

Définir la valeur de filtre

**Définition**:

```typescript
setValue(value: unknown): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `value` | unknown | - Valeur de filtre |

### setDate

Définir la condition de filtre de date

**Définition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Prédicat de date |

### getDate

Obtenir la condition de filtre de date ; renvoie undefined pour un filtre non date

**Définition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Retour**: `VBIWhereDatePredicate \| undefined`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): VBIWhereFilter
```

**Retour**: `VBIWhereFilter`

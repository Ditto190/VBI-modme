# HavingFilterNodeBuilder

Builder de nœud de filtre Having pour configurer une seule condition Having

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

### getOperator

Obtenir l'opérateur de filtre

**Définition**:

```typescript
getOperator(): string | undefined
```

**Retour**: `string \| undefined`

### getAggregate

Obtenir la configuration d'agrégation

**Définition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Retour**: `VBIHavingAggregate \| undefined`

### setValue

Définir la valeur de la condition de filtre

**Définition**:

```typescript
setValue(value: unknown): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `value` | unknown | - Valeur de filtre |

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

### setAggregate

Définir la configuration d'agrégation

**Définition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Configuration d'agrégation |

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): VBIHavingFilter
```

**Retour**: `VBIHavingFilter`

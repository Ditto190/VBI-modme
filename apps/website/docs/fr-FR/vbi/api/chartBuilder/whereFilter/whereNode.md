# WhereFilterNodeBuilder

Builder de noeud de filtre Where pour configurer une seule condition Where

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

### getId

Obtenir l ID du noeud

**Definition**:

```typescript
getId(): string
```

**Retour**: `string`

### getField

Obtenir le nom du champ

**Definition**:

```typescript
getField(): string
```

**Retour**: `string`

### setField

Definir le nom du champ

**Definition**:

```typescript
setField(field: string): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |

### getOperator

Obtenir l operateur de filtre

**Definition**:

```typescript
getOperator(): string | undefined
```

**Retour**: `string \| undefined`

### setOperator

Definir l operateur de filtre

**Definition**:

```typescript
setOperator(operator: string): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `operator` | string | - Operateur |

### setValue

Definir la valeur de filtre

**Definition**:

```typescript
setValue(value: unknown): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `value` | unknown | - Valeur de filtre |

### setDate

Definir la condition de filtre de date

**Definition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Predicat de date |

### getDate

Obtenir la condition de filtre de date ; renvoie undefined pour un filtre non date

**Definition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Retour**: `VBIWhereDatePredicate \| undefined`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): VBIWhereFilter
```

**Retour**: `VBIWhereFilter`
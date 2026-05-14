# HavingFilterNodeBuilder

Builder de noeud de filtre Having pour configurer une seule condition Having

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

### getOperator

Obtenir l operateur de filtre

**Definition**:

```typescript
getOperator(): string | undefined
```

**Retour**: `string \| undefined`

### getAggregate

Obtenir la configuration d agregation

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Retour**: `VBIHavingAggregate \| undefined`

### setValue

Definir la valeur de la condition de filtre

**Definition**:

```typescript
setValue(value: unknown): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `value` | unknown | - Valeur de filtre |

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

### setAggregate

Definir la configuration d agregation

**Definition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Configuration d agregation |

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): VBIHavingFilter
```

**Retour**: `VBIHavingFilter`
# DimensionNodeBuilder

Builder de noeud de dimension pour configurer une seule dimension

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

### getEncoding

Obtenir la position d encodage du graphique

**Definition**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Retour**: `VBIDimension['encoding'] \| undefined`

### getSort

Obtenir la configuration de tri

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Retour**: `VBISort \| undefined`

### setAlias

Definir le nom affiche

**Definition**:

```typescript
setAlias(alias: string): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `alias` | string | - Nom affiche |

### setEncoding

Definir la position d encodage du graphique

**Definition**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Position d encodage de dimension |

### setSort

Definir la configuration de tri

**Definition**:

```typescript
setSort(sort: VBISort): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `sort` | VBISort | - Configuration de tri |

### setAggregate

Definir la fonction d agregation de date

**Definition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Configuration d agregation de date |

### clearAggregate

Effacer la fonction d agregation de date

**Definition**:

```typescript
clearAggregate(): this
```

**Retour**: `this`

### clearSort

Effacer la configuration de tri

**Definition**:

```typescript
clearSort(): this
```

**Retour**: `this`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): VBIDimension
```

**Retour**: `VBIDimension`
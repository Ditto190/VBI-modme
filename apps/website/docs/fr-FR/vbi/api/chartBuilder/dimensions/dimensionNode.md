# DimensionNodeBuilder

Builder de nœud de dimension pour configurer une seule dimension

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

### getEncoding

Obtenir la position d'encodage du graphique

**Définition**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Retour**: `VBIDimension['encoding'] \| undefined`

### getSort

Obtenir la configuration de tri

**Définition**:

```typescript
getSort(): VBISort | undefined
```

**Retour**: `VBISort \| undefined`

### setAlias

Définir le nom affiché

**Définition**:

```typescript
setAlias(alias: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `alias` | string | - Nom affiché |

### setEncoding

Définir la position d'encodage du graphique

**Définition**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Position d'encodage de dimension |

### setSort

Définir la configuration de tri

**Définition**:

```typescript
setSort(sort: VBISort): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `sort` | VBISort | - Configuration de tri |

### setAggregate

Définir la fonction d'agrégation de date

**Définition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Configuration d'agrégation de date |

### clearAggregate

Effacer la fonction d'agrégation de date

**Définition**:

```typescript
clearAggregate(): this
```

**Retour**: `this`

### clearSort

Effacer la configuration de tri

**Définition**:

```typescript
clearSort(): this
```

**Retour**: `this`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): VBIDimension
```

**Retour**: `VBIDimension`

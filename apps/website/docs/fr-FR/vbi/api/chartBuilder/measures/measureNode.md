# MeasureNodeBuilder

Builder de nœud de mesure pour configurer une seule mesure

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Retour**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - Position d'encodage de mesure |

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

Définir la fonction d'agrégation

**Définition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - Configuration d'agrégation |

### setFormat

Définir le format numérique

**Définition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Configuration de format |

### getFormat

Obtenir le format numérique

**Définition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Retour**: `VBIMeasureFormat \| undefined`

### clearFormat

Effacer la configuration de format numérique

**Définition**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Retour**: `VBIMeasure`

# MeasureNodeBuilder

Builder de noeud de mesure pour configurer une seule mesure

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Retour**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - Position d encodage de mesure |

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

Definir la fonction d agregation

**Definition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - Configuration d agregation |

### setFormat

Definir le format numerique

**Definition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Configuration de format |

### getFormat

Obtenir le format numerique

**Definition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Retour**: `VBIMeasureFormat \| undefined`

### clearFormat

Effacer la configuration de format numerique

**Definition**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Retour**: `VBIMeasure`
# MeasuresBuilder

Builder de mesures pour ajouter, modifier et supprimer la configuration des mesures. Les mesures sont des champs numériques, par exemple les ventes, le profit ou la quantité

## Propriétés

## Méthodes

### constructor

**Définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

Ajouter une mesure

**Définition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `field` | string | - Nom du champ |
| `callback` | (node: MeasureNodeBuilder) => void | - Fonction de rappel |

### remove

Supprimer la mesure avec l'ID indiqué

**Définition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de mesure |

### update

Mettre à jour la configuration de mesure

**Définition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour**: `MeasuresBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - ID de mesure |
| `callback` | (node: MeasureNodeBuilder) => void | - Fonction de rappel |

### find

Trouver la première mesure selon une condition de callback, comme Array.find

**Définition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Retour**: `MeasureNodeBuilder \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Condition de recherche |

### findAll

Obtenir toutes les mesures

**Définition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Retour**: `MeasureNodeBuilder[]`

### toJSON

Exporter toutes les mesures en tableau JSON

**Définition**:

```typescript
toJSON(): VBIMeasure[]
```

**Retour**: `VBIMeasure[]`

### observe

Observer les changements de mesures

**Définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fonction de rappel |

### static isMeasureNode

**Définition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Retour**: `node is VBIMeasure`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Définition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Retour**: `node is VBIMeasureGroup`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

# LimitBuilder

Builder de limite de données pour définir et lire le limit courant

## Méthodes

### constructor

Constructeur

**Définition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Observer les changements de limit et renvoyer une fonction de désabonnement

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setLimit

Définir le limit

**Définition**:

```typescript
setLimit(limit: number)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `limit` | number | - Limite de données |

### getLimit

Obtenir le limit courant

**Définition**:

```typescript
getLimit(): number | undefined
```

**Retour**: `number \| undefined`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): number | undefined
```

**Retour**: `number \| undefined`

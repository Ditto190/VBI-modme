# LimitBuilder

Builder de limite de donnees pour definir et lire le limit courant

## Proprietes

## Methodes

### constructor

Constructeur

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Observer les changements de limit et renvoyer une fonction de desabonnement

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setLimit

Definir le limit

**Definition**:

```typescript
setLimit(limit: number)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `limit` | number | - Limite de donnees |

### getLimit

Obtenir le limit courant

**Definition**:

```typescript
getLimit(): number | undefined
```

**Retour**: `number \| undefined`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): number | undefined
```

**Retour**: `number \| undefined`
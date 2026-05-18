# LocaleBuilder

Builder de locale pour définir et lire la locale courante

## Propriétés

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

Observer les changements de locale et renvoyer une fonction de désabonnement

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setLocale

Définir la locale

**Définition**:

```typescript
setLocale(locale: string)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `locale` | string | - Nom de locale |

### getLocale

Obtenir la locale courante

**Définition**:

```typescript
getLocale(): string
```

**Retour**: `string`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): string
```

**Retour**: `string`

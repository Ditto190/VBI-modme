# LocaleBuilder

Builder de locale pour definir et lire la locale courante

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

Observer les changements de locale et renvoyer une fonction de desabonnement

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setLocale

Definir la locale

**Definition**:

```typescript
setLocale(locale: string)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `locale` | string | - Nom de locale |

### getLocale

Obtenir la locale courante

**Definition**:

```typescript
getLocale(): string
```

**Retour**: `string`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): string
```

**Retour**: `string`
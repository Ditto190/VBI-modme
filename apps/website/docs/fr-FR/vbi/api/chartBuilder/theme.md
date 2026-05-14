# ThemeBuilder

Builder de theme pour definir et lire le theme courant

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

Observer les changements de theme et renvoyer une fonction de desabonnement

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setTheme

Definir le theme

**Definition**:

```typescript
setTheme(theme: string)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nom du theme |

### getTheme

Obtenir le theme courant

**Definition**:

```typescript
getTheme(): string
```

**Retour**: `string`

### toJSON

Exporter en JSON

**Definition**:

```typescript
toJSON(): string
```

**Retour**: `string`
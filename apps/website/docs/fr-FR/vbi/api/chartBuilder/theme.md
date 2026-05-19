# ThemeBuilder

Builder de thème pour définir et lire le thème courant

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

Observer les changements de thème et renvoyer une fonction de désabonnement

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel |

### setTheme

Définir le thème

**Définition**:

```typescript
setTheme(theme: string)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nom du thème |

### getTheme

Obtenir le thème courant

**Définition**:

```typescript
getTheme(): string
```

**Retour**: `string`

### toJSON

Exporter en JSON

**Définition**:

```typescript
toJSON(): string
```

**Retour**: `string`

# VBI.resources.insight

L'espace de noms des ressources insight sur une instance VBI.

## Méthodes

### register

Enregistre une ressource insight unique.

**Définition**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**Retour**: `VBIInsightDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

Récupère le DSL d'une ressource insight enregistrée.

**Définition**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**Retour**: `VBIInsightDSL \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### list

Récupère tous les DSL des ressources insight enregistrées.

**Définition**:

```typescript
list(): VBIInsightDSL[]
```

**Retour**: `VBIInsightDSL[]`

### has

Détermine si la ressource insight spécifiée a été enregistrée.

**Définition**:

```typescript
has(uuid: string): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

Désenregistre la ressource insight spécifiée.

**Définition**:

```typescript
unregister(uuid: string): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

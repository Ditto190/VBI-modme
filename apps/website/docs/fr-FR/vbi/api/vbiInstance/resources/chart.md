# VBI.resources.chart

L'espace de noms des ressources chart sur une instance VBI.

## Méthodes

### register

Enregistre une ressource chart unique.

**Définition**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**Retour**: `VBIChartDSL`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

Récupère le DSL d'une ressource chart enregistrée.

**Définition**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**Retour**: `VBIChartDSL \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### list

Récupère tous les DSL des ressources chart enregistrées.

**Définition**:

```typescript
list(): VBIChartDSL[]
```

**Retour**: `VBIChartDSL[]`

### has

Détermine si la ressource chart spécifiée a été enregistrée.

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

Désenregistre la ressource chart spécifiée.

**Définition**:

```typescript
unregister(uuid: string): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

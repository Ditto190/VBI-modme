# VBI.connectors

L'espace de noms des connecteurs sur une instance VBI.

## Méthodes

### register

Enregistre un connecteur.

**Définition**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**Retour**: `void`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

Récupère un connecteur.

**Définition**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**Retour**: `Promise<VBIConnector>`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

Détermine si le connecteur a été enregistré.

**Définition**:

```typescript
has(id: VBIConnectorId): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

Désenregistre un connecteur.

**Définition**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**Retour**: `boolean`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

Fonction factory qui crée paresseusement un VBIConnector.

**Définition**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

Valeur de connecteur pouvant être enregistrée sur une instance VBI, avec prise en charge d'un connecteur direct ou d'une factory asynchrone.

**Définition**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```

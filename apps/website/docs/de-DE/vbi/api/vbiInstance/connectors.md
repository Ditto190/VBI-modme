# VBI.connectors

Der Connector-Namespace auf einer VBI-Instanz.

## Methoden

### register

Registriert einen Connector.

**Definition**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

Ruft einen Connector ab.

**Definition**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**Rückgabe**: `Promise<VBIConnector>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

Prüft, ob ein Connector registriert wurde.

**Definition**:

```typescript
has(id: VBIConnectorId): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

Hebt die Registrierung eines Connectors auf.

**Definition**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

Eine Factory-Funktion, die einen VBIConnector verzögert erstellt.

**Definition**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

Ein Connector-Wert, der auf einer VBI-Instanz registriert werden kann und entweder einen direkten Connector oder eine asynchrone Factory unterstützt.

**Definition**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```

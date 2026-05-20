# VBI.connectors

The connector namespace on a VBI instance.

## Methods

### register

Registers a connector.

**Definition**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**Returns**: `void`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

Gets a connector.

**Definition**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**Returns**: `Promise<VBIConnector>`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

Checks whether a connector has been registered.

**Definition**:

```typescript
has(id: VBIConnectorId): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

Unregisters a connector.

**Definition**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

A factory function that lazily creates a VBIConnector.

**Definition**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

A connector value that can be registered on a VBI instance, supporting either a direct connector or an async factory.

**Definition**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```

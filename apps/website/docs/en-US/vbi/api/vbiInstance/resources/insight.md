# VBI.resources.insight

The insight resource namespace on a VBI instance.

## Methods

### register

Registers a single insight resource.

**Definition**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**Returns**: `VBIInsightDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

Gets a registered insight resource DSL.

**Definition**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**Returns**: `VBIInsightDSL \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### list

Gets all registered insight resource DSLs.

**Definition**:

```typescript
list(): VBIInsightDSL[]
```

**Returns**: `VBIInsightDSL[]`

### has

Checks whether the specified insight resource has been registered.

**Definition**:

```typescript
has(uuid: string): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

Unregisters the specified insight resource.

**Definition**:

```typescript
unregister(uuid: string): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

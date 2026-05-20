# VBI.resources.chart

The chart resource namespace on a VBI instance.

## Methods

### register

Registers a single chart resource.

**Definition**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**Returns**: `VBIChartDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

Gets a registered chart resource DSL.

**Definition**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**Returns**: `VBIChartDSL \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

### list

Gets all registered chart resource DSLs.

**Definition**:

```typescript
list(): VBIChartDSL[]
```

**Returns**: `VBIChartDSL[]`

### has

Checks whether the specified chart resource has been registered.

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

Unregisters the specified chart resource.

**Definition**:

```typescript
unregister(uuid: string): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid` | string | - |

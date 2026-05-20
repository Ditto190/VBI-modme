# VBI.insight

The insight namespace on a VBI instance, responsible for creating Insight Builders and empty insight DSLs.

## Methods

### create

Creates a VBIInsightBuilder from an insight DSL.

**Definition**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**Returns**: `VBIInsightBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

Creates an empty insight DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**Returns**: `VBIInsightDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |

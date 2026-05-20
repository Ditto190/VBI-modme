# VBI.chart

The chart namespace on a VBI instance, responsible for creating chart builders and empty chart DSLs.

## Methods

### create

Creates a VBIChartBuilder from a chart DSL.

**Definition**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Creates a minimal usable chart DSL.

**Definition**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**Returns**: `VBIChartDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |

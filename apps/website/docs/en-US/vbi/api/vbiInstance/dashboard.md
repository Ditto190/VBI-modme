# VBI.dashboard

The dashboard namespace on a VBI instance, responsible for creating Dashboard Builders and empty dashboard DSLs.

## Methods

### create

Creates a VBIDashboardBuilder from a dashboard DSL.

**Definition**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Creates an empty dashboard DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**Returns**: `VBIDashboardDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |

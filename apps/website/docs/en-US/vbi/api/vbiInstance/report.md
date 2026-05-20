# VBI.report

The report namespace on a VBI instance, responsible for creating Report Builders, empty reports, and empty pages.

## Methods

### create

Creates a VBIReportBuilder from a report DSL.

**Definition**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

Creates an empty report DSL.

**Definition**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**Returns**: `VBIReportDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

Creates an empty report page DSL.

**Definition**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**Returns**: `VBIReportPageDSL`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `pageId?` | string | - |

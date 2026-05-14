# ReportPageBuilder

## Properties

## Methods

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Definition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Definition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Returns**: `VBIReportPageDSL`
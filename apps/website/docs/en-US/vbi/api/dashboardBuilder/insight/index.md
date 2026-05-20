# DashboardInsightCollectionBuilder

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**Definition**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Returns**: `TDashboardBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Definition**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Returns**: `TDashboardBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Definition**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**Returns**: `TDashboardBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**Definition**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Definition**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Definition**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**Returns**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Returns**: `VBIDashboardWidget[]`

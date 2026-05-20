# DashboardChartCollectionBuilder

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
add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Returns**: `TDashboardBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Definition**:

```typescript
update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Returns**: `TDashboardBuilder`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

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
get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Definition**:

```typescript
find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Definition**:

```typescript
findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[]
```

**Returns**: `DashboardChartBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Returns**: `VBIDashboardWidget[]`

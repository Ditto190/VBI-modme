# DashboardInsightCollectionBuilder

## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**定义**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**定义**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**定义**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**定义**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**定义**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - |

### findAll

**定义**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**定义**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**返回**: `VBIDashboardWidget[]`
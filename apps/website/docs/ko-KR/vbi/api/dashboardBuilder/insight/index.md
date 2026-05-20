# DashboardInsightCollectionBuilder

## 메서드

### constructor

**정의**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**정의**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**반환**: `TDashboardBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**정의**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**반환**: `TDashboardBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**정의**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**반환**: `TDashboardBuilder`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**정의**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**반환**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**정의**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**반환**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | - |

### findAll

**정의**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**반환**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**정의**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**반환**: `VBIDashboardWidget[]`

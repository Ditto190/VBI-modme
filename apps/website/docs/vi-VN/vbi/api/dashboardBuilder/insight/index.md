# DashboardInsightCollectionBuilder

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**Định nghĩa**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Trả về**: `TDashboardBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Định nghĩa**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Trả về**: `TDashboardBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Định nghĩa**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**Trả về**: `TDashboardBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**Định nghĩa**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Định nghĩa**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Định nghĩa**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**Trả về**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Định nghĩa**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Trả về**: `VBIDashboardWidget[]`

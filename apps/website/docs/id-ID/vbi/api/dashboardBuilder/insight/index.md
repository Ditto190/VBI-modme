# DashboardInsightCollectionBuilder

## Metode

### constructor

**Definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**Definisi**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Mengembalikan**: `TDashboardBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Definisi**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Mengembalikan**: `TDashboardBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Definisi**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**Mengembalikan**: `TDashboardBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**Definisi**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Definisi**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Definisi**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**Mengembalikan**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Definisi**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Mengembalikan**: `VBIDashboardWidget[]`

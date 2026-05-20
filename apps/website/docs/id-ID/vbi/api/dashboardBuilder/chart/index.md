# DashboardChartCollectionBuilder

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
add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Mengembalikan**: `TDashboardBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Definisi**:

```typescript
update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Mengembalikan**: `TDashboardBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

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
get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Definisi**:

```typescript
find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Definisi**:

```typescript
findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[]
```

**Mengembalikan**: `DashboardChartBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Definisi**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Mengembalikan**: `VBIDashboardWidget[]`

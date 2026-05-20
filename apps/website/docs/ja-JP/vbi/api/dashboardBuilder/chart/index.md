# DashboardChartCollectionBuilder

## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**定義**:

```typescript
add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**戻り値**: `TDashboardBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**定義**:

```typescript
update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**戻り値**: `TDashboardBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**定義**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**戻り値**: `TDashboardBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**定義**:

```typescript
get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**戻り値**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**定義**:

```typescript
find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**戻り値**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - |

### findAll

**定義**:

```typescript
findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[]
```

**戻り値**: `DashboardChartBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**定義**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**戻り値**: `VBIDashboardWidget[]`

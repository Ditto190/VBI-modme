# DashboardChartCollectionBuilder

## Méthodes

### constructor

**Définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

**Définition**:

```typescript
add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Retour**: `TDashboardBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Définition**:

```typescript
update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Retour**: `TDashboardBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

**Définition**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**Retour**: `TDashboardBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### get

**Définition**:

```typescript
get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Définition**:

```typescript
find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Définition**:

```typescript
findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[]
```

**Retour**: `DashboardChartBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Définition**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Retour**: `VBIDashboardWidget[]`

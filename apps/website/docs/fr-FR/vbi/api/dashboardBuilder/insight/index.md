# DashboardInsightCollectionBuilder

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
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Retour**: `TDashboardBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

**Définition**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**Retour**: `TDashboardBuilder`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

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
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widgetId` | string | - |

### find

**Définition**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `id` | string | - |

### findAll

**Définition**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**Retour**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

**Définition**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**Retour**: `VBIDashboardWidget[]`

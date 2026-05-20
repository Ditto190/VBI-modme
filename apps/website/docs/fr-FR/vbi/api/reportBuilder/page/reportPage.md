# ReportPageBuilder

## Méthodes

### constructor

**Définition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Définition**:

```typescript
getId(): string
```

**Retour**: `string`

### setTitle

**Définition**:

```typescript
setTitle(title: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Définition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Définition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Définition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Retour**: `VBIReportPageDSL`

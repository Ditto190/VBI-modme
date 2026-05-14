# ReportPageBuilder

## Proprietes

## Methodes

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Retour**: `string`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Definition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Retour**: `this`

**Parametres**:

| Parametre | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Definition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Retour**: `VBIReportPageDSL`
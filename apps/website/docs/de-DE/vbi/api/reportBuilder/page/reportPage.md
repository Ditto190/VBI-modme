# ReportPageBuilder

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Rueckgabe**: `string`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Definition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Rueckgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Definition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Rueckgabe**: `VBIReportPageDSL`
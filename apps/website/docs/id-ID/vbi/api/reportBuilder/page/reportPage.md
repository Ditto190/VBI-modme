# ReportPageBuilder

## Metode

### constructor

**Definisi**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Definisi**:

```typescript
getId(): string
```

**Mengembalikan**: `string`

### setTitle

**Definisi**:

```typescript
setTitle(title: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Definisi**:

```typescript
setChartId(chart: ResourceReference): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Definisi**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Definisi**:

```typescript
toJSON(): VBIReportPageDSL
```

**Mengembalikan**: `VBIReportPageDSL`

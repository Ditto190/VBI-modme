# ReportPageBuilder

## Thuoc tinh

## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Dinh nghia**:

```typescript
getId(): string
```

**Tra ve**: `string`

### setTitle

**Dinh nghia**:

```typescript
setTitle(title: string): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Dinh nghia**:

```typescript
setChartId(chart: ResourceReference): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Dinh nghia**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Dinh nghia**:

```typescript
toJSON(): VBIReportPageDSL
```

**Tra ve**: `VBIReportPageDSL`
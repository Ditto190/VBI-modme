# ReportPageBuilder

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `parent` | VBIReportBuilder<TQueryDSL, TSeedDSL> | - |
| `page` | Y.Map<any> | - |

### getId

**Định nghĩa**:

```typescript
getId(): string
```

**Trả về**: `string`

### setTitle

**Định nghĩa**:

```typescript
setTitle(title: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Định nghĩa**:

```typescript
setChartId(chart: ResourceReference): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Định nghĩa**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Định nghĩa**:

```typescript
toJSON(): VBIReportPageDSL
```

**Trả về**: `VBIReportPageDSL`

# ChartTypeBuilder

Builder loại chart dùng để chuyển đổi và lấy loại chart. Hỗ trợ bảng, cột, đường, tròn, phân tán và nhiều loại chart khác

## Thuộc tính

## Phương thức

### constructor

Hàm khởi tạo

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Lắng nghe thay đổi loại chart

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm callback |

### changeChartType

Thiết lập loại chart

**Định nghĩa**:

```typescript
changeChartType(chartType: string)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chartType` | string | - Loại chart |

### getChartType

Lấy loại chart hiện tại

**Định nghĩa**:

```typescript
getChartType(): string
```

**Trả về**: `string`

### getSupportedDimensionEncodings

Lấy encoding dimension mà loại chart hiện tại hỗ trợ

**Định nghĩa**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Trả về encoding dimension được đề xuất theo thứ tự dimension dựa trên loại chart hiện tại

**Định nghĩa**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `dimensionCount` | number | - Số lượng dimension; mặc định dùng số dimension trong DSL hiện tại |

### getSupportedMeasureEncodings

Lấy encoding measure mà loại chart hiện tại hỗ trợ

**Định nghĩa**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Trả về encoding measure được đề xuất theo thứ tự measure dựa trên loại chart hiện tại

**Định nghĩa**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `measureCount` | number | - Số lượng measure; mặc định dùng số measure trong DSL hiện tại |

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trả về**: `string`

### getAvailableChartTypes

Lấy tất cả loại chart được hỗ trợ

**Định nghĩa**:

```typescript
getAvailableChartTypes(): string[]
```

**Trả về**: `string[]`

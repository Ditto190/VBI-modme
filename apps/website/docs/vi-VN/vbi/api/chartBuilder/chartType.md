# ChartTypeBuilder

Builder loai chart dung de chuyen doi va lay loai chart. Ho tro bang, cot, duong, tron, phan tan va nhieu loai chart khac

## Thuoc tinh

## Phuong thuc

### constructor

Ham khoi tao

**Dinh nghia**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Lang nghe thay doi loai chart

**Dinh nghia**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveCallback | - Ham callback |

### changeChartType

Thiet lap loai chart

**Dinh nghia**:

```typescript
changeChartType(chartType: string)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `chartType` | string | - Loai chart |

### getChartType

Lay loai chart hien tai

**Dinh nghia**:

```typescript
getChartType(): string
```

**Tra ve**: `string`

### getSupportedDimensionEncodings

Lay encoding dimension ma loai chart hien tai ho tro

**Dinh nghia**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Tra ve encoding dimension duoc de xuat theo thu tu dimension dua tren loai chart hien tai

**Dinh nghia**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `dimensionCount` | number | - So luong dimension; mac dinh dung so dimension trong DSL hien tai |

### getSupportedMeasureEncodings

Lay encoding measure ma loai chart hien tai ho tro

**Dinh nghia**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Tra ve encoding measure duoc de xuat theo thu tu measure dua tren loai chart hien tai

**Dinh nghia**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `measureCount` | number | - So luong measure; mac dinh dung so measure trong DSL hien tai |

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): string
```

**Tra ve**: `string`

### getAvailableChartTypes

Lay tat ca loai chart duoc ho tro

**Dinh nghia**:

```typescript
getAvailableChartTypes(): string[]
```

**Tra ve**: `string[]`
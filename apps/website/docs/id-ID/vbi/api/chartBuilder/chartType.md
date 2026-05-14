# ChartTypeBuilder

Builder tipe chart untuk mengganti dan mengambil tipe chart. Mendukung table, bar, line, pie, scatter, dan berbagai tipe chart lain

## Properti

## Metode

### constructor

Konstruktor

**Definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Memantau perubahan tipe chart

**Definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fungsi callback |

### changeChartType

Mengatur tipe chart

**Definisi**:

```typescript
changeChartType(chartType: string)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chartType` | string | - Tipe chart |

### getChartType

Mengambil tipe chart saat ini

**Definisi**:

```typescript
getChartType(): string
```

**Mengembalikan**: `string`

### getSupportedDimensionEncodings

Mengambil encoding dimensi yang didukung tipe chart saat ini

**Definisi**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Mengembalikan encoding dimensi yang direkomendasikan menurut urutan dimensi berdasarkan tipe chart saat ini

**Definisi**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `dimensionCount` | number | - Jumlah dimensi; default memakai jumlah dimensi dalam DSL saat ini |

### getSupportedMeasureEncodings

Mengambil encoding measure yang didukung tipe chart saat ini

**Definisi**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Mengembalikan encoding measure yang direkomendasikan menurut urutan measure berdasarkan tipe chart saat ini

**Definisi**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `measureCount` | number | - Jumlah measure; default memakai jumlah measure dalam DSL saat ini |

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): string
```

**Mengembalikan**: `string`

### getAvailableChartTypes

Mengambil semua tipe chart yang didukung

**Definisi**:

```typescript
getAvailableChartTypes(): string[]
```

**Mengembalikan**: `string[]`
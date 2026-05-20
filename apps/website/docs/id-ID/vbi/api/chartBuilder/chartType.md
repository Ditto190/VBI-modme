# ChartTypeBuilder

Builder jenis chart untuk mengganti dan mengambil jenis chart. Mendukung tabel, bar, line, pie, scatter, dan berbagai jenis chart lain

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

Memantau perubahan jenis chart

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

Mengatur jenis chart

**Definisi**:

```typescript
changeChartType(chartType: string)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chartType` | string | - Jenis chart |

### getChartType

Mengambil jenis chart saat ini

**Definisi**:

```typescript
getChartType(): string
```

**Mengembalikan**: `string`

### getSupportedDimensionEncodings

Mengambil encoding dimensi yang didukung jenis chart saat ini

**Definisi**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Mengembalikan encoding dimensi yang direkomendasikan menurut urutan dimensi berdasarkan jenis chart saat ini

**Definisi**:

```typescript
getRecommendedDimensionEncodings(dimensionCount?: number)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `dimensionCount?` | number | - Jumlah dimensi; default memakai jumlah dimensi dalam DSL saat ini |

### getSupportedMeasureEncodings

Mengambil encoding measure yang didukung jenis chart saat ini

**Definisi**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Mengembalikan encoding measure yang direkomendasikan menurut urutan measure berdasarkan jenis chart saat ini

**Definisi**:

```typescript
getRecommendedMeasureEncodings(measureCount?: number)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `measureCount?` | number | - Jumlah measure; default memakai jumlah measure dalam DSL saat ini |

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): string
```

**Mengembalikan**: `string`

### getAvailableChartTypes

Mengambil semua jenis chart yang didukung

**Definisi**:

```typescript
getAvailableChartTypes(): string[]
```

**Mengembalikan**: `string[]`

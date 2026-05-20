# VBI.resources.chart

Namespace resource chart pada instans VBI.

## Metode

### register

Mendaftarkan satu resource chart.

**Definisi**:

```typescript
register(chart: VBIChartDSLInput): VBIChartDSL
```

**Mengembalikan**: `VBIChartDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chart` | VBIChartDSLInput | - |

### get

Mengambil DSL resource chart yang sudah terdaftar.

**Definisi**:

```typescript
get(uuid: string): VBIChartDSL | undefined
```

**Mengembalikan**: `VBIChartDSL \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid` | string | - |

### list

Mengambil semua DSL resource chart yang sudah terdaftar.

**Definisi**:

```typescript
list(): VBIChartDSL[]
```

**Mengembalikan**: `VBIChartDSL[]`

### has

Memeriksa apakah resource chart tertentu sudah terdaftar.

**Definisi**:

```typescript
has(uuid: string): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid` | string | - |

### unregister

Membatalkan pendaftaran resource chart tertentu.

**Definisi**:

```typescript
unregister(uuid: string): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid` | string | - |

# VBI.resources.insight

Namespace resource insight pada instans VBI.

## Metode

### register

Mendaftarkan satu resource insight.

**Definisi**:

```typescript
register(insight: VBIInsightDSLInput): VBIInsightDSL
```

**Mengembalikan**: `VBIInsightDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### get

Mengambil DSL resource insight yang sudah terdaftar.

**Definisi**:

```typescript
get(uuid: string): VBIInsightDSL | undefined
```

**Mengembalikan**: `VBIInsightDSL \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid` | string | - |

### list

Mengambil semua DSL resource insight yang sudah terdaftar.

**Definisi**:

```typescript
list(): VBIInsightDSL[]
```

**Mengembalikan**: `VBIInsightDSL[]`

### has

Memeriksa apakah resource insight tertentu sudah terdaftar.

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

Membatalkan pendaftaran resource insight tertentu.

**Definisi**:

```typescript
unregister(uuid: string): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid` | string | - |

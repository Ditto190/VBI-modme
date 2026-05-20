# MeasureNodeBuilder

Builder node measure untuk mengonfigurasi satu measure

## Metode

### constructor

**Definisi**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

Mengambil ID node

**Definisi**:

```typescript
getId(): string
```

**Mengembalikan**: `string`

### getField

Mengambil nama field

**Definisi**:

```typescript
getField(): string
```

**Mengembalikan**: `string`

### getEncoding

Mengambil posisi encoding chart

**Definisi**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Mengembalikan**: `VBIMeasure['encoding'] \| undefined`

### getSort

Mengambil konfigurasi sort

**Definisi**:

```typescript
getSort(): VBISort | undefined
```

**Mengembalikan**: `VBISort \| undefined`

### setAlias

Mengatur nama tampilan

**Definisi**:

```typescript
setAlias(alias: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `alias` | string | - Nama tampilan |

### setEncoding

Mengatur posisi encoding chart

**Definisi**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - Posisi encoding measure |

### setSort

Mengatur konfigurasi sort

**Definisi**:

```typescript
setSort(sort: VBISort): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `sort` | VBISort | - Konfigurasi sort |

### setAggregate

Mengatur fungsi agregasi

**Definisi**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - Konfigurasi agregasi |

### setFormat

Mengatur format angka

**Definisi**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Konfigurasi format |

### getFormat

Mengambil format angka

**Definisi**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Mengembalikan**: `VBIMeasureFormat \| undefined`

### clearFormat

Menghapus konfigurasi format angka

**Definisi**:

```typescript
clearFormat(): this
```

**Mengembalikan**: `this`

### clearSort

Menghapus konfigurasi sort

**Definisi**:

```typescript
clearSort(): this
```

**Mengembalikan**: `this`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): VBIMeasure
```

**Mengembalikan**: `VBIMeasure`

# DimensionNodeBuilder

Builder node dimensi untuk mengonfigurasi satu dimensi

## Properti

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
getEncoding(): VBIDimension['encoding'] | undefined
```

**Mengembalikan**: `VBIDimension['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Posisi encoding dimensi |

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

Mengatur fungsi agregasi tanggal

**Definisi**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Konfigurasi agregasi tanggal |

### clearAggregate

Menghapus fungsi agregasi tanggal

**Definisi**:

```typescript
clearAggregate(): this
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
toJSON(): VBIDimension
```

**Mengembalikan**: `VBIDimension`
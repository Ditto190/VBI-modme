# HavingFilterBuilder

Builder filter Having untuk menambah, mengubah, dan menghapus kondisi filter setelah pengelompokan. Filter Having berlaku setelah agregasi data dan digunakan untuk memfilter hasil grup

## Metode

### constructor

**Definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### getConditions

**Definisi**:

```typescript
getConditions(): Y.Array<any>
```

**Mengembalikan**: `Y.Array<any>`

### add

Menambahkan kondisi filter Having

**Definisi**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Mengembalikan**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fungsi callback |

### addGroup

Menambahkan grup Having

**Definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Mengembalikan**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operator logika |
| `callback` | (group: HavingGroupBuilder) => void | - Fungsi callback |

### update

Memperbarui kondisi filter dengan ID tertentu

**Definisi**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Mengembalikan**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID kondisi filter |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Fungsi callback |

### updateGroup

Memperbarui grup dengan ID tertentu

**Definisi**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Mengembalikan**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID grup |
| `callback` | (group: HavingGroupBuilder) => void | - Fungsi callback |

### remove

Menghapus kondisi dengan ID tertentu atau item pada indeks tertentu

**Definisi**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Mengembalikan**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### find

Mencari kondisi pertama (filter atau grup) berdasarkan callback, sama seperti Array.find

**Definisi**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Mengembalikan**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Kondisi pencarian |

### clear

Mengosongkan semua kondisi filter Having

**Definisi**:

```typescript
clear()
```

### toJSON

Mengekspor konfigurasi filter Having lengkap

**Definisi**:

```typescript
toJSON(): VBIHavingGroup
```

**Mengembalikan**: `VBIHavingGroup`

### observe

Memantau perubahan kondisi filter dan mengembalikan fungsi berhenti memantau

**Definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fungsi callback |

### static isGroup

Menentukan apakah node adalah node grup

**Definisi**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Menentukan apakah node adalah node leaf

**Definisi**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

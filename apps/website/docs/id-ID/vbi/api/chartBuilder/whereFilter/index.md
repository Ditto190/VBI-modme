# WhereFilterBuilder

Builder filter Where untuk menambah, mengubah, dan menghapus kondisi filter tingkat baris. Filter Where berlaku sebelum query data dan digunakan untuk memfilter data mentah

## Properti

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

Menambahkan kondisi filter Where

**Definisi**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Mengembalikan**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fungsi callback |

### addGroup

Menambahkan grup Where

**Definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Mengembalikan**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operator logika |
| `callback` | (group: WhereGroupBuilder) => void | - Fungsi callback |

### update

Memperbarui kondisi filter dengan ID tertentu

**Definisi**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Mengembalikan**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID kondisi filter |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fungsi callback |

### updateGroup

Memperbarui grup dengan ID tertentu

**Definisi**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Mengembalikan**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID grup |
| `callback` | (group: WhereGroupBuilder) => void | - Fungsi callback |

### remove

Menghapus kondisi dengan ID tertentu atau item pada indeks tertentu

**Definisi**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Mengembalikan**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### find

Mencari kondisi pertama (filter atau grup) berdasarkan callback, sama seperti Array.find

**Definisi**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Mengembalikan**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Kondisi pencarian |

### clear

Mengosongkan semua kondisi filter Where

**Definisi**:

```typescript
clear()
```

### toJSON

Mengekspor konfigurasi filter Where lengkap

**Definisi**:

```typescript
toJSON(): VBIWhereGroup
```

**Mengembalikan**: `VBIWhereGroup`

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
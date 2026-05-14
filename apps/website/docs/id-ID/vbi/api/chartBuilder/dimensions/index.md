# DimensionsBuilder

Builder dimensi untuk menambah, mengubah, dan menghapus konfigurasi dimensi. Dimensi adalah field kategori dalam data, seperti waktu, wilayah, atau kategori produk

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

### add

Menambahkan dimensi

**Definisi**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Mengembalikan**: `DimensionsBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |
| `callback` | (node: DimensionNodeBuilder) => void | - Fungsi callback |

### remove

Menghapus dimensi dengan ID tertentu

**Definisi**:

```typescript
remove(id: string): DimensionsBuilder
```

**Mengembalikan**: `DimensionsBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID dimensi |

### update

Memperbarui konfigurasi dimensi dengan ID tertentu

**Definisi**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Mengembalikan**: `DimensionsBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID dimensi |
| `callback` | (node: DimensionNodeBuilder) => void | - Fungsi callback |

### find

Mencari dimensi pertama berdasarkan kondisi callback, sama seperti Array.find

**Definisi**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Mengembalikan**: `DimensionNodeBuilder \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Kondisi pencarian |

### findAll

Mengambil semua dimensi

**Definisi**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Mengembalikan**: `DimensionNodeBuilder[]`

### toJSON

Mengekspor semua dimensi sebagai array JSON

**Definisi**:

```typescript
toJSON(): VBIDimension[]
```

**Mengembalikan**: `VBIDimension[]`

### observe

Memantau perubahan dimensi dan mengembalikan fungsi berhenti memantau

**Definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fungsi callback |

### static isDimensionNode

**Definisi**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Mengembalikan**: `node is VBIDimension`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Definisi**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Mengembalikan**: `node is VBIDimensionGroup`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |
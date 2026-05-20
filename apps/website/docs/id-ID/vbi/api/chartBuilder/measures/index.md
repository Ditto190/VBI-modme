# MeasuresBuilder

Builder measure untuk menambah, mengubah, dan menghapus konfigurasi measure. Measure adalah field numerik dalam data, seperti penjualan, laba, atau jumlah

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

Menambahkan measure

**Definisi**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Mengembalikan**: `MeasuresBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |
| `callback` | (node: MeasureNodeBuilder) => void | - Fungsi callback |

### remove

Menghapus measure dengan ID tertentu

**Definisi**:

```typescript
remove(id: string): MeasuresBuilder
```

**Mengembalikan**: `MeasuresBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID measure |

### update

Memperbarui konfigurasi measure

**Definisi**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Mengembalikan**: `MeasuresBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - ID measure |
| `callback` | (node: MeasureNodeBuilder) => void | - Fungsi callback |

### find

Mencari measure pertama berdasarkan kondisi callback, sama seperti Array.find

**Definisi**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Mengembalikan**: `MeasureNodeBuilder \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Kondisi pencarian |

### findAll

Mengambil semua measure

**Definisi**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Mengembalikan**: `MeasureNodeBuilder[]`

### toJSON

Mengekspor semua measure sebagai array JSON

**Definisi**:

```typescript
toJSON(): VBIMeasure[]
```

**Mengembalikan**: `VBIMeasure[]`

### observe

Memantau perubahan measure

**Definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Fungsi callback |

### static isMeasureNode

**Definisi**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Mengembalikan**: `node is VBIMeasure`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Definisi**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Mengembalikan**: `node is VBIMeasureGroup`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

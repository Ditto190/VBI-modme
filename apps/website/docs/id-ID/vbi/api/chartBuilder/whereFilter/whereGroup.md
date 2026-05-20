# WhereGroupBuilder

Builder grup Where untuk mengonfigurasi relasi logika (AND/OR) dari sekelompok kondisi

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

### getConditions

**Definisi**:

```typescript
getConditions(): Y.Array<any>
```

**Mengembalikan**: `Y.Array<any>`

### getId

Mengambil ID grup

**Definisi**:

```typescript
getId(): string
```

**Mengembalikan**: `string`

### getOperator

Mengambil operator logika

**Definisi**:

```typescript
getOperator(): 'and' | 'or'
```

**Mengembalikan**: `'and' \| 'or'`

### setOperator

Mengatur operator logika

**Definisi**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operator logika |

### add

Menambahkan kondisi filter Where ke grup

**Definisi**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Fungsi callback |

### addGroup

Menambahkan grup bersarang ke grup saat ini

**Definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Operator logika |
| `callback` | (group: WhereGroupBuilder) => void | - Fungsi callback |

### remove

Menghapus kondisi dengan ID tertentu atau item pada indeks tertentu

**Definisi**:

```typescript
remove(idOrIndex: string | number): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### clear

Mengosongkan semua kondisi dalam grup

**Definisi**:

```typescript
clear(): this
```

**Mengembalikan**: `this`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): VBIWhereGroup
```

**Mengembalikan**: `VBIWhereGroup`

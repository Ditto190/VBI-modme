# LimitBuilder

Builder batas data untuk mengatur dan mengambil limit saat ini

## Metode

### constructor

Konstruktor

**Definisi**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Memantau perubahan limit dan mengembalikan fungsi berhenti memantau

**Definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fungsi callback |

### setLimit

Mengatur limit

**Definisi**:

```typescript
setLimit(limit: number)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `limit` | number | - Batas data |

### getLimit

Mengambil limit saat ini

**Definisi**:

```typescript
getLimit(): number | undefined
```

**Mengembalikan**: `number \| undefined`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): number | undefined
```

**Mengembalikan**: `number \| undefined`

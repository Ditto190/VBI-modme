# LocaleBuilder

Builder locale untuk mengatur dan mengambil locale saat ini

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

Memantau perubahan locale dan mengembalikan fungsi berhenti memantau

**Definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fungsi callback |

### setLocale

Mengatur locale

**Definisi**:

```typescript
setLocale(locale: string)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `locale` | string | - Nama locale |

### getLocale

Mengambil locale saat ini

**Definisi**:

```typescript
getLocale(): string
```

**Mengembalikan**: `string`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): string
```

**Mengembalikan**: `string`

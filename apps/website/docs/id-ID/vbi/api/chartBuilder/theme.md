# ThemeBuilder

Builder tema untuk mengatur dan mengambil tema saat ini

## Properti

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

Memantau perubahan tema dan mengembalikan fungsi berhenti memantau

**Definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Mengembalikan**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fungsi callback |

### setTheme

Mengatur tema

**Definisi**:

```typescript
setTheme(theme: string)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme` | string | - Nama tema |

### getTheme

Mengambil tema saat ini

**Definisi**:

```typescript
getTheme(): string
```

**Mengembalikan**: `string`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): string
```

**Mengembalikan**: `string`
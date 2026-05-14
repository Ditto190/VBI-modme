# WhereFilterNodeBuilder

Builder node filter Where untuk mengonfigurasi satu kondisi filter Where

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

### setField

Mengatur nama field

**Definisi**:

```typescript
setField(field: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - Nama field |

### getOperator

Mengambil operator filter

**Definisi**:

```typescript
getOperator(): string | undefined
```

**Mengembalikan**: `string \| undefined`

### setOperator

Mengatur operator filter

**Definisi**:

```typescript
setOperator(operator: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `operator` | string | - Operator |

### setValue

Mengatur nilai filter

**Definisi**:

```typescript
setValue(value: unknown): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `value` | unknown | - Nilai filter |

### setDate

Mengatur kondisi filter tanggal

**Definisi**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Predikat tanggal |

### getDate

Mengambil kondisi filter tanggal; filter non-tanggal mengembalikan undefined

**Definisi**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Mengembalikan**: `VBIWhereDatePredicate \| undefined`

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): VBIWhereFilter
```

**Mengembalikan**: `VBIWhereFilter`
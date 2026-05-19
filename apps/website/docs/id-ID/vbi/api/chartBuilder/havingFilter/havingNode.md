# HavingFilterNodeBuilder

Builder node filter Having untuk mengonfigurasi satu kondisi filter Having

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

### getOperator

Mengambil operator filter

**Definisi**:

```typescript
getOperator(): string | undefined
```

**Mengembalikan**: `string \| undefined`

### getAggregate

Mengambil konfigurasi agregasi

**Definisi**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Mengembalikan**: `VBIHavingAggregate \| undefined`

### setValue

Mengatur nilai kondisi filter

**Definisi**:

```typescript
setValue(value: unknown): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `value` | unknown | - Nilai filter |

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

### setAggregate

Mengatur konfigurasi agregasi

**Definisi**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Konfigurasi agregasi |

### toJSON

Ekspor sebagai JSON

**Definisi**:

```typescript
toJSON(): VBIHavingFilter
```

**Mengembalikan**: `VBIHavingFilter`

# WhereFilterNodeBuilder

Builder node lọc Where, dùng để cấu hình một điều kiện lọc Where

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

Lấy ID node

**Định nghĩa**:

```typescript
getId(): string
```

**Trả về**: `string`

### getField

Lấy tên field

**Định nghĩa**:

```typescript
getField(): string
```

**Trả về**: `string`

### setField

Thiết lập tên field

**Định nghĩa**:

```typescript
setField(field: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `field` | string | - Tên field |

### getOperator

Lấy toán tử lọc

**Định nghĩa**:

```typescript
getOperator(): string | undefined
```

**Trả về**: `string \| undefined`

### setOperator

Thiết lập toán tử lọc

**Định nghĩa**:

```typescript
setOperator(operator: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `operator` | string | - Toán tử |

### setValue

Thiết lập giá trị lọc

**Định nghĩa**:

```typescript
setValue(value: unknown): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `value` | unknown | - Giá trị lọc |

### setDate

Thiết lập điều kiện lọc ngày

**Định nghĩa**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Predicate ngày |

### getDate

Lấy điều kiện lọc ngày; lọc không phải ngày trả về undefined

**Định nghĩa**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Trả về**: `VBIWhereDatePredicate \| undefined`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): VBIWhereFilter
```

**Trả về**: `VBIWhereFilter`

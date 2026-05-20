# HavingFilterNodeBuilder

Builder node lọc Having dùng để cấu hình một điều kiện lọc Having

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

### getOperator

Lấy toán tử lọc

**Định nghĩa**:

```typescript
getOperator(): string | undefined
```

**Trả về**: `string \| undefined`

### getAggregate

Lấy cấu hình tổng hợp

**Định nghĩa**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Trả về**: `VBIHavingAggregate \| undefined`

### setValue

Thiết lập giá trị của điều kiện lọc

**Định nghĩa**:

```typescript
setValue(value: unknown): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `value` | unknown | - Giá trị lọc |

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

### setAggregate

Thiết lập cấu hình tổng hợp

**Định nghĩa**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Cấu hình tổng hợp |

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): VBIHavingFilter
```

**Trả về**: `VBIHavingFilter`

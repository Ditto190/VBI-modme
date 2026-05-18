# HavingGroupBuilder

Builder nhóm Having dùng để cấu hình quan hệ logic (AND/OR) của một nhóm điều kiện

## Thuộc tính

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

### getConditions

**Định nghĩa**:

```typescript
getConditions(): Y.Array<any>
```

**Trả về**: `Y.Array<any>`

### getId

Lấy ID nhóm

**Định nghĩa**:

```typescript
getId(): string
```

**Trả về**: `string`

### getOperator

Lấy toán tử logic

**Định nghĩa**:

```typescript
getOperator(): 'and' | 'or'
```

**Trả về**: `'and' \| 'or'`

### setOperator

Thiết lập toán tử logic

**Định nghĩa**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic |

### add

Thêm một điều kiện lọc Having vào nhóm

**Định nghĩa**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `field` | string | - Tên field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Hàm callback |

### addGroup

Thêm một nhóm lồng vào nhóm hiện tại

**Định nghĩa**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic |
| `callback` | (group: HavingGroupBuilder) => void | - Hàm callback |

### remove

Xóa điều kiện có ID chỉ định hoặc mục tại index chỉ định

**Định nghĩa**:

```typescript
remove(idOrIndex: string | number): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoặc index |

### clear

Xóa tất cả điều kiện trong nhóm

**Định nghĩa**:

```typescript
clear(): this
```

**Trả về**: `this`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): VBIHavingGroup
```

**Trả về**: `VBIHavingGroup`

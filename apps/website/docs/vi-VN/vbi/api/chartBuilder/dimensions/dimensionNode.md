# DimensionNodeBuilder

Builder node dimension dùng để cấu hình một dimension

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

### getEncoding

Lấy vị trí encoding chart

**Định nghĩa**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Trả về**: `VBIDimension['encoding'] \| undefined`

### getSort

Lấy cấu hình sắp xếp

**Định nghĩa**:

```typescript
getSort(): VBISort | undefined
```

**Trả về**: `VBISort \| undefined`

### setAlias

Thiết lập tên hiển thị

**Định nghĩa**:

```typescript
setAlias(alias: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `alias` | string | - Tên hiển thị |

### setEncoding

Thiết lập vị trí encoding chart

**Định nghĩa**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Vị trí encoding dimension |

### setSort

Thiết lập cấu hình sắp xếp

**Định nghĩa**:

```typescript
setSort(sort: VBISort): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `sort` | VBISort | - Cấu hình sắp xếp |

### setAggregate

Thiết lập hàm tổng hợp ngày

**Định nghĩa**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Cấu hình tổng hợp ngày |

### clearAggregate

Xóa hàm tổng hợp ngày

**Định nghĩa**:

```typescript
clearAggregate(): this
```

**Trả về**: `this`

### clearSort

Xóa cấu hình sắp xếp

**Định nghĩa**:

```typescript
clearSort(): this
```

**Trả về**: `this`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): VBIDimension
```

**Trả về**: `VBIDimension`

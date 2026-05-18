# MeasureNodeBuilder

Builder node measure dùng để cấu hình một measure

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Trả về**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `encoding` | NonNullable<VBIMeasure['encoding']> | - Vị trí encoding measure |

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

Thiết lập hàm tổng hợp

**Định nghĩa**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `aggregate` | VBIMeasure['aggregate'] | - Cấu hình tổng hợp |

### setFormat

Thiết lập định dạng số

**Định nghĩa**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Cấu hình định dạng |

### getFormat

Lấy định dạng số

**Định nghĩa**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Trả về**: `VBIMeasureFormat \| undefined`

### clearFormat

Xóa cấu hình định dạng số

**Định nghĩa**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Trả về**: `VBIMeasure`

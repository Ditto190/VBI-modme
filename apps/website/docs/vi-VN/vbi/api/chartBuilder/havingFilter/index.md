# HavingFilterBuilder

Builder lọc Having dùng để thêm, sửa, xóa điều kiện lọc sau khi nhóm. Lọc Having có hiệu lực sau khi tổng hợp dữ liệu và dùng để lọc kết quả nhóm

## Thuộc tính

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### getConditions

**Định nghĩa**:

```typescript
getConditions(): Y.Array<any>
```

**Trả về**: `Y.Array<any>`

### add

Thêm một điều kiện lọc Having

**Định nghĩa**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Trả về**: `HavingFilterBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `field` | string | - Tên field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Hàm callback |

### addGroup

Thêm một nhóm Having

**Định nghĩa**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Trả về**: `HavingFilterBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic |
| `callback` | (group: HavingGroupBuilder) => void | - Hàm callback |

### update

Cập nhật điều kiện lọc có ID chỉ định

**Định nghĩa**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Trả về**: `HavingFilterBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID điều kiện lọc |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Hàm callback |

### updateGroup

Cập nhật nhóm có ID chỉ định

**Định nghĩa**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Trả về**: `HavingFilterBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID nhóm |
| `callback` | (group: HavingGroupBuilder) => void | - Hàm callback |

### remove

Xóa điều kiện có ID chỉ định hoặc mục tại index chỉ định

**Định nghĩa**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Trả về**: `HavingFilterBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoặc index |

### find

Tìm điều kiện đầu tiên (lọc hoặc nhóm) theo callback, hành vi giống Array.find

**Định nghĩa**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Trả về**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Điều kiện tìm kiếm |

### clear

Xóa tất cả điều kiện lọc Having

**Định nghĩa**:

```typescript
clear()
```

### toJSON

Xuất cấu hình lọc Having đầy đủ

**Định nghĩa**:

```typescript
toJSON(): VBIHavingGroup
```

**Trả về**: `VBIHavingGroup`

### observe

Lắng nghe thay đổi điều kiện lọc và trả về hàm hủy lắng nghe

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Hàm callback |

### static isGroup

Xác định có phải node nhóm hay không

**Định nghĩa**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Xác định có phải node lá hay không

**Định nghĩa**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Trả về**: `boolean`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

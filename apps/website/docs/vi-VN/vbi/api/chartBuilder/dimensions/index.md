# DimensionsBuilder

Builder dimension dùng để thêm, sửa, xóa cấu hình dimension. Dimension là field phân loại trong dữ liệu, như thời gian, khu vực, danh mục sản phẩm

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

### add

Thêm một dimension

**Định nghĩa**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Trả về**: `DimensionsBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `field` | string | - Tên field |
| `callback` | (node: DimensionNodeBuilder) => void | - Hàm callback |

### remove

Xóa dimension có ID chỉ định

**Định nghĩa**:

```typescript
remove(id: string): DimensionsBuilder
```

**Trả về**: `DimensionsBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID dimension |

### update

Cập nhật cấu hình của dimension ID chỉ định

**Định nghĩa**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Trả về**: `DimensionsBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID dimension |
| `callback` | (node: DimensionNodeBuilder) => void | - Hàm callback |

### find

Tìm dimension đầu tiên theo điều kiện callback, hành vi giống Array.find

**Định nghĩa**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Trả về**: `DimensionNodeBuilder \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Điều kiện tìm kiếm |

### findAll

Lấy tất cả dimension

**Định nghĩa**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Trả về**: `DimensionNodeBuilder[]`

### toJSON

Xuất tất cả dimension thành mảng JSON

**Định nghĩa**:

```typescript
toJSON(): VBIDimension[]
```

**Trả về**: `VBIDimension[]`

### observe

Lắng nghe thay đổi dimension và trả về hàm hủy lắng nghe

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Hàm callback |

### static isDimensionNode

**Định nghĩa**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Trả về**: `node is VBIDimension`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Định nghĩa**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Trả về**: `node is VBIDimensionGroup`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

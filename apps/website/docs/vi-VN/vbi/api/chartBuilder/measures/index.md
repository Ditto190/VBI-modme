# MeasuresBuilder

Builder measure dùng để thêm, sửa, xóa cấu hình measure. Measure là field số trong dữ liệu, như doanh số, lợi nhuận, số lượng

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

### add

Thêm một measure

**Định nghĩa**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Trả về**: `MeasuresBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `field` | string | - Tên field |
| `callback` | (node: MeasureNodeBuilder) => void | - Hàm callback |

### remove

Xóa measure có ID chỉ định

**Định nghĩa**:

```typescript
remove(id: string): MeasuresBuilder
```

**Trả về**: `MeasuresBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID measure |

### update

Cập nhật cấu hình measure

**Định nghĩa**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Trả về**: `MeasuresBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `id` | string | - ID measure |
| `callback` | (node: MeasureNodeBuilder) => void | - Hàm callback |

### find

Tìm measure đầu tiên theo điều kiện callback, hành vi giống Array.find

**Định nghĩa**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Trả về**: `MeasureNodeBuilder \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Điều kiện tìm kiếm |

### findAll

Lấy tất cả measure

**Định nghĩa**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Trả về**: `MeasureNodeBuilder[]`

### toJSON

Xuất tất cả measure thành mảng JSON

**Định nghĩa**:

```typescript
toJSON(): VBIMeasure[]
```

**Trả về**: `VBIMeasure[]`

### observe

Lắng nghe thay đổi measure

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Hàm callback |

### static isMeasureNode

**Định nghĩa**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Trả về**: `node is VBIMeasure`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Định nghĩa**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Trả về**: `node is VBIMeasureGroup`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

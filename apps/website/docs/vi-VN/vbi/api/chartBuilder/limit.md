# LimitBuilder

Builder giới hạn dữ liệu dùng để thiết lập và lấy limit hiện tại

## Thuộc tính

## Phương thức

### constructor

Hàm khởi tạo

**Định nghĩa**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Lắng nghe thay đổi limit và trả về hàm hủy lắng nghe

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm callback |

### setLimit

Thiết lập limit

**Định nghĩa**:

```typescript
setLimit(limit: number)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `limit` | number | - Giới hạn dữ liệu |

### getLimit

Lấy limit hiện tại

**Định nghĩa**:

```typescript
getLimit(): number | undefined
```

**Trả về**: `number \| undefined`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): number | undefined
```

**Trả về**: `number \| undefined`

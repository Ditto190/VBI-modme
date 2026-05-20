# ThemeBuilder

Builder chủ đề, dùng để thiết lập và lấy chủ đề hiện tại

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

Lắng nghe thay đổi chủ đề và trả về hàm hủy lắng nghe

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm callback |

### setTheme

Thiết lập chủ đề

**Định nghĩa**:

```typescript
setTheme(theme: string)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme` | string | - Tên chủ đề |

### getTheme

Lấy chủ đề hiện tại

**Định nghĩa**:

```typescript
getTheme(): string
```

**Trả về**: `string`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trả về**: `string`

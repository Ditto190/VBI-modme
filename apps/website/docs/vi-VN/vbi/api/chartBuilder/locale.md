# LocaleBuilder

Builder locale dùng để thiết lập và lấy locale hiện tại

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

Lắng nghe thay đổi locale và trả về hàm hủy lắng nghe

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm callback |

### setLocale

Thiết lập locale

**Định nghĩa**:

```typescript
setLocale(locale: string)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `locale` | string | - Tên locale |

### getLocale

Lấy locale hiện tại

**Định nghĩa**:

```typescript
getLocale(): string
```

**Trả về**: `string`

### toJSON

Xuất thành JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trả về**: `string`

# LimitBuilder

Builder gioi han du lieu dung de thiet lap va lay limit hien tai

## Thuoc tinh

## Phuong thuc

### constructor

Ham khoi tao

**Dinh nghia**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Lang nghe thay doi limit va tra ve ham huy lang nghe

**Dinh nghia**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveCallback | - Ham callback |

### setLimit

Thiet lap limit

**Dinh nghia**:

```typescript
setLimit(limit: number)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `limit` | number | - Gioi han du lieu |

### getLimit

Lay limit hien tai

**Dinh nghia**:

```typescript
getLimit(): number | undefined
```

**Tra ve**: `number \| undefined`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): number | undefined
```

**Tra ve**: `number \| undefined`
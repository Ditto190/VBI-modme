# LocaleBuilder

Builder locale dung de thiet lap va lay locale hien tai

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

Lang nghe thay doi locale va tra ve ham huy lang nghe

**Dinh nghia**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveCallback | - Ham callback |

### setLocale

Thiet lap locale

**Dinh nghia**:

```typescript
setLocale(locale: string)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `locale` | string | - Ten locale |

### getLocale

Lay locale hien tai

**Dinh nghia**:

```typescript
getLocale(): string
```

**Tra ve**: `string`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): string
```

**Tra ve**: `string`
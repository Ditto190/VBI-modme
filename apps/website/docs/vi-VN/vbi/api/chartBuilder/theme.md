# ThemeBuilder

Builder theme dung de thiet lap va lay theme hien tai

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

Lang nghe thay doi theme va tra ve ham huy lang nghe

**Dinh nghia**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveCallback | - Ham callback |

### setTheme

Thiet lap theme

**Dinh nghia**:

```typescript
setTheme(theme: string)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `theme` | string | - Ten theme |

### getTheme

Lay theme hien tai

**Dinh nghia**:

```typescript
getTheme(): string
```

**Tra ve**: `string`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): string
```

**Tra ve**: `string`
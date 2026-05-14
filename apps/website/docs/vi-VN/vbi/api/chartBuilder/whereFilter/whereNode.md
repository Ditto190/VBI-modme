# WhereFilterNodeBuilder

Builder node loc Where dung de cau hinh mot dieu kien loc Where

## Thuoc tinh

## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

Lay ID node

**Dinh nghia**:

```typescript
getId(): string
```

**Tra ve**: `string`

### getField

Lay ten field

**Dinh nghia**:

```typescript
getField(): string
```

**Tra ve**: `string`

### setField

Thiet lap ten field

**Dinh nghia**:

```typescript
setField(field: string): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |

### getOperator

Lay toan tu loc

**Dinh nghia**:

```typescript
getOperator(): string | undefined
```

**Tra ve**: `string \| undefined`

### setOperator

Thiet lap toan tu loc

**Dinh nghia**:

```typescript
setOperator(operator: string): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `operator` | string | - Toan tu |

### setValue

Thiet lap gia tri loc

**Dinh nghia**:

```typescript
setValue(value: unknown): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `value` | unknown | - Gia tri loc |

### setDate

Thiet lap dieu kien loc ngay

**Dinh nghia**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Predicate ngay |

### getDate

Lay dieu kien loc ngay; loc khong phai ngay tra ve undefined

**Dinh nghia**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Tra ve**: `VBIWhereDatePredicate \| undefined`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): VBIWhereFilter
```

**Tra ve**: `VBIWhereFilter`
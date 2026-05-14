# HavingFilterNodeBuilder

Builder node loc Having dung de cau hinh mot dieu kien loc Having

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

### getOperator

Lay toan tu loc

**Dinh nghia**:

```typescript
getOperator(): string | undefined
```

**Tra ve**: `string \| undefined`

### getAggregate

Lay cau hinh tong hop

**Dinh nghia**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Tra ve**: `VBIHavingAggregate \| undefined`

### setValue

Thiet lap gia tri cua dieu kien loc

**Dinh nghia**:

```typescript
setValue(value: unknown): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `value` | unknown | - Gia tri loc |

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

### setAggregate

Thiet lap cau hinh tong hop

**Dinh nghia**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - Cau hinh tong hop |

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): VBIHavingFilter
```

**Tra ve**: `VBIHavingFilter`
# DimensionNodeBuilder

Builder node dimension dung de cau hinh mot dimension

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

### getEncoding

Lay vi tri encoding chart

**Dinh nghia**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Tra ve**: `VBIDimension['encoding'] \| undefined`

### getSort

Lay cau hinh sap xep

**Dinh nghia**:

```typescript
getSort(): VBISort | undefined
```

**Tra ve**: `VBISort \| undefined`

### setAlias

Thiet lap ten hien thi

**Dinh nghia**:

```typescript
setAlias(alias: string): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `alias` | string | - Ten hien thi |

### setEncoding

Thiet lap vi tri encoding chart

**Dinh nghia**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `encoding` | NonNullable<VBIDimension['encoding']> | - Vi tri encoding dimension |

### setSort

Thiet lap cau hinh sap xep

**Dinh nghia**:

```typescript
setSort(sort: VBISort): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `sort` | VBISort | - Cau hinh sap xep |

### setAggregate

Thiet lap ham tong hop ngay

**Dinh nghia**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `aggregate` | NonNullable<VBIDimension['aggregate']> | - Cau hinh tong hop ngay |

### clearAggregate

Xoa ham tong hop ngay

**Dinh nghia**:

```typescript
clearAggregate(): this
```

**Tra ve**: `this`

### clearSort

Xoa cau hinh sap xep

**Dinh nghia**:

```typescript
clearSort(): this
```

**Tra ve**: `this`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): VBIDimension
```

**Tra ve**: `VBIDimension`
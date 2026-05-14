# HavingGroupBuilder

Builder nhom Having dung de cau hinh quan he logic (AND/OR) cua mot nhom dieu kien

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

### getConditions

**Dinh nghia**:

```typescript
getConditions(): Y.Array<any>
```

**Tra ve**: `Y.Array<any>`

### getId

Lay ID nhom

**Dinh nghia**:

```typescript
getId(): string
```

**Tra ve**: `string`

### getOperator

Lay toan tu logic

**Dinh nghia**:

```typescript
getOperator(): 'and' | 'or'
```

**Tra ve**: `'and' \| 'or'`

### setOperator

Thiet lap toan tu logic

**Dinh nghia**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toan tu logic |

### add

Them mot dieu kien loc Having vao nhom

**Dinh nghia**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Ham callback |

### addGroup

Them mot nhom long vao nhom hien tai

**Dinh nghia**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toan tu logic |
| `callback` | (group: HavingGroupBuilder) => void | - Ham callback |

### remove

Xoa dieu kien co ID chi dinh hoac muc tai index chi dinh

**Dinh nghia**:

```typescript
remove(idOrIndex: string | number): this
```

**Tra ve**: `this`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoac index |

### clear

Xoa tat ca dieu kien trong nhom

**Dinh nghia**:

```typescript
clear(): this
```

**Tra ve**: `this`

### toJSON

Xuat thanh JSON

**Dinh nghia**:

```typescript
toJSON(): VBIHavingGroup
```

**Tra ve**: `VBIHavingGroup`
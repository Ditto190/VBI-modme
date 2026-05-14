# HavingFilterBuilder

Builder loc Having dung de them, sua, xoa dieu kien loc sau khi nhom. Loc Having co hieu luc sau khi tong hop du lieu va dung de loc ket qua nhom

## Thuoc tinh

## Phuong thuc

### constructor

**Dinh nghia**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### getConditions

**Dinh nghia**:

```typescript
getConditions(): Y.Array<any>
```

**Tra ve**: `Y.Array<any>`

### add

Them mot dieu kien loc Having

**Dinh nghia**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Tra ve**: `HavingFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Ham callback |

### addGroup

Them mot nhom Having

**Dinh nghia**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Tra ve**: `HavingFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toan tu logic |
| `callback` | (group: HavingGroupBuilder) => void | - Ham callback |

### update

Cap nhat dieu kien loc co ID chi dinh

**Dinh nghia**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Tra ve**: `HavingFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID dieu kien loc |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Ham callback |

### updateGroup

Cap nhat nhom co ID chi dinh

**Dinh nghia**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Tra ve**: `HavingFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID nhom |
| `callback` | (group: HavingGroupBuilder) => void | - Ham callback |

### remove

Xoa dieu kien co ID chi dinh hoac muc tai index chi dinh

**Dinh nghia**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Tra ve**: `HavingFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoac index |

### find

Tim dieu kien dau tien (loc hoac nhom) theo callback, hanh vi giong Array.find

**Dinh nghia**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Tra ve**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Dieu kien tim kiem |

### clear

Xoa tat ca dieu kien loc Having

**Dinh nghia**:

```typescript
clear()
```

### toJSON

Xuat cau hinh loc Having day du

**Dinh nghia**:

```typescript
toJSON(): VBIHavingGroup
```

**Tra ve**: `VBIHavingGroup`

### observe

Lang nghe thay doi dieu kien loc va tra ve ham huy lang nghe

**Dinh nghia**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Ham callback |

### static isGroup

Xac dinh co phai node nhom hay khong

**Dinh nghia**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Tra ve**: `boolean`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

Xac dinh co phai node la hay khong

**Dinh nghia**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Tra ve**: `boolean`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |
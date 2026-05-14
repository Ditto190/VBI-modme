# WhereFilterBuilder

Builder loc Where dung de them, sua, xoa dieu kien loc cap hang. Loc Where co hieu luc truoc khi query du lieu va dung de loc du lieu goc

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

Them mot dieu kien loc Where

**Dinh nghia**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Tra ve**: `WhereFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Ham callback |

### addGroup

Them mot nhom Where

**Dinh nghia**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Tra ve**: `WhereFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toan tu logic |
| `callback` | (group: WhereGroupBuilder) => void | - Ham callback |

### update

Cap nhat dieu kien loc co ID chi dinh

**Dinh nghia**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Tra ve**: `WhereFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID dieu kien loc |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Ham callback |

### updateGroup

Cap nhat nhom co ID chi dinh

**Dinh nghia**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Tra ve**: `WhereFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID nhom |
| `callback` | (group: WhereGroupBuilder) => void | - Ham callback |

### remove

Xoa dieu kien co ID chi dinh hoac muc tai index chi dinh

**Dinh nghia**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Tra ve**: `WhereFilterBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoac index |

### find

Tim dieu kien dau tien (loc hoac nhom) theo callback, hanh vi giong Array.find

**Dinh nghia**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Tra ve**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Dieu kien tim kiem |

### clear

Xoa tat ca dieu kien loc Where

**Dinh nghia**:

```typescript
clear()
```

### toJSON

Xuat cau hinh loc Where day du

**Dinh nghia**:

```typescript
toJSON(): VBIWhereGroup
```

**Tra ve**: `VBIWhereGroup`

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
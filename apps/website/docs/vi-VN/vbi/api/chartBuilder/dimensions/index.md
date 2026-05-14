# DimensionsBuilder

Builder dimension dung de them, sua, xoa cau hinh dimension. Dimension la field phan loai trong du lieu, nhu thoi gian, khu vuc, danh muc san pham

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

### add

Them mot dimension

**Dinh nghia**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Tra ve**: `DimensionsBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |
| `callback` | (node: DimensionNodeBuilder) => void | - Ham callback |

### remove

Xoa dimension co ID chi dinh

**Dinh nghia**:

```typescript
remove(id: string): DimensionsBuilder
```

**Tra ve**: `DimensionsBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID dimension |

### update

Cap nhat cau hinh cua dimension ID chi dinh

**Dinh nghia**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Tra ve**: `DimensionsBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID dimension |
| `callback` | (node: DimensionNodeBuilder) => void | - Ham callback |

### find

Tim dimension dau tien theo dieu kien callback, hanh vi giong Array.find

**Dinh nghia**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Tra ve**: `DimensionNodeBuilder \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Dieu kien tim kiem |

### findAll

Lay tat ca dimension

**Dinh nghia**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Tra ve**: `DimensionNodeBuilder[]`

### toJSON

Xuat tat ca dimension thanh mang JSON

**Dinh nghia**:

```typescript
toJSON(): VBIDimension[]
```

**Tra ve**: `VBIDimension[]`

### observe

Lang nghe thay doi dimension va tra ve ham huy lang nghe

**Dinh nghia**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Ham callback |

### static isDimensionNode

**Dinh nghia**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Tra ve**: `node is VBIDimension`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |

### static isDimensionGroup

**Dinh nghia**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Tra ve**: `node is VBIDimensionGroup`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `node` | VBIDimensionTree[0] | - |
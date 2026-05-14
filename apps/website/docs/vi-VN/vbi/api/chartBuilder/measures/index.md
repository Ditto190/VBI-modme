# MeasuresBuilder

Builder measure dung de them, sua, xoa cau hinh measure. Measure la field so trong du lieu, nhu doanh so, loi nhuan, so luong

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

Them mot measure

**Dinh nghia**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Tra ve**: `MeasuresBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `field` | string | - Ten field |
| `callback` | (node: MeasureNodeBuilder) => void | - Ham callback |

### remove

Xoa measure co ID chi dinh

**Dinh nghia**:

```typescript
remove(id: string): MeasuresBuilder
```

**Tra ve**: `MeasuresBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID measure |

### update

Cap nhat cau hinh measure

**Dinh nghia**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Tra ve**: `MeasuresBuilder`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `id` | string | - ID measure |
| `callback` | (node: MeasureNodeBuilder) => void | - Ham callback |

### find

Tim measure dau tien theo dieu kien callback, hanh vi giong Array.find

**Dinh nghia**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Tra ve**: `MeasureNodeBuilder \| undefined`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Dieu kien tim kiem |

### findAll

Lay tat ca measure

**Dinh nghia**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Tra ve**: `MeasureNodeBuilder[]`

### toJSON

Xuat tat ca measure thanh mang JSON

**Dinh nghia**:

```typescript
toJSON(): VBIMeasure[]
```

**Tra ve**: `VBIMeasure[]`

### observe

Lang nghe thay doi measure

**Dinh nghia**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Tra ve**: `() => void`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Ham callback |

### static isMeasureNode

**Dinh nghia**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Tra ve**: `node is VBIMeasure`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**Dinh nghia**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Tra ve**: `node is VBIMeasureGroup`

**Tham so**:

| Tham so | Kieu | Mo ta |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |
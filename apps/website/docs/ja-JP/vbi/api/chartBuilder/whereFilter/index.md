# WhereFilterBuilder

Where フィルタービルダー。行レベルのフィルター条件の追加、変更、削除に使います。Where フィルターはデータクエリ前に有効になり、元データを絞り込みます

## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### getConditions

**定義**:

```typescript
getConditions(): Y.Array<any>
```

**戻り値**: `Y.Array<any>`

### add

Where フィルター条件を追加

**定義**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**戻り値**: `WhereFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |
| `callback` | (node: WhereFilterNodeBuilder) => void | - コールバック関数 |

### addGroup

Where グループを追加

**定義**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**戻り値**: `WhereFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 論理演算子 |
| `callback` | (group: WhereGroupBuilder) => void | - コールバック関数 |

### update

指定 ID のフィルター条件を更新

**定義**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**戻り値**: `WhereFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - フィルター条件 ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - コールバック関数 |

### updateGroup

指定 ID のグループを更新

**定義**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**戻り値**: `WhereFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - グループ ID |
| `callback` | (group: WhereGroupBuilder) => void | - コールバック関数 |

### remove

指定 ID の条件または指定インデックスの項目を削除

**定義**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**戻り値**: `WhereFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID またはインデックス |

### find

コールバック条件に一致する最初の条件（フィルターまたはグループ）を検索。動作は Array.find と同じ

**定義**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**戻り値**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - 検索条件 |

### clear

すべての Where フィルター条件をクリア

**定義**:

```typescript
clear()
```

### toJSON

完全な Where フィルター設定をエクスポート

**定義**:

```typescript
toJSON(): VBIWhereGroup
```

**戻り値**: `VBIWhereGroup`

### observe

フィルター条件の変更を監視し、監視解除関数を返す

**定義**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - コールバック関数 |

### static isGroup

グループノードかどうかを判定

**定義**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### static isNode

リーフノードかどうかを判定

**定義**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

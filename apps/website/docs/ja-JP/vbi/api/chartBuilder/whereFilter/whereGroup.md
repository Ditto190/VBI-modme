# WhereGroupBuilder

条件グループの論理関係（AND/OR）を設定する Where グループビルダー

## メソッド

### constructor

**定義**:

```typescript
constructor(yMap: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getConditions

**定義**:

```typescript
getConditions(): Y.Array<any>
```

**戻り値**: `Y.Array<any>`

### getId

グループ ID を取得

**定義**:

```typescript
getId(): string
```

**戻り値**: `string`

### getOperator

論理演算子を取得

**定義**:

```typescript
getOperator(): 'and' | 'or'
```

**戻り値**: `'and' \| 'or'`

### setOperator

論理演算子を設定

**定義**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 論理演算子 |

### add

Where フィルター条件をグループに追加

**定義**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |
| `callback` | (node: WhereFilterNodeBuilder) => void | - コールバック関数 |

### addGroup

ネストしたグループを現在のグループに追加

**定義**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 論理演算子 |
| `callback` | (group: WhereGroupBuilder) => void | - コールバック関数 |

### remove

指定 ID の条件または指定インデックスの項目を削除

**定義**:

```typescript
remove(idOrIndex: string | number): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID またはインデックス |

### clear

グループ内のすべての条件をクリア

**定義**:

```typescript
clear(): this
```

**戻り値**: `this`

### toJSON

JSON としてエクスポート

**定義**:

```typescript
toJSON(): VBIWhereGroup
```

**戻り値**: `VBIWhereGroup`

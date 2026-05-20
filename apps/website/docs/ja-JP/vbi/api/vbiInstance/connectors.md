# VBI.connectors

VBI インスタンス上のコネクタ名前空間です。

## メソッド

### register

コネクタを登録します。

**定義**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**戻り値**: `void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

コネクタを取得します。

**定義**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**戻り値**: `Promise<VBIConnector>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

コネクタが登録済みかどうかを判定します。

**定義**:

```typescript
has(id: VBIConnectorId): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

コネクタの登録を解除します。

**定義**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

VBIConnector を遅延作成するファクトリ関数です。

**定義**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

VBI インスタンスに登録できるコネクタ値です。コネクタを直接渡す形式と非同期ファクトリの両方をサポートします。

**定義**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```

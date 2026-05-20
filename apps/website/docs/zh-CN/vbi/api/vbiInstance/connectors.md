# VBI.connectors

VBI 实例上的连接器命名空间。

## 方法

### register

注册连接器。

**定义**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

获取连接器。

**定义**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**返回**: `Promise<VBIConnector>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

判断连接器是否已注册。

**定义**:

```typescript
has(id: VBIConnectorId): boolean
```

**返回**: `boolean`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

注销连接器。

**定义**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**返回**: `boolean`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

延迟创建 VBIConnector 的工厂函数。

**定义**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

可注册到 VBI 实例的连接器值，支持直接传入连接器或异步工厂。

**定义**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```
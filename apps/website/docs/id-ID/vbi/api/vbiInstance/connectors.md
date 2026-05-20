# VBI.connectors

Namespace connector pada instans VBI.

## Metode

### register

Mendaftarkan connector.

**Definisi**:

```typescript
register(id: VBIConnectorId, connector: VBIConnectorLike): void
```

**Mengembalikan**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | VBIConnectorId | - |
| `connector` | VBIConnectorLike | - |

### get

Mengambil connector.

**Definisi**:

```typescript
get(id: VBIConnectorId): Promise<VBIConnector>
```

**Mengembalikan**: `Promise<VBIConnector>`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### has

Memeriksa apakah connector sudah terdaftar.

**Definisi**:

```typescript
has(id: VBIConnectorId): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

### unregister

Membatalkan pendaftaran connector.

**Definisi**:

```typescript
unregister(id: VBIConnectorId): boolean
```

**Mengembalikan**: `boolean`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | VBIConnectorId | - |

---

# VBIConnectorFactory

Fungsi factory yang membuat VBIConnector secara lazy.

**Definisi**:

```typescript
type VBIConnectorFactory = () => Promise<VBIConnector>
```

---

# VBIConnectorLike

Nilai connector yang dapat didaftarkan ke instans VBI, mendukung connector langsung atau factory asinkron.

**Definisi**:

```typescript
type VBIConnectorLike = VBIConnector | VBIConnectorFactory
```

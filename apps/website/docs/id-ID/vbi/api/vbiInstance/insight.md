# VBI.insight

Namespace insight pada instans VBI, bertanggung jawab membuat Insight Builder dan DSL insight kosong.

## Metode

### create

Membuat VBIInsightBuilder dari DSL insight.

**Definisi**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**Mengembalikan**: `VBIInsightBuilder`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

Membuat DSL insight kosong.

**Definisi**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**Mengembalikan**: `VBIInsightDSL`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `uuid?` | string | - |

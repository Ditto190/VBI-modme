# VBI.insight

Không gian tên insight trên một phiên bản VBI, chịu trách nhiệm tạo Insight Builder và DSL insight rỗng.

## Phương thức

### create

Tạo VBIInsightBuilder từ DSL insight.

**Định nghĩa**:

```typescript
create(insight: VBIInsightDSLInput): VBIInsightBuilder
```

**Trả về**: `VBIInsightBuilder`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insight` | VBIInsightDSLInput | - |

### createEmpty

Tạo một DSL insight rỗng.

**Định nghĩa**:

```typescript
createEmpty(uuid?: string): VBIInsightDSL
```

**Trả về**: `VBIInsightDSL`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `uuid?` | string | - |

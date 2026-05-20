# VBI.dashboard

VBI 인스턴스의 대시보드 네임스페이스로, Dashboard Builder와 빈 dashboard DSL 생성을 담당합니다.

## 메서드

### create

dashboard DSL로 VBIDashboardBuilder를 생성합니다.

**정의**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

빈 dashboard DSL을 생성합니다.

**정의**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**반환**: `VBIDashboardDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid?` | string | - |

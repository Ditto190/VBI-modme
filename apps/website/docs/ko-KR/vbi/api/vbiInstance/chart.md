# VBI.chart

VBI 인스턴스의 차트 네임스페이스로, 차트 Builder와 빈 차트 DSL 생성을 담당합니다.

## 메서드

### create

차트 DSL로 VBIChartBuilder를 생성합니다.

**정의**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

최소한으로 사용할 수 있는 차트 DSL을 생성합니다.

**정의**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**반환**: `VBIChartDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |

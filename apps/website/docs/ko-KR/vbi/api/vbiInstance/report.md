# VBI.report

VBI 인스턴스의 리포트 네임스페이스로, Report Builder, 빈 리포트, 빈 페이지 생성을 담당합니다.

## 메서드

### create

report DSL로 VBIReportBuilder를 생성합니다.

**정의**:

```typescript
create(report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `report` | VBIReportDSLInput | - |
| `builderOptions?` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |

### createEmpty

빈 report DSL을 생성합니다.

**정의**:

```typescript
createEmpty(uuid?: string): VBIReportDSL
```

**반환**: `VBIReportDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `uuid?` | string | - |

### createEmptyPage

빈 report page DSL을 생성합니다.

**정의**:

```typescript
createEmptyPage(pageId?: string): VBIReportPageDSL
```

**반환**: `VBIReportPageDSL`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `pageId?` | string | - |

# PivotTable

:::info{title=권장}
- 권장 필드 설정: 지표 `1`개, 차원 `1`개
- Data Reshape 지원: 지표 최소 `1`개, 차원 `0`개
:::

:::info{title=인코딩 매핑}
피벗 테이블은 다음 시각 채널을 지원합니다:

`row`    : 행 차원, `여러 차원`을 지원하며 행에서 차원 값별로 데이터를 그룹화합니다.

`column` : 열 차원, `여러 차원`을 지원하며 열에서 차원 값별로 데이터를 그룹화합니다.

`detail` : 상세 채널, `여러 지표`를 지원하며 셀 안에 지표 값을 표시합니다.

:::

:::note{title=설명}
피벗 테이블은 다차원 데이터 교차 분석에 적합하며 행/열 차원과 지표 계산 방식을 유연하게 설정할 수 있습니다.

적용 시나리오:

- 복잡한 다차원 통계 분석
- 데이터 드릴다운 및 집계 표시
- 비즈니스 리포트 생성 및 데이터 탐색

:::

:::warning{title=Warning}
데이터 요구 사항:

- 행 차원, 열 차원 또는 지표가 최소 1개 필요
- 데이터는 사전 집계되어야 합니다.
- 데이터는 그룹화할 수 있어야 합니다.

기본 활성화 기능:

- 행/열 정렬, 데이터 필터링, 집계/소계 계산 및 소계/총계 표시가 기본으로 활성화됩니다.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=설명}
피벗 테이블은 다차원 데이터 교차 분석 시나리오에 적합합니다.

:::

**예시**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=설명}
TidyData 사양을 따르고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자 입력은 사전 처리가 필요 없으며, VSeed의 강력한 Data Reshape 기능이 자동으로 형식을 처리합니다. 피벗 테이블 데이터는 최종적으로 해당 트리 구조로 변환되므로 수동 데이터 처리가 필요하지 않습니다.

:::

**예시**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=설명}
피벗 테이블의 행 및 열 차원입니다. 데이터는 자동으로 트리 구조로 처리되어 행과 열 축에 매핑됩니다.

:::

**예시**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




### id

**Type:** `string`

:::note{title=설명}
차원에 해당하는 필드 ID

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
차원 별칭

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=설명}
차원 날짜 형식 설정

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
시간 입도이며 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널:

- row: 여러 차원을 행 채널에 매핑할 수 있습니다

- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=설명}
피벗 테이블은 여러 차원 지표를 지원합니다.

:::

**예시**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




### id

**Type:** `string`

:::note{title=설명}
지표 ID, 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
지표 별칭, 중복 허용. 설정하지 않으면 alias는 id가 됩니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 서식, 기본 활성화, 가장 높은 우선순위입니다.

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다.

활성화하면 차트 데이터 레이블과 툴팁이 지표 값과 로케일에 따라 적절한 형식을 자동으로 선택합니다.

서식 규칙: compact notation이 활성화된 십진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용.

예:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 서식이며 레이블과 툴팁에 자동 적용됩니다.

참고: 사용자 지정 서식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 설정을 덮어씁니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 서식 유형. 숫자(십진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율, 0일 수 없습니다

:::

**예시**
- 100000은 10만으로 변환, ratio:10000, symbol:"만"
- 100000 은 10K 로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 기호, 예: %, ‰

:::

**예시**
- 100000은 10만으로 변환, ratio:10000, symbol:"만"
- 100000 은 10K 로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 서식의 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다.

:::

**예시**
- 1234.5678 은 1235 로 변환, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 은 1234.6 로 변환, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 은 1234.57 로 변환, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 은 1230.568 로 변환, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 은 1234.56780 로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다.

:::

**예시**
- 1234.5678 은 1000 로 변환, significantDigits:1
- 1234.5678 은 1200 로 변환, significantDigits:2
- 1234.5678 은 1230 로 변환, significantDigits:3
- 1234.5678 은 1234 로 변환, significantDigits:4
- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 은 1234.57 로 변환, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 은 1234.568 로 변환, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 은 1234.5678 로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우 숫자 서식의 반올림 우선순위. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다.

:::

**예시**
- 1234.5678 은 1230 로 변환, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 서식 유형. 숫자(십진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율, 0일 수 없습니다

:::

**예시**
- 100000은 10만으로 변환, ratio:10000, symbol:"만"
- 100000 은 10K 로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 기호, 예: %, ‰

:::

**예시**
- 100000은 10만으로 변환, ratio:10000, symbol:"만"
- 100000 은 10K 로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 서식의 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다.

:::

**예시**
- 1234.5678 은 1235 로 변환, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 은 1234.6 로 변환, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 은 1234.57 로 변환, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 은 1230.568 로 변환, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 은 1234.56780 로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다.

:::

**예시**
- 1234.5678 은 1000 로 변환, significantDigits:1
- 1234.5678 은 1200 로 변환, significantDigits:2
- 1234.5678 은 1230 로 변환, significantDigits:3
- 1234.5678 은 1234 로 변환, significantDigits:4
- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 은 1234.57 로 변환, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 은 1234.568 로 변환, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 은 1234.5678 로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우 숫자 서식의 반올림 우선순위. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다.

:::

**예시**
- 1234.5678 은 1230 로 변환, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다.

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=설명}
지표가 매핑되는 채널:

- column: 지표 열

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 지표 설정에서 트리 형태의 지표 구조를 구성합니다. parentId는 부모 지표 그룹의 ID를 가리키며 계층 구성에 사용됩니다.

:::

:::tip{title=Tip}
지표 트리를 설정하는 방법은 두 가지입니다. 옵션 1은 children으로 지표 트리를 직접 설정하고, 옵션 2는 parentId가 있는 평면 지표 목록을 제공합니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정. 페이지네이션에 사용할 필드명을 지정하며 차원이어야 합니다.

:::


### field

**Type:** `string`

:::note{title=설명}
페이지네이션 필드. 페이지네이션에 사용할 필드명을 지정하며 차원이어야 합니다.

:::

### currentValue

**Type:** `string`

:::note{title=설명}
현재 페이지네이션 값. 현재 페이지를 결정하는 데 사용하는 값을 지정합니다.

:::

**예시**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
차트 배경색. 기본값은 투명입니다. 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')을 지정할 수 있습니다.

:::


## borderColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 테두리 색상.

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=설명}
테이블 본문 글꼴 크기.

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 본문 글꼴 색상.

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 본문 배경색.

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=설명}
행 및 열 헤더 글꼴 크기.

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=설명}
행 및 열 헤더 글꼴 색상.

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
행 및 열 헤더 배경색.

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
행 또는 열 헤더 셀에 호버할 때의 배경색이며, 호버된 행과 열의 교차 셀을 강조합니다.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
행 또는 열 헤더 셀에 호버할 때의 배경색이며, 호버된 행과 열의 모든 셀을 강조합니다.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=설명}
선택된 셀의 테두리 색상이며 강조 표시에 사용됩니다.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
선택된 셀의 배경색이며 강조 표시에 사용됩니다.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=설명}
테이블 본문 셀에 특수 스타일을 설정합니다.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=설명}
데이터 selector.

`selector`가 설정되면 숫자 selector, 로컬 데이터 selector, 조건부 차원 selector, 조건부 지표 selector 네 가지 데이터 매칭 기능을 제공합니다.

`selector`가 설정되지 않으면 스타일이 전역 적용됩니다.

참고: `selector`와 `dynamicFilter`는 동시에 사용할 수 없으며 `dynamicFilter`의 우선순위가 더 높습니다.

:::

**예시**
숫자 selector:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

로컬 데이터 selector:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

조건부 차원 selector:
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

조건부 지표 selector:
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}

필드 열 필터:
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=설명}
필드명. 단일 필드 또는 필드 배열일 수 있습니다.

:::

**예시**
단일 필드:
field: 'sales'

여러 필드:
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자:

- in: 차원 필드 값이 'value' 목록 안에 있는 데이터 항목 선택

- not in: 차원 필드 값이 'value' 목록 안에 없는 데이터 항목 선택

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자:

- in: 차원 필드 값이 'value' 목록 안에 있는 데이터 항목 선택

- not in: 차원 필드 값이 'value' 목록 안에 없는 데이터 항목 선택

operator와 동일.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
선택할 차원 값. 배열을 지원합니다.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=설명}
동적 필터(코드 기반).

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.
Top N, 통계 분석, 복잡한 조건 등 정적 selector로 표현하기 어려운 시나리오에 적합합니다.

핵심 기능:

- 임의의 복잡한 데이터 필터 조건 지원

- 데이터 작업에 내장 유틸리티 함수 사용

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다.

참고: `selector`와 `dynamicFilter`는 동시에 사용할 수 없으며 `dynamicFilter`의 우선순위가 더 높습니다.

테이블 동적 필터 설정.

AI가 생성한 JavaScript 코드로 셀 수준의 정밀 필터링을 구현합니다.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 사항 설명(자연어).

:::

**예시**
"sales가 1000보다 큰 셀 강조"

"각 행에서 최댓값 셀 강조"



#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드.

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근).

- 입력 매개변수: data(배열). 각 항목에는 행 번호를 나타내는 `_index` 필드가 포함됩니다.

- 셀 selector 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>.

- `field`가 "*"이면 전체 행이 강조됩니다.

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청.

:::

**예시**
Top N 필터:
dynamicFilter = {
type: 'row-with-field',
description: '매출 상위 3개 제품 강조',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

다중 조건 필터:
dynamicFilter = {
type: 'row-with-field',
description: '이익률이 20%보다 크고 매출이 5000보다 큰 제품 강조',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

상대값 필터:
dynamicFilter = {
type: 'row-with-field',
description: '평균보다 매출이 높은 제품 강조',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

그룹 필터:
dynamicFilter = {
type: 'row-with-field',
description: '각 지역에서 가장 많이 팔린 제품 강조',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

전체 행 강조:
dynamicFilter = {
description: '매출이 이익보다 큰 행 강조',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 방안.

:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드 ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자:

- in: 차원 필드 값이 'value' 목록 안에 있는 데이터 항목 선택

- not in: 차원 필드 값이 'value' 목록 안에 없는 데이터 항목 선택

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자:

- in: 차원 필드 값이 'value' 목록 안에 있는 데이터 항목 선택

- not in: 차원 필드 값이 'value' 목록 안에 없는 데이터 항목 선택

operator와 동일.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
선택할 차원 값. 배열을 지원합니다.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드). `prepare()` 단계에서 작성되며 런타임에는 읽기 전용입니다.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=설명}
셀 배경색.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=설명}
셀 배경의 색상 스케일 활성화 여부.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=설명}
셀 배경색 스케일 매핑이며 `backgroundColor`보다 우선순위가 높습니다.

:::


#### minValue

**Type:** `number | undefined`

:::note{title=설명}
최솟값. 설정하지 않으면 현재 데이터 열의 최솟값이 기본값입니다.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=설명}
최댓값. 설정하지 않으면 현재 데이터 열의 최댓값이 기본값입니다.

:::

#### minColor

**Type:** `string`

:::note{title=설명}
최솟값에 해당하는 색상.

:::

#### maxColor

**Type:** `string`

:::note{title=설명}
최댓값에 해당하는 색상.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=설명}
배경 진행 막대(셀 값의 크기를 반영하는 막대)를 활성화할지 여부. 기본값은 비활성화입니다.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=설명}
셀 값이 양수일 때 배경 막대 색상.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=설명}
셀 값이 음수일 때 배경 막대 색상.

:::

### barMin

**Type:** `number | undefined`

:::note{title=설명}
진행 막대의 최솟값.
설정하지 않으면 열 최솟값에서 자동 계산됩니다.

:::

### barMax

**Type:** `number | undefined`

:::note{title=설명}
진행 막대의 최댓값.
설정하지 않으면 열 최댓값에서 자동 계산됩니다.

:::

### textColor

**Type:** `string | undefined`

:::note{title=설명}
셀 텍스트 색상.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
셀 텍스트 크기.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=설명}
셀 테두리 색상.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=설명}
셀 테두리 선 너비.

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=설명}
지표를 열로 표시할지 여부. `true`이면 지표가 가로(열) 방향으로 확장되고, `false`이면 세로(행) 방향으로 확장됩니다.

:::

**예시**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=설명}
피벗 테이블의 총계 및 소계 설정.

:::

**예시**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=설명}
행의 총계 및 소계 설정.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=설명}
총계(총계 행/열)를 표시할지 여부.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=설명}
소계를 표시할지 여부.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=설명}
소계에 사용할 차원. 이 차원으로 소계를 그룹화합니다.

:::

**예시**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=설명}
열의 총계 및 소계 설정.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=설명}
총계(총계 행/열)를 표시할지 여부.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=설명}
소계를 표시할지 여부.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=설명}
소계에 사용할 차원. 이 차원으로 소계를 그룹화합니다.

:::

**예시**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=설명}
차트 테마. 테마는 우선순위가 낮은 설정으로, 모든 차트 유형이 공유하는 일반 설정과 차트 범주 내에서 공유되는 특정 설정을 포함합니다.

라이트 및 다크 테마가 내장되어 있으며 사용자는 Builder를 통해 사용자 지정 테마를 정의할 수 있습니다.

:::

**예시**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title=설명}
Locale. 차트 언어 설정. 'zh-CN'과 'en-US'를 지원합니다. 또는 `intl.setLocale('zh-CN')`를 호출해 언어를 설정할 수 있습니다.

:::

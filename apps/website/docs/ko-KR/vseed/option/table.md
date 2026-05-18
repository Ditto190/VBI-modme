# Table

:::info{title=권장}
\- 권장 필드 구성: `임의` 개의 지표, `임의` 개의 차원

\- 데이터 재구조화 지원: 최소 `임의` 개의 지표, `임의` 개의 차원

:::

:::info{title=인코딩 매핑}
차원 트리와 지표 트리 설정만 지원하며 기본적으로 column에 인코딩됩니다.

:::

:::note{title=설명}
테이블은 상세 데이터 표시 시나리오에 적합하며, 행과 열이 명확해 구체적인 값을 쉽게 확인할 수 있습니다.

적용 시나리오:

\- 상세 데이터 레코드 표시

\- 데이터 항목의 정밀 비교

\- 여러 차원 속성 표시

:::

:::warning{title=경고}
데이터 요구 사항:

\- 최소 1개의 차원 필드

\- 최소 1개의 지표 필드

\- 차원 필드는 테이블 열 헤더로 사용됩니다

기본으로 활성화되는 기능:

\- 정렬, 필터링, 페이지네이션이 기본적으로 활성화됩니다

:::


## chartType

**Type:** `"table"`

:::note{title=설명}
상세 데이터를 표시하는 표준 테이블 컴포넌트

:::

**예시**
'table'




## dataset

**Type:** `Record[]`

:::note{title=설명}
TidyData 사양을 따르는 집계된 데이터셋으로, 그래프의 데이터 소스와 구조를 정의하는 데 사용됩니다. 사용자가 제공한 데이터셋은 별도 전처리가 필요 없으며, 각 필드는 하나의 열에, 각 레코드는 하나의 행에 대응합니다.

:::

**예시**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=설명}
테이블의 각 차원은 하나의 열에 대응합니다.

:::

**예시**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=설명}
차원 날짜 형식 설정

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
시간 단위, 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=설명}
차원 날짜 형식 설정

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
시간 단위, 날짜 표시 정밀도를 결정합니다

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=설명}
테이블의 각 지표는 하나의 행에 대응하며 지표 조합을 기본 지원합니다.

:::

**예시**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=설명}
지표 그룹 ID이며 고유해야 합니다.

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
지표 그룹 별칭이며 중복될 수 있습니다. 지정하지 않으면 ID가 기본값입니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 형식화, 기본적으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 그래프 데이터 레이블과 툴팁이 지표 값과 locale에 따라 적절한 형식을 자동으로 선택합니다

형식화 규칙: compact notation이 활성화된 10진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용

예를 들어:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 형식화이며 label과 tooltip에 자동 적용됩니다

참고: 사용자 지정 형식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 설정을 덮어씁니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 유형입니다. 숫자(십진수), 백분율(%), 천분율(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율, 0일 수 없습니다

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식의 천 단위 구분자

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 소수 자릿수, 브라우저 Intl.NumberFormat의 minimumFractionDigits 및 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678은 1235로 변환됩니다, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다, significantDigits:1
\- 1234.5678은 1200으로 변환됩니다, significantDigits:2
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3
\- 1234.5678은 1234로 변환됩니다, significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드, 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 유형입니다. 숫자(십진수), 백분율(%), 천분율(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율, 0일 수 없습니다

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식의 천 단위 구분자

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 소수 자릿수, 브라우저 Intl.NumberFormat의 minimumFractionDigits 및 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678은 1235로 변환됩니다, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다, significantDigits:1
\- 1234.5678은 1200으로 변환됩니다, significantDigits:2
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3
\- 1234.5678은 1234로 변환됩니다, significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드, 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- column: 지표 열

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 지표 설정 형식에서 트리형 지표 그룹을 구성합니다. parentId는 부모 지표 그룹의 id를 가리키며 지표 트리를 구성하는 데 사용됩니다

:::

:::tip{title=팁}
지표 트리를 설정하는 방법은 두 가지입니다. 옵션 1은 children이 있는 지표 트리를 직접 설정하는 방식이고, 옵션 2는 parentId가 있는 평면 지표 목록을 설정하는 방식입니다. 두 방식은 동시에 사용할 수 없습니다

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=설명}
지표 그룹 내의 하위 지표 또는 지표 그룹입니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정으로, 페이지네이션 필드명을 지정하는 데 사용되며 해당 필드는 dimension이어야 합니다.

:::


### field

**Type:** `string`

:::note{title=설명}
페이지네이션 필드; 페이지네이션에 사용할 필드 이름을 지정하며 반드시 차원이어야 합니다

:::

### currentValue

**Type:** `string`

:::note{title=설명}
현재 페이지네이션 값; 현재 페이지를 결정하는 데 사용할 값을 지정합니다

:::

**예시**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
배경색은 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')일 수 있습니다

:::


## borderColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 테두리 색상

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=설명}
테이블 본문 글꼴 크기

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 본문 글꼴 색상

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
테이블 본문 배경색

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=설명}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=설명}
헤더 글꼴 색상

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
헤더 배경색

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
Background color when the mouse hovers over a header cell, used to highlight the hovered cell.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
헤더에 마우스를 올렸을 때 전체 행의 배경색이며, 호버된 행을 강조하는 데 사용됩니다.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=설명}
Border color for selected cells, used to highlight the selection.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
Background color for selected cells, used to highlight the selection.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=설명}
테이블 본문 셀에 특수 스타일을 설정합니다.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=설명}
데이터 selector

selector가 설정되면 숫자 selector, 부분 데이터 selector, 조건부 차원 selector, 조건부 지표 selector의 네 가지 데이터 매칭 기능을 제공합니다.

selector를 구성하지 않으면 스타일이 전역으로 적용됩니다.

주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다.

:::

**예시**
숫자 selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

부분 데이터 selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

조건부 차원 selector
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

조건부 지표 selector
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

필드 열 필터링
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=설명}
필드명이며 단일 필드 또는 여러 필드 배열일 수 있습니다.

:::

**예시**
단일 필드
field: 'sales'

여러 필드
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 배열에 포함되는 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 value 배열에 포함되지 않는 데이터 항목을 선택합니다.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 배열에 포함되는 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 value 배열에 포함되지 않는 데이터 항목을 선택합니다.

operator와 동일

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값을 선택하며 배열을 지원합니다.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=설명}
동적 필터(코드 기반)



AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 시나리오에 적합합니다.



핵심 기능:

\- 임의로 복잡한 데이터 필터링 조건을 지원합니다.

\- 데이터 조작에 내장 유틸리티 함수를 사용합니다.

\- 브라우저 환경에서 안전하게 실행됩니다(Web Worker 샌드박스).



환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다.



주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다.



테이블 동적 필터 설정



AI가 생성한 JavaScript 코드로 테이블 셀 수준의 정밀한 필터링을 구현합니다.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 사항 설명(자연어).

:::

**예시**
"매출이 1000보다 큰 셀 강조"

"각 행에서 최댓값이 있는 셀 강조"



#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드.



\- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근).

\- 입력 매개변수: data(array), 각 item에는 행 번호를 나타내는 _index 필드가 포함됩니다.

\- 셀 selector 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>.

\- field가 "*"이면 전체 행을 강조한다는 의미입니다.

\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청.

:::

**예시**
Top N filtering
dynamicFilter = {
type: 'row\-with\-field',
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

다중 조건 필터링
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
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

상대값 필터링
dynamicFilter = {   *
type: 'row\-with\-field',
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

Grouped filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
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

전체 행 강조 표시
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
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
차원 필드이며 dimensions 항목의 ID입니다.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 배열에 포함되는 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 value 배열에 포함되지 않는 데이터 항목을 선택합니다.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 배열에 포함되는 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 value 배열에 포함되지 않는 데이터 항목을 선택합니다.

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값을 선택하며 배열을 지원합니다.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)



prepare() 단계에서 작성되며 런타임에는 읽기 전용

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
셀 배경색

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=설명}
배경색의 색상 스케일 설정을 활성화할지 여부

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=설명}
셀 배경색 스케일 매핑이며 backgroundColor보다 우선합니다

:::


#### minValue

**Type:** `number | undefined`

:::note{title=설명}
최솟값입니다. 설정하지 않으면 현재 데이터 열의 최솟값을 기본값으로 사용합니다

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=설명}
최댓값입니다. 설정하지 않으면 현재 데이터 열의 최댓값을 기본값으로 사용합니다

:::

#### minColor

**Type:** `string`

:::note{title=설명}
최소값에 대응하는 색상

:::

#### maxColor

**Type:** `string`

:::note{title=설명}
최대값에 대응하는 색상

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=설명}
진행 막대 기능(셀 값의 상대적 크기를 표시하는 막대)을 활성화할지 여부이며 기본적으로 비활성화됩니다

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=설명}
셀 값이 양수일 때의 진행 막대 색상

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=설명}
셀 값이 음수일 때의 진행 막대 색상

:::

### barMin

**Type:** `number | undefined`

:::note{title=설명}
진행 막대 최소값



설정하지 않으면 열 최솟값을 자동 계산합니다

:::

### barMax

**Type:** `number | undefined`

:::note{title=설명}
진행 막대 최대값



설정하지 않으면 열 최댓값을 자동 계산합니다

:::

### textColor

**Type:** `string | undefined`

:::note{title=설명}
셀 텍스트 색상

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
셀 텍스트 글꼴 크기

:::

### borderColor

**Type:** `string | undefined`

:::note{title=설명}
셀 테두리 색상

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=설명}
셀 테두리 선 너비

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=설명}
표시할 요약 행 유형이며 지표 열에만 적용됩니다

\- 'sum': 합계 행을 표시합니다

\- 'avg': 평균 행을 표시합니다

\- 'max': 최대값 행을 표시합니다

\- 'min': 최소값 행을 표시합니다

\- 'count': 개수 행을 표시합니다



테이블 요약 행 유형

\- 'sum': 합계

\- 'avg': 평균

\- 'max': 최대값

\- 'min': 최소값

\- 'count': 개수

:::

**예시**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=설명}
그래프 테마입니다. 테마는 우선순위가 낮은 기능 설정으로, 모든 그래프 타입이 공유하는 공통 설정과 단일 그래프 타입의 전용 설정을 포함합니다. 내장 light 및 dark 테마는 Builder를 통해 사용자 지정할 수 있습니다.



테마



내장 light 및 dark 테마가 있으며, 새 테마는 registerTheme으로 사용자 지정할 수 있습니다.

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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
그래프 언어 설정입니다. 'zh-CN'과 'en-US'를 지원하며 intl.setLocale('zh-CN') 메서드로도 언어를 설정할 수 있습니다.

:::

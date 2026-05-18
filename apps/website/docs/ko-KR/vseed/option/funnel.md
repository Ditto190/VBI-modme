# Funnel

:::info{title=추천}
- 권장 필드 설정: 지표 `1`개, 차원 `1`개

\- 데이터 리셰이프를 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
퍼널 차트는 다음 시각 채널을 지원합니다:

`size`   : 크기 채널, `여러 지표`를 지원하며 지표 값을 퍼널 너비에 매핑합니다

`detail` : 상세 채널, `여러 차원`을 지원하며 같은 색상 계열에서 더 세분화된 데이터를 표시할 때 사용합니다

`color`  : 색상 채널, `여러 차원` 또는 `하나의 지표`를 지원합니다. 차원 색상은 데이터 계열을 구분하고, 지표 색상은 지표 값을 그래픽 색상으로 선형 매핑하는 데 사용합니다

`tooltip`: 툴팁 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 마우스를 올릴 때 표시됩니다

`label`  : 레이블 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 데이터 레이블을 표시합니다

:::

:::note{title=설명}
퍼널 차트는 단일 차원 데이터의 비율 관계를 보여주는 데 사용합니다.

적용 시나리오:

퍼널 차트 적용 시나리오:

\- 여러 개의 연속적이고 표준화된 단계를 가진 프로세스를 분석하고, 각 단계의 데이터 이탈 또는 전환 상황을 명확하게 보여주는 데 적합합니다

:::

:::warning{title=Warning}
데이터 요구사항:

\- 최소 1개의 숫자 필드(지표)

\- 모든 차원은 여러 지표가 있을 경우 지표 이름과 결합되어 하나의 차원이 되며 범례 항목으로 표시됩니다

\- 모든 지표는 자동으로 하나의 지표로 병합됩니다

기본으로 활성화되는 기능:

\- 범례, 데이터 레이블, 툴팁, 비율 계산이 기본으로 활성화됩니다

:::


## chartType

**Type:** `"funnel"`

:::note{title=설명}
퍼널 차트



퍼널 차트는 단일 차원 데이터의 비율 관계를 보여줍니다.

:::

**예시**
'funnel'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋. TidyData 규격을 따르고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자가 입력한 데이터셋은 별도 전처리가 필요하지 않습니다. VSeed는 강력한 데이터 리셰이프 기능을 제공하며 자동으로 데이터를 리셰이프합니다. 퍼널 차트의 데이터는 최종적으로 1개 차원과 1개 지표로 변환됩니다.

:::

**예시**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=설명}
차원



퍼널 차트의 모든 차원은 여러 지표가 있을 경우 지표 이름과 결합되어 하나의 차원이 되며 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'category', alias: '카테고리'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 레이블 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `FunnelMeasure[] | undefined`

:::note{title=설명}
지표



퍼널 차트의 모든 지표는 자동으로 하나의 지표로 병합됩니다. 여러 지표가 있을 경우 지표 이름은 나머지 차원과 결합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'value', alias: '값 비율', format: 'percent'}]




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
자동 숫자 서식, 기본 활성화, 가장 높은 우선순위

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 레이블과 툴팁이 지표 값과 로케일에 따라 적절한 형식을 자동으로 선택합니다

서식 규칙: compact notation이 활성화된 십진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용

예:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 서식이며 레이블과 툴팁에 자동 적용됩니다

참고: 사용자 지정 서식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 설정을 덮어씁니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 포맷 유형. 숫자(10진수), 백분율(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율. 0일 수 없습니다
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호. 예: %, ‰
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷 천 단위 구분 기호
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000, significantDigits:1로 변환됩니다
\- 1234.5678은 1200, significantDigits:2로 변환됩니다
\- 1234.5678은 1230, significantDigits:3로 변환됩니다
\- 1234.5678은 1234, significantDigits:4로 변환됩니다
\- 1234.5678은 1234.6, significantDigits:5 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, significantDigits:6 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.568, significantDigits:7 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:8 (roundingMode:halfCeil)로 변환됩니다



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 포맷 유형. 숫자(10진수), 백분율(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율. 0일 수 없습니다
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호. 예: %, ‰
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷 천 단위 구분 기호
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000, significantDigits:1로 변환됩니다
\- 1234.5678은 1200, significantDigits:2로 변환됩니다
\- 1234.5678은 1230, significantDigits:3로 변환됩니다
\- 1234.5678은 1234, significantDigits:4로 변환됩니다
\- 1234.5678은 1234.6, significantDigits:5 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, significantDigits:6 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.568, significantDigits:7 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:8 (roundingMode:halfCeil)로 변환됩니다



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "size" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- label: 지표를 레이블 채널에 매핑

\- color: 색상 채널에 매핑되는 지표

\- label: 라벨 채널에 매핑되는 지표

\- tooltip: 툴팁 채널에 매핑되는 지표

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 지표 설정 형태에서 트리 형태의 지표 그룹을 구성합니다. parentId는 부모 지표 그룹의 id를 가리키며 지표 트리를 구성하는 데 사용됩니다

:::

:::tip{title=Tip}
지표 트리를 설정하는 방법은 두 가지입니다. 옵션 1은 children으로 지표 트리를 직접 설정하고, 옵션 2는 parentId가 있는 평면 지표 목록을 설정합니다. 두 방법은 동시에 사용할 수 없습니다

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정

:::


### field

**Type:** `string`

:::note{title=설명}
페이지네이션 필드입니다. 페이지네이션에 사용할 필드명을 지정하며, 반드시 차원이어야 합니다
:::

### currentValue

**Type:** `string`

:::note{title=설명}
현재 페이지네이션 값입니다. 현재 페이지를 판별하는 기준 값을 지정합니다
:::

**예시**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
차트 배경색



배경색은 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')일 수 있습니다
:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
선형 그라데이션 색상 구성입니다. 차트의 색상 체계를 정의하는 데 사용합니다

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
이산 색상 팔레트. 차트의 여러 요소 색상을 정의하는 데 사용합니다
:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
선형 그라데이션 색상 팔레트. 차트의 여러 요소 색상을 정의하는 데 사용합니다
:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
색상 매핑. 데이터 값을 구체적인 색상에 매핑하는 데 사용합니다
:::

**예시**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정으로, 차트에서 양수 값의 색상을 정의합니다
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정으로, 차트에서 음수 값의 색상을 정의합니다
:::


## label

**Type:** `Label | undefined`

:::note{title=설명}
차트 데이터 레이블을 정의하는 레이블 설정입니다. 위치, 형식, 스타일 등을 포함합니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
레이블 기능을 활성화할지 여부
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}
레이블을 줄바꿈할지 여부
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 지표 값을 표시할지 여부

여러 지표가 있는 시나리오에서도 값 충돌을 걱정할 필요가 없습니다. 모든 그리기 관련 지표는 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 하나의 지표로 병합되기 때문입니다.

주의: encoding.label의 우선순위가 더 높으며, 이 설정은 encoding.label에 영향을 주지 않습니다
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 지표 값의 백분율을 표시할지 여부

여러 지표가 있는 시나리오에서도 값 충돌을 걱정할 필요가 없습니다. 모든 그리기 관련 지표는 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 하나의 지표로 병합되기 때문입니다.

주의: encoding.label의 우선순위가 더 높으며, 이 설정은 encoding.label에 영향을 주지 않습니다
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 차원 레이블을 표시할지 여부

모든 차원 레이블을 표시합니다

주의: encoding.label의 우선순위가 더 높으며, 이 설정은 encoding.label에 영향을 주지 않습니다
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 값을 자동으로 포맷할지 여부. autoFormat이 true이면 numFormat 설정은 무시됩니다
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
레이블 값 포맷 설정입니다. `measure`의 `format`과 병합되며, `measure`의 `format` 우선순위가 더 높습니다. numFormat의 우선순위는 autoFormat보다 낮습니다
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 포맷 유형. 숫자(10진수), 백분율(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율. 0일 수 없습니다
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호. 예: %, ‰
:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷 천 단위 구분 기호
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000, significantDigits:1로 변환됩니다
\- 1234.5678은 1200, significantDigits:2로 변환됩니다
\- 1234.5678은 1230, significantDigits:3로 변환됩니다
\- 1234.5678은 1234, significantDigits:4로 변환됩니다
\- 1234.5678은 1234.6, significantDigits:5 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, significantDigits:6 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.568, significantDigits:7 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:8 (roundingMode:halfCeil)로 변환됩니다



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
레이블 글꼴 크기
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
레이블 글꼴 두께
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
레이블 배경색
:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
레이블 스트로크 색상
:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
레이블 글꼴 색상
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
마크 색상에 따라 레이블 글꼴 색상을 자동 반전할지 여부
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
레이블 위치
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 겹침 방지를 활성화할지 여부
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
레이블 필터입니다. 기본적으로 selectors 사이의 조건 관계는 OR입니다
:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드, dimensions 항목 중 하나의 id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다

operator와 동일합니다
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목에서 차원 필드의 값을 선택합니다. 배열을 지원합니다
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다

핵심 기능:

\- 임의로 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수로 데이터 작업 수행

\- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

환경 요구 사항: 브라우저 환경에서만 지원되며 Node.js 환경에서는 fallback을 사용합니다

주의: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 설정

AI가 생성한 JavaScript 코드로 차트 마크(막대, 점 등)를 필터링합니다
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터 요구 사항 설명(자연어)
:::

**예시**
\- 임의의 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수로 데이터 작업 수행



#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터 코드

\- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R을 통해 접근)

\- 입력 매개변수: data(배열), 각 item은 행 번호를 나타내는 __row_index 필드를 포함합니다

\- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

\- __row_index는 원본 데이터 항목의 행 번호이고, field는 하이라이트할 필드를 의미합니다

\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청
:::

**예시**
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

const profitRate = item.profit / item.sales;
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
코드 실행 실패 또는 지원되지 않는 환경에서의 fallback 방안
:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드, dimensions 항목 중 하나의 id
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다

operator와 동일합니다
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목에서 차원 필드의 값을 선택합니다. 배열을 지원합니다
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 쓰이며 런타임에는 읽기 전용입니다
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `ColorLegend | undefined`

:::note{title=설명}
색상 범례 구성입니다. 범례의 위치, 형식, 스타일 등을 정의하는 데 사용합니다.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
범례 위치
:::

**예시**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=설명}
범례 기능을 활성화할지 여부
:::

**예시**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상
:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
범례 글꼴 크기
:::

**예시**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
범례 글꼴 두께
:::

**예시**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}




브러시 선택 활성화 여부

:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 정보를 활성화할지 여부
:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}








브러시 선택 모드: 단일 또는 다중

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
brush 선택을 활성화할지 여부
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}
brush 유형

선택 영역의 모양과 선택 방향을 정의합니다.

\- `rect`: 사각형 선택. X축과 Y축 두 방향에서 동시에 선택할 수 있습니다

\- `polygon`: 다각형 선택. 여러 점을 클릭해 임의의 다각형을 그려 선택합니다

\- `x`: X축 방향 선택. X축 방향으로만 선택하며 Y축 방향은 제한하지 않습니다

\- `y`: Y축 방향 선택. Y축 방향으로만 선택하며 X축 방향은 제한하지 않습니다
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
불투명도 of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
브러시 선택 종료 후 선택 영역을 지울지 여부
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
브러시 영역 안 데이터의 스타일

선택된 데이터 포인트의 스타일을 정의합니다
:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
불투명도

선택된 데이터 포인트의 불투명도이며 값 범위는 0-1입니다
:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
스트로크 너비
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X축, 범주 축, X축 구성입니다. 위치, 형식, 스타일 등을 포함하여 차트의 X축을 정의합니다.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
\- 100000는 10万, ratio:10000, symbol:"万"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
스트로크 너비
:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}




데이터 선택자입니다. 설정하면 숫자 값, 부분 데이터 항목, 차원 또는 측정값에 대한 매칭 기능을 제공합니다. 설정하지 않으면 스타일이 전역으로 적용됩니다.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

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
언어



차트 언어 설정입니다. 'zh\-CN'과 'en\-US' 두 언어를 지원하며, intl.setLocale('zh\-CN') 메서드를 호출해 언어를 설정할 수도 있습니다

:::

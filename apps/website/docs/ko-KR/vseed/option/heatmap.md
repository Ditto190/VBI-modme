# Heatmap

:::info{title=권장}
\- 권장 필드 구성: `1`개 지표, `2`개 차원

\- 데이터 리셰이프 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
히트맵은 다음 시각 채널을 지원합니다:

`xAxis`      : X축 채널, `여러 차원`을 지원하며 차원 값을 X축에 매핑합니다

`yAxis`      : Y축 채널, `여러 차원`을 지원하며 차원 값을 Y축에 매핑합니다

`detail` : 상세 채널, `여러 차원`을 지원하며 같은 색상 계열에서 더 세분화된 데이터를 표시할 때 사용합니다

`color`  : 색상 채널, `하나의 지표`를 지원하며 지표 값을 색상에 매핑합니다

`tooltip`: 툴팁 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 마우스를 올릴 때 표시됩니다

`label`  : 레이블 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 데이터 레이블을 표시합니다

:::

:::note{title=설명}
히트맵은 2차원 행렬의 색상 농도로 데이터의 분포와 강도 관계를 보여줍니다.

적용 시나리오:

\- 대규모 2차원 데이터의 밀도와 강도 표시

\- 범주와 수치 간의 연관 분석

\- 시계열과 범주의 교차 비교

:::

:::warning{title=Warning}
데이터 요구사항:

\- 히트맵의 행과 열을 결정하기 위해 최소 2개의 차원 필드가 필요합니다

\- 색상 농도를 매핑하기 위해 최소 1개의 숫자 필드(지표)가 필요합니다

\- 여러 지표를 지원하는 경우 일반적으로 하나의 지표를 선택해 색상에 매핑합니다

기본으로 활성화되는 기능:

\- 범례, 축, 데이터 레이블, 툴팁, 수치 스케일링이 기본으로 활성화됩니다

:::


## chartType

**Type:** `"heatmap"`

:::note{title=설명}
히트맵



히트맵은 2차원 행렬의 색상 농도로 데이터의 분포와 강도 관계를 보여줍니다.

:::

**예시**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋



TidyData 규격을 따르고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자가 입력한 데이터셋은 별도 전처리가 필요하지 않습니다. VSeed는 강력한 데이터 리셰이프 기능을 제공하며 자동으로 데이터를 리셰이프합니다. 히트맵 데이터는 최종적으로 2개 차원과 1개 지표로 변환됩니다.

:::

**예시**
[{month:'1월', value:100}, {month:'2월', value:150}, {month:'3월', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=설명}
차원



히트맵의 첫 번째 차원은 각도 축에 매핑되고, 나머지 차원은 여러 지표가 있을 경우 지표 이름과 결합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'category', alias: '카테고리'}]




### id

**Type:** `string`

:::note{title=설명}
차원에 대응하는 필드 ID

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
시간 단위, 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- xAxis: 여러 차원을 X축에 매핑할 수 있습니다

\- yAxis: 여러 차원을 Y축에 매핑할 수 있습니다

\- tooltip: 여러 차원을 tooltip 채널에 매핑할 수 있습니다

\- label: 여러 차원을 label 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=설명}
지표



히트맵의 지표는 자동으로 하나의 지표로 병합되어 반지름 축에 매핑됩니다. 여러 지표가 있을 경우 지표 이름은 나머지 차원과 결합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'value', alias: '값'}]




### id

**Type:** `string`

:::note{title=설명}
지표 ID이며 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
지표 별칭, 중복을 허용합니다. 설정하지 않으면 alias 는 id 입니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 형식화, 기본적으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 레이블과 툴팁이 지표 값과 locale에 따라 적절한 형식을 자동으로 선택합니다

형식화 규칙: compact notation이 활성화된 10진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용

예:

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
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호입니다. 예: %, ‰

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호입니다. 예: %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
숫자 형식 접미사

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호입니다. 예: %, ‰

:::

**예시**
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식 비율, 0일 수 없습니다

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
숫자 형식 접미사

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
숫자 형식의 소수 자릿수, 브라우저 Intl.NumberFormat의 minimumFractionDigits 및 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- color: 색상 채널에 매핑되는 지표

\- label: label 채널에 매핑되는 지표

\- tooltip: tooltip 채널에 매핑되는 지표

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 지표 설정 형식에서 트리형 지표 그룹을 구성합니다. parentId는 부모 지표 그룹의 id를 가리키며 지표 트리를 구성하는 데 사용됩니다

:::

:::tip{title=Tip}
지표 트리를 설정하는 방법은 두 가지입니다. 옵션 1은 children이 있는 지표 트리를 직접 설정하는 방식이고, 옵션 2는 parentId가 있는 평면 지표 목록을 설정하는 방식입니다. 두 방식은 동시에 사용할 수 없습니다

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정

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
차트 배경색



배경색은 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')일 수 있습니다

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상



색상 목록, 색상 매핑, 색상 그라데이션을 포함해 차트의 색상 체계를 정의하는 색상 설정입니다.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 서로 다른 요소 색상을 정의하는 이산 색상 체계

:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 서로 다른 요소 색상을 정의하는 선형 그라데이션 색상 체계

:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
데이터 값을 특정 색상에 매핑하는 색상 매핑

:::

**예시**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정; 차트에서 양수 값의 색상을 정의합니다

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정; 차트에서 음수 값의 색상을 정의합니다

:::


## label

**Type:** `Label | undefined`

:::note{title=설명}
히트맵 레이블 구성입니다. 차트의 데이터 레이블을 정의하며, 레이블 반전 색상을 자동으로 활성화해 가독성을 보장합니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
레이블 기능 활성화 여부

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}
레이블을 다음 줄로 줄바꿈할지 여부

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 지표 값을 표시할지 여부

다중 지표 시나리오에서는 값 충돌을 걱정할 필요가 없습니다. 플롯 관련 모든 지표는 `foldMeasures` 처리를 거쳐 단일 데이터 포인트를 나타내는 하나의 지표로 병합됩니다

참고: encoding의 label 우선순위가 더 높으므로 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 지표 값의 백분율을 표시할지 여부

다중 지표 시나리오에서는 값 충돌을 걱정할 필요가 없습니다. 플롯 관련 모든 지표는 `foldMeasures` 처리를 거쳐 단일 데이터 포인트를 나타내는 하나의 지표로 병합됩니다

참고: encoding의 label 우선순위가 더 높으므로 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
레이블에 차원 레이블을 표시할지 여부

모든 차원 레이블 표시

참고: encoding의 label 우선순위가 더 높으므로 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 값을 자동 형식화할지 여부. autoFormat이 true이면 numFormat 설정은 무시됩니다

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
레이블 값 형식 설정입니다. `measure`의 `format`과 병합되며, `measure`의 `format` 우선순위가 더 높습니다. numFormat 우선순위는 autoFormat보다 낮습니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

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
숫자 형식 비율, 0일 수 없습니다

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

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
숫자 형식의 소수 자릿수, 브라우저 Intl.NumberFormat의 minimumFractionDigits 및 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드, 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
label 글꼴 두께

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
레이블 배경색

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
레이블 테두리 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
레이블 글꼴 색상

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
요소 색상에 따라 글꼴 색상을 자동 반전할지 여부

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
레이블 위치

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 겹침 방지 기능 활성화 여부

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
레이블 필터링, selector 간 기본 관계는 Or입니다

:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드입니다. dimensions 내 항목의 ID입니다.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
Operator

\- in: 차원 field 값이 값 목록에 있는 데이터 항목을 선택합니다.

\- not in: 차원 field 값이 값 목록에 없는 데이터 항목을 선택합니다.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
Operator

\- in: 차원 field 값이 값 목록에 있는 데이터 항목을 선택합니다.

\- not in: 차원 field 값이 값 목록에 없는 데이터 항목을 선택합니다.

operator와 동일

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값을 선택합니다. 배열을 지원합니다
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
애니메이션 필터(AI 생성 코드 실행)



AI 생성 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다



핵심 기능:

\- 임의의 복잡한 데이터 필터링 조건 지원

\- 데이터 작업용 내장 유틸리티 함수 사용

\- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행



환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다



참고: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter의 우선순위가 더 높습니다



차트 애니메이션 필터 설정



AI 생성 JavaScript 코드로 차트 마커(막대, 점 등)를 필터링합니다

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)입니다.

:::

**예시**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



#### code

**Type:** `string`

:::note{title=설명}
핵심 기능:



\- 임의의 복잡한 데이터 필터링 조건 지원

\- 데이터 작업용 내장 유틸리티 함수 사용

\- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다

참고: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter의 우선순위가 더 높습니다

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드를 강조합니다
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 영역에서 이익률이 가장 높은 데이터 항목을 강조합니다
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

다중 조건 필터링으로 데이터 항목을 강조합니다
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
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드입니다. dimensions 내 항목의 ID입니다.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
Operator

\- in: 차원 field 값이 값 목록에 있는 데이터 항목을 선택합니다.

\- not in: 차원 field 값이 값 목록에 없는 데이터 항목을 선택합니다.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
Operator

\- in: 차원 field 값이 값 목록에 있는 데이터 항목을 선택합니다.

\- not in: 차원 field 값이 값 목록에 없는 데이터 항목을 선택합니다.

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값을 선택합니다. 배열을 지원합니다
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다
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
legend



히트맵 색상 범례 구성입니다. 범례의 위치, 형식, 스타일 등을 정의하는 데 사용합니다.

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
legend font color

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
legend font color

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
툴팁



히트맵 툴팁 구성입니다. 툴팁의 위치, 형식, 스타일 등을 정의하는 데 사용합니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 기능 활성화 여부

:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 선택 상자의 모양과 선택 방향을 정의합니다



\- `polygon`: 다각형 선택. 여러 점을 클릭해 임의의 다각형을 그려 선택할 수 있습니다



브러시 선택 모드: 단일 또는 다중

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
선택된 데이터 포인트의 스타일을 정의합니다.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}
brushtype



불투명도

선택된 데이터 포인트의 불투명도, 범위 0-1

\- `polygon`: 다각형 브러시 선택. 여러 점을 클릭해 임의의 다각형을 그려 선택합니다

\- `x`: X축 방향으로만 브러시 선택합니다. Y축 방향은 제한되지 않습니다

\- `y`: Y축 방향 브러시 선택. X축 방향은 제한하지 않습니다

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
선택된 데이터 포인트의 불투명도, 범위 0-1



선택되지 않은 데이터 항목의 스타일

선택된 브러시 영역 밖의 데이터 포인트 스타일을 정의합니다

\- `multiple`: 다중 선택 모드. 여러 브러시 영역이 동시에 존재할 수 있습니다

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
브러시 선택이 끝난 후 선택 영역을 지울지 여부

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
선택되지 않은 데이터 포인트의 불투명도, 범위 0-1



브러시 선택된 데이터 포인트의 스타일을 정의합니다

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
선택되지 않은 데이터 항목의 스타일



브러시 선택 밖의 데이터 포인트 스타일을 정의합니다

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
범주 축(X축) 설정으로, 위치, 형식, 스타일 등을 포함해 차트의 X축을 정의합니다.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X축, 범주 축, X축 설정입니다. 위치, 형식, 스타일 등을 포함해 차트의 X축을 정의합니다.



브러시 선택 밖의 데이터 포인트 스타일을 정의합니다

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
선택되지 않은 데이터 항목의 스타일



브러시 선택 외부 데이터 포인트의 불투명도, 범위 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
범주 축(X축) 설정으로, 위치, 형식, 스타일 등을 포함해 차트의 X축을 정의합니다.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
차트 테마입니다. 테마는 우선순위가 낮은 기능 설정으로, 모든 차트 유형이 공유하는 공통 설정과 단일 차트 유형이 공유하는 차트 설정을 포함합니다.



내장 라이트/다크 테마가 있으며, 사용자는 Builder를 통해 테마를 사용자 지정할 수 있습니다.



테마



내장 라이트/다크 테마가 있으며, registerTheme을 통해 새 테마를 사용자 지정할 수 있습니다.

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



차트 언어 설정입니다. 'zh-CN' 및 'en-US'를 지원합니다. intl.setLocale('zh-CN')을 호출해 언어를 설정할 수도 있습니다.

:::

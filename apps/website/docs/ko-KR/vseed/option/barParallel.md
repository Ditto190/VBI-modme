# BarParallel

:::info{title=권장}
\- 권장 필드 구성: `1`개 지표, `2`개 차원

\- 데이터 리셰이프 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
병렬 막대 차트는 다음 시각 채널을 지원합니다:

`yAxis`  : Y축 채널이며 `여러 차원`을 지원하고 차원 값을 기준으로 Y축에 매핑합니다

`xAxis`  : X축 채널이며 `여러 지표`를 지원하고 지표 값을 기준으로 X축에 매핑합니다

`detail` : 상세 채널이며 `여러 차원`을 지원하고 같은 색상 시리즈 안에서 더 세분화된 데이터를 표시할 때 사용합니다

`color`  : 색상 채널이며 `여러 차원` 또는 `하나의 지표`를 지원합니다. 차원 색상은 데이터 시리즈를 구분하고, 지표 색상은 값을 그래픽 색상으로 선형 매핑합니다

`tooltip`: 툴팁 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트에 마우스를 올리면 표시됩니다

`label`  : 라벨 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트에 데이터 라벨을 표시합니다

:::

:::note{title=설명}
병렬 막대 차트는 여러 지표를 가로 방향으로 병렬 비교하는 시나리오에 적합하며, 여러 막대를 나란히 배치해 서로 다른 지표 값을 표시합니다.

적용 시나리오:

- 카테고리 이름이 긴 경우의 다중 지표 비교.

- 순위와 값을 동시에 보여주는 가로 비교.

- 다차원 데이터의 병렬 분석.

:::

:::warning{title=Warning}
데이터 요구 사항:

\- 최소 1개 지표 필드

\- 첫 번째 차원은 Y축에 배치됩니다. 나머지 차원은 여러 지표가 있을 때 지표 이름과 병합되어 범례 항목으로 표시됩니다.

\- 모든 지표는 자동으로 하나의 지표로 병합됩니다.

기본으로 활성화되는 기능:

\- 범례, 축, 데이터 라벨, 툴팁이 기본으로 활성화됩니다.

:::


## chartType

**Type:** `"barParallel"`

:::note{title=설명}
병렬 막대 차트는 여러 지표의 가로 병렬 비교에 적합합니다.

:::

**예시**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터 소스: TidyData 규격을 따르는 집계된 데이터셋으로 차트의 데이터 소스와 구조를 정의합니다. 사용자 입력 데이터셋은 사전 처리할 필요가 없습니다. VSeed의 강력한 데이터 리셰이프 기능이 자동으로 처리하며, 병렬 막대 차트 데이터는 최종적으로 2개의 차원과 1개의 지표로 변환됩니다.

:::

**예시**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=설명}
차원: 첫 번째 차원은 Y축에 매핑됩니다. 나머지 차원은 여러 지표가 있을 때 지표 이름과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'category', alias: 'category'}]




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
차원 날짜 포맷 설정

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
시간 단위, 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- yAxis: 여러 차원을 Y축에 매핑할 수 있습니다

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 detail 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 tooltip 채널에 매핑할 수 있습니다

\- label: 여러 차원을 label 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=설명}
지표: 병렬 막대 차트의 지표는 자동으로 하나의 지표로 병합되어 X축에 매핑됩니다. 여러 지표가 있는 경우 지표 이름은 나머지 차원과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'value1', alias: 'measure1'}, {id: 'value2', alias: 'measure2'}]




### id

**Type:** `string`

:::note{title=설명}
지표 식별자, 중복될 수 없습니다

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

활성화하면 차트 데이터 레이블과 툴팁이 지표 값과 로케일에 따라 적절한 형식을 자동으로 선택합니다

형식화 규칙: compact notation이 활성화된 10진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용

예:

\- 로케일=zh-CN: 749740.264 → 74.45万

\- 로케일=en-US: 749740.264 → 744.5K

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
숫자 형식 유형, 지원: number(10진수), percent(%), permille(‰), 과학적 표기법

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
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

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
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



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
숫자 형식 유형, 지원: number(10진수), percent(%), permille(‰), 과학적 표기법

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
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

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
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드, 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- xAxis: X축에 매핑되는 지표

\- detail: 상세 채널에 매핑되는 지표

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
지표 트리를 구성하는 방법은 두 가지입니다. 옵션 1은 children으로 지표 트리를 직접 구성하는 것이고, 옵션 2는 parentId가 있는 평면 지표 목록을 구성하는 것입니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션



차트 페이지네이션 설정

:::


### field

**Type:** `string`

:::note{title=설명}
페이지네이션 필드입니다. 페이지네이션에 사용할 필드 이름을 지정하며 차원이어야 합니다

:::

### currentValue

**Type:** `string`

:::note{title=설명}
현재 페이지네이션 값입니다. 현재 페이지를 결정하는 데 사용할 값을 지정합니다

:::

**예시**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
차트 배경색입니다. 기본값은 투명 배경입니다. 배경색은 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')일 수 있습니다.

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
차트의 색상 체계를 정의하는 색상 구성입니다. 색상 목록, 색상 매핑, 색상 그라데이션을 포함합니다.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 여러 요소 색상을 정의하는 이산 색상표

:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 여러 요소 색상을 정의하는 선형 그라데이션 색상표

:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
데이터 값을 특정 색상에 매핑하는 데 사용하는 색상 매핑

:::

**예시**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 구성입니다. 차트에서 양수 값의 색상을 정의합니다

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 구성입니다. 차트에서 음수 값의 색상을 정의합니다

:::


## label

**Type:** `Label | undefined`

:::note{title=설명}
위치, 형식, 스타일을 포함해 차트 데이터 레이블을 정의하는 레이블 설정입니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
label 기능을 활성화할지 여부

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}
label을 다음 줄로 줄바꿈할지 여부

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}
label에 지표 값을 표시할지 여부

멀티 지표 시나리오에서는 플롯 관련 모든 지표가 `foldMeasures` 처리를 거쳐 단일 데이터 포인트를 나타내는 하나의 지표로 병합되므로 값 충돌을 걱정할 필요가 없습니다

참고: encoding의 label 우선순위가 더 높으며, 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
label에 지표 값의 백분율을 표시할지 여부

멀티 지표 시나리오에서는 플롯 관련 모든 지표가 `foldMeasures` 처리를 거쳐 단일 데이터 포인트를 나타내는 하나의 지표로 병합되므로 값 충돌을 걱정할 필요가 없습니다

참고: encoding의 label 우선순위가 더 높으며, 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
label에 차원 label을 표시할지 여부

모든 차원 레이블을 표시합니다

참고: encoding의 label 우선순위가 더 높으며, 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
label 값을 자동으로 형식화할지 여부입니다. autoFormat이 true이면 numFormat 구성이 무시됩니다

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
label 값 형식 구성입니다. `measure`의 `format`과 병합되며 `measure`의 `format`이 더 높은 우선순위를 가집니다. numFormat은 autoFormat보다 우선순위가 낮습니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 타입입니다. number(소수), percent(%), permille(‰), 과학적 표기법을 지원합니다

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
숫자 포맷의 천 단위 구분자

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
숫자 형식의 소수 자릿수입니다. 브라우저의 Intl.NumberFormat minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다

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
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

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
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
label 글꼴 크기

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
label 글꼴 두께

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
label 배경색

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
label 윤곽선 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 색상

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
그래픽 요소의 색상에 따라 label 글꼴 색상을 자동으로 반전할지 여부

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
라벨 위치

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
label 겹침 방지를 활성화할지 여부

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
label 필터링입니다. selector 간 기본 관계는 OR입니다

:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

핵심 기능:

- 임의의 복잡한 데이터 필터 조건을 지원합니다

- 내장 유틸리티 함수를 사용해 데이터 작업을 수행합니다

- 브라우저 환경에서 안전하게 실행됩니다(Web Worker 샌드박스)

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다

참고: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 구성

AI가 생성한 JavaScript 코드로 차트 마크(영역, 점 등)를 필터링합니다
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)
:::

**예시**
"sales가 1000보다 큰 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



\- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

\- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

\- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

\- __row_index는 원본 데이터 항목의 행 번호를, field는 강조할 필드를 나타냅니다

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드를 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 영역에서 이익률이 가장 높은 데이터 항목을 강조
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

여러 조건으로 필터링된 데이터 항목을 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션
:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
애니메이션 필터 실행 결과(런타임 필드)



prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=설명}
차트 범례 설정입니다. 범례의 위치, 형식, 스타일 등을 정의합니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
범례 기능을 활성화할지 여부
:::

**예시**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=설명}
범례 테두리를 활성화할지 여부입니다.
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}
pager 아이콘 색상

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
비활성화된 pager 아이콘 색상

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
범례 글꼴 크기
:::

**예시**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
범례 글꼴 두께
:::

**예시**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}
범례 모양
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
범례 위치
:::

**예시**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=설명}
범례 항목이 많을 때의 최대 열 또는 행 수





:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=설명}
플롯 영역 안쪽 여백



VChart region[0].padding에 매핑되어 주석과 label처럼 플롯 영역 밖으로 확장되는 요소를 위한 공간을 확보합니다.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
위치, 형식, 스타일 등을 포함해 차트 툴팁을 정의하는 툴팁 설정입니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 기능 활성화 여부
:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
차트 브러시 설정









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

brush의 모양과 선택 방향을 정의합니다

\- `rect`: 사각형 brush 선택입니다. X축과 Y축 방향에서 동시에 선택할 수 있습니다

\- `polygon`: 다각형 brush 선택입니다. 여러 점을 클릭해 임의의 다각형을 그려 선택합니다

\- `x`: X축 방향 brush 선택입니다. X축 방향으로만 선택하며 Y축 방향은 제한하지 않습니다

\- `y`: Y축 방향 brush 선택입니다. Y축 방향으로만 선택하며 X축 방향은 제한하지 않습니다
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
\- `multiple`: multiple 모드입니다. 여러 brush 선택이 동시에 공존할 수 있습니다



brush 선택 모드를 정의합니다


\- `multiple`: multiple 선택 모드입니다. 여러 brush 영역이 동시에 존재할 수 있습니다

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
선택이 끝난 후 brush 영역을 삭제할지 여부

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
불투명도



선택된 데이터 포인트의 불투명도, 범위 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상

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
불투명도



선택되지 않은 데이터 포인트의 불투명도, 범위 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비
:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=설명}
애니메이션 설정



차트 애니메이션 구성입니다. 사용 가능한 효과는 차트 유형에 따라 달라집니다

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
바/컬럼 차트 애니메이션을 활성화할지 여부입니다

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=설명}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=설명}
축을 반대로 표시할지 여부입니다. 숫자 축에만 적용됩니다.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=설명}
Label color

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 easing 함수

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 지속 시간(밀리초)

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=설명}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=설명}
막대/컬럼 차트 업데이트 효과로, 성장 및 진입 애니메이션을 지원합니다

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 easing 함수

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 지속 시간(밀리초)

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=설명}
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
loop 애니메이션을 활성화할지 여부

:::

##### interval

**Type:** `number | undefined`

:::note{title=설명}
loop 애니메이션 간격(밀리초)

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=설명}
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=설명}
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부

:::

###### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 easing 함수

:::

###### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 지속 시간(밀리초)

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=설명}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=설명}
분위기 애니메이션 easing 함수

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
분위기 애니메이션 색상

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=설명}
분위기 애니메이션 효과입니다. ripple, visibility, breathing 효과를 지원합니다

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=설명}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축을 표시할지 여부
:::

### min

**Type:** `number | undefined`

:::note{title=설명}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=설명}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=설명}
로그 축을 사용할지 여부입니다. 숫자 축에만 적용됩니다

:::

### logBase

**Type:** `number | undefined`

:::note{title=설명}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=설명}
더 읽기 쉬운 tick label을 위해 축 tick 간격을 자동 조정할지 여부입니다. min과 max가 설정된 경우 이 옵션은 비활성화되며 숫자 축에만 적용됩니다.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
축을 반대로 표시할지 여부입니다. 숫자 축에만 적용됩니다
:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}
좌표축에 0 값을 강제로 표시할지 여부입니다. min과 max가 설정되어 있으면 이 설정은 적용되지 않습니다. 숫자 축에만 적용됩니다.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 축 tick label을 자동으로 형식화할지 여부입니다. 숫자 축에만 적용됩니다. autoFormat이 true이면 numFormat은 무시됩니다.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
숫자 축의 숫자 형식입니다. 숫자 축에만 적용되며 autoFormat보다 우선순위가 낮습니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 유형, 지원: number(10진수), percent(%), permille(‰), 과학적 표기법

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
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식의 천 단위 구분자

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 접두사

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
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
X축 눈금 라벨
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
라벨을 표시할지 여부
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
라벨 색상
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
라벨 글꼴 크기
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
라벨 글꼴 굵기
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}
라벨 회전 각도
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X축 선
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축 선을 표시할지 여부
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
축 선 색상
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
축 선 너비
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
X축 눈금
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
눈금을 표시할지 여부
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
눈금이 안쪽을 향할지 여부
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
눈금 색상
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
눈금 크기
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}
X축 제목
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
제목을 표시할지 여부
:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}
제목 텍스트이며 기본적으로 필드 설정을 따릅니다
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
제목 색상
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}
제목 글꼴 크기
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}
제목 글꼴 굵기
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=설명}
내장 `light` 및 `dark` 테마를 포함합니다. 사용자 지정 테마는 `registerTheme`로 추가할 수 있습니다.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=설명}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=설명}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
전역 스타일 또는 조건부 스타일 구성을 지원합니다.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=설명}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}
}
:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=설명}
Y-axis category-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축을 표시할지 여부
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
축을 반대로 표시할지 여부입니다. 숫자 축에만 적용됩니다
:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}
좌표축에 0 값을 강제로 표시할지 여부입니다. min과 max가 설정되어 있으면 이 설정은 적용되지 않습니다. 숫자 축에만 적용됩니다.
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=설명}
축 레이블 자동 숨김입니다. 두 레이블이 겹치면(autoHideGap보다 간격이 작으면) 겹침을 일으키는 레이블을 자동으로 숨깁니다. 범주 축에만 적용됩니다.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=설명}
축 레이블 자동 숨김 간격입니다. 두 텍스트 레이블의 간격이 autoHideGap보다 작으면 겹침을 일으키는 레이블을 자동으로 숨깁니다. 범주 축에만 적용됩니다.

autoHide가 켜져 있으면 autoHide를 사용하며 autoHideSeparation에 설정합니다

autoHide가 꺼져 있으면 sampling 샘플링을 사용하며 minGap에 설정합니다
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=설명}
축 레이블 자동 회전입니다. 레이블 너비가 축 길이를 초과하면 레이블을 자동으로 회전합니다. 범주 축에만 적용됩니다.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=설명}
축 레이블 자동 회전 각도 범위입니다. 자동 회전이 켜져 있을 때의 레이블 회전 각도 범위입니다. 범주 축에만 적용됩니다.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=설명}
축 레이블 자동 길이 제한입니다. 레이블 너비가 축 길이를 초과하면 초과 부분을 말줄임표로 표시하고 마우스를 올리면 전체 레이블을 볼 수 있습니다. 범주 축에만 적용됩니다.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=설명}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
X축 눈금 라벨
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
라벨을 표시할지 여부
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
라벨 색상
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
label 글꼴 크기

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
label 글꼴 두께

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}
라벨 회전 각도

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X축 선

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
}
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식 접미사
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
눈금이 안쪽을 향할지 여부
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
범례 정렬 구성입니다. 차원 또는 지표 기반 정렬과 사용자 지정 정렬 순서를 지원하며, sort 배열은 왼쪽에서 오른쪽 또는 위에서 아래 순서를 따릅니다.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
눈금 크기
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}
X축 제목

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}
제목 텍스트이며 기본적으로 필드 설정을 따릅니다
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}
사용자 지정 정렬 순서입니다. 이 순서는 범례에 직접 적용됩니다. 오름차순은 왼쪽에서 오른쪽 또는 위에서 아래를 따르고, 내림차순은 오른쪽에서 왼쪽 또는 아래에서 위를 따릅니다.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=설명}
내장 `light` 및 `dark` 테마를 포함합니다. 사용자 지정 테마는 `registerTheme`로 추가할 수 있습니다.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=설명}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=설명}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
전역 스타일 또는 조건부 스타일 구성을 지원합니다.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=설명}
selector = [{ profit: 100 }, { profit: 200 }]
:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}
}
:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=설명}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=설명}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}
crosshair 사각 영역 라벨을 표시할지 여부입니다

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=설명}
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=설명}
AI가 생성한 JavaScript 코드로 차트 마크(막대, 점 등)의 필터링을 구현합니다.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=설명}
같은 범주 내 사각형 사이의 거리입니다. 픽셀 값 또는 백분율 문자열일 수 있습니다.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=설명}
Y축 정렬 구성입니다. 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다



범주축 정렬 구성입니다. 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다
:::

**예시**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
차트 동적 필터 설정입니다.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
정렬 순서이며 값은 'asc' 또는 'desc'일 수 있습니다
:::

**예시**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
각 지역에서 이익률이 가장 높은 데이터 항목을 강조 표시
:::

**예시**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
범주 축에 직접 적용되는 사용자 지정 정렬 순서
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=설명}
범례 정렬 설정이며 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다

범례 정렬 설정입니다. 정렬 배열은 왼쪽에서 오른쪽 또는 위에서 아래 순서를 따릅니다
:::

**예시**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
차트 동적 필터 설정입니다.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
정렬 순서이며 값은 'asc' 또는 'desc'일 수 있습니다
:::

**예시**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
각 지역에서 이익률이 가장 높은 데이터 항목을 강조 표시
:::

**예시**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
범례에 직접 적용되는 사용자 지정 정렬 순서입니다. 오름차순은 왼쪽에서 오른쪽 또는 위에서 아래, 내림차순은 오른쪽에서 왼쪽 또는 아래에서 위입니다
:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
차트 테마입니다. 테마는 우선순위가 낮은 기능 설정으로, 모든 차트 유형에 공통인 설정과 단일 차트 유형 범주에서 공통인 차트 설정을 포함합니다. 내장 light, dark 테마가 있으며 Builder를 통해 테마를 사용자 지정할 수 있습니다.

테마

내장 light, dark 테마가 있으며 새 테마는 registerTheme을 통해 사용자 지정할 수 있습니다.
:::

**예시**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=설명}
사각형 마크 스타일입니다. 막대 차트의 색상, 테두리, 모서리 반경 등을 정의하는 막대 차트 스타일 설정입니다.

전역 스타일 또는 조건부 스타일 설정을 지원합니다.

데이터 필터

selector가 설정된 경우 숫자 selector, 로컬 데이터 selector, 조건부 차원 selector, 조건부 지표 selector의 네 가지 데이터 매칭 기능을 제공합니다.

selector가 설정되지 않은 경우 스타일은 전역으로 적용됩니다.
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
데이터 선택기



selector를 설정하면 숫자 selector, 부분 데이터 selector, 조건 차원 selector, 조건 지표 selector의 네 가지 데이터 매칭 기능을 제공합니다

selector를 설정하지 않으면 스타일이 전역으로 적용됩니다.

:::

**예시**
숫자 선택기
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

부분 데이터 선택기
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

조건 차원 선택기
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

조건 지표 선택기
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
#### field

**Type:** `string`

:::note{title=설명}
차원 필드, dimensions 항목의 id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다

operator와 동일
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
차원 필드, 차원 항목의 ID



연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다



\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



차원 필드 값, 배열을 지원합니다



애니메이션 필터(AI 생성 코드 실행)



AI 생성 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 시나리오에 적합합니다.

:::

**예시**
"sales가 1000보다 큰 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



#### code

**Type:** `string`

:::note{title=설명}
\- 데이터 작업용 내장 유틸리티 함수 사용



\- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다

참고: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter의 우선순위가 더 높습니다

차트 애니메이션 필터 설정

AI 생성 JavaScript 코드로 차트 마커(막대, 점 등)를 필터링합니다

:::

**예시**
sales가 1000보다 큰 데이터 항목의 `sales` 필드를 강조합니다:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목을 강조합니다:
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

여러 필터 조건에 따라 데이터 항목을 강조합니다:
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
AI 생성 JavaScript 필터링 코드

:::


##### field

**Type:** `string`

:::note{title=설명}
\- 내장 유틸리티 함수(_ 또는 R을 통해 접근)만 사용할 수 있습니다

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
\- 입력 파라미터: data(배열), 각 항목에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

\- 행 인덱스와 필드 조합의 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

\- __row_index는 원본 데이터 항목의 행 번호를 나타내고, field는 강조할 필드를 나타냅니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

sales가 1000보다 큰 데이터 항목의 sales 필드를 강조합니다

각 영역에서 이익률이 가장 높은 데이터 항목을 강조합니다

다중 조건 필터링으로 데이터 항목을 강조합니다

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션

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

### barVisible

**Type:** `boolean | undefined`

:::note{title=설명}
\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

:::

### barColor

**Type:** `string | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
막대 요소(사각형 요소)의 색상 투명도

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=설명}
연산자

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

**예시**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=설명}
막대 요소(사각형 요소)의 모서리 반경



막대 요소(사각형 요소)의 스트로크 투명도

:::

**예시**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
주석 포인트 설정입니다. 선택된 데이터를 기반으로 위치, 형식, 스타일 및 관련 설정을 포함한 차트 주석 포인트를 정의합니다.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
주석 점 선택자이며 데이터 점을 선택하는 데 사용됩니다.
:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

### measureId

**Type:** `string | undefined`

:::note{title=설명}
주석 포인트가 속한 지표 id를 지정합니다. 다중 지표 시나리오에서는 selector와 함께 사용하여 대상 지표의 주석 포인트를 고유하게 찾을 수 있습니다.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 상황에 적합합니다.

핵심 기능:

- 임의의 복잡한 데이터 필터 조건을 지원합니다

- 내장 유틸리티 함수를 사용해 데이터 작업을 수행합니다

- 브라우저 환경에서 안전하게 실행됩니다(Web Worker 샌드박스)

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다

참고: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 구성

AI가 생성한 JavaScript 코드로 차트 마크(영역, 점 등)를 필터링합니다
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)
:::

**예시**
"sales가 1000보다 큰 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



\- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

\- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

\- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

\- __row_index는 원본 데이터 항목의 행 번호를, field는 강조할 필드를 나타냅니다

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드를 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 영역에서 이익률이 가장 높은 데이터 항목을 강조
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

여러 조건으로 필터링된 데이터 항목을 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션
:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
애니메이션 필터 실행 결과(런타임 필드)



prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬 방식입니다. 일반적으로 right로 설정하여 텍스트를 주석 점의 왼쪽에 표시하고 차트의 보이는 영역 안에 유지합니다

'right' 설정을 권장합니다. 이렇게 하면 텍스트가 주석 점의 왼쪽에 배치됩니다

right: 텍스트가 주석 점의 왼쪽에 있고 텍스트의 오른쪽 가장자리가 주석 점에 정렬됩니다

left: 텍스트가 주석 점의 오른쪽에 있고 텍스트의 왼쪽 가장자리가 주석 점에 정렬됩니다

center: 텍스트가 주석 점의 중앙에 정렬됩니다

:::

**예시**
'right' 텍스트가 주석 점의 왼쪽에 표시됩니다
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 세로 정렬 방식입니다. 일반적으로 top으로 설정하여 텍스트를 주석 점의 아래쪽에 표시하고 차트의 보이는 영역 안에 유지합니다

'top' 설정을 권장합니다. 이렇게 하면 텍스트 전체가 차트의 보이는 영역 안에 표시됩니다

top: 텍스트가 주석 점의 아래쪽에 있고 텍스트의 위쪽 가장자리가 주석 점에 정렬됩니다

middle: 텍스트가 주석 점의 중앙에 정렬됩니다

bottom: 텍스트가 주석 점의 위쪽에 있고 텍스트의 아래쪽 가장자리가 주석 점에 정렬됩니다

:::

**예시**
'top' 텍스트가 주석 점의 아래쪽에 표시됩니다
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
배경 표시 여부

:::

**예시**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
배경색
:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 너비

:::

**예시**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 모서리 반경

:::

**예시**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
4



### offsetY

**Type:** `number | undefined`

:::note{title=설명}




배경을 표시할지 여부입니다.

:::

**예시**
offsetY: 5는 전체 주석 포인트를 아래로 5픽셀 이동합니다



### offsetX

**Type:** `number | undefined`

:::note{title=설명}
주석 점 전체가 X 방향으로 이동하는 픽셀 거리입니다. 주석 점이 차트 왼쪽(범주 축 시작점)에 있으면 양수 값을, 오른쪽(범주 축 끝점)에 있으면 음수 값을 권장합니다.

음수 값은 전체를 왼쪽으로 이동합니다. 예를 들어 \-10은 텍스트와 배경을 포함한 주석 점 컴포넌트 전체를 왼쪽으로 10픽셀 이동합니다

양수 값은 전체를 오른쪽으로 이동합니다. 예를 들어 10은 텍스트와 배경을 포함한 주석 점 컴포넌트 전체를 오른쪽으로 10픽셀 이동합니다

:::

**예시**
offsetX: 5, 주석 점 전체가 오른쪽으로 5픽셀 이동합니다
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
'red'

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 주석선 값을 동적으로 계산합니다.

평균값, 최대값, 분위수, 비즈니스 라인처럼 데이터에 따라 주석선 위치를 동적으로 결정해야 하는 상황에 적합합니다.

브라우저 환경만 지원합니다(Web Worker 필요).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)
:::

**예시**
"주석선 기준으로 가장 높은 매출 값을 가져오기"

"주석선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



\- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

\- 입력 매개변수: data(배열)

\- 단일 숫자 또는 문자열 값을 반환해야 합니다: number | string

\- 적용 시나리오: 주석선(수평선, 수직선)에 필요한 동적 값

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales 최대값을 주석선 값으로 가져오기
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

평균값을 계산해 주석선에 사용
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

분위수 값을 주석선으로 가져오기
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

조건에 따라 목표값 계산
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
애니메이션 필터 실행 결과(런타임 필드)



prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

**예시**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬 방식입니다. 일반적으로 설정할 필요가 없습니다

'right' 설정을 권장합니다. 이렇게 하면 텍스트가 주석선의 왼쪽에 배치됩니다

right: 텍스트가 기준선의 왼쪽에 있고 텍스트의 오른쪽 가장자리가 수직 주석선에 정렬됩니다

left: 텍스트가 기준선의 오른쪽에 있고 텍스트의 왼쪽 가장자리가 수직 주석선에 정렬됩니다

center: 텍스트가 기준선 중앙에 정렬됩니다

:::

**예시**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.









:::

**예시**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
주석 영역 색상 불투명도
:::

**예시**
true



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**예시**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**예시**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**예시**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
배경 표시 여부

:::

**예시**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
배경색
:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 너비

:::

**예시**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 모서리 반경

:::

**예시**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=설명}
차원 값 주석선입니다. 수평으로 표시되며 주석선의 위치, 스타일 및 관련 설정을 구성할 수 있습니다.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
수평선을 주석으로 표시하기 위한 고정 Y 값입니다. 범주 축이 Y 방향이면 차원 값을, 수치 축이 Y 방향이면 구체적인 숫자 값을 입력할 수 있습니다.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 주석선 값을 동적으로 계산합니다.

평균값, 최대값, 분위수, 비즈니스 라인처럼 데이터에 따라 주석선 위치를 동적으로 결정해야 하는 상황에 적합합니다.

브라우저 환경만 지원합니다(Web Worker 필요).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)
:::

**예시**
"주석선 기준으로 가장 높은 매출 값을 가져오기"

"주석선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



\- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

\- 입력 매개변수: data(배열)

\- 단일 숫자 또는 문자열 값을 반환해야 합니다: number | string

\- 적용 시나리오: 주석선(수평선, 수직선)에 필요한 동적 값

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales 최대값을 주석선 값으로 가져오기
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

평균값을 계산해 주석선에 사용
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

분위수 값을 주석선으로 가져오기
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

조건에 따라 목표값 계산
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
애니메이션 필터 실행 결과(런타임 필드)



prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
2





:::

**예시**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬 방식입니다. 일반적으로 설정할 필요가 없습니다

'right' 설정을 권장합니다. 이렇게 하면 텍스트가 주석선의 왼쪽에 배치됩니다

right: 텍스트가 기준선의 왼쪽에 있고 텍스트의 오른쪽 가장자리가 수평 주석선의 끝점에 정렬됩니다

left: 텍스트가 기준선의 오른쪽에 있고 텍스트의 왼쪽 가장자리가 수평 주석선의 끝점에 정렬됩니다

center: 텍스트가 기준선 중앙에 정렬됩니다

:::

**예시**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 세로 정렬 방식입니다. 일반적으로 설정할 필요가 없습니다

'top' 설정을 권장합니다. 이렇게 하면 텍스트 전체가 차트의 보이는 영역 안에 표시됩니다

top: 텍스트가 기준선 아래쪽에 있고 텍스트의 위쪽 가장자리가 수평 주석선에 정렬됩니다

middle: 텍스트가 기준선 중앙에 정렬됩니다

bottom: 텍스트가 기준선 위쪽에 있고 텍스트의 아래쪽 가장자리가 수평 주석선에 정렬됩니다

:::

**예시**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
배경 표시 여부

:::

**예시**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
배경색
:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 너비



배경 테두리 너비

:::

**예시**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 모서리 반경

:::

**예시**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
주석 영역 색상 불투명도



주석 영역 색상 불투명도
:::

**예시**
true



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**예시**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**예시**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**예시**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=설명}
주석 영역 테두리의 대시 스타일입니다.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
주석 값보다 큰 부분의 기본 색상
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=설명}
주석 영역 구성입니다. 선택한 데이터에 따라 차트의 주석 영역 위치, 스타일 등을 정의합니다.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=설명}
차트에서 perspective가 활성화되었거나 지표이 결합된 경우 차원 연동 기능을 활성화할지 여부입니다.

:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'annotationtext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=설명}
2

:::

**예시**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
다항 회귀선 구성입니다. 다항식 차수, 회귀선 스타일 등을 포함합니다.

'center'로 설정하는 것을 권장합니다. 이렇게 하면 텍스트가 마크 영역의 중앙에 표시됩니다







:::

**예시**
'center': 텍스트가 주석 영역 중앙에 있습니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}








다항 회귀 차수

:::

**예시**
'top': 텍스트가 주석 영역 하단에 있습니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
배경 표시 여부

:::

**예시**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
배경색
:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상



텍스트 색상

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 너비

:::

**예시**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
배경 테두리 모서리 반경



배경 테두리 모서리 반경

:::

**예시**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
4



### areaColor

**Type:** `string | undefined`

:::note{title=설명}
마크 영역 색상

:::

**예시**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 채우기 불투명도
:::

**예시**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상
:::

**예시**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비
:::

**예시**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 반경
:::

**예시**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
주석 영역 테두리 선 스타일
:::

**예시**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=설명}
마크 영역의 여백

:::

**예시**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=설명}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=설명}
차이 주석 선의 시작 앵커입니다.

시작점 또는 끝점에 바인딩되는 데이터를 선택하기 위한 차이 주석 앵커 설정입니다.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
앵커 선택자이며 최종적으로 하나의 논리 앵커를 찾아야 합니다.
:::

**예시**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

### end

**Type:** `DifferenceAnchor`

:::note{title=설명}
차이 주석 선의 끝 앵커입니다.

시작점 또는 끝점에 바인딩되는 데이터를 선택하기 위한 차이 주석 앵커 설정입니다.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
앵커 선택자이며 최종적으로 하나의 논리 앵커를 찾아야 합니다.
:::

**예시**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=설명}
차원 필드, 차원 항목의 ID
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
operator와 동일

\- in: 차원 field 값이 지정된 값 안에 있는 데이터 항목을 선택합니다


operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값, 배열을 지원합니다
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=설명}
차이 값 유형입니다.

- absolute: 절대 차이를 표시하며 end - start로 계산합니다

- percent: 백분율 차이를 표시하며 (end - start) / start로 계산합니다
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기입니다.

:::

### textColor

**Type:** `string | undefined`

:::note{title=설명}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 배경색입니다.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
선 색상입니다.
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
선 스타일입니다.
:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=설명}
차트에서 피벗 또는 지표 그룹화가 활성화된 경우 차원 연계를 활성화할지 여부

차원 값에 hover하면 다른 차트에서 동일한 차원 값을 가진 데이터를 연동 강조 표시합니다



피벗 차트 차원 연동 설정

:::


### enable

**Type:** `false | true`

:::note{title=설명}
피벗 차트 차원 연동을 활성화할지 여부

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=설명}
모든 차원에 해당하는 하위 차트의 Tooltip 정보를 표시할지 여부

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=설명}
crosshair에 해당하는 레이블을 표시할지 여부

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
차트 언어 구성입니다. 'zh-CN'과 'en-US' 두 언어를 지원하며 intl.setLocale('zh-CN') 메서드를 호출해 언어를 설정할 수도 있습니다
:::

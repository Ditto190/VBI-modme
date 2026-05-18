# RaceDonut

:::note{title=설명}
동적 도넛 차트 (Race Donut Chart)

시간에 따라 변하는 데이터의 비율 관계를 표시하는 데 적합하며, 중앙의 빈 영역에 요약 정보를 표시할 수 있습니다

적용 시나리오:

\- 전체 데이터와 각 부분의 비율 변화를 시간에 따라 동시에 표시해야 하는 경우

\- 데이터의 전체와 부분 관계를 강조하는 경우

\- 중앙 영역에 핵심 지표 또는 제목을 표시해야 하는 경우

:::

:::note{title=Note}
동적 도넛 차트:

\- 각도는 지표 값에, 색상은 차원 값에 매핑됩니다

\- 플레이어로 시간 차원을 제어하여 비율 변화를 동적으로 표시할 수 있습니다

\- 파이 차트와 비교해 중앙 영역이 비어 있어 시각적으로 더 가볍습니다

:::


## chartType

**Type:** `"raceDonut"`

:::note{title=설명}
동적 도넛 차트. 시간에 따라 변하는 데이터의 비율 관계를 표시하는 데 적합합니다

:::


## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋

TidyData 사양을 따르고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자가 입력한 데이터셋은 별도 처리가 필요 없습니다. VSeed는 강력한 데이터 리셰이프 기능을 제공하며 데이터를 자동으로 리셰이프합니다. 도넛 차트 데이터는 최종적으로 1개 차원과 1개 지표로 변환됩니다.
:::

## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=설명}
차원

:::


### id

**Type:** `string`

:::note{title=설명}
차원에 해당하는 field ID
:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
차원 별칭
:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=설명}
차원 날짜 형식 구성
:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
시간 입도이며 날짜 표시 정밀도를 결정합니다
:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 레이블 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

\- player: 여러 차원을 플레이어 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=설명}
지표

도넛 차트의 모든 지표는 자동으로 하나의 지표로 병합되어 파이 차트의 반경에 매핑됩니다. 여러 지표가 있는 경우 지표 이름은 나머지 차원과 결합되어 범례 항목으로 표시됩니다.
:::

### id

**Type:** `string`

:::note{title=설명}
지표 ID. 중복될 수 없습니다
:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
지표 별칭. 중복을 허용하며, 입력하지 않으면 alias는 id가 됩니다
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 포맷. 기본으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화되면 차트 레이블과 툴팁이 지표 값과 locale에 따라 적절한 포맷을 자동 선택합니다

포맷 규칙: 10진수, compact notation 활성화, 소수점 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저 Intl.NumberFormat 사용

예:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 포맷으로, label과 tooltip에 자동 적용됩니다

주의: 사용자 지정 포맷을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 설정을 덮어씁니다
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
\- 1234.5678는 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678는 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678는 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678는 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678는 1000, significantDigits:1
\- 1234.5678는 1200, significantDigits:2
\- 1234.5678는 1230, significantDigits:3
\- 1234.5678는 1234, significantDigits:4
\- 1234.5678는 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678는 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678는 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678는 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
\- 1234.5678는 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678는 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678는 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678는 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678는 1000, significantDigits:1
\- 1234.5678는 1200, significantDigits:2
\- 1234.5678는 1230, significantDigits:3
\- 1234.5678는 1234, significantDigits:4
\- 1234.5678는 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678는 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678는 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678는 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- angle: 지표가 매핑되는 각도

\- color: 지표를 색상 채널에 매핑합니다

\- label: 지표를 레이블 채널에 매핑

\- tooltip: 지표를 툴팁 채널에 매핑
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
페이지네이션 설정입니다. 페이지네이션에 사용할 필드명을 지정하며 반드시 차원이어야 합니다
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




## player

**Type:** `Player | undefined`

:::note{title=설명}
플레이어 설정. 시간 차원을 지정하는 데 사용되며 동적 파이 차트의 핵심 설정입니다



플레이어 설정으로, 재생할 필드명을 지정하며 반드시 차원이어야 합니다

:::

:::warning{title=Warning}
이 기능은 table, pivotTable, dualAxis, histogram, boxPlot 등의 차트 유형을 지원하지 않으며, 지표 조합 또는 행/열 피벗이 활성화된 상태에서는 사용할 수 없습니다

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=설명}
최대 재생 수입니다. 이 수를 초과하는 데이터는 잘리며, false로 설정하면 제한하지 않습니다

:::

### interval

**Type:** `number | undefined`

:::note{title=설명}
재생 간격, 단위 ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=설명}
자동 재생 여부

:::

### loop

**Type:** `boolean | undefined`

:::note{title=설명}
반복 재생 여부

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=설명}
플레이어 위치

:::

### railColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 진행 바 트랙 색상

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=설명}
플레이어 텍스트 글꼴

:::

### fontSize

**Type:** `number | undefined`

:::note{title=설명}
플레이어 텍스트 글꼴 크기

:::

### trackColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 진행 바 진행 색상

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 진행 바 슬라이더 색상

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 진행 바 슬라이더 테두리 색상

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 시작 버튼 색상

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 일시정지 버튼 색상

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 뒤로 버튼 색상

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=설명}
플레이어 앞으로 버튼 색상

:::


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

색상 목록, 색상 매핑, 색상 그라데이션 등 차트의 색상 체계를 정의하는 색상 구성입니다.
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

**Type:** `PieLabel | undefined`

:::note{title=설명}
레이블

차트 데이터 레이블 설정으로, 데이터 레이블의 위치, 형식, 스타일 등을 정의합니다.
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
\- 1234.5678는 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678는 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678는 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678는 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678는 1000, significantDigits:1
\- 1234.5678는 1200, significantDigits:2
\- 1234.5678는 1230, significantDigits:3
\- 1234.5678는 1234, significantDigits:4
\- 1234.5678는 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678는 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678는 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678는 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다
:::

**예시**
\- 1234.5678는 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678는 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
"매출이 1000보다 큰 열을 하이라이트"

"각 지역에서 이익률이 가장 높은 열을 하이라이트"



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
매출이 1000보다 큰 데이터 항목의 sales 필드를 하이라이트
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목을 하이라이트
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

여러 필터 조건을 만족하는 데이터 항목을 하이라이트
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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=설명}
레이블 레이아웃 방식입니다. 파이 차트와 도넛 차트에서 `labelPosition`이 `outside`일 때만 적용됩니다

\- arc: 호 형태에 따라 레이블을 배치합니다

\- labelLine: 레이블 양끝을 정렬하고 가이드 라인으로 부채꼴 마크와 레이블을 연결합니다

\- edge: 레이블 양끝을 정렬하고 가이드 라인으로 부채꼴 마크와 레이블을 연결하며, 차트 양쪽 가장자리에 가깝게 배치합니다
:::


## legend

**Type:** `Legend | undefined`

:::note{title=설명}
범례

차트 범례 설정으로, 범례의 위치, 형식, 스타일 등을 정의합니다.
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
범례 테두리를 활성화할지 여부
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다
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
페이저 아이콘 색상
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
비활성 페이저 아이콘 색상
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
이산 범례에만 적용됩니다
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
범례 항목이 많을 때 최대 열 수 또는 최대 행 수

position이 가로 방향(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr)이면 maxSize는 표시 열 수를 제어합니다

position이 세로 방향(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb)이면 maxSize는 표시 행 수를 제어합니다
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다
:::

**예시**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
툴팁

차트 툴팁 설정으로, 툴팁의 위치, 형식, 스타일 등을 정의합니다.
:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 정보를 활성화할지 여부
:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 선택

brush 선택 기능을 켜거나 끄는 설정입니다.

차트 브러시 선택 설정
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
브러시 모드, 단일 선택 또는 다중 선택

브러시 선택 모드를 정의합니다.

\- `single`: 단일 선택 모드. 한 번에 하나의 선택 영역만 존재할 수 있습니다

\- `multiple`: 다중 선택 모드. 여러 선택 영역이 동시에 존재할 수 있습니다
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
브러시 영역 밖 데이터의 스타일

선택되지 않은 데이터 포인트의 스타일을 정의합니다
:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
불투명도

선택되지 않은 데이터 포인트의 불투명도이며 값 범위는 0-1입니다
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
차트 테마. 테마는 우선순위가 낮은 기능 설정으로, 모든 차트 유형의 공통 설정과 단일 차트 유형의 공통 차트 설정을 포함합니다

내장 light와 dark 두 가지 테마가 있으며, 사용자는 Builder를 통해 테마를 사용자 지정할 수 있습니다

테마

내장 light, dark 두 가지 테마가 있으며, 새 테마는 registerTheme으로 사용자 지정할 수 있습니다.
:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
언어

차트 언어 설정입니다. 'zh-CN'과 'en-US'를 지원하며 intl.setLocale('zh-CN') 메서드로 언어를 설정할 수도 있습니다
:::

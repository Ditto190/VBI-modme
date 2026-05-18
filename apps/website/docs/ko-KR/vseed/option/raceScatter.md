# RaceScatter

:::note{title=설명}
동적 산점도 (Race Scatter Chart)

시간에 따라 변하는 데이터 분포를 표시하는 데 적합하며, 데이터 점의 위치로 두 지표 값을 나타냅니다

적용 시나리오:

\- 2차원 공간에서 데이터 분포 특성을 분석하고 시간에 따른 동적 변화를 표시하는 경우

\- 여러 변수 간 상관관계가 시간에 따라 변화하는 모습을 표시하는 경우

\- 2차원 공간에서 데이터 점의 이동 궤적을 관찰하는 경우

:::

:::note{title=Note}
동적 산점도:

\- X축과 Y축은 모두 수치축(연속 데이터)이며 여러 지표 매핑을 지원합니다

\- 플레이어로 시간 차원을 제어하여 데이터 변화를 동적으로 표시할 수 있습니다

\- 데이터 점의 위치 변화를 통해 데이터의 동적 변화를 직관적으로 표시합니다

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=설명}
동적 산점도. 시간에 따라 변하는 데이터 분포를 표시하는 데 적합합니다

:::


## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터 소스

:::

## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=설명}
차원. 서로 다른 데이터 시리즈를 구분하고 범례를 표시하는 데 사용됩니다

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=설명}
레이스 산점도 계열 차트의 차원 매핑 채널

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 라벨 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

\- player: 여러 차원을 플레이어 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=설명}
지표. 최소 2개의 지표가 필요하며 각각 X축과 Y축에 매핑됩니다.

:::

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

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 포맷, 기본으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 라벨과 툴팁이 지표 값과 locale에 따라 적절한 포맷을 자동 선택합니다

형식 규칙: compact notation이 활성화된 소수이며, 최소 소수 자릿수 0, 최대 소수 자릿수 2, 자동 반올림을 적용하고 브라우저의 Intl.NumberFormat 구현을 사용합니다

예:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 포맷입니다. 라벨과 툴팁에 자동 적용됩니다

참고: 사용자 지정 형식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다

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
\- 1234.5678은 1235로 변환됩니다. fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다. fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다. fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다. fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다. significantDigits:1
\- 1234.5678은 1200으로 변환됩니다. significantDigits:2
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3
\- 1234.5678은 1234로 변환됩니다. significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다. significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

:::

### format

**Type:** `NumFormat | undefined`


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
\- 1234.5678은 1235로 변환됩니다. fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다. fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다. fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다. fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다. significantDigits:1
\- 1234.5678은 1200으로 변환됩니다. significantDigits:2
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3
\- 1234.5678은 1234로 변환됩니다. significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다. significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- xAxis: 지표가 매핑되는 X축

\- yAxis: 지표가 매핑되는 Y축

\- size: 지표가 매핑되는 크기

\- color: 지표가 매핑되는 색상

\- label: 지표가 매핑되는 레이블

\- tooltip: 지표가 매핑되는 툴팁

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 measure 구성에서 트리 형태의 measure 그룹을 구성합니다. parentId는 상위 measure 그룹의 id를 가리키며 measure 트리를 만드는 데 사용됩니다

:::

:::tip{title=Tip}
measure 트리를 구성하는 방법은 두 가지입니다. 옵션 1은 children으로 measure 트리를 직접 구성하는 것이고, 옵션 2는 parentId가 있는 평면 measure 목록을 구성하는 것입니다. 두 방법은 동시에 사용할 수 없습니다

:::


## player

**Type:** `Player | undefined`

:::note{title=설명}
플레이어 설정으로, 시간 차원을 지정하는 동적 막대 차트의 핵심 설정입니다



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


## sort

**Type:** `Sort | undefined`

:::note{title=설명}
X축 정렬 설정이며 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다

범주 축 정렬 설정이며 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다
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
차트 배경색



배경색은 색상 문자열(예: 'red', 'blue') 또는 hex, rgb, rgba 값(예: '#ff0000', 'rgba(255,0,0,0.5)')일 수 있습니다

:::


## size

**Type:** `number | number[] | undefined`

:::note{title=설명}
산점도 지표 크기로, 데이터 포인트의 크기 또는 크기 범위를 정의하는 데 사용됩니다

\- 크기 범위가 10과 같은 숫자이면 데이터 포인트 크기는 10으로 고정됩니다

\- 크기 범위가 [10, 40] 같은 두 항목 배열이면 데이터 포인트 크기는 10부터 40까지입니다

\- sizeRange와 상호 배타적이며 size보다 우선순위가 낮습니다

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=설명}
산점도 지표 크기 범위로, 데이터 포인트의 크기 범위를 정의하는 데 사용됩니다,

\- 크기 범위가 [10, 40] 같은 두 항목 배열이면 데이터 포인트 크기는 10부터 40까지입니다

\- 크기 범위가 10과 같은 숫자이면 데이터 포인트 크기는 10으로 고정됩니다

\- sizeRange와 상호 배타적이며 size보다 우선순위가 높습니다

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상



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
라벨



차트 데이터 label을 정의하는 label 구성입니다. 위치, 형식, 스타일을 포함합니다.

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
label에 measure 값을 표시할지 여부

멀티 지표 시나리오에서는 플롯 관련 모든 지표가 `foldMeasures` 처리를 거쳐 단일 데이터 포인트를 나타내는 하나의 지표로 병합되므로 값 충돌을 걱정할 필요가 없습니다

참고: encoding의 label 우선순위가 더 높으며, 이 설정은 encoding의 label에 영향을 주지 않습니다

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
label에 measure 값의 백분율을 표시할지 여부

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
자동 숫자 포맷, 기본으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 라벨과 툴팁이 지표 값과 locale에 따라 적절한 포맷을 자동 선택합니다

형식 규칙: compact notation이 활성화된 소수이며, 최소 소수 자릿수 0, 최대 소수 자릿수 2, 자동 반올림을 적용하고 브라우저의 Intl.NumberFormat 구현을 사용합니다

예:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 포맷입니다. 라벨과 툴팁에 자동 적용됩니다

참고: 사용자 지정 형식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다

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
\- 1234.5678은 1235로 변환됩니다. fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다. fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다. fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다. fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다. significantDigits:1
\- 1234.5678은 1200으로 변환됩니다. significantDigits:2
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3
\- 1234.5678은 1234로 변환됩니다. significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다. significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:3 (roundingPriority:morePrecision)



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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호를, field는 강조할 필드를 나타냅니다

- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

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
범례 테두리를 활성화할지 여부입니다.
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다
:::

**예시**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 색상

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
범례 항목이 많을 때의 최대 열 또는 행 수





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

위치, 형식, 스타일 등을 포함해 차트 툴팁을 정의하는 툴팁 설정입니다.
:::


### enable

**Type:** `false | true`

:::note{title=설명}
label 기능을 활성화할지 여부

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
축 선 width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=설명}
X축 눈금

:::

### log

**Type:** `boolean | undefined`

:::note{title=설명}
로그 축을 사용할지 여부이며, 숫자 축에만 적용됩니다

:::

### logBase

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 이징 함수입니다.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=설명}
Y축(카테고리 축) 설정으로, 위치, 형식, 스타일 등을 포함해 Y축을 정의합니다.

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
자동 숫자 포맷, 기본으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 라벨과 툴팁이 지표 값과 locale에 따라 적절한 포맷을 자동 선택합니다

형식 규칙: compact notation이 활성화된 소수이며, 최소 소수 자릿수 0, 최대 소수 자릿수 2, 자동 반올림을 적용하고 브라우저의 Intl.NumberFormat 구현을 사용합니다

예:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 포맷입니다. 라벨과 툴팁에 자동 적용됩니다

참고: 사용자 지정 형식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다

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
\- 1234.5678은 1235로 변환됩니다. fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다. fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다. fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다. fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다. significantDigits:1
\- 1234.5678은 1200으로 변환됩니다. significantDigits:2
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3
\- 1234.5678은 1234로 변환됩니다. significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다. significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

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
라벨을 표시할지 여부
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
축 선 색상
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
X축 눈금
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
라벨을 표시할지 여부
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
라벨을 표시할지 여부
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
X축 애니메이션 설정
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

**Type:** `YLinearAxis | undefined`

:::note{title=설명}
Y축



숫자 축입니다. 위치, 형식, 스타일 및 관련 설정을 정의하는 Y축 구성입니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축을 표시할지 여부
:::

### min

**Type:** `number | undefined`

:::note{title=설명}
축 선 width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=설명}
X축 눈금

:::

### log

**Type:** `boolean | undefined`

:::note{title=설명}
로그 축을 사용할지 여부이며, 숫자 축에만 적용됩니다

:::

### logBase

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 이징 함수입니다.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=설명}
Y축(카테고리 축) 설정으로, 위치, 형식, 스타일 등을 포함해 Y축을 정의합니다.

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
자동 숫자 포맷, 기본으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 라벨과 툴팁이 지표 값과 locale에 따라 적절한 포맷을 자동 선택합니다

형식 규칙: compact notation이 활성화된 소수이며, 최소 소수 자릿수 0, 최대 소수 자릿수 2, 자동 반올림을 적용하고 브라우저의 Intl.NumberFormat 구현을 사용합니다

예:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 포맷입니다. 라벨과 툴팁에 자동 적용됩니다

참고: 사용자 지정 형식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다

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
\- 1234.5678은 1235로 변환됩니다. fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환됩니다. fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환됩니다. fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환됩니다. fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 유효 자릿수입니다. 브라우저의 Intl.NumberFormat minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678은 1000으로 변환됩니다. significantDigits:1
\- 1234.5678은 1200으로 변환됩니다. significantDigits:2
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3
\- 1234.5678은 1234로 변환됩니다. significantDigits:4
\- 1234.5678은 1234.6으로 변환됩니다. significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환됩니다. significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환됩니다. significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678은 1230으로 변환됩니다. significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환됩니다. significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

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
라벨을 표시할지 여부
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
축 선 색상
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
X축 눈금
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
라벨을 표시할지 여부
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
라벨을 표시할지 여부
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
X축 애니메이션 설정
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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=설명}
수직 가이드 라인

마우스를 차트 위로 이동할 때 표시되는 수직 가이드 라인입니다.

차트에서 크로스헤어 라인(가이드 라인)을 표시하기 위한 설정입니다.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축을 표시할지 여부
:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 색상

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}
십자선 라벨을 표시할지 여부

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
label 배경색

:::

## theme

**Type:** `Theme | undefined`

:::note{title=설명}
테마 설정

테마

기본 제공 테마는 light와 dark 두 가지이며, 새 테마는 registerTheme를 통해 사용자 정의 테마로 설정할 수 있습니다.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=설명}
포인트 마크 스타일 설정으로, 포인트 마크 색상, 테두리 및 관련 설정을 정의하는 데 사용됩니다.

전역 스타일 또는 조건부 스타일 설정을 지원합니다

데이터 필터




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.






:::

**예시**
막대 primitive(사각형) 선 색상
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호를, field는 강조할 필드를 나타냅니다

- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

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


### pointVisible

**Type:** `boolean | undefined`

:::note{title=설명}
점을 표시할지 여부

:::

### pointSize

**Type:** `number | undefined`

:::note{title=설명}
점 크기



점 크기

:::

### pointColor

**Type:** `string | undefined`

:::note{title=설명}
점 마크 색상



점 마크 색상

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
점 마크 색상 불투명도



점 마크 색상 불투명도

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=설명}
점 마크 테두리 색상



점 마크 테두리 색상

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
점 마크 테두리 너비



점 마크 테두리 너비

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
점 마크 테두리 스타일



점 마크 테두리 스타일

:::

**예시**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
주석 포인트 설정입니다. 선택된 데이터를 기반으로 위치, 형식, 스타일 및 관련 설정을 포함한 차트 주석 포인트를 정의합니다.

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

### measureId

**Type:** `string | undefined`

:::note{title=설명}
주석 포인트가 속한 measure id를 지정합니다. 다중 measure 시나리오에서는 selector와 함께 사용하여 대상 measure의 주석 포인트를 고유하게 찾을 수 있습니다.
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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
AI가 생성한 JavaScript 필터링 코드



- 내장 유틸리티 함수(_ 또는 R로 접근)만 사용할 수 있습니다

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호를, field는 강조할 필드를 나타냅니다

- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

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
'마크 텍스트'



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
true



### offsetX

**Type:** `number | undefined`

:::note{title=설명}
주석 점 전체가 X 방향으로 이동하는 픽셀 거리입니다. 주석 점이 차트 왼쪽(범주 축 시작점)에 있으면 양수 값을, 오른쪽(범주 축 끝점)에 있으면 음수 값을 권장합니다.

음수 값은 전체를 왼쪽으로 이동합니다. 예를 들어 -10은 텍스트와 배경을 포함한 주석 점 컴포넌트 전체를 왼쪽으로 10픽셀 이동합니다

양수 값은 전체를 오른쪽으로 이동합니다. 예를 들어 10은 텍스트와 배경을 포함한 주석 점 컴포넌트 전체를 오른쪽으로 10픽셀 이동합니다

:::

**예시**
offsetX: 5, 주석 점 전체가 오른쪽으로 5픽셀 이동합니다
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
차원 값 주석선입니다. 세로로 표시되며 위치와 스타일을 설정할 수 있습니다

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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
\- 입력 파라미터: data(배열). 각 항목에는 행 번호를 나타내는 __row_index field가 포함됩니다



\- __row_index는 원본 데이터 항목의 행 번호를 나타내고, field는 강조할 field를 나타냅니다






\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


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
'마크 텍스트'



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
선분 스타일

:::

**예시**
`lineStyle: 'solid'`




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
수치 주석선입니다. 평균선, 최댓값선, 최솟값선 등을 포함합니다. 수평으로 표시되며 위치와 스타일을 설정할 수 있습니다. 평균선처럼 수치 값에 대응하는 주석선을 그릴 때 이 설정을 사용합니다.

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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
\- 입력 파라미터: data(배열). 각 항목에는 행 번호를 나타내는 __row_index field가 포함됩니다



\- __row_index는 원본 데이터 항목의 행 번호를 나타내고, field는 강조할 field를 나타냅니다






\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


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
'마크 텍스트'



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
선분 스타일

:::

**예시**
`lineStyle: 'solid'`




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
주석 영역

선택한 데이터를 기준으로 주석 영역의 위치와 스타일을 정의하는 설정입니다.
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
'마크 텍스트'



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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
Language



차트 언어 설정입니다. 'zh\-CN'과 'en\-US' 두 언어를 지원하며, intl.setLocale('zh\-CN')을 호출해 언어를 설정할 수도 있습니다

:::

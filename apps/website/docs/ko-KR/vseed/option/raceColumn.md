# RaceColumn

:::note{title=설명}
동적 세로 막대 차트 (Race Column Chart)

시간에 따른 데이터 순위 변화를 표시하는 데 적합하며 막대는 세로로 배열됩니다

적용 시나리오:

\- 데이터 항목 이름이 긴 경우

\- 서로 다른 범주의 값 크기를 직관적으로 비교하고 시간에 따른 순위 변화를 표시해야 할 때

\- 시계열 데이터 변화 추세를 표시하고 막대 정렬을 동적으로 업데이트할 때

:::

:::note{title=Note}
동적 세로 막대 차트:

\- X축은 범주 축(분류 데이터)이며 차원 값을 표시합니다

\- Y축은 숫자 축(연속 데이터)이며 지표 값을 표시합니다

\- 플레이어를 통해 시간 차원을 제어하고 데이터 변화를 동적으로 표시할 수 있습니다

\- 애니메이션 중 막대는 값 크기에 따라 동적으로 정렬됩니다

:::


## chartType

**Type:** `"raceColumn"`

:::note{title=설명}
동적 세로 막대 차트로, 시간에 따른 데이터 순위 변화를 표시하는 데 적합합니다

:::


## dataset

**Type:** `Record[]`

:::note{title=설명}
TidyData 규격을 따르고 이미 집계된 데이터셋

:::

**예시**
[{category:'A', value:100, date: '2020'}, {category:'B', value:200, date: '2020'}]




## dimensions

**Type:** `RaceColumnDimension[] | undefined`

:::note{title=설명}
첫 번째 디멘션은 X축에 매핑되고, 나머지 디멘션은 메저 이름(여러 메저가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.



첫 번째 차원은 player에, 두 번째 차원은 X축에 매핑됩니다

:::


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
시간 단위입니다. 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- xAxis: 여러 디멘션을 x축에 매핑할 수 있습니다

\- color: 여러 디멘션을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 디멘션을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 디멘션을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 디멘션을 라벨 채널에 매핑할 수 있습니다

\- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

\- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

\- player: 여러 차원을 플레이어 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=설명}
지표



동적 세로 막대 차트의 모든 지표는 자동으로 하나의 지표로 병합되어 Y축에 매핑됩니다. 여러 지표가 있는 경우 지표 이름은 나머지 차원과 결합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: "value", alias: "값"}]




### id

**Type:** `string`

:::note{title=설명}
지표 ID, 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
측정값 별칭입니다. 중복을 허용하며, 설정하지 않으면 별칭은 ID가 됩니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 서식입니다. 기본적으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다.

활성화하면 차트 데이터 레이블과 툴팁이 측정값과 로케일에 따라 적절한 서식을 자동으로 선택합니다.

서식 규칙: 십진수, 축약 표기 활성화, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현을 사용합니다.

예:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
측정값의 사용자 지정 숫자 서식입니다. 레이블과 툴팁에 자동 적용됩니다.

참고: 사용자 지정 서식을 사용하려면 autoFormat을 명시적으로 false로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 서식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율, 0일 수 없습니다

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호, 예: %, ‰

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



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
숫자 서식의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다.

:::

**예시**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다.

:::

**예시**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다.

:::

**예시**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 서식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율, 0일 수 없습니다

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호, 예: %, ‰

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



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
숫자 서식의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다.

:::

**예시**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다.

:::

**예시**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다.

:::

**예시**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- yAxis: 메저를 y축에 매핑합니다

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
플랫 측정값 구성 형식으로 트리 형태의 측정값 그룹을 만듭니다. parentId는 상위 측정값 그룹의 ID를 가리키며 측정값 트리를 구성하는 데 사용됩니다.

:::

:::tip{title=Tip}
측정값 트리를 구성하는 방법은 두 가지입니다. 옵션 1은 children으로 측정값 트리를 직접 구성하고, 옵션 2는 parentId가 있는 플랫 측정값 목록을 구성합니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## player

**Type:** `Player | undefined`

:::note{title=설명}
플레이어 설정으로, 시간 차원을 지정하는 동적 세로 막대 차트의 핵심 설정입니다

플레이어를 통해 시간 차원의 재생 진행을 제어하여 데이터의 동적 업데이트와 정렬 변화를 구현합니다



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
정렬 설정으로, 동적 세로 막대 차트는 일반적으로 값에 따라 동적으로 정렬해야 합니다

X축에서 막대의 정렬 방식을 제어합니다





:::

**예시**
참고: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter가 더 높은 우선순위를 가집니다.

차트 동적 필터 구성입니다.





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}

:::

**예시**
사용자의 필터링 요구 사항 설명(자연어).



### orderBy

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**





### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
\- `__row_index`는 원본 데이터 항목의 행 번호를 나타내고, `field`는 강조할 필드를 나타냅니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정으로, 데이터 양이 많은 상황을 처리하는 데 사용됩니다

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
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
배경색 설정

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상 설정으로, 서로 다른 차원 또는 지표를 구분하는 데 사용됩니다

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 서로 다른 요소 색상을 정의하는 데 사용하는 이산 색상 스킴.

:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
차트의 서로 다른 요소 색상을 정의하는 데 사용하는 선형 그라데이션 색상 스킴.

:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
데이터 값을 특정 색상에 매핑하는 색상 매핑.

:::

**예시**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정. 차트의 양수 값 색상을 정의합니다.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
양수/음수 색상 설정. 차트의 음수 값 색상을 정의합니다.

:::


## label

**Type:** `Label | undefined`

:::note{title=설명}
레이블 설정으로, 막대에 데이터 레이블을 표시하는 데 사용됩니다

:::


### enable

**Type:** `false | true`

:::note{title=설명}
라벨 기능 활성화 여부.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}
라벨을 다음 줄로 줄바꿈할지 여부.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}
라벨에 메저 값을 표시할지 여부.

다중 메저 시나리오에서는 모든 플롯 관련 메저가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 메저로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
레이블이 측정값을 백분율로 표시할지 여부입니다.

다중 메저 시나리오에서는 모든 플롯 관련 메저가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 메저로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
레이블이 차원 레이블을 표시할지 여부입니다.

모든 차원 레이블을 표시합니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 값을 자동 서식화할지 여부입니다. autoFormat이 true이면 numFormat 구성이 무시됩니다.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
레이블 값 서식 구성입니다. `measure`의 `format`과 병합되며, `measure`의 `format`이 더 높은 우선순위를 가집니다. numFormat의 우선순위는 autoFormat보다 낮습니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 서식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율이며 0일 수 없습니다.

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호, 예: %, ‰

:::

**예시**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 서식의 천 단위 구분 기호입니다.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접미사입니다.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 접두사입니다.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다.

:::

**예시**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다.

:::

**예시**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 반올림 우선순위입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다.

:::

**예시**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드입니다. 브라우저의 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
레이블 font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
레이블 font weight

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
요소의 색상에 따라 레이블 글꼴 색상을 자동으로 반전할지 여부입니다.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
레이블 위치

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
레이블 겹침 처리를 활성화할지 여부입니다.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
레이블 선택입니다. 선택자 간 조건은 기본적으로 OR입니다.

:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드입니다. dimensions 항목의 ID입니다.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 값 목록에 포함된 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 값 목록에 포함된 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

operator와 동일.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)



AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.



핵심 기능:

\- 임의로 복잡한 데이터 필터 조건을 지원합니다.

\- 데이터 조작을 위해 내장 유틸리티 함수를 사용합니다.

\- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행됩니다.



환경 요구 사항: 브라우저 환경만 지원합니다. Node.js 환경에서는 fallback을 사용합니다.



참고: selector와 dynamicFilter는 동시에 사용할 수 없습니다. dynamicFilter가 더 높은 우선순위를 가집니다.



차트 동적 필터 구성입니다.



AI가 생성한 JavaScript 코드로 차트 마커(막대, 점 등)를 필터링합니다.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 사항 설명(자연어).

:::

**예시**
"매출이 1000보다 큰 열 강조 표시"

"각 지역에서 이익률이 가장 높은 열 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드.



\- 내장 유틸리티 함수만 사용합니다(_ 또는 R로 접근).

\- 입력 파라미터: data(배열), 각 항목에는 행 번호를 나타내는 `__row_index` 필드가 포함됩니다.

\- 행 인덱스와 필드 조합의 배열 `Array<{ __row_index: number, field: string }>`을 반환해야 합니다.

\- `__row_index`는 원본 데이터 항목의 행 번호를 나타내고, `field`는 강조할 필드를 나타냅니다.

\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청.

:::

**예시**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
코드 실행에 실패하거나 환경이 지원되지 않을 때의 fallback 전략입니다.

:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드입니다. dimensions 항목의 ID입니다.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 값 목록에 포함된 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 값 목록에 포함된 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

operator와 동일.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)입니다.



prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다.

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
범례 설정

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
범례 기능을 활성화할지 여부입니다.

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
범례 글꼴 굵기



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}
페이지네이션 아이콘 색상입니다.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
페이지네이션 아이콘의 비활성/회색 처리 색상입니다.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
범례 글꼴 크기.

:::

**예시**




### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
범례 글꼴 굵기.

:::

**예시**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}
범례 모양 타입입니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
브러시



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
범례 위치

:::

**예시**




### maxSize

**Type:** `number | undefined`

:::note{title=설명}
범례 항목이 많을 때의 최대 열 또는 행 수입니다.

position이 가로 방향(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr)이면 maxSize는 표시되는 열 수를 제어합니다.

position이 세로 방향(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb)이면 maxSize는 표시되는 행 수를 제어합니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
브러시 mode; defines whether single or multiple areas can be selected.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
툴팁 설정으로, 마우스 hover 시 상세 정보를 표시하는 데 사용됩니다

:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 설정으로, 브러시 선택 상호작용을 지원하는 데 사용됩니다



\- `y`: Y축 브러시입니다. Y축 방향으로만 선택하며 X축 방향은 제한되지 않습니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}








:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
브러시로 선택되지 않은 데이터의 스타일입니다.



선택 영역 밖 데이터 포인트의 스타일을 정의합니다.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X축, 범주 축, X축 구성입니다. 위치, 형식, 스타일 등을 포함하여 차트의 X축을 정의합니다.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=설명}
X축 설정으로, 차원 값을 표시하는 범주 축이며 막대는 세로로 배열됩니다

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축 선 color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
축을 표시할지 여부입니다.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=설명}


Y축, 숫자 축, Y축 구성입니다. 위치, 형식, 스타일 등을 포함하여 차트의 Y축을 정의합니다.


:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=설명}


:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=설명}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
\- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}


:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}
X축 눈금 라벨

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=설명}

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=설명}

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=설명}

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=설명}


:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}


:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=설명}
Y축 설정으로, 지표 값을 표시하는 숫자 축입니다

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}

:::

### min

**Type:** `number | undefined`

:::note{title=설명}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=설명}


:::

### log

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### logBase

**Type:** `number | undefined`

:::note{title=설명}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**





#### symbol

**Type:** `string | undefined`

:::note{title=설명}

:::

**예시**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**


애니메이션 easing 함수






#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
범주 축 정렬 구성입니다. 차원 또는 측정값 기반 정렬과 사용자 지정 정렬 순서를 지원합니다

:::

**예시**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**
정렬 순서입니다. 선택 가능한 값은 'asc' 또는 'desc'입니다




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
사각형의 최대 높이입니다. 픽셀 값 또는 백분율 문자열을 사용할 수 있습니다.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
**예시**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
범례 정렬 구성입니다. 차원 또는 측정값 기반 정렬과 사용자 지정 정렬 순서를 지원하며, sort 배열은 왼쪽에서 오른쪽 또는 위에서 아래 순서를 따릅니다.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}

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


:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}

:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}


:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=설명}
크로스헤어 설정으로, 데이터의 정확한 값을 표시하는 데 사용됩니다



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=설명}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=설명}
스택 둥근 모서리 설정

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=설명}
사각형 최대 너비 설정

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=설명}
범례 정렬 설정



차트 동적 필터 설정: AI 생성 JavaScript 코드로 차트 마크(막대, 포인트 등)를 필터링합니다.

:::

**예시**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**




### orderBy

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
테마 설정



연산자



\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=설명}
세로 막대 스타일 설정으로, 단일 스타일 또는 배열 형태일 수 있습니다

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.






:::

**예시**
막대 primitive(사각형) 선 색상




동적 필터 실행 결과(런타임 필드)



field: 'category',
operator: 'in',
value: 'tool'
}
field: 'category',
operator: 'not in',
value: 'book'
}


field: 'profit',
operator: '>=',
value: 100
}
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=설명}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
주석 포인트용 선택자이며, 데이터 포인트를 선택하는 데 사용됩니다.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
- center: 텍스트가 포인트 중앙에 맞춰집니다.









연산자

\- in: 차원 필드 값이 값 목록에 포함된 데이터 항목을 선택합니다.

\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.


















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출이 1000보다 큰 열 강조 표시"

"각 지역에서 이익률이 가장 높은 열 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}













:::

**예시**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=설명}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
수직 주석 선의 고정 X값입니다. 카테고리 축이 X 방향이면 차원 값을 입력할 수 있고, 숫자 축이 X 방향이면 특정 숫자 값을 사용할 수 있습니다.






:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
브라우저 환경에서만 지원됩니다(Web Worker 필요).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



\- in: 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=설명}
prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
'주석 텍스트'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
텍스트 색상입니다.

:::

**예시**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=설명}
**예시**





:::

**예시**
주석 텍스트입니다.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
마크 포인트 설정으로, 특정 데이터 포인트에 마크를 추가하는 데 사용됩니다

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}


:::


#### field

**Type:** `string`

:::note{title=설명}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
bottom: 텍스트가 주석 포인트 위에 있으며, 아래쪽 가장자리가 포인트에 맞춰집니다.

텍스트가 차트의 보이는 영역 안에 완전히 표시되도록 'top'으로 설정하는 것을 권장합니다.

**예시**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
배경색입니다.

:::

### measureId

**Type:** `string | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
**예시**









배경 테두리 너비입니다.

선 표시 여부입니다.

**예시**









배경 테두리 모서리 반경입니다.



**예시**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출이 1000보다 큰 열 강조 표시"

"각 지역에서 이익률이 가장 높은 열 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}








주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).

양수 값은 전체 컴포넌트를 오른쪽으로 이동합니다(예: 10).

:::

**예시**
offsetX: 5 (전체 컴포넌트가 5픽셀 오른쪽으로 이동)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=설명}
"가장 높은 매출 값을 주석선 기준으로 가져오기"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}


AI 생성 JavaScript 필터링 코드.

\- 내장 유틸리티 함수만 사용합니다(_ 또는 R로 접근).

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}




최대 매출 값을 주석선 값으로 가져옵니다:

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
사용자의 필터링 요구 사항 설명(자연어).



);

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
prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다.

:::

**예시**
'주석 텍스트'



### textColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}




텍스트 글꼴 크기입니다.


**예시**

:::

**예시**
'right' 텍스트는 주석 지점의 왼쪽에 배치됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**









:::

**예시**
'top' 텍스트는 주석 지점의 아래쪽에 배치됩니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**예시**

:::

**예시**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
top: 텍스트가 기준선 아래에 있으며, 위쪽 가장자리가 (세로) 주석선의 끝에 맞춰집니다.

:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




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
배경색입니다.


**예시**

:::

**예시**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
숫자 마크 라인, 특정 X축 값을 표시하는 세로 마크 라인입니다

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}




배경 테두리 모서리 반경입니다.

선 표시 여부입니다.





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출 최고값을 가져와 주석 선 참조로 사용"

"주석 선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}











동적 필터(AI 생성 코드 실행)

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

**예시**
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
\- 입력 파라미터: data(배열).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}


:::

**예시**
'주석 텍스트'



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
'주석 텍스트'

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}




텍스트 색상입니다.


**예시**

:::

**예시**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**









:::

**예시**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**




### lineColor

**Type:** `string | undefined`

:::note{title=설명}
**예시**

:::

**예시**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
top: 텍스트가 기준선 아래에 있으며, 위쪽 가장자리가 (가로) 주석선에 맞춰집니다.

:::

**예시**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}


:::

**예시**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=설명}
차원 값 마크 라인, 특정 Y축 범주를 표시하는 가로 마크 라인입니다

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
**예시**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출 최고값을 가져와 주석 선 참조로 사용"

"주석 선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다







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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
**예시**

:::

**예시**
'주석 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
**예시**





:::

**예시**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.



**예시**



:::

**예시**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.

bottom: 텍스트가 주석 영역 상단에 있으며, 아래쪽 가장자리가 영역에 맞춰집니다.

배경 선 색상

**예시**



:::

**예시**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}






:::

**예시**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}






:::

**예시**
0.5



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


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=설명}
마크 영역 설정으로, 특정 데이터 범위를 강조 표시하는 데 사용됩니다

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=설명}
차트에서 perspective가 활성화되었거나 측정값이 결합된 경우 차원 연동 기능을 활성화할지 여부입니다.

:::


#### field

**Type:** `string`

:::note{title=설명}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}




모든 차원 대응 하위 차트의 툴팁을 표시할지 여부입니다.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'주석 텍스트'



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
'center' 텍스트는 주석 영역의 가운데에 배치됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}








다항 회귀 차수

:::

**예시**
'top' 텍스트는 주석 영역의 아래쪽에 배치됩니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}

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
**예시**

:::

**예시**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

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


:::

**예시**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=설명}


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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=설명}
차원 연동 설정으로, 여러 차트 간 차원 연동 상호작용을 지원합니다



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
언어 설정

:::

# Heatmap

:::info{title=권장}
- 권장 필드 구성: `1`개 메저, `2`개 디멘션

- 데이터 리셰이프 지원: 최소 `1`개 메저, `0`개 디멘션

:::

:::info{title=인코딩 매핑}
히트맵 차트는 다음 시각 채널을 지원합니다:

`xAxis`      : x축 채널, `여러 디멘션`을 지원하며 디멘션 값에 따라 x축에 매핑됩니다

`yAxis`      : y축 채널, `여러 디멘션`을 지원하며 디멘션 값에 따라 y축에 매핑됩니다

`detail`     : 상세 채널, `여러 디멘션`을 지원하며 동일한 색상 계열 내에서 더 세분화된 데이터를 표시하는 데 사용됩니다

`color`      : 색상 채널, `하나의 메저`를 지원하며 메저 값을 색상 강도에 매핑합니다

`tooltip`    : 툴팁 채널, `여러 디멘션`과 `여러 메저`를 지원하며 데이터 포인트에 호버할 때 표시됩니다

`label`      : 라벨 채널, `여러 디멘션`과 `여러 메저`를 지원하며 데이터 포인트에 데이터 라벨을 표시합니다

:::

:::note{title=설명}
히트맵 차트는 2차원 매트릭스에서 색상 농도를 통해 데이터의 분포와 강도 관계를 표시합니다.

적용 시나리오:

- 대규모 2차원 데이터의 밀도와 강도 표시

- 카테고리와 수치 값 간의 상관 분석

- 시계열과 카테고리 간 교차 비교

:::

:::warning{title=Warning}
데이터 요구사항:

- 히트맵 차트의 행과 열을 결정하는 데 사용되는 최소 2개의 디멘션 필드

- 색상 농도 매핑에 사용되는 최소 1개의 숫자 필드

- 여러 메저를 지원하는 경우 일반적으로 하나의 메저를 선택해 색상에 매핑합니다

기본으로 활성화되는 기능:

- 범례, 축, 데이터 라벨, 툴팁 및 숫자 스케일링이 기본으로 활성화됩니다.

:::


## chartType

**Type:** `"heatmap"`

:::note{title=설명}
히트맵 차트는 2차원 매트릭스에서 색상 농도를 통해 데이터의 분포와 강도 관계를 표시합니다.

:::

**예시**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋. TidyData 사양을 준수하고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자 입력에는 전처리가 필요하지 않습니다. VSeed는 강력한 데이터 리셰이프 기능을 제공하여 형식 처리를 자동으로 수행합니다. 히트맵 차트 데이터는 최종적으로 2개의 디멘션과 1개의 메저로 변환됩니다.

:::

**예시**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=설명}
디멘션. 히트맵 차트에서는 첫 번째 디멘션이 일반적으로 X축에 매핑되며, 다른 디멘션은 메저 이름(여러 개가 있는 경우)과 병합되어 범례 항목으로 사용됩니다.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=설명}
차원이 매핑되는 채널:

- xAxis: 여러 디멘션을 x축에 매핑할 수 있습니다

- yAxis: 여러 디멘션을 y축에 매핑할 수 있습니다

- tooltip: 여러 디멘션을 툴팁 채널에 매핑할 수 있습니다

- label: 여러 디멘션을 라벨 채널에 매핑할 수 있습니다

- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=설명}
메저. 히트맵 차트의 메저는 자동으로 하나의 메저로 병합되어 색상 스케일에 매핑됩니다. 여러 메저가 있는 경우 해당 이름은 다른 디멘션과 병합되어 범례 항목으로 사용됩니다.

:::

**예시**
[{id: 'value', alias: '값'}]




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
숫자 포맷 기호, 예: %, ‰

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
숫자 포맷 기호, 예: %, ‰

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

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=설명}
지표가 매핑되는 채널:

- color: 메저를 색상 채널에 매핑합니다

- label: 메저를 라벨 채널에 매핑합니다

- tooltip: 메저를 툴팁 채널에 매핑합니다

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
평면 지표 설정에서 트리 형태의 지표 구조를 구성합니다. parentId는 부모 지표 그룹의 ID를 가리키며 계층 구성에 사용됩니다.

:::

:::tip{title=팁}
지표 트리를 설정하는 방법은 두 가지입니다. 옵션 1은 children으로 지표 트리를 직접 설정하고, 옵션 2는 parentId가 있는 평면 지표 목록을 제공합니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
페이지네이션 설정.

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

**Type:** `Background색상`

:::note{title=설명}
차트 배경색.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `색상 | undefined`

:::note{title=설명}
차트의 색상 구성을 정의하는 색상 설정이며 색상 목록, 색상 매핑, 색상 그라데이션을 포함합니다.

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

**Type:** `레이블 | undefined`

:::note{title=설명}
히트맵 차트 라벨 설정. 데이터 라벨을 정의하는 데 사용되며, 배경색 대비 가독성을 보장하기 위해 라벨 반전을 자동으로 활성화합니다.

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

참고: 인코딩 라벨의 우선순위가 더 높으며, 이 설정은 인코딩 라벨에 영향을 주지 않습니다.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
라벨에 메저 값의 백분율을 표시할지 여부.

다중 메저 시나리오에서는 모든 플롯 관련 메저가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 메저로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: 인코딩 라벨의 우선순위가 더 높으며, 이 설정은 인코딩 라벨에 영향을 주지 않습니다.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
라벨에 디멘션 이름을 표시할지 여부.

Displays all dimension labels.

참고: 인코딩 라벨의 우선순위가 더 높으며, 이 설정은 인코딩 라벨에 영향을 주지 않습니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
라벨 값을 자동 포맷할지 여부. autoFormat 이 true이면 numFormat 설정은 무시됩니다.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
라벨 값 포맷 설정. `measure`의 `format`과 병합되며, `measure`의 `format`이 더 높은 우선순위를 가집니다. numFormat 우선순위는 autoFormat보다 낮습니다.

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
숫자 포맷 기호, 예: %, ‰

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
라벨 글꼴 크기.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
라벨 글꼴 굵기.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
라벨 배경색.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
라벨 스트로크(외곽선) 색상.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
라벨 글꼴 색상.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
라벨 위치.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
라벨 필터링. 선택자 간 기본 조건 관계는 OR입니다.

:::


#### field

**Type:** `string`

:::note{title=설명}
차원 필드 ID.

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행).

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

핵심 기능:

- 임의의 복잡한 데이터 필터 조건 지원

- 데이터 작업에 내장 유틸리티 함수 사용

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback을 사용합니다.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

차트 동적 필터 설정.

AI 생성 JavaScript 코드로 차트 마크(열, 점 등)를 필터링합니다.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 사항 설명(자연어).

:::

**예시**
"1000보다 큰 sales 열을 강조 표시합니다."

"각 지역에서 이익률이 가장 높은 열을 강조 표시합니다."



#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드.

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근).

- 입력 파라미터: data(배열). 각 항목에는 행 번호를 나타내는 __row_index 필드가 포함됩니다.

- 행 인덱스와 필드 조합의 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청.

:::

**예시**
sales > 1000 인 데이터 항목의 'sales' 필드를 강조 표시:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목을 강조 표시:
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

여러 필터 조건을 만족하는 데이터 항목을 강조 표시:
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
코드 실행 실패 또는 환경 미지원 시 fallback 방안.

:::


##### field

**Type:** `string`

:::note{title=설명}
차원 필드, dimensions 중 하나의 항목 id입니다.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 데이터 항목의 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 데이터 항목의 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 데이터 항목의 차원 필드 값이 value 안에 있는 데이터 항목을 선택합니다

\- not in: 데이터 항목의 차원 필드 값이 value 안에 없는 데이터 항목을 선택합니다

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
차원 필드 값을 기준으로 데이터 항목을 선택하며, 배열을 지원합니다.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드). prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다.

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
범례. 히트맵 차트의 색상 범례 설정으로, 위치, 형식, 스타일 등 차트 범례를 정의하는 데 사용됩니다.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
범례 위치.

:::

**예시**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether legend functionality is enabled.

:::

**예시**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
범례 글꼴 색상.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
범례 글꼴 크기.

:::

**예시**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
범례 글꼴 굵기.

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
툴팁 설정. 위치, 형식, 스타일 등 차트의 툴팁을 정의하는 데 사용됩니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 기능 활성화 여부.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 설정. 영역 선택 기능을 활성화하거나 비활성화하는 데 사용됩니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
영역 선택 활성화 여부.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}
브러시 타입. 선택 박스의 모양과 방향을 정의합니다:

- `rect`: 사각형 선택. X와 Y 두 방향 모두에서 선택할 수 있습니다.

- `polygon`: 다각형 선택. 여러 점을 클릭하여 임의의 모양을 그릴 수 있습니다.

- `x`: 가로 선택. 선택을 X축 방향으로 제한합니다.

- `y`: 세로 선택. 선택을 Y축 방향으로 제한합니다.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
선택 모드, 단일 또는 다중. 선택 로직을 정의합니다:

- `single`: 단일 선택 모드. 한 번에 하나의 선택 박스만 존재할 수 있습니다.

- `multiple`: 다중 선택 모드. 여러 선택 박스가 동시에 존재할 수 있습니다.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
영역 선택이 끝난 뒤 선택 박스를 지울지 여부.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
선택 영역 안의 데이터 스타일.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
선택된 데이터 포인트의 불투명도, 범위 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
스트로크 너비.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
선택 영역 밖의 데이터 스타일.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
선택 영역 밖 데이터 포인트의 불투명도, 범위 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
스트로크 색상.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
스트로크 너비.

:::


## theme

**Type:** `테마 | undefined`

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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
Locale. 차트 언어 설정. 'zh-CN' 및 'en-US'를 지원합니다. 또는 intl.setLocale('zh-CN')을 호출하여 언어를 설정할 수 있습니다.

:::

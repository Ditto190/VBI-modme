# Radar

:::info{title=권장}
\- 권장 필드 구성: `1`개 지표, `1`개 차원

\- 데이터 리셰이프 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
레이더 차트는 다음 시각 채널을 지원합니다:

`angle`  : 각도 채널, `여러 차원`을 지원하며 차원 값에 따라 각도 축에 매핑됩니다

`radius` : 반경 채널, `여러 지표`를 지원하며 지표 값에 따라 반경 축에 매핑됩니다

`color`  : 색상 채널이며 `여러 차원` 또는 `하나의 지표`를 지원합니다. 차원 색상은 데이터 시리즈를 구분하고, 지표 색상은 지표 값을 그래픽 색상에 선형 매핑합니다

`tooltip`: 툴팁 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트에 마우스를 올리면 표시됩니다

`label`  : 레이블 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트 위에 데이터 레이블로 표시됩니다

:::

:::note{title=설명}
레이더 차트는 다차원 데이터의 비교 분석에 적합하며, 다중 축 좌표계로 각 차원의 값 분포를 표시합니다

적용 시나리오:

\- 다차원 데이터의 종합 성과 비교

\- 여러 객체를 여러 지표에서 성능 평가

\- 범주형 데이터의 다차원 특성 표시

:::

:::warning{title=Warning}
데이터 요구사항:

\- 최소 1개의 숫자 필드(지표)

\- 첫 번째 차원은 레이더 차트의 각 축이 되고, 다른 차원은 서로 다른 시리즈로 비교됩니다

\- 여러 지표를 각각 다른 시리즈로 표시할 수 있습니다

기본으로 활성화되는 기능:

\- 범례, 레이더 좌표계, 데이터 레이블, 툴팁, 값 스케일링이 기본으로 활성화됩니다

:::


## chartType

**Type:** `"radar"`

:::note{title=설명}
레이더 차트



레이더 차트, 다중 축 좌표계를 통해 다차원 데이터의 비교 관계를 표시합니다

:::

**예시**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋



TidyData 규격을 따르며 이미 집계된 데이터셋입니다. 차트의 데이터 소스와 구조를 정의합니다. VSeed가 데이터를 자동으로 리셰이프하므로 사용자 입력 데이터는 전처리가 필요 없습니다. 레이더 차트 데이터는 최종적으로 두 개의 차원과 하나의 지표로 변환됩니다.

:::

**예시**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=설명}
차원

레이더 차트의 첫 번째 차원은 각도 축에 매핑되고, 나머지 차원은 여러 지표가 있을 때 지표 이름과 병합되어 범례 항목으로 표시됩니다.

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
시간 단위입니다. 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- angle: 여러 차원을 각도 채널에 매핑할 수 있습니다

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 라벨 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=설명}
지표



레이더 차트의 지표는 자동으로 하나의 지표로 병합되어 반지름 축에 매핑됩니다. 여러 지표가 있을 때 지표 이름은 나머지 차원과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=설명}
지표 ID, 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
지표 별칭입니다. 중복을 허용하며, 설정하지 않으면 별칭은 ID가 됩니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
자동 숫자 서식입니다. 기본적으로 활성화되며 우선순위가 가장 높습니다

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다.

활성화하면 그래프 데이터 레이블과 툴팁이 지표 값과 로케일에 따라 적절한 서식을 자동으로 선택합니다.

서식 규칙: 십진수, 축약 표기 활성화, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현을 사용합니다.

예:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 서식입니다. 레이블과 툴팁에 자동 적용됩니다.

참고: 사용자 지정 서식을 사용하려면 autoFormat을 명시적으로 false로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 포맷 유형입니다. 숫자(10진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호입니다. 예: %, ‰
:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷의 천 단위 구분자입니다
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사입니다
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사입니다
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits로 포맷하며 significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235로 변환, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits로 포맷하며 fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000으로 변환, significantDigits:1
\- 1234.5678은 1200으로 변환, significantDigits:2
\- 1234.5678은 1230으로 변환, significantDigits:3
\- 1234.5678은 1234로 변환, significantDigits:4
\- 1234.5678은 1234.6으로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230으로 변환, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
숫자 포맷 유형입니다. 숫자(10진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호입니다. 예: %, ‰
:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷의 천 단위 구분자입니다
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사입니다
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사입니다
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits로 포맷하며 significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235로 변환, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits로 포맷하며 fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000으로 변환, significantDigits:1
\- 1234.5678은 1200으로 변환, significantDigits:2
\- 1234.5678은 1230으로 변환, significantDigits:3
\- 1234.5678은 1234로 변환, significantDigits:4
\- 1234.5678은 1234.6으로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230으로 변환, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- radius: 지표에서 radius로 매핑됨

\- color: 색상 채널에 매핑되는 지표

\- label: 레이블 채널에 매핑되는 지표

\- tooltip: 툴팁 채널에 매핑되는 지표

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
플랫 지표 구성 형식으로 트리 형태의 지표 그룹을 만듭니다. parentId는 상위 지표 그룹의 ID를 가리키며 지표 트리를 구성하는 데 사용됩니다.

:::

:::tip{title=Tip}
지표 트리를 구성하는 방법은 두 가지입니다. 옵션 1은 children으로 지표 트리를 직접 구성하고, 옵션 2는 parentId가 있는 플랫 지표 목록을 구성합니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
Paging configuration, used to specify the paging field name; it must be a dimension

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
차트 배경색

배경색은 'red', 'blue'와 같은 색상 문자열이거나 '#ff0000', 'rgba(255,0,0,0.5)'와 같은 hex, rgb, rgba 값일 수 있습니다.
:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상



색상 설정입니다. 색상 목록, 색상 매핑, 색상 그라데이션 등 차트의 색상 체계를 정의하는 데 사용합니다.

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
라벨



라벨 설정입니다. 데이터 라벨의 위치, 형식, 스타일 및 관련 설정을 정의하는 데 사용합니다.

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
라벨에 지표 값을 표시할지 여부.

다중 지표 시나리오에서는 모든 플롯 관련 지표가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 지표로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
레이블이 지표을 백분율로 표시할지 여부입니다.

다중 지표 시나리오에서는 모든 플롯 관련 지표가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 지표로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

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
숫자 포맷 유형입니다. 숫자(10진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원합니다
:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 기호입니다. 예: %, ‰
:::

**예시**

- 100000은 10万으로 변환됩니다, ratio:10000, symbol:"万"
- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 포맷의 천 단위 구분자입니다
:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접미사입니다
:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
숫자 포맷 접두사입니다
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 소수 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits로 포맷하며 significantDigits보다 우선순위가 낮습니다
:::

**예시**
\- 1234.5678은 1235로 변환, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678은 1234.6으로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678은 1230.568로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678은 1234.56780으로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷의 유효 자릿수입니다. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits로 포맷하며 fractionDigits보다 우선순위가 높습니다
:::

**예시**
\- 1234.5678은 1000으로 변환, significantDigits:1
\- 1234.5678은 1200으로 변환, significantDigits:2
\- 1234.5678은 1230으로 변환, significantDigits:3
\- 1234.5678은 1234로 변환, significantDigits:4
\- 1234.5678은 1234.6으로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678은 1234.57로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678은 1234.568로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678은 1234.5678로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 동시에 설정된 경우의 숫자 포맷 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority 규칙을 따릅니다
:::

**예시**
\- 1234.5678은 1230으로 변환, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678은 1234.5678로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
레이블 글꼴 크기
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
사각형의 최대 높이입니다. 픽셀 값 또는 백분율 문자열을 사용할 수 있습니다.

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
차원 필드이며 dimensions 항목 중 하나의 id입니다
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




operator와 동일

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

- 임의의 복잡한 데이터 필터링 조건 지원

- 내장 유틸리티 함수를 사용해 데이터 작업 수행

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback을 사용합니다

주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)의 필터링을 구현합니다

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구사항 설명(자연어)

:::

**예시**
"sales가 1000보다 큰 막대를 강조"

"각 지역에서 profit rate가 가장 높은 막대를 강조"


#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근)

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호, field는 강조할 필드를 나타냅니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 profit rate가 가장 높은 데이터 항목 강조
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

여러 조건을 만족하는 데이터 항목 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback

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

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

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



범례 설정입니다. 범례의 위치, 형식, 스타일 및 관련 설정을 정의하는 데 사용합니다.

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
border: true



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
labelFontSize: 10



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}
범례 모양 타입입니다.

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
범례 항목이 많을 때의 최대 열 또는 행 수입니다.

position이 가로 방향(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr)이면 maxSize는 표시되는 열 수를 제어합니다.

position이 세로 방향(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb)이면 maxSize는 표시되는 행 수를 제어합니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**예시**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
툴팁



툴팁 설정입니다. 툴팁의 위치, 형식, 스타일 및 관련 설정을 정의하는 데 사용합니다.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
툴팁 기능을 활성화할지 여부
:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 선택



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Y축 브러시입니다. Y축 방향으로만 선택하며 X축 방향은 제한되지 않습니다.

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
범위 선택 모드, 단일 선택 또는 다중 선택



브러시 선택 모드를 정의합니다

\- `single`: 단일 선택 모드로, 한 번에 하나의 브러시 선택 영역만 존재할 수 있습니다

\- `multiple`: 다중 선택 모드로, 여러 브러시 선택 영역이 동시에 존재할 수 있습니다
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
\- 100000는 10万으로 변환, ratio:10000, symbol:"万"



선택 영역 밖 데이터 포인트의 스타일을 정의합니다.

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
\- 100000는 10万으로 변환, ratio:10000, symbol:"万"





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


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=설명}
애니메이션 설정



차트 애니메이션 설정입니다. 선택 가능한 효과는 차트 유형에 따라 제한됩니다

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
레이더 차트 애니메이션을 활성화할지 여부입니다

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=설명}
레이더 차트 애니메이션 매개변수입니다

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=설명}
레이더 차트 입장 애니메이션 설정입니다

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=설명}
레이더 차트 입장 효과입니다. 방사형 및 스케일 애니메이션을 지원합니다

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부입니다

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 이징 함수입니다

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 지속 시간이며 단위는 밀리초입니다

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상입니다

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=설명}
레이더 차트 업데이트 애니메이션 설정입니다

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=설명}
레이더 차트 업데이트 효과입니다. 성장 애니메이션을 지원합니다

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부입니다

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 이징 함수입니다

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 지속 시간이며 단위는 밀리초입니다

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상입니다

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=설명}
레이더 차트 반복 애니메이션 설정입니다

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
반복 애니메이션을 활성화할지 여부입니다

:::

##### interval

**Type:** `number | undefined`

:::note{title=설명}
반복 애니메이션 간격이며 단위는 밀리초입니다

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=설명}
레이더 차트 atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=설명}
분위기 애니메이션 이징 함수

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
분위기 애니메이션 색상

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=설명}
분위기 애니메이션 효과, 파동, 표시/숨김 및 호흡 효과를 지원합니다

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
그래프 테마입니다. 테마는 우선순위가 낮은 기능 설정으로, 모든 그래프 유형이 공유하는 공통 설정과 단일 그래프 유형의 설정을 포함합니다.



light와 dark 두 가지 내장 테마를 제공하며, 사용자는 Builder를 통해 테마를 사용자 지정할 수 있습니다.



테마



light와 dark 두 가지 내장 테마를 제공하며, 새 테마는 registerTheme으로 사용자 지정할 수 있습니다.
:::

**예시**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=설명}
포인트 마크 스타일 설정으로, 포인트 마크의 색상, 테두리 및 관련 설정을 정의합니다.

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
차원 필드이며 dimensions 항목 중 하나의 id입니다
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




operator와 동일

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

Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 시나리오에 적합합니다

핵심 기능:

- 임의의 복잡한 데이터 필터링 조건 지원

- 내장 유틸리티 함수를 사용해 데이터 작업 수행

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback을 사용합니다

주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)의 필터링을 구현합니다

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구사항 설명(자연어)

:::

**예시**
"sales가 1000보다 큰 막대를 강조"

"각 지역에서 profit rate가 가장 높은 막대를 강조"


#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근)

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호, field는 강조할 필드를 나타냅니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 profit rate가 가장 높은 데이터 항목 강조
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

여러 조건을 만족하는 데이터 항목 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback

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

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=설명}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

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
차원 필드이며 dimensions 항목 중 하나의 id입니다
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




operator와 동일

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

Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 시나리오에 적합합니다

핵심 기능:

- 임의의 복잡한 데이터 필터링 조건 지원

- 내장 유틸리티 함수를 사용해 데이터 작업 수행

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback을 사용합니다

주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)의 필터링을 구현합니다

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구사항 설명(자연어)

:::

**예시**
"sales가 1000보다 큰 막대를 강조"

"각 지역에서 profit rate가 가장 높은 막대를 강조"


#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근)

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호, field는 강조할 필드를 나타냅니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 profit rate가 가장 높은 데이터 항목 강조
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

여러 조건을 만족하는 데이터 항목 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback

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

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
선분을 표시할지 여부

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=설명}
선분을 부드럽게 처리할지 여부

:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
선분 색상

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
선분 색상 불투명도

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선분 너비

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
선분 스타일

:::

**예시**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=설명}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

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
차원 필드이며 dimensions 항목 중 하나의 id입니다
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




operator와 동일

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

Top N, 통계 분석, 복잡한 조건처럼 정적 selector로 표현하기 어려운 시나리오에 적합합니다

핵심 기능:

- 임의의 복잡한 데이터 필터링 조건 지원

- 내장 유틸리티 함수를 사용해 데이터 작업 수행

- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)

환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback을 사용합니다

주의: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)의 필터링을 구현합니다

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구사항 설명(자연어)

:::

**예시**
"sales가 1000보다 큰 막대를 강조"

"각 지역에서 profit rate가 가장 높은 막대를 강조"


#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R로 접근)

- 입력 매개변수: data(배열), 각 item에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index는 원본 데이터 항목의 행 번호, field는 강조할 필드를 나타냅니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales가 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 profit rate가 가장 높은 데이터 항목 강조
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

여러 조건을 만족하는 데이터 항목 강조
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
코드 실행 실패 또는 환경 미지원 시 fallback

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

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

operator와 동일

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=설명}
영역 그래픽 요소가 표시되는지 여부입니다



영역 그래픽 요소가 표시되는지 여부입니다

:::

### areaColor

**Type:** `string | undefined`

:::note{title=설명}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
언어



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::

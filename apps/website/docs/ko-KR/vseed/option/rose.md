# Rose

:::info{title=권장}
\- 권장 필드 구성: `1`개 지표, `1`개 차원

\- 데이터 리셰이프 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
스택형 로즈 차트는 다음 시각 채널을 지원합니다:

`angle`  : 각도 채널, `여러 차원`을 지원하며 차원 값을 각도 축에 매핑합니다

`radius` : 반지름 채널, `여러 지표`를 지원하며 지표 값을 반지름 축에 매핑합니다

`detail` : 세부 채널, `여러 차원`을 지원하며 같은 색상 계열 내에서 더 세분화된 데이터를 표시할 때 사용합니다

`color`  : 색상 채널, `여러 차원` 또는 `하나의 지표`를 지원합니다. 차원 색상은 데이터 계열을 구분하는 데 사용되고, 지표 색상은 지표 값을 그래픽 색상에 선형 매핑하는 데 사용됩니다

`tooltip`: 툴팁 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 마우스를 올릴 때 표시됩니다

`label`  : 라벨 채널, `여러 차원`과 `여러 지표`를 지원하며 데이터 포인트에 데이터 라벨을 표시합니다

:::

:::note{title=설명}
스택형 로즈 차트는 다차원 데이터 비교 시나리오에 적합하며, 극좌표계에서 섹터의 호 길이와 반지름으로 데이터 크기를 표시합니다

적용 시나리오:

\- 다차원 데이터의 분포 비교

\- 주기성 데이터의 강약 비교

\- 범주형 데이터의 수치와 비율 동시 표시

:::

:::warning{title=Warning}
데이터 요구 사항:

\- 최소 1개의 숫자 필드(지표)

\- 첫 번째 차원은 각도 축에 배치되고, 나머지 차원은 지표 이름(여러 지표가 있는 경우)과 병합되어 범례 항목으로 표시됩니다

\- 모든 지표는 자동으로 하나의 지표로 병합됩니다

기본으로 활성화되는 기능:

\- 범례, 극좌표계, 데이터 라벨, 툴팁, 값 스케일링이 기본으로 활성화됩니다

:::


## chartType

**Type:** `"rose"`

:::note{title=설명}
스택형 로즈 차트



스택형 로즈 차트, 극좌표계를 통해 다차원 데이터 비교 관계를 표시합니다

:::

**예시**
'rose'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋



TidyData 사양을 따르는 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의하는 데 사용됩니다. 사용자가 입력한 데이터셋은 별도 처리할 필요가 없으며, VSeed의 강력한 데이터 리셰이프 기능이 데이터를 자동으로 리셰이프합니다. 로즈 차트 데이터는 최종적으로 2개의 차원과 1개의 지표로 변환됩니다.

:::

**예시**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=설명}
차원



로즈 차트의 첫 번째 차원은 각도 축에 매핑되고, 나머지 차원은 지표 이름(여러 지표가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'category', alias: 'Category'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- angle: 여러 차원을 각도 채널에 매핑할 수 있습니다

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 detail 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 tooltip 채널에 매핑할 수 있습니다

\- label: 여러 차원을 label 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=설명}
지표



로즈 차트의 지표는 자동으로 하나의 지표로 병합되어 반지름 축에 매핑됩니다. 여러 지표가 있는 경우 지표 이름은 다른 차원과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: 'value', alias: 'Value'}]




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

활성화하면 그래프 데이터 레이블과 툴팁이 지표 값과 locale에 따라 적절한 형식을 자동으로 선택합니다

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
숫자 형식 유형입니다. 숫자(십진수), 백분율(%), 천분율(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율, 0일 수 없습니다

:::

**예시**
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

**예시**
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



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
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

**예시**
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- radius: 반지름 채널에 매핑되는 지표

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

**Type:** `PieLabel | undefined`

:::note{title=설명}
레이블



위치, 형식, 스타일을 포함해 그래프 데이터 레이블을 정의하는 레이블 설정입니다.

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
숫자 형식 유형입니다. 숫자(십진수), 백분율(%), 천분율(‰), 과학적 표기법을 지원합니다

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 비율, 0일 수 없습니다

:::

**예시**
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 기호, 예: %, ‰

:::

**예시**
\- 100000는 10万, ratio:10000, symbol:"万"
\- 100000은 10K로 변환됩니다, ratio:1000, symbol:"K"



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
차원 필드, dimensions 항목 중 하나의 id
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
차원 필드, 차원 항목의 ID

연산자


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다


연산자

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


### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=설명}
\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청







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
sales가 1000보다 큰 데이터 항목의 sales 필드를 강조합니다



### border

**Type:** `boolean | undefined`

:::note{title=설명}
범례 테두리를 활성화할지 여부
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다
:::

**예시**
각 영역에서 이익률이 가장 높은 데이터 항목을 강조합니다



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
다중 조건 필터링으로 데이터 항목을 강조합니다

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
차원 필드, 차원 항목의 ID

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
범례 글꼴 크기
:::

**예시**
연산자



### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
범례 글꼴 두께
:::

**예시**
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}
범례 모양
:::

:::warning{title=Warning}
이산 범례에만 적용됩니다
:::

**예시**
연산자



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
범례 위치
:::

**예시**
\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다



### maxSize

**Type:** `number | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다





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
차원 필드 값, 배열을 지원합니다









:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
애니메이션 필터 실행 결과(런타임 필드)

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}
prepare() 단계에서 작성되며 런타임에는 읽기 전용입니다



\- `y`: Y축 방향 선택, Y축 방향으로만 선택을 제한하고 X축 방향은 제한하지 않습니다

\- `rect`: 직사각형 브러시 선택, X축과 Y축 두 방향에서 모두 선택할 수 있습니다

\- `polygon`: 다각형 브러시 선택, 여러 점을 클릭해 임의의 다각형을 그려 선택합니다


\- `y`: Y축 브러시 선택, Y축 방향으로만 제한됩니다

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
브러시 선택 모드, 단일 선택 또는 다중 선택



브러시 선택 모드를 정의합니다


범례 기능을 활성화할지 여부

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
선택이 끝난 뒤 브러시 영역을 지울지 여부입니다

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



선택된 데이터 포인트의 불투명도, 범위는 0-1입니다

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
Stroke color

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
legend font color



선택되지 않은 데이터 포인트의 불투명도, 범위 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
스트로크 너비
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=설명}
범례 글꼴 크기



차트 애니메이션 설정, 사용 가능한 효과는 차트 유형에 따라 제한됩니다

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
legend font color

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=설명}
범례 글꼴 두께

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=설명}
파이/도넛/로즈 차트 등장 애니메이션 설정

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=설명}
파이/도넛/로즈 차트 등장 효과, 방사형 및 스케일 애니메이션을 지원합니다

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부입니다

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 easing 함수

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
범례 위치

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 강조 또는 분위기 색상

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=설명}
파이/도넛/로즈 차트 업데이트 애니메이션 설정

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=설명}
파이/도넛/로즈 차트 업데이트 효과, 방사형 애니메이션을 지원합니다

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
현재 애니메이션 단계를 활성화할지 여부입니다

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
애니메이션 easing 함수

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
애니메이션 시간, 밀리초 단위

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
툴팁

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=설명}
위치, 형식, 스타일 등을 포함해 차트 툴팁을 정의하는 툴팁 설정입니다.

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
툴팁 기능 활성화 여부

:::

##### interval

**Type:** `number | undefined`

:::note{title=설명}
브러시 선택 상자의 모양과 선택 방향을 정의합니다

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=설명}
\- `polygon`: 다각형 선택. 여러 점을 클릭해 임의의 다각형을 그려 선택할 수 있습니다

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=설명}
브러시 선택 모드: 단일 또는 다중

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=설명}
선택된 데이터 포인트의 스타일을 정의합니다.

:::

###### ease

**Type:** `string | undefined`

:::note{title=설명}
brushtype

:::

###### duration

**Type:** `number | undefined`

:::note{title=설명}
불투명도

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
선택된 데이터 포인트의 불투명도, 범위 0-1

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=설명}
\- `polygon`: 다각형 브러시 선택. 여러 점을 클릭해 임의의 다각형을 그려 선택합니다

:::


###### ease

**Type:** `string | undefined`

:::note{title=설명}
\- `x`: X축 방향으로만 브러시 선택합니다. Y축 방향은 제한되지 않습니다

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
\- `y`: Y축 방향 브러시 선택. X축 방향은 제한하지 않습니다

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
브러시 선택이 끝난 후 선택 영역을 지울지 여부

선택되지 않은 데이터 포인트의 불투명도, 범위 0-1

브러시 선택된 데이터 포인트의 스타일을 정의합니다




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
선택되지 않은 데이터 항목의 스타일



브러시 선택 밖의 데이터 포인트 스타일을 정의합니다

:::

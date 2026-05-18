# Column

:::info{title=권장}
\- 권장 필드 구성: `1`개 지표, `2`개 차원

\- 데이터 리셰이프 지원: 최소 `1`개 지표, `0`개 차원

:::

:::info{title=인코딩 매핑}
컬럼 차트는 다음 시각 채널을 지원합니다:

`xAxis`  : X축 채널, `여러 차원`을 지원하며 차원 값을 X축에 매핑합니다

`yAxis`  : Y축 채널, `여러 지표`를 지원하며 지표 값을 Y축에 매핑합니다

`detail` : 상세 채널이며 `여러 차원`을 지원하고 같은 색상 시리즈 안에서 더 세분화된 데이터를 표시할 때 사용합니다

`color`  : 색상 채널이며 `여러 차원` 또는 `하나의 지표`를 지원합니다. 차원 색상은 데이터 시리즈를 구분하고, 지표 색상은 값을 마크 색상으로 선형 매핑합니다

`tooltip`: 툴팁 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트에 마우스를 올리면 표시됩니다

`label`  : 라벨 채널이며 `여러 차원`과 `여러 지표`를 지원하고 데이터 포인트에 데이터 라벨을 표시합니다

:::

:::note{title=설명}
컬럼 차트는 세로 방향 데이터 비교에 적합합니다. X축은 범주 축(범주형 데이터), Y축은 수치 축(연속 데이터)이며 막대가 세로로 배치됩니다

적용 시나리오:

\- 데이터 항목 이름이 짧을 때

\- 서로 다른 범주의 값을 직관적으로 비교해야 할 때

\- 시계열 데이터 변화 추세를 표시할 때

:::

:::warning{title=Warning}
데이터 요구 사항:

\- 최소 1개의 수치 필드(지표)

\- 첫 번째 차원은 X축에 배치됩니다. 다른 차원은 지표 이름(여러 지표가 있는 경우)과 병합되어 범례 항목으로 표시됩니다

\- 모든 지표는 자동으로 하나의 지표로 병합됩니다

기본으로 활성화되는 기능:

\- 범례, 축, 데이터 라벨, 툴팁이 기본으로 활성화됩니다.

:::


## chartType

**Type:** `"column"`

:::note{title=설명}
컬럼 차트는 세로 방향 데이터 비교에 적합합니다. X축은 범주 축(범주형 데이터), Y축은 수치 축(연속 데이터)이며 막대가 세로로 배치됩니다

:::

**예시**
'column'




## dataset

**Type:** `Record[]`

:::note{title=설명}
TidyData 규격을 따르는 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의합니다. 사용자가 입력한 데이터셋은 별도 전처리가 필요 없습니다. VSeed는 강력한 데이터 리셰이프 기능을 갖추고 있어 데이터 재구성을 자동으로 수행하며, 컬럼 차트 데이터는 최종적으로 2개의 차원과 1개의 지표로 변환됩니다.

:::

**예시**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=설명}
컬럼 차트의 첫 번째 차원은 X축에 매핑됩니다. 나머지 차원은 여러 지표가 있을 때 지표 이름과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: "category", alias: "category"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- xAxis: 여러 차원을 X축에 매핑할 수 있습니다

\- color: 여러 차원을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 차원을 detail 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 tooltip 채널에 매핑할 수 있습니다

\- label: 여러 차원을 label 채널에 매핑할 수 있습니다

\- row: 여러 차원을 행 채널에 매핑할 수 있습니다

\- column: 여러 차원을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=설명}
컬럼 차트의 모든 지표는 자동으로 하나의 지표로 병합되어 Y축에 매핑됩니다. 여러 지표가 있는 경우 지표 이름은 다른 차원과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=설명}
지표 ID이며 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
Measure 별칭, 중복을 허용합니다. 설정하지 않으면 alias 는 id 입니다

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- yAxis: Y축에 매핑되는 지표

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
차트의 배경색입니다. 배경색은 색상 문자열로 지정할 수 있으며 기본값은 투명 배경입니다. 예: 'red', 'blue'. '#ff0000', 'rgba(255,0,0,0.5)' 같은 hex, rgb, rgba도 지원합니다.

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
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
 'sales': 'blue',
}
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
위치, 형식, 스타일을 포함해 차트 데이터 레이블을 정의하는 레이블 설정입니다.

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
차원 필드, 차원 항목의 ID

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

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
사용자의 필터링 요구 설명(자연어)

:::

**예시**
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터링 코드



\- 내장 유틸리티 함수(_ 또는 R을 통해 접근)만 사용할 수 있습니다

\- 입력 파라미터: data(배열), 각 항목에는 행 번호를 나타내는 __row_index 필드가 포함됩니다

\- 행 인덱스와 필드 조합의 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

\- __row_index는 원본 데이터 항목의 행 번호를 나타내고, field는 강조할 필드를 나타냅니다

\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

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
연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

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

**Type:** `Legend | undefined`

:::note{title=설명}
차트 범례를 정의하는 범례 설정입니다. 위치, 형식, 스타일 등을 포함합니다.

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
범례 테두리를 활성화할지 여부입니다..

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**예시**
범례 글꼴 두께



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
Pagination icon disabled/grayed-out color.

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
legend font color

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
Applies only to discrete legends.

:::

**예시**
Brush



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
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**예시**
브러시 모드; 단일 또는 여러 영역을 선택할 수 있는지 정의합니다.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=설명}
차트 툴팁을 정의하는 tooltip 설정입니다. 위치, 형식, 스타일 등을 포함합니다.



Brush selection

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


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=설명}
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.



When autoHide is disabled, use sampling, configured on minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
막대/컬럼 차트 애니메이션을 활성화할지 여부입니다

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
막대/컬럼 차트 진입 효과이며 성장 애니메이션을 지원합니다

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 두께

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다.

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다.

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=설명}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=설명}
막대/컬럼 차트 업데이트 효과이며 성장 및 진입 애니메이션을 지원합니다

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 두께

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다.

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다.

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=설명}
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Tick size

:::

##### interval

**Type:** `number | undefined`

:::note{title=설명}
\- 1234.5678은 1230, significantDigits:3로 변환됩니다

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
\- 100000은 10万으로 변환, ratio:10000, symbol:"万"

:::

###### ease

**Type:** `string | undefined`

:::note{title=설명}
label 글꼴 두께

:::

###### duration

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 타입입니다. decimal, percent(%), permille(‰), 과학적 표기법을 지원합니다.

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
숫자 형식 비율이며 0일 수 없습니다.

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=설명}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=설명}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=설명}
Atmosphere animation effect; supports ripple, fade, and breathe

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=설명}
X축 범주 축 설정으로, 위치, 형식, 스타일 및 관련 설정을 포함해 차트 X축을 정의합니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축 선 색상

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
X축 애니메이션 구성

:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 축(Y축) 구성으로, 차트의 Y축 위치, 형식, 스타일 등을 정의하는 데 사용됩니다.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=설명}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=설명}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=설명}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=설명}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=설명}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=설명}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
카테고리 축에 직접 적용되는 사용자 지정 정렬 순서

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
숫자 축의 숫자 형식입니다. 숫자 축에만 유효하며 `autoFormat`보다 우선순위가 낮습니다.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
label 글꼴 크기

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
레이블 글꼴 크기

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
레이블 글꼴 두께

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
X축 눈금

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
정렬 순서이며 'asc' 또는 'desc'일 수 있습니다

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
sortLegend: {

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
제목 텍스트입니다. 기본적으로 필드 구성을 따릅니다.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=설명}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
그리드 선 유형

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
Y축 수치 축 설정으로, 위치, 형식, 스타일 및 관련 설정을 포함해 차트 Y축을 정의합니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
축 선 색상

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
X축 애니메이션 구성

:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 축(Y축) 구성으로, 차트의 Y축 위치, 형식, 스타일 등을 정의하는 데 사용됩니다.

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
\- 1234.5678은 1235, fractionDigits:0 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.6, fractionDigits:1 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.57, fractionDigits:2 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1230.568, fractionDigits:3 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.5678, fractionDigits:4 (roundingMode:halfCeil)로 변환됩니다
\- 1234.5678은 1234.56780, fractionDigits:5 (roundingMode:halfCeil)로 변환됩니다



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식 접미사

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
숫자 형식의 소수 자릿수, 브라우저 Intl.NumberFormat의 minimumFractionDigits 및 maximumFractionDigits를 사용합니다. significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678은 1230, significantDigits:3 (roundingPriority:lessPrecision)로 변환됩니다
\- 1234.5678은 1234.5678, significantDigits:3 (roundingPriority:morePrecision)로 변환됩니다



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 형식의 유효 숫자, 브라우저 Intl.NumberFormat의 minimumSignificantDigits 및 maximumSignificantDigits를 사용합니다. fractionDigits보다 우선순위가 높습니다

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우의 숫자 형식 반올림 우선순위입니다. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 동일한 규칙을 따릅니다

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
숫자 축의 숫자 형식입니다. 숫자 축에만 유효하며 `autoFormat`보다 우선순위가 낮습니다.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
숫자 형식의 반올림 모드, 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 동일한 규칙을 따릅니다

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
레이블 글꼴 크기

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
X축 눈금

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 형식 접미사

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
정렬 순서이며 'asc' 또는 'desc'일 수 있습니다

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
sortLegend: {

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
제목 텍스트입니다. 기본적으로 필드 구성을 따릅니다.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=설명}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
그리드 선 유형

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


## sort

**Type:** `Sort | undefined`

:::note{title=설명}
X축 정렬 구성입니다. 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다



범주축 정렬 구성입니다. 차원 또는 지표 기준 정렬과 사용자 지정 정렬 순서를 지원합니다
:::

**예시**
차원 필드 ID(`dimensions` 내 항목의 `id`)입니다.
차트 동적 필터 설정입니다.
field: 'sales'
}
차원 필드 ID(`dimensions` 내 항목의 `id`)입니다.
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다
차트 동적 필터 설정입니다.
참고: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
각 지역에서 이익률이 가장 높은 데이터 항목을 강조 표시

:::

**예시**
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
\- `__row_index`는 원본 데이터 항목의 행 번호를 나타내고, `field`는 강조할 field를 나타냅니다.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=설명}
return _.map(filtered, item => ({



Chart dynamic filter configuration

:::

**예시**
return _.map(filtered, item => ({
차트 동적 필터 설정입니다.
field: 'sales'
}
return _.map(filtered, item => ({
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다
차트 동적 필터 설정입니다.
참고: selector와 dynamicFilter는 동시에 사용할 수 없으며 dynamicFilter의 우선순위가 더 높습니다.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
각 지역에서 이익률이 가장 높은 데이터 항목을 강조 표시

:::

**예시**
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
Custom sort order. The order is applied directly to the legend. Ascending order goes left-to-right or top-to-bottom; descending order goes right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
차트 테마입니다. 테마는 우선순위가 낮은 기능 구성으로, 모든 차트 유형이 공유하는 공통 설정과 단일 차트 범주 안에서 공유되는 설정을 포함합니다. 기본 제공 테마에는 light와 dark가 있으며, 사용자는 Builder를 통해 테마를 사용자 지정할 수 있습니다.



Operator



\- not in: 차원 field 값이 값 목록에 없는 데이터 항목을 선택합니다.

:::

**예시**
Operator

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




### length

**Type:** `number`

### brand

**Type:** `brand`


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=설명}
코드 실행 실패 또는 환경 미지원 시 fallback 솔루션입니다.



차트 테마. Theme은 우선순위가 낮은 설정으로, 모든 차트 타입이 공유하는 공통 설정과 각 차트 타입의 개별 설정을 포함합니다. 내장 테마에는 'light'와 'dark'가 있으며 Builder를 통해 사용자 지정할 수 있습니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
테마

:::

### rectColor

**Type:** `string | undefined`

:::note{title=설명}
내장 라이트/다크 테마가 있으며, registerTheme을 통해 새 테마를 사용자 지정할 수 있습니다.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}
크로스헤어 사각 영역 레이블을 표시할지 여부입니다

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=설명}
컬럼 차트 누적 모서리 반경

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=설명}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=설명}
컬럼 차트의 직사각형 마크 스타일로 색상, 테두리, 모서리 반경 등을 정의합니다.

전역 스타일 또는 조건부 스타일 설정을 지원합니다

데이터 필터

selector 를 설정하면 숫자 selector, 로컬 데이터 selector, 조건부 차원 selector, 조건부 지표 selector 네 가지 매칭 방식을 사용할 수 있습니다

selector 가 없으면 스타일은 전역으로 적용됩니다.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
데이터 선택자

selector 를 설정하면 숫자 selector, 로컬 데이터 selector, 조건부 차원 selector, 조건부 지표 selector 네 가지 매칭 방식을 사용할 수 있습니다

selector 가 없으면 스타일은 전역으로 적용됩니다.

:::

**예시**
숫자 선택자
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

로컬 데이터 선택자
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

조건부 차원 선택자
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

조건부 지표 선택자
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
차원 필드이며 dimensions 항목의 id입니다

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

operator 와 동일합니다

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

Top N, 통계 분석, 복잡한 조건 등 정적 selector 로 표현하기 어려운 시나리오에 적합합니다.

주요 기능:

- 임의의 복잡한 데이터 필터 조건 지원

- 내장 유틸리티 함수로 데이터 작업 수행

- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback 을 사용합니다.

참고: selector 와 dynamicFilter 는 동시에 사용할 수 없으며 dynamicFilter 의 우선순위가 더 높습니다.

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)를 필터링합니다

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)

:::

**예시**
"sales > 1000 인 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"
#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열), 각 item 은 행 번호를 나타내는 __row_index 필드를 포함합니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index 는 원본 데이터 항목의 행 번호이고, field 는 강조할 필드입니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales 가 1000보다 큰 데이터 항목의 sales 필드를 강조합니다
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목을 강조합니다
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

여러 조건으로 필터링된 데이터 항목을 강조합니다
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
코드 실행 실패 또는 환경 미지원 시 fallback 방안

:::
##### field

**Type:** `string`

:::note{title=설명}
차원 필드이며 dimensions 항목의 id입니다

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

operator 와 동일합니다

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
막대 요소(직사각형)를 표시할지 여부

:::
### barColor

**Type:** `string | undefined`

:::note{title=설명}
막대 요소(직사각형) 색상

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
막대 요소(직사각형) 색상 투명도

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=설명}
막대 요소(직사각형) 테두리 색상

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
막대 요소(직사각형) 테두리 너비

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
막대 요소(직사각형) 테두리 스타일

:::

**예시**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=설명}
막대 요소(직사각형) 모서리 반경

막대 요소(직사각형) 스트로크 투명도

:::

**예시**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
주석 포인트 설정입니다. 선택한 데이터를 기준으로 위치, 형식, 스타일 등을 정의합니다.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
주석 포인트 selector 이며 데이터 포인트 선택에 사용합니다.

:::
#### field

**Type:** `string`

:::note{title=설명}
차원 필드이며 dimensions 항목의 id입니다

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

operator 와 동일합니다

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::
### measureId

**Type:** `string | undefined`

:::note{title=설명}
주석 포인트가 속한 지표 id를 지정합니다. 여러 measure 시나리오에서는 selector 와 함께 대상 지표의 주석 포인트를 고유하게 찾을 수 있습니다.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI가 생성한 JavaScript 코드로 복잡한 데이터 필터링 로직을 구현합니다.

Top N, 통계 분석, 복잡한 조건 등 정적 selector 로 표현하기 어려운 시나리오에 적합합니다.

주요 기능:

- 임의의 복잡한 데이터 필터 조건 지원

- 내장 유틸리티 함수로 데이터 작업 수행

- 브라우저 환경(Web Worker 샌드박스)에서 안전하게 실행

환경 요구 사항: 브라우저 환경만 지원하며 Node.js 환경에서는 fallback 을 사용합니다.

참고: selector 와 dynamicFilter 는 동시에 사용할 수 없으며 dynamicFilter 의 우선순위가 더 높습니다.

차트 동적 필터 설정

AI 생성 JavaScript 코드로 차트 마크(막대, 점 등)를 필터링합니다

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)

:::

**예시**
"sales > 1000 인 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"
#### code

**Type:** `string`

:::note{title=설명}
AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열), 각 item 은 행 번호를 나타내는 __row_index 필드를 포함합니다

- 행 인덱스와 필드 조합 배열을 반환해야 합니다: Array<{ __row_index: number, field: string }>

- __row_index 는 원본 데이터 항목의 행 번호이고, field 는 강조할 필드입니다

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
sales 가 1000보다 큰 데이터 항목의 sales 필드를 강조합니다
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목을 강조합니다
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

여러 조건으로 필터링된 데이터 항목을 강조합니다
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
코드 실행 실패 또는 환경 미지원 시 fallback 방안

:::
##### field

**Type:** `string`

:::note{title=설명}
차원 필드이며 dimensions 항목의 id입니다

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

operator 와 동일합니다

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

prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다

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
텍스트 내용

:::

**예시**
'Annotation text'
### textColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기

:::

**예시**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 두께

:::

**예시**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬, 일반적으로 설정할 필요가 없습니다

텍스트가 주석선 왼쪽에 있도록 right 설정을 권장합니다

right: 텍스트가 참조선 왼쪽에 있으며 오른쪽 가장자리가 수직 주석선에 정렬됩니다

left: 텍스트가 참조선 오른쪽에 있으며 왼쪽 가장자리가 수직 주석선에 정렬됩니다

center: 텍스트가 참조선 중앙에 있습니다

:::

**예시**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 수직 정렬입니다. 일반적으로 top 을 사용해 텍스트가 주석 포인트 아래에 표시되고 차트 가시 영역 안에 유지되도록 합니다

텍스트 전체가 보이도록 top 설정을 권장합니다

top: 텍스트가 주석 포인트 아래에 있습니다

middle: 텍스트가 주석 포인트 중심에 정렬됩니다

bottom: 텍스트가 주석 포인트 위에 있습니다

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
배경 테두리 색상

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
배경 테두리 반경

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
Décalage Y en pixels de tout le point d’annotation. Valeur positive recommandée au-dessus du graphique, négative en dessous.

Une valeur négative déplace tout le composant vers le haut, par exemple -10 de 10 px

Une valeur positive le déplace vers le bas, par exemple 10 de 10 px

:::

**예시**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=설명}
Décalage X en pixels de tout le point d’annotation. Valeur positive à gauche du graphique, négative à droite.

Une valeur négative déplace tout le composant vers la gauche, par exemple -10 de 10 px

Une valeur positive le déplace vers la droite, par exemple 10 de 10 px

:::

**예시**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
Configuration des lignes d’annotation verticales.

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
Valeur X fixe pour la ligne verticale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
Description du besoin de valeur dynamique (langage naturel)

:::

**예시**
"Obtenir la valeur maximale de sales comme référence de ligne d’annotation"

"Calculer la moyenne de sales pour la ligne d’annotation"
#### code

**Type:** `string`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
텍스트 내용

:::

**예시**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
Position du texte

Position du libellé de la ligne d’annotation par rapport à la ligne.

:::

**예시**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기

:::

**예시**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 두께

:::

**예시**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬, 일반적으로 설정할 필요가 없습니다

텍스트가 주석선 왼쪽에 있도록 right 설정을 권장합니다

right: 텍스트가 참조선 왼쪽에 있으며 오른쪽 가장자리가 수직 주석선에 정렬됩니다

left: 텍스트가 참조선 오른쪽에 있으며 왼쪽 가장자리가 수직 주석선에 정렬됩니다

center: 텍스트가 참조선 중앙에 있습니다

:::

**예시**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 수직 정렬, 일반적으로 설정할 필요가 없습니다

텍스트 전체가 차트 가시 영역 안에 표시되도록 top 설정을 권장합니다

top: 텍스트가 참조선 아래에 있고 수직 주석선 끝에 정렬됩니다

middle: 텍스트가 참조선 중앙에 있습니다

bottom: 텍스트가 참조선 위에 있습니다

:::

**예시**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
선 표시 여부

:::

**예시**
true
### lineColor

**Type:** `string | undefined`

:::note{title=설명}
선 색상

:::

**예시**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비

:::

**예시**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
선 스타일

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
배경 테두리 색상

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
배경 테두리 반경

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
Configuration des lignes d’annotation horizontales.

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
Valeur Y fixe pour la ligne horizontale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
사용자의 필터링 요구 설명(자연어)입니다.

:::

**예시**
"주석선 기준으로 사용할 최대 매출 값을 가져옵니다"

"주석선에 사용할 평균 매출을 계산합니다"



#### code

**Type:** `string`

:::note{title=설명}
동적 필터(AI 생성 코드 실행)

AI 생성 JavaScript 필터 코드

- 내장 유틸리티 함수만 사용할 수 있습니다(_ 또는 R 로 접근)

- 입력 매개변수: data(배열)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
동적 필터 실행 결과(런타임 필드)

prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
텍스트 내용

:::

**예시**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
Position du texte

Position du libellé de la ligne d’annotation par rapport à la ligne.

:::

**예시**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기

:::

**예시**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 두께

:::

**예시**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬, 일반적으로 설정할 필요가 없습니다

텍스트가 주석선 왼쪽에 있도록 right 설정을 권장합니다

right: 텍스트가 참조선 왼쪽에 있으며 오른쪽 가장자리가 수직 주석선에 정렬됩니다

left: 텍스트가 참조선 오른쪽에 있으며 왼쪽 가장자리가 수직 주석선에 정렬됩니다

center: 텍스트가 참조선 중앙에 있습니다

:::

**예시**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 수직 정렬, 일반적으로 설정할 필요가 없습니다

텍스트 전체가 차트 가시 영역 안에 표시되도록 top 설정을 권장합니다

top: 텍스트가 참조선 아래에 있고 수평 주석선에 정렬됩니다

middle: 텍스트가 참조선 중앙에 있습니다

bottom: 텍스트가 참조선 위에 있습니다

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
배경 테두리 색상

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
배경 테두리 반경

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
선 표시 여부

:::

**예시**
true
### lineColor

**Type:** `string | undefined`

:::note{title=설명}
선 색상

:::

**예시**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
선 너비

:::

**예시**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
선 스타일

:::

**예시**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=설명}
Configuration de ligne de séparation; les parties au-dessus et au-dessous de la valeur d’annotation peuvent utiliser des couleurs différentes.

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
Couleur principale de la partie supérieure à la valeur d’annotation

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
Couleur principale de la partie inférieure à la valeur d’annotation

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=설명}
주석 영역 설정입니다. 선택한 데이터를 기준으로 위치와 스타일 등을 정의합니다.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=설명}
Sélecteur de la zone d’annotation.

:::
#### field

**Type:** `string`

:::note{title=설명}
차원 필드이며 dimensions 항목의 id입니다

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
연산자

- in: 차원 필드 값이 value 에 포함되는 데이터 항목을 선택합니다

- not in: 차원 필드 값이 value 에 포함되지 않는 데이터 항목을 선택합니다

operator 와 동일합니다

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
데이터 항목의 차원 필드 값을 선택하며 배열을 지원합니다

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
텍스트 내용

:::

**예시**
'Annotation text'
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=설명}
Position du texte

:::

**예시**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기

:::

**예시**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 두께

:::

**예시**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
텍스트 정렬, 일반적으로 설정할 필요가 없습니다

center: le texte est centré dans la zone d’annotation

left: le texte est à gauche dans la zone d’annotation

right: le texte est à droite dans la zone d’annotation

:::

**예시**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트 수직 정렬, 일반적으로 설정할 필요가 없습니다

top: le texte est en haut de la zone d’annotation

middle: le texte est au centre de la zone d’annotation

bottom: le texte est en bas de la zone d’annotation

:::

**예시**
'middle'
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
배경 테두리 색상

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
배경 테두리 반경

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
주석 영역 색상

:::

**예시**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 투명도

:::

**예시**
0.2
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
주석 영역 테두리 대시 설정

:::

**예시**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=설명}
외부 여백

:::

**예시**
8
## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=설명}
연산자



\- in: 차원 필드 값이 value에 포함되는 데이터 항목을 선택합니다

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않는 데이터 항목을 선택합니다

:::

**예시**
{ year: '1930', type: 'Autocracies' }

차원 필드 값, 배열을 지원합니다




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
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=설명}
End anchor of the difference annotation line.



차이 주석 anchor 구성으로, 시작점 또는 끝점에 바인딩된 데이터를 선택하는 데 사용됩니다.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
Anchor selector. It must ultimately locate one logical anchor.

:::

**예시**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




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
텍스트 색상입니다.
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


## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=설명}
다항 회귀선

다항 회귀선 구성입니다. 다항식 차수, 회귀선 스타일 등을 포함합니다.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
활성화 여부
:::

### color

**Type:** `string | undefined`

:::note{title=설명}
회귀선 색상

회귀선 색상을 설정합니다. 설정하지 않으면 기본적으로 차트의 주 색상을 사용합니다.
:::

### degree

**Type:** `number | undefined`

:::note{title=설명}
다항 회귀 차수
:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

회귀선 너비를 픽셀 단위로 설정합니다. 기본값은 1입니다.
:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

실선, 점선 등 회귀선 스타일을 설정합니다. 기본값은 실선입니다.
:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 레이블 텍스트

회귀선의 레이블 텍스트를 설정합니다. 빈 문자열이면 레이블을 표시하지 않습니다.
:::

### textColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상
:::

**예시**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 크기
:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
텍스트 글꼴 두께

:::

**예시**
400
### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=설명}
신뢰 구간 표시 여부
:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 값 설정입니다. 기본 신뢰도는 95%입니다
:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=설명}
신뢰 구간 색상
:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 투명도
:::

**예시**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=설명}
차트에 피벗 기능 또는 지표 조합이 켜져 있을 때 차원 연동 기능을 활성화할지 여부입니다.

특정 차원 값에 hover하면 다른 차트의 동일한 차원 값 데이터를 연동해 강조합니다.

피벗 차트 차원 연동 구성
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

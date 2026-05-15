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
데이터 소스. TidyData 사양을 따르는 데이터셋입니다

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=설명}
차원. 서로 다른 데이터 시리즈를 구분하고 범례를 표시하는 데 사용됩니다

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=설명}
레이스 산점도 계열 차트의 차원 매핑 채널

\- color: 여러 디멘션을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 디멘션을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 디멘션을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 디멘션을 라벨 채널에 매핑할 수 있습니다

\- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

\- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

\- player: 여러 차원을 플레이어 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=설명}
지표. X축과 Y축에 각각 매핑하기 위해 최소 2개의 지표가 필요합니다

:::


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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



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
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**

축 선 width



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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



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
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- xAxis: Measure mapped to the X-axis

\- yAxis: 메저를 y축에 매핑합니다

\- size: size mapped from the measure

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
플레이어 설정. 시간 차원을 지정하는 데 사용되며 동적 산점도의 핵심 설정입니다

플레이어로 시간 차원의 재생 진행률을 제어하여 데이터를 동적으로 업데이트합니다



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
차원 값의 정렬 방식을 제어하는 정렬 설정





:::

**예시**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
\- orderBy:'date'
\- orderBy:'profit'



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


## size

**Type:** `number | number[] | undefined`

:::note{title=설명}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=설명}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

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
데이터 점에 데이터 라벨을 표시하기 위한 라벨 설정

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


:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



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
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}


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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

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
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"



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

**Type:** `XLinearAxis | undefined`

:::note{title=설명}
X축 설정. 수치축으로 첫 번째 지표 값을 표시합니다

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}

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
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



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
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

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


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=설명}
Y축 설정. 수치축으로 두 번째 지표 값을 표시합니다

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}

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
숫자 포맷 비율이며 0일 수 없습니다

:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



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
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=설명}
데이터의 정확한 위치를 표시하기 위한 십자선 설정



십자선 설정. 차트에 십자선(안내선)을 표시하기 위한 설정 유형입니다

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
십자선을 표시할지 여부

:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 라벨 색상

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}
십자선 라벨을 표시할지 여부

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 라벨 배경색

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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=설명}
데이터 점 스타일 설정. 단일 스타일 또는 배열 형태일 수 있으며 전역 스타일 또는 조건부 스타일 설정을 지원합니다

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




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

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
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

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
점 마크 색상의 불투명도



점 마크 색상의 불투명도

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
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


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
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).


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


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

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




텍스트 글꼴 크기입니다.


**예시**

:::

**예시**
'right' 텍스트가 마크 포인트의 왼쪽에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**









:::

**예시**
'top' 텍스트가 마크 포인트의 아래쪽에 표시됩니다



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
**예시**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



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
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.

텍스트 색상입니다.


**예시**

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
수치 주석 선. 특정 Y축 값을 표시하는 수평 주석 선입니다

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
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



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
'red'

:::

**예시**
'마크 텍스트'



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

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**예시**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}






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
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.




same as operator

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
다항 회귀선 구성입니다. 다항식 차수, 회귀선 스타일 등을 포함합니다.

'center'로 설정하는 것을 권장합니다. 이렇게 하면 텍스트가 마크 영역의 중앙에 표시됩니다







:::

**예시**
'center' 텍스트가 마크 영역의 중앙에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}








다항 회귀 차수

:::

**예시**
'top' 텍스트가 마크 영역의 아래쪽에 표시됩니다



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
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**
4



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




## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
언어 설정

:::

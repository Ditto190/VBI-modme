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
데이터 소스

:::


## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=설명}
첫 번째 디멘션은 X축에 매핑되고, 나머지 디멘션은 메저 이름(여러 메저가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.

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
시간 입도이며 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- color: 여러 디멘션을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 디멘션을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 레이블 채널에 매핑할 수 있습니다

\- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

\- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

\- player: 여러 차원을 플레이어 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=설명}
지표

:::


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
자동 숫자 서식, 기본 활성화, 가장 높은 우선순위

autoFormat=true이면 모든 numFormat 설정을 덮어씁니다

활성화하면 차트 데이터 레이블과 툴팁이 지표 값과 로케일에 따라 적절한 형식을 자동으로 선택합니다

서식 규칙: compact notation이 활성화된 십진수, 소수 자릿수 최소 0자리 및 최대 2자리, 자동 반올림, 브라우저의 Intl.NumberFormat 구현 사용

예:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
지표의 사용자 지정 숫자 서식이며 레이블과 툴팁에 자동 적용됩니다

참고: 사용자 지정 서식을 사용하려면 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 설정을 덮어씁니다

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

### format

**Type:** `NumFormat | undefined`


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

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- angle: 지표가 매핑되는 각도

\- color: 메저를 색상 채널에 매핑합니다

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


:::


### field

**Type:** `string`

:::note{title=설명}


:::

### currentValue

**Type:** `string`

:::note{title=설명}


:::

**예시**
'2023\-01\-01'




## player

**Type:** `Player | undefined`

:::note{title=설명}
플레이어 설정. 시간 차원을 지정하는 데 사용되며 동적 도넛 차트의 핵심 설정입니다



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

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상 설정

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}


:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}


:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}


:::

**예시**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}


:::


## label

**Type:** `PieLabel | undefined`

:::note{title=설명}
레이블 설정

:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}






:::

### showDimension

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
or

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}


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
**예시**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
**예시**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}




배경 선 색상













'red'











배경 모서리 반경

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출이 1000보다 큰 데이터 항목 강조 표시"

"각 지역에서 이익률이 가장 높은 데이터 항목 강조 표시"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

**예시**






:::

**예시**
매출이 1000보다 큰 데이터 항목의 sales 필드 강조 표시
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 이익률이 가장 높은 데이터 항목 강조 표시
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

여러 조건으로 필터링된 데이터 항목 강조 표시
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
**예시**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
**예시**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}




텍스트 색상

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
범례 설정

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=설명}


:::

:::warning{title=Warning}


:::

**예시**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}


:::

**예시**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}


:::

:::warning{title=Warning}


:::

**예시**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}


:::

**예시**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=설명}






:::

:::warning{title=Warning}


:::

**예시**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
툴팁 설정

:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 설정



브러시 선택 모드: 단일 또는 다중

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
불투명도 of selected data points, range 0-1







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


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
테마 설정



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
언어 설정

:::

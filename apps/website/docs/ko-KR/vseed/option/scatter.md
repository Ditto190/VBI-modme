# Scatter

:::info{title=Recommendation}
\- Recommended field configuration: `2` measures and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Scatter charts support the following visual channels:

`xAxis`  : X-axis channel, supports `multiple measures`, mapped to the X-axis by measure value

`yAxis`  : Y-axis channel, supports `multiple measures`, mapped to the Y-axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=설명}
Scatter chart, suitable for showing data distribution with point positions representing data values

적용 시나리오:

\- Analyze distribution characteristics such as central tendency, range, and outliers

:::

:::warning{title=Warning}
Data requirements:

\- At least two numeric fields (measures)

\- The first measure field is placed on the X-axis, and the remaining measures are merged and mapped to the Y-axis

\- Measure names and dimension names are merged and displayed as legend items

Features enabled by default:

\- Legend, axes, data point markers, tooltips, and trend lines are enabled by default

:::


## chartType

**Type:** `"scatter"`

:::note{title=설명}
산점도



Scatter chart, suitable for showing data distribution with point positions representing data values

:::

**예시**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=설명}
데이터셋



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Scatter chart data is eventually converted to two dimensions and one measure.

:::

**예시**
[{month:'1월', value:100}, {month:'2월', value:150}, {month:'3월', value:120}]




## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=설명}
첫 번째 디멘션은 X축에 매핑되고, 나머지 디멘션은 메저 이름(여러 메저가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.



The first dimension in a scatter chart is mapped to the X-axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items

:::

**예시**
[{id: "month", alias: "월"}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=설명}
차원이 매핑되는 채널

\- color: 여러 디멘션을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 디멘션을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 차원을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 차원을 레이블 채널에 매핑할 수 있습니다

\- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

\- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=설명}
Scatter chart measures

:::

**예시**
[
  {
    id: 'profit', alias: '이익', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: '매출', encoding: 'yAxis'
  }
]




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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- xAxis: Measure mapped to the X-axis

\- yAxis: 메저를 y축에 매핑합니다

\- size: size mapped from the measure

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
Paging configuration, used to specify the paging field name; it must be a dimension

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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
색상



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

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

**Type:** `Label | undefined`

:::note{title=설명}
라벨



Label configuration, used to define data label position, format, style, and related settings.

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


## legend

**Type:** `Legend | undefined`

:::note{title=설명}
범례



Legend configuration, used to define legend position, format, style, and related settings.

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
툴팁



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
브러시 선택



Brush selection configuration, used to enable or disable brush selection.



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


## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=설명}
애니메이션 설정



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether scatter chart animation is enabled

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=설명}
Scatter chart animation parameters

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=설명}
Scatter chart appear animation configuration

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=설명}
Scatter chart appear effects, supporting grow and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
Animation highlight or atmosphere color

:::

#### update

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=설명}
Scatter chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=설명}
Scatter chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=설명}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=설명}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=설명}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=설명}
Scatter chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=설명}
Loop animation interval, in milliseconds

:::

##### loop

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=설명}
Scatter chart loop animation configuration

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=설명}
Scatter chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the current animation stage is enabled

:::

###### ease

**Type:** `string | undefined`

:::note{title=설명}
Animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title=설명}
Animation duration, in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
Animation highlight or atmosphere color

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=설명}
Scatter chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=설명}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=설명}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=설명}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=설명}
X축



Numeric axis. X-axis configuration used to define position, format, style, and related settings.

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
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
or

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
Y축



Numeric axis. Y-axis configuration used to define position, format, style, and related settings.

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
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
or

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
수직 안내선



Vertical guide line shown when the mouse moves over the chart



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
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

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
점 마크 스타일



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

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
주석점



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

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

### measureId

**Type:** `string | undefined`

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
수직 주석선



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as X-axis measure averages.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}












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
수평 주석선



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as Y-axis measure averages.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}












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
주석 영역



Annotation region configuration. Defines chart annotation regions based on selected data, including position, style, and related settings.

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




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=설명}
선형 회귀선



Linear regression line configuration, including line style and related settings.

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

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 라벨 텍스트

Sets the regression line label text. An empty string means no label is shown.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=설명}
신뢰 구간 표시 여부

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=설명}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=설명}
신뢰 구간 색상

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 불투명도

:::

**예시**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=설명}
Graphic blur effect strength

:::

**예시**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=설명}
Graphic shadow color

:::

**예시**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=설명}
Horizontal shadow offset distance

:::

**예시**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=설명}
Vertical shadow offset distance

:::

**예시**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=설명}
Locally weighted regression line configuration item



Locally weighted regression line configuration, including line style and related settings.

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

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 라벨 텍스트

Sets the regression line label text. An empty string means no label is shown.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=설명}
신뢰 구간 표시 여부

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=설명}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=설명}
신뢰 구간 색상

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 불투명도

:::

**예시**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=설명}
다항 회귀선



Polynomial regression line configuration, including polynomial order, line style, and related settings.

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

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### degree

**Type:** `number | undefined`

:::note{title=설명}
Polynomial regression order

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 라벨 텍스트

Sets the regression line label text. An empty string means no label is shown.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=설명}
신뢰 구간 표시 여부

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=설명}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=설명}
신뢰 구간 색상

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 불투명도

:::

**예시**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=설명}
로지스틱 회귀선



Logistic regression line configuration, including line style and related settings.

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

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 라벨 텍스트

Sets the regression line label text. An empty string means no label is shown.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=설명}
신뢰 구간 표시 여부

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=설명}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=설명}
신뢰 구간 색상

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=설명}
신뢰 구간 불투명도

:::

**예시**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=설명}
Whether to enable dimension linkage when pivot or measure grouping is enabled on the chart

When hovering over a dimension value, highlight data with the same dimension value in other charts



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
언어



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::


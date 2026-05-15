# Radar

:::info{title=Recommendation}
\- Recommended field configuration: `1` measure and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Radar charts support the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapped to the angle axis by dimension value

`radius` : Radius channel, supports `multiple measures`, mapped to the radius axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Description}
Radar chart, suitable for comparative analysis of multidimensional data, showing value distribution across dimensions through a multi-axis coordinate system

적용 시나리오:

\- Compare overall performance across multidimensional data

\- Evaluate multiple objects across multiple measures

\- Show multidimensional features of categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least one numeric field (measure)

\- The first dimension becomes the radar axes; other dimensions are compared as different series

\- Supports displaying multiple measures as separate series

Features enabled by default:

\- Legend, radar coordinate system, data labels, tooltip, and value scaling are enabled by default

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Radar chart



Radar chart, showing multidimensional comparison through a multi-axis coordinate system

:::

**Example**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
데이터셋



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Radar chart data is eventually converted to two dimensions and one measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
첫 번째 디멘션은 X축에 매핑되고, 나머지 디멘션은 메저 이름(여러 메저가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.



The first dimension of a radar chart is mapped to the angle axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=Description}
차원에 해당하는 필드 ID

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
차원 별칭

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
차원 날짜 형식 설정

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
시간 단위입니다. 날짜 표시 정밀도를 결정합니다

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
차원이 매핑되는 채널

\- angle: supports mapping multiple dimensions to the angle channel

\- color: 여러 디멘션을 색상 채널에 매핑할 수 있습니다

\- detail: 여러 디멘션을 상세 채널에 매핑할 수 있습니다

\- tooltip: 여러 디멘션을 툴팁 채널에 매핑할 수 있습니다

\- label: 여러 디멘션을 라벨 채널에 매핑할 수 있습니다

\- row: 여러 디멘션을 행 채널에 매핑할 수 있습니다

\- column: 여러 디멘션을 열 채널에 매핑할 수 있습니다

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
지표



Radar chart measures are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
지표 ID, 중복될 수 없습니다

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
측정값 별칭입니다. 중복을 허용하며, 설정하지 않으면 별칭은 ID가 됩니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
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

:::note{title=Description}
측정값의 사용자 지정 숫자 서식입니다. 레이블과 툴팁에 자동 적용됩니다.

참고: 사용자 지정 서식을 사용하려면 autoFormat을 명시적으로 false로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 덮어씁니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
숫자 포맷 비율이며 0일 수 없습니다

:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
숫자 포맷 비율이며 0일 수 없습니다

:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
지표가 매핑되는 채널

\- radius: radius mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
플랫 측정값 구성 형식으로 트리 형태의 측정값 그룹을 만듭니다. parentId는 상위 측정값 그룹의 ID를 가리키며 측정값 트리를 구성하는 데 사용됩니다.

:::

:::tip{title=Tip}
측정값 트리를 구성하는 방법은 두 가지입니다. 옵션 1은 children으로 측정값 트리를 직접 구성하고, 옵션 2는 parentId가 있는 플랫 측정값 목록을 구성합니다. 두 방법은 동시에 사용할 수 없습니다.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
페이지네이션 필드. 페이지네이션에 사용할 필드명을 지정하며 차원이어야 합니다.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
현재 페이지네이션 값. 현재 페이지를 결정하는 데 사용하는 값을 지정합니다.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
색상



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
차트의 서로 다른 요소 색상을 정의하는 데 사용하는 이산 색상 스킴.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
차트의 서로 다른 요소 색상을 정의하는 데 사용하는 선형 그라데이션 색상 스킴.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
데이터 값을 특정 색상에 매핑하는 색상 매핑.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
양수/음수 색상 설정. 차트의 양수 값 색상을 정의합니다.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
양수/음수 색상 설정. 차트의 음수 값 색상을 정의합니다.

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
라벨



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
라벨 기능 활성화 여부.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
라벨을 다음 줄로 줄바꿈할지 여부.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
라벨에 메저 값을 표시할지 여부.

다중 메저 시나리오에서는 모든 플롯 관련 메저가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 메저로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
레이블이 측정값을 백분율로 표시할지 여부입니다.

다중 메저 시나리오에서는 모든 플롯 관련 메저가 `foldMeasures` 처리를 거쳐 하나의 데이터 포인트를 나타내는 단일 메저로 병합되므로 값 충돌을 걱정할 필요가 없습니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
레이블이 차원 레이블을 표시할지 여부입니다.

모든 차원 레이블을 표시합니다.

참고: encoding의 label이 더 높은 우선순위를 가지므로 이 구성은 encoding의 label에 영향을 주지 않습니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
레이블 값을 자동 서식화할지 여부입니다. autoFormat이 true이면 numFormat 구성이 무시됩니다.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
레이블 값 서식 구성입니다. `measure`의 `format`과 병합되며, `measure`의 `format`이 더 높은 우선순위를 가집니다. numFormat의 우선순위는 autoFormat보다 낮습니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
숫자 포맷 비율이며 0일 수 없습니다

:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

라벨 제한의 최대 길이입니다. 텍스트 길이가 이 값을 초과하면 말줄임표로 잘리고 마우스를 올리면 표시됩니다(카테고리 축에만 유효).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
레이블 font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

축 선 width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
숫자 포맷 반올림 모드로, 브라우저의 Intl.NumberFormat을 사용해 포맷하며 규칙은 Intl.NumberFormat의 roundingMode와 같습니다

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
사각형의 최대 높이입니다. 픽셀 값 또는 백분율 문자열을 사용할 수 있습니다.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
레이블 배경색

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
레이블 테두리 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
레이블 글꼴 색상

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
요소의 색상에 따라 레이블 글꼴 색상을 자동으로 반전할지 여부입니다.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
레이블 위치

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
레이블 겹침 처리를 활성화할지 여부입니다.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
레이블 선택입니다. 선택자 간 조건은 기본적으로 OR입니다.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=Description}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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

:::note{title=Description}
범례



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
범례 기능을 활성화할지 여부입니다.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
범례 테두리를 활성화할지 여부입니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
범례 글꼴 색상.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
페이지네이션 아이콘 색상입니다.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
페이지네이션 아이콘의 비활성/회색 처리 색상입니다.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
범례 글꼴 크기.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
범례 글꼴 색상.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
범례 글꼴 굵기.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
범례 모양 타입입니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
범례 위치

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
범례 항목이 많을 때의 최대 열 또는 행 수입니다.

position이 가로 방향(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr)이면 maxSize는 표시되는 열 수를 제어합니다.

position이 세로 방향(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb)이면 maxSize는 표시되는 행 수를 제어합니다.

:::

:::warning{title=Warning}
이산 범례에만 적용됩니다.

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
툴팁



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
브러시 선택



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Y축 브러시입니다. Y축 방향으로만 선택하며 X축 방향은 제한되지 않습니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"



선택 영역 밖 데이터 포인트의 스타일을 정의합니다.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X축, 범주 축, X축 구성입니다. 위치, 형식, 스타일 등을 포함하여 차트의 X축을 정의합니다.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
애니메이션 설정



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether radar chart animation is enabled

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Radar chart animation parameters

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Radar chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Radar chart appear effects, supporting radial and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Radar chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Radar chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Radar chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Radar chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



연산자



\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.

:::

**Example**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=Description}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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

:::note{title=Description}
점을 표시할지 여부

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
점 크기



점 크기

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
점 마크 색상



점 마크 색상

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
점 마크 색상 불투명도



점 마크 색상 불투명도

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
점 마크 테두리 색상



점 마크 테두리 색상

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
점 마크 테두리 너비



점 마크 테두리 너비

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
점 마크 테두리 스타일



점 마크 테두리 스타일

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=Description}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
선분을 표시할지 여부

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
선분을 부드럽게 처리할지 여부

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
선분 색상

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
선분 색상 불투명도

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
선분 너비

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
선분 스타일

:::

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: 차원 필드 값이 `value` 배열 안에 없는 데이터 항목을 선택합니다.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"매출이 1000보다 큰 막대 강조 표시"

"각 지역에서 이익률이 가장 높은 막대 강조 표시"



#### code

**Type:** `string`

:::note{title=Description}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



주석 포인트의 가로 오프셋(픽셀)입니다. 포인트가 왼쪽(범주 축 시작)에 있으면 양수 값을, 오른쪽(범주 축 끝)에 있으면 음수 값을 권장합니다.

음수 값은 전체 컴포넌트를 왼쪽으로 이동합니다(예: -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
크로스헤어에 해당하는 레이블을 표시할지 여부입니다.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



텍스트 색상

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Description}
언어



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::


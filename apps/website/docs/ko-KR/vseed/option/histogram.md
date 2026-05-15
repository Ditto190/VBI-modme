# Histogram

:::info{title=인코딩 매핑}
히스토그램은 다음 시각 채널을 지원합니다:

`xAxis`  : x축 채널, `하나의 차원`을 지원하며 차원 값을 구간화 계산한 뒤 x축에 표시합니다

:::

:::note{title=설명}
히스토그램은 데이터 분포를 표시하는 데 적합하며, X축은 숫자 축(연속 데이터), Y축도 숫자 축(연속 데이터)이고 막대는 세로로 배열됩니다

적용 시나리오:

\- 빈도 분포, 확률 분포 등 데이터의 분포 상황을 표시할 때

\- 데이터의 중심 경향과 분산 정도를 분석할 때

\- 데이터의 이상치와 패턴을 식별할 때

:::


## chartType

**Type:** `"histogram"`

:::note{title=설명}
히스토그램으로, 데이터 분포를 표시하는 데 적합합니다

:::


## dataset

**Type:** `Record[]`

:::note{title=설명}
TidyData를 준수하고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의하는 데 사용됩니다. 사용자 입력 데이터셋은 전처리가 필요 없습니다. VSeed에는 강력한 Data Reshape 기능이 포함되어 Column Chart 데이터를 자동으로 2개 차원과 1개 측정값으로 변환합니다.

:::

**예시**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `HistogramDimension[] | undefined`

:::note{title=설명}
히스토그램은 일반적으로 차원이 필요하지 않습니다

:::

**예시**
[{id: "category", alias: "카테고리"}]




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

**Type:** `"tooltip" | "label" | "row" | "column" | undefined`

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

**Type:** `HistogramMeasure[] | undefined`

:::note{title=설명}
히스토그램은 하나의 차원만 지원하며 데이터는 이산 데이터입니다

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
숫자 서식 유형. 숫자(십진수), 퍼센트(%), 퍼밀(‰), 과학적 표기법을 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식 비율, 0일 수 없습니다

:::

**예시**
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 기호, 예: %, ‰

:::

**예시**
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



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
숫자 서식의 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678 은 1235 로 변환, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 은 1234.6 로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 은 1230.568 로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 은 1234.56780 로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678 은 1000 로 변환, significantDigits:1
\- 1234.5678 은 1200 로 변환, significantDigits:2
\- 1234.5678 은 1230 로 변환, significantDigits:3
\- 1234.5678 은 1234 로 변환, significantDigits:4
\- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 은 1234.568 로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우 숫자 서식의 반올림 우선순위. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678 은 1230 로 변환, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

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
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식 기호, 예: %, ‰

:::

**예시**
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"
\- 100000은 10K로 변환, ratio:1000, symbol:"K"



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
숫자 서식의 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다

:::

**예시**
\- 1234.5678 은 1235 로 변환, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 은 1234.6 로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 은 1230.568 로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 은 1234.56780 로 변환, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 유효 자릿수. 브라우저 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하며 fractionDigits보다 우선순위가 높습니다

:::

**예시**
\- 1234.5678 은 1000 로 변환, significantDigits:1
\- 1234.5678 은 1200 로 변환, significantDigits:2
\- 1234.5678 은 1230 로 변환, significantDigits:3
\- 1234.5678 은 1234 로 변환, significantDigits:4
\- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 은 1234.568 로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
significantDigits와 fractionDigits가 모두 설정된 경우 숫자 서식의 반올림 우선순위. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingPriority와 같은 규칙을 따릅니다

:::

**예시**
\- 1234.5678 은 1230 로 변환, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "x0" | "x1" | undefined`

:::note{title=설명}
지표가 매핑되는 채널

\- value: 히스토그램의 값 채널

\- x0: 히스토그램의 x0 채널

\- x1: 히스토그램의 x1 채널

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




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}


:::


## color

**Type:** `Color | undefined`

:::note{title=설명}


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
\- 100000은 10K로 변환, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
\- 100000은 10K로 변환, ratio:1000, symbol:"K"




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
\- 1234.5678 은 1234.6 로 변환, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 은 1230.568 로 변환, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 은 1234.56780 로 변환, fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**
\- 1234.5678 은 1200 로 변환, significantDigits:2
\- 1234.5678 은 1230 로 변환, significantDigits:3
\- 1234.5678 은 1234 로 변환, significantDigits:4
\- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 은 1234.57 로 변환, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 은 1234.568 로 변환, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 은 1234.5678 로 변환, significantDigits:8 (roundingMode:halfCeil)




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}


:::

**예시**
\- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}


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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출이 1000을 초과하는 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



#### code

**Type:** `string`

:::note{title=설명}














:::

**예시**
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
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

const profitRate = item.profit / item.sales;
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






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}






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




### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}


:::

**예시**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}


:::

:::warning{title=Warning}


:::

**예시**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}


:::

**예시**




### maxSize

**Type:** `number | undefined`

:::note{title=설명}






:::

:::warning{title=Warning}


:::

**예시**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}
브러시 선택 활성화 여부

:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}








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
x축, 숫자 축 설정으로, 차트 x축의 위치, 형식, 스타일 등을 정의합니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
그리드선 타입

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
X축 animation configuration

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
자동 회전이 활성화된 경우의 각도 범위입니다(카테고리 축에만 유효).




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


\- 1234.5678은 1230.568로 변환됩니다, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}

:::

**예시**





\- 1234.5678은 1234.5678로 변환됩니다, significantDigits:8 (roundingMode:halfCeil)



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
\- 100000은 10만으로 변환, ratio:10000, symbol:"만"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 서식 접미사

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
숫자 서식 접두사

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
숫자 서식의 소수 자릿수. 브라우저 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하며 significantDigits보다 우선순위가 낮습니다

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
\- 1234.5678 은 1234.6 로 변환, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
\- 1234.5678 은 1234.5678 로 변환, significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}
숫자 서식의 반올림 모드. 브라우저 Intl.NumberFormat을 사용하며 Intl.NumberFormat의 roundingMode와 같은 규칙을 따릅니다

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
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
사용자 지정 정렬 순서이며 범주 축에 직접 적용됩니다

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}


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
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=설명}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=설명}

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
**예시**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=설명}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=설명}
코드 실행에 실패하거나 환경이 지원되지 않을 때의 fallback 방법입니다.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=설명}
\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
연산자

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=설명}
prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다

:::


## binCount

**Type:** `number | undefined`

:::note{title=설명}
히스토그램 구간 수로, 히스토그램 구간 사각형(막대)의 수를 정의합니다

:::


## binStep

**Type:** `number | undefined`

:::note{title=설명}
구간 간격으로, 구간 너비를 계산하는 데 사용되며 최종 히스토그램의 사각형(막대) 너비에도 영향을 줍니다. binCount와 binStep이 모두 설정되면 binStep이 우선합니다

:::


## binValueType

**Type:** `"count" | "percentage" | undefined`

:::note{title=설명}
히스토그램 구간 값 유형으로, 히스토그램 구간 사각형(막대)의 값 유형을 정의하며 기본값은 'count'입니다

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}




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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=설명}


막대 primitive(사각형)를 표시할지 여부






:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}






:::

**예시**
막대 primitive(사각형) 선 색상








field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**예시**

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





4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}




\- in: 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다






\- not in: 차원 필드 값이 값 목록에 포함되지 않은 데이터 항목을 선택합니다.



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
"매출이 1000을 초과하는 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



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
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
\- 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}





);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}




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


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=설명}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=설명}

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}


:::

**예시**







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=설명}




텍스트 글꼴 크기

:::

**예시**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}


:::


#### field

**Type:** `string`

:::note{title=설명}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
텍스트 세로 정렬입니다. 일반적으로 'top'으로 설정하여 텍스트가 주석 포인트 아래쪽에 표시되고 차트의 보이는 영역 안에 유지되도록 합니다.

텍스트가 차트의 보이는 영역 안에 완전히 표시되도록 'top'으로 설정하는 것을 권장합니다.

top: 텍스트가 주석 포인트 아래쪽에 있으며, 텍스트의 위쪽 가장자리가 포인트에 맞춰집니다.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
'top' Text is at the bottom of the annotation point.






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

true













'red'











배경 모서리 반경

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
배경 패딩

:::

**예시**
"매출이 1000을 초과하는 막대 강조"

"각 지역에서 이익률이 가장 높은 막대 강조"



#### code

**Type:** `string`

:::note{title=설명}
음수 값은 전체 컴포넌트를 위로 이동합니다. 예를 들어 -10은 텍스트와 배경을 10픽셀 위로 이동합니다.





**예시**







:::

**예시**

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


**예시**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
주석선의 평균을 계산합니다





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






텍스트 색상

'주석 텍스트'

:::

**예시**
'right' 텍스트는 주석 지점의 왼쪽



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
텍스트가 차트의 보이는 영역 안에 완전히 표시되도록 'top'으로 설정하는 것을 권장합니다.

top: 텍스트가 기준선 아래쪽에 있으며, 위쪽 가장자리가 (세로) 주석선의 끝에 맞춰집니다.

middle: 텍스트가 기준선 중앙에 있으며, 중심이 (세로) 주석선의 끝에 맞춰집니다.

bottom: 텍스트가 기준선 위쪽에 있으며, 아래쪽 가장자리가 (세로) 주석선의 끝에 맞춰집니다.



:::

**예시**
'top' 텍스트는 주석 지점의 아래쪽



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
'right'

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

**예시**



:::

**예시**



### offsetX

**Type:** `number | undefined`

:::note{title=설명}






:::

**예시**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
숫자 마크 라인(구간 값)으로, 세로 방향으로 표시되며 마크 라인의 위치, 스타일 등을 설정할 수 있습니다. 구간 값에 해당하는 마크 라인이 필요하면 이 설정을 사용할 수 있습니다

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
평균, 최댓값, 분위수, 비즈니스 라인 등 데이터에 따라 주석선 위치를 동적으로 결정해야 하는 시나리오에 적합합니다.

:::

**예시**
"주석선 기준값으로 최고 매출 값 가져오기"

"주석선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}






**예시**







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
prepare() 단계에서 기록되며 런타임에는 읽기 전용입니다

:::

**예시**
'주석 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
_.filter(data, item => item.year === 2024),

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
const index = Math.floor(sorted.length * 0.75);

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


텍스트 위치



주석선 레이블 위치(선에 대한 레이블의 상대 위치)입니다.



:::

**예시**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**

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


:::

**예시**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

**예시**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
텍스트가 차트의 보이는 영역 안에 완전히 표시되도록 'top'으로 설정하는 것을 권장합니다.

:::

**예시**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**예시**
center: 텍스트가 기준선 중앙에 있습니다(수평 마크 라인의 끝).



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
**예시**

:::

**예시**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=설명}
숫자 마크 라인(평균선, 최대값선, 최소값선 등)으로, 가로 방향으로 표시되며 마크 라인의 위치, 스타일 등을 설정할 수 있습니다. 구간 값에 해당하는 마크 라인을 그리려면 이 설정을 사용하십시오. 구간 값은 `binValueType`의 영향을 받습니다

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
"주석선 기준값으로 최고 매출 값 가져오기"

"주석선에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
연산자



\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다



'red'



:::

**예시**
\- not in: 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다
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

'solid'
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
center: 텍스트가 주석 영역 중앙에 있으며, 텍스트의 중심이 영역에 맞춰집니다.

:::

**예시**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
텍스트 세로 정렬입니다. 일반적으로 'top'으로 설정하여 텍스트가 주석 영역 하단에 표시되고 차트의 보이는 영역 안에 유지되도록 합니다.

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








배경색

:::

**예시**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
배경 선 색상



배경 선 색상

**예시**

**예시**

:::

**예시**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**예시**

:::

**예시**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
배경 모서리 반경

:::

**예시**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
배경 패딩

:::

**예시**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 색상



주석 영역 색상

:::

**예시**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**예시**




### lineColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**예시**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


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


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=설명}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=설명}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=설명}
**예시**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=설명}
4

:::


#### field

**Type:** `string`

:::note{title=설명}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}




주석 영역 색상

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
**예시**






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
'center' 텍스트는 주석 영역의 가운데



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}








다항 회귀 차수

:::

**예시**
'top' 텍스트는 주석 영역의 아래쪽



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




## kdeRegressionLine

**Type:** `KdeRegressionLine | KdeRegressionLine[] | undefined`

:::note{title=설명}
커널 밀도 회귀선 설정으로, 데이터의 추세와 분포를 표시하는 데 사용됩니다

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
회귀선 기능을 활성화할지 여부

:::

### color

**Type:** `string | undefined`

:::note{title=설명}
회귀선 색상

회귀선 색상을 설정합니다. 설정하지 않으면 기본적으로 차트의 주 색상을 사용합니다

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

회귀선 너비를 픽셀 단위로 설정하며, 기본값은 1입니다

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

회귀선 스타일을 설정합니다. 예: 실선, 점선 등. 기본값은 실선입니다

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 레이블 텍스트

회귀선의 레이블 텍스트를 설정합니다. 빈 문자열은 레이블을 표시하지 않음을 의미합니다

:::

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




## ecdfRegressionLine

**Type:** `EcdfRegressionLine | EcdfRegressionLine[] | undefined`

:::note{title=설명}
경험적 누적 분포 함수 회귀선 설정으로, 데이터의 누적 분포를 표시하는 데 사용됩니다

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

회귀선 색상을 설정합니다. 설정하지 않으면 기본적으로 차트의 주 색상을 사용합니다

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
회귀선 너비

회귀선 너비를 픽셀 단위로 설정하며, 기본값은 1입니다

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=설명}
회귀선 스타일

회귀선 스타일을 설정합니다. 예: 실선, 점선 등. 기본값은 실선입니다

:::

### text

**Type:** `string | undefined`

:::note{title=설명}
회귀선 레이블 텍스트

회귀선의 레이블 텍스트를 설정합니다. 빈 문자열은 레이블을 표시하지 않음을 의미합니다

:::

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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=설명}
차트에서 피벗 기능 또는 지표 조합을 활성화했을 때 차원 연동 기능을 활성화할지 여부

특정 차원 값에 hover하면 다른 차트의 동일한 차원 값 데이터도 연동되어 강조 표시됩니다



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
차트 언어 설정입니다. 'zh\-CN'과 'en\-US' 두 언어를 지원하며, intl.setLocale('zh\-CN') 메서드를 호출해 언어를 설정할 수도 있습니다

:::

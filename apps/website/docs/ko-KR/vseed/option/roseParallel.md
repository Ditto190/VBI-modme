# RoseParallel

:::info{title=권장}
\- Recommended field configuration: `1` measure(s), `1` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=인코딩 매핑}
그룹형 로즈 차트는 다음 시각 채널을 지원합니다:

`angle`  : angle channel, supports`multiple dimensions`, maps dimension values to the angular axis

`radius` : radius channel, supports`multiple measures`, maps measure values to the radius axis

`detail` : detail channel, supports`multiple dimensions`, used to display more granular data within the same color series

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=설명}
그룹형 로즈 차트. 극좌표계에서 부채꼴 호와 반지름으로 데이터 크기를 표시하며 다차원 데이터 비교에 적합합니다

Applicable scenarios:

\- Distribution comparison of multi-dimensional data

\- Comparison of strength in periodic data

\- Concurrent display of numerical values and proportions for categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 numerical field

\- The first dimension is placed on the angular axis; other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legend, polar coordinate system, data labels, tooltips, and numerical scaling are enabled by default

:::


## chartType

**Type:** `"roseParallel"`

:::note{title=설명}
그룹형 로즈 차트



그룹형 로즈 차트. 극좌표계로 다차원 데이터 비교 관계를 표시합니다

:::

**Example**
'roseParallel'




## dataset

**Type:** `Record[]`

:::note{title=설명}
Dataset



An aggregated dataset that follows TidyData specifications, used to define the chart's data source and structure. User-input datasets do not require any manual processing; VSeed features a powerful data reshaping function that automatically transforms the data. Rose Chart data is eventually converted into 2 dimensions and 1 measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=설명}
Dimensions



The first dimension of the Rose Chart is mapped to the angular axis; other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=설명}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=설명}
Dimension date format configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=설명}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=설명}
Channel to which the dimension is mapped

\- angle: supports mapping multiple dimensions to the angle channel

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=설명}
Measures



Measures in the Rose Chart are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions to be displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=설명}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=설명}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
Automatic number formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation

For example:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=설명}
Channel to which the measure is mapped

\- radius: measure mapped to the radius channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=설명}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::


## page

**Type:** `Page | undefined`

:::note{title=설명}
Pagination configuration, used to specify the field name for pagination; must be a dimension

:::


### field

**Type:** `string`

:::note{title=설명}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=설명}
Current pagination value; specifies the value used to determine the current page

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
Chart background color



Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
Color



Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
Color mapping used to map data values to specific colors

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=설명}
Positive/negative color configuration; defines the color for negative values in the chart

:::


## label

**Type:** `PieLabel | undefined`

:::note{title=설명}
Label



Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=설명}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the label font color automatically inverts based on the graphical element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
Label filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=설명}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
Dynamic filter (AI-generated code execution)



Core capabilities:



\- Use built-in utility functions for data manipulation

\- Secure execution in the browser environment (Web Worker sandbox)



Environmental requirements: Supports browser environments only; Node.js environments will use fallback



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority



Chart dynamic filter configuration



Chart dynamic filter configuration





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=설명}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
}));
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return _.flatten(
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

return _.flatten(
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
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=설명}
Label layout mode, only effective for pie and donut charts when `labelPosition` is `outside`







:::


## legend

**Type:** `Legend | undefined`

:::note{title=설명}






:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=설명}


:::

:::warning{title=Warning}


:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=설명}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=설명}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=설명}
Disabled pager icon color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}


:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}


:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}


:::

:::warning{title=Warning}


:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}


:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=설명}
Maximum columns or rows when there are many legend items





:::

:::warning{title=Warning}


:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=설명}






:::


### enable

**Type:** `false | true`

:::note{title=설명}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
Chart brush configuration









:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether brush selection is enabled

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=설명}
\- `polygon`: Polygonal selection, allowing selection by drawing an arbitrary polygon through multiple points



\- `y`: Y-axis selection, restricting selection to the Y-axis direction while the X-axis remains unconstrained

\- `rect`: rectangular brush selection, available in both X-axis and Y-axis directions

\- `polygon`: polygon brush selection, draws an arbitrary polygon by clicking multiple points


\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



Defines the brush selection mode


\- `multiple`: multiple selection mode; multiple brush areas can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=설명}
Whether to clear the brush area after selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
Opacity



Opacity of selected data points, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
Opacity



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


:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=설명}
Animation configuration



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether pie/donut/rose animation is enabled

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=설명}
Pie/donut/rose animation parameters

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=설명}
Pie/donut/rose appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=설명}
Pie/donut/rose appear effects, supporting radial and scale animations

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

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=설명}
Pie/donut/rose update animation configuration

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=설명}
Pie/donut/rose update effects, supporting radial animation

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

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=설명}
Pie/donut/rose loop animation configuration

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

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=설명}
Pie/donut/rose loop animation configuration

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=설명}
Pie/donut/rose loop effect

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

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=설명}
Pie/donut/rose atmosphere animation configuration

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


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Theme



light와 dark 두 가지 내장 테마가 있습니다. 새 테마는 registerTheme을 통해 사용자 정의할 수 있습니다.

:::

**Example**
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
Language



차트 언어 설정입니다. 'zh\-CN'과 'en\-US' 두 언어를 지원하며, intl.setLocale('zh\-CN')을 호출해 언어를 설정할 수도 있습니다

:::


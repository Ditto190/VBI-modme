# AreaPercent

:::info{title=권장}
\- Recommended field configuration: `1` measure and `2` dimensions

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=인코딩 매핑}
The Percent Area Chart supports the following visual channels:

`xAxis`  : X-axis channel, supports `multiple dimensions`, mapped to the X-axis by dimension value

`yAxis`  : Y-axis channel, supports `multiple measures`, mapped to the Y-axis by measure value

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=설명}
Percent Area Chart, suitable for showing trends of multiple category proportions over time, with the Y-axis displaying proportional relationships in percentage format.

Applicable scenarios:

\- Compositional change analysis of time series

\- Comparative analysis of proportional trends among multiple categories

\- Simultaneous display of cumulative and single category proportions

:::

:::warning{title=Warning}
Data requirements:

\- At least one measure field

\- The first dimension(s) will be placed on the Y-axis; the remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legends, axes, percentage labels, tooltips, and proportion calculations are enabled by default.

:::


## chartType

**Type:** `"areaPercent"`

:::note{title=설명}
Percent Area Chart



Percent Area Chart, showing the change in proportions of multiple categories over a specific dimension in percentage format.

:::

**Example**
'areaPercent'




## dataset

**Type:** `Record[]`

:::note{title=설명}
Dataset



A TidyData-compliant, pre-aggregated dataset defining the chart's data source and structure. Users do not need to manually process input data — VSeed's powerful Data Reshape capability handles it automatically. Percent Area Chart data is ultimately reshaped to 2 dimensions and 1 measure.

:::

**Example**
[{month:'Jan', category:'A', value:30}, {month:'Jan', category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=설명}
Dimensions



The first dimension is mapped to the X-axis; remaining dimensions are merged with measure names when multiple measures exist and shown as legend items.

:::

**Example**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=설명}
Channel to which the dimension is mapped

\- xAxis: 여러 디멘션을 x축에 매핑할 수 있습니다

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=설명}
Measures



Percent Area Chart measures are automatically merged into one measure, mapped to the Y-axis. Measure names are merged with the remaining dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Numerical Ratio', format: 'percent'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=설명}
Channel to which the measure is mapped

\- yAxis: 메저를 y축에 매핑합니다

\- detail: Measure mapped to the detail channel

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
Pagination



Pagination configuration for chart pagination

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

**Type:** `Label | undefined`

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
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Type:** `string`



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
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=설명}
Plot area padding



Maps to VChart region[0].padding, reserving space for elements extending outside the plot area such as annotations and labels.

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

**Type:** `"single" | "multiple" | undefined`

\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



Defines the brush selection mode

**Type:** `boolean | undefined`

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

**Type:** `LineAreaAnimation | undefined`

:::note{title=설명}
Animation configuration



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether line/area chart animation is enabled

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=설명}
Line/area chart animation parameters

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=설명}
Line/area chart appear animation configuration

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=설명}
Line/area chart appear effects, supporting load and grow animations

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

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=설명}
Line/area chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=설명}
Line/area chart update effects, supporting grow animation

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

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=설명}
Line/area chart loop animation configuration

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

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=설명}
Line/area chart loop animation configuration

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=설명}
Line/area chart loop effect

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
Line/area chart atmosphere animation configuration

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

**Type:** `XBandAxis | undefined`

:::note{title=설명}
X축



Category axis. X-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=설명}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=설명}
**Type:** `CrosshairRect | undefined`

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=설명}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=설명}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

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
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Label font weight

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
**Type:** `"asc" | "desc" | undefined`

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
**Type:** `string | undefined`

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
**Type:** `Selector | Selectors | undefined`

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
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

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
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Label font weight

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
**Type:** `"asc" | "desc" | undefined`

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
**Type:** `string | undefined`

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
**Type:** `Selector | Selectors | undefined`

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
십자선을 표시할지 여부

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 라벨 배경색

:::


## sort

**Type:** `Sort | undefined`

:::note{title=설명}
X-axis sort configuration, supporting sorting by dimension or measure and custom order





:::

**Example**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
\- `__row_index`는 원본 데이터 항목의 행 번호를 나타내고, `field`는 강조할 필드를 나타냅니다.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=설명}
Legend sort configuration, supporting sorting by dimension or measure and custom order



차트 동적 필터 설정: AI 생성 JavaScript 코드로 차트 마크(막대, 포인트 등)를 필터링합니다.

:::

**Example**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Theme



내장 테마는 light 와 dark 두 가지입니다. 새 테마는 registerTheme 로 등록할 수 있습니다.

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

:::note{title=설명}
포인트 마크 스타일



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
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

:::note{title=설명}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Type:** `string`



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
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=설명}
라인 마크 스타일



Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
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

:::note{title=설명}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Type:** `string`



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
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=설명}




Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

데이터 필터

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
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

:::note{title=설명}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

**Type:** `string`



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
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the area mark is visible



Whether the area mark is visible

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


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation point to ensure it stays within the visible area of the chart.



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}


:::


#### field

**Type:** `string`

:::note{title=설명}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### measureId

**Type:** `string | undefined`

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

**Type:** `string`



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
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

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

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**Example**
'마크 텍스트'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}




텍스트 글꼴 크기입니다.

**Type:** `string | string[] | undefined`

**예시**

:::

**Example**
'right' 텍스트가 마크 포인트의 왼쪽에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**









:::

**Example**
'top' 텍스트가 마크 포인트의 아래쪽에 표시됩니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**Example**
4



### offsetY

**Type:** `number | undefined`

:::note{title=설명}




배경을 표시할지 여부입니다.

:::

**Example**
true



### offsetX

**Type:** `number | undefined`

:::note{title=설명}
배경색입니다.

**Type:** `number | undefined`

**예시**

:::

**Example**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
Dimension value annotation line, displayed vertically, with configurable position and style

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted





**Type:** `boolean | undefined`

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**

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

**Example**
'마크 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.

텍스트 색상입니다.

**Type:** `number | undefined`

**예시**

:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.









:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**Example**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**Example**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=설명}
Numeric annotation line, including average, maximum, and minimum lines. Displayed horizontally and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as average lines.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted





**Type:** `boolean | undefined`

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**

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

**Example**
'마크 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
2





:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.



**예시**



:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.



배경 선 색상

**예시**



:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**Example**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}






:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**Example**
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
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**Example**
'마크 텍스트'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=설명}
2

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
다항 회귀선 구성입니다. 다항식 차수, 회귀선 스타일 등을 포함합니다.

'center'로 설정하는 것을 권장합니다. 이렇게 하면 텍스트가 마크 영역의 중앙에 표시됩니다







:::

**Example**
'center' 텍스트가 마크 영역의 중앙에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}








다항 회귀 차수

:::

**Example**
'top' 텍스트가 마크 영역의 아래쪽에 표시됩니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상



텍스트 색상

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**Example**
4



### areaColor

**Type:** `string | undefined`

:::note{title=설명}
마크 영역 색상

:::

**Example**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=설명}


:::

**Example**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=설명}


:::

**Example**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=설명}


:::

**Example**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=설명}


:::

**Example**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=설명}


:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=설명}
마크 영역의 여백

:::

**Example**
0




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

**Type:** `Locale | undefined`

:::note{title=설명}
Language



차트 언어 설정입니다. 'zh-CN' 과 'en-US' 를 지원하며, intl.setLocale('zh-CN') 을 호출해 언어를 설정할 수도 있습니다

:::


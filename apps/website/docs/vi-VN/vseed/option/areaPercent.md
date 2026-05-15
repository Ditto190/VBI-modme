# AreaPercent

:::info{title=Khuyen nghi}
\- Recommended field configuration: `1` measure and `2` dimensions

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Anh xa ma hoa}
The Percent Area Chart supports the following visual channels:

`xAxis`  : X-axis channel, supports `multiple dimensions`, mapped to the X-axis by dimension value

`yAxis`  : Y-axis channel, supports `multiple measures`, mapped to the Y-axis by measure value

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Percent Area Chart



Percent Area Chart, showing the change in proportions of multiple categories over a specific dimension in percentage format.

:::

**Example**
'areaPercent'




## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Dataset



A TidyData-compliant, pre-aggregated dataset defining the chart's data source and structure. Users do not need to manually process input data — VSeed's powerful Data Reshape capability handles it automatically. Percent Area Chart data is ultimately reshaped to 2 dimensions and 1 measure.

:::

**Example**
[{month:'Jan', category:'A', value:30}, {month:'Jan', category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Mo ta}
Dimensions



The first dimension is mapped to the X-axis; remaining dimensions are merged with measure names when multiple measures exist and shown as legend items.

:::

**Example**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




### id

**Type:** `string`

:::note{title=Mo ta}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mo ta}
Dimension date format configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mo ta}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mo ta}
Channel to which the dimension is mapped

\- xAxis: hỗ trợ ánh xạ nhiều chiều tới trục x

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Mo ta}
Measures



Percent Area Chart measures are automatically merged into one measure, mapped to the Y-axis. Measure names are merged with the remaining dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Numerical Ratio', format: 'percent'}]




### id

**Type:** `string`

:::note{title=Mo ta}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Mo ta}
Channel to which the measure is mapped

\- yAxis: chỉ số được ánh xạ tới trục y

\- detail: Measure mapped to the detail channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mo ta}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::


## page

**Type:** `Page | undefined`

:::note{title=Mo ta}
Pagination



Pagination configuration for chart pagination

:::


### field

**Type:** `string`

:::note{title=Mo ta}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=Mo ta}
Current pagination value; specifies the value used to determine the current page

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mo ta}
Chart background color



Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Mo ta}
Color



Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mo ta}
Color mapping used to map data values to specific colors

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Positive/negative color configuration; defines the color for negative values in the chart

:::


## label

**Type:** `Label | undefined`

:::note{title=Mo ta}
Label



Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the label font color automatically inverts based on the graphical element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
Label filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Example**
"Highlight data items with sales greater than 1000"

**Type:** `string`



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Mo ta}






:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Disabled pager icon color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}


:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mo ta}


:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Maximum columns or rows when there are many legend items





:::

:::warning{title=Warning}


:::

**Example**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}






:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Chart brush configuration









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether brush selection is enabled

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mo ta}
\- `polygon`: Polygonal selection, allowing selection by drawing an arbitrary polygon through multiple points



\- `y`: Y-axis selection, restricting selection to the Y-axis direction while the X-axis remains unconstrained

\- `rect`: rectangular brush selection, available in both X-axis and Y-axis directions

\- `polygon`: polygon brush selection, draws an arbitrary polygon by clicking multiple points

**Type:** `"single" | "multiple" | undefined`

\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mo ta}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



Defines the brush selection mode

**Type:** `boolean | undefined`

\- `multiple`: multiple selection mode; multiple brush areas can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to clear the brush area after selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Opacity



Opacity of selected data points, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Opacity



Opacity of unselected data points, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::


## animation

**Type:** `LineAreaAnimation | undefined`

:::note{title=Mo ta}
Animation configuration



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether line/area chart animation is enabled

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=Mo ta}
Line/area chart animation parameters

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=Mo ta}
Line/area chart appear animation configuration

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=Mo ta}
Line/area chart appear effects, supporting load and grow animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

#### update

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=Mo ta}
Line/area chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mo ta}
Line/area chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=Mo ta}
Line/area chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mo ta}
Loop animation interval, in milliseconds

:::

##### loop

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=Mo ta}
Line/area chart loop animation configuration

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=Mo ta}
Line/area chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mo ta}
Line/area chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mo ta}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Mo ta}
Truc X



Category axis. X-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Mo ta}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `CrosshairRect | undefined`

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Mo ta}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mo ta}
Truc Y



Numeric axis. Y-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Mo ta}
Duong goi y doc



Vertical guide line shown when the mouse moves over the chart



Cau hinh duong crosshair, la loai cau hinh de hien thi duong crosshair (duong goi y) trong bieu do

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi duong crosshair hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nhan duong crosshair

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi duong crosshair hay khong

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nen nhan duong crosshair

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
])

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, còn `field` biểu thị trường cần làm nổi bật.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mo ta}
Legend sort configuration, supporting sorting by dimension or measure and custom order



Cấu hình bộ lọc động của biểu đồ: lọc các mark của biểu đồ (thanh, điểm, v.v.) bằng mã JavaScript do AI tạo.

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

:::note{title=Mo ta}
])

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Theme



Cac theme tich hop gom light va dark. Co the dang ky theme moi voi registerTheme.

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

:::note{title=Mo ta}
Kieu mark diem



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.



**Type:** `string | undefined`



:::

**Example**
Màu nét primitive cột (hình chữ nhật)
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

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Example**
"Highlight data items with sales greater than 1000"

**Type:** `string`



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Diem co hien thi hay khong

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Kich thuoc diem



Kich thuoc diem

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau dau diem



Mau dau diem

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot mau dau diem



Do trong suot mau dau diem

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau vien dau diem



Mau vien dau diem

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong vien dau diem



Do rong vien dau diem

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Kieu vien dau diem



Kieu vien dau diem

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Mo ta}
Kieu mark duong



Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.



**Type:** `string | undefined`



:::

**Example**
Màu nét primitive cột (hình chữ nhật)
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

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Example**
"Highlight data items with sales greater than 1000"

**Type:** `string`



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Doan duong co hien thi hay khong

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Doan duong co duoc lam muot hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau doan duong

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot mau doan duong

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong doan duong

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Kieu doan duong

:::

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Mo ta}




Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.



**Type:** `string | undefined`



:::

**Example**
Màu nét primitive cột (hình chữ nhật)
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

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Example**
"Highlight data items with sales greater than 1000"

**Type:** `string`



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Area mark color opacity



Area mark color opacity

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mo ta}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation point to ensure it stays within the visible area of the chart.



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}


:::


#### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### measureId

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Example**
"Highlight data items with sales greater than 1000"

**Type:** `string`



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
'Văn bản đánh dấu'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}




Cỡ chữ văn bản.

**Type:** `string | string[] | undefined`

**Ví dụ**

:::

**Example**
'right' Văn bản nằm bên trái điểm đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
**Ví dụ**









:::

**Example**
'top' Văn bản nằm phía dưới điểm đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Example**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Mo ta}




Nền có hiển thị hay không.

:::

**Example**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Màu nền.

**Type:** `number | undefined`

**Ví dụ**

:::

**Example**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mo ta}
Dimension value annotation line, displayed vertically, with configurable position and style

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Example**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.

Màu văn bản.

**Type:** `number | undefined`

**Ví dụ**

:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.









:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Example**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Example**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mo ta}
Numeric annotation line, including average, maximum, and minimum lines. Displayed horizontally and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as average lines.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Example**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
2





:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.



**Ví dụ**



:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.



màu nét nền

**Ví dụ**



:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Example**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Example**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mo ta}
Kiểu gạch của viền vùng chú thích.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mo ta}
Vung chu thich



Annotation region configuration. Defines chart annotation regions based on selected data, including position, style, and related settings.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mo ta}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các measure được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
**Type:** `"in" | "not in" | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
same as operator

\- in: Select data items whose dimension field value is within the specified value

**Type:** `"in" | "not in" | undefined`

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
'Văn bản đánh dấu'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mo ta}
2

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Nên đặt thành 'center' để đảm bảo văn bản nằm ở giữa vùng đánh dấu







:::

**Example**
'center' Văn bản nằm ở giữa vùng đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}








Bậc của hồi quy đa thức

:::

**Example**
'top' Văn bản nằm phía dưới vùng đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản



Màu văn bản

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Example**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu vùng đánh dấu

:::

**Example**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Example**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Example**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Example**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Example**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}


:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Lề của vùng đánh dấu

:::

**Example**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mo ta}
Whether to enable dimension linkage when pivot or measure grouping is enabled on the chart

When hovering over a dimension value, highlight data with the same dimension value in other charts



Cấu hình liên kết chiều của biểu đồ pivot

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Có bật liên kết chiều của biểu đồ pivot hay không

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có hiển thị thông tin Tooltip của các biểu đồ con tương ứng với tất cả các chiều hay không

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Mo ta}
Language



Cau hinh ngon ngu bieu do, ho tro 'zh-CN' va 'en-US'. Ngoai ra co the goi intl.setLocale('zh-CN') de dat ngon ngu

:::


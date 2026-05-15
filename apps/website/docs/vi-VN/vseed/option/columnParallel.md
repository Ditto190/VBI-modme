# ColumnParallel

:::info{title=Khuyen nghi}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Anh xa ma hoa}
Parallel column charts support the following visual channels:

`xAxis`  : x-axis channel, supports`multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`  : y-axis channel, supports`multiple measures`, mapped to the y-axis by measure value

`detail` : subdivision channel, supports`multiple dimensions`, used for displaying data at a finer granularity within the same color series

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Mo ta}
Bar Chart, suitable for parallel comparison scenarios of multiple measures, where multiple bars are displayed side-by-side to show different measure values

Applicable scenarios:

\- Parallel comparison of multiple measures under the same dimension

\- Horizontal comparison of multi-dimensional data

\- Correlation analysis between measures

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure field

\- The first dimension will be placed on the X-axis; the remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legend, axes, data labels, tooltips, and measure sorting are enabled by default

:::


## chartType

**Type:** `"columnParallel"`

:::note{title=Mo ta}
Bar Chart, suitable for parallel comparison scenarios of multiple measures

:::

**Example**
'columnParallel'




## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Dataset: A dataset that conforms to the TidyData specification and has been aggregated, used to define the chart's data source and structure. User input does not require any processing; VSeed features powerful data reshaping capabilities that handle the transformation automatically. The final data for the Bar Chart will be converted into 2 dimension(s) and 1 measure(s).

:::

**Example**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Mo ta}
Dimensions, The first dimension is mapped to the X-axis; the remaining dimensions are merged with measure names (when multiple measures exist) and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'category'}]




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

\- xAxis: supports mapping multiple dimensions to the x-axis

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
Measures: All measures in the Bar Chart are automatically merged into a single measure and mapped to the Y-axis. When multiple measures exist, the measure names are merged with the remaining dimensions and displayed as legend items.

:::

**Example**
[{id: 'value1', alias: 'measure1'}, {id: 'value2', alias: 'measure2'}]




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

\- locale='zh-CN': 749740.264 -> 744.5K

\- locale=en-US: 749740.264 → 744.5K

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

\- yAxis: measure mapped to the y-axis

\- detail: measure mapped to the detail channel

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
Pagination configuration, used to specify the field name for pagination, which must be a dimension

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
Chart background color, Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Mo ta}
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
 'sales': 'blue',
}
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
Whether labels automatically invert font color based on the color of graphic elements

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether label collision avoidance is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
Label filtering; the default relationship between selectors is "Or"

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
Animated filter (AI-generated code execution)



Implements complex data filtering logic using AI-generated JavaScript code



Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)



Environment requirements: Only supports browser environments; fallback will be used in Node.js environments



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority



Chart animated filter configuration



Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Mo ta}
AI-generated JavaScript filtering code



\- Can only use built-in utility functions (access via _ or R)

\- Input parameters: data (array), where each item contains a __row_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ __row_index: number, field: string }>

\- __row_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region
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

Highlight data items filtered by multiple conditions
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
Fallback solution when code execution fails or the environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
Animated filtering execution result (runtime field)



Written during the prepare() phase, read-only at runtime

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
Legend configuration, used to define the chart's legend, including its position, format, style, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether legend functionality is enabled

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the legend border is enabled

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
Legend font weight



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
legendfontColor

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Pagination icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Pagination icon disabled color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Legend font size

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}
legendfontColor

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Legend font weight

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}
Legend shape

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mo ta}
Legend position

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Maximum number of columns or rows when there are many legends

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
Brush mode; defines whether single or multiple areas can be selected.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mo ta}
Tooltip configuration, used to define the chart's tooltips, including their position, format, style, etc.



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

:::note{title=Mo ta}
Có bật chọn brush hay không

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Whether tooltip is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Defines the shape and orientation of the brush selection box



\- `polygon`: Polygonal selection, allowing the drawing of arbitrary polygons by clicking multiple points



\- `y`: Y-axis selection, restricts selection to the Y-axis direction

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Define the style of data points that are selected.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mo ta}
brushtype



Opacity

Opacity of the selected data points, ranging from 0 to 1

\- `polygon`: polygon brush selection; click multiple points to draw any polygon for selection

\- `x`: brush selection in the X-axis direction only; the Y-axis direction is unrestricted

Whether the axis is visible.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mo ta}
Độ mờ of selected data points, range 0-1



Style for unselected data items

Defines the style of data points outside the selected brush area

\- `multiple`: multiple selection mode; multiple brush regions can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to clear the brush region after brushing ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
Opacity of unselected data points, ranging from 0 to 1



Defines the style of brushed data points

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Style for unselected data items



Defines the style of data points outside the brush selection

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.



Defines the style of data points outside the brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Style for unselected data items



Opacity of data points outside the brush selection, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Stroke width

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Mo ta}
Khoảng tự động ẩn nhãn trục; nếu khoảng cách giữa hai nhãn văn bản nhỏ hơn autoHideGap, nhãn chồng lấn sẽ tự động bị ẩn. Chỉ hiệu lực với trục phân loại.



Khi autoHide bị tắt, dùng sampling được cấu hình trên minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether bar/column chart animation is enabled

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Mo ta}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Mo ta}
Whether to display the axis in reverse; applies only to numeric axes.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mo ta}
**Example**

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Tick size

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Label rotation angle

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0.

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Mo ta}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Mo ta}
**Example**

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Tick size

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Label rotation angle

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0.

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Mo ta}
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Tick size

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 1234.5678 converted to 1230, significantDigits:3

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Mo ta}
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Mo ta}
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Tick size

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Label rotation angle

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Number format ratio, cannot be 0.

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mo ta}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mo ta}
Atmosphere animation effect; supports ripple, fade, and breathe

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Mo ta}
X-axis category-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Axis line color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Trục X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Mo ta}
order: 'asc'

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Mo ta}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Trục Y, trục số, cấu hình trục Y; định nghĩa trục Y của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Mo ta}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Mo ta}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}
Crosshair rectangle area label color

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh, được áp dụng trực tiếp cho trục phân loại

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
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sorting field, can be a dimension ID or measure ID

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Tiền tố định dạng số

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Nhãn vạch trục X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Select data items where the dimension field value is not within the `value` array.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}
X-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mo ta}
Y-axis numeric-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Axis line color

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Y-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to use a logarithmic axis; only applies to numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation easing function.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Y-axis (categorical axis) configuration used to define the Y-axis, including position, format, style, etc.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Trục X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to automatically format numeric-axis tick labels. Only applies to numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}
Number formatting for numeric axes. Only applies to numeric axes and has lower priority than autoFormat.

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
Crosshair rectangle area label color

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh, được áp dụng trực tiếp cho trục phân loại

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
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sorting field, can be a dimension ID or measure ID

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Tiền tố định dạng số

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Nhãn vạch trục X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Select data items where the dimension field value is not within the `value` array.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}
Supports global style or conditional style configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mo ta}
selector = ["tool", "book"]



Local data selector

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mo ta}
operator: '>=',

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Toán tử

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to show the crosshair rectangular-area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mo ta}
Column chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Distance between columns in the same category. It can be a pixel value or a percentage string.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mo ta}
X-axis sort configuration. Supports sorting by dimensions or measures and custom sort order.



Selector for the annotation point, used to pick data items.

:::

**Example**
Dimension field ID (the `id` of an item in `dimensions`).
\- Uses built-in utility functions for data manipulation
field: 'sales'
}
Dimension field ID (the `id` of an item in `dimensions`).
Toán tử
}

const grouped = _.groupBy(data, 'area');
"Highlight the bar with the highest profit rate in each region"
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mo ta}
])

:::

**Example**
return _.flatten(



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}
Mã JavaScript lọc do AI tạo

:::

**Example**
"Highlight the bar with the highest profit rate in each region"
Fallback solution when code execution fails or the environment is not supported



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
Suitable for scenarios complex for static selectors, such as Top N, statistical analysis, or complex combined conditions.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mo ta}
Environment requirements: Only supported in browser environments; Node.js environments will use the fallback.



Chart dynamic filter configuration: filters chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::

**Example**
return _.map(filtered, item => ({
\- Uses built-in utility functions for data manipulation
field: 'sales'
}
return _.map(filtered, item => ({
Toán tử
}

const grouped = _.groupBy(data, 'area');
"Highlight the bar with the highest profit rate in each region"
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mo ta}
])

:::

**Example**
return _.flatten(



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}
Mã JavaScript lọc do AI tạo

:::

**Example**
"Highlight the bar with the highest profit rate in each region"
Fallback solution when code execution fails or the environment is not supported



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Operator



\- not in: Select data items where the dimension field value is not in "value"



_.map(maxItems, item => [

:::

**Example**
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mo ta}
Rectangle mark style. Parallel column chart style configuration used to define column color, border, corner radius, and related settings.

Primitive cột (hình chữ nhật) có hiển thị hay không

- in: Select data items where the dimension field value is within the `value` array.

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Select data items where the dimension field value is not within the `value` array.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**Example**
Màu nét primitive cột (hình chữ nhật)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
Bar element (rectangular element) color
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
Bar element (rectangular element) color opacity
field: 'category',
operator: 'in',
value: 'tool'
}
Bar element (rectangular element) color opacity
field: 'category',
operator: 'not in',
value: 'book'
}

**Ví dụ**
Bar element (rectangular element) color opacity
field: 'profit',
operator: '>=',
value: 100
}
Bar element (rectangular element) color opacity
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
Animated filter (AI-generated code execution)



Implements complex data filtering logic using AI-generated JavaScript code

true



Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)



Environment requirements: Only supports browser environments; fallback will be used in Node.js environments



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority



Chart animated filter configuration



Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Mo ta}
AI-generated JavaScript filtering code



\- Can only use built-in utility functions (access via _ or R)

\- Input parameters: data (array), where each item contains a __row_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ __row_index: number, field: string }>

\- __row_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region
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

Highlight data items filtered by multiple conditions
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
Fallback solution when code execution fails or the environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
Animated filtering execution result (runtime field)



Written during the prepare() phase, read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the column mark (rectangle mark) is visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- not in: Select data items where the dimension field value is not in "value"

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Operator

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Border color of the column mark (rectangle mark)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
'Annotation Text'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Fallback plan when code execution fails or the environment is not supported.

:::

**Example**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**



Kích thước chữ văn bản

:::

**Example**
**Example**

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mo ta}
Annotation point



**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
Text color.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### measureId

**Type:** `string | undefined`

:::note{title=Mo ta}
**Example**

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
Animated filter (AI-generated code execution)



Implements complex data filtering logic using AI-generated JavaScript code

true



Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)



Environment requirements: Only supports browser environments; fallback will be used in Node.js environments



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority



Chart animated filter configuration



Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Mo ta}
AI-generated JavaScript filtering code



\- Can only use built-in utility functions (access via _ or R)

\- Input parameters: data (array), where each item contains a __row_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ __row_index: number, field: string }>

\- __row_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region
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

Highlight data items filtered by multiple conditions
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
Fallback solution when code execution fails or the environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
Animated filtering execution result (runtime field)



Written during the prepare() phase, read-only at runtime

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
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Example**
Get quantile as the mark line



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
const currentYearTotal = _.sumBy(

:::

**Example**
**Example**



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
**Example**

Recommended value is 'right', which keeps the text on the left side of the annotation point.

Text font size.

Màu văn bản

'Annotation Text'

:::

**Example**
'Annotation text'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
'outsideEnd'

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

middle: Văn bản được căn giữa trên đường tham chiếu; tâm căn với điểm cuối của đường chú thích (dọc).

bottom: Văn bản nằm ở đỉnh đường tham chiếu; mép dưới căn với điểm cuối của đường chú thích (dọc).

'right'

:::

**Example**
**Example**



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
bán kính bo góc nền

:::

**Example**
**Example**



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
padding nền

:::

**Example**
**Example**



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
'right'

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### offsetY

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

**Ví dụ**

Whether the background is visible.

:::

**Example**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Background color.

A negative value moves the whole component left. For example, -10 moves the whole annotation point, including text and text background, left by 10 pixels.

2

:::

**Example**
offsetX: 5, moves the whole annotation point right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mo ta}
Dimension-value annotation line, displayed vertically. It can configure the annotation line position, style, and related settings.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
Animated filter (AI-generated code execution)



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language)

:::

**Example**
Line visible

Background border width



#### code

**Type:** `string`

:::note{title=Mo ta}
AI-generated JavaScript filtering code



\- Can only use built-in utility functions (access via _ or R)

**Ví dụ**

'red'

4

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Line width
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

**Example**
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Calculate target value based on conditions
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

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
Animated filtering execution result (runtime field)



Written during the prepare() phase, read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Example**
Get quantile as the mark line



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
\- Can only use built-in utility functions (access via _ or R)

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
const currentYearTotal = _.sumBy(

:::

**Example**
**Example**



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
12

Vị trí văn bản

Text color.

Vị trí nhãn đường chú thích (vị trí tương đối của nhãn so với đường).

**Example**

:::

**Example**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
màu nét nền

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

- center: Text is centered in the annotation area.

'Annotation Text'

'center' (text is in the middle of the annotation area)

:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Background visibility.

:::

**Example**
**Example**



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**Example**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

:::

**Example**
**Example**



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
bán kính bo góc nền

:::

**Example**
**Example**



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
padding nền

:::

**Example**
**Example**



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
'right'

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mo ta}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}
**Example**

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
Animated filter (AI-generated code execution)



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language)

:::

**Example**
Line visible

Background border width



#### code

**Type:** `string`

:::note{title=Mo ta}
AI-generated JavaScript filtering code



\- Can only use built-in utility functions (access via _ or R)

**Ví dụ**

'red'

4

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Line width
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

**Example**
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Calculate target value based on conditions
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

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
Animated filtering execution result (runtime field)



Written during the prepare() phase, read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Example**
Get quantile as the mark line



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
**Ví dụ**



Label position of the annotation line, relative to the line.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
const currentYearTotal = _.sumBy(

:::

**Example**
**Example**



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
12

Vị trí văn bản

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

'top'

màu nền

:::

**Example**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
màu nét nền

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

màu nét nền

**Example**

**Ví dụ**

:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
bán kính bo góc nền

:::

**Example**
**Example**



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
padding nền

:::

**Example**
**Example**



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
'right'



'right'

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Example**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Background visibility.

:::

**Example**
**Example**



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**Example**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

:::

**Example**
**Example**



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mo ta}
Line dash style of the annotation area border.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Primary color for the part greater than the annotation value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Example**

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mo ta}
Mark area border color



**Example**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mo ta}
Mark area border width

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Example**
Get quantile as the mark line



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
const currentYearTotal = _.sumBy(

:::

**Example**
**Example**



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Fallback solution when code execution fails or the environment is not supported

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Recommended value is 'center', which keeps the text in the middle of the annotation area.

right: text is on the left side of the annotation area; the right edge of the text aligns with the annotation area

left: text is on the right side of the annotation area; the left edge of the text aligns with the annotation area

center: text is centered in the annotation area; the center of the text aligns with the annotation area

:::

**Example**
'center': text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
Text vertical alignment. Generally set it to top so text appears at the bottom of the annotation area and remains inside the visible chart area.

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Bậc của hồi quy đa thức

:::

**Example**
'top': text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
bán kính bo góc nền

:::

**Example**
**Example**



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
padding nền



padding nền

:::

**Example**
**Example**



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
'right'

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Example**
**Example**



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Example**
**Example**



### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Annotation area fill color

:::

**Example**
**Example**



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area fill opacity

:::

**Example**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Annotation area border color

:::

**Example**
**Example**



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area border width

:::

**Example**
**Example**



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area border radius

:::

**Example**
**Example**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Annotation area border line style

:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area padding

:::

**Example**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Mo ta}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Mo ta}
Start anchor of the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Mo ta}
Anchor selector. It must ultimately locate one logical anchor.

:::

**Example**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Mo ta}
End anchor of the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Mo ta}
Anchor selector. It must ultimately locate one logical anchor.

:::

**Example**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Mo ta}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

4

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Select data items by dimension field value; supports arrays

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Mo ta}
Difference value type.

\- absolute: display the absolute difference, calculated as end - start

\- percent: display the percentage difference, calculated as (end - start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
textfontsize.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
textcolor.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Text background color.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Line color.

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Line style.

:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mo ta}
Whether to enable dimension linkage when the chart uses pivot mode or measure combinations.

When hovering a dimension value, highlight data with the same dimension value in other linked charts.



Pivot chart dimension linkage configuration

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Whether pivot chart dimension linkage is enabled

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to show Tooltip information for subcharts corresponding to all dimensions

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether to show the label corresponding to the crosshair

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mo ta}
language



Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::

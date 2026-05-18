# BoxPlot

:::info{title=Recommended}
\- Recommended field configuration: `1` measure, `1` dimension

\- Supports data reshaping: at least `1` measure, `0` dimensions

:::

:::info{title=Encoding Mapping}
Box plots support the following visual channels:

`xAxis`  : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension values

`yAxis`  : y-axis channel, supports `multiple measures`, mapped to the y-axis by measure values

`color`  : color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, and measure colors linearly map measure values to mark colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Box plots are suitable for showing data distribution. The X-axis is a category axis (categorical data), the Y-axis is a numeric axis (continuous data), and boxes are arranged vertically.

Applicable scenarios:

\- When data item names are short

\- When intuitive comparison of numerical values across different categories is needed

\- When displaying trends in time-series data

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 numerical field

\- The first dimension is placed on the X-axis, and the remaining dimensions are merged with measure names when multiple measures exist, then displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legends, axes, data labels, and tooltips are enabled by default.

:::


## chartType

**Type:** `"boxPlot"`

:::note{title=Description}
Box plots are suitable for showing data distribution. The X-axis is a category axis (categorical data), the Y-axis is a numeric axis (continuous data), and boxes are arranged vertically.

:::

**Example**
'boxPlot'




## dataset

**Type:** `Record[]`

:::note{title=Description}
An aggregated dataset conforming to the TidyData specification, used to define the chart's data source and structure. User-provided datasets do not require preprocessing. VSeed's powerful data reshape capability performs the reshape automatically, and box plot data is ultimately converted into 2 dimensions and 1 measure.

:::

**Example**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `BoxPlotDimension[] | undefined`

:::note{title=Description}
The first dimension of the box plot is mapped to the X-axis, and the remaining dimensions are merged with measure names when multiple measures exist, then displayed as legend items.

:::

**Example**
[{id: "category", alias: "Category"}]




### id

**Type:** `string`

:::note{title=Description}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Dimension date format configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped

\- xAxis: supports mapping multiple dimensions to the x-axis

\- color: supports mapping multiple dimensions to the color channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `BoxPlotMeasure[] | undefined`

:::note{title=Description}
All measures in the Box Plot are automatically merged into one measure and mapped to the Y-axis. If multiple measures exist, the measure names will be merged with the remaining dimensions and displayed as legend items.

:::

**Example**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Description}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Automatic number formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation

For example:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
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

:::note{title=Description}
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

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
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

:::note{title=Description}
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

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- value: Measures corresponding to discrete values, used to calculate statistical values for displaying the Box Plot

\- q1: Measure mapping for the 25th percentile statistical value

\- q3: Measure mapping for the 75th percentile statistical value

\- min: Measure mapping for the minimum whisker value

\- max: Measure mapping for the maximum whisker value

\- meadian: Measure mapping for the median statistical value

\- outliers: Measure mapping for outliers

\- detail: measure mapped to the detail channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination configuration, used to specify the field name for pagination, which must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Current pagination value; specifies the value used to determine the current page

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color. The background color can be a color string (default is transparent), such as 'red' or 'blue', or a hex, rgb, or rgba value like '#ff0000' or 'rgba(255,0,0,0.5)'.

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Color mapping used to map data values to specific colors

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
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

:::note{title=Description}
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

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label font color automatically inverts based on the graphic element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label anti-overlap feature is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Key capabilities:

- Supports arbitrarily complex data filtering conditions

- Uses built-in utility functions for data operations

- Executes safely in the browser environment (Web Worker sandbox)

Environment requirement: only browser environments are supported; Node.js environments use fallback

Note: selector and dynamicFilter cannot be used at the same time; dynamicFilter has higher priority

Chart dynamic filter configuration

Filters chart marks (bars, points, etc.) via AI-generated JavaScript code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language)

:::

**Example**
Chart animated filter configuration

Implement filtering of chart marks (bars, points, etc.) via AI-generated JavaScript code.



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed via _ or R)

\- Input parameters: data (array), each item contains a __row_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index represents the row number of the original data item, and field represents the field to be illuminated

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

AI-generated JavaScript filtering code
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

\- Only built-in utility functions can be used (accessed via _ or R)
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
Fallback solution when code execution fails or the environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime
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
Legend configuration; used to define the chart legend, including its position, format, style, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend feature is enabled

:::

**Example**
\- not in: Select data items where the value of the dimension field is not in 'value'



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled

:::

:::warning{title=Warning}
Select the value of the dimension field in the data item; supports arrays

:::

**Example**
Animated filter execution result (runtime field)



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pager icon disabled color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size

:::

**Example**
Whether the legend border is enabled



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight

:::

**Example**
Legend font color



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Legend shape
:::

:::warning{title=Warning}
Only effective for discrete legends
:::

**Example**
Legend font size



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position

:::

**Example**
Legend font color



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows for the legend when many items exist.

If the position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of displayed columns.

If the position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed rows.

:::

:::warning{title=Warning}
Only effective for discrete legends
:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration; used to define chart tooltips, including their position, format, style, etc.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether the tooltips feature is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection

Brush configuration; used to enable/disable brush selection capabilities.

Chart brush configuration

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable brush selection

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type

Defines the shape and direction of the selection box.

\- `rect`: Rectangular selection; selection can be made in both X and Y directions simultaneously.

\- `polygon`: Polygon selection; perform selection by clicking multiple points to draw an arbitrary polygon.

\- `x`: X-axis selection; selection only in the X direction, with no limits in the Y direction.

\- `y`: Y-axis selection; selection only in the Y direction, with no limits in the X direction.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush selection mode: single or multiple.

Defines the selection mode.

\- `single`: Single selection mode; only one selection box can exist at a time.

\- `multiple`: Multiple selection mode; multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box after the brush selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for selected data items

Defines the style of the selected data points.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity



Opacity of the selected data points, ranging from 0 to 1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for unselected data items

Defines the style of the unselected data points.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity



Opacity of unselected data points, ranging from 0 to 1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
X-axis, category axis; X-axis configuration used to define the chart's x-axis, including its position, format, style, etc.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the zero value on the axis; this configuration is ignored when min and max are specified. Only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label automatic hiding; if two labels overlap (interval is less than autoHideGap), the overlapping labels are automatically hidden. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Axis label automatic hiding interval; if the interval between two labels is less than autoHideGap, the overlapping labels are automatically hidden. Only effective for category axes.

autoHide enabled: uses autoHideSeparation.

autoHide disabled: uses sampling, set on minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label automatic rotation; labels are automatically rotated when their width exceeds the axis length. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Axis label automatic rotation angle range; defines the rotation angle range when automatic rotation is enabled. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label automatic length limit; when label width exceeds the axis length, the excess is indicated by an ellipsis and becomes visible upon hovering. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Axis label maximum length limit; when label text length exceeds the maximum, the excess is indicated by an ellipsis and becomes visible upon hovering. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick label

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis tick

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick points inward

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, defaults to field configuration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid line

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
Y-axis, numeric axis; Y-axis configuration used to define the chart's y-axis, including its position, format, style, etc.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
The minimum value of the axis; has higher priority than 'nice' and 'zero'

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
The maximum value of the axis; has higher priority than 'nice' and 'zero'. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; only effective for numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the logarithmic axis; only effective for numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval to make the labels more readable; this configuration is ignored when min and max are specified. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the zero value on the axis; this configuration is ignored when min and max are specified. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format labels for the numeric axis; when autoFormat is true, the numFormat configuration is ignored. Only effective for numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Numeric axis number formatting; only effective for numeric axes, with lower priority than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
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

:::note{title=Description}
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

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick label

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis tick

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick points inward

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, defaults to field configuration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid line

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
X-axis sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders



Category axis sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders
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
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order; can be 'asc' or 'desc'

:::

**Example**
Animation duration



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Field to sort by; can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order; this order will be directly applied to the category axis

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sort configuration; supports sorting by dimension or measure, as well as custom sort order.

Legend sort configuration; supports sorting by dimension or measure, as well as custom sort order.; sort arrays follow left-to-right or top-to-bottom order.

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
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order; can be 'asc' or 'desc'

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Field to sort by; can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order; this order will be directly applied to the legend. Ascending is from left-to-right or top-to-bottom, descending from right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme; theme is a low-priority configuration containing general configurations shared across all chart types and specific ones for individual classes. Built-in light and dark themes are available; users can also customize themes via the Builder.

Theme

Built-in light and dark themes; new themes can be customized via registerTheme.

:::

**Example**
'dark'

Field to sort by; can be a dimension ID or measure ID

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Vertical tooltip configuration used to define the chart's vertical tooltip, including its color, label style, etc.

Crosshair rectangle configuration; a configuration type used to display a crosshair rectangle in the chart

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle label background color

:::


## boxPlotStyle

**Type:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title=Description}
Vertical tooltip configuration used to define the chart's vertical tooltip, including its color, label style, etc.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Crosshair rectangle configuration; a configuration type used to display a crosshair rectangle in the chart

Whether to show the crosshair rectangle

Crosshair rectangle color

:::

**Example**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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

Conditional measure selector
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
Data selector

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
If a selector is configured, it provides four types of data matching capabilities: value selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Dimension field; the ID of an item in dimensions

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Operator

:::

### boxVisible

**Type:** `boolean | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

:::

### boxColor

**Type:** `string | undefined`

:::note{title=Description}
\- not in: Select data items where the value of the dimension field is not in 'value'

:::

### boxColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Operator

:::

### boxBorderColor

**Type:** `string | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

:::

### boxBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
\- not in: Select data items where the value of the dimension field is not in 'value'

:::

### boxBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Box plot element border opacity

:::

### boxCornerRadius

**Type:** `number | undefined`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### medianBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Median line color

:::

### whiskerBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Whisker line color

:::


## outlierStyle

**Type:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title=Description}
Outlier style configuration, supports global or selector-level application

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If a selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style applies globally.

:::

**Example**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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

Conditional measure selector
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
Data selector

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
If a selector is configured, it provides four types of data matching capabilities: value selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Dimension field; the ID of an item in dimensions

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Operator

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
\- not in: Select data items where the value of the dimension field is not in 'value'

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Operator

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
\- not in: Select data items where the value of the dimension field is not in 'value'

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

**Example**
Whether the point is visible

Point size

Point size




## whiskers

**Type:** `number | number[] | undefined`

:::note{title=Description}
Point mark color

Point mark color

Point mark color opacity

Point mark color opacity

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration; defines points on the chart based on selected data, including their position, format, style, etc.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selector for the annotation point, used to select data points.

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### measureId

**Type:** `string | undefined`

:::note{title=Description}
Specifies the measure id that the annotation point belongs to. In multi-measure scenarios, it can be combined with selector to uniquely locate the annotation point for the target measure.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for Top N, statistical analysis, complex conditions, and other scenarios that are hard to express with static selectors.

Key capabilities:

- Supports arbitrarily complex data filtering conditions

- Uses built-in utility functions for data operations

- Executes safely in the browser environment (Web Worker sandbox)

Environment requirement: only browser environments are supported; Node.js environments use fallback

Note: selector and dynamicFilter cannot be used at the same time; dynamicFilter has higher priority

Chart dynamic filter configuration

Filters chart marks (bars, points, etc.) via AI-generated JavaScript code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language)

:::

**Example**
\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code



\- Only built-in utility functions can be used (accessed via _ or R)

\- Input parameters: data (array), each item contains a __row_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index represents the row number of the original data item, and field represents the field to be illuminated

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Specifies the measure id that the annotation point belongs to. In multi-measure scenarios, it can be combined with selector to uniquely locate the annotation point for the target measure.
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Animated filter (AI-generated code execution)
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

Implement complex data filtering logic via AI-generated JavaScript code.
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
Fallback solution when code execution fails or the environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
\- Only built-in utility functions can be used (accessed via _ or R)



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
Highlight the data item with the highest profit rate in each region



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. In general, set it to `right` so the text appears to the left of the annotation point and stays within the visible chart area

Recommended to set it to `right`, which keeps the text on the left side of the annotation point

right: the text is on the left side of the annotation point, with the right edge aligned to the point

left: the text is on the right side of the annotation point, with the left edge aligned to the point

center: the text is centered on the annotation point, with the text center aligned to the point
:::

**Example**
\- not in: Select data items where the value of the dimension field is not in 'value'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally set to 'top' so the text appears below the point, ensuring visibility within the chart area.

Recommended to set as 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the point; the top edge of the text aligns with the point.

middle: Text is centered on the point.

bottom: Text is at the top of the point; the bottom edge of the text aligns with the point.

:::

**Example**
Animated filter execution result (runtime field)



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
Annotation text



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color
:::

**Example**
Text color



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
Text font size



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
Text font weight



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
Text alignment; generally set to 'right' so the text appears on the left of the point, ensuring visibility.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
right: Text is on the left of the point; the right edge of the text aligns with the point.



### offsetY

**Type:** `number | undefined`

:::note{title=Description}
The overall pixel offset of the annotation point in the Y direction. When the point is above the chart (higher values), it is recommended to set a positive value. When below (lower values), it is recommended to set a negative value.

A negative value shifts it upwards; for example, setting it to -10 shifts the entire annotation component (text, background) up by 10 pixels.

A positive value shifts it downwards; for example, setting it to 10 shifts the entire annotation component down by 10 pixels.

:::

**Example**
Text vertical alignment; generally set to 'top' so the text appears below the point, ensuring visibility within the chart area.



### offsetX

**Type:** `number | undefined`

:::note{title=Description}
The overall pixel offset of the annotation point in the X direction. When the point is on the left of the chart (start of the category axis), it is recommended to set it to a positive value. When on the right (end of the category axis), it is recommended to set a negative value.

A negative value shifts it leftwards; for example, setting it to -10 shifts the entire annotation component (text, background) left by 10 pixels.

A positive value shifts it rightwards; for example, setting it to 10 shifts the entire annotation component right by 10 pixels.

:::

**Example**
bottom: Text is at the top of the point; the bottom edge of the text aligns with the point.




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Dimension value mark line, displayed vertically; allows setting position, style, etc.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X-value for the vertical annotation line; if the category axis is in the X direction, enter a dimension value; if the numeric axis is in the X direction, enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Dynamically calculates the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position must be determined dynamically from data, such as average, maximum, quantile, and business lines.

Only supports browser environments (requires Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language)

:::

**Example**
"Get the highest sales value as a reference for the annotation line"

Background border width



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code



\- Only built-in utility functions can be used (accessed via _ or R)

\- Input parameters: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: Dynamic values needed for annotation lines (horizontal or vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as the annotation line value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Background padding
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the percentile as the annotation line
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

The overall pixel offset of the annotation point in the Y direction. When the point is above the chart (higher values), it is recommended to set a positive value. When below (lower values), it is recommended to set a negative value.
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
A negative value shifts it leftwards; for example, setting it to -10 shifts the entire annotation component (text, background) left by 10 pixels.



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; location of the annotation line's label (relative to the line).

:::

**Example**
offsetX: 5, Annotation point overall offset to the right by 5 pixels



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
Fixed X-value for the vertical annotation line; if the category axis is in the X direction, enter a dimension value; if the numeric axis is in the X direction, enter a specific value.



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
Calculate the annotation line value dynamically via AI-generated JavaScript code.



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
Only supports browser environments (requires Web Worker).



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; generally unnecessary to set.

Recommended to set as 'right' to ensure text is on the left of the line.

right: Text is on the left of the reference line; the right edge of the text aligns with the (vertical) annotation line.

left: Text is on the right of the reference line; the left edge of the text aligns with the (vertical) annotation line.

center: Text is centered on the reference line; the center of the text aligns with the (vertical) annotation line.

:::

**Example**
\- Input parameters: data (array)



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally unnecessary to set.

Recommended to set as 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the reference line; the top edge of the text aligns with the (vertical) annotation line's end.

middle: Text is centered on the reference line; the center of the text aligns with the (vertical) annotation line's end.

bottom: Text is at the top of the reference line; the bottom edge of the text aligns with the (vertical) annotation line's end.

:::

**Example**
Get quantiles for the annotation line



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

:::

**Example**
Fallback solution when code execution fails or the environment is not supported



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
Captured during the prepare() phase; read-only at runtime



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style

:::

**Example**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color
:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
Recommended to set as 'right' to ensure text is on the left of the line.



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
left: Text is on the right of the reference line; the left edge of the text aligns with the (vertical) annotation line.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Numeric mark line (including mean, maximum, minimum lines, etc.), displayed horizontally; allows setting position, style, etc. For drawing mark lines corresponding to numeric values like the mean, use this configuration.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y-value for the horizontal annotation line; if the category axis is in the Y direction, enter a dimension value; if the numeric axis is in the Y direction, enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Dynamically calculates the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position must be determined dynamically from data, such as average, maximum, quantile, and business lines.

Only supports browser environments (requires Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language)

:::

**Example**
Line visible

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code



\- Only built-in utility functions can be used (accessed via _ or R)

\- Input parameters: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: Dynamic values needed for annotation lines (horizontal or vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Line width
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average value for the annotation line
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Line style
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the Goal value based on conditions
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
Background border color



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position



Location of the annotation line's label (relative to the line).

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
Fixed Y-value for the horizontal annotation line; if the category axis is in the Y direction, enter a dimension value; if the numeric axis is in the Y direction, enter a specific value.



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. In general, no setting is required

Recommended to set it to `right`, which keeps the text on the left side of the annotation line

right: the text is on the left side of the reference line, with the right edge aligned to the end of the horizontal annotation line

left: the text is on the right side of the reference line, with the left edge aligned to the end of the horizontal annotation line

center: the text is centered on the reference line, with the text center aligned to the end of the horizontal annotation line
:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally unnecessary to set.

Recommended to set as 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the reference line; the top edge of the text aligns with the horizontal annotation line.

middle: Text is centered on the reference line; the center of the text aligns with the horizontal annotation line.

bottom: Text is at the top of the reference line; the bottom edge of the text aligns with the horizontal annotation line.

:::

**Example**
\- Applicable scenarios: Dynamic values needed for annotation lines (horizontal or vertical)



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
Get the maximum sales value as the annotation line value



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color
:::

**Example**
Get quantiles for the annotation line



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
Fallback solution when code execution fails or the environment is not supported



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width



Background border width

:::

**Example**
Annotation text



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
Text position



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible



Line visible

:::

**Example**
Text font size



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
Text font weight



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width
:::

**Example**
Text alignment; generally unnecessary to set.



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style

:::

**Example**
right: Text is on the left of the reference line; the right edge of the text aligns with the (horizontal) annotation line's end.



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Whether to enable splitting the main line into two segments.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for parts greater than the annotation value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for parts less than the annotation value

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration; defines an area on the chart based on selected data, including its position, style, etc.

Depends on selected data for area marking.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Dimension field; the ID of an item in dimensions

:::


#### field

**Type:** `string`

:::note{title=Description}
Operator

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Operator

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Select the value of the dimension field in the data item; supports arrays

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Annotation text

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
Background border width



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
Text position

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
Line visible



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. In general, set it to `right`; the text is displayed in the middle of the annotation area to ensure it stays within the visible chart area

Recommended to set it to `center`, which keeps the text in the middle of the annotation area

right: the text is on the left side of the annotation area, with the right edge aligned to the annotation area

left: the text is on the right side of the annotation area, with the left edge aligned to the annotation area

center: the text is centered in the annotation area, with the text center aligned to the annotation area
:::

**Example**
Line style



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Recommended to set as 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the area; the top edge of the text aligns with the area.

middle: Text is centered in the area.

bottom: Text is at the top of the area; the bottom edge of the text aligns with the area.

bottom: Text is at the top of the mark area, its bottom edge aligned with the area.

:::

**Example**
Depends on selected data for area marking.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
Operator



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color
:::

**Example**
\- not in: Select data items where the value of the dimension field is not in 'value'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
\- not in: Select data items where the value of the dimension field is not in 'value'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
Select the value of the dimension field in the data item; supports arrays



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
Text position



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
Text color



### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area region color

:::

**Example**
Text font size



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Mark area region color opacity

:::

**Example**
Text font weight



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area region border color

:::

**Example**
Text alignment; generally set to 'right' so the text appears in the middle of the area, ensuring visibility.



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Mark area region border width

:::

**Example**
right: Text is on the left of the area; the right edge of the text aligns with the area.



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Mark area region border radius

:::

**Example**
center: Text is centered in the area.



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Line type for the mark area region border

:::

**Example**
Text vertical alignment; generally set to 'top' so the text appears at the bottom of the area, ensuring visibility.



### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Margin for the mark area region

:::

**Example**
top: Text is at the bottom of the area; the top edge of the text aligns with the area.




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
When chart pivoting or measure combination is enabled, whether to enable dimension linkage.

When hovering over a dimension value, highlight data with the same dimension value in other charts.

Pivot chart dimension linkage configuration
:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable pivot chart dimension linkage
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show Tooltip information for child charts corresponding to all dimensions
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the label corresponding to the crosshair
:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language
:::


## boxMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Background border color

:::


## boxGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
Background border color

:::

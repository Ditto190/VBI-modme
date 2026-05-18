# RoseParallel

:::info{title=Recommended}
\- Recommended field configuration: `1` measure, `1` dimension

\- Supports data reshaping: at least `1` measure, `0` dimensions

:::

:::info{title=Encoding Mapping}
Grouped rose chart supports the following visual channels:

`angle`  : angle channel, supports `multiple dimensions`, maps dimension values to the angular axis

`radius` : radius channel, supports `multiple measures`, maps measure values to the radius axis

`detail` : detail channel, supports `multiple dimensions`, used to display more granular data within the same color series

`color`  : color channel, supports `multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Grouped rose chart, suitable for multi-dimensional data comparison scenarios, displaying data size through the arc length and radius of sectors in a polar coordinate system

Applicable scenarios:

\- Distribution comparison of multi-dimensional data

\- Comparison of strength in periodic data

\- Concurrent display of numerical values and proportions for categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 numeric field (measure)

\- The first dimension is placed on the angular axis; other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legend, polar coordinate system, data labels, tooltips, and numerical scaling are enabled by default

:::


## chartType

**Type:** `"roseParallel"`

:::note{title=Description}
Grouped rose chart

Grouped rose chart, displaying multi-dimensional data comparison relationships through a polar coordinate system

:::

**Example**
'roseParallel'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset



An aggregated dataset that conforms to the TidyData specification, used to define the chart's data source and structure. User-input datasets do not require any manual processing; VSeed features a powerful data reshaping function that automatically transforms the data. Rose chart data is eventually converted into 2 dimensions and 1 measure.
:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Dimensions



The first dimension of the rose chart is mapped to the angular axis; other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.
:::

**Example**
[{id: 'category', alias: 'Category'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
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

:::note{title=Description}
Measures



Measures in the rose chart are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions to be displayed as legend items.
:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
Measure ID. Must be unique
:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Measure alias. Duplicates are allowed. If omitted, alias uses id
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Automatic number formatting, enabled by default and with the highest priority

When autoFormat=true, it overrides all numFormat configurations

When enabled, chart labels and tooltips automatically choose an appropriate format based on measure values and locale

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, implemented with the browser Intl.NumberFormat

For example:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom number formatting for measures, automatically applied to label and tooltip

Note: to use custom formatting, explicitly set autoFormat=false; otherwise autoFormat overrides this configuration
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type. Supports number (decimal), percent (%), permille (‰), and scientific notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number formatting ratio. Cannot be 0
:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number formatting symbol, such as % or ‰
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
Number formatting suffix
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number formatting prefix
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Fraction digits for number formatting, using minimumFractionDigits and maximumFractionDigits from browser Intl.NumberFormat. Lower priority than significantDigits
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
Significant digits for number formatting, using minimumSignificantDigits and maximumSignificantDigits from browser Intl.NumberFormat. Higher priority than fractionDigits
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
Rounding priority for number formatting when significantDigits and fractionDigits are both set, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingPriority
:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingMode
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type. Supports number (decimal), percent (%), permille (‰), and scientific notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number formatting ratio. Cannot be 0
:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number formatting symbol, such as % or ‰
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
Number formatting suffix
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number formatting prefix
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Fraction digits for number formatting, using minimumFractionDigits and maximumFractionDigits from browser Intl.NumberFormat. Lower priority than significantDigits
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
Significant digits for number formatting, using minimumSignificantDigits and maximumSignificantDigits from browser Intl.NumberFormat. Higher priority than fractionDigits
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
Rounding priority for number formatting when significantDigits and fractionDigits are both set, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingPriority
:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingMode
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- radius: measure mapped to the radius channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In a flat measure configuration, builds a tree-like measure structure. parentId points to the ID of the parent measure group, used for building the hierarchy.
:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination configuration, used to specify the field name for pagination, which must be a dimension.
:::


### field

**Type:** `string`

:::note{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension.
:::

### currentValue

**Type:** `string`

:::note{title=Description}
Current pagination value; specifies the value used to determine the current page.
:::

**Example**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color. Default is transparent. Can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)').
:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.
:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Discrete color scheme used to define the colors of different elements in the chart.
:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart.
:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Color mapping used to map data values to specific colors.
:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart.
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart.
:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Description}
Label

Label configuration for defining chart data labels, including position, format, and style.
:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether labels are enabled
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all drawing-related measures are processed by `foldMeasures` and merged into one measure representing one data point.

Note: encoding.label has higher priority; this configuration does not affect encoding.label
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values as percentages

In multi-measure scenarios, there is no concern about conflicting values, because all drawing-related measures are processed by `foldMeasures` and merged into one measure representing one data point.

Note: encoding.label has higher priority; this configuration does not affect encoding.label
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension labels

Displays all dimension labels

Note: encoding.label has higher priority; this configuration does not affect encoding.label
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted. When autoFormat is true, numFormat is ignored
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value formatting configuration. It is merged with `format` in `measure`; `format` in `measure` has higher priority. numFormat has lower priority than autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type. Supports number (decimal), percent (%), permille (‰), and scientific notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number formatting ratio. Cannot be 0
:::

**Example**
\- 100000 converts to 10万, ratio:10000, symbol:"万"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number formatting symbol, such as % or ‰
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
Number formatting suffix
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number formatting prefix
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Fraction digits for number formatting, using minimumFractionDigits and maximumFractionDigits from browser Intl.NumberFormat. Lower priority than significantDigits
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
Significant digits for number formatting, using minimumSignificantDigits and maximumSignificantDigits from browser Intl.NumberFormat. Higher priority than fractionDigits
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
Rounding priority for number formatting when significantDigits and fractionDigits are both set, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingPriority
:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using browser Intl.NumberFormat with the same rules as Intl.NumberFormat roundingMode
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
Whether label font color is automatically inverted according to mark color
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label anti-overlap is enabled
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filter. By default, the condition relationship between selectors is OR
:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the id of an item in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: selects data items whose dimension field value is in value

\- not in: selects data items whose dimension field value is not in value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: selects data items whose dimension field value is in value

\- not in: selects data items whose dimension field value is not in value

Same as operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select values from the dimension field in data items. Arrays are supported
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic through AI-generated JavaScript code

Core capabilities:

\- Supports arbitrarily complex data filtering conditions

\- Uses built-in utility functions for data operations

\- Executes safely in the browser environment (Web Worker sandbox)

Environment requirement: only supported in browser environments; Node.js environments use fallback

Note: selector and dynamicFilter cannot be used at the same time. dynamicFilter has higher priority

Chart dynamic filter configuration

Uses AI-generated JavaScript code to filter chart marks (bars, points, etc.)
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User filter requirement description (natural language)
:::

**Example**
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each area"



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed through _ or R)

\- Input parameter: data (array), where each item contains the __row_index field as the row number

\- Must return an array of row-index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index is the row number of the original data item, and field is the field to highlight

\- Forbidden: eval, Function, async operations, DOM APIs, network requests
:::

**Example**
Highlight the 'sales' field for data items with sales greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit rate in each region
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

:::note{title=Description}
Fallback when code execution fails or the environment is unsupported
:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the id of an item in dimensions
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: selects data items whose dimension field value is in value

\- not in: selects data items whose dimension field value is not in value
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: selects data items whose dimension field value is in value

\- not in: selects data items whose dimension field value is not in value

Same as operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select values from the dimension field in data items. Arrays are supported
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filtering execution result (runtime field)

Written during prepare(); read-only at runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Description}
Label layout mode. Only effective for Pie Chart and Donut Chart when `labelPosition` is `outside`.

- arc: Layout labels along the arc.

- labelLine: Aligns labels at both ends, connecting sector graphics with labels via leader lines.

- edge: Aligns labels at both ends, connecting sector graphics with labels via leader lines, positioned close to the edges of the chart.
:::


## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Legend

Legend configuration for defining the chart legend, including position, format, and style.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend is enabled
:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend border is enabled
:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
border: true



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
Disabled pager icon color
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size

:::

**Example**
labelFontSize: 10



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Legend shape

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows when there are many legend items

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of displayed columns

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed rows
:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip information

Tooltip configuration for defining chart tooltips, including position, format, and style.
:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltip information is enabled
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection

Brush configuration used to enable or disable brush selection.

Chart brush selection configuration
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether brush selection is enabled
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type

Defines the shape and direction of the brush selection.

\- `rect`: rectangular brush selection, selects in both X and Y directions

\- `polygon`: polygon brush selection, draws an arbitrary polygon by clicking multiple points

\- `x`: X-axis brush selection, selects only in the X direction without restricting the Y direction

\- `y`: Y-axis brush selection, selects only in the Y direction without restricting the X direction
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode, single or multiple selection

Defines the brush selection mode.

\- `single`: single-selection mode; only one brush area can exist at a time

\- `multiple`: multiple-selection mode; multiple brush areas can exist at the same time
:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the brush area after brush selection ends
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data inside the brush area

Defines the style of selected data points
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of selected data points, ranging from 0 to 1
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
Style for data outside the brush area

Defines the style of unselected data points
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

## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Description}
Animation configuration

Chart animation configuration; available effects are constrained by chart type
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable pie/donut/rose chart animation

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Description}
Pie/donut/rose chart animation parameters

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Description}
Pie/donut/rose chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Pie/donut/rose chart appear effects, supporting radial and scale animations

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

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Description}
Pie/donut/rose chart update animation configuration

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Description}
Pie/donut/rose chart update effects, supporting radial animation

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

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Description}
Pie/donut/rose chart loop animation configuration

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

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Description}
Pie/donut/rose chart loop animation configuration

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Description}
Pie/donut/rose chart loop effects

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled
:::

###### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Description}
Pie/donut/rose chart atmosphere animation configuration

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


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a low-priority configuration that includes common settings shared across all chart types and specific settings for a single chart type.

Built-in light and dark themes are available. Users can customize themes through Builder

Theme

Built-in light and dark themes are available. New themes can be customized through registerTheme.
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

:::note{title=Description}
Language

Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language
:::

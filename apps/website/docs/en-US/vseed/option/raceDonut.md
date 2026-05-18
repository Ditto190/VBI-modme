# RaceDonut

:::note{title=Description}
Dynamic donut chart (Race Donut Chart)

Suitable for displaying the proportion of data over time, with a blank area in the center to display summary information.

Applicable scenarios:

\- Need to display both overall data and how each part's share changes over time

\- Emphasize the relationship between the whole and the parts.

\- The center area needs to display key metrics or titles

:::

:::note{title=Note}
Dynamic donut chart:

\- Angles map to measure values, color maps to dimension values.

\- Supports controlling time dimensions through the player, using animation to show share changes.

\- Compared to pie charts, the center area is left blank, making it visually lighter.

:::


## chartType

**Type:** `"raceDonut"`

:::note{title=Description}
Dynamic donut chart, suitable for displaying proportional relationships in data over time

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Data set

A TidyData-compliant, already aggregated dataset used to define the chart data source and structure. User input does not require extra processing; VSeed provides powerful data reshaping capabilities and reshapes data automatically. Donut chart data is ultimately converted to 1 dimension and 1 measure.
:::

## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=Description}
Dimensions

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

\- player: supports mapping multiple dimensions to the player channel

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=Description}
Measures

All measures of a donut chart are automatically merged into one measure and mapped to the pie radius. When multiple measures exist, measure names are merged with the remaining dimensions and displayed as legend items.
:::

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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Description}
Channel to which the measure is mapped:

- angle: measure mapped to the angle channel

- color: measure mapped to the color channel

- label: measure mapped to the label channel

- tooltip: measure mapped to the tooltip channel
:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In a flat measure configuration, builds a tree-like measure structure. parentId points to the ID of the parent measure group, used for building the hierarchy.
:::

:::tip{title=Tip}
There are two forms of measure-tree configuration: directly configuring a measure tree with children, or configuring a flat measure list with parentId. The two forms cannot be used at the same time.
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
'2023\-01\-01'




## player

**Type:** `Player | undefined`

:::note{title=Description}
Player configuration, used to specify the time dimension, the core configuration of the dynamic pie chart

Player configuration, used to specify the player field name, must be a dimension

:::

:::warning{title=Warning}
This feature does not support chart types such as table, pivotTable, dualAxis, histogram, boxPlot, etc., and does not support use when measure combination or row/column pivot is enabled

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Description}
Maximum playback count; data exceeding this count will be truncated, set to false for no limit

:::

### interval

**Type:** `number | undefined`

:::note{title=Description}
Playback interval, unit: ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to auto play

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to loop play

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Description}
Player position

:::

### railColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar rail color

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Description}
Player text font family

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Description}
Player text font size

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar track color

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar slider handle color

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar slider handle border color

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player start button color

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player pause button color

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player backward button color

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player forward button color

:::


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
"Highlight columns where sales are greater than 1000"

"Highlight the column with the highest profit margin in each region"



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed through _ or R)

\- Input parameter: data (array), where each item contains the __row_index field as the row number

\- Must return an array of row-index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index is the row number of the original data item, and field is the field to highlight

\- Forbidden: eval, Function, asynchronous operations, DOM API, and network requests
:::

**Example**
Highlight the sales field of data items where sales are greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region.
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

Highlight data items that match multiple filter conditions
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
Only applies to discrete legends
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
Only applies to discrete legends
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
Only applies to discrete legends
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


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority feature configuration, including common configuration shared by all chart types and chart-type-specific shared configuration

Built-in light and dark themes are available. Users can customize themes through Builder

Theme

Built-in light and dark themes are available. New themes can be customized through registerTheme.
:::

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

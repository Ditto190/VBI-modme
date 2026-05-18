# RaceBar

:::note{title=Description}
Dynamic bar chart (Race Bar Chart)

Suitable for showing how data rankings change over time

:::


## chartType

**Type:** `"raceBar"`

:::note{title=Description}
Dynamic bar chart, suitable for showing how data rankings change over time

:::


## dataset

**Type:** `Record[]`

:::note{title=Description}
Data source: A TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User input datasets do not require any preprocessing; VSeed includes a powerful Data Reshape feature that automatically performs reshaping. Bar chart data will finally be converted to 2 dimensions and 1 measure.

:::

## dimensions

**Type:** `RaceBarDimension[] | undefined`

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped:

- player: supports mapping multiple dimensions to the player (animation) channel.

- yAxis: supports mapping multiple dimensions to the Y-axis.

- color: supports mapping multiple dimensions to the color channel.

- detail: supports mapping multiple dimensions to the detail channel.

- tooltip: supports mapping multiple dimensions to the tooltip channel.

- label: supports mapping multiple dimensions to the label channel.

- row: supports mapping multiple dimensions to the row channel.

- column: supports mapping multiple dimensions to the column channel.

:::


## measures

**Type:** `RaceBarMeasure[] | undefined`

:::note{title=Description}
Measures.

:::


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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- xAxis: measure mapped to the x-axis

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


## player

**Type:** `Player | undefined`

:::note{title=Description}
Player configuration. Used to specify the time dimension, which is the core configuration for Race Bar Charts.

Specifies the field name for playing (animating), which must be a dimension.

:::

:::warning{title=Warning}
This feature does not support Table, PivotTable, DualAxis, Histogram, BoxPlot, etc., nor does it support measure combinations or row/column pivoting.

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Description}
Maximum number of items to play; data exceeding this count will be truncated. Set to `false` for no limit.

:::

### interval

**Type:** `number | undefined`

:::note{title=Description}
Playback interval in milliseconds (ms).

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to start playback automatically.

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to loop playback.

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Description}
Player position.

:::

### railColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's progress bar rail.

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
Color of the player's progress bar track.

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's progress bar slider handle.

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Border color of the slider handle.

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's start button.

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's pause button.

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's backward button.

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the player's forward button.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Y-axis sort configuration; supports sorting by dimensions or measures, and custom sort order



Category axis sort configuration; supports sorting by dimensions or measures, and custom sort order
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
Sort order, supports 'asc' or 'desc'

:::

**Example**
Sort order; can be 'asc' or 'desc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sort depends on; can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order, applied directly to the category axis

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination



Pagination configuration for the chart's pagination feature

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
Chart background color, defaults to a transparent background. Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Color



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
Whether labels display measure values in percentage

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
Whether the label automatically inverts font color based on element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering, default relationship between selectors is 'Or'

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items based on dimension values, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Key Capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Secure execution in browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Filter chart markers (bars, points, etc.) via AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars where sales are greater than 1000"

"Highlight the bar with the highest profit margin in each region"



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via _ or R) are allowed

\- Input parameters: data (array), each item contains a __row_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index represents the original row number; field represents the field to highlight

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

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
Fallback plan when code execution fails or environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items based on dimension values, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime

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
Whether the legend function is enabled

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled

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
Pager icon disabled color

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
Maximum number of columns or rows when many legend items exist

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows.

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
Whether the tooltip function is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush Selection

Brush configuration, used to enable/disable brush selection capability

Chart brush selection configuration

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

Defines the shape and selection direction of the brush

\- `rect`: rectangular brush selection; can select in both X-axis and Y-axis directions at the same time

\- `polygon`: polygon brush selection; draws an arbitrary polygon by clicking multiple points

\- `x`: X-axis brush selection; only selects in the X-axis direction, with no restriction in the Y-axis direction

\- `y`: Y-axis brush selection; only selects in the Y-axis direction, with no restriction in the X-axis direction
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode, single or multiple selection

Define the selection mode

\- `single`: Single selection mode, only one brush box allowed at a time

\- `multiple`: Multiple selection mode, multiple brush boxes can exist simultaneously

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box when selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for selected data items

Define the style for data points within the brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity



Opacity of selected data points, range 0-1

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

Define the style for data points outside the brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity



Opacity of unselected data points, range 0-1

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

**Type:** `XLinearAxis | undefined`

:::note{title=Description}
X-axis; a numeric axis. X-axis configuration used to define the chart's X-axis, including its position, format, style, etc.

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
Whether the axis is reversed, only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of 0 on the axis; this is ignored if min and max are set and is only effective for numeric axes.

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
Whether the tick is oriented inward

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
Title text, defaults to the field configuration

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


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Description}
Y-axis; a category axis. Y-axis configuration used to define the chart's Y-axis, including its position, format, style, etc.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed, only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of 0 on the axis; this is ignored if min and max are set and is only effective for numeric axes.

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

When auto-hide is enabled, it uses `autoHideSeparation`.
When auto-hide is disabled, it uses sampling, set on `minGap`.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
autoHide disabled: uses sampling, set on minGap.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Axis label automatic rotation; labels are automatically rotated when their width exceeds the axis length. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label automatic rotation angle range; defines the rotation angle range when automatic rotation is enabled. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Axis label automatic length limit; when label width exceeds the axis length, the excess is indicated by an ellipsis and becomes visible upon hovering. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Axis tick label

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
LabelColor

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
Axis line

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
Axis tick

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is oriented inward

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
Axis title

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, defaults to the field configuration

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
Axis grid line

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
Grid line dash type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Axis animation configuration

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


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Animation easing function



Horizontal tooltip configuration; used to define the chart's horizontal tooltip, including color and label style.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Crosshair rectangle configuration; a configuration type used to display a crosshair rectangle in the chart

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Crosshair rectangle label color

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle label

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Crosshair rectangle label background color

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Bar chart stacking corner radius

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sort configuration, supports sorting by dimensions or measures, as well as custom sort order.

Legend sort configuration, supports sorting by dimensions or measures, as well as custom sort order; the sort array follows top-to-bottom or left-to-right order.

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
Sort order, supports 'asc' or 'desc'

:::

**Example**
Sort order; can be 'asc' or 'desc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sort depends on; can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order applied directly to the legend; ascending from left-to-right or top-to-bottom, descending from right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. The theme is a lower-priority functional configuration that contains common settings shared by all chart types and chart settings shared within a single chart category. Built-in light and dark themes are available, and users can customize themes through Builder.

Theme

Built-in light and dark themes are available; new themes can be customized through registerTheme.
:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}
Rectangle mark style. Bar chart style configuration used to define bar color, border, corner radius, and related settings.

Supports global styles or conditional style configurations.

Data filter

If selector is configured, it provides four data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If selector is configured, it provides four data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.
:::

**Example**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Partial data selector
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
Dimension field, the id of an item in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

- in: selects data items whose dimension field value is in value

- not in: selects data items whose dimension field value is not in value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

- in: selects data items whose dimension field value is in value

- not in: selects data items whose dimension field value is not in value

Same as operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selects dimension field values in data items; supports arrays
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Implements complex data filtering logic through AI-generated JavaScript code.

Suitable for scenarios such as Top N, statistical analysis, and complex conditions that are hard to express with static selector.

Core capabilities:

- Supports arbitrarily complex data filtering conditions

- Uses built-in utility functions for data operations

- Safely executes in the browser environment (Web Worker sandbox)

Environment requirement: only browser environments are supported; Node.js environments use fallback.

Note: selector and dynamicFilter cannot be used at the same time; dynamicFilter has higher priority.

Chart dynamic filter configuration

Filters chart marks (bars, points, etc.) through AI-generated JavaScript code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User filtering requirement description (natural language)
:::

**Example**
Description of the user's filtering requirements (natural language)

"Highlight the bar with the highest profit margin in each region"



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

- Only built-in utility functions may be used (access through _ or R)

- Input parameter: data (array), where each item contains the __row_index field indicating the row number

- Must return an array of row-index and field combinations: Array<{ __row_index: number, field: string }>

- __row_index indicates the row number of the original data item, and field indicates the field to highlight

- Forbidden: eval, Function, asynchronous operations, DOM API, network requests
:::

**Example**
\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the 'sales' field for data items with sales greater than 1000
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

Highlight the data item with the highest profit rate in each region
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
Fallback plan when code execution fails or the environment is unsupported
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

- in: selects data items whose dimension field value is in value

- not in: selects data items whose dimension field value is not in value
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

- in: selects data items whose dimension field value is in value

- not in: selects data items whose dimension field value is not in value

Same as operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selects dimension field values in data items; supports arrays
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during prepare(); read-only at runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Captured during the prepare() phase; read-only at runtime

:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Whether the bar element (rectangle) is visible

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangle) color

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Bar element (rectangle) opacity

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangle) border color

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Bar element (rectangle) border width

:::

**Example**
Bar element (rectangle) border style

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) border radius



Bar element (rectangular element) stroke opacity.

:::

**Example**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
MarkPoint configuration; according to the selected data, defines the annotation points in the chart, including position, format, style, etc.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
MarkPoint selector, used to select data points.

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select dimension values; supports arrays

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

Key Capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Secure execution in browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Filter chart markers (bars, points, etc.) via AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User requirement description (natural language)

:::

**Example**
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart animated filter configuration



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via _ or R) are allowed

\- Input parameters: data (array), each item contains a __row_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

\- __row_index represents the original row number; field represents the field to highlight

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
\- Input parameters: data (array), each item contains a __row_index field representing the row number
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>
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

\- __row_index represents the row number of the original data item, and field represents the field to be illuminated
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
Fallback plan when code execution fails or environment is not supported

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select dimension values; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime

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
Select the value of the dimension field in the data item; supports arrays



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
Captured during the prepare() phase; read-only at runtime



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
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; generally set to 'right' to ensure the text is displayed on the left of the mark point and within the visible area of the chart.

Recommended to set to 'right' to ensure the text is on the left of the mark point.

right: Text is on the left of the mark point, aligned to the mark point by its right edge.

left: Text is on the right of the mark point, aligned to the mark point by its left edge.

center: Text is centered on the mark point.

:::

**Example**
Recommended to set as 'right' to ensure the text is on the left of the point.



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally set to 'top' to ensure the text is displayed below the mark point and within the visible area.

Recommended to set to 'top' to ensure the text is displayed completely within the visible area.

top: Text is below the mark point, its top edge aligned with the mark point.

middle: Text is vertically centered on the mark point.

bottom: Text is above the mark point, its bottom edge aligned with the mark point.

:::

**Example**
Recommended to set as 'top' to ensure the text is fully displayed within the chart area.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
middle: Text is centered on the point.



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
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Description}
Vertical offset distance of the annotation point. When the point is above the chart (high values), a positive value is recommended; when below (low values), a negative value is recommended.

A negative value offsets it upward (e.g., -10 pixels).

A positive value offsets it downward (e.g., 10 pixels).

:::

**Example**
offsetY: 5 (entire component shifts down by 5 pixels)



### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Horizontal offset distance of the annotation point. When the point is at the left (category axis start), a positive value is recommended; when at the right (category axis end), a negative value is recommended.

A negative value offsets it to the left (e.g., -10 pixels).

A positive value offsets it to the right (e.g., 10 pixels).

:::

**Example**
offsetY: 5, Annotation point overall offset down by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
The overall pixel offset of the annotation point in the X direction. When the point is on the left of the chart (start of the category axis), it is recommended to set it to a positive value. When on the right (end of the category axis), it is recommended to set a negative value.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed x-value for vertical mark lines; if the category axis is on the x-direction, you can enter a dimension value; if it's a numeric axis, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Calculate mark line value via AI-generated JavaScript code.

Suitable for cases where mark line positions need to be determined dynamically based on data, such as mean, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User requirement description (natural language)

:::

**Example**
Calculate the annotation line value dynamically via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic position determination based on data, such as mean, maximum, quantiles, or business lines.



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via _ or R) are allowed

\- Input parameters: data (array)

\- Must return a single numeric or string value: number | string

\- Applicable scenario: Dynamic values needed for mark lines (horizontal lines, vertical lines)

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
\- Input parameters: data (array)
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

\- Must return a single number or string: number | string
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

\- Applicable scenarios: Dynamic values needed for annotation lines (horizontal or vertical)
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests
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
Fallback plan when code execution fails or environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime

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
Fallback solution when code execution fails or the environment is not supported



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position, MarkLine's label position (relative to the line).

:::

**Example**
Captured during the prepare() phase; read-only at runtime



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
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; generally no need to set.

Recommended to set to 'right' to ensure the text is on the left of the mark line.

right: Text is on the left of the reference line, its right edge aligned with the (vertical) mark line.

left: Text is on the right of the reference line, its left edge aligned with the (vertical) mark line.

center: Text is centered on the reference line.

:::

**Example**
Recommended to set as 'right' to ensure text is on the left of the line.



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally no need to set.

Recommended to set to 'top' to ensure the text is displayed completely within the visible area.

top: Text is below the reference line, aligned to the endpoint of the (vertical) mark line by its top edge.

middle: Text is centered horizontally relative to the endpoint of the (vertical) mark line.

bottom: Text is above the reference line, aligned to the endpoint of the (vertical) mark line by its bottom edge.

:::

**Example**
Recommended to set as 'top' to ensure the text is fully displayed within the chart area.



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

:::

**Example**
middle: Text is centered on the reference line; the center of the text aligns with the (vertical) annotation line's end.



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
'red'



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
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4



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
Background border radius

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed y-value for horizontal mark lines; if the category axis is on the y-direction, you can enter a dimension value; if it's a numeric axis, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution)

Calculate mark line value via AI-generated JavaScript code.

Suitable for cases where mark line positions need to be determined dynamically based on data, such as mean, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User requirement description (natural language)

:::

**Example**
Calculate the annotation line value dynamically via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic position determination based on data, such as mean, maximum, quantiles, or business lines.



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via _ or R) are allowed

\- Input parameters: data (array)

\- Must return a single numeric or string value: number | string

\- Applicable scenario: Dynamic values needed for mark lines (horizontal lines, vertical lines)

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
\- Input parameters: data (array)
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

\- Must return a single number or string: number | string
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

\- Applicable scenarios: Dynamic values needed for annotation lines (horizontal or vertical)
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests
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
Fallback plan when code execution fails or environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime

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
Fallback solution when code execution fails or the environment is not supported



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position

MarkLine's label position (relative to the line).

:::

**Example**
Annotation text



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
Text position



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
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; generally no need to set.

Recommended to set to 'right' to ensure the text is on the left of the mark line.

right: Text is on the left of the reference line, its right edge aligned (horizontally) with the endpoint of the mark line.

left: Text is on the right of the reference line, its left edge aligned (horizontally) with the endpoint of the mark line.

center: Text is centered (horizontally) relative to the endpoint of the mark line.

:::

**Example**
Recommended to set as 'right' to ensure text is on the left of the line.



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally no need to set.

Recommended to set to 'top' to ensure the text is displayed completely within the visible area of the chart.

top: Text is below the reference line, its top edge aligned (horizontally) with the mark line.

middle: Text is centered (horizontally) relative to the mark line.

bottom: Text is above the reference line, its bottom edge aligned (horizontally) with the mark line.

:::

**Example**
Recommended to set as 'top' to ensure the text is fully displayed within the chart area.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
middle: Text is centered on the reference line; the center of the text aligns with the horizontal annotation line.



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
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
Background border width



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

:::

**Example**
Background border radius



### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
Background padding



### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width

:::

**Example**
Line visible



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style

:::

**Example**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Whether to enable the function to split the main line into two segments.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Main color for the portion greater than the mark value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Main color for parts less than the mark value

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Mark area configuration. Based on the selected data, defines chart annotation areas, including their position and style.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Depends on the selected data for marking.

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'

\- not in: Select data items where the dimension field value is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select dimension values; supports arrays

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
Operator



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
Text position

:::

**Example**
\- not in: Select data items where the value of the dimension field is not in 'value'



### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
Select the value of the dimension field in the data item; supports arrays



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
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; generally set to 'right' to ensure the text is displayed in the middle of the mark area and within the visible range.

Recommended to set to 'center' to ensure the text is in the center of the mark area.

right: Text is on the left of the mark area, its right edge aligned with the area.

left: Text is on the right of the mark area, its left edge aligned with the area.

center: Text is centered within the mark area.

:::

**Example**
'center' (Text in the middle of the annotation area)



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally set to 'top' to ensure the text is at the bottom of the mark area and within the visible range.

Recommended to set to 'top' to ensure the text is displayed completely within the visible area.

top: Text is at the bottom of the mark area, its top edge aligned with the area.

middle: Text is vertically centered within the mark area.

bottom: Text is at the top of the mark area, its bottom edge aligned with the area.

:::

**Example**
'top' (Text at the bottom of the annotation area)



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

:::

**Example**
Recommended to set as 'top' to ensure the text is fully displayed within the chart area.



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color
:::

**Example**
middle: Text is centered in the area.



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
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
Background border color



### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area region color

:::

**Example**
Background border width



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Mark area region color opacity

:::

**Example**
Background border radius



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area region border color

:::

**Example**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Mark area region border width

:::

**Example**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Mark area region border radius

:::

**Example**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Line type for the mark area region border

:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Margin for the mark area region

:::

**Example**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable the dimension linkage function when the chart has perspective enabled or measures are combined.

When hovering over certain dimension value(s), it highlights data with the same dimension values in other sub-charts.

Perspective chart dimension linkage configuration

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable perspective chart dimension linkage

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display tooltips for all dimension sub-charts

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display crosshair labels

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language
:::

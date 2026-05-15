# Line

:::info{title=Recommended}
- Recommended field configuration: `1` measure(s), `2` dimension(s)
- Supports Data Reshape: at least `1` measure(s), `0` dimension(s)
:::

:::info{title=Encoding Mapping}
The Line Chart supports the following visual channels:

`x`      : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension values.

`y`      : y-axis channel, supports `multiple measures`, mapped to the y-axis by measure values.

`color`  : color channel, supports `multiple dimensions` or `one measure`. Dimension colors are used to distinguish different data series, while measure colors are used for linear mapping of values to graphical colors.

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point.

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displaying data labels on data points.

:::

:::note{title=Description}
Line Chart, suitable for showing trends over time or ordered categories by connecting data points with line segments.

Applicable scenarios:

- Showing trends in time-series data.
- Comparing trends across multiple data series.
- Analyzing patterns of data growth or decline.

:::

:::warning{title=Warning}
Data requirements:

- At least 1 numeric field.
- The first dimension is placed on the X-axis; remaining dimensions are merged with measure names (when multiple measures exist) to serve as legend items.
- All measures are automatically merged into one measure.

Features enabled by default:

- Legend, axes, data point markers, tooltips, and trend lines are enabled by default.

:::


## chartType

**Type:** `"line"`

:::note{title=Description}
Line Chart, suitable for showing trends over time or ordered categories.

:::

**Example**
'line'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset. Compliant with TidyData specification and already aggregated, defines the chart's data source and structure. User input does not require pre-processing; VSeed features powerful Data Reshape capabilities that handle formatting automatically. Line Chart data is ultimately converted to 2 dimensions and 1 measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Dimensions. The first dimension of the Line Chart is mapped to the X-axis. Remaining dimensions are merged with measure names (if multiple measures exist) to serve as legend items.

:::

**Example**
[{id: "month", alias: "Month"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped:

- xAxis: supports mapping multiple dimensions to the x-axis

- color: supports mapping multiple dimensions to the color channel

- detail: supports mapping multiple dimensions to the detail channel

- tooltip: supports mapping multiple dimensions to the tooltip channel

- label: supports mapping multiple dimensions to the label channel

- row: supports mapping multiple dimensions to the row channel

- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Description}
Measures. All measures in a Line Chart are automatically merged into one measure and mapped to the Y-axis. When multiple measures exist, measure names are merged with remaining dimensions to serve as legend items.

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
Automatic number formatting, enabled by default, highest priority.

When autoFormat=true, it overrides all numFormat configurations.

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale.

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips.

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this configuration.

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
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

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
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the measure is mapped:

- yAxis: measure mapped to the y-axis

- detail: measure mapped to the detail channel

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
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is providing a flat measure list with parentId. These two methods cannot be used simultaneously.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination configuration.

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

**Type:** `Label | undefined`

:::note{title=Description}
Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether label functionality is enabled.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure value percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension names.

Displays all dimension labels.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted. When autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

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
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Label font weight.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Label background color.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Label stroke (outline) color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label font color.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default condition relationship between selectors is OR.

:::


#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selective dimension values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering logic via AI-generated JavaScript code.

Key capabilities:

- Supports any complex data filtering conditions.

- Uses built-in utility functions for data operations.

- Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration for the chart dynamic filter.

Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

- Can only use built-in utility functions (access via _ or R).

- Input parameter: data (array); each item includes a __row_index field representing the row number.

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight 'sales' field for data items where sales > 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight data items with the highest profit margin in each region:
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

Highlight data items meeting multiple filtering conditions:
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
Fallback plan when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selective dimension values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

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
Legend configuration, used to define the chart's legend, including position, format, and style.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend functionality is enabled.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled.

:::

:::warning{title=Warning}
Only effective for discrete legends.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon disabled color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Legend shape.

:::

:::warning{title=Warning}
Only effective for discrete legends.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position.

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows for the legend when many items exist.

If position is horizontal (bottom, top, etc.), maxSize controls the number of columns.
If position is vertical (left, right, etc.), maxSize controls the number of rows.

:::

:::warning{title=Warning}
Only effective for discrete legends.

:::

**Example**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Description}
Chart region padding



Maps to VChart region[0].padding, used to reserve space for annotations, labels, and other elements that extend outside the chart region.

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

:::note{title=Description}
Tooltip configuration, used to define the chart's tooltips, including position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltip functionality is enabled.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush configuration, used to enable/disable region selection capabilities.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether region selection is enabled.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type. Defines the selection box shape and direction:

- `rect`: Rectangular selection, allows selecting in both X and Y directions.

- `polygon`: Polygon selection, allows drawing arbitrary shapes by clicking multiple points.

- `x`: Horizontal selection, restricts selection to the X-axis direction.

- `y`: Vertical selection, restricts selection to the Y-axis direction.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Selection mode, single or multiple. Defines the selection logic:

- `single`: Single selection mode, only one selection box can exist at a time.

- `multiple`: Multiple selection mode, multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear selection boxes after region selection ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data within the selected region.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for selected data points, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data outside the selected region.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for data points outside the selection, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width.

:::


## animation

**Type:** `LineAreaAnimation | undefined`

:::note{title=Description}
Animation configuration



Chart animation configuration, with available effects constrained by chart type.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable line/area chart animation

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=Description}
Line/area chart animation parameters

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=Description}
Line/area chart appear animation configuration

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=Description}
Line/area chart appear effects, supporting load and growth animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the current animation stage

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

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=Description}
Line/area chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Line/area chart update effects, supporting growth animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the current animation stage

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

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=Description}
Line/area chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable loop animation

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### loop

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=Description}
Line/area chart loop animation configuration

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=Description}
Line/area chart loop effects

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the current animation stage

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

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Line/area chart atmosphere animation configuration

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
Atmosphere animation effect, supporting ripple, fade, and breath effects

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
X-axis configuration (discrete axis), used to define the chart's X-axis, including position, format, and style.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is inverted; only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the axis to include 0. Overridden by `min` and `max` configurations; only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically hide labels on overlap. If two labels overlap (distance less than `autoHideGap`), the label causing overlap is hidden. Only effective for discrete axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Gap for automatic label hiding. If the gap between two text labels is less than `autoHideGap`, the label causing overlap is hidden. Only effective for discrete axes.

When `autoHide` is enabled, this sets `autoHideSeparation`.
When `autoHide` is disabled, this sets the minimum gap for sampling.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically rotate labels when their width exceeds the axis length. Only effective for discrete axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Rotation angle range for automatically rotated labels. Only effective for discrete axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically limit label length. When a label exceeds the length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Maximum length for automatically limited labels. When a label exceeds this length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick labels.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis ticks.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to following field configurations.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid lines.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line pattern.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration.

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
Y-axis configuration (numeric axis), used to define the chart's Y-axis, including position, format, and style.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis; higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis; higher priority than nice and zero. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic scale; only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base for the logarithmic scale; only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust axis tick intervals for better readability. Overridden by min and max configurations; only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is inverted; only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the axis to include 0. Overridden by min and max configurations; only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format axis tick labels; only effective for numeric axes. When autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Numerical formatting for the axis; only effective for numeric axes. Lower priority than autoFormat.

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
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"



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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Y-axis tick labels.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Y-axis line.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Y-axis ticks.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Y-axis title.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to following field configurations.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Y-axis grid lines.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line pattern.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration.

:::


#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.

:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Vertical crosshair line.

A vertical line displayed when hovering over the chart to show precise values.

Crosshair line configuration, a type for displaying crosshairs (indicator lines) in charts.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair line.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line label color.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair line label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line label background color.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Description}
X-axis sorting configuration, supports sorting by dimensions or measures, as well as custom sort orders.

Discrete axis sorting configuration.

:::

**Example**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

- order:'asc'
- orderBy:'date'
OR
- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sorting order, can be 'asc' or 'desc'.

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field sorting relies on. Can be a dimension ID or measure ID.

:::

**Example**
- orderBy:'date'
- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order to be applied directly to the discrete axis.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sorting configuration. Supports sorting by dimensions or measures, and custom sort orders.

Sorting follows the order from left-to-right or top-to-bottom.

:::

**Example**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

- order:'asc'
- orderBy:'date'
OR
- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sorting order, can be 'asc' or 'desc'.

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field sorting relies on. Can be a dimension ID or measure ID.

:::

**Example**
- orderBy:'date'
- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order applied directly to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Themes are low-priority configurations containing general settings shared across all chart types and specific settings shared within a chart category.

Light and dark themes are built-in; users can define custom themes via the Builder.

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
Point style configuration. Used to define the style of data points in the chart, including colors, borders, etc.

Supports global styling or conditional styling based on selectors.

If conditional selectors are provided, the style maps to matching data. Otherwise, styles apply globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

**Example**
Value Selector:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Partial Data Selector:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional Dimension Selector:
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

Conditional Measure Selector:
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
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator (same as operator).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Dimension values for selection; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering via AI-generated JavaScript code. Useful for scenarios like Top N, statistical analysis, or complex conditions that static selectors cannot express.

Key capabilities:

- Supports any complex data filtering conditions.

- Uses built-in utility functions for data operations.

- Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."



#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

- Can only use built-in utility functions (access via _ or R).

- Input parameter: data (array); each item includes a __row_index field representing the row number.

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight 'sales' field for data items where sales > 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight data items with the highest profit margin in each region:
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

Highlight data items meeting multiple filtering conditions:
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
Fallback plan when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator (same as operator).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Dimension values for selection; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

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
Whether data points are visible.

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Point size.

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Point color.

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Point color opacity.

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Point border color.

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point border width.

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Point border style.

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line element style configuration, used to define the style for chart line elements, including colors, opacity, curves, etc.

Supports global styles or conditional style configurations.

Data filter.

If a selector is configured, it provides four types of data matching: numeric selector, partial data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style applies globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If a selector is configured, it provides four types of data matching: numeric selector, partial data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style applies globally.

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

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select dimension values; supports arrays

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
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"



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

same as operator

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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line segment is visible

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line segment is smooth

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line segment color

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Line segment opacity

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line segment width

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line segment style

:::

**Example**
`lineStyle: 'solid'`




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

same as operator

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
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"



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

same as operator

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
'Annotation text'



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
Text alignment; generally set to 'right' to ensure the text is displayed on the left of the mark point and within the visible area of the chart.

Recommended to set to 'right' to ensure the text is on the left of the mark point.

right: Text is on the left of the mark point, aligned to the mark point by its right edge.

left: Text is on the right of the mark point, aligned to the mark point by its left edge.

center: Text is centered on the mark point.

:::

**Example**
'right' Text is on the left of the mark point



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
'top' Text is below the mark point



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



### offsetY

**Type:** `number | undefined`

:::note{title=Description}
Vertical offset distance of the annotation point. When the point is above the chart (high values), a positive value is recommended; when below (low values), a negative value is recommended.

A negative value offsets it upward (e.g., -10 pixels).

A positive value offsets it downward (e.g., 10 pixels).

:::

**Example**
offsetY: 5, MarkPoint offset down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Horizontal offset distance of the annotation point. When the point is at the left (category axis start), a positive value is recommended; when at the right (category axis end), a negative value is recommended.

A negative value offsets it to the left (e.g., -10 pixels).

A positive value offsets it to the right (e.g., 10 pixels).

:::

**Example**
offsetX: 5, MarkPoint offset right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Dimension value mark line, displayed vertically; allows setting the position and style of the mark line.

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
"Get the highest sales value as mark line reference"

"Calculate average sales for mark line"



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
Get the highest sales value as mark line value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for mark line
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile for mark line
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate Goal value based on conditions
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
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position, MarkLine's label position (relative to the line).

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
'right'



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
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

:::

**Example**
true



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
Numeric mark line (including mean, maximum, minimum, etc.), displayed horizontally. Allows setting the position and style of the mark line. Use this configuration if you need to draw mark lines corresponding to specific values like the mean.

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
"Get the highest sales value as mark line reference"

"Calculate average sales for mark line"



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
Get the highest sales value as mark line value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for mark line
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile for mark line
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate Goal value based on conditions
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
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position

MarkLine's label position (relative to the line).

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
'right'



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
'top'



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



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

:::

**Example**
true



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
Mark area

Mark area configuration, according to the selected data, defines the annotation areas in the chart, including position and style.

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

same as operator

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
'Annotation text'



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
'center' Text is in the middle of the mark area



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
'top' Text is at the bottom of the mark area



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



### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area region color

:::

**Example**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Mark area region color opacity

:::

**Example**
0.5



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




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Description}
Difference annotation line



Draws a difference annotation line from two selected data points and automatically calculates the difference text.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Description}
Start anchor for the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Description}
Anchor selector, which must ultimately locate a logical anchor.

:::

**Example**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the id of one item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: select data items whose dimension field value is in value

\- not in: select data items whose dimension field value is not in value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: select data items whose dimension field value is in value

\- not in: select data items whose dimension field value is not in value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field used to select data items; arrays are supported

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Description}
End anchor for the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Description}
Anchor selector, which must ultimately locate a logical anchor.

:::

**Example**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the id of one item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: select data items whose dimension field value is in value

\- not in: select data items whose dimension field value is not in value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: select data items whose dimension field value is in value

\- not in: select data items whose dimension field value is not in value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field used to select data items; arrays are supported

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Description}
Difference value type.

\- absolute: show the absolute difference, calculated as end \- start

\- percent: show the percentage difference, calculated as (end \- start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Text background color.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color.

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style.

:::


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
Locale. Chart language configuration; supports 'zh-CN' and 'en-US'. Alternatively, call intl.setLocale('zh-CN') to set the language.

:::

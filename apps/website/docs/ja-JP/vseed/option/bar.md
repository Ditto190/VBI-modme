# Bar

:::info{title=推奨}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=エンコードマッピング}
Bar Chart supports the following visual channels:

`yAxis`  : y-axis channel, supports `multiple dimensions`, mapped to the y-axis by dimension value

`xAxis`  : x-axis channel, supports `multiple measures`, mapped to the x-axis by measure value

`detail` : detail channel, supports `multiple dimensions`, used to display finer-grained data within the same color series

`color`  : color channel, supports `multiple dimensions` or `one measure`; dimension color distinguishes series and measure color maps values to mark colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over a data point

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=説明}
Bar Chart is suitable for horizontal data comparison scenarios. The Y-axis is the category axis (categorical data), the X-axis is the numeric axis (continuous data), and bars are arranged horizontally.

Applicable scenarios:

\- When data item names are long

\- When data ranking comparisons need to be displayed

\- Displaying positive and negative bidirectional data

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure(s)

\- The first dimension will be placed on the Y-axis. Remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into a single measure.

Features enabled by default:

\- Legend, axes, data labels, and tooltips are enabled by default.

:::


## chartType

**Type:** `"bar"`

:::note{title=説明}
Bar Chart is suitable for horizontal data comparison scenarios. The Y-axis is the category axis (categorical data), the X-axis is the numeric axis (continuous data), and bars are arranged horizontally.

:::

**例**
'bar'




## dataset

**Type:** `Record[]`

:::note{title=説明}
Data source: A TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User input datasets do not require any preprocessing; VSeed includes a powerful Data Reshape feature that automatically performs reshaping. Bar chart data will finally be converted to 2 dimensions and 1 measure.

:::

**例**
[{date:'2020\-01\-01', value:100}, {date:'2020\-01\-02', value:200}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=説明}
Dimensions: The first dimension is mapped to the Y-axis. Remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

:::

**例**
[{id: "date", alias: "Date"}, {id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=説明}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=説明}
Dimension date format configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=説明}
Time granularity, determines date display precision

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=説明}
Channel to which the dimension is mapped

\- yAxis: Supports mapping multiple dimensions to the Y-axis

\- color: Supports mapping multiple dimensions to the color channel

\- detail: Supports mapping multiple dimensions to the detail channel

\- tooltip: Supports mapping multiple dimensions to the tooltip channel

\- label: Supports mapping multiple dimensions to the label channel

\- row: Supports mapping multiple dimensions to the row channel

\- column: Supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=説明}
Measures



Measures: Bar chart measures are automatically merged into a single measure and mapped to the X-axis. When multiple measures exist, measure names are merged with remaining dimensions and displayed as legend items.

:::

**例**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=説明}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
Measure alias, duplicates allowed; when not set, alias defaults to ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
Automatic numeric formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations.

Once enabled, chart data labels and tooltips will automatically select appropriate formatting based on measure values and locale.

Formatting rules: Decimal numbers, compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

\- locale='zh-CN': 749740.264 -> 744.5K

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
Custom numeric formatting for measures; automatically applied to labels and tooltips.

Note: To use custom formatting, autoFormat must be explicitly set to false; otherwise, autoFormat will override this configuration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g., %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g., %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=説明}
Channel to which the measure is mapped

\- xAxis: Measure mapped to the X-axis

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
Builds a tree-shaped measure group in flat measure configuration form. parentId points to the ID of the parent measure group, used for building the measure tree.

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously.

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
Pagination



Pagination configuration for the chart's pagination feature.

:::


### field

**Type:** `string`

:::note{title=説明}
Pagination field; specifies the field name for pagination, must be a dimension.

:::

### currentValue

**Type:** `string`

:::note{title=説明}
Current pagination value; specifies the value used to determine the current page.

:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
Chart background color. Defaults to transparent background. Background color can be a color string (e.g., 'red', 'blue') or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=説明}
Color



Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
Discrete color scheme used to define the colors of different elements in the chart.

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
Color mapping used to map data values to specific colors.

:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
Positive/negative color configuration; defines the color for positive values in the chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
Positive/negative color configuration; defines the color for negative values in the chart.

:::


## label

**Type:** `Label | undefined`

:::note{title=説明}
Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=説明}
Whether label functionality is enabled.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display measure values as percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display dimension labels.

Displays all dimension labels.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
Label value format configuration; merged with the `format` in `measure`, where the `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g., %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=説明}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the label font color automatically inverts based on the element's color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
Label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
Whether label overlap handling is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
Label selection; conditions between selectors default to OR.

:::


#### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
Dynamic Filter (AI-generated code execution)



Implement complex data filtering logic via AI-generated JavaScript code.



Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



Chart Dynamic Filter configuration.



Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
User's filtering requirement description (natural language).

:::

**例**
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=説明}
AI-generated JavaScript filtering code.



\- Use only built-in utility functions (access via _ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**例**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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

:::note{title=説明}
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
Dynamic filter execution result (runtime field).



Written during the prepare() phase; read-only at runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=説明}
Legend configuration, used to define the chart's legend, including its position, format, and style.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the legend feature is enabled.

:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the legend border is enabled.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**例**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Legend font color.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
Legend font size.

:::

**例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}
Legend font weight.

:::

**例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}
Legend shape type.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**例**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}
Legend position

:::

**例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=説明}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**例**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=説明}
Tooltip configuration, used to define the chart's tooltips, including their position, format, and style.



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

:::note{title=説明}
\- `rect`: Rectangular selection; selection can be made in both X and Y directions simultaneously.

:::


### enable

**Type:** `false | true`

:::note{title=説明}
Whether tooltip is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
Defines the shape and direction of the selection box.



\- `polygon`: Polygonal brush; allows drawing an arbitrary polygon by clicking multiple points.



\- `y`: Y-axis brush; selects only in the Y-axis direction, unrestricted on the X-axis.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Define the style of data points that are selected.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
brushtype



Opacity

Opacity of the selected data points, ranging from 0 to 1

\- `polygon`: polygon brush selection; click multiple points to draw any polygon for selection

\- `x`: brush selection in the X-axis direction only; the Y-axis direction is unrestricted

Stroke color

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
Opacity of selected data points, range 0-1



Style for unselected data items

Defines the style of data points outside the selected brush area

\- `multiple`: multiple selection mode; multiple brush regions can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to clear the brush region after brushing ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
Opacity of unselected data points, ranging from 0 to 1



Defines the style of brushed data points

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
Style for data NOT selected by the brush.



Defines the style of data points outside the selection.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Defines the style of data points outside the brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
Style for data NOT selected by the brush.



Opacity of data points outside the brush selection, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
Stroke width

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=説明}
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.



When autoHide is disabled, use sampling, configured on minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Whether bar/column chart animation is enabled

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=説明}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=説明}
Whether to display the axis in reverse; applies only to numeric axes.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
Label color

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
Label font weight

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation.

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
Number format ratio, cannot be 0.

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=説明}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=説明}
**Example**

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
Label font weight

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation.

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
Number format ratio, cannot be 0.

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=説明}
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Tick size

:::

##### interval

**Type:** `number | undefined`

:::note{title=説明}
\- 1234.5678 converted to 1230, significantDigits:3

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=説明}
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=説明}
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=説明}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

###### ease

**Type:** `string | undefined`

:::note{title=説明}
Label font weight

:::

###### duration

**Type:** `number | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation.

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
Number format ratio, cannot be 0.

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=説明}
Atmosphere animation effect; supports ripple, fade, and breathe

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=説明}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Axis line color

:::

### min

**Type:** `number | undefined`

:::note{title=説明}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to use a logarithmic axis; only applies to numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to automatically adjust axis tick intervals for more readable tick labels. This option is disabled when min and max are configured, and only applies to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X-axis animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to automatically format numeric-axis tick labels. Only applies to numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
Number formatting for numeric axes. Only applies to numeric axes and has lower priority than autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g., %, ‰

:::

**例**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=説明}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=説明}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=説明}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**例**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**例**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=説明}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**例**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Number formatting for numeric axes. Only effective for numeric axes. Lower priority than `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
Sort order; can be 'asc' or 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
Title text. By default it follows the field configuration.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
Supports global styles or conditional style configurations.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
}

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=説明}
Y-axis category-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Axis line color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
X-axis animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=説明}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Number formatting for numeric axes. Only effective for numeric axes. Lower priority than `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=説明}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
\- 100000 converts to 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}
Sort order; can be 'asc' or 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}
Title text. By default it follows the field configuration.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
Supports global styles or conditional style configurations.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=説明}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=説明}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to show the crosshair rectangular-area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=説明}
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=説明}
Implement filtering of chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
Y-axis sort configuration. Supports sorting by dimensions or measures and custom sort order.



Description of the user's filtering requirements (natural language)

:::

**例**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
Chart Dynamic Filter configuration.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
])

:::

**例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=説明}
Highlight the data item with the highest profit rate in each region

:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}
return _.map(filtered, item => ({



Chart dynamic filter configuration

:::

**例**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
Chart Dynamic Filter configuration.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=説明}
])

:::

**例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=説明}
Highlight the data item with the highest profit rate in each region

:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
Custom sort order. The order is applied directly to the legend. Ascending order goes left-to-right or top-to-bottom; descending order goes right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
Chart theme. Theme is a lower-priority feature configuration that includes common settings shared by all chart types and settings shared by a single chart type. Built-in themes include light and dark, and users can customize themes through Builder.



Operator



\- not in: Select data items where the dimension field value is NOT in the value list.

:::

**例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=説明}
Rectangle mark style. Bar chart style configuration used to define bar color, border, corner radius, and related settings.

Whether the bar primitive (rectangle) is visible

Bar element (rectangle) border color

Bar element (rectangle) border style

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
value: 100



Bar element (rectangle) border style

**Example**

:::

**例**
dashed
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

**Example**
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

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
Dynamic Filter (AI-generated code execution)



Implement complex data filtering logic via AI-generated JavaScript code.

\- not in: Select data items where the value of the dimension field is not in the value



Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



Chart Dynamic Filter configuration.



Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
User's filtering requirement description (natural language).

:::

**例**
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=説明}
AI-generated JavaScript filtering code.



\- Use only built-in utility functions (access via _ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**例**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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

:::note{title=説明}
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
Dynamic filter execution result (runtime field).



Written during the prepare() phase; read-only at runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the bar mark (rectangle mark) is visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=説明}
Written during the prepare() phase; read-only at runtime.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=説明}
Border color of the bar mark (rectangle mark)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
'Annotation Text'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
Text color.

:::

**例**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=説明}
**Example**



Text font size

:::

**例**
4

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
Text vertical alignment; generally set to 'top' so the text appears below the point, ensuring visibility within the chart area.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
Selector for annotation points, used to select data points.

:::


#### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### measureId

**Type:** `string | undefined`

:::note{title=説明}
Specifies the measure id that the annotation point belongs to. In multi-measure scenarios, it can be combined with selector to uniquely locate the annotation point for the target measure.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
Dynamic Filter (AI-generated code execution)



Implement complex data filtering logic via AI-generated JavaScript code.

\- not in: Select data items where the value of the dimension field is not in the value



Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



Chart Dynamic Filter configuration.



Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
User's filtering requirement description (natural language).

:::

**例**
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=説明}
AI-generated JavaScript filtering code.



\- Use only built-in utility functions (access via _ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**例**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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

:::note{title=説明}
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}
Dynamic filter execution result (runtime field).



Written during the prepare() phase; read-only at runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
Written during the prepare() phase; read-only at runtime.

:::

**例**
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
**Example**

Recommended value is 'right', which keeps the text on the left side of the annotation point.

Text font size.

Text color

**Example**

:::

**例**
'right': text is on the left side of the annotation point



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**Example**

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

middle: Text is centered on the reference line; the center aligns with the endpoint of the (vertical) annotation line.

bottom: Text is at the top of the reference line; the bottom edge aligns with the endpoint of the (vertical) annotation line.

'right'

:::

**例**
'top': text is below the annotation point



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**Example**

:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the end of the (vertical) annotation line.

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
2

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

**例**
4



### offsetY

**Type:** `number | undefined`

:::note{title=説明}
Pixel offset of the whole annotation point in the Y direction. Use a positive value when the annotation point is above the chart, and a negative value when it is below the chart.

**Example**

Whether the background is visible.

:::

**例**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=説明}
Background color.

A negative value moves the whole component left. For example, -10 moves the whole annotation point, including text and text background, left by 10 pixels.

**Example**

:::

**例**
offsetX: 5, moves the whole annotation point right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
'red'

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
Dynamic Filter (AI-generated code execution)



Background border corner radius.

Annotation area configuration; defines marker areas on the chart based on selected data, including their position, style, etc.



Whether to enable the function to split the main line into two segments.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
User's filtering requirement description (natural language).

:::

**例**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=説明}
AI-generated JavaScript filtering code.



\- Use only built-in utility functions (access via _ or R).

Annotation area

Operator

Annotation area configuration; defines an area on the chart based on selected data, including its position, style, etc.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**例**
\- not in: Select data items where the value of the dimension field is not in the value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Select the value of the dimension field in the data item; supports arrays
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

**Example**
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=説明}
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
Dynamic filter execution result (runtime field).



Written during the prepare() phase; read-only at runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
Written during the prepare() phase; read-only at runtime.

:::

**例**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
_.filter(data, item => item.year === 2024),

:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
left: Text is to the right of the annotation area, with the left edge aligned with the area.

center: Text is centered in the annotation area.

Text color.

Annotation line label position (relative position of the label to the line).

**Example**

:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**Example**

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

Text alignment; typically does not need to be set.

'top'

right: Text is on the left side of the reference line, with the right edge of the text aligned to the end point of the (horizontal) annotation line.

:::

**例**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
Annotation area color opacity.

:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
**Example**

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
Annotation area border corner radius.

:::

**例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**Example**

:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the end of the (vertical) annotation line.

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
2

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

**例**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=説明}
Dimension-value annotation line, displayed horizontally. It can configure the annotation line position, style, and related settings.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}
**Example**

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
Dynamic Filter (AI-generated code execution)



Background border corner radius.

Annotation area configuration; defines marker areas on the chart based on selected data, including their position, style, etc.



Whether to enable the function to split the main line into two segments.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}
User's filtering requirement description (natural language).

:::

**例**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=説明}
AI-generated JavaScript filtering code.



\- Use only built-in utility functions (access via _ or R).

Annotation area

Operator

Annotation area configuration; defines an area on the chart based on selected data, including its position, style, etc.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**例**
\- not in: Select data items where the value of the dimension field is not in the value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Select the value of the dimension field in the data item; supports arrays
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

**Example**
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=説明}
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}
Dynamic filter execution result (runtime field).



Written during the prepare() phase; read-only at runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
Written during the prepare() phase; read-only at runtime.

:::

**例**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
**Example**



Label position of the annotation line, relative to the line.

:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
left: Text is to the right of the annotation area, with the left edge aligned with the area.

center: Text is centered in the annotation area.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

**Example**

background color

:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**Example**

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

background stroke color

**Example**

**Example**

:::

**例**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**Example**

:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the end of the (vertical) annotation line.

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
2

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
4



4

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

**例**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
Annotation area color opacity.



Annotation area color opacity.

:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
**Example**

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
Annotation area border corner radius.

:::

**例**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=説明}
Line dash style of the annotation area border.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
Primary color for the part greater than the annotation value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
Line style.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
Whether to enable the dimension linkage function when the chart has perspective enabled or when measures are combined.

:::


#### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
Written during the prepare() phase; read-only at runtime.

:::

**例**
'annotationtext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=説明}
**Example**

:::

**例**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=説明}
0

:::

**例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=説明}
Polynomial regression line configuration, including the polynomial order, regression line style, etc.

Recommended value is 'center', which keeps the text in the middle of the annotation area.

right: text is on the left side of the annotation area; the right edge of the text aligns with the annotation area

left: text is on the right side of the annotation area; the left edge of the text aligns with the annotation area

center: text is centered in the annotation area; the center of the text aligns with the annotation area

:::

**例**
'center': text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
Text vertical alignment. Generally set it to top so text appears at the bottom of the annotation area and remains inside the visible chart area.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**例**
'top': text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}
**Example**

:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
top: Text is below the reference line, with the top edge aligned with the end of the (vertical) annotation line.

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
2



2

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
4

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
4



4

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
**Example**

:::

**例**
4



### areaColor

**Type:** `string | undefined`

:::note{title=説明}
Annotation area fill color

:::

**例**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
Annotation area fill opacity

:::

**例**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=説明}
Annotation area border color

:::

**例**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
Annotation area border width

:::

**例**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
Annotation area border radius

:::

**例**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
Annotation area border line style

:::

**例**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=説明}
Annotation area padding

:::

**例**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=説明}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=説明}
Start anchor of the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=説明}
Anchor selector. It must ultimately locate one logical anchor.

:::

**例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=説明}
End anchor of the difference annotation line.



Difference annotation anchor configuration, used to select the data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=説明}
Anchor selector. It must ultimately locate one logical anchor.

:::

**例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=説明}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}
Selected dimension field values; supports arrays.

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=説明}
Difference value type.

\- absolute: display the absolute difference, calculated as end - start

\- percent: display the percentage difference, calculated as (end - start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
textfontsize.

:::

### textColor

**Type:** `string | undefined`

:::note{title=説明}
textcolor.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
Text background color.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
Line color.

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
Line style.

:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
Whether to enable dimension linkage when the chart uses pivot mode or measure combinations.

When hovering a dimension value, highlight data with the same dimension value in other linked charts.



Pivot chart dimension linkage configuration

:::


### enable

**Type:** `false | true`

:::note{title=説明}
Whether pivot chart dimension linkage is enabled

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to show Tooltip information for subcharts corresponding to all dimensions

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to show the label corresponding to the crosshair

:::


## locale

**Type:** `Locale | undefined`

:::note{title=説明}
Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::


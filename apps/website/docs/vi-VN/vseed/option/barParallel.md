# BarParallel

:::info{title=Khuyen nghi}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Anh xa ma hoa}
Parallel bar charts support the following visual channels:

`yAxis`  : y-axis channel, supports`multiple dimensions`, mapped to the y-axis by dimension value

`xAxis`  : x-axis channel, supports`multiple measures`, mapped to the x-axis by measure value

`detail` : Detail channel; supports `multiple dimensions`; used to display finer-grained data within the same color series.

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Mo ta}
Parallel bar chart, suitable for horizontal parallel comparison scenarios of multiple measures, where multiple bars are sorted in parallel to display different measure values.

Applicable scenarios:

- Multi-measure comparison when category names are long.

- Horizontal comparison displaying ranking and values simultaneously.

- Parallel analysis of multi-dimensional data.

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure field

- The first dimension is placed on the Y-axis, while other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

- Legend, axes, data labels, and tooltips are enabled by default.

:::


## chartType

**Type:** `"barParallel"`

:::note{title=Mo ta}
Parallel bar chart, suitable for horizontal parallel comparison of multiple measures.

:::

**Example**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Data source; an aggregated dataset conforming to the TidyData specification, used to define the chart's data source and structure. Users don't need to process the dataset beforehand as VSeed features powerful data reshaping capabilities to automatically handle it; parallel bar chart data will eventually be converted to 2 dimensions and 1 measure.

:::

**Example**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Mo ta}
Dimensions; the first dimension is mapped to the Y-axis, while other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Mo ta}
Channel to which the dimension is mapped

- yAxis: Supports mapping multiple dimensions to the Y-axis.

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Mo ta}
Measures; parallel bar chart measures are automatically merged into one measure and mapped to the X-axis. When multiple measures exist, measure names are merged with other dimensions to be displayed as legend items.

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Mo ta}
Channel to which the measure is mapped

\- xAxis: measure mapped to the x-axis

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
Pagination



Pagination configuration for the chart's pagination feature

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
Chart background color; defaults to a transparent background. Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

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
Continuous color scheme

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mo ta}
Color mapping used to map data values to specific colors.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Positive/negative color configuration; defines the color for positive values in the chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Positive/negative color configuration; defines the color for negative values in the chart.

:::


## label

**Type:** `Label | undefined`

:::note{title=Mo ta}
Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Whether labels display measure values

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display measure values as percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether labels display dimension labels.

Displays all dimension labels.

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}
Label value format configuration; merged with the `format` in `measure`, where the `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

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
selector = {

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
}

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
Whether the label font color automatically inverts based on the element's color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}
Label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether label overlap handling is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
Label selection; conditions between selectors default to OR.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
- center: Text is centered on the point.



'right' (text is on the left side of the point)



"Highlight the bar with the highest profit margin in each region"

Line visibility.

\- Uses built-in utility functions for data manipulation.

true



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



**Example**



Background visibility.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
const maxItems = _.map(grouped, group =>

:::

**Example**
    { __row_index: item.__row_index, field: 'product' },

  ])



#### code

**Type:** `string`

:::note{title=Mo ta}
});



    { __row_index: item.__row_index, field: 'sales' }

);

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

**Example**

:::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

4
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

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language).



"Get the highest sales value as the annotation line reference"

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
Legend configuration, used to define the chart's legend, including its position, format, and style.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the legend feature is enabled.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the legend border is enabled.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Example**
Legend font weight



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend font color.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Legend font size.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Legend font weight.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}
Legend shape type.

:::

:::warning{title=Warning}
Applies only to discrete legends.

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
- `rect`: Rectangular brush, allows selection along both X and Y axes simultaneously.

- `polygon`: Polygonal brush, allows selection of an arbitrary polygon by clicking multiple points.

- `x`: X-axis brush, restricts selection to the horizontal direction.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Example**
Brush mode; defines whether single or multiple areas can be selected.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
\- `rect`: Rectangular selection; selection can be made in both X and Y directions simultaneously.

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Whether tooltip is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Defines the shape and direction of the selection box.



\- `polygon`: Polygonal brush; allows drawing an arbitrary polygon by clicking multiple points.



\- `y`: Y-axis brush; selects only in the Y-axis direction, unrestricted on the X-axis.

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
Opacity of selected data points, range 0-1



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
\- 100000 converts to 10W, ratio:10000, symbol:"W"



Defines the style of data points outside the selection.

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
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Defines the style of data points outside the brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 converts to 10W, ratio:10000, symbol:"W"



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
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.



When autoHide is disabled, use sampling, configured on minGap

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

**Type:** `XLinearAxis | undefined`

:::note{title=Mo ta}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

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
X-axis ticks

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
Whether the axis is visible.

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
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
selector = {

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
}

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
Selected dimension field values; supports arrays.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Sort order; can be 'asc' or 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
}));

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
return _.flatten(

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

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
sort: {

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}
- orderBy: 'date'

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Mo ta}
Y-axis category-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Axis line color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the axis is visible.

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

- orderBy: 'date'

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
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
selector = {

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
}

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
Selected dimension field values; supports arrays.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}
  order: 'asc',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Sort order; can be 'asc' or 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
}));

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
return _.flatten(

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

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
sort: {

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}
- orderBy: 'date'

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mo ta}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Bar color

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mo ta}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Operator

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
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Implement filtering of chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Distance between rectangles in the same category. It can be a pixel value or a percentage string.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mo ta}
Y-axis sort configuration. Supports sorting by dimensions or measures and custom sort order.



Selector for the annotation point, used to pick data items.

:::

**Example**
Dimension field ID (the `id` of an item in `dimensions`).
  orderBy: 'profit',
  order: 'asc',
}
Dimension field ID (the `id` of an item in `dimensions`).
  customOrder:['2019', '2020', '2021']
}

User's filtering requirement description (natural language).
return _.map(filtered, item => ({
Chart Dynamic Filter configuration.
**Example**




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mo ta}
])

:::

**Example**
- in: Select data items where the dimension field value is within the `value` array.



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}
Highlight the data item with the highest profit rate in each region

:::

**Example**
return _.map(filtered, item => ({
  __row_index: item.__row_index,



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
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

User's filtering requirement description (natural language).
return _.map(filtered, item => ({
Chart Dynamic Filter configuration.
**Example**




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mo ta}
])

:::

**Example**
- in: Select data items where the dimension field value is within the `value` array.



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}
Highlight the data item with the highest profit rate in each region

:::

**Example**
return _.map(filtered, item => ({
  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Highlight data items meeting multiple conditions:



  return profitRate > 0.2 && item.sales > 5000;



    { __row_index: item.__row_index, field: 'product' },

:::

**Example**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mo ta}
Rectangle mark style. Bar chart style configuration used to define bar color, border, corner radius, and related settings.

Operator

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
dashed
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
Dynamic filter execution result (runtime field)
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

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
- center: Text is centered on the point.



'right' (text is on the left side of the point)

\- not in: Select data items where the value of the dimension field is not in the value



"Highlight the bar with the highest profit margin in each region"

Line visibility.

\- Uses built-in utility functions for data manipulation.

true



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



**Example**



Background visibility.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
const maxItems = _.map(grouped, group =>

:::

**Example**
    { __row_index: item.__row_index, field: 'product' },

  ])



#### code

**Type:** `string`

:::note{title=Mo ta}
});



    { __row_index: item.__row_index, field: 'sales' }

);

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

**Example**

:::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

4
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

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language).



"Get the highest sales value as the annotation line reference"

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
Whether the bar mark (rectangle mark) is visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Example**

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Border color of the bar mark (rectangle mark)

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



Text font size

:::

**Example**
Annotation text.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mo ta}
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
Written during the `prepare()` phase, read-only at runtime.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

### measureId

**Type:** `string | undefined`

:::note{title=Mo ta}
Specifies the measure id that the annotation point belongs to. In multi-measure scenarios, it can be combined with selector to uniquely locate the annotation point for the target measure.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
- center: Text is centered on the point.



'right' (text is on the left side of the point)

\- not in: Select data items where the value of the dimension field is not in the value



"Highlight the bar with the highest profit margin in each region"

Line visibility.

\- Uses built-in utility functions for data manipulation.

true



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.



**Example**



Background visibility.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
const maxItems = _.map(grouped, group =>

:::

**Example**
    { __row_index: item.__row_index, field: 'product' },

  ])



#### code

**Type:** `string`

:::note{title=Mo ta}
});



    { __row_index: item.__row_index, field: 'sales' }

);

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

**Example**

:::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

4
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

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::


##### field

**Type:** `string`

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language).



"Get the highest sales value as the annotation line reference"

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
Written during the prepare() phase; read-only at runtime.

:::

**Example**
const maxSales = _.maxBy(data, 'sales')?.sales;



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
'Annotation text'

:::

**Example**
return sorted[index]?.sales || 0;



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
return currentYearTotal;

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
**Example**

Recommended value is 'right', which keeps the text on the left side of the annotation point.

Text font size.

Text color

**Example**

:::

**Example**
'Annotation text'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
Text position; the location of the annotation line's label (relative to the line).

- right: Text is on the left side of the annotation area, with the right edge aligned to the area.

'outsideEnd'

bottom: Text is at the top of the reference line; the bottom edge aligns with the endpoint of the (vertical) annotation line.

'right'

:::

**Example**
Text color.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
'top' (text is at the bottom of the annotation area)



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
2

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
Annotation text.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
Annotation text.



### offsetY

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

**Example**

Whether the background is visible.

:::

**Example**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Background color.

A negative value moves the whole component left. For example, -10 moves the whole annotation point, including text and text background, left by 10 pixels.

**Example**

:::

**Example**
offsetX: 5, moves the whole annotation point right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mo ta}
'red'

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
- center: Text is centered on the point.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
const maxItems = _.map(grouped, group =>

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Mo ta}
});



    { __row_index: item.__row_index, field: 'sales' }

Annotation area

**Example**

Annotation area configuration; defines an area on the chart based on selected data, including its position, style, etc.

**Example**

:::

**Example**
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

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language).



"Get the highest sales value as the annotation line reference"

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Written during the prepare() phase; read-only at runtime.

:::

**Example**
const maxSales = _.maxBy(data, 'sales')?.sales;



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
'Annotation text'

:::

**Example**
return sorted[index]?.sales || 0;



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
return currentYearTotal;

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
12

center: Text is centered in the annotation area.

Text color.

Annotation line label position (relative position of the label to the line).

**Example**

:::

**Example**
400



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
Suggested to be set to 'center' to ensure text is centered within the area.

- right: Text is on the left side of the annotation area, with the right edge aligned to the area.

- center: Text is centered in the annotation area.

'top'

'center' (text is in the middle of the annotation area)

:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
- middle: Text is vertically centered in the annotation area.

:::

**Example**
'top' (text is at the bottom of the annotation area)



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Background visibility.

:::

**Example**
return sorted[index]?.sales || 0;



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Annotation area border corner radius.

:::

**Example**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
'top' (text is at the bottom of the annotation area)



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
2

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
Annotation text.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
Annotation text.




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mo ta}
Dimension-value annotation line, displayed horizontally. It can configure the annotation line position, style, and related settings.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}
**Example**

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
- center: Text is centered on the point.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}
const maxItems = _.map(grouped, group =>

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Mo ta}
});



    { __row_index: item.__row_index, field: 'sales' }

Annotation area

**Example**

Annotation area configuration; defines an area on the chart based on selected data, including its position, style, etc.

**Example**

:::

**Example**
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

:::note{title=Mo ta}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
User's filtering requirement description (natural language).



"Get the highest sales value as the annotation line reference"

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Written during the prepare() phase; read-only at runtime.

:::

**Example**
const maxSales = _.maxBy(data, 'sales')?.sales;



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
**Example**



Label position of the annotation line, relative to the line.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
'Annotation text'

:::

**Example**
return sorted[index]?.sales || 0;



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
return currentYearTotal;

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
12

center: Text is centered in the annotation area.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

**Example**

background color

:::

**Example**
400



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
Suggested to be set to 'center' to ensure text is centered within the area.

- right: Text is on the left side of the annotation area, with the right edge aligned to the area.

background stroke color

**Example**

**Example**

:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
'top' (text is at the bottom of the annotation area)



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
2

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
4



4

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
Annotation text.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
Annotation text.



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
- middle: Text is vertically centered in the annotation area.



- middle: Text is vertically centered in the annotation area.

:::

**Example**
'top' (text is at the bottom of the annotation area)



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Background visibility.

:::

**Example**
return sorted[index]?.sales || 0;



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Annotation area border corner radius.

:::

**Example**
'solid'



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
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mo ta}
Line style.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mo ta}
Whether to enable the dimension linkage function when the chart has perspective enabled or when measures are combined.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}
Written during the `prepare()` phase, read-only at runtime.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
Written during the prepare() phase; read-only at runtime.

:::

**Example**
const maxSales = _.maxBy(data, 'sales')?.sales;



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
'Annotation text'

:::

**Example**
return sorted[index]?.sales || 0;



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
return currentYearTotal;

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
'red'

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
Polynomial regression line configuration, including the polynomial order, regression line style, etc.

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

- right: Text is on the left side of the annotation area, with the right edge aligned to the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**Example**
'top': text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
'top' (text is at the bottom of the annotation area)



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
2



2

:::

**Example**
return sorted[index]?.sales || 0;



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
4

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
4



4

:::

**Example**
Annotation text.



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
**Example**

:::

**Example**
Annotation text.



### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Annotation area fill color

:::

**Example**
return sorted[index]?.sales || 0;



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
return sorted[index]?.sales || 0;



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area border width

:::

**Example**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
Annotation area border radius

:::

**Example**
Annotation text.



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
Written during the `prepare()` phase, read-only at runtime.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

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
Written during the `prepare()` phase, read-only at runtime.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Core capabilities:

- Supports arbitrary complex data filtering conditions.

- Uses built-in utility functions for data manipulation.

- Executes safely in the browser environment (Web Worker sandbox).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}
Only supported in browser environments (requires Web Worker).

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
Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::

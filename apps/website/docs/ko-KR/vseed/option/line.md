# Line

:::info{title=권장}
- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=인코딩 매핑}
Line charts support the following visual channels:

`y`      : y-axis channel, supports `multiple measures`, mapped to the y-axis by measure values.

`color`  : color channel, supports `multiple dimensions` or `one measure`. Dimension colors are used to distinguish different data series, while measure colors are used for linear mapping of values to graphical colors.

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point.

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displaying data labels on data points.

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=설명}
Applicable scenarios:

- Showing trends in time-series data.

- Analyzing patterns of data growth or decline.

\- Compare trends across multiple data series

\- Analyze data growth or decline patterns

:::

:::warning{title=Warning}
- All measures are automatically merged into one measure.

Features enabled by default:

- Legend, axes, data point markers, tooltips, and trend lines are enabled by default.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legends, axes, data point markers, tooltips, and trend lines are enabled by default

:::


## chartType

**Type:** `"line"`

:::note{title=설명}
Line chart, suitable for showing how data trends change over time or ordered categories

:::

**예시**
'line'




## dataset

**Type:** `Record[]`

:::note{title=설명}
Data source. A pre-aggregated dataset that follows the TidyData specification and defines the chart data source and structure. User input does not need extra processing. VSeed performs data reshape automatically, and line chart data is eventually converted to 2 dimensions and 1 measure.

:::

**예시**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=설명}
Dimensions. The first dimension of a line chart is mapped to the X-axis. Other dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**예시**
[{id: "month", alias: "Month"}]




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
- detail: supports mapping multiple dimensions to the detail channel

- tooltip: supports mapping multiple dimensions to the tooltip channel

- label: supports mapping multiple dimensions to the label channel

- row: supports mapping multiple dimensions to the row channel

- column: supports mapping multiple dimensions to the column channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=설명}
Measures. All measures of a line chart are automatically merged into one measure and mapped to the Y-axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**예시**
[{id: "value", alias: "Value"}]




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
Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale

- locale=en-US: 749740.264 → 744.5K

For example:

\- locale='zh-CN': 749740.264 -> 744.5K

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
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)

:::

**예시**
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1200, significantDigits:2

:::

**예시**
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

:::

**예시**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Label font weight.

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
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)

:::

**예시**
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1200, significantDigits:2

:::

**예시**
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

:::

**예시**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Label font weight.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=설명}
- color: measure mapped to the color channel

- label: measure mapped to the label channel

- tooltip: measure mapped to the tooltip channel

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
Pagination configuration

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

**예시**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=설명}
Chart background color



Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::


## color

**Type:** `Color | undefined`

:::note{title=설명}
Discrete color scheme used to define the colors of different elements in the chart.



**Example**

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**예시**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=설명}
Color mapping used to map data values to specific colors.

:::

**예시**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=설명}
Color mapping used to map data values to specific colors

:::

**예시**
{
 'sales': 'blue',
}
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
Whether labels display measure values.

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

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=설명}
Whether labels display dimension labels

Display all dimension labels

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

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
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)

:::

**예시**
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1200, significantDigits:2

:::

**예시**
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

:::

**예시**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Label font weight.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
Label background color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
Label stroke (outline) color.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
Label font color.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=설명}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
Label position.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the label overlap avoidance function is enabled.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=설명}
Label filtering; the default condition relationship between selectors is OR.

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
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(



\- Use built-in utility functions for data manipulation

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

User's filtering requirement description (natural language).



**Example**



Chart dynamic filter configuration



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
{ __row_index: item.__row_index, field: 'sales' }
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return maxSales || 0;
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
Operator:

:::


##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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
legend



Legend configuration, used to define the chart's legend, including its position, format, style, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=설명}
Whether legend functionality is enabled

:::

**예시**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=설명}
Whether the legend border is enabled

:::

:::warning{title=Warning}
**Example**

:::

**예시**
**Example**



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
Legend font size

:::

**예시**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=설명}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=설명}
Legend font weight

:::

**예시**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=설명}
Legend shape

:::

:::warning{title=Warning}
**Example**

:::

**예시**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=설명}
Legend position

:::

**예시**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=설명}
Maximum columns or rows when there are many legend items

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
**Example**

:::

**예시**
Brush mode; defines whether single or multiple areas can be selected.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=설명}
- `rect`: Rectangular selection, allows selecting in both X and Y directions.



- `x`: Horizontal selection, restricts selection to the X-axis direction.

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
Tooltip information



Whether to enable brush selection

:::


### enable

**Type:** `false | true`

:::note{title=설명}
Whether tooltip is enabled

:::


## brush

**Type:** `Brush | undefined`

:::note{title=설명}
Chart brush configuration



\- `polygon`: Polygonal selection, allowing the drawing of arbitrary polygons by clicking multiple points



Brush selection mode: single or multiple

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

\- `x`: brush selection in the X-axis direction only; the Y-axis direction is unrestricted

\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=설명}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



Defines the brush selection mode

Defines the style of data points outside the selected brush area

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
Opacity of unselected data points, ranging from 0 to 1



Defines the style of brushed data points

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
Whether to automatically limit label length. When a label exceeds the length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.



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
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Defines the style of data points outside the brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=설명}
Whether to automatically limit label length. When a label exceeds the length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.



Opacity of data points outside the brush selection, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=설명}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
Stroke width

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
Label font size.

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=설명}
Label font weight.

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
Whether the title is visible.

:::

#### update

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=설명}
Whether ticks are visible.

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
Whether the title is visible.

:::

#### loop

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=설명}
Title text; defaults to following field configurations.

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
Title text; defaults to following field configurations.

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
Whether the title is visible.

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



Minimum value of the axis; higher priority than nice and zero.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Grid line type

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=설명}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=설명}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=설명}
order: 'asc'

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=설명}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=설명}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=설명}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=설명}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=설명}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
}

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
Label background color.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Label stroke (outline) color.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
selector = [100, 200]

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}
operator: 'in',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
selector = {

:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}
}

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
Dynamic filter (AI-generated code execution).

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
X-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}
- Can only use built-in utility functions (access via _ or R).

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
Grid line type

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
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=설명}
Whether to automatically format numeric-axis tick labels. Only applies to numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=설명}
Number formatting for numeric axes. Only applies to numeric axes and has lower priority than autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=설명}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=설명}
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=설명}
- 100000 converts to 10K, ratio:1000, symbol:"K"

:::

**예시**
A vertical line displayed when hovering over the chart to show precise values.
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=설명}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)

:::

**예시**
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1200, significantDigits:2

:::

**예시**
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

:::

**예시**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=설명}
Label font weight.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=설명}
}

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=설명}
Label background color.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=설명}
Label stroke (outline) color.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=설명}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=설명}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=설명}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=설명}
Number format prefix

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=설명}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=설명}
selector = [100, 200]

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=설명}
operator: 'in',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=설명}
selector = {

:::

#### titleText

**Type:** `string | undefined`

:::note{title=설명}
}

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
Dynamic filter (AI-generated code execution).

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
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=설명}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=설명}
- Can only use built-in utility functions (access via _ or R).

:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=설명}
수직 안내선



Vertical guide line shown when the mouse moves over the chart



field: 'sales'

:::


### visible

**Type:** `boolean | undefined`

:::note{title=설명}
return _.flatten(

:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
십자선 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title=설명}
])

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
X-axis sort configuration. Supports sorting by dimensions or measures and custom sort order.



- in: Select data items where the dimension field value is in the 'value' list.

:::

**예시**
Dimension field ID (the `id` of an item in `dimensions`).
Chart animated filter configuration
field: 'sales'
}
Dimension field ID (the `id` of an item in `dimensions`).
Operator
}

const grouped = _.groupBy(data, 'area');
dotted
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
dotted
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
\- `__row_index`는 원본 데이터 항목의 행 번호를 나타내고, `field`는 강조할 필드를 나타냅니다.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=설명}
Legend sort configuration, supporting sorting by dimension or measure and custom order



Point color.

:::

**예시**
Point color opacity.
Chart animated filter configuration
field: 'sales'
}
Point color opacity.
Operator
}

const grouped = _.groupBy(data, 'area');
dotted
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=설명}
])

:::

**예시**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
dotted
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=설명}
Line style configuration. Used to define the style of lines in the chart, including color, transparency, curvature, etc.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=설명}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.



**Example**



selector = 100

:::

**예시**
selector = [{ profit: 100 }, { profit: 200 }]

Conditional Dimension Selector:

field: 'category',




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=설명}
Point mark style



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

데이터 필터

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**예시**
Operator (same as operator).
selector = "tool"
**Example**
true
selector = [100, 200]

Local data selector
Bar element (rectangular element) color
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
- Executes safely in the browser environment (Web Worker sandbox).
field: 'category',
operator: 'in',
value: 'tool'
}
- Executes safely in the browser environment (Web Worker sandbox).
field: 'category',
operator: 'not in',
value: 'book'
}

Key capabilities:
- Executes safely in the browser environment (Web Worker sandbox).
field: 'profit',
operator: '>=',
value: 100
}
- Executes safely in the browser environment (Web Worker sandbox).
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

User's filtering requirement description (natural language).



**Example**



Chart dynamic filter configuration



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
{ __row_index: item.__row_index, field: 'sales' }
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return maxSales || 0;
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
Operator:

:::


##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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
Whether points are visible

:::

### pointSize

**Type:** `number | undefined`

:::note{title=설명}
Point size



Point size

:::

### pointColor

**Type:** `string | undefined`

:::note{title=설명}
Point mark color



Point mark color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
Point mark color opacity



Point mark color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=설명}
Point mark border color



Point mark border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
Point mark border width



Point mark border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
Point mark border style



Point mark border style

:::

**예시**
400

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=설명}
Line mark style



Line mark style configuration, used to define line color, opacity, curve, and related settings.

Supports global style or conditional style configuration

데이터 필터

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**예시**
Operator (same as operator).
selector = "tool"
**Example**
true
selector = [100, 200]

Local data selector
Bar element (rectangular element) color
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
- Executes safely in the browser environment (Web Worker sandbox).
field: 'category',
operator: 'in',
value: 'tool'
}
- Executes safely in the browser environment (Web Worker sandbox).
field: 'category',
operator: 'not in',
value: 'book'
}

Key capabilities:
- Executes safely in the browser environment (Web Worker sandbox).
field: 'profit',
operator: '>=',
value: 100
}
- Executes safely in the browser environment (Web Worker sandbox).
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

User's filtering requirement description (natural language).



**Example**



Chart dynamic filter configuration



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
{ __row_index: item.__row_index, field: 'sales' }
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return maxSales || 0;
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
Operator:

:::


##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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
true

:::

**예시**
`lineStyle: 'solid'`




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=설명}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation point to ensure it stays within the visible area of the chart.



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=설명}
Text color.

:::


#### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### measureId

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

User's filtering requirement description (natural language).



**Example**



Chart dynamic filter configuration



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
{ __row_index: item.__row_index, field: 'sales' }
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

return maxSales || 0;
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
Operator:

:::


##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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

**예시**
'마크 텍스트'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
**Example**

Recommended value is 'right', which keeps the text on the left side of the annotation point.

텍스트 글꼴 크기입니다.

Text color

**예시**

:::

**예시**
'right' 텍스트가 마크 포인트의 왼쪽에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
**예시**

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

'top'

bottom: Text is at the top of the reference line; the bottom edge aligns with the endpoint of the (vertical) annotation line.

'right'

:::

**예시**
Text color.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**

:::

**예시**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
background corner radius

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
12



### offsetY

**Type:** `number | undefined`

:::note{title=설명}
**Example**

**Example**

배경을 표시할지 여부입니다.

:::

**예시**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=설명}
배경색입니다.

Line style.

**예시**

:::

**예시**
offsetX: 5, moves the whole annotation point right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=설명}
Dimension-value annotation line, displayed vertically. It can configure the annotation line position, style, and related settings.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

**Example**

'red'

4

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
\- not in: Select data items where the value of the dimension field is not in the value
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

:::note{title=설명}
Operator:

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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

**예시**
'마크 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
선택된 차원 필드 값입니다. 배열을 지원합니다.

:::

**예시**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.

텍스트 색상입니다.

Annotation line label position (relative position of the label to the line).

**예시**

:::

**예시**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

- center: Text is centered in the annotation area.

'Annotation Text'

'center' (text is in the middle of the annotation area)

:::

**예시**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**

:::

**예시**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**예시**
'center' Text is centered in the annotation area



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**예시**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**예시**
**Example**



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**

:::

**예시**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
background corner radius

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
12




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=설명}
Numeric annotation line, including average, maximum, and minimum lines. Displayed horizontally and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as average lines.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=설명}
**Example**

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=설명}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=설명}
**Example**

:::

**예시**
"마크 라인 참조로 최고 매출 값 가져오기"

"마크 라인에 사용할 평균 매출 계산"



#### code

**Type:** `string`

:::note{title=설명}
return _.flatten(



])

**Example**

'red'

4

return profitRate > 0.2 && item.sales > 5000;

:::

**예시**
\- not in: Select data items where the value of the dimension field is not in the value
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

:::note{title=설명}
Operator:

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=설명}
**Example**



\- in: Select data items where the value of the dimension field is in the value

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

**예시**
'마크 텍스트'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=설명}
2



Label position of the annotation line, relative to the line.

:::

**예시**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
left: 텍스트가 주석 영역 오른쪽에 있으며, 왼쪽 가장자리가 영역에 맞춰집니다.

center: 텍스트가 주석 영역의 중앙에 배치됩니다.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

**예시**

background color

:::

**예시**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
middle: 텍스트가 주석 영역에서 세로 중앙에 배치됩니다.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

배경 선 색상

**예시**

**Example**

:::

**예시**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**

:::

**예시**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
background corner radius

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**예시**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
12



### lineVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**



**Example**

:::

**예시**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=설명}
주석 영역 테두리 색상입니다.

:::

**예시**
'center' Text is centered in the annotation area



### lineWidth

**Type:** `number | undefined`

:::note{title=설명}
주석 영역 테두리 너비입니다.

:::

**예시**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
주석 영역 테두리 모서리 반경입니다.

:::

**예시**
**Example**



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=설명}
주석 영역 테두리의 대시 스타일입니다.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=설명}
Primary color for the part greater than the annotation value

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
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=설명}
'red'

:::

**예시**
'마크 텍스트'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=설명}
2

:::

**예시**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=설명}
4

:::

**예시**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
[2, 2]

:::

**예시**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=설명}
0

:::

**예시**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=설명}
다항 회귀선 구성입니다. 다항식 차수, 회귀선 스타일 등을 포함합니다.

'center'로 설정하는 것을 권장합니다. 이렇게 하면 텍스트가 마크 영역의 중앙에 표시됩니다

right: text is on the left side of the annotation area; the right edge of the text aligns with the annotation area

left: text is on the right side of the annotation area; the left edge of the text aligns with the annotation area

center: text is centered in the annotation area; the center of the text aligns with the annotation area

:::

**예시**
'center' 텍스트가 마크 영역의 중앙에 표시됩니다



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=설명}
Text vertical alignment. Generally set it to top so text appears at the bottom of the annotation area and remains inside the visible chart area.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

다항 회귀 차수

:::

**예시**
'top' 텍스트가 마크 영역의 아래쪽에 표시됩니다



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=설명}
**Example**

:::

**예시**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
background corner radius

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=설명}
텍스트 색상



텍스트 색상

:::

**예시**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
**예시**

:::

**예시**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
**예시**



**예시**

:::

**예시**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=설명}
배경 안쪽 여백

:::

**예시**
12



### areaColor

**Type:** `string | undefined`

:::note{title=설명}
마크 영역 색상

:::

**예시**
'center' Text is centered in the annotation area



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=설명}
Annotation area fill opacity

:::

**예시**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=설명}
Annotation area border color

:::

**예시**
'center' Text is centered in the annotation area



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=설명}
Annotation area border width

:::

**예시**
**Example**



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=설명}
Annotation area border radius

:::

**예시**
12



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=설명}
Annotation area border line style

:::

**예시**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=설명}
마크 영역의 여백

:::

**예시**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=설명}
Difference annotation line



Draws a difference annotation line based on two selected data points and automatically calculates the difference text.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=설명}
Start anchor point of the difference annotation line.



Difference annotation anchor configuration, used to select data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
Anchor selector, which must ultimately locate a logical anchor.

:::

**예시**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=설명}
End anchor point of the difference annotation line.



Difference annotation anchor configuration, used to select data bound to the start or end point.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=설명}
Anchor selector, which must ultimately locate a logical anchor.

:::

**예시**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=설명}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=설명}
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=설명}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=설명}
Difference value type.

\- absolute: show absolute difference, calculated as end - start

\- percent: show percentage difference, calculated as (end - start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=설명}
Text font size.

:::

### textColor

**Type:** `string | undefined`

:::note{title=설명}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=설명}
Text background color.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=설명}
Line color.

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=설명}
Line style.

:::


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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=설명}
Language



Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::

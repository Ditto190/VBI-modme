# AreaPercent

:::info{title=推奨}
\- Recommended field configuration: `1` measure and `2` dimensions

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=エンコードマッピング}
The Percent Area Chart supports the following visual channels:

`xAxis`  : X-axis channel, supports `multiple dimensions`, mapped to the X-axis by dimension value

`yAxis`  : Y軸チャネル。`複数のメジャー`をサポートし、メジャー値をY軸にマッピングします

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=説明}
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

:::note{title=説明}
Percent Area Chart



Percent Area Chart, showing the change in proportions of multiple categories over a specific dimension in percentage format.

:::

**例**
'areaPercent'




## dataset

**Type:** `Record[]`

:::note{title=説明}
Dataset



A TidyData-compliant, pre-aggregated dataset defining the chart's data source and structure. Users do not need to manually process input data — VSeed's powerful Data Reshape capability handles it automatically. Percent Area Chart data is ultimately reshaped to 2 dimensions and 1 measure.

:::

**例**
[{month:'Jan', category:'A', value:30}, {month:'Jan', category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=説明}
Dimensions



The first dimension is mapped to the X-axis; remaining dimensions are merged with measure names when multiple measures exist and shown as legend items.

:::

**例**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




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
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=説明}
Channel to which the dimension is mapped

\- xAxis: 複数ディメンションをx軸にマッピングできます

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=説明}
Measures



Percent Area Chart measures are automatically merged into one measure, mapped to the Y-axis. Measure names are merged with the remaining dimensions and displayed as legend items.

:::

**例**
[{id: 'value', alias: 'Numerical Ratio', format: 'percent'}]




### id

**Type:** `string`

:::note{title=説明}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=説明}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
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

:::note{title=説明}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g. %, ‰

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for number formatting

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**例**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**例**
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

:::note{title=説明}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**例**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g. %, ‰

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for number formatting

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**例**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**例**
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

:::note{title=説明}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**例**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=説明}
Channel to which the measure is mapped

\- yAxis: メジャーをy軸にマッピングします

\- detail: Measure mapped to the detail channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=説明}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::


## page

**Type:** `Page | undefined`

:::note{title=説明}
ページング



Pagination configuration for chart pagination

:::


### field

**Type:** `string`

:::note{title=説明}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=説明}
Current pagination value; specifies the value used to determine the current page

:::

**例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=説明}
Chart background color



Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

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
Discrete color scheme used to define the colors of different elements in the chart

:::

**例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=説明}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=説明}
Color mapping used to map data values to specific colors

:::

**例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=説明}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
Positive/negative color configuration; defines the color for negative values in the chart

:::


## label

**Type:** `Label | undefined`

:::note{title=説明}
Label



Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=説明}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=説明}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g. %, ‰

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for number formatting

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**例**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**例**
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

:::note{title=説明}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**例**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

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
Whether the label font color automatically inverts based on the graphical element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=説明}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=説明}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
Label filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
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

:::note{title=説明}


:::

**例**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**
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

:::note{title=説明}


:::


##### field

**Type:** `string`

:::note{title=説明}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






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






:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=説明}


:::

:::warning{title=Warning}


:::

**例**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=説明}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=説明}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=説明}
Disabled pager icon color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=説明}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=説明}


:::

**例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=説明}


:::

:::warning{title=Warning}


:::

**例**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=説明}


:::

**例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=説明}
Maximum columns or rows when there are many legend items





:::

:::warning{title=Warning}


:::

**例**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=説明}
描画領域の内側余白



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

:::note{title=説明}






:::


### enable

**Type:** `false | true`

:::note{title=説明}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=説明}
Chart brush configuration









:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Whether brush selection is enabled

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=説明}
\- `polygon`: Polygonal selection, allowing selection by drawing an arbitrary polygon through multiple points



\- `y`: Y-axis selection, restricting selection to the Y-axis direction while the X-axis remains unconstrained

\- `rect`: rectangular brush selection, available in both X-axis and Y-axis directions

\- `polygon`: polygon brush selection, draws an arbitrary polygon by clicking multiple points


\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=説明}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



Defines the brush selection mode


\- `multiple`: multiple selection mode; multiple brush areas can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=説明}
Whether to clear the brush area after selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
Opacity



Opacity of selected data points, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=説明}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=説明}
Opacity



選択されていないデータポイントの不透明度、範囲 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=説明}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::


## animation

**Type:** `LineAreaAnimation | undefined`

:::note{title=説明}
アニメーション設定



チャートアニメーション設定。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title=説明}
Whether line/area chart animation is enabled

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=説明}
Line/area chart animation parameters

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=説明}
Line/area chart appear animation configuration

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=説明}
Line/area chart appear effects, supporting load and grow animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

#### update

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=説明}
Line/area chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=説明}
Line/area chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

##### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

#### loop

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=説明}
Line/area chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=説明}
ループアニメーションを有効にするかどうか

:::

##### interval

**Type:** `number | undefined`

:::note{title=説明}
ループアニメーション間隔。単位はミリ秒

:::

##### loop

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=説明}
Line/area chart loop animation configuration

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=説明}
Line/area chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=説明}
現在のアニメーション段階を有効にするかどうか

:::

###### ease

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのイージング関数

:::

###### duration

**Type:** `number | undefined`

:::note{title=説明}
アニメーション時間。単位はミリ秒

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
アニメーションのハイライトまたは雰囲気色

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=説明}
Line/area chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーションのイージング関数

:::

###### color

**Type:** `string | undefined`

:::note{title=説明}
雰囲気アニメーションの色

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=説明}
雰囲気アニメーション効果。リップル、表示/非表示、呼吸効果をサポートします

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=説明}
X軸



Category axis. X-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=説明}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=説明}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=説明}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
value: 'tool'

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


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
**例**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
凡例ソート設定。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。sort 配列は左から右、または上から下の順序に従います。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
カスタムソート順。この順序は凡例に直接適用されます。昇順は左から右、または上から下に従い、降順は右から左、または下から上に従います。

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
組み込みの `light` と `dark` テーマを含みます。カスタムテーマは `registerTheme` で追加できます。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グローバルスタイルまたは条件付きスタイル設定をサポートします。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}


:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=説明}
Y軸



数値軸。Y軸設定。Y軸の位置、書式、スタイルなどを定義します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}

:::

### min

**Type:** `number | undefined`

:::note{title=説明}
軸線 width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=説明}
X 軸目盛り

:::

### log

**Type:** `boolean | undefined`

:::note{title=説明}
対数軸を使用するかどうか。数値軸にのみ有効です

:::

### logBase

**Type:** `number | undefined`

:::note{title=説明}
アニメーションのイージング関数。

:::

### nice

**Type:** `boolean | undefined`

:::note{title=説明}
Y軸（カテゴリ軸）設定。Y軸の位置、形式、スタイルなどを定義します。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=説明}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=説明}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=説明}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=説明}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=説明}
Number format ratio, cannot be 0

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=説明}
Number format symbol, e.g. %, ‰

:::

**例**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=説明}
Thousands separator for number formatting

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**例**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=説明}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**例**
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

:::note{title=説明}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**例**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=説明}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=説明}
value: 'tool'

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


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=説明}
**例**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=説明}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=説明}
凡例ソート設定。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。sort 配列は左から右、または上から下の順序に従います。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=説明}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=説明}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=説明}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=説明}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=説明}
カスタムソート順。この順序は凡例に直接適用されます。昇順は左から右、または上から下に従い、降順は右から左、または下から上に従います。

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=説明}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=説明}
組み込みの `light` と `dark` テーマを含みます。カスタムテーマは `registerTheme` で追加できます。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=説明}
グローバルスタイルまたは条件付きスタイル設定をサポートします。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=説明}


:::


#### duration

**Type:** `number | undefined`

:::note{title=説明}

:::

#### easing

**Type:** `string | undefined`

:::note{title=説明}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=説明}
垂直ガイド線



マウスがチャート上を移動したときに表示される垂直ガイド線



クロスヘア線設定。チャート内にクロスヘア線（ガイド線）を表示するための設定タイプです

:::


### visible

**Type:** `boolean | undefined`

:::note{title=説明}
クロスヘア線を表示するかどうか

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線の色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線ラベルの色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=説明}
クロスヘア線を表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}
クロスヘア線ラベルの背景色

:::


## sort

**Type:** `Sort | undefined`

:::note{title=説明}
X-axis sort configuration, supporting sorting by dimension or measure and custom order





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


:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
\- `__row_index` は元データ項目の行番号を表し、`field` は強調表示するフィールドを表します。

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=説明}
Legend sort configuration, supporting sorting by dimension or measure and custom order



チャート動的フィルタ設定: AI生成のJavaScriptコードでチャートマーク（棒、ポイントなど）をフィルタします。

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


:::

**例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=説明}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=説明}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Theme



組み込みテーマには light と dark があります。新しいテーマは registerTheme で登録できます。

:::

**例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=説明}
ポイントマークスタイル



ポイントマークスタイル設定。ポイントマークの色、枠線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
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

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
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

:::note{title=説明}


:::

**例**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**
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

:::note{title=説明}


:::


##### field

**Type:** `string`

:::note{title=説明}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=説明}
ポイントを表示するかどうか

:::

### pointSize

**Type:** `number | undefined`

:::note{title=説明}
ポイントサイズ



ポイントサイズ

:::

### pointColor

**Type:** `string | undefined`

:::note{title=説明}
ポイントマークの色



ポイントマークの色

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
ポイントマーク色の不透明度



ポイントマーク色の不透明度

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=説明}
ポイントマークの枠線色



ポイントマークの枠線色

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
ポイントマークの枠線幅



ポイントマークの枠線幅

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
ポイントマークの枠線スタイル



ポイントマークの枠線スタイル

:::

**例**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=説明}
ラインマークスタイル



ラインマークスタイル設定。ラインマークの色、不透明度、曲線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
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

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
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

:::note{title=説明}


:::

**例**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**
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

:::note{title=説明}


:::


##### field

**Type:** `string`

:::note{title=説明}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}
線分を表示するかどうか

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=説明}
線分を滑らかにするかどうか

:::

### lineColor

**Type:** `string | undefined`

:::note{title=説明}
線分の色

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
線分色の不透明度

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
線分の幅

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
線分スタイル

:::

**例**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=説明}




エリアマークスタイル設定。エリアマークの色、不透明度、枠線などを定義します。

グローバルスタイルまたは条件付きスタイル設定をサポートします

データフィルター




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}
- not in: ディメンションフィールド値が `value` 配列内にないデータ項目を選択します。






:::

**例**
棒プリミティブ (矩形) のストローク色
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

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
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

:::note{title=説明}


:::

**例**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**
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

:::note{title=説明}


:::


##### field

**Type:** `string`

:::note{title=説明}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=説明}
エリアマークを表示するかどうか



エリアマークを表示するかどうか

:::

### areaColor

**Type:** `string | undefined`

:::note{title=説明}
エリアマークの色



エリアマークの色

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}
エリアマーク色の不透明度



エリアマーク色の不透明度

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=説明}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation point to ensure it stays within the visible area of the chart.



注釈点設定。選択したデータに基づいて、注釈点の位置、書式、スタイルなどを定義します。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=説明}


:::


#### field

**Type:** `string`

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### measureId

**Type:** `string | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=説明}
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

:::note{title=説明}


:::

**例**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

\- Must return an array of row index and field combinations: Array<{ __row_index: number, field: string }>

**Example**

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**
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

:::note{title=説明}


:::


##### field

**Type:** `string`

:::note{title=説明}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=説明}






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
'red'

:::

**例**
'マークテキスト'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

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




テキストのフォントサイズ。


**例**

:::

**例**
'right' テキストはマークポイントの左側に配置されます



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
**例**









:::

**例**
'top' テキストはマークポイントの下側に配置されます



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### offsetY

**Type:** `number | undefined`

:::note{title=説明}




背景を表示するかどうか。

:::

**例**
true



### offsetX

**Type:** `number | undefined`

:::note{title=説明}
背景色。


**例**

:::

**例**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=説明}
Dimension value annotation line, displayed vertically, with configurable position and style

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted






\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**

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

:::note{title=説明}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'マークテキスト'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
選択されたディメンションフィールド値。配列をサポートします。

:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

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
left: テキストは注釈領域の右側にあり、左端が領域に揃います。

center: テキストは注釈領域内で中央揃えになります。

テキスト色。


**例**

:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
middle: テキストは注釈領域内で垂直方向に中央揃えになります。









:::

**例**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
注釈領域の枠線色。

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線幅。

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
注釈領域枠線の角丸半径。

:::

**例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=説明}
Numeric annotation line, including average, maximum, and minimum lines. Displayed horizontally and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as average lines.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=説明}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=説明}
Dynamic filter (AI-generated code execution)











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
"売上高が最も高い値をマークラインの参照として取得"

"マークライン用に平均売上高を計算"



#### code

**Type:** `string`

:::note{title=説明}
\- Input parameters: data (array), where each item includes a __row_index field representing the row number



\- __row_index represents the row number of the original data item; field represents the field to be highlighted






\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

:::

**例**

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

:::note{title=説明}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=説明}






:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'マークテキスト'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=説明}
2





:::

**例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

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
left: テキストは注釈領域の右側にあり、左端が領域に揃います。

center: テキストは注釈領域内で中央揃えになります。



**例**



:::

**例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}
middle: テキストは注釈領域内で垂直方向に中央揃えになります。



背景のストローク色

**例**



:::

**例**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**例**



**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=説明}






:::

**例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=説明}
注釈領域の枠線色。

:::

**例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=説明}
注釈領域の枠線幅。

:::

**例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=説明}
注釈領域枠線の角丸半径。

:::

**例**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=説明}
注釈領域枠線の破線スタイル。

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=説明}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=説明}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=説明}
注釈領域



注釈領域設定。選択したデータに基づいて、注釈領域の位置、スタイルなどを定義します。

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=説明}
チャートでパースペクティブが有効な場合、またはメジャーが結合されている場合に、ディメンション連動機能を有効にするかどうか。

:::


#### field

**Type:** `string`

:::note{title=説明}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=説明}
same as operator

\- in: Select data items whose dimension field value is within the specified value


same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=説明}

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=説明}
'red'

:::

**例**
'マークテキスト'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=説明}
2

:::

**例**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=説明}
4

:::

**例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=説明}
[2, 2]

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
多項式回帰線設定。多項式の次数、回帰線スタイルなどを含みます。

'center' に設定することを推奨します。これにより、テキストをマークエリアの中央に配置できます







:::

**例**
'center' テキストはマークエリアの中央に配置されます



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=説明}








多項式回帰の次数

:::

**例**
'top' テキストはマークエリアの下側に配置されます



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=説明}


:::

**例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=説明}

:::

**例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=説明}
テキスト色



テキスト色

:::

**例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=説明}
**例**

:::

**例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=説明}
**例**



**例**

:::

**例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=説明}
背景の内側余白

:::

**例**
4



### areaColor

**Type:** `string | undefined`

:::note{title=説明}
マークエリアの色

:::

**例**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=説明}


:::

**例**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=説明}


:::

**例**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=説明}


:::

**例**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=説明}
マークエリアの余白

:::

**例**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=説明}
チャートでピボット機能またはメジャーグループが有効な場合に、ディメンション連動を有効にするかどうか

あるディメンション値にホバーしたとき、他のチャート内の同じディメンション値のデータを連動して強調表示します



ピボットグラフのディメンション連動設定

:::


### enable

**Type:** `false | true`

:::note{title=説明}
ピボットグラフのディメンション連動を有効にするかどうか

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=説明}
すべてのディメンションに対応するサブグラフの Tooltip 情報を表示するかどうか

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=説明}
crosshair に対応するラベルを表示するかどうか

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=説明}
Language



チャートの言語設定です。'zh-CN' と 'en-US' をサポートし、intl.setLocale('zh-CN') を呼び出して言語を設定することもできます

:::

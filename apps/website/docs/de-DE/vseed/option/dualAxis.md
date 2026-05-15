# DualAxis

:::info{title=Empfehlung}
- Recommended field configuration: `2` measure(s), `2` dimension(s)

- Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=Codierungszuordnung}
Dual-axis charts support the following visual channels:

`xAxis`          : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension value

`primaryYAxis`   : primary y-axis channel, supports `multiple measures`, maps measures to the primary axis

`secondaryYAxis` : secondary y-axis channel, supports `multiple measures`, maps measures to the secondary axis

`detail`         : detail channel, supports `multiple dimensions`, used for displaying more granular data within the same color series

`color`          : color channel, supports `multiple dimensions` or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`        : tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`          : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Beschreibung}
Dual Axis Chart, suitable for comparing the relationship between two measures of different magnitudes or units, including primary and secondary axes.

Applicable scenarios:

- Comparative analysis of measures with different magnitudes

- Trend comparison of correlated measures

- Simultaneously displaying composite measures like values and growth rates

- Supports combinations of different chart types (e.g., Line + Bar / Line + Area / Area + Bar)

:::

:::warning{title=Warning}
Data requirements:

- At least 1 measure field

- Supports measure groups; the first group is placed on the primary (left) axis, the second on the secondary (right) axis

- The first dimension is placed on the X-axis; other dimensions merge with measure names (if multiple measures exist) to form legend items.

- Two measure groups can be mapped to the left and right Y-axes respectively; all measures within a group are automatically combined.

Features enabled by default:

- Axes, legend, data labels, and tooltips are enabled by default.

:::


## chartType

**Type:** `"dualAxis"`

:::note{title=Beschreibung}
Dual Axis Chart, a composite chart showing the comparison between two measures of different magnitudes.

:::

**Example**
'dualAxis'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Dataset, compliant with TidyData specification and already aggregated, defines the chart's data source and structure. User input does not require pre-processing; VSeed features powerful Data Reshape capabilities that handle formatting automatically. Dual Axis Chart data is ultimately converted to 2 dimensions and 1 or 2 measure(s) (depending on if measure groups are configured).

:::

**Example**
[{month:'Jan', value:100, growth:0.2}, {month:'Feb', value:150, growth:0.5}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Beschreibung}
Dimensions; the first dimension is placed on the X-axis, while other dimensions merge with measure names (if multiple exist) to form legend items.

:::

**Example**
[{id: 'month', alias: 'Month'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Dimension date format configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Channel to which the dimension is mapped

- xAxis: supports mapping multiple dimensions to the x-axis

- color: supports mapping multiple dimensions to the color channel

- detail: supports mapping multiple dimensions to the detail channel

- tooltip: supports mapping multiple dimensions to the tooltip channel

- label: supports mapping multiple dimensions to the label channel

- row: supports mapping multiple dimensions to the row channel

- column: supports mapping multiple dimensions to the column channel

:::


## measures

**Type:** `DualAxisMeasure[] | undefined`

:::note{title=Beschreibung}
Dual Axis Chart measures.

Measures mapped to primaryYAxis and secondaryYAxis through encoding can be grouped by setting the `parentId` property. Measures in different groups will be displayed in different sub-charts. You can also set the `chartType` property to specify the chart type for each measure group.

Measures can be grouped by setting the `parentId` property. Measures in different groups are displayed in different subcharts.

**Example**

:::

**Example**
[{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]




### id

**Type:** `string`

:::note{title=Beschreibung}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale.

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

- locale=en-US: 749740.264 → 744.5K

- locale=en-US: 749740.264 → 744.5K

\- locale='zh-CN': 749740.264 -> 744.5K

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Label font weight.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Label font weight.

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "primaryYAxis" | "secondaryYAxis" | undefined`

:::note{title=Beschreibung}
- secondaryYAxis: Measure mapped to the secondary Y-axis.

- color: Measure mapped to the color channel.

- label: Measure mapped to the label channel.

- tooltip: Measure mapped to the tooltip channel.

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::

### chartType

**Type:** `"area" | "column" | "areaPercent" | "columnParallel" | "columnPercent" | "line" | "scatter" | undefined`

:::note{title=Beschreibung}
- column: Bar (Column) Chart

- columnParallel: Parallel Column Chart

- columnPercent: Percent Column Chart

- area: Area Chart

- areaPercent: Percent Area Chart

- scatter: Scatter Chart

\- areaPercent: percentage area chart

\- scatter: scatter chart

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Pagination configuration

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
**Example**

:::

**Example**
'2023\-01\-01'




## alignTicks

**Type:** `boolean | boolean[] | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
{"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dualMeasures":[{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]},{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]}]}




## primaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Beschreibung}
Primary Y-axis configuration for the dual-axis chart, including position, style, and related settings. When measures have multiple groups, primaryYAxis can be configured as an array, with each item corresponding to one primary Y-axis.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Grid line type

:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether to automatically format numeric-axis tick labels. Only applies to numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Number formatting for numeric axes. Only applies to numeric axes and has lower priority than autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Label font weight.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label background color.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label stroke (outline) color.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
selector = [100, 200]

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
operator: 'in',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
selector = {

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dynamic filter (AI-generated code execution).

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
- Can only use built-in utility functions (access via _ or R).

:::


## secondaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Beschreibung}
Secondary Y-axis configuration for the dual-axis chart, including position, style, and related settings. When measures have multiple groups, secondaryYAxis can be configured as an array, with each item corresponding to one secondary Y-axis.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Grid line type

:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether to automatically format numeric-axis tick labels. Only applies to numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Number formatting for numeric axes. Only applies to numeric axes and has lower priority than autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Label font weight.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label background color.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label stroke (outline) color.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
selector = [100, 200]

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
operator: 'in',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
selector = {

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dynamic filter (AI-generated code execution).

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
- Can only use built-in utility functions (access via _ or R).

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
X-axis category-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Grid line type

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
order: 'asc'

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Custom sort order, which will be applied directly to the category axis

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label background color.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label stroke (outline) color.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
**Example**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format suffix

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Data selector. If configured, provides matching capabilities for numerical values, partial data items, dimensions, or measures. If not set, styles apply globally.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
selector = [100, 200]

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
operator: 'in',

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
selector = {

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dynamic filter (AI-generated code execution).

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
X-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
- Can only use built-in utility functions (access via _ or R).

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Chart background color. It can be a color string, such as 'red' or 'blue'. It can also be hex, rgb, or rgba, such as '#ff0000' or 'rgba(255,0,0,0.5)'.

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
**Example**

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Color mapping used to map data values to specific colors.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
 'profit': 'red',

:::

**Example**
{
 'sales': 'blue',
}
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positive/negative color configuration; defines the color for negative values in the chart

:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Label configuration for defining chart data labels, including their position, format, and style.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Whether labels display measure values.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether labels display the percentage of measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether labels display dimension labels

Display all dimension labels

Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 100000 converts to 10K, ratio:1000, symbol:"K"
Number format suffix



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Number format prefix

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)
**Example**
- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
Label font size.



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Label font weight.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label background color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Label stroke (outline) color.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label font color.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label position.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the label overlap avoidance function is enabled.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Label filtering; the default condition relationship between selectors is OR.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
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

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including its position, format, style, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether legend functionality is enabled

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the legend border is enabled

:::

:::warning{title=Warning}
Interactive region selection capabilities.

:::

**Example**
**Example**



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Disabled pager icon color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Legend font size

:::

**Example**
Visual style for markers inside the selected region.



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Legend font weight

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legend shape

:::

:::warning{title=Warning}
Interactive region selection capabilities.

:::

**Example**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legend position

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum columns or rows when there are many legend items

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
Interactive region selection capabilities.

:::

**Example**
Brush mode; defines whether single or multiple areas can be selected.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Whether to enable brush selection

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
A fixed list of values to determine category order.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Sorting logic for legend items.



\- `polygon`: Polygonal selection, allowing the drawing of arbitrary polygons by clicking multiple points



Brush selection mode: single or multiple

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether brush selection is enabled

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
\- `polygon`: Polygonal selection, allowing selection by drawing an arbitrary polygon through multiple points



\- `y`: Y-axis selection, restricting selection to the Y-axis direction while the X-axis remains unconstrained

\- `rect`: rectangular brush selection, available in both X-axis and Y-axis directions

\- `polygon`: polygon brush selection, draws an arbitrary polygon by clicking multiple points

\- `x`: brush selection in the X-axis direction only; the Y-axis direction is unrestricted

\- `y`: Y-axis brush selection, only constrained in the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
\- `multiple`: Multiple mode, where multiple brush selections can coexist simultaneously



The gap between adjacent columns in a group.

Defines the style of data points outside the selected brush area

\- `multiple`: multiple selection mode; multiple brush areas can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether to clear the brush area after selection ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Opacity of unselected data points, ranging from 0 to 1



Defines the style of brushed data points

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Whether to automatically limit label length. When a label exceeds the length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.



Opacity of selected data points, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Defines the style of data points outside the brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Whether to automatically limit label length. When a label exceeds the length, it is truncated with an ellipsis and the full label is shown on hover. Only effective for discrete axes.



Opacity of data points outside the brush selection, range 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Stroke width

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Beschreibung}
Vertical tooltip



Fallback solution when code execution fails or the environment is not supported.



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether to show the crosshair rectangular-area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- Supports arbitrarily complex data filtering conditions

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
X-axis sort configuration. Supports sorting by dimensions or measures and custom sort order.



- in: Select data items where the dimension field value is in the 'value' list.

:::

**Example**
Dimension field ID (the `id` of an item in `dimensions`).
Chart animated filter configuration
field: 'sales'
}
Dimension field ID (the `id` of an item in `dimensions`).
Operator
}

const grouped = _.groupBy(data, 'area');
Visual properties for area markers (fill color, opacity).
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Example**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
Visual properties for area markers (fill color, opacity).
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
\- `__row_index` steht fur die Zeilennummer des ursprunglichen Datenelements, `field` fur das hervorzuhebende Feld.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}
Legend sort configuration, supporting sorting by dimension or measure and custom order



Point color.

:::

**Example**
Point color opacity.
Chart animated filter configuration
field: 'sales'
}
Point color opacity.
Operator
}

const grouped = _.groupBy(data, 'area');
Visual properties for area markers (fill color, opacity).
_.maxBy(group, item => item.profit / item.sales)
Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Example**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
Visual properties for area markers (fill color, opacity).
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Line style configuration. Used to define the style of lines in the chart, including color, transparency, curvature, etc.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Chart theme. Theme is a lower-priority feature configuration that includes common settings shared by all chart types and settings shared by a single chart type. Built-in themes include light and dark, and users can customize themes through Builder.



**Example**



selector = 100

:::

**Example**
selector = [{ profit: 100 }, { profit: 200 }]

Conditional Dimension Selector:

field: 'category',




### length

**Type:** `number`

### brand

**Type:** `brand`


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Distance between columns in the same category. It can be a pixel value or a percentage string.

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Beschreibung}
Rectangle mark style



Bar chart style configuration used to define bar color, border, corner radius, and related settings.

Supports global style or conditional style configuration

Datenfilter

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**Example**
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

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
**Example**



\- in: Select data items where the value of the dimension field is in the value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the bar mark (rectangle mark) is visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Written during the prepare() phase; read-only at runtime.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Border color of the bar mark (rectangle mark)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
'Annotation Text'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Text color.

:::

**Example**
400

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**



Text font size

:::

**Example**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Beschreibung}
Line mark style



Line mark style configuration, used to define line color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Datenfilter

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**Example**
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

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
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

:::note{title=Beschreibung}
Ob Liniensegmente sichtbar sind

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente geglaettet werden

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Liniensegments

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Liniensegmentfarbe

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Liniensegments

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
true

:::

**Example**
`lineStyle: 'solid'`




## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Point mark style



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Datenfilter

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**Example**
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

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
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

:::note{title=Beschreibung}
Whether points are visible

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Point size



Point size

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Point mark color



Point mark color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Point mark color opacity



Point mark color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Point mark border color



Point mark border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Point mark border width



Point mark border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Point mark border style



Point mark border style

:::

**Example**
400

dashed

dotted




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Beschreibung}
Area mark style



Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Datenfilter

- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- in: Select data items where the dimension field value is in the 'value' list.



- not in: Select data items where the dimension field value is not within the `value` array.

**Example**

:::

**Example**
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

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
**Example**



\- in: Select data items where the value of the dimension field is in the value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Area mark color opacity



Area mark color opacity

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Text color.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



return _.flatten(

{ __row_index: item.__row_index, field: 'product' },



\- Use built-in utility functions for data manipulation

- Input: data array (items include __row_index).

- Restricted: no eval, Function, async, DOM, or network APIs.

User's filtering requirement description (natural language).



**Example**



  field: 'sales'



Chart dynamic filter configuration



AI-generated JavaScript filtering code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
__row_index: item.__row_index,

}));



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

Highlight data items meeting multiple filtering conditions:

const filtered = _.filter(data, item => {

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
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

:::note{title=Beschreibung}
'red'

:::

**Example**
'Markierungstext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Example**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
**Example**

Recommended value is 'right', which keeps the text on the left side of the annotation point.

Schriftgrosse des Textes.

Text color

**Beispiel**

:::

**Example**
'right' Text befindet sich links vom Markierungspunkt



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

'top'

bottom: Text is at the top of the reference line; the bottom edge aligns with the endpoint of the (vertical) annotation line.

'right'

:::

**Example**
Text color.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
background corner radius

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Example**
12



### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Example**

**Example**

Ob der Hintergrund sichtbar ist.

:::

**Example**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe.

Line style.

**Beispiel**

:::

**Example**
offsetX: 5, moves the whole annotation point right by 5 pixels




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Dimension-value annotation line, displayed vertically. It can configure the annotation line position, style, and related settings.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

**Example**

'red'

4

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
**Example**



\- in: Select data items where the value of the dimension field is in the value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Example**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Example**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.

Textfarbe.

Annotation line label position (relative position of the label to the line).

**Beispiel**

:::

**Example**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

- center: Text is centered in the annotation area.

'Annotation Text'

'center' (text is in the middle of the annotation area)

:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Example**
'center' Text is centered in the annotation area



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Example**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Example**
**Example**



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
background corner radius

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Example**
12




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
Numeric annotation line, including average, maximum, and minimum lines. Displayed horizontally and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as average lines.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
**Example**

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.



Background border corner radius.

Line visibility.



true

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Read-only runtime result of the filter execution.



])

**Example**

'red'

4

return profitRate > 0.2 && item.sales > 5000;

:::

**Example**
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

:::note{title=Beschreibung}
Operator:

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
**Example**



\- in: Select data items where the value of the dimension field is in the value

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Example**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
2



Label position of the annotation line, relative to the line.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Example**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

**Beispiel**

background color

:::

**Example**
'red'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

Strichfarbe des Hintergrunds

**Beispiel**

**Example**

:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
background corner radius

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Example**
12



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**



**Example**

:::

**Example**
**Example**



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Example**
'center' Text is centered in the annotation area



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Example**
**Example**



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Example**
**Example**



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Strichelstil des Rahmens des Anmerkungsbereichs.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Primary color for the part greater than the annotation value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Annotation region configuration. Defines chart annotation regions based on selected data, including position, style, and related settings.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Executes in a Web Worker sandbox. 

Filter values.

Color for disabled paging arrows.

Dynamic filter (AI-generated code execution).

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Legend configuration, used to define the chart's legend, including position, format, and style.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Example**
'Markierungstext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Beschreibung}
2

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Example**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Example**
**Example**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Konfiguration der polynomialen Regressionslinie, einschliesslich Polynomordnung, Stil der Regressionslinie usw.

Es wird empfohlen, 'center' zu setzen, damit der Text in der Mitte des Markierungsbereichs liegt

right: text is on the left side of the annotation area; the right edge of the text aligns with the annotation area

left: text is on the right side of the annotation area; the left edge of the text aligns with the annotation area

center: text is centered in the annotation area; the center of the text aligns with the annotation area

:::

**Example**
'center' Text befindet sich in der Mitte des Markierungsbereichs



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Text vertical alignment. Generally set it to top so text appears at the bottom of the annotation area and remains inside the visible chart area.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Ordnung der polynomialen Regression

:::

**Example**
'top' Text befindet sich am unteren Rand des Markierungsbereichs



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Example**

:::

**Example**
**Example**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
background corner radius

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe



Textfarbe

:::

**Example**
'center' Text is centered in the annotation area



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Example**
**Example**



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

:::

**Example**
12



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Example**
12



### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Markierungsbereichs

:::

**Example**
'center' Text is centered in the annotation area



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Annotation area fill opacity

:::

**Example**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Annotation area border color

:::

**Example**
'center' Text is centered in the annotation area



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Annotation area border width

:::

**Example**
**Example**



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Annotation area border radius

:::

**Example**
12



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Annotation area border line style

:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Randabstand des Markierungsbereichs

:::

**Example**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Beschreibung}
Whether to enable dimension linkage when pivot or measure grouping is enabled on the chart

When hovering over a dimension value, highlight data with the same dimension value in other charts



Konfiguration der Dimensionsverknüpfung für Pivot-Diagramme

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung für Pivot-Diagramme aktiviert wird

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tooltip-Informationen für die Unterdiagramme aller entsprechenden Dimensionen angezeigt werden

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das zum crosshair gehörende Label angezeigt wird

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Internationalization configuration. Chart language configuration supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::

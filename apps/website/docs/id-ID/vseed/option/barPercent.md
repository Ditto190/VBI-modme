# BarPercent

:::info{title=Rekomendasi}
See the corresponding option description.

See the corresponding option description.

:::

:::info{title=Pemetaan encoding}
Percentage bar charts support the following visual channels:

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

:::note{title=Deskripsi}
Percentage bar chart, suitable for horizontally displaying category proportions. The X-axis shows proportions as percentages.

Applicable scenarios:

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

:::warning{title=Warning}
Data requirements:

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

Enabled by default:

See the corresponding option description.

:::


## chartType

**Type:** `"barPercent"`

:::note{title=Deskripsi}
Percentage bar chart, displaying category proportions horizontally as percentages

:::

**Example**
'barPercent'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Data source. A pre-aggregated dataset that follows the TidyData specification and defines the chart data source and structure. User input does not need extra processing. VSeed performs data reshape automatically, and percentage bar chart data is eventually converted to 2 dimensions and 1 measure.

:::

**Example**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Deskripsi}
Dimensions. The first dimension is placed on the Y-axis. Other dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'category'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
dimensionalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Deskripsi}
dimensiontimeformatconfiguration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Deskripsi}
dimensionmappingchannel

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.




### id

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

\- localeasen\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 convertas 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1000, significantDigits:1
\- 1234.5678 convertas 1200, significantDigits:2
\- 1234.5678 convertas 1230, significantDigits:3
\- 1234.5678 convertas 1234, significantDigits:4
\- 1234.5678 convertas 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 convertas 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 convertas 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1000, significantDigits:1
\- 1234.5678 convertas 1200, significantDigits:2
\- 1234.5678 convertas 1230, significantDigits:3
\- 1234.5678 convertas 1234, significantDigits:4
\- 1234.5678 convertas 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 convertas 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Deskripsi}
measuremappingchannel

See the corresponding option description.

See the corresponding option description.

\- color: measuremappingcolor

\- label: measuremappinglabel

\- tooltip: measuremappingtooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

:::tip{title=Tip}
See the corresponding option description.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
labelfeaturewhetherenable

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
labelwhetherdisplaydimensionlabel

displayalldimensionlabel

See the corresponding option description.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 convertas 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1000, significantDigits:1
\- 1234.5678 convertas 1200, significantDigits:2
\- 1234.5678 convertas 1230, significantDigits:3
\- 1234.5678 convertas 1234, significantDigits:4
\- 1234.5678 convertas 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 convertas 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
labelfontsize

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
labelfontcolor

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
labelposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.

See the corresponding option description.



#### code

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

See the corresponding option description.
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

See the corresponding option description.
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

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Dynamic filter execution result (runtime field)



Written during prepare(); read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
legendfeaturewhetherenable

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
legendborderwhetherenable

:::

:::warning{title=Warning}
See the corresponding option description.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
legendfontcolor

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
legendfontsize

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
legendfontcolor

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
legendshape

:::

:::warning{title=Warning}
See the corresponding option description.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
legendposition

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

:::warning{title=Warning}
See the corresponding option description.

:::

**Example**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Deskripsi}
regionpadding



See the corresponding option description.

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

:::note{title=Deskripsi}
See the corresponding option description.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.



See the corresponding option description.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
brushtype



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Deskripsi}
Animation configuration



See the corresponding option description.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationeasefunction

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationhighlightoratmospherecolor

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationeasefunction

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationhighlightoratmospherecolor

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
whetherenableloopanimation

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationeasefunction

:::

###### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
animationhighlightoratmospherecolor

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.
\- 100000 convertas 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 convertas 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1000, significantDigits:1
\- 1234.5678 convertas 1200, significantDigits:2
\- 1234.5678 convertas 1230, significantDigits:3
\- 1234.5678 convertas 1234, significantDigits:4
\- 1234.5678 convertas 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 convertas 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- 1234.5678 convertas 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 convertas 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
labelwhethervisible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
labelcolor

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
labelfontsize

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}
animation easing function

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
labelwhethervisible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
labelcolor

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
labelfontsize

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}
animation easing function

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

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

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

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

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.



Theme



Built-in themes include light and dark. New themes can be registered with registerTheme.

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

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

supportsglobalstyleorconditionstyleconfiguration

Data filter

When selector is configured, it supports four data matching modes: value selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Data selector



When selector is configured, it supports four data matching modes: value selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

**Example**
See the corresponding option description.
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

See the corresponding option description.
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

See the corresponding option description.
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

See the corresponding option description.
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

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.

See the corresponding option description.



#### code

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

See the corresponding option description.
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

See the corresponding option description.
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

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
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

:::note{title=Deskripsi}
See the corresponding option description.

:::

### barColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

**Example**
4

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.



See the corresponding option description.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.

See the corresponding option description.



#### code

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

See the corresponding option description.
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

See the corresponding option description.
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

:::note{title=Deskripsi}
See the corresponding option description.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Dynamic filter execution result (runtime field)



Written during prepare(); read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
annotationtext

:::

**Example**
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
textcolor

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
textfontsize

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.



### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.



See the corresponding option description.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.

See the corresponding option description.



#### code

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

See the corresponding option description.
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

See the corresponding option description.
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

See the corresponding option description.
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Dynamic filter execution result (runtime field)



Written during prepare(); read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
annotationtext

:::

**Example**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
textcolor

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
textfontsize

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.



See the corresponding option description.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
See the corresponding option description.

See the corresponding option description.



#### code

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

See the corresponding option description.
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

See the corresponding option description.
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

See the corresponding option description.
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Dynamic filter execution result (runtime field)



Written during prepare(); read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
annotationtext

:::

**Example**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
textposition



See the corresponding option description.

:::

**Example**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
textcolor

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
textfontsize

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

**Example**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
See the corresponding option description.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Select the value of a dimension field in data items. Arrays are supported.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
annotationtext

:::

**Example**
'annotationtext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Deskripsi}
textposition

:::

**Example**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
textcolor

:::

**Example**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
textfontsize

:::

**Example**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

See the corresponding option description.

:::

**Example**
See the corresponding option description.



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

**Example**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.



See the corresponding option description.

:::

**Example**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

**Example**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

See the corresponding option description.



See the corresponding option description.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
See the corresponding option description.

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Deskripsi}
language



Chart language configuration. Supports 'zh-CN' and 'en-US'. You can also call intl.setLocale('zh-CN') to set the language.

:::


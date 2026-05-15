# Scatter

:::info{title=Recommendation}
\- Recommended field configuration: `2` measures and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Scatter charts support the following visual channels:

`xAxis`  : X-axis channel, supports `multiple measures`, mapped to the X-axis by measure value

`yAxis`  : Y-axis channel, supports `multiple measures`, mapped to the Y-axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Deskripsi}
Scatter chart, suitable for showing data distribution with point positions representing data values

Skenario penggunaan:

\- Analyze distribution characteristics such as central tendency, range, and outliers

:::

:::warning{title=Warning}
Data requirements:

\- At least two numeric fields (measures)

\- The first measure field is placed on the X-axis, and the remaining measures are merged and mapped to the Y-axis

\- Measure names and dimension names are merged and displayed as legend items

Features enabled by default:

\- Legend, axes, data point markers, tooltips, and trend lines are enabled by default

:::


## chartType

**Type:** `"scatter"`

:::note{title=Deskripsi}
Diagram scatter



Scatter chart, suitable for showing data distribution with point positions representing data values

:::

**Contoh**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Scatter chart data is eventually converted to two dimensions and one measure.

:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.



The first dimension in a scatter chart is mapped to the X-axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items

:::

**Contoh**
[{id: "month", alias: "Bulan"}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID field yang sesuai dengan dimensi

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias dimensi

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format tanggal dimensi

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Deskripsi}
Granularitas waktu, menentukan presisi tampilan tanggal

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Deskripsi}
Scatter chart measures

:::

**Contoh**
[
  {
    id: 'profit', alias: 'Laba', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: 'Penjualan', encoding: 'yAxis'
  }
]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias metrik, boleh duplikat; jika tidak diatur, alias bernilai id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Saat diaktifkan, label data chart dan tooltip otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale

Aturan format: angka desimal dengan compact notation aktif, minimal 0 digit desimal, maksimal 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik; otomatis diterapkan pada label dan tooltip

Catatan: Untuk memakai format kustom, autoFormat=false harus diatur secara eksplisit; jika tidak, autoFormat akan menimpa konfigurasi ini

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**


Fungsi easing animasi






#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom

:::

**Contoh**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**


Fungsi easing animasi






#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom

:::

**Contoh**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- xAxis: Measure mapped to the X-axis

\- yAxis: metrik dipetakan ke sumbu y

\- size: size mapped from the measure

\- color: metrik dipetakan ke channel warna

\- label: metrik dipetakan ke kanal label

\- tooltip: metrik dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam bentuk konfigurasi metrik datar, membangun grup metrik berbentuk tree. parentId menunjuk ke id grup metrik induk untuk membangun tree metrik

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi tree metrik: Opsi 1 langsung mengonfigurasi tree metrik dengan children; Opsi 2 mengonfigurasi daftar metrik datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Deskripsi}


:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}


:::

**Contoh**
'2023\-01\-01'




## size

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Label



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**


Fungsi easing animasi






#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom

:::

**Contoh**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
or

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}


:::


#### field

**Type:** `string`

:::note{title=Deskripsi}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}




Warna stroke latar belakang













'red'











Radius sudut latar belakang

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot item data dengan penjualan lebih dari 1000"

"Sorot item data dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value

**Contoh**





**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Contoh**
Sorot field sales dari item data dengan penjualan lebih dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan margin laba tertinggi di setiap wilayah
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

Sorot item data yang memenuhi beberapa kondisi filter
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


:::


##### field

**Type:** `string`

:::note{title=Deskripsi}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}




Warna teks

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
Legenda



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

:::warning{title=Warning}


:::

**Contoh**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}


:::

:::warning{title=Warning}


:::

**Contoh**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}






:::

:::warning{title=Warning}


:::

**Contoh**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
Tooltip



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Brush selection



Brush selection configuration, used to enable or disable brush selection.



Mode seleksi brush: tunggal atau ganda

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Opasitas of selected data points, range 0-1



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `boolean | undefined`

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Sumbu X, sumbu kategori, konfigurasi sumbu X; mendefinisikan sumbu X chart, termasuk posisi, format, gaya, dll.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `boolean | undefined`

:::


## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether scatter chart animation is enabled

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=Deskripsi}
Scatter chart animation parameters

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=Deskripsi}
Scatter chart appear animation configuration

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=Deskripsi}
Scatter chart appear effects, supporting grow and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation highlight or atmosphere color

:::

#### update

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=Deskripsi}
Scatter chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}
Scatter chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=Deskripsi}
Scatter chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
Loop animation interval, in milliseconds

:::

##### loop

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=Deskripsi}
Scatter chart loop animation configuration

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=Deskripsi}
Scatter chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether the current animation stage is enabled

:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Animation duration, in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Animation highlight or atmosphere color

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Deskripsi}
Scatter chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Deskripsi}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Deskripsi}
Sumbu X



Numeric axis. X-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}
Garis sumbu width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}
Tick sumbu X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menggunakan sumbu logaritmik, hanya berlaku untuk sumbu numerik

:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu Y (sumbu kategori) untuk mendefinisikan sumbu Y, termasuk posisi, format, gaya, dll.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**


Fungsi easing animasi






#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom

:::

**Contoh**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
**Contoh**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda; mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom; array sort mengikuti urutan kiri ke kanan atau atas ke bawah.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Urutan kustom; urutan ini akan langsung diterapkan ke legenda. Naik mengikuti kiri-ke-kanan atau atas-ke-bawah; turun mengikuti kanan-ke-kiri atau bawah-ke-atas.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
Mencakup tema bawaan `light` dan `dark`. Tema kustom dapat ditambahkan melalui `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Mendukung gaya global atau konfigurasi gaya bersyarat.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Deskripsi}
Sumbu Y



Numeric axis. Y-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}
Garis sumbu width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}
Tick sumbu X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menggunakan sumbu logaritmik, hanya berlaku untuk sumbu numerik

:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu Y (sumbu kategori) untuk mendefinisikan sumbu Y, termasuk posisi, format, gaya, dll.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**


Fungsi easing animasi






#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom

:::

**Contoh**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
**Contoh**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda; mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom; array sort mengikuti urutan kiri ke kanan atau atas ke bawah.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Urutan kustom; urutan ini akan langsung diterapkan ke legenda. Naik mengikuti kiri-ke-kanan atau atas-ke-bawah; turun mengikuti kanan-ke-kiri atau bawah-ke-atas.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
Mencakup tema bawaan `light` dan `dark`. Tema kustom dapat ditambahkan melalui `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Mendukung gaya global atau konfigurasi gaya bersyarat.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Deskripsi}
Garis panduan vertikal



Vertical guide line shown when the mouse moves over the chart



Konfigurasi garis crosshair, yaitu jenis konfigurasi untuk menampilkan garis crosshair (garis panduan) pada chart

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah garis crosshair ditampilkan

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna label garis crosshair

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether the crosshair line label is shown

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar label garis crosshair

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Contoh**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Deskripsi}
Gaya markah titik



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Filter data

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.



**Type:** `string | undefined`



:::

**Contoh**
Warna stroke primitive bar (persegi panjang)
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

:::note{title=Deskripsi}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}




Warna stroke latar belakang















'red'











Radius sudut latar belakang

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot item data dengan penjualan lebih dari 1000"

"Sorot item data dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value

**Contoh**





**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Contoh**
Sorot field sales dari item data dengan penjualan lebih dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan margin laba tertinggi di setiap wilayah
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

Sorot item data yang memenuhi beberapa kondisi filter
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


:::


##### field

**Type:** `string`

:::note{title=Deskripsi}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}




Warna teks

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah titik terlihat

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran titik



Ukuran titik

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna markah titik



Warna markah titik

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna markah titik



Opasitas warna markah titik

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border markah titik



Warna border markah titik

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border markah titik



Lebar border markah titik

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya border markah titik



Gaya border markah titik

:::

**Contoh**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Titik anotasi



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}


:::


#### field

**Type:** `string`

:::note{title=Deskripsi}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}




Warna stroke latar belakang















'red'











Radius sudut latar belakang

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot item data dengan penjualan lebih dari 1000"

"Sorot item data dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value

**Contoh**





**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Contoh**
Sorot field sales dari item data dengan penjualan lebih dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan margin laba tertinggi di setiap wilayah
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

Sorot item data yang memenuhi beberapa kondisi filter
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


:::


##### field

**Type:** `string`

:::note{title=Deskripsi}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}




Warna teks

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
'red'

:::

**Contoh**
'Teks penanda'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}




Ukuran font teks.

**Type:** `string | string[] | undefined`

**Contoh**

:::

**Contoh**
'right' Teks berada di sisi kiri titik penanda



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
**Contoh**









:::

**Contoh**
'top' Teks berada di bagian bawah titik penanda



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding latar belakang

:::

**Contoh**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}




Apakah latar belakang terlihat.

:::

**Contoh**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Warna latar belakang.

**Type:** `number | undefined`

**Contoh**

:::

**Contoh**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Garis anotasi vertikal



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as X-axis measure averages.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Ambil nilai penjualan tertinggi sebagai referensi garis penanda"

"Hitung rata-rata penjualan untuk garis penanda"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Contoh**

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

:::note{title=Deskripsi}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}




Warna teks

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
'red'

:::

**Contoh**
'Teks penanda'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

**Contoh**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
left: Teks berada di sebelah kanan area anotasi, dengan tepi kiri sejajar dengan area.

center: Teks berada di tengah area anotasi.

Warna teks.

**Type:** `number | undefined`

**Contoh**

:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
middle: Teks dipusatkan secara vertikal di area anotasi.









:::

**Contoh**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border area anotasi.

:::

**Contoh**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border area anotasi.

:::

**Contoh**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Radius sudut border area anotasi.

:::

**Contoh**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding latar belakang

:::

**Contoh**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
Garis anotasi horizontal



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as Y-axis measure averages.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Ambil nilai penjualan tertinggi sebagai referensi garis penanda"

"Hitung rata-rata penjualan untuk garis penanda"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Contoh**

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

:::note{title=Deskripsi}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}




Warna teks

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
'red'

:::

**Contoh**
'Teks penanda'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
2





:::

**Contoh**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
left: Teks berada di sebelah kanan area anotasi, dengan tepi kiri sejajar dengan area.

center: Teks berada di tengah area anotasi.



**Contoh**



:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
middle: Teks dipusatkan secara vertikal di area anotasi.



warna stroke latar belakang

**Contoh**



:::

**Contoh**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**



**Contoh**

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding latar belakang

:::

**Contoh**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}






:::

**Contoh**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border area anotasi.

:::

**Contoh**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border area anotasi.

:::

**Contoh**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Radius sudut border area anotasi.

:::

**Contoh**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Deskripsi}
Gaya garis putus-putus border area anotasi.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
Area anotasi



Annotation region configuration. Defines chart annotation regions based on selected data, including position, style, and related settings.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fungsi linkage dimensi ketika chart mengaktifkan perspektif atau ketika measure digabungkan.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
'red'

:::

**Contoh**
'Teks penanda'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Deskripsi}
2

:::

**Contoh**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Konfigurasi garis regresi polinomial, termasuk orde polinomial, gaya garis regresi, dll.

Disarankan mengatur ke 'center' agar teks berada di tengah area penanda







:::

**Contoh**
'center' Teks berada di tengah area penanda



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}








Orde regresi polinomial

:::

**Contoh**
'top' Teks berada di bagian bawah area penanda



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks



Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**



**Contoh**

:::

**Contoh**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding latar belakang

:::

**Contoh**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna area penanda

:::

**Contoh**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Margin area penanda

:::

**Contoh**
0




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi linear



Linear regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah diaktifkan

:::

### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis regresi

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=Deskripsi}
Graphic blur effect strength

:::

**Contoh**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Graphic shadow color

:::

**Contoh**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Horizontal shadow offset distance

:::

**Contoh**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical shadow offset distance

:::

**Contoh**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=Deskripsi}
Locally weighted regression line configuration item



Locally weighted regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah diaktifkan

:::

### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis regresi

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi polinomial



Polynomial regression line configuration, including polynomial order, line style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah diaktifkan

:::

### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis regresi

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### degree

**Type:** `number | undefined`

:::note{title=Deskripsi}
Polynomial regression order

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi logistik



Logistic regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah diaktifkan

:::

### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis regresi

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
[2, 2]

:::

**Contoh**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
0

:::

**Contoh**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Whether to enable dimension linkage when pivot or measure grouping is enabled on the chart

When hovering over a dimension value, highlight data with the same dimension value in other charts



Konfigurasi tautan dimensi chart pivot

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah mengaktifkan tautan dimensi chart pivot

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan informasi Tooltip dari sub-chart yang sesuai dengan semua dimensi

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Deskripsi}
Bahasa



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::


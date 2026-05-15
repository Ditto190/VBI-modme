# Radar

:::info{title=Recommendation}
\- Recommended field configuration: `1` measure and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Radar charts support the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapped to the angle axis by dimension value

`radius` : Radius channel, supports `multiple measures`, mapped to the radius axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Description}
Radar chart, suitable for comparative analysis of multidimensional data, showing value distribution across dimensions through a multi-axis coordinate system

Skenario penggunaan:

\- Compare overall performance across multidimensional data

\- Evaluate multiple objects across multiple measures

\- Show multidimensional features of categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least one numeric field (measure)

\- The first dimension becomes the radar axes; other dimensions are compared as different series

\- Supports displaying multiple measures as separate series

Features enabled by default:

\- Legend, radar coordinate system, data labels, tooltip, and value scaling are enabled by default

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Radar chart



Radar chart, showing multidimensional comparison through a multi-axis coordinate system

:::

**Example**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Radar chart data is eventually converted to two dimensions and one measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.



The first dimension of a radar chart is mapped to the angle axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=Description}
ID field yang sesuai dengan dimensi

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias dimensi

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Konfigurasi format tanggal dimensi

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Granularitas waktu, menentukan presisi tampilan tanggal

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Kanal tempat dimensi dipetakan

\- angle: supports mapping multiple dimensions to the angle channel

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke channel tooltip

\- label: mendukung pemetaan beberapa dimensi ke channel label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
Metrik



Radar chart measures are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
ID metrik, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias measure, duplikat diperbolehkan; jika tidak diatur, alias menggunakan ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa.

Setelah diaktifkan, label data dan tooltip chart akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale.

Aturan format: angka desimal, notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser.

Contoh:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip.

Catatan: Untuk menggunakan format kustom, autoFormat harus secara eksplisit diatur ke false; jika tidak, autoFormat akan menimpa konfigurasi ini.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Rasio format angka, tidak boleh 0

:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Ketebalan font label


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Garis sumbu width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Rasio format angka, tidak boleh 0

:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Ketebalan font label


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Garis sumbu width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Kanal tempat metrik dipetakan

\- radius: radius mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Membangun grup measure berbentuk pohon dalam bentuk konfigurasi measure datar. parentId menunjuk ke ID grup measure induk, digunakan untuk membangun pohon measure.

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon measure: Opsi 1 langsung mengonfigurasi pohon measure dengan children; Opsi 2 mengonfigurasi daftar measure datar dengan parentId. Kedua metode ini tidak dapat digunakan bersamaan.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Field paginasi; menentukan nama field untuk paginasi, harus berupa dimensi.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Nilai paginasi saat ini; menentukan nilai yang digunakan untuk menentukan halaman saat ini.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Warna



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Skema warna diskret yang digunakan untuk mendefinisikan warna berbagai elemen dalam chart.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Skema warna gradien linear yang digunakan untuk mendefinisikan warna berbagai elemen dalam chart.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Pemetaan warna untuk memetakan nilai data ke warna tertentu.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai positif dalam chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai negatif dalam chart.

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Label



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Apakah fungsi label diaktifkan.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah label berpindah ke baris berikutnya.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah label menampilkan nilai metrik.

Dalam skenario multi-metrik, tidak perlu khawatir tentang konflik nilai karena semua metrik terkait plot melalui proses `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah label menampilkan nilai measure sebagai persentase.

Dalam skenario multi-metrik, tidak perlu khawatir tentang konflik nilai karena semua metrik terkait plot melalui proses `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah label menampilkan label dimensi.

Menampilkan semua label dimensi.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah nilai label diformat otomatis; ketika autoFormat bernilai true, konfigurasi numFormat diabaikan.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Konfigurasi format nilai label; digabung dengan `format` pada `measure`, dan `format` milik `measure` memiliki prioritas lebih tinggi. Prioritas numFormat lebih rendah dari autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Rasio format angka, tidak boleh 0

:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Ketebalan font label


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Garis sumbu width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Tinggi maksimum persegi panjang; dapat berupa nilai piksel atau string persentase.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Warna latar label

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Warna stroke label

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Warna font label

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah warna font label otomatis dibalik berdasarkan warna elemen.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Posisi label

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah penanganan tumpang tindih label diaktifkan.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Seleksi label; kondisi antar selector default-nya OR.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Contoh**







Lebar border latar belakang.

Visibilitas garis.

**Contoh**









Radius sudut border latar belakang.



**Contoh**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value



Offset horizontal titik anotasi dalam piksel. Ketika titik berada di kiri (awal sumbu kategori), disarankan nilai positif; ketika berada di kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri (misalnya -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
offsetX: 5 (seluruh komponen bergeser ke kanan 5 piksel)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



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

:::note{title=Description}
Legenda



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah fitur legenda diaktifkan.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah border legenda diaktifkan.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Warna font legenda.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Warna ikon paginasi.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Warna ikon paginasi saat nonaktif/abu-abu.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Ukuran font legenda.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Warna font legenda.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Ketebalan font legenda.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Tipe bentuk legenda.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Posisi legenda

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Jumlah maksimum kolom atau baris ketika item legenda banyak.

Jika position bersifat horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan.

Jika position bersifat vertikal (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah baris yang ditampilkan.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Brush sumbu Y; hanya memilih pada arah sumbu Y, tanpa batas pada sumbu X.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"



Mendefinisikan gaya titik data di luar seleksi.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Sumbu X, sumbu kategori, konfigurasi sumbu X; mendefinisikan sumbu X chart, termasuk posisi, format, gaya, dll.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
Konfigurasi animasi



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether radar chart animation is enabled

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Radar chart animation parameters

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Radar chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Radar chart appear effects, supporting radial and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

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

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Radar chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Radar chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

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

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Radar chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Radar chart atmosphere animation configuration

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
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Operator



\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

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
Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Filter data

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Contoh**









Lebar border latar belakang.

Visibilitas garis.

**Contoh**









Radius sudut border latar belakang.



**Contoh**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value



Offset horizontal titik anotasi dalam piksel. Ketika titik berada di kiri (awal sumbu kategori), disarankan nilai positif; ketika berada di kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri (misalnya -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
offsetX: 5 (seluruh komponen bergeser ke kanan 5 piksel)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



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

:::note{title=Description}
Apakah titik terlihat

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Ukuran titik



Ukuran titik

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Warna markah titik



Warna markah titik

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opasitas warna markah titik



Opasitas warna markah titik

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Warna border markah titik



Warna border markah titik

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Lebar border markah titik



Lebar border markah titik

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Gaya border markah titik



Gaya border markah titik

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Filter data

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Contoh**









Lebar border latar belakang.

Visibilitas garis.

**Contoh**









Radius sudut border latar belakang.



**Contoh**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value



Offset horizontal titik anotasi dalam piksel. Ketika titik berada di kiri (awal sumbu kategori), disarankan nilai positif; ketika berada di kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri (misalnya -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
offsetX: 5 (seluruh komponen bergeser ke kanan 5 piksel)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



Warna teks

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
Apakah segmen garis terlihat

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Apakah segmen garis dihaluskan

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Warna segmen garis

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Opasitas warna segmen garis

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Lebar segmen garis

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Gaya segmen garis

:::

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Filter data

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
**Contoh**









Lebar border latar belakang.

Visibilitas garis.

**Contoh**









Radius sudut border latar belakang.



**Contoh**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value



Offset horizontal titik anotasi dalam piksel. Ketika titik berada di kiri (awal sumbu kategori), disarankan nilai positif; ketika berada di kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri (misalnya -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
offsetX: 5 (seluruh komponen bergeser ke kanan 5 piksel)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



Warna teks

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Bahasa



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::


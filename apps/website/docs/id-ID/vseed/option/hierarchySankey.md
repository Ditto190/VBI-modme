# HierarchySankey

:::info{title=Pemetaan Encoding}
Diagram Sankey hierarki mendukung saluran visual berikut:

`hierarchy`: kanal hierarki, mendukung `beberapa dimensi`

`size`: kanal ukuran, mendukung `satu measure`

`label`: kanal label, mendukung `beberapa dimensi` dan `beberapa measure`

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa measure`

:::

:::note{title=Deskripsi}
Diagram Sankey hierarki digunakan untuk menampilkan data aliran hierarkis, dengan node pohon dan garis aliran untuk menunjukkan hubungan hierarki serta ukuran aliran

Skenario yang sesuai:

\- Menampilkan hubungan aliran hierarkis dari hulu ke hilir

\- Menekankan distribusi aliran dan penerusan jalur dalam struktur pohon

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal 1 field dimensi untuk membangun struktur hierarki

\- Minimal 1 field numerik (metrik) untuk memetakan ukuran aliran

\- advanced pipeline perlu mengonversi tidyData menjadi struktur children berbentuk pohon yang didukung VChart

:::


## chartType

**Type:** `"hierarchySankey"`

:::note{title=Deskripsi}
Diagram Sankey Hierarki



Diagram Sankey hierarki, menampilkan hubungan aliran dan ukuran aliran dalam struktur hierarki

:::

**Contoh**
'hierarchySankey'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset pra-agregasi yang sesuai TidyData untuk mendefinisikan sumber dan struktur data chart. Pengguna tidak perlu memproses input data secara manual; kemampuan Data Reshape VSeed yang kuat menanganinya secara otomatis. Data Chart Area pada akhirnya di-reshape menjadi 2 dimensi dan 1 metrik.



Dataset yang telah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data chart

:::

**Contoh**
[{region: 'Tiongkok Utara', province: 'Hebei', value: 30}, {region: 'Tiongkok Selatan', province: 'Guangdong', value: 70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.



Konfigurasi dimensi, digunakan untuk menentukan struktur hierarki, mendukung saluran hierarchy / label / tooltip

:::

**Contoh**
[{id: 'region', alias: 'Wilayah'}, {id: 'province', alias: 'Provinsi'}]




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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- hierarchy: mendukung pemetaan beberapa dimensi ke kanal hierarki

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

:::

:::tip{title=Tip}
Dimensi pertama langsung dipetakan ke kanal warna.

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik



Konfigurasi metrik, digunakan untuk menentukan ukuran aliran, mendukung saluran size / label / tooltip

:::

**Contoh**
[{id: 'value', alias: 'Aliran'}]




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
Tipe format angka, mendukung: angka (desimal), persen (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk format angka

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks format angka

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000 , significantDigits:1
\- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
\- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: angka (desimal), persen (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk format angka

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks format angka

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000 , significantDigits:1
\- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
\- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- size: metrik dipetakan ke kanal ukuran, digunakan untuk menampilkan area atau ukuran pada chart seperti Treemap dan Sunburst.

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




Digunakan untuk menentukan nama field paginasi; harus berupa dimensi

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




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}




Warna latar belakang dapat berupa string warna seperti 'red', 'blue', atau hex, rgb, maupun rgba seperti '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna



Konfigurasi warna, digunakan untuk menentukan skema warna chart, termasuk daftar warna, pemetaan warna, gradien warna, dan lain-lain

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
Konfigurasi label untuk menentukan label data chart, termasuk posisi, format, dan style.



Konfigurasi label, digunakan untuk menentukan label data chart, termasuk posisi, format, gaya, dan lain-lain

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
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"




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


:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
\- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}


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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot batang dengan penjualan di atas 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}














:::

**Contoh**
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
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

const profitRate = item.profit / item.sales;
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






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}






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




Konfigurasi legenda, digunakan untuk menentukan tampilan, posisi, dan gaya legenda warna diagram Sankey hierarki

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




### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}


:::

:::warning{title=Warning}


:::

**Contoh**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}






:::

:::warning{title=Warning}


:::

**Contoh**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}




Konfigurasi tooltip, digunakan untuk menentukan informasi tooltip chart, termasuk konten, format, gaya, dan lain-lain

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}




Menyediakan dua tema bawaan, light dan dark; pengguna dapat menyesuaikan tema melalui Builder



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Contoh**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Bahasa



Konfigurasi bahasa chart, mendukung dua bahasa 'zh\-CN' dan 'en\-US'

:::

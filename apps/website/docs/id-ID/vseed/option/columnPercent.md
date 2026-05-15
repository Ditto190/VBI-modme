# ColumnPercent

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` measure, `2` dimensi

\- Mendukung Data Reshape: minimal `1` measure, `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Diagram batang persentase mendukung saluran visual berikut:

`xAxis`  : kanal sumbu x, mendukung `beberapa dimensi`, dipetakan ke sumbu x berdasarkan nilai dimensi

`yAxis`  : kanal sumbu y, mendukung `beberapa measure`, dipetakan ke sumbu y berdasarkan nilai measure

`detail` : kanal detail, mendukung `beberapa dimensi`, digunakan untuk menampilkan data yang lebih granular dalam seri warna yang sama

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu measure`; warna dimensi membedakan seri data, warna measure memetakan nilai measure secara linear ke warna grafis

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa measure`, ditampilkan saat mouse berada di atas titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa measure`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Diagram batang persentase cocok untuk menampilkan hubungan proporsi antar kategori; sumbu Y menampilkan proporsi data dalam bentuk persentase

Skenario yang sesuai:

\- Perbandingan proporsi data dari berbagai kategori

\- Analisis komposisi data multidimensi

\- Tren perubahan proporsi dalam deret waktu

:::

:::warning{title=Warning}
Persyaratan data:

\- Setidaknya 1 field metrik

\- Dimensi pertama akan ditempatkan pada sumbu X; dimensi lainnya akan digabungkan dengan nama measure (jika ada beberapa measure) dan ditampilkan sebagai item legenda.

\- Semua measure otomatis digabung menjadi satu measure

Fitur yang aktif secara default:

\- Secara default mengaktifkan legenda, sumbu, label persentase, tooltip, dan perhitungan proporsi

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=Deskripsi}
Diagram Batang Persentase



Diagram batang persentase, menampilkan hubungan proporsi data tiap kategori dalam bentuk persentase

:::

**Contoh**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset pra-agregasi yang sesuai TidyData untuk mendefinisikan sumber dan struktur data chart. Pengguna tidak perlu memproses input data secara manual; kemampuan Data Reshape VSeed yang kuat menanganinya secara otomatis. Data Chart Area pada akhirnya di-reshape menjadi 2 dimensi dan 1 metrik.



Dataset yang telah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data chart. Dataset masukan pengguna tidak perlu diproses lagi. VSeed memiliki kemampuan reshape data yang kuat dan akan melakukan reshape secara otomatis. Data diagram batang persentase akhirnya akan dikonversi menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.



**Contoh**

:::

**Contoh**
[{id: 'category', alias: 'Kategori'}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- xAxis: mendukung pemetaan beberapa dimensi ke sumbu x

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik



Metrik diagram batang persentase akan otomatis digabung menjadi satu metrik dan dipetakan ke sumbu Y. Jika terdapat beberapa metrik, nama metrik akan digabung dengan dimensi lainnya dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'value', alias: 'Proporsi nilai', format: 'percent'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- yAxis: metrik dipetakan ke sumbu y

\- detail: metrik dipetakan ke channel detail

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
Warna latar belakang chart. Defaultnya latar belakang transparan. Warna latar dapat berupa string warna (misalnya 'red', 'blue') atau nilai hex, rgb, maupun rgba (misalnya '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}


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





## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Deskripsi}





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
Apakah mengaktifkan seleksi brush

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}








Mode seleksi brush: tunggal atau ganda

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Opasitas of selected data points, range 0-1







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






:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


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

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Deskripsi}
Interval sembunyi otomatis label sumbu; jika interval antara dua label teks kurang dari autoHideGap, label yang tumpang tindih otomatis disembunyikan. Hanya efektif untuk sumbu kategori.



Ketika autoHide dinonaktifkan, gunakan sampling yang dikonfigurasi pada minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Deskripsi}


:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Deskripsi}


:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Deskripsi}


:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Deskripsi}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Deskripsi}


:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Deskripsi}


:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Deskripsi}


:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}

:::

###### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Deskripsi}


:::


###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Deskripsi}


:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Deskripsi}

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Tipe garis grid

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Sumbu X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}


Sumbu Y, sumbu numerik, konfigurasi sumbu Y; mendefinisikan sumbu Y chart, termasuk posisi, format, gaya, dll.


:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}


:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

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


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 100000 dikonversi menjadi 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Prefiks format angka

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Label tick sumbu X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}


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


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}


:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Deskripsi}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


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
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Urutan kustom, yang akan langsung diterapkan ke sumbu kategori

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


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


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}

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


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


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
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}


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


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Deskripsi}
Solusi fallback ketika eksekusi kode gagal atau lingkungan tidak didukung.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Sudut membulat tumpukan pada diagram kolom paralel

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Deskripsi}


:::


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Mengimplementasikan logika filtering data kompleks menggunakan kode JavaScript yang dihasilkan AI





:::

**Contoh**


}

Operator
}


\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}


:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}






:::

**Contoh**

Konfigurasi filter animasi chart

}

Mengimplementasikan pemfilteran marker chart (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI
}



_.maxBy(group, item => item.profit / item.sales)





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
])

:::

**Contoh**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI

:::

**Contoh**

\- Parameter input: data (array), setiap item berisi field __row_index yang mewakili nomor baris



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}




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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Deskripsi}
Gaya elemen persegi panjang, digunakan untuk menentukan warna, border, sudut membulat, dan lain-lain pada elemen persegi panjang chart.

Apakah primitive bar (persegi panjang) terlihat






:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}






:::

**Contoh**
Warna stroke primitive bar (persegi panjang)








field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**Contoh**

field: 'profit',
operator: '>=',
value: 100
}

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





:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}





4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}




\- in: Memilih item data ketika nilai field dimensi ada dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value






\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



















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

:::note{title=Deskripsi}
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}





);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}




\- in: Memilih item data ketika nilai field dimensi ada dalam value

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}




Ukuran font teks

:::

**Contoh**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}


:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bagian bawah titik anotasi dan tetap berada dalam area chart yang terlihat.

Disarankan mengatur 'top' agar teks ditampilkan sepenuhnya dalam area chart yang terlihat.

top: Teks berada di bagian bawah titik anotasi; tepi atas teks sejajar dengan titik.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
'top' Text is at the bottom of the annotation point.






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

true













'red'











Radius sudut latar belakang

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Padding latar belakang

:::

**Contoh**
"Sorot batang dengan penjualan di atas 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Nilai negatif menggeser seluruh komponen ke atas; misalnya -10 menggeser teks dan latar belakang ke atas 10 piksel.





**Contoh**







:::

**Contoh**

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



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hitung rata-rata untuk garis anotasi





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

:::

**Contoh**
'Teks anotasi'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}






Warna teks

'Teks Anotasi'

:::

**Contoh**
'right' teks berada di kiri titik anotasi



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Disarankan mengatur 'top' agar teks ditampilkan sepenuhnya dalam area chart yang terlihat.

top: Teks berada di bagian bawah garis referensi; tepi atas sejajar dengan ujung garis anotasi (vertikal).

middle: Teks dipusatkan pada garis referensi; pusatnya sejajar dengan ujung garis anotasi (vertikal).

bottom: Teks berada di bagian atas garis referensi; tepi bawah sejajar dengan ujung garis anotasi (vertikal).



:::

**Contoh**
'top' teks berada di bawah titik anotasi



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
top: Teks berada di bawah garis referensi, dengan tepi atas sejajar dengan ujung garis anotasi (vertikal).

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
'right'

:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}

:::

**Contoh**




### offsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}

**Contoh**



:::

**Contoh**



### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}






:::

**Contoh**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}

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
Cocok untuk skenario ketika posisi garis anotasi perlu ditentukan secara dinamis berdasarkan data, seperti rata-rata, maksimum, kuantil, garis bisnis, dll.

:::

**Contoh**
"Ambil nilai penjualan tertinggi sebagai referensi garis anotasi"

"Hitung rata-rata penjualan untuk garis anotasi"



#### code

**Type:** `string`

:::note{title=Deskripsi}






**Contoh**







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

**Contoh**
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
\- Parameter input: data (array).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Ditulis selama fase prepare(), hanya-baca saat runtime

:::

**Contoh**
'Teks anotasi'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
_.filter(data, item => item.year === 2024),

:::

**Contoh**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
const index = Math.floor(sorted.length * 0.75);

:::

**Contoh**



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}


Posisi teks



Posisi label garis anotasi (posisi relatif label terhadap garis).



:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
**Contoh**

**Contoh**







:::

**Contoh**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Disarankan mengatur 'top' agar teks ditampilkan sepenuhnya dalam area chart yang terlihat.

:::

**Contoh**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
center: Teks berada di tengah garis referensi (di ujung garis mark horizontal).



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
4

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
"Ambil nilai penjualan tertinggi sebagai referensi garis anotasi"

"Hitung rata-rata penjualan untuk garis anotasi"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value



'red'



:::

**Contoh**
\- not in: Memilih item data ketika nilai field dimensi tidak ada dalam value
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
**Contoh**

:::

**Contoh**
'Teks anotasi'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
**Contoh**





:::

**Contoh**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
center: Teks berada di tengah area anotasi; pusat teks sejajar dengan area.

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bagian bawah area anotasi dan tetap berada dalam area chart yang terlihat.

:::

**Contoh**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}








warna latar belakang

:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
warna stroke latar belakang



warna stroke latar belakang

**Contoh**

**Contoh**

:::

**Contoh**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
radius sudut latar belakang

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
padding latar belakang

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Warna area anotasi



Warna area anotasi

:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Contoh**



**Contoh**

:::

**Contoh**




### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




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


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
**Contoh**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
4

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}




Warna area anotasi

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**






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
'Teks anotasi'



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
'center' teks berada di tengah area anotasi



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}








Orde regresi polinomial

:::

**Contoh**
'top' teks berada di bawah area anotasi



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}

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




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**



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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan tautan dimensi saat chart mengaktifkan fitur pivot atau kombinasi metrik

Saat hover pada nilai dimensi tertentu, data dengan nilai dimensi yang sama pada chart lain akan ikut disorot



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

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Konfigurasi bahasa chart, mendukung dua bahasa 'zh\-CN' dan 'en\-US'; selain itu bahasa dapat diatur dengan memanggil metode intl.setLocale('zh\-CN')

:::

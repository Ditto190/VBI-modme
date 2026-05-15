# RaceDonut

:::note{title=Deskripsi}
Diagram Donat Dinamis (Race Donut Chart)

Cocok untuk menampilkan hubungan proporsi data yang berubah seiring waktu, dengan area kosong di tengah untuk menampilkan ringkasan informasi

Skenario penggunaan:

\- Perlu menampilkan data keseluruhan dan perubahan proporsi setiap bagian seiring waktu secara bersamaan

\- Menekankan hubungan antara keseluruhan dan bagian data

\- Area tengah perlu menampilkan metrik utama atau judul

:::

:::note{title=Note}
Diagram Donat Dinamis:

\- Sudut memetakan nilai metrik, warna memetakan nilai dimensi

\- Mendukung kontrol dimensi waktu melalui pemutar untuk menampilkan perubahan proporsi secara dinamis

\- Dibanding diagram pie, area tengah dibiarkan kosong sehingga tampak lebih ringan secara visual

:::


## chartType

**Type:** `"raceDonut"`

:::note{title=Deskripsi}
Diagram donat dinamis, cocok untuk menampilkan hubungan proporsi data yang berubah seiring waktu

:::


## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Sumber data

:::


## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

\- player: mendukung pemetaan beberapa dimensi ke saluran pemutar

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik

:::


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

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- angle: sudut tempat metrik dipetakan

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




## player

**Type:** `Player | undefined`

:::note{title=Deskripsi}
Konfigurasi pemutar untuk menentukan dimensi waktu; konfigurasi inti diagram donat dinamis



Konfigurasi pemutar, digunakan untuk menentukan nama field yang diputar, harus berupa dimensi

:::

:::warning{title=Warning}
Fitur ini tidak mendukung tipe chart seperti table, pivotTable, dualAxis, histogram, boxPlot, dan tidak mendukung penggunaan saat kombinasi metrik atau pivot baris/kolom diaktifkan

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Deskripsi}
Jumlah pemutaran maksimum; data yang melebihi jumlah ini akan dipotong, false berarti tanpa batas

:::

### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
Interval pemutaran, satuan ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah memutar otomatis

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah memutar berulang

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Deskripsi}
Posisi pemutar

:::

### railColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna track progress bar pemutar

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Deskripsi}
Font teks pemutar

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks pemutar

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna progres progress bar pemutar

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna slider progress bar pemutar

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border slider progress bar pemutar

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna tombol mulai pemutar

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna tombol jeda pemutar

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna tombol mundur pemutar

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna tombol maju pemutar

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Konfigurasi warna

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

**Type:** `PieLabel | undefined`

:::note{title=Deskripsi}
Konfigurasi label

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




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**




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




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
**Contoh**




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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Deskripsi}
Metode tata letak label, hanya berlaku untuk diagram pai dan donat serta saat `labelPosition` bernilai `outside`

\- arc: menata label mengikuti bentuk busur

\- labelLine: menyelaraskan kedua sisi label dan menghubungkan elemen sektor dengan label melalui garis panduan

\- edge: menyelaraskan kedua sisi label, menghubungkan elemen sektor dengan label melalui garis panduan, dan mendekatkannya ke kedua tepi chart

:::


## legend

**Type:** `Legend | undefined`

:::note{title=Deskripsi}
Konfigurasi legenda

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
Konfigurasi tooltip

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Konfigurasi brush



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


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Konfigurasi tema



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Konfigurasi bahasa

:::

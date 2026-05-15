# RaceLine

:::note{title=Deskripsi}
Diagram Garis Dinamis (Race Line Chart)

Cocok untuk menampilkan tren data yang berubah seiring waktu; titik data dihubungkan dengan segmen garis untuk membentuk garis tren

Skenario penggunaan:

\- Menampilkan tren perubahan beberapa seri data seiring waktu

\- Membandingkan pola pertumbuhan atau penurunan antar kategori

\- Mengamati fluktuasi data pada dimensi waktu

:::

:::note{title=Note}
Diagram Garis Dinamis:

\- Sumbu X biasanya berupa sumbu waktu atau kategori, menampilkan nilai dimensi

\- Sumbu Y berupa sumbu numerik, menampilkan nilai metrik

\- Mendukung kontrol dimensi waktu melalui pemutar untuk menampilkan proses perpanjangan garis secara dinamis

:::


## chartType

**Type:** `"raceLine"`

:::note{title=Deskripsi}
Diagram garis dinamis, cocok untuk menampilkan tren data yang berubah seiring waktu

:::


## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Sumber data

:::


## dimensions

**Type:** `ColumnDimension[] | undefined`

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- yAxis: metrik dipetakan ke sumbu y

\- detail: Measure mapped to the detail channel

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
Konfigurasi pemutar untuk menentukan dimensi waktu; konfigurasi inti diagram garis dinamis



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

**Type:** `Label | undefined`

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


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu X, sebagai sumbu kategori untuk menampilkan nilai dimensi

:::


### visible

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
'dark'

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

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu Y, sebagai sumbu numerik untuk menampilkan nilai metrik

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}

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

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Deskripsi}
Konfigurasi garis panduan vertikal



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
Apakah label garis crosshair ditampilkan

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar label garis crosshair

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu X





:::

**Contoh**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
])

:::

**Contoh**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
\- `__row_index` mewakili nomor baris item data asli, dan `field` mewakili field yang akan disorot.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda



Konfigurasi filter dinamis chart: memfilter mark chart (batang, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::

**Contoh**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
])

:::

**Contoh**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
  _.maxBy(group, item => item.profit / item.sales)

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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya markah titik

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.






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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya markah garis

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.






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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah segmen garis terlihat

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah segmen garis dihaluskan

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna segmen garis

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna segmen garis

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar segmen garis

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya segmen garis

:::

**Contoh**
`lineStyle: 'solid'`




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik penanda

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

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Menentukan id metrik tempat titik anotasi berada. Dalam skenario multi-measure, dapat digabungkan dengan selector untuk menentukan titik anotasi dari metrik target secara unik.

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


**Contoh**

:::

**Contoh**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Konfigurasi garis anotasi nilai dimensi

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
Konfigurasi garis anotasi numerik

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
Konfigurasi area penanda

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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Konfigurasi tautan dimensi



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
Konfigurasi bahasa

:::

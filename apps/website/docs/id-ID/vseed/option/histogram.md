# Histogram

:::info{title=Pemetaan encoding}
Histogram mendukung kanal visual berikut:

`xAxis`  : kanal x-axis, mendukung `satu dimensi`; nilai dimensi dihitung ke dalam bin lalu ditampilkan pada x-axis

:::

:::note{title=Deskripsi}
Histogram cocok untuk menampilkan distribusi data. x-axis adalah sumbu numerik (data kontinu), y-axis juga sumbu numerik (data kontinu), dan batang disusun vertikal.

Skenario penggunaan:

\- Menampilkan distribusi data, seperti distribusi frekuensi dan distribusi probabilitas

\- Menganalisis kecenderungan pusat dan tingkat penyebaran data

\- Mengidentifikasi outlier dan pola dalam data

:::


## chartType

**Type:** `"histogram"`

:::note{title=Deskripsi}
Histogram, cocok untuk menampilkan distribusi data

:::


## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset yang sudah diagregasi dan sesuai dengan spesifikasi TidyData, digunakan untuk menentukan sumber data dan struktur diagram. Dataset input pengguna tidak perlu diproses terlebih dahulu. VSeed memiliki kemampuan reshape data yang kuat dan akan melakukan reshape data secara otomatis; data diagram kolom pada akhirnya akan diubah menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `HistogramDimension[] | undefined`

:::note{title=Deskripsi}
Histogram biasanya tidak memerlukan dimensi

:::

**Contoh**
[{id: "category", alias: "Kategori"}]




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

**Type:** `"tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- color: mendukung pemetaan beberapa dimensi ke kanal warna

\- detail: mendukung pemetaan beberapa dimensi ke kanal detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `HistogramMeasure[] | undefined`

:::note{title=Deskripsi}
Histogram hanya mendukung satu dimensi, dan datanya berupa data diskret

:::

**Contoh**
[{id: "value", alias: "Nilai"}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias measure, boleh duplikat; jika tidak diatur, alias default adalah ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, konfigurasi ini menimpa semua konfigurasi numFormat

Jika aktif, label data chart dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale.

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser.

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip.

Catatan: Untuk memakai format kustom, Anda harus menetapkan autoFormat=false secara eksplisit; jika tidak, autoFormat akan menimpa konfigurasi ini

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000, significantDigits:1
\- 1234.5678 dikonversi menjadi 1200, significantDigits:2
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3
\- 1234.5678 dikonversi menjadi 1234, significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000, significantDigits:1
\- 1234.5678 dikonversi menjadi 1200, significantDigits:2
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3
\- 1234.5678 dikonversi menjadi 1234, significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "x0" | "x1" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- value: saluran nilai histogram

\- x0: saluran x0 histogram

\- x1: saluran x1 histogram

\- color: metrik dipetakan ke kanal warna

\- label: metrik dipetakan ke kanal label

\- tooltip: metrik dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Membangun grup metrik berbentuk tree dari konfigurasi metrik datar. parentId menunjuk ke id grup metrik induk dan digunakan untuk membangun tree metrik.

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon metrik: opsi 1 adalah langsung mengonfigurasi pohon metrik dengan children; opsi 2 adalah mengonfigurasi daftar metrik datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Konfigurasi paginasi, digunakan untuk menentukan nama field paginasi, dan harus berupa dimensi.

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field pagination; menentukan nama field untuk pagination dan harus berupa dimensi..

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
Nilai pagination saat ini; menentukan nilai untuk menentukan halaman saat ini..

:::

**Contoh**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang chart. Warna latar belakang dapat berupa string warna dan secara default transparan, misalnya 'red' atau 'blue'. Nilai hex, rgb, atau rgba seperti '#ff0000' dan 'rgba(255,0,0,0.5)' juga didukung.

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, mapping warna, dan gradien warna.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna diskret untuk menentukan warna berbagai elemen dalam chart.

:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna gradien linear untuk menentukan warna berbagai elemen dalam chart.

:::

**Contoh**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}
Mapping warna yang digunakan untuk memetakan nilai data ke warna tertentu.

:::

**Contoh**
{
 'sales': 'blue',
}
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai positif di chart..

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai negatif di chart..

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Konfigurasi label untuk menentukan label data dalam chart, termasuk posisi, format, dan gaya.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi label diaktifkan..

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label pindah ke baris berikutnya..

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai measure..

Dalam skenario multi-metrik, tidak perlu khawatir terjadi konflik nilai, karena semua metrik yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu metrik yang mewakili satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai measure. as percentages.

Dalam skenario multi-metrik, tidak perlu khawatir terjadi konflik nilai, karena semua metrik yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu metrik yang mewakili satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan label dimensi..

Displays all dimension labels.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah nilai label diformat otomatis; saat autoFormat true, konfigurasi numFormat diabaikan..

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format untuk nilai label; digabungkan dengan `format` di `measure`, dan `format` di `measure` memiliki prioritas lebih tinggi. numFormat memiliki prioritas lebih rendah daripada autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000, significantDigits:1
\- 1234.5678 dikonversi menjadi 1200, significantDigits:2
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3
\- 1234.5678 dikonversi menjadi 1234, significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

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
Warna latar belakang label

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke label

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font label

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah warna font label otomatis dibalik berdasarkan warna elemen.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
Posisi label

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah penanganan tumpang tindih label diaktifkan.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Label selection; conditions between selectors default to OR.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

sama dengan operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)



\- in: Memilih item data ketika nilai field dimensi berada di dalam value



Core Capabilities:

\- Mendukung kondisi filter data kompleks apa pun

\- Menggunakan fungsi utilitas bawaan untuk operasi data

\- Dieksekusi aman di lingkungan browser (sandbox Web Worker)



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi..



Konfigurasi filter dinamis chart.



Memfilter marker chart (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami).

:::

**Contoh**
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI.



\- Hanya boleh memakai fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array), tiap item berisi field __row_index yang mewakili nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index mewakili nomor baris item data asli, field mewakili field yang disorot

\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Operator

\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare(); hanya-baca saat runtime
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
Konfigurasi legend untuk menentukan legend chart, termasuk posisi, format, dan style.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fitur legend diaktifkan.

:::

**Contoh**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah border legend diaktifkan..

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Contoh**
Bobot font legenda



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font legenda.

:::

**Contoh**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font legenda.

:::

**Contoh**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
Bentuk legenda
:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Contoh**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legend

:::

**Contoh**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Contoh**
Mode brush; menentukan apakah satu atau beberapa area dapat dipilih.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
\- `rect`: Rectangular selection; selection can be made in both X and Y directions simultaneously.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Menentukan bentuk dan arah kotak seleksi.



\- `polygon`: seleksi poligonal, memungkinkan menggambar poligon bebas dengan mengklik beberapa titik



\- `y`: Y-axis brush; selects only in the Y-axis direction, unrestricted on the X-axis.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Define the style of data points that are selected.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
brushtype



Opacity

Opasitas titik data yang dipilih, rentang 0-1

\- `polygon`: seleksi brush poligon; klik beberapa titik untuk menggambar poligon apa pun sebagai seleksi

\- `x`: seleksi brush hanya dalam arah sumbu X; arah sumbu Y tidak dibatasi

\- `y`: seleksi brush arah sumbu Y saja; arah sumbu X tidak dibatasi

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Opasitas titik data yang dipilih, rentang 0-1



Style for unselected data items

Menentukan style titik data di luar area brush yang dipilih

\- `multiple`: mode multi-pilih; beberapa area brush dapat ada bersamaan

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah area brush dibersihkan setelah brushing berakhir

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Opasitas titik data yang tidak dipilih, rentang 0-1



Menentukan style titik data yang terkena brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Style for data NOT selected by the brush.



Menentukan style titik data di luar seleksi.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Menentukan style titik data di luar brush selection

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Style for data NOT selected by the brush.



Opasitas titik data di luar pilihan brush, rentang 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Deskripsi}
X-axis numeric-axis configuration, used to define the diagram X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Warna garis sumbu

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menggunakan sumbu logaritmik; hanya berlaku untuk sumbu numerik

:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval tick sumbu disesuaikan otomatis agar label tick lebih mudah dibaca. Opsi ini dinonaktifkan saat min dan max dikonfigurasi, dan hanya berlaku untuk sumbu numerik.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi sumbu X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu numerik (sumbu Y), digunakan untuk mendefinisikan sumbu Y diagram, termasuk posisi, format, gaya, dan lainnya.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label tick sumbu numerik diformat otomatis. Hanya berlaku untuk sumbu numerik. Saat autoFormat true, numFormat diabaikan.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka untuk sumbu numerik. Hanya berlaku untuk sumbu numerik dan prioritasnya lebih rendah daripada autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung: decimal, percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, mis. %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000, significantDigits:1
\- 1234.5678 dikonversi menjadi 1200, significantDigits:2
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3
\- 1234.5678 dikonversi menjadi 1234, significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Urutan kustom yang akan langsung diterapkan ke sumbu kategori

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Format angka untuk sumbu numerik. Hanya efektif untuk sumbu numerik. Prioritas lebih rendah daripada `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font label

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
  orderBy: 'profit',

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}
Sudut rotasi label

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Garis sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
or

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
Tanda skala sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Urutan sortir; dapat berupa 'asc' atau 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
Judul sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks judul. Secara default mengikuti konfigurasi field.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Tipe garis grid

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi sumbu X

:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}
}

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu numerik sumbu Y, digunakan untuk mendefinisikan sumbu Y chart, termasuk posisi, format, gaya, dan pengaturan terkait.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Warna garis sumbu

:::

### min

**Type:** `number | undefined`

:::note{title=Deskripsi}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Deskripsi}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menggunakan sumbu logaritmik; hanya berlaku untuk sumbu numerik

:::

### logBase

**Type:** `number | undefined`

:::note{title=Deskripsi}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval tick sumbu disesuaikan otomatis agar label tick lebih mudah dibaca. Opsi ini dinonaktifkan saat min dan max dikonfigurasi, dan hanya berlaku untuk sumbu numerik.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi sumbu X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu numerik (sumbu Y), digunakan untuk mendefinisikan sumbu Y diagram, termasuk posisi, format, gaya, dan lainnya.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label tick sumbu numerik diformat otomatis. Hanya berlaku untuk sumbu numerik. Saat autoFormat true, numFormat diabaikan.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Format angka untuk sumbu numerik. Hanya berlaku untuk sumbu numerik dan prioritasnya lebih rendah daripada autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung: decimal, percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, mis. %, ‰

:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1000, significantDigits:1
\- 1234.5678 dikonversi menjadi 1200, significantDigits:2
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3
\- 1234.5678 dikonversi menjadi 1234, significantDigits:4
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Urutan kustom yang akan langsung diterapkan ke sumbu kategori

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Format angka untuk sumbu numerik. Hanya efektif untuk sumbu numerik. Prioritas lebih rendah daripada `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font label

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font label

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}
Sudut rotasi label

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Garis sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
  orderBy: 'profit',

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
Tanda skala sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Sufiks format angka

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Urutan sortir; dapat berupa 'asc' atau 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
Judul sumbu X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks judul. Secara default mengikuti konfigurasi field.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Tipe garis grid

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Deskripsi}
Solusi fallback saat eksekusi kode gagal atau lingkungan tidak didukung.



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
const maxItems = _.map(grouped, group =>

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
_.map(maxItems, item => [

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label area persegi panjang crosshair

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Radius sudut tumpukan chart kolom

:::


## binCount

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah bin histogram, digunakan untuk menentukan jumlah persegi panjang bin (batang) histogram

:::


## binStep

**Type:** `number | undefined`

:::note{title=Deskripsi}
Langkah bin, digunakan untuk menghitung lebar bin dan juga memengaruhi lebar persegi panjang (batang) pada histogram akhir. Jika binCount dan binStep sama-sama diatur, binStep yang digunakan

:::


## binValueType

**Type:** `"count" | "percentage" | undefined`

:::note{title=Deskripsi}
Jenis nilai bin histogram, digunakan untuk menentukan jenis nilai persegi panjang bin (batang) histogram, defaultnya 'count'

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram. Tema adalah konfigurasi fitur berprioritas lebih rendah yang mencakup pengaturan umum untuk semua jenis diagram dan pengaturan bersama dalam satu kategori diagram. Tema bawaan mencakup light dan dark, dan pengguna dapat menyesuaikan tema melalui Builder.



Operator



\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

:::

**Contoh**
Operator

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Deskripsi}
Gaya mark persegi untuk diagram kolom, termasuk warna, batas, dan sudut membulat.

Mendukung gaya global atau gaya bersyarat

Filter data

Jika selector dikonfigurasi, tersedia selector numerik, data lokal, dimensi bersyarat, dan metrik bersyarat

Jika selector tidak dikonfigurasi, gaya berlaku secara global.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Selector data

Jika selector dikonfigurasi, tersedia selector numerik, data lokal, dimensi bersyarat, dan metrik bersyarat

Jika selector tidak dikonfigurasi, gaya berlaku secara global.

:::

**Contoh**
Selector numerik
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector data lokal
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Selector dimensi bersyarat
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

Selector metrik bersyarat
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
Field dimensi; ID item dalam dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

Sama seperti operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Pilih nilai field dimensi pada item data; mendukung array

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan selector statis.

Kemampuan utama:

- Mendukung kondisi filter data yang kompleks secara bebas

- Menggunakan fungsi utilitas bawaan untuk operasi data

- Dieksekusi secara aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya browser yang didukung; lingkungan Node.js menggunakan fallback.

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.

Konfigurasi filter dinamis chart

Memfilter mark chart (batang, titik, dll.) melalui kode JavaScript yang dihasilkan AI

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami)

:::

**Contoh**
"Sorot batang dengan sales > 1000"

"Sorot batang dengan rasio profit tertinggi di setiap wilayah"
#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item memiliki field __row_index sebagai nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index adalah nomor baris item data asli, field adalah field yang akan disorot

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::

**Contoh**
Sorot field sales pada item data dengan sales lebih besar dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan rasio profit tertinggi di setiap wilayah
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

Sorot item data yang difilter dengan beberapa kondisi
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
Solusi fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::
##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

Sama seperti operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Pilih nilai field dimensi pada item data; mendukung array

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare() dan hanya-baca saat runtime

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
Apakah elemen batang (persegi) terlihat

:::
### barColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna elemen batang (persegi)

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna elemen batang (persegi)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas elemen batang (persegi)

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas elemen batang (persegi)

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya batas elemen batang (persegi)

:::

**Contoh**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut elemen batang (persegi)

Opasitas stroke elemen batang (persegi)

:::

**Contoh**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik anotasi; berdasarkan data yang dipilih, menentukan posisi, format, gaya, dan lainnya.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Selector titik anotasi, digunakan untuk memilih titik data.

:::
#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

Sama seperti operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Pilih nilai field dimensi pada item data; mendukung array

:::
### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Menentukan id metrik tempat titik anotasi berada. Pada skenario multi-measure, dapat digabung dengan selector untuk menemukan titik anotasi target secara unik.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan selector statis.

Kemampuan utama:

- Mendukung kondisi filter data yang kompleks secara bebas

- Menggunakan fungsi utilitas bawaan untuk operasi data

- Dieksekusi secara aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya browser yang didukung; lingkungan Node.js menggunakan fallback.

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.

Konfigurasi filter dinamis chart

Memfilter mark chart (batang, titik, dll.) melalui kode JavaScript yang dihasilkan AI

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami)

:::

**Contoh**
"Sorot batang dengan sales > 1000"

"Sorot batang dengan rasio profit tertinggi di setiap wilayah"
#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item memiliki field __row_index sebagai nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index adalah nomor baris item data asli, field adalah field yang akan disorot

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::

**Contoh**
Sorot field sales pada item data dengan sales lebih besar dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan rasio profit tertinggi di setiap wilayah
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

Sorot item data yang difilter dengan beberapa kondisi
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
Solusi fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::
##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

Sama seperti operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Pilih nilai field dimensi pada item data; mendukung array

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare() dan hanya-baca saat runtime

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
Konten teks

:::

**Contoh**
'Annotation text'
### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks

:::

**Contoh**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font teks

:::

**Contoh**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Perataan teks, biasanya tidak perlu diatur

Disarankan menggunakan right agar teks berada di sisi kiri garis anotasi

right: teks berada di kiri garis referensi, tepi kanannya sejajar dengan garis anotasi vertikal

left: teks berada di kanan garis referensi, tepi kirinya sejajar dengan garis anotasi vertikal

center: teks berada di tengah garis referensi

:::

**Contoh**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks. Biasanya gunakan top agar teks tampil di bawah titik anotasi dan tetap berada dalam area chart yang terlihat

Disarankan menggunakan top agar teks dapat ditampilkan lengkap

top: teks berada di bawah titik anotasi

middle: teks sejajar dengan pusat titik anotasi

bottom: teks berada di atas titik anotasi

:::

**Contoh**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah latar belakang terlihat

:::

**Contoh**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas latar belakang

:::

**Contoh**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut latar belakang

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
Jarak offset seluruh titik anotasi pada arah Y dalam piksel. Jika titik berada di atas chart, disarankan nilai positif; jika di bawah, nilai negatif.

Nilai negatif menggeser seluruh komponen ke atas, misalnya -10 berarti naik 10 piksel

Nilai positif menggesernya ke bawah, misalnya 10 berarti turun 10 piksel

:::

**Contoh**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak offset seluruh titik anotasi pada arah X dalam piksel. Jika berada di sisi kiri chart, disarankan nilai positif; jika di kanan, nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri, misalnya -10 berarti ke kiri 10 piksel

Nilai positif menggesernya ke kanan, misalnya 10 berarti ke kanan 10 piksel

:::

**Contoh**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Konfigurasi garis anotasi vertikal.

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
Nilai X tetap untuk garis anotasi vertikal; jika sumbu kategori berada pada arah X, masukkan nilai dimensi, jika sumbu numerik masukkan nilai konkret

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array)

- Harus mengembalikan satu nilai angka atau string: number | string

- Skenario penggunaan: nilai dinamis yang dibutuhkan garis anotasi (horizontal/vertikal)

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan nilai dinamis (bahasa alami)

:::

**Contoh**
"Ambil nilai sales maksimum sebagai referensi garis anotasi"

"Hitung rata-rata sales untuk garis anotasi"
#### code

**Type:** `string`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array)

- Harus mengembalikan satu nilai angka atau string: number | string

- Skenario penggunaan: nilai dinamis yang dibutuhkan garis anotasi (horizontal/vertikal)

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::

**Contoh**
Ambil nilai sales maksimum sebagai nilai garis anotasi
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung nilai rata-rata untuk garis anotasi
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Ambil nilai kuantil sebagai garis anotasi
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target berdasarkan kondisi
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
Nilai fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare() dan hanya-baca saat runtime

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Konten teks

:::

**Contoh**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
Posisi teks

Posisi label garis anotasi relatif terhadap garis.

:::

**Contoh**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks

:::

**Contoh**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font teks

:::

**Contoh**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Perataan teks, biasanya tidak perlu diatur

Disarankan menggunakan right agar teks berada di sisi kiri garis anotasi

right: teks berada di kiri garis referensi, tepi kanannya sejajar dengan garis anotasi vertikal

left: teks berada di kanan garis referensi, tepi kirinya sejajar dengan garis anotasi vertikal

center: teks berada di tengah garis referensi

:::

**Contoh**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks, biasanya tidak perlu diatur

Disarankan menggunakan top agar teks lengkap tetap berada dalam area chart yang terlihat

top: teks berada di bawah garis referensi dan sejajar dengan ujung garis anotasi vertikal

middle: teks berada di tengah garis referensi

bottom: teks berada di atas garis referensi

:::

**Contoh**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah garis terlihat

:::

**Contoh**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis

:::

**Contoh**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis

:::

**Contoh**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya garis

:::

**Contoh**
'solid'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah latar belakang terlihat

:::

**Contoh**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas latar belakang

:::

**Contoh**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut latar belakang

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
Konfigurasi garis anotasi horizontal.

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
Nilai Y tetap untuk garis anotasi horizontal; jika sumbu kategori berada pada arah Y, masukkan nilai dimensi, jika sumbu numerik masukkan nilai konkret

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array)

- Harus mengembalikan satu nilai angka atau string: number | string

- Skenario penggunaan: nilai dinamis yang dibutuhkan garis anotasi (horizontal/vertikal)

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami).

:::

**Contoh**
"Ambil nilai penjualan tertinggi sebagai referensi garis anotasi"

"Hitung rata-rata penjualan untuk garis anotasi"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Kode filter JavaScript yang dihasilkan AI

- Hanya fungsi utilitas bawaan yang boleh digunakan (diakses melalui _ atau R)

- Parameter input: data (array)

- Harus mengembalikan satu nilai angka atau string: number | string

- Skenario penggunaan: nilai dinamis yang dibutuhkan garis anotasi (horizontal/vertikal)

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

:::

**Contoh**
Ambil nilai sales maksimum sebagai nilai garis anotasi
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung nilai rata-rata untuk garis anotasi
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Ambil nilai kuantil sebagai garis anotasi
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target berdasarkan kondisi
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
Nilai fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare() dan hanya-baca saat runtime

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Konten teks

:::

**Contoh**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
Posisi teks

Posisi label garis anotasi relatif terhadap garis.

:::

**Contoh**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks

:::

**Contoh**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font teks

:::

**Contoh**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Perataan teks, biasanya tidak perlu diatur

Disarankan menggunakan right agar teks berada di sisi kiri garis anotasi

right: teks berada di kiri garis referensi, tepi kanannya sejajar dengan garis anotasi vertikal

left: teks berada di kanan garis referensi, tepi kirinya sejajar dengan garis anotasi vertikal

center: teks berada di tengah garis referensi

:::

**Contoh**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks, biasanya tidak perlu diatur

Disarankan menggunakan top agar teks lengkap tetap berada dalam area chart yang terlihat

top: teks berada di bawah garis referensi dan sejajar dengan garis anotasi horizontal

middle: teks berada di tengah garis referensi

bottom: teks berada di atas garis referensi

:::

**Contoh**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah latar belakang terlihat

:::

**Contoh**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas latar belakang

:::

**Contoh**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut latar belakang

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
Apakah garis terlihat

:::

**Contoh**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis

:::

**Contoh**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis

:::

**Contoh**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya garis

:::

**Contoh**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Deskripsi}
Konfigurasi garis pemisah; bagian di atas dan di bawah nilai anotasi dapat diberi warna berbeda.

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna utama untuk bagian yang lebih besar dari nilai anotasi

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna utama untuk bagian yang lebih kecil dari nilai anotasi

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
Konfigurasi area anotasi; berdasarkan data yang dipilih, menentukan posisi dan gaya area anotasi.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
Selector area anotasi.

:::
#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: Memilih item data yang nilai field dimensinya ada di value

- not in: Memilih item data yang nilai field dimensinya tidak ada di value

Sama seperti operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Pilih nilai field dimensi pada item data; mendukung array

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Konten teks

:::

**Contoh**
'Annotation text'
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Deskripsi}
Posisi teks

:::

**Contoh**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

:::

**Contoh**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks

:::

**Contoh**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font teks

:::

**Contoh**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Perataan teks, biasanya tidak perlu diatur

center: teks berada di tengah area anotasi

left: teks berada di sisi kiri area anotasi

right: teks berada di sisi kanan area anotasi

:::

**Contoh**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks, biasanya tidak perlu diatur

top: teks berada di bagian atas area anotasi

middle: teks berada di tengah area anotasi

bottom: teks berada di bagian bawah area anotasi

:::

**Contoh**
'middle'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah latar belakang terlihat

:::

**Contoh**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas latar belakang

:::

**Contoh**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas latar belakang

:::

**Contoh**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut latar belakang

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
Warna area anotasi

:::

**Contoh**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas area anotasi

:::

**Contoh**
0.2
### areaBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna batas area anotasi

:::

**Contoh**
'red'
### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar batas area anotasi

:::

**Contoh**
2
### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut area anotasi

:::

**Contoh**
4
### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Pola garis putus batas area anotasi

:::

**Contoh**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding luar

:::

**Contoh**
8
## kdeRegressionLine

**Type:** `KdeRegressionLine | KdeRegressionLine[] | undefined`

:::note{title=Deskripsi}
Konfigurasi garis regresi kepadatan kernel, digunakan untuk menampilkan tren dan distribusi data

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fitur garis regresi

:::

### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis regresi

Digunakan untuk mengatur warna garis regresi; jika tidak diatur, default menggunakan warna utama chart

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Digunakan untuk mengatur lebar garis regresi dalam piksel, nilai default 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Digunakan untuk mengatur gaya garis regresi, seperti garis solid, garis putus-putus, dan lain-lain; defaultnya garis solid

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Digunakan untuk mengatur teks label garis regresi; string kosong berarti label tidak ditampilkan

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

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




## ecdfRegressionLine

**Type:** `EcdfRegressionLine | EcdfRegressionLine[] | undefined`

:::note{title=Deskripsi}
Konfigurasi garis regresi fungsi distribusi kumulatif empiris, digunakan untuk menampilkan distribusi kumulatif data

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

Digunakan untuk mengatur warna garis regresi; jika tidak diatur, default menggunakan warna utama chart

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Digunakan untuk mengatur lebar garis regresi dalam piksel, nilai default 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Digunakan untuk mengatur gaya garis regresi, seperti garis solid, garis putus-putus, dan lain-lain; defaultnya garis solid

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Digunakan untuk mengatur teks label garis regresi; string kosong berarti label tidak ditampilkan

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks

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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Saat fungsi pivot chart atau kombinasi measure diaktifkan, apakah mengaktifkan fungsi linkage dimensi.

Saat hover pada nilai dimensi tertentu, data dengan nilai dimensi yang sama di chart lain akan ikut di-highlight.

Konfigurasi linkage dimensi chart pivot
:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah mengaktifkan linkage dimensi chart pivot
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan informasi Tooltip untuk subchart yang sesuai dengan semua dimensi
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair
:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Konfigurasi bahasa chart. Mendukung dua bahasa, 'zh-CN' dan 'en-US'. Bahasa juga dapat diatur dengan memanggil intl.setLocale('zh-CN')
:::

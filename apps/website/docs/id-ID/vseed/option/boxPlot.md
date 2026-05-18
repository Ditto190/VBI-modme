# BoxPlot

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` metrik, `1` dimensi

\- Mendukung pembentukan ulang data: setidaknya `1` metrik, `0` dimensi

:::

:::info{title=Pemetaan encoding}
Box plot mendukung kanal visual berikut:

`xAxis`  : kanal sumbu X, mendukung `beberapa dimensi`, dipetakan ke sumbu X berdasarkan nilai dimensi

`yAxis`  : kanal sumbu Y, mendukung `beberapa metrik`, dipetakan ke sumbu Y berdasarkan nilai metrik

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi membedakan seri data, sedangkan warna metrik memetakan nilai secara linear ke warna mark

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat kursor berada di atas titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Box plot cocok untuk menampilkan distribusi data. Sumbu X adalah sumbu kategori (data kategorikal), sumbu Y adalah sumbu numerik (data kontinu), dan box disusun secara vertikal.

Skenario yang sesuai:

\- Saat nama item data pendek

\- Saat perlu membandingkan nilai numerik antar kategori secara intuitif

\- Saat menampilkan tren perubahan data deret waktu

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal 1 field numerik (metrik)

\- Dimensi pertama ditempatkan pada sumbu X. Dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.

\- Semua metrik otomatis digabungkan menjadi satu metrik

Fitur yang aktif secara default:

\- Legenda, sumbu, label data, dan tooltip aktif secara default.

:::


## chartType

**Type:** `"boxPlot"`

:::note{title=Deskripsi}
Box plot cocok untuk menampilkan distribusi data. Sumbu X adalah sumbu kategori (data kategorikal), sumbu Y adalah sumbu numerik (data kontinu), dan box disusun secara vertikal.

:::

**Contoh**
'boxPlot'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset yang sudah diagregasi dan sesuai dengan spesifikasi TidyData, digunakan untuk menentukan sumber data dan struktur diagram. Dataset input pengguna tidak perlu diproses terlebih dahulu. VSeed memiliki kemampuan reshape data yang kuat dan akan melakukan reshape data secara otomatis; data box plot pada akhirnya akan diubah menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `BoxPlotDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi pertama pada box plot dipetakan ke sumbu X. Dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: "category", alias: "Category"}]




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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- xAxis: mendukung pemetaan beberapa dimensi ke sumbu X

\- color: mendukung pemetaan beberapa dimensi ke kanal warna

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `BoxPlotMeasure[] | undefined`

:::note{title=Deskripsi}
Semua metrik pada box plot otomatis digabung menjadi satu metrik dan dipetakan ke sumbu Y. Saat ada beberapa metrik, nama metrik digabung dengan dimensi lain dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: "value", alias: "Value"}]




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

**Type:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- value: metrik yang sesuai dengan nilai diskret, digunakan untuk menghitung nilai statistik untuk menampilkan box plot

\- q1: pemetaan metrik untuk nilai statistik persentil ke-25

\- q3: pemetaan metrik untuk nilai statistik persentil ke-75

\- min: pemetaan metrik untuk nilai whisker minimum

\- max: pemetaan metrik untuk nilai whisker maksimum

\- meadian: pemetaan metrik untuk nilai median statistik

\- outliers: pemetaan metrik untuk outlier

\- detail: metrik yang dipetakan ke kanal detail

\- color: metrik yang dipetakan ke kanal warna

\- label: metrik yang dipetakan ke kanal label

\- tooltip: metrik yang dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Membangun grup metrik berbentuk pohon dari konfigurasi metrik datar. parentId menunjuk ke id grup metrik induk dan digunakan untuk membangun pohon metrik.

:::

:::tip{title=Tip}
Ada dua cara untuk mengonfigurasi pohon metrik: cara pertama adalah langsung mengonfigurasi pohon metrik dengan children; cara kedua adalah mengonfigurasi daftar metrik datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan

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
 'profit': 'red',
 'sales': 'blue',
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

Dalam skenario multi-measure, tidak perlu khawatir terjadi konflik nilai, karena semua measure yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu measure yang mewakili satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai measure. as percentages.

Dalam skenario multi-measure, tidak perlu khawatir terjadi konflik nilai, karena semua measure yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu measure yang mewakili satu titik data.

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
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array), setiap item memiliki field __row_index yang menunjukkan nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

\- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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

Sorot item data dengan margin laba tertinggi di setiap area
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

Sorot item data yang difilter oleh beberapa kondisi
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
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah border legend diaktifkan..

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**
border: true



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
legend font color



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
Bentuk legenda
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legend

:::

**Contoh**
legend font color



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**
maxSize: 2




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

**Type:** `XBandAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu kategori sumbu X, digunakan untuk mendefinisikan sumbu X chart, termasuk posisi, format, gaya, dan pengaturan terkait.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Warna garis sumbu

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Deskripsi}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

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
Tick sumbu X

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
Tick sumbu X

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


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu X; mendukung pengurutan berdasarkan dimensi atau measure serta urutan kustom



Konfigurasi pengurutan sumbu kategori; mendukung pengurutan berdasarkan dimensi atau measure serta urutan kustom
:::

**Contoh**
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
])

:::

**Contoh**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sorot item data dengan tingkat profit tertinggi di setiap wilayah

:::

**Contoh**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
\- `__row_index` menunjukkan nomor baris item data asli, dan `field` menunjukkan field yang akan di-highlight.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}
return _.map(filtered, item => ({



Chart dynamic filter configuration

:::

**Contoh**
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
])

:::

**Contoh**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sorot item data dengan tingkat profit tertinggi di setiap wilayah

:::

**Contoh**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Urutan kustom. Urutan diterapkan langsung ke legenda. Urutan naik bergerak dari kiri ke kanan atau dari atas ke bawah; urutan turun bergerak dari kanan ke kiri atau dari bawah ke atas.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram. Tema adalah konfigurasi fitur berprioritas lebih rendah yang mencakup pengaturan umum untuk semua jenis diagram dan pengaturan bersama dalam satu kategori diagram. Tema bawaan mencakup light dan dark, dan pengguna dapat menyesuaikan tema melalui Builder.



Operator



\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

:::

**Contoh**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


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


## boxPlotStyle

**Type:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi style box plot, mendukung penerapan global atau pada level selector

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Data selector

Jika selector dikonfigurasi, tersedia empat kemampuan pencocokan data: selector numerik, selector data lokal, selector dimensi bersyarat, dan selector metrik bersyarat.

If no selector is configured, the style applies globally.

:::

**Contoh**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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
Field dimensi, ID dari item dimensi

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

return _.flatten(

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi, mendukung array

:::

### boxVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### boxColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

### boxColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna elemen box plot

:::

### boxBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### boxBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

### boxBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas border elemen box plot

:::

### boxCornerRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut box

:::

### medianBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Median line color

:::

### whiskerBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Whisker line color

:::


## outlierStyle

**Type:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title=Deskripsi}
Outlier style configuration, supports global or selector-level application

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Data selector

Jika selector dikonfigurasi, tersedia empat kemampuan pencocokan data: selector numerik, selector data lokal, selector dimensi bersyarat, dan selector metrik bersyarat.

If no selector is configured, the style applies globally.

:::

**Contoh**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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
Field dimensi, ID dari item dimensi

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

return _.flatten(

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi, mendukung array

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Point element color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Point element border style

:::

**Contoh**
solid

dashed

dotted




## whiskers

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Konfigurasi panjang whisker box plot, mendukung nilai skalar dan array dengan panjang 2.

When the value is a scalar, whiskers * IQR is used to calculate the upper and lower bounds.

When the value is an array of length 2, whiskers[0] must be between [0, 0.25), representing the percentile for the lower bound;

whiskers[1] must be between (0.75, 1], representing the percentile for the upper bound.

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik anotasi, berdasarkan data yang dipilih untuk menentukan posisi, format, style, dan lainnya dari titik anotasi.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Selector untuk titik anotasi, digunakan untuk memilih titik data.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam daftar nilai.

\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam daftar nilai.

\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

sama dengan operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Menentukan id measure tempat titik anotasi berada. Dalam skenario multi-measure, dapat digabung dengan selector untuk menemukan titik anotasi target secara unik.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)



return _.flatten(

\- not in: Memilih item data yang nilai field dimensinya tidak berada dalam value



\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

\- Uses built-in utility functions for data manipulation.

\- in: Memilih item data ketika nilai field dimensi berada di dalam value



\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



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
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array), setiap item memiliki field __row_index yang menunjukkan nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

\- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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

Sorot item data dengan margin laba tertinggi di setiap area
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

Sorot item data yang difilter oleh beberapa kondisi
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
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- Hanya boleh memakai fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array), tiap item berisi field __row_index yang mewakili nomor baris

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index mewakili nomor baris item data asli, field mewakili field yang disorot

\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

return _.map(filtered, item => ({

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
const maxItems = _.map(grouped, group =>

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

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
return _.flatten(

:::

**Contoh**
\- Hanya boleh memakai fungsi utilitas bawaan (diakses melalui _ atau R)



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

**Contoh**
\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**Contoh**
\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

**Contoh**
const maxItems = _.map(grouped, group =>



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}
Perataan teks. Umumnya atur ke `right` agar teks tampil di sisi kiri titik anotasi dan tetap berada dalam area chart yang terlihat

Disarankan mengatur ke `right`, sehingga teks berada di sisi kiri titik anotasi

right: teks berada di sisi kiri titik anotasi, dengan tepi kanan teks sejajar dengan titik anotasi

left: teks berada di sisi kanan titik anotasi, dengan tepi kiri teks sejajar dengan titik anotasi

center: teks berada di tengah titik anotasi, dengan pusat teks sejajar dengan titik anotasi
:::

**Contoh**
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks. Umumnya atur ke top agar teks tampil di bawah titik anotasi dan tetap berada di area chart yang terlihat

Disarankan menggunakan 'top' agar teks tampil lengkap di area chart yang terlihat

top: teks berada di bawah titik anotasi, tepi atas teks sejajar dengan titik anotasi

middle: teks berada di tengah titik anotasi

bottom: teks berada di atas titik anotasi, tepi bawah teks sejajar dengan titik anotasi

:::

**Contoh**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Background terlihat

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
2

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut border background

:::

**Contoh**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding background

:::

**Contoh**
4
### offsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak offset piksel seluruh titik anotasi pada arah Y. Saat titik anotasi berada di bagian atas chart (nilai lebih besar), disarankan nilai positif; saat berada di bagian bawah (nilai lebih kecil), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke atas; misalnya \-10 menggeser titik anotasi beserta teks dan background 10 piksel ke atas

Nilai positif menggeser seluruh komponen ke bawah; misalnya 10 menggeser titik anotasi beserta teks dan background 10 piksel ke bawah

:::

**Contoh**
offsetY: 5, seluruh titik anotasi bergeser 5 piksel ke bawah
### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak offset piksel seluruh titik anotasi pada arah X. Saat titik anotasi berada di sisi kiri chart (awal sumbu kategori), disarankan nilai positif; saat berada di sisi kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri; misalnya \-10 menggeser titik anotasi beserta teks dan background 10 piksel ke kiri

Nilai positif menggeser seluruh komponen ke kanan; misalnya 10 menggeser titik anotasi beserta teks dan background 10 piksel ke kanan

:::

**Contoh**
offsetX: 5, seluruh titik anotasi bergeser 5 piksel ke kanan
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Garis anotasi nilai dimensi, ditampilkan secara vertikal. Posisi, style, dan pengaturan terkait garis anotasi dapat dikonfigurasi.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Radius sudut border latar belakang

Konfigurasi area anotasi; mendefinisikan area anotasi pada chart berdasarkan data yang dipilih, termasuk posisi, style, dll.



Apakah mengaktifkan fungsi untuk membagi garis utama menjadi dua segmen.

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

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array)

\- Harus mengembalikan satu nilai numerik atau string: number | string

\- Skenario penggunaan: nilai dinamis yang diperlukan untuk garis anotasi (horizontal atau vertikal)

\- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare(); hanya-baca saat runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Written during the prepare() phase; read-only at runtime.

:::

**Contoh**
'Annotation text'



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
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Perataan teks. Umumnya tidak perlu diatur

Disarankan menggunakan 'right' agar teks berada di kiri garis anotasi

right: teks berada di kiri garis referensi, tepi kanan teks sejajar dengan garis anotasi vertikal

left: teks berada di kanan garis referensi, tepi kiri teks sejajar dengan garis anotasi vertikal

center: teks berada di tengah garis referensi

:::

**Contoh**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks. Umumnya tidak perlu diatur

Disarankan menggunakan 'top' agar teks tampil lengkap di area chart yang terlihat

top: teks berada di bawah garis referensi, tepi atas teks sejajar dengan ujung garis anotasi vertikal

middle: teks berada di tengah garis referensi

bottom: teks berada di atas garis referensi, tepi bawah teks sejajar dengan ujung garis anotasi vertikal

:::

**Contoh**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Garis terlihat

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
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

**Contoh**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Radius sudut border area anotasi

:::

**Contoh**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Background terlihat

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
2

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut border background

:::

**Contoh**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding background

:::

**Contoh**
4
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}
Nilai Y tetap untuk menandai garis horizontal. Jika sumbu kategori berada pada arah Y, masukkan nilai dimensi; jika sumbu numerik berada pada arah Y, masukkan nilai angka tertentu.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Radius sudut border latar belakang

Konfigurasi area anotasi; mendefinisikan area anotasi pada chart berdasarkan data yang dipilih, termasuk posisi, style, dll.



Apakah mengaktifkan fungsi untuk membagi garis utama menjadi dua segmen.

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

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array)

\- Harus mengembalikan satu nilai numerik atau string: number | string

\- Skenario penggunaan: nilai dinamis yang diperlukan untuk garis anotasi (horizontal atau vertikal)

\- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare(); hanya-baca saat runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Written during the prepare() phase; read-only at runtime.

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
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Perataan teks. Umumnya tidak perlu diatur

Disarankan mengatur ke `right`, sehingga teks berada di sisi kiri garis anotasi

right: teks berada di sisi kiri garis referensi, dengan tepi kanan teks sejajar dengan ujung garis anotasi horizontal

left: teks berada di sisi kanan garis referensi, dengan tepi kiri teks sejajar dengan ujung garis anotasi horizontal

center: teks berada di tengah garis referensi, dengan pusat teks sejajar dengan ujung garis anotasi horizontal
:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks. Umumnya tidak perlu diatur

Disarankan menggunakan 'top' agar teks tampil lengkap di area chart yang terlihat

top: teks berada di bawah garis referensi, tepi atas teks sejajar dengan garis anotasi horizontal

middle: teks berada di tengah garis referensi

bottom: teks berada di atas garis referensi, tepi bawah teks sejajar dengan garis anotasi horizontal

:::

**Contoh**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Background terlihat

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
2

:::

**Contoh**
field: 'sales'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
4



4

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut border background

:::

**Contoh**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding background

:::

**Contoh**
4
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Garis terlihat



Garis terlihat

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
Radius sudut border area anotasi

:::

**Contoh**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Deskripsi}
Gaya garis border area anotasi

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
field: 'sales'

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna utama untuk bagian yang lebih kecil dari nilai anotasi

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
Konfigurasi area anotasi, berdasarkan data yang dipilih untuk menentukan posisi, style, dan lainnya dari area anotasi.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fungsi linkage dimensi saat chart mengaktifkan perspektif atau saat measure digabungkan.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam daftar nilai.

\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam daftar nilai.

\- not in: Memilih item data yang nilai field dimensinya TIDAK berada dalam daftar nilai.

sama dengan operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
Written during the prepare() phase; read-only at runtime.

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
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Perataan teks. Umumnya atur ke `right`; teks ditampilkan di tengah area anotasi agar tetap berada dalam area chart yang terlihat

Disarankan mengatur ke `center`, sehingga teks berada di tengah area anotasi

right: teks berada di sisi kiri area anotasi, dengan tepi kanan teks sejajar dengan area anotasi

left: teks berada di sisi kanan area anotasi, dengan tepi kiri teks sejajar dengan area anotasi

center: teks berada di tengah area anotasi, dengan pusat teks sejajar dengan area anotasi
:::

**Contoh**
'center' Text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks. Umumnya atur ke top agar teks muncul di bagian bawah area anotasi dan tetap berada di dalam area chart yang terlihat.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**Contoh**
'top' Text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Background terlihat

:::

**Contoh**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang
:::

**Contoh**
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
2



2

:::

**Contoh**
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
4

:::

**Contoh**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius sudut border background



Radius sudut border background

:::

**Contoh**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding background

:::

**Contoh**
4
### areaColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna isi area anotasi

:::

**Contoh**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas isi area anotasi

:::

**Contoh**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border area anotasi

:::

**Contoh**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border area anotasi

:::

**Contoh**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}
Radius border area anotasi

:::

**Contoh**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis border area anotasi

:::

**Contoh**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}
Padding area anotasi

:::

**Contoh**
0




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


## boxMaxWidth

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Lebar maksimum box plot. Dapat diatur sebagai nilai piksel absolut atau persentase (misalnya '10%').

:::


## boxGapInGroup

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Jarak dalam setiap grup pada box plot berkelompok. Dapat diatur sebagai nilai piksel absolut atau persentase (misalnya '10%').

:::

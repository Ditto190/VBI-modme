# BarParallel

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` metrik dan `2` dimensi

\- Mendukung reshape data: minimal `1` metrik, `0` dimensi

:::

:::info{title=Pemetaan encoding}
Diagram batang paralel mendukung kanal visual berikut:

`yAxis`  : kanal sumbu Y, mendukung `beberapa dimensi`, dipetakan ke sumbu Y berdasarkan nilai dimensi

`xAxis`  : kanal sumbu X, mendukung `beberapa metrik`, dipetakan ke sumbu X berdasarkan nilai metrik

`detail` : kanal detail, mendukung `beberapa dimensi`, digunakan untuk menampilkan data yang lebih rinci dalam seri warna yang sama

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi membedakan seri data, sedangkan warna metrik memetakan nilai secara linear ke warna mark

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat kursor berada di atas titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Diagram batang paralel cocok untuk perbandingan horizontal beberapa metrik; beberapa batang disusun paralel untuk menampilkan nilai metrik yang berbeda.

Skenario yang sesuai:

- Perbandingan beberapa metrik saat nama kategori panjang.

- Perbandingan horizontal yang menampilkan peringkat dan nilai sekaligus.

- Analisis paralel atas data multidimensi.

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal 1 field metrik

\- Dimensi pertama ditempatkan pada sumbu Y. Dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.

\- Semua metrik otomatis digabung menjadi satu metrik.

Fitur yang aktif secara default:

\- Legenda, sumbu, label data, dan tooltip aktif secara default.

:::


## chartType

**Type:** `"barParallel"`

:::note{title=Deskripsi}
Diagram batang paralel cocok untuk perbandingan horizontal paralel beberapa metrik.

:::

**Contoh**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Sumber data: dataset teragregasi yang sesuai spesifikasi TidyData, digunakan untuk mendefinisikan sumber dan struktur data diagram. Pengguna tidak perlu memproses dataset terlebih dahulu karena VSeed memiliki kemampuan reshape data yang kuat dan akan menanganinya otomatis; data diagram batang paralel akhirnya dikonversi menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi: dimensi pertama dipetakan ke sumbu Y. Dimensi lainnya digabung dengan nama metrik (saat ada beberapa metrik) dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'category', alias: 'category'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Deskripsi}
Channel tempat dimensi dipetakan

\- yAxis: mendukung pemetaan beberapa dimensi ke sumbu Y

\- color: mendukung pemetaan beberapa dimensi ke kanal warna

\- detail: mendukung pemetaan beberapa dimensi ke kanal detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik: metrik pada diagram batang paralel otomatis digabung menjadi satu metrik dan dipetakan ke sumbu X. Saat ada beberapa metrik, nama metrik digabung dengan dimensi lainnya dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'value1', alias: 'measure1'}, {id: 'value2', alias: 'measure2'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias metrik, boleh duplikat; jika tidak diatur, alias menggunakan id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Jika aktif, label data diagram dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik; otomatis diterapkan ke label dan tooltip

Catatan: Untuk menggunakan format kustom, Anda harus secara eksplisit mengatur autoFormat=false; jika tidak, autoFormat akan menimpa konfigurasi ini

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

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
Jumlah digit desimal untuk format angka, menggunakan Intl.NumberFormat minimumFractionDigits dan maximumFractionDigits browser; prioritasnya lebih rendah daripada significantDigits

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
Digit signifikan untuk format angka, menggunakan Intl.NumberFormat minimumSignificantDigits dan maximumSignificantDigits browser; prioritasnya lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

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
Jumlah digit desimal untuk format angka, menggunakan Intl.NumberFormat minimumFractionDigits dan maximumFractionDigits browser; prioritasnya lebih rendah daripada significantDigits

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
Digit signifikan untuk format angka, menggunakan Intl.NumberFormat minimumSignificantDigits dan maximumSignificantDigits browser; prioritasnya lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Deskripsi}
Channel tempat metrik dipetakan

\- xAxis: metrik yang dipetakan ke sumbu X

\- detail: metrik yang dipetakan ke kanal detail

\- color: metrik yang dipetakan ke kanal warna

\- label: metrik yang dipetakan ke kanal label

\- tooltip: metrik yang dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam konfigurasi metrik datar, membangun grup metrik berbentuk pohon. parentId menunjuk ke id grup metrik induk dan digunakan untuk membangun pohon metrik

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon metrik: opsi 1 adalah langsung mengonfigurasi pohon metrik dengan children; opsi 2 adalah mengonfigurasi daftar metrik datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Paginasi



Konfigurasi paginasi untuk paginasi diagram

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field paginasi; menentukan nama field untuk paginasi dan harus berupa dimensi

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
Nilai paginasi saat ini; menentukan nilai yang digunakan untuk menentukan halaman saat ini

:::

**Contoh**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang diagram. Defaultnya latar belakang transparan. Warna latar belakang dapat berupa string warna (mis. 'red', 'blue'), atau nilai hex, rgb, atau rgba (mis. '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, mapping warna, dan gradien warna.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna diskret untuk menentukan warna berbagai elemen dalam diagram

:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna gradien linear untuk menentukan warna berbagai elemen dalam diagram

:::

**Contoh**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}
Mapping warna yang digunakan untuk memetakan nilai data ke warna tertentu

:::

**Contoh**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai positif dalam diagram

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai negatif dalam diagram

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Konfigurasi label untuk menentukan label data dalam diagram, termasuk posisi, format, dan gaya.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi label diaktifkan

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label dibungkus ke baris berikutnya

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir terjadi konflik nilai, karena semua metrik yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu metrik yang mewakili satu titik data

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir terjadi konflik nilai, karena semua metrik yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu metrik yang mewakili satu titik data

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan label dimensi

Tampilkan semua label dimensi

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah nilai label diformat otomatis; saat autoFormat bernilai true, konfigurasi numFormat akan diabaikan

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format untuk nilai label; digabungkan dengan `format` di `measure`, dan `format` di `measure` memiliki prioritas lebih tinggi. numFormat memiliki prioritas lebih rendah daripada autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung: number (desimal), percent (%), permille (‰), notasi ilmiah

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
Jumlah digit desimal untuk format angka, menggunakan Intl.NumberFormat minimumFractionDigits dan maximumFractionDigits browser; prioritasnya lebih rendah daripada significantDigits

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
Digit signifikan untuk format angka, menggunakan Intl.NumberFormat minimumSignificantDigits dan maximumSignificantDigits browser; prioritasnya lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font label

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang label

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna outline label

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font label

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah warna font label dibalik otomatis berdasarkan warna elemen grafis

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
Posisi label

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah penghindaran tumpang tindih label diaktifkan

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Filter label; hubungan default antar selector adalah OR

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


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

Mengimplementasikan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI.

Kemampuan inti:

- Mendukung kondisi pemfilteran data yang kompleks

- Menggunakan fungsi utilitas bawaan untuk operasi data

- Dieksekusi secara aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi

Konfigurasi filter dinamis diagram

Memfilter mark diagram (area, titik, dll.) melalui kode JavaScript yang dihasilkan AI
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Sorot batang dengan sales lebih dari 1000"

"Sorot batang dengan tingkat laba tertinggi di setiap region"



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
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


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
Konfigurasi legenda untuk mendefinisikan legenda diagram, termasuk posisi, format, dan gaya.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fitur legenda diaktifkan.
:::

**Contoh**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah border legenda diaktifkan.
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna ikon pager

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna ikon pager yang dinonaktifkan

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font legenda.
:::

**Contoh**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda

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
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legenda
:::

**Contoh**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah maksimum kolom atau baris saat item legenda banyak





:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Deskripsi}
Padding area plot



Dipetakan ke VChart region[0].padding, untuk menyediakan ruang bagi elemen yang melewati area plot seperti anotasi dan label.

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
Konfigurasi brush diagram









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah pilihan brush diaktifkan

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
Jenis brush

Menentukan bentuk dan arah pemilihan brush

\- `rect`: pilihan brush persegi panjang; dapat memilih sekaligus pada arah sumbu X dan Y

\- `polygon`: pilihan brush poligon; menggambar poligon bebas dengan mengklik beberapa titik untuk memilih

\- `x`: pilihan brush arah sumbu X; hanya memilih pada arah sumbu X, arah sumbu Y tidak dibatasi

\- `y`: pilihan brush arah sumbu Y; hanya memilih pada arah sumbu Y, arah sumbu X tidak dibatasi
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
\- `multiple`: mode multiple, beberapa pilihan brush dapat berdampingan secara bersamaan



Menentukan mode pilihan brush


\- `multiple`: mode pilihan multiple; beberapa area brush dapat ada pada saat yang sama

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah area brush dihapus setelah pemilihan selesai

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Opasitas titik data yang tidak dipilih, rentang 0-1



Mendefinisikan gaya titik data yang terkena brush
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas



Opasitas titik data yang dipilih, rentang 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
X-axis, category axis, X-axis configuration; defines the X-axis of the diagram, including its position, format, style, etc.



Mendefinisikan gaya titik data di luar seleksi brush
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas



Opasitas titik data yang tidak dipilih, rentang 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi



Konfigurasi animasi diagram; efek yang tersedia bergantung pada jenis diagram

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi diagram bar/column diaktifkan

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Deskripsi}
Bar/column diagram animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Deskripsi}
Apakah menampilkan sumbu secara terbalik; hanya berlaku untuk sumbu numerik.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}
Label color

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fase animasi saat ini diaktifkan

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi dalam milidetik

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Deskripsi}
Bar/column diagram update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Deskripsi}
Efek pembaruan diagram bar/kolom, mendukung animasi pertumbuhan dan masuk

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fase animasi saat ini diaktifkan

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi dalam milidetik

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi loop diaktifkan

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
Interval animasi loop dalam milidetik

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fase animasi saat ini diaktifkan

:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi

:::

###### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi dalam milidetik

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Deskripsi}
Bar/column diagram atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi atmosfer

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna animasi atmosfer

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Deskripsi}
Efek animasi atmosfer; mendukung efek ripple, visibilitas, dan napas

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Deskripsi}
X-axis numeric-axis configuration, used to define the diagram X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah sumbu terlihat
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
Apakah sumbu ditampilkan terbalik; hanya berlaku untuk sumbu numerik
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah memaksa nilai 0 ditampilkan pada sumbu; jika min dan max dikonfigurasi, opsi ini tidak berlaku. Hanya berlaku untuk sumbu numerik.
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
Label tick sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna label
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font label
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
Apakah garis sumbu terlihat
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis sumbu
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis sumbu
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
Tick sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tick terlihat
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tick mengarah ke dalam
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna tick
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
Judul sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah judul terlihat
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks judul; secara default mengikuti konfigurasi field
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna judul
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font judul
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ketebalan font judul
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
selector = [{ profit: 100 }, { profit: 200 }]
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


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Deskripsi}
Y-axis category-axis configuration, used to define the diagram Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah sumbu terlihat
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah sumbu ditampilkan terbalik; hanya berlaku untuk sumbu numerik
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah memaksa nilai 0 ditampilkan pada sumbu; jika min dan max dikonfigurasi, opsi ini tidak berlaku. Hanya berlaku untuk sumbu numerik.
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Label sumbu disembunyikan otomatis. Jika dua label saling tumpang tindih (jarak kurang dari autoHideGap), label yang menyebabkan tumpang tindih akan disembunyikan otomatis. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak penyembunyian otomatis label sumbu. Jika jarak antara dua label teks kurang dari autoHideGap, label yang menyebabkan tumpang tindih akan disembunyikan otomatis. Hanya berlaku untuk sumbu kategori.

Saat autoHide aktif, gunakan autoHide yang diatur pada autoHideSeparation

Saat autoHide nonaktif, gunakan sampling yang diatur pada minGap
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Rotasi otomatis label sumbu. Ketika lebar label melebihi panjang sumbu, label akan diputar otomatis. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Rentang sudut rotasi otomatis label sumbu. Saat rotasi otomatis aktif, ini menentukan rentang sudut rotasi label. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pembatasan panjang otomatis label sumbu. Ketika lebar label melebihi panjang sumbu, bagian berlebih ditampilkan sebagai elipsis dan label lengkap terlihat saat hover. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Deskripsi}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Deskripsi}
Label tick sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna label
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font label

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
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Sufiks format angka
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tick mengarah ke dalam
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda; mendukung pengurutan berdasarkan dimensi atau metrik, serta urutan kustom; array sort mengikuti urutan kiri ke kanan atau atas ke bawah.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik tick
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
Teks judul; secara default mengikuti konfigurasi field
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
selector = [{ profit: 100 }, { profit: 200 }]
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
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Operator

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label area persegi crosshair

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Bar diagram stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Mengimplementasikan filter mark diagram (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Distance between rectangles in the same category. It can be a pixel value or a percentage string.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu Y; mendukung pengurutan berdasarkan dimensi atau metrik serta urutan kustom



Konfigurasi pengurutan sumbu kategori; mendukung pengurutan berdasarkan dimensi atau metrik serta urutan kustom
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
Konfigurasi Filter Dinamis chart.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
Urutan pengurutan; nilai yang tersedia adalah 'asc' atau 'desc'
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
Urutan kustom yang langsung diterapkan ke sumbu kategori
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda, mendukung pengurutan berdasarkan dimensi atau metrik serta urutan kustom

Konfigurasi pengurutan legenda; array pengurutan mengikuti urutan kiri ke kanan atau atas ke bawah
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
Konfigurasi Filter Dinamis chart.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
Urutan pengurutan; nilai yang tersedia adalah 'asc' atau 'desc'
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
Urutan kustom yang langsung diterapkan ke legenda; naik dari kiri ke kanan atau atas ke bawah, turun dari kanan ke kiri atau bawah ke atas
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram. Tema adalah konfigurasi fungsional dengan prioritas lebih rendah, mencakup konfigurasi umum untuk semua jenis diagram dan konfigurasi diagram dalam satu kategori diagram. Tersedia tema bawaan light dan dark; pengguna dapat menyesuaikan tema melalui Builder.

Tema

Tersedia tema bawaan light dan dark; tema baru dapat disesuaikan melalui registerTheme.
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
Style mark persegi panjang. Konfigurasi style diagram batang untuk menentukan warna batang, border, radius sudut, dan pengaturan terkait.

Mendukung style global atau style bersyarat.

Filter data

Jika selector dikonfigurasi, tersedia empat kemampuan pencocokan data: selector numerik, selector data lokal, selector dimensi bersyarat, dan selector metrik bersyarat.

Jika selector tidak dikonfigurasi, style berlaku secara global.
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Selector data



Jika selector dikonfigurasi, tersedia empat kemampuan pencocokan data: selector numerik, selector data parsial, selector dimensi bersyarat, dan selector measure bersyarat

Jika selector tidak dikonfigurasi, style berlaku secara global.

:::

**Contoh**
Selector numerik
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector data parsial
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

Selector measure bersyarat
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
Field dimensi, id salah satu item dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: memilih item data yang nilai field dimensinya berada dalam value

- not in: memilih item data yang nilai field dimensinya tidak berada dalam value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: memilih item data yang nilai field dimensinya berada dalam value

- not in: memilih item data yang nilai field dimensinya tidak berada dalam value

Sama seperti operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi pada item data; mendukung array
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
return _.flatten(



Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.

\- in: Memilih item data ketika nilai field dimensi berada di dalam value



\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

\- Supports arbitrarily complex data filtering conditions.

\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.



Konfigurasi filter dinamis diagram.



\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami).

:::

**Contoh**
"Sorot batang dengan sales lebih dari 1000"

"Sorot batang dengan tingkat laba tertinggi di setiap region"



#### code

**Type:** `string`

:::note{title=Deskripsi}
\- Menggunakan fungsi utilitas bawaan untuk operasi data



\- Dieksekusi aman di lingkungan browser (sandbox Web Worker)

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Harus mengembalikan array kombinasi indeks baris dan field: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` menunjukkan nomor baris item data asli, dan `field` menunjukkan field yang akan di-highlight.

\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan.

:::

**Contoh**
Sorot field `sales` dari item data dengan sales lebih dari 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan margin laba tertinggi di setiap region:
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

Sorot item data berdasarkan beberapa kondisi filter:
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
\- Hanya boleh memakai fungsi utilitas bawaan (diakses melalui _ atau R)

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
\- Parameter input: data (array), tiap item berisi field __row_index yang mewakili nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index mewakili nomor baris item data asli, field mewakili field yang disorot

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

return _.map(filtered, item => ({

const maxItems = _.map(grouped, group =>

const profitRate = item.profit / item.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
field: 'sales'

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

### barVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### barColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna elemen bar (elemen persegi panjang)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Border color of the bar mark (rectangle mark)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value

:::

**Contoh**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Sudut membulat elemen bar (elemen persegi panjang)



Opasitas stroke elemen bar (elemen persegi panjang)

:::

**Contoh**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik anotasi. Menentukan titik anotasi diagram berdasarkan data yang dipilih, termasuk posisi, format, gaya, dan pengaturan terkait.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Selector titik anotasi, digunakan untuk memilih titik data.
:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


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
Menentukan metrik id yang dimiliki titik anotasi. Dalam skenario multi-metrik, dapat digabung dengan selector untuk menemukan titik anotasi metrik target secara unik.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Mengimplementasikan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI.

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit dinyatakan dengan selector statis.

Kemampuan inti:

- Mendukung kondisi pemfilteran data yang kompleks

- Menggunakan fungsi utilitas bawaan untuk operasi data

- Dieksekusi secara aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi

Konfigurasi filter dinamis diagram

Memfilter mark diagram (area, titik, dll.) melalui kode JavaScript yang dihasilkan AI
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Sorot batang dengan sales lebih dari 1000"

"Sorot batang dengan tingkat laba tertinggi di setiap region"



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
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


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

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
'red'

:::

**Contoh**
'annotationtext'



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
Perataan teks. Umumnya atur ke right agar teks tampil di kiri titik anotasi dan tetap berada di area chart yang terlihat

Disarankan menggunakan 'right' agar teks berada di kiri titik anotasi

right: teks berada di kiri titik anotasi, tepi kanan teks sejajar dengan titik anotasi

left: teks berada di kanan titik anotasi, tepi kiri teks sejajar dengan titik anotasi

center: teks berada di tengah titik anotasi

:::

**Contoh**
'right' teks berada di kiri titik anotasi
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
'top' teks berada di bawah titik anotasi
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
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border background

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
offsetY: 5, moves the whole annotation point down by 5 pixels



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
'red'

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

Menghitung nilai garis anotasi secara dinamis melalui kode JavaScript yang dihasilkan AI.

Cocok saat posisi garis anotasi perlu ditentukan secara dinamis berdasarkan data, seperti rata-rata, maksimum, kuantil, atau garis bisnis.

Hanya mendukung lingkungan browser (memerlukan Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



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
field: 'sales'
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
'red'

:::

**Contoh**
'annotationtext'



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
middle: Teks dipusatkan secara vertikal di area anotasi.









:::

**Contoh**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Opasitas warna area anotasi
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
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border background

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
Padding latar belakang

:::

**Contoh**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
Garis anotasi nilai dimensi, ditampilkan secara horizontal. Posisi, style, dan pengaturan terkait garis anotasi dapat dikonfigurasi.

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

Menghitung nilai garis anotasi secara dinamis melalui kode JavaScript yang dihasilkan AI.

Cocok saat posisi garis anotasi perlu ditentukan secara dinamis berdasarkan data, seperti rata-rata, maksimum, kuantil, atau garis bisnis.

Hanya mendukung lingkungan browser (memerlukan Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



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
field: 'sales'
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
'red'

:::

**Contoh**
'annotationtext'



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
Perataan teks. Umumnya tidak perlu diatur

Disarankan menggunakan 'right' agar teks berada di kiri garis anotasi

right: teks berada di kiri garis referensi, tepi kanan teks sejajar dengan ujung garis anotasi horizontal

left: teks berada di kanan garis referensi, tepi kiri teks sejajar dengan ujung garis anotasi horizontal

center: teks berada di tengah garis referensi

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
Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border background



Lebar border background

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
Padding latar belakang

:::

**Contoh**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Opasitas warna area anotasi



Opasitas warna area anotasi
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
Warna utama untuk bagian yang lebih besar dari nilai anotasi
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Deskripsi}
Konfigurasi area anotasi. Berdasarkan data yang dipilih, mendefinisikan area anotasi diagram, termasuk posisi, gaya, dan lain-lain.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fungsi linkage dimensi ketika diagram mengaktifkan perspektif atau ketika metrik digabungkan.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


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
'red'

:::

**Contoh**
'annotationtext'



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
'center': text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}








Orde regresi polinomial

:::

**Contoh**
'top': text is at the bottom of the annotation area



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
Warna teks



Warna teks

:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar border background

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
Margin area penanda

:::

**Contoh**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Deskripsi}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Deskripsi}
Titik jangkar awal garis anotasi perbedaan.

Konfigurasi jangkar perbedaan, digunakan untuk memilih data yang terikat ke titik awal atau akhir.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Deskripsi}
Selector jangkar, harus akhirnya menemukan satu jangkar logis.
:::

**Contoh**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.
:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Deskripsi}
Titik jangkar akhir garis anotasi perbedaan.

Konfigurasi jangkar perbedaan, digunakan untuk memilih data yang terikat ke titik awal atau akhir.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Deskripsi}
Selector jangkar, harus akhirnya menemukan satu jangkar logis.
:::

**Contoh**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Deskripsi}
return _.flatten(
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
sama dengan operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan


sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Deskripsi}
Jenis nilai selisih.

- absolute: menampilkan selisih absolut, dihitung sebagai end - start

- percent: menampilkan selisih persentase, dihitung sebagai (end - start) / start
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Metrik font teks.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang teks.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis.
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya garis.
:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan keterkaitan dimensi saat pivot atau pengelompokan metrik diaktifkan pada diagram

Saat mengarahkan kursor ke nilai dimensi, sorot data dengan nilai dimensi yang sama di diagram lain



Konfigurasi tautan dimensi diagram pivot

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah mengaktifkan tautan dimensi diagram pivot

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan informasi Tooltip dari sub-diagram yang sesuai dengan semua dimensi

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Konfigurasi bahasa diagram. Mendukung dua bahasa, 'zh-CN' dan 'en-US'. Bahasa juga dapat diatur dengan memanggil intl.setLocale('zh-CN')
:::

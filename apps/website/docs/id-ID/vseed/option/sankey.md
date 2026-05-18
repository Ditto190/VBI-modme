# Sankey

:::info{title=Pemetaan Encoding}
Diagram Sankey mendukung kanal visual berikut:

`source`: kanal sumber, mendukung `beberapa dimensi`

`target`: kanal tujuan, mendukung `beberapa dimensi`

`color`: kanal warna, mendukung `beberapa dimensi`

`size`: kanal ukuran, mendukung `satu metrik`

`label`: kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`

:::

:::note{title=Deskripsi}
Diagram Sankey digunakan untuk menampilkan hubungan aliran dari source ke target, dengan lebar link menunjukkan besar aliran

Skenario yang sesuai:

\- Menampilkan hubungan aliran dalam struktur node-link biasa

\- Menampilkan perpindahan jalur setelah beberapa dimensi source dan beberapa dimensi target digabungkan

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal 1 dimensi source atau dimensi default yang dapat dipetakan sebagai source

\- Minimal 1 dimensi target

\- Minimal 1 field numerik (metrik) untuk memetakan ukuran aliran

\- advanced pipeline perlu mengonversi tidyData menjadi struktur source / target / value biasa yang dapat dikonsumsi sankey

:::


## chartType

**Type:** `"sankey"`

:::note{title=Deskripsi}
Diagram Sankey



Diagram Sankey, menampilkan hubungan aliran source-target biasa dan besar aliran

:::

**Contoh**
'sankey'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Set data



Set data yang telah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data diagram
:::

**Contoh**
[{fromRegion: 'Tiongkok Utara', toRegion: 'Tiongkok Timur', value: 30}]




## dimensions

**Type:** `SankeyDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi



Konfigurasi dimensi, digunakan untuk menentukan struktur node source / target, mendukung kanal source / target / color / detail / label / tooltip / row / column

:::

**Contoh**
[{id: 'fromRegion', alias: 'Wilayah Sumber'}, {id: 'toRegion', alias: 'Wilayah Tujuan', encoding: 'target'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "source" | "target" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- source: mendukung pemetaan beberapa dimensi ke kanal source; tahap advanced akan menggabungkannya menjadi jalur node hulu

\- target: mendukung pemetaan beberapa dimensi ke kanal target; tahap advanced akan menggabungkannya menjadi jalur node hilir

\- color: mendukung pemetaan beberapa dimensi ke kanal warna, digunakan untuk menghasilkan key kategori warna sankey

\- detail: mendukung pemetaan beberapa dimensi ke kanal detail

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- row: mendukung pemetaan beberapa dimensi ke kanal baris, digunakan untuk diagram pivot

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom, digunakan untuk diagram pivot

:::


## measures

**Type:** `SankeyMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik



Konfigurasi metrik, digunakan untuk menentukan ukuran aliran, mendukung kanal size / detail / label / tooltip

:::

**Contoh**
[{id: 'sales', alias: 'Penjualan'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik. Tidak boleh duplikat
:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias metrik. Duplikat diperbolehkan. Jika tidak diisi, alias menggunakan id
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default dan memiliki prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Saat diaktifkan, label dan tooltip diagram otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale

Aturan format: angka desimal dengan compact notation aktif, minimal 0 digit desimal, maksimal 2 digit desimal, pembulatan otomatis, menggunakan Intl.NumberFormat browser

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik, otomatis diterapkan pada label dan tooltip

Catatan: untuk menggunakan format kustom, set autoFormat=false secara eksplisit; jika tidak, autoFormat akan menimpa konfigurasi ini
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka. Mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka
:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks pemformatan angka
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks pemformatan angka
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritas lebih rendah daripada significantDigits
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
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
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
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan pemformatan angka, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingMode Intl.NumberFormat
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka. Mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka
:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks pemformatan angka
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks pemformatan angka
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritas lebih rendah daripada significantDigits
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
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
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
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan pemformatan angka, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingMode Intl.NumberFormat
:::

### encoding

**Type:** `"detail" | "tooltip" | "label" | "size" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- size: metrik dipetakan ke kanal lebar edge / ukuran aliran

\- detail: metrik dipetakan ke kanal detail

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




Warna latar belakang dapat berupa string warna seperti 'red', 'blue', atau hex, rgb, maupun rgba seperti '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna



Konfigurasi warna, digunakan untuk menentukan skema warna diagram, termasuk daftar warna, pemetaan warna, gradien warna, dan lain-lain

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
Pemetaan warna, digunakan untuk memetakan nilai data ke warna tertentu
:::

**Contoh**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai positif pada diagram
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai negatif pada diagram
:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Konfigurasi label untuk menentukan label data diagram, termasuk posisi, format, dan gaya.



Konfigurasi label, digunakan untuk menentukan label data diagram, termasuk posisi, format, gaya, dan lain-lain

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah label diaktifkan
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

Dalam skenario multi-metrik, tidak perlu khawatir nilai beberapa metrik saling bertentangan, karena semua metrik terkait penggambaran diproses oleh `foldMeasures` dan digabungkan menjadi satu metrik yang mewakili satu titik data.

Catatan: encoding.label memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi encoding.label
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir nilai beberapa metrik saling bertentangan, karena semua metrik terkait penggambaran diproses oleh `foldMeasures` dan digabungkan menjadi satu metrik yang mewakili satu titik data.

Catatan: encoding.label memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi encoding.label
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan label dimensi

Menampilkan semua label dimensi

Catatan: encoding.label memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi encoding.label
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah nilai label diformat otomatis. Saat autoFormat bernilai true, konfigurasi numFormat diabaikan
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format nilai label. Konfigurasi ini digabungkan dengan `format` dalam `measure`; `format` dalam `measure` memiliki prioritas lebih tinggi. numFormat memiliki prioritas lebih rendah daripada autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka. Mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka
:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks pemformatan angka
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks pemformatan angka
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritas lebih rendah daripada significantDigits
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
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
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
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan pemformatan angka, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingMode Intl.NumberFormat
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font label
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font label
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar label
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
Apakah warna font label otomatis dibalik berdasarkan warna mark
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
Posisi label
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah anti-overlap label diaktifkan
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Filter label. Secara default, hubungan kondisi antar selectors adalah OR
:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi, id dari salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: memilih item data dengan nilai field dimensi yang ada dalam value

\- not in: memilih item data dengan nilai field dimensi yang tidak ada dalam value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: memilih item data dengan nilai field dimensi yang ada dalam value

\- not in: memilih item data dengan nilai field dimensi yang tidak ada dalam value

sama dengan operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data. Array didukung
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI

Kemampuan utama:

\- Mendukung kondisi filter data yang sangat kompleks

\- Menggunakan fungsi utilitas bawaan untuk operasi data

\- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya didukung di lingkungan browser; lingkungan Node.js akan menggunakan fallback

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan. dynamicFilter memiliki prioritas lebih tinggi

Konfigurasi filter dinamis diagram

Menggunakan kode JavaScript yang dihasilkan AI untuk memfilter mark diagram (bar, titik, dan sebagainya)
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami)
:::

**Contoh**
"Sorot batang dengan penjualan di atas 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI

\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter input: data (array), setiap item berisi field __row_index sebagai nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index adalah nomor baris item data asli, dan field adalah field yang perlu disorot

\- Dilarang: eval, Function, operasi async, DOM API, request jaringan
:::

**Contoh**
Sorot field sales pada item data dengan sales lebih dari 1000
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

Sorot item data dengan filter multi-kondisi
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
Fallback ketika eksekusi kode gagal atau lingkungan tidak didukung
:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi, id dari salah satu item dalam dimensions
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: memilih item data dengan nilai field dimensi yang ada dalam value

\- not in: memilih item data dengan nilai field dimensi yang tidak ada dalam value
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: memilih item data dengan nilai field dimensi yang ada dalam value

\- not in: memilih item data dengan nilai field dimensi yang tidak ada dalam value

sama dengan operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data. Array didukung
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada tahap prepare(); hanya baca saat runtime
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




Konfigurasi legenda, digunakan untuk menentukan tampilan, posisi, dan gaya legenda warna diagram Sankey

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah legenda diaktifkan
:::

**Contoh**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah border legenda diaktifkan
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**




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
Warna ikon pager saat nonaktif
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font legenda
:::

**Contoh**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font legenda
:::

**Contoh**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
Bentuk legenda
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legenda
:::

**Contoh**




### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah maksimum kolom atau baris saat item legenda sangat banyak

Jika position horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan

Jika position vertikal (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah baris yang ditampilkan
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}




Konfigurasi tooltip, digunakan untuk menentukan informasi tooltip diagram, termasuk konten, format, gaya, dan lain-lain

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram



Tema



Tersedia dua tema bawaan, light dan dark; tema baru dapat disesuaikan melalui registerTheme.
:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Bahasa



Konfigurasi bahasa diagram, mendukung 'zh\-CN' dan 'en\-US'

:::

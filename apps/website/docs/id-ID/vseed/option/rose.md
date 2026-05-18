# Rose

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` metrik, `1` dimensi

\- Mendukung restrukturisasi data: setidaknya `1` metrik, `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Diagram rose bertumpuk mendukung kanal visual berikut:

`angle`  : kanal sudut, mendukung `beberapa dimensi`, memetakan nilai dimensi ke sumbu sudut

`radius` : kanal radius, mendukung `beberapa metrik`, memetakan nilai metrik ke sumbu radius

`detail` : kanal detail, mendukung `beberapa dimensi`, digunakan untuk menampilkan data yang lebih rinci dalam seri warna yang sama

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi digunakan untuk membedakan seri data, sedangkan warna metrik digunakan untuk memetakan nilai metrik secara linear ke warna grafis

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat pengguna mengarahkan kursor ke titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Diagram rose bertumpuk cocok untuk skenario perbandingan data multi-dimensi, menampilkan besaran data melalui panjang busur dan radius sektor dalam sistem koordinat polar

Skenario yang sesuai:

\- Perbandingan distribusi data multi-dimensi

\- Perbandingan kekuatan pada data periodik

\- Menampilkan nilai numerik dan proporsi data kategori secara bersamaan

:::

:::warning{title=Warning}
Kebutuhan data:

\- Setidaknya 1 field numerik (metrik)

\- Dimensi pertama ditempatkan pada sumbu sudut; dimensi lainnya digabung dengan nama metrik (jika ada beberapa metrik) dan ditampilkan sebagai item legenda

\- Semua metrik otomatis digabungkan menjadi satu metrik

Fitur yang diaktifkan secara default:

\- Legenda, sistem koordinat polar, label data, tooltip, dan penskalaan nilai diaktifkan secara default

:::


## chartType

**Type:** `"rose"`

:::note{title=Deskripsi}
Diagram rose bertumpuk



Diagram rose bertumpuk, menampilkan hubungan perbandingan data multi-dimensi melalui sistem koordinat polar

:::

**Contoh**
'rose'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Set data



Set data agregat yang mengikuti spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data diagram. Set data yang dimasukkan pengguna tidak memerlukan pemrosesan manual; VSeed memiliki kemampuan restrukturisasi data yang kuat dan akan merestrukturisasi data secara otomatis. Data diagram rose pada akhirnya dikonversi menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi



Dimensi pertama pada diagram rose dipetakan ke sumbu sudut; dimensi lainnya digabung dengan nama metrik (jika ada beberapa metrik) dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'category', alias: 'Category'}]




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
Konfigurasi format waktu dimensi

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Deskripsi}
Granularitas waktu, menentukan presisi tampilan tanggal

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- angle: mendukung pemetaan beberapa dimensi ke kanal sudut

\- color: mendukung pemetaan beberapa dimensi ke kanal warna

\- detail: mendukung pemetaan beberapa dimensi ke kanal detail

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik



Metrik pada diagram rose otomatis digabung menjadi satu metrik dan dipetakan ke sumbu radius. Jika ada beberapa metrik, nama metrik digabung dengan dimensi lain dan ditampilkan sebagai item legenda.
:::

**Contoh**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik, tidak boleh duplikat

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias metrik, boleh duplikat; jika tidak diisi, alias sama dengan id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Format angka otomatis, aktif secara default dan memiliki prioritas tertinggi

Saat autoFormat=true, konfigurasi ini menimpa semua konfigurasi numFormat

Saat diaktifkan, label data diagram dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale

Aturan format: angka desimal dengan compact notation aktif, minimal 0 digit desimal, maksimal 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat dari browser

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Format angka kustom untuk metrik; otomatis diterapkan ke label dan tooltip

Catatan: Untuk memakai format kustom, Anda harus menetapkan autoFormat=false secara eksplisit; jika tidak, autoFormat akan menimpa konfigurasi ini

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Deskripsi}
Channel tempat metrik dipetakan

\- radius: metrik yang dipetakan ke kanal radius

\- color: metrik yang dipetakan ke kanal warna

\- label: metrik yang dipetakan ke kanal label

\- tooltip: metrik yang dipetakan ke kanal tooltip

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
Konfigurasi pagination untuk menentukan nama field pagination; harus berupa dimensi

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field pagination; menentukan nama field untuk pagination dan harus berupa dimensi

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
Nilai pagination saat ini; menentukan nilai untuk menentukan halaman saat ini

:::

**Contoh**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang chart



Warna latar belakang dapat berupa string warna (mis. 'red', 'blue'), atau nilai hex, rgb, maupun rgba (mis. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Color



Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, mapping warna, dan gradien warna.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna diskret untuk menentukan warna berbagai elemen dalam chart

:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna gradien linear untuk menentukan warna berbagai elemen dalam chart

:::

**Contoh**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}
Pemetaan warna untuk memetakan nilai data ke warna tertentu

:::

**Contoh**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai positif di chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai negatif di chart

:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Deskripsi}
Label



Konfigurasi label untuk menentukan label data diagram, termasuk posisi, format, dan style.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi label diaktifkan

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label pindah ke baris berikutnya

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai metrik

In multi-metrik scenarios, there is no concern about conflicting values, because all plot-related metrik go through `foldMeasures` processing and are merged into one metrik representing a single data point

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai metrik

In multi-metrik scenarios, there is no concern about conflicting values, because all plot-related metrik go through `foldMeasures` processing and are merged into one metrik representing a single data point

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
Apakah nilai label diformat otomatis; saat autoFormat true, konfigurasi numFormat diabaikan

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format nilai label; digabung dengan `format` pada `measure`, dan `format` milik `measure` memiliki prioritas lebih tinggi. Prioritas numFormat lebih rendah dari autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Jenis format angka, mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 dikonversi menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

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
Prioritas pembulatan untuk format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode

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
Apakah warna font label otomatis dibalik berdasarkan warna elemen grafis

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
Posisi label

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah fungsi anti-tumpang-tindih label diaktifkan

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Filter label; relasi default antar selector adalah OR

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi, id dari salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
return _.flatten(

\- in: Memilih item data ketika nilai field dimensi berada di dalam value


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value


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

Menerapkan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI

Kemampuan utama:

- Mendukung kondisi pemfilteran data yang kompleks

- Menggunakan fungsi utilitas bawaan untuk operasi data

- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker)

Kebutuhan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi

Konfigurasi filter dinamis chart

Menerapkan pemfilteran mark chart (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI

:::

#### type

**Type:** `"row-with-field"`
#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan pemfilteran pengguna (bahasa alami)

:::

**Contoh**
"Sorot bar dengan sales lebih dari 1000"

"Sorot bar dengan margin profit tertinggi di setiap wilayah"


#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode pemfilteran JavaScript yang dihasilkan AI

- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item berisi field __row_index sebagai nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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

Sorot item data yang memenuhi beberapa kondisi
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
Fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::

##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi, id dari salah satu item di dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: memilih item data yang nilai field dimensinya berada dalam value

- not in: memilih item data yang nilai field dimensinya tidak berada dalam value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

- in: memilih item data yang nilai field dimensinya berada dalam value

- not in: memilih item data yang nilai field dimensinya tidak berada dalam value

sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi pada item data; mendukung array

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada tahap prepare(); hanya-baca saat runtime

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
\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan







:::


## legend

**Type:** `Legend | undefined`

:::note{title=Deskripsi}
Legenda

Konfigurasi legenda untuk menentukan legenda chart, termasuk posisi, format, dan gaya.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah legenda diaktifkan
:::

**Contoh**
return _.map(filtered, item => ({



### border

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah border legenda diaktifkan
:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**
const maxItems = _.map(grouped, group =>



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
const profitRate = item.profit / item.sales;

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
field: 'sales'

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
return _.flatten(

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font legenda
:::

**Contoh**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font legenda
:::

**Contoh**
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value



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
Posisi legenda
:::

**Contoh**
\- in: Memilih item data ketika nilai field dimensi berada di dalam value



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi tidak berada di dalam value





:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret
:::

**Contoh**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
Tooltip

Konfigurasi tooltip untuk menentukan tooltip chart, termasuk posisi, format, dan gaya.
:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Chart brush configuration









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah brush selection aktif

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
\- in: Memilih item data ketika nilai field dimensi berada di dalam value



\- `y`: seleksi sumbu Y, membatasi seleksi pada arah sumbu Y sementara sumbu X tidak dibatasi

\- `rect`: seleksi brush persegi panjang, tersedia pada arah sumbu X dan sumbu Y

\- `polygon`: seleksi brush poligon, menggambar poligon bebas dengan mengklik beberapa titik


\- `y`: seleksi brush sumbu Y, hanya dibatasi pada arah sumbu Y

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Mode brush selection, pilihan tunggal atau banyak pilihan



Menentukan mode brush selection


\- `multiple`: mode pilihan banyak; beberapa area brush dapat ada pada saat yang sama

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah area brush dibersihkan setelah pemilihan berakhir

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Gaya data di dalam area brush

Menentukan gaya titik data yang terseleksi
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
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Gaya data di luar area brush

Menentukan gaya titik data yang tidak terseleksi
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
legend font color



Opasitas titik data yang tidak dipilih, rentang 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Deskripsi}
Animation configuration



Konfigurasi animasi chart; efek yang tersedia dibatasi oleh jenis chart

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
legend font color

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Deskripsi}
Parameter animasi pie/donut/rose

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi masuk untuk pie/donut/rose

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Deskripsi}
Efek animasi masuk untuk pie/donut/rose, mendukung animasi radial dan skala

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tahap animasi saat ini diaktifkan

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi, dalam milidetik

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi pembaruan untuk pie/donut/rose

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Deskripsi}
Efek animasi pembaruan pie/donut/rose, mendukung animasi radial

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tahap animasi saat ini diaktifkan

:::

##### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi

:::

##### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi, dalam milidetik

:::

##### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi loop pie/donut/rose

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi loop diaktifkan

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
Interval animasi loop, dalam milidetik

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Deskripsi}
\- `polygon`: seleksi poligonal, memungkinkan menggambar poligon bebas dengan mengklik beberapa titik

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Deskripsi}
Efek loop pie/donut/rose

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tahap animasi saat ini diaktifkan

:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
brushtype

:::

###### duration

**Type:** `number | undefined`

:::note{title=Deskripsi}
Durasi animasi, dalam milidetik

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna highlight atau atmosfer animasi

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Deskripsi}
\- `polygon`: seleksi brush poligon; klik beberapa titik untuk menggambar poligon apa pun sebagai seleksi

:::


###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- `x`: seleksi brush hanya dalam arah sumbu X; arah sumbu Y tidak dibatasi

:::

###### color

**Type:** `string | undefined`

:::note{title=Deskripsi}
\- `y`: seleksi brush arah sumbu Y saja; arah sumbu X tidak dibatasi

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram. Tema adalah konfigurasi fungsional berprioritas lebih rendah yang mencakup konfigurasi umum untuk semua jenis diagram dan konfigurasi untuk satu jenis diagram.



Tersedia dua tema bawaan, light dan dark; pengguna dapat menyesuaikan tema melalui Builder.



Tema



Tersedia dua tema bawaan, light dan dark; tema baru dapat disesuaikan melalui registerTheme.
:::

**Contoh**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Language



Konfigurasi bahasa chart. Mendukung dua bahasa, 'zh\-CN' dan 'en\-US'; selain itu, bahasa dapat diatur dengan memanggil intl.setLocale('zh\-CN')

:::

# Scatter

:::info{title=Rekomendasi}
- Konfigurasi field yang direkomendasikan: `2` metrik dan `1` dimensi

- Mendukung restrukturisasi data: minimal `1` metrik dan `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Diagram scatter mendukung kanal visual berikut:

`xAxis`  : kanal sumbu X, mendukung `beberapa metrik`, dipetakan ke sumbu X berdasarkan nilai metrik

`yAxis`  : kanal sumbu Y, mendukung `beberapa metrik`, dipetakan ke sumbu Y berdasarkan nilai metrik

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi digunakan untuk membedakan seri data, sedangkan warna metrik digunakan untuk memetakan nilai metrik secara linear ke warna grafis

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat mouse berada di atas titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Diagram scatter cocok untuk menampilkan distribusi data, dengan posisi titik yang merepresentasikan nilai data

Skenario penggunaan:

- Menganalisis karakteristik distribusi seperti kecenderungan pusat, rentang, dan outlier

:::

:::warning{title=Warning}
Persyaratan data:

- Minimal dua field numerik (metrik)

- Field metrik pertama ditempatkan pada sumbu X, sedangkan metrik lainnya digabung dan dipetakan ke sumbu Y

- Nama metrik dan nama dimensi digabung lalu ditampilkan sebagai item legenda

Fitur yang aktif secara default:

- Legenda, sumbu, penanda titik data, tooltip, dan garis tren aktif secara default

:::


## chartType

**Type:** `"scatter"`

:::note{title=Deskripsi}
Diagram scatter



Diagram scatter cocok untuk menampilkan distribusi data, dengan posisi titik yang merepresentasikan nilai data

:::

**Contoh**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset

Dataset yang sesuai dengan spesifikasi TidyData dan sudah diagregasi untuk mendefinisikan sumber serta struktur data chart. Data input pengguna tidak perlu diproses manual; VSeed akan melakukan reshape data secara otomatis. Data scatter chart akhirnya dikonversi menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]


## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi



Dimensi pertama pada diagram scatter dipetakan ke sumbu X; dimensi lainnya digabung dengan nama metrik saat terdapat beberapa metrik dan ditampilkan sebagai item legenda

:::

**Contoh**
[{id: "month", alias: "Bulan"}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

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

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik scatter chart

:::

**Contoh**
[
  {
    id: 'profit', alias: 'Profit', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: 'Penjualan', encoding: 'yAxis'
  }
]


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

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Jika aktif, label data chart dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip

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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- xAxis: metrik yang dipetakan ke sumbu X

\- yAxis: metrik yang dipetakan ke sumbu Y

\- size: ukuran yang dipetakan dari metrik

\- color: warna yang dipetakan dari metrik

\- label: label yang dipetakan dari metrik

\- tooltip: tooltip yang dipetakan dari metrik

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam konfigurasi measure datar, membangun grup measure berbentuk pohon. parentId menunjuk ke id grup measure induk dan digunakan untuk membangun pohon measure

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon measure: opsi 1 adalah langsung mengonfigurasi pohon measure dengan children; opsi 2 adalah mengonfigurasi daftar measure datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Paginasi



Konfigurasi paginasi untuk paginasi chart

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




## size

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Ukuran metrik diagram scatter, digunakan untuk menentukan ukuran atau rentang ukuran titik data

\- Jika rentang ukuran berupa angka seperti 10, ukuran titik data tetap 10

\- Jika rentang ukuran berupa array dua elemen seperti [10, 40], ukuran titik data berada antara 10 dan 40

\- Saling eksklusif dengan sizeRange; prioritas lebih rendah daripada size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Rentang ukuran metrik diagram scatter, digunakan untuk menentukan rentang ukuran titik data,

\- Jika rentang ukuran berupa array dua elemen seperti [10, 40], ukuran titik data berada antara 10 dan 40

\- Jika rentang ukuran berupa angka seperti 10, ukuran titik data tetap 10

\- Saling eksklusif dengan sizeRange; prioritas lebih tinggi daripada size

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang chart



Warna latar belakang dapat berupa string warna (mis. 'red', 'blue'), atau nilai hex, rgb, atau rgba (mis. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna



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
Konfigurasi warna positif/negatif; menentukan warna untuk nilai positif dalam chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; menentukan warna untuk nilai negatif dalam chart

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Label



Konfigurasi label untuk menentukan label data dalam chart, termasuk posisi, format, dan gaya.

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
Apakah label menampilkan nilai measure

Dalam skenario multi-measure, tidak perlu khawatir terjadi konflik nilai, karena semua measure yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu measure yang mewakili satu titik data

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai measure

Dalam skenario multi-measure, tidak perlu khawatir terjadi konflik nilai, karena semua measure yang terkait dengan plot melewati proses `foldMeasures` dan digabung menjadi satu measure yang mewakili satu titik data

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
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Jika aktif, label data chart dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip

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

Konfigurasi filter dinamis chart

Memfilter mark chart (area, titik, dll.) melalui kode JavaScript yang dihasilkan AI
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item memiliki field __row_index yang menunjukkan nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Legenda

Konfigurasi legenda untuk menentukan legenda chart, termasuk posisi, format, dan gaya.
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
Hanya berlaku untuk legenda diskret
:::

**Contoh**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font label

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
Ukuran font legenda

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
Ketebalan font legenda

:::

**Contoh**
labelFontWeight: 400


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
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah maksimum kolom atau baris saat item legenda banyak





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

Konfigurasi tooltip untuk mendefinisikan tooltip chart, termasuk posisi, format, gaya, dll.
:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi label diaktifkan

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Konfigurasi brush chart









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah seleksi brush diaktifkan

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
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



Mendefinisikan gaya titik data di luar seleksi brush
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

## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi



Konfigurasi animasi diagram; efek yang tersedia dibatasi oleh tipe diagram

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi chart garis/area diaktifkan

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=Deskripsi}
Parameter animasi diagram scatter

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi masuk diagram scatter

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=Deskripsi}
Efek masuk diagram scatter, mendukung animasi grow dan scale

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

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi pembaruan diagram scatter

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}
Efek pembaruan untuk chart garis/area; mendukung animasi pertumbuhan

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

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi loop diagram scatter

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

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi loop diagram scatter

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=Deskripsi}
Efek loop diagram scatter

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
Animasi atmosfer untuk chart garis/area

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
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Jika aktif, label data chart dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip

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
Apakah label terlihat
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis sumbu
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
Tick sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
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
Ukuran tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
Judul sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
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
Ukuran font judul
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
Sumbu Y



Sumbu numerik. Konfigurasi sumbu Y untuk menentukan posisi, format, gaya, dan pengaturan terkait.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah sumbu terlihat
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
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa

Jika aktif, label data chart dan tooltip akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale

Aturan format: angka desimal dengan notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip

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
Apakah label terlihat
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis sumbu
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Deskripsi}
Tick sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
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
Ukuran tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Deskripsi}
Judul sumbu X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label terlihat
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
Ukuran font judul
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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Deskripsi}
Garis panduan vertikal

Garis panduan vertikal yang ditampilkan saat mouse bergerak di atas diagram.

Konfigurasi crosshair, digunakan untuk menampilkan garis crosshair (garis panduan) pada diagram.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah sumbu terlihat
:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font label

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label garis crosshair ditampilkan

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang label

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema chart. Tema adalah konfigurasi fitur dengan prioritas lebih rendah yang mencakup pengaturan umum untuk semua jenis chart dan pengaturan chart yang digunakan bersama dalam satu kelas chart.

Tema bawaan light dan dark tersedia; pengguna dapat mendefinisikan tema kustom melalui Builder.

Tema

Tersedia dua tema bawaan, light dan dark; tema baru dapat dikustomisasi melalui registerTheme.

:::

**Contoh**
'dark'

'light'

'customThemeName'


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya mark titik, digunakan untuk menentukan warna mark titik, border, dan pengaturan terkait.

Mendukung konfigurasi gaya global atau gaya bersyarat

Filter data




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

Konfigurasi filter dinamis chart

Memfilter mark chart (area, titik, dll.) melalui kode JavaScript yang dihasilkan AI
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item memiliki field __row_index yang menunjukkan nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik anotasi. Menentukan titik anotasi chart berdasarkan data yang dipilih, termasuk posisi, format, gaya, dan pengaturan terkait.

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

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Menentukan measure id yang dimiliki titik anotasi. Dalam skenario multi-measure, dapat digabung dengan selector untuk menemukan titik anotasi measure target secara unik.
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

Konfigurasi filter dinamis chart

Memfilter mark chart (area, titik, dll.) melalui kode JavaScript yang dihasilkan AI
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
User's filtering requirement description (natural language).
:::

**Contoh**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dibuat AI



- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

- Parameter input: data (array), setiap item memiliki field __row_index yang menunjukkan nomor baris

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

- __row_index menunjukkan nomor baris item data asli, field menunjukkan field yang perlu disorot

- Dilarang menggunakan: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
true



### offsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak offset piksel seluruh titik anotasi pada arah X. Saat titik anotasi berada di sisi kiri chart (awal sumbu kategori), disarankan nilai positif; saat berada di sisi kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri; misalnya -10 menggeser titik anotasi beserta teks dan background 10 piksel ke kiri

Nilai positif menggeser seluruh komponen ke kanan; misalnya 10 menggeser titik anotasi beserta teks dan background 10 piksel ke kanan

:::

**Contoh**
offsetX: 5, seluruh titik anotasi bergeser 5 piksel ke kanan
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Garis anotasi nilai dimensi, ditampilkan secara vertikal, dengan posisi dan gaya yang dapat dikonfigurasi

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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Deskripsi}
\- Parameter input: data (array), setiap item mencakup field __row_index yang menunjukkan nomor baris



\- __row_index menunjukkan nomor baris item data asli; field menunjukkan field yang akan di-highlight






\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Gaya segmen garis

:::

**Contoh**
`lineStyle: 'solid'`




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
Garis anotasi numerik, termasuk garis rata-rata, maksimum, dan minimum. Ditampilkan secara horizontal dan dapat dikonfigurasi berdasarkan posisi serta style. Gunakan konfigurasi ini untuk menggambar garis anotasi nilai numerik seperti garis rata-rata.

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
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Deskripsi}
\- Parameter input: data (array), setiap item mencakup field __row_index yang menunjukkan nomor baris



\- __row_index menunjukkan nomor baris item data asli; field menunjukkan field yang akan di-highlight






\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan

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
Gaya segmen garis

:::

**Contoh**
`lineStyle: 'solid'`




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
Area anotasi

Konfigurasi area anotasi; berdasarkan data yang dipilih, menentukan posisi dan style area anotasi.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fungsi linkage dimensi ketika chart mengaktifkan perspektif atau ketika measure digabungkan.

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




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi linear



Konfigurasi garis regresi linear, termasuk gaya garis dan pengaturan terkait.

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

Mengatur warna garis regresi. Jika tidak diatur, warna utama diagram digunakan secara default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Mengatur lebar garis regresi dalam piksel. Nilai default adalah 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Mengatur gaya garis regresi, seperti solid atau dashed. Default-nya solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Mengatur teks label garis regresi. String kosong berarti label tidak ditampilkan.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Pengaturan nilai interval kepercayaan. Tingkat kepercayaan default adalah 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=Deskripsi}
Graphic blur effect strength

:::

**Contoh**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna bayangan grafik

:::

**Contoh**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=Deskripsi}
Horizontal shadow offset distance

:::

**Contoh**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=Deskripsi}
Vertical shadow offset distance

:::

**Contoh**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=Deskripsi}
Item konfigurasi garis regresi berbobot lokal



Konfigurasi garis regresi berbobot lokal, termasuk gaya garis dan pengaturan terkait.

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

Mengatur warna garis regresi. Jika tidak diatur, warna utama diagram digunakan secara default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Mengatur lebar garis regresi dalam piksel. Nilai default adalah 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Mengatur gaya garis regresi, seperti solid atau dashed. Default-nya solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Mengatur teks label garis regresi. String kosong berarti label tidak ditampilkan.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Pengaturan nilai interval kepercayaan. Tingkat kepercayaan default adalah 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi polinomial



Konfigurasi garis regresi polinomial, termasuk orde polinomial, gaya garis, dan pengaturan terkait.

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

Mengatur warna garis regresi. Jika tidak diatur, warna utama diagram digunakan secara default.

:::

### degree

**Type:** `number | undefined`

:::note{title=Deskripsi}
Orde regresi polinomial

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Mengatur lebar garis regresi dalam piksel. Nilai default adalah 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Mengatur gaya garis regresi, seperti solid atau dashed. Default-nya solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Mengatur teks label garis regresi. String kosong berarti label tidak ditampilkan.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Pengaturan nilai interval kepercayaan. Tingkat kepercayaan default adalah 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=Deskripsi}
Garis regresi logistik



Konfigurasi garis regresi logistik, termasuk gaya garis dan pengaturan terkait.

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

Mengatur warna garis regresi. Jika tidak diatur, warna utama diagram digunakan secara default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis regresi

Mengatur lebar garis regresi dalam piksel. Nilai default adalah 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Gaya garis regresi

Mengatur gaya garis regresi, seperti solid atau dashed. Default-nya solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Deskripsi}
Teks label garis regresi

Mengatur teks label garis regresi. String kosong berarti label tidak ditampilkan.

:::

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



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah interval kepercayaan ditampilkan

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Deskripsi}
Pengaturan nilai interval kepercayaan. Tingkat kepercayaan default adalah 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna interval kepercayaan

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas interval kepercayaan

:::

**Contoh**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan keterkaitan dimensi saat pivot atau pengelompokan metrik diaktifkan pada chart

Saat mengarahkan kursor ke nilai dimensi, sorot data dengan nilai dimensi yang sama di chart lain



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
Language



Konfigurasi bahasa chart. Mendukung dua bahasa, 'zh\-CN' dan 'en\-US'; selain itu, bahasa dapat diatur dengan memanggil intl.setLocale('zh\-CN')

:::

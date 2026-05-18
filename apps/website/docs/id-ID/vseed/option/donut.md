# Donut

:::info{title=Rekomendasi}
- Konfigurasi field yang disarankan: `1` metrik, `2` dimensi

- Mendukung reshape data: minimal `1` metrik, `0` dimensi
:::

:::info{title=Pemetaan Encoding}
Diagram donut mendukung kanal visual berikut:

`angle`  : kanal sudut, mendukung `beberapa metrik`, memetakan nilai metrik ke sudut sektor

`detail` : kanal detail, mendukung `beberapa dimensi`, digunakan untuk menampilkan data dengan granularitas lebih halus dalam seri warna yang sama

`color`  : kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi digunakan untuk membedakan seri data, sedangkan warna metrik digunakan untuk pemetaan linear nilai metrik ke warna grafis

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat hover pada titik data

`label`  : kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data
:::

:::note{title=Deskripsi}
Diagram donut cocok untuk menampilkan hubungan proporsi data satu dimensi, dengan area kosong di tengah yang dapat menampilkan informasi ringkasan.

Skenario yang sesuai:

- Menampilkan data keseluruhan dan proporsi setiap bagian secara bersamaan

- Menekankan hubungan antara keseluruhan dan bagian-bagiannya

- Menampilkan metrik kunci atau judul di area tengah
:::

:::warning{title=Warning}
Kebutuhan data:

- Minimal 1 field metrik

- Semua dimensi digabung dengan nama metrik (jika ada beberapa metrik) dan ditampilkan sebagai item legenda

- Semua metrik otomatis digabung menjadi satu metrik

Fitur yang aktif secara default:

- Legenda, label data, tooltip, perhitungan persentase, dan teks tengah aktif secara default
:::


## chartType

**Type:** `"donut"`

:::note{title=Deskripsi}
Diagram donut

Diagram donut, varian diagram pai dengan area kosong di tengah.
:::

**Contoh**
'donut'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Set data

Set data yang sudah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk mendefinisikan sumber data dan struktur diagram. Data yang dimasukkan pengguna tidak perlu diproses lagi; VSeed memiliki kemampuan reshape data yang kuat dan akan melakukan reshape data secara otomatis. Data diagram donut pada akhirnya dikonversi menjadi 1 dimensi dan 1 metrik.
:::

**Contoh**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi

Semua dimensi diagram donut digabung dengan nama metrik (jika ada beberapa metrik) menjadi 1 dimensi, dipetakan ke sudut diagram pai, dan ditampilkan sebagai item legenda.
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

**Type:** `PieMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik

Semua metrik diagram donut otomatis digabung menjadi satu metrik dan dipetakan ke radius diagram pai. Jika ada beberapa metrik, nama metrik digabung dengan dimensi lainnya dan ditampilkan sebagai item legenda.
:::

**Contoh**
[{id: 'value', alias: 'Proporsi Nilai', format: 'percent'}]




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
Jenis format angka. Mendukung angka (desimal), persen (%), permille (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
:::

**Contoh**
\- 1234.5678 menjadi 1000, significantDigits:1
\- 1234.5678 menjadi 1200, significantDigits:2
\- 1234.5678 menjadi 1230, significantDigits:3
\- 1234.5678 menjadi 1234, significantDigits:4
\- 1234.5678 menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
Jenis format angka. Mendukung angka (desimal), persen (%), permille (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
:::

**Contoh**
\- 1234.5678 menjadi 1000, significantDigits:1
\- 1234.5678 menjadi 1200, significantDigits:2
\- 1234.5678 menjadi 1230, significantDigits:3
\- 1234.5678 menjadi 1234, significantDigits:4
\- 1234.5678 menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan pemformatan angka, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingMode Intl.NumberFormat
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- angle: sudut tempat metrik dipetakan

\- color: metrik dipetakan ke kanal warna

\- label: metrik dipetakan ke kanal label

\- tooltip: metrik dipetakan ke kanal tooltip
:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam bentuk konfigurasi metrik datar, membangun grup metrik berbentuk tree. parentId menunjuk ke id grup metrik induk untuk membangun tree metrik
:::

:::tip{title=Tip}
Konfigurasi pohon metrik memiliki dua bentuk: mengonfigurasi langsung pohon metrik dengan children, atau mengonfigurasi daftar metrik datar dengan parentId. Kedua bentuk tidak dapat digunakan bersamaan.
:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Konfigurasi paginasi, digunakan untuk menentukan nama field paginasi, dan harus berupa dimensi.
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
Warna latar belakang chart



Warna latar dapat berupa string warna (misalnya 'red', 'blue'), atau nilai hex, rgb, atau rgba (misalnya '#ff0000', 'rgba(255,0,0,0.5)')
:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna

Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, pemetaan warna, gradien warna, dan sebagainya.
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
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai positif pada chart
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai negatif pada chart
:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Deskripsi}
Label

Konfigurasi label untuk menentukan label data chart, termasuk posisi, format, dan gaya.
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
Jenis format angka. Mendukung angka (desimal), persen (%), permille (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio pemformatan angka. Tidak boleh 0
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol pemformatan angka, misalnya % atau ‰
:::

**Contoh**
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 menjadi 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritas lebih tinggi daripada fractionDigits
:::

**Contoh**
\- 1234.5678 menjadi 1000, significantDigits:1
\- 1234.5678 menjadi 1200, significantDigits:2
\- 1234.5678 menjadi 1230, significantDigits:3
\- 1234.5678 menjadi 1234, significantDigits:4
\- 1234.5678 menjadi 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan pemformatan angka saat significantDigits dan fractionDigits sama-sama diatur, menggunakan Intl.NumberFormat browser dengan aturan yang sama seperti roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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

Konfigurasi filter dinamis chart

Menggunakan kode JavaScript yang dihasilkan AI untuk memfilter mark chart (bar, titik, dan sebagainya)
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa alami)
:::

**Contoh**
"Highlight kolom dengan sales lebih besar dari 1000"

"Highlight kolom dengan margin profit tertinggi di setiap area"



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
Highlight field sales pada item data dengan sales lebih besar dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight item data dengan margin profit tertinggi di setiap area
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

Highlight item data yang memenuhi beberapa kondisi filter
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
Legenda

Konfigurasi legenda untuk menentukan legenda chart, termasuk posisi, format, dan gaya.
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
Warna ikon pager saat nonaktif
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
Jumlah maksimum kolom atau baris saat item legenda sangat banyak

Jika position horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan

Jika position vertikal (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah baris yang ditampilkan
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

Konfigurasi tooltip untuk menentukan tooltip diagram, termasuk posisi, format, dan gaya.
:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Seleksi brush

Konfigurasi brush untuk mengaktifkan atau menonaktifkan kemampuan brush selection.

Konfigurasi brush selection chart
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah brush selection diaktifkan
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
Jenis brush

Menentukan bentuk area brush dan arah seleksi.

\- `rect`: seleksi persegi panjang, dapat memilih pada arah sumbu X dan Y sekaligus

\- `polygon`: seleksi poligon, menggambar poligon bebas dengan mengklik beberapa titik

\- `x`: seleksi arah sumbu X, hanya memilih pada arah X tanpa membatasi arah Y

\- `y`: seleksi arah sumbu Y, hanya memilih pada arah Y tanpa membatasi arah X
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Mode brush, seleksi tunggal atau ganda

Menentukan mode brush.

\- `single`: mode seleksi tunggal; hanya satu area brush yang dapat ada pada satu waktu

\- `multiple`: mode seleksi ganda; beberapa area brush dapat ada sekaligus
:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah area brush dibersihkan setelah brush selection selesai
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

Opasitas titik data yang terseleksi, rentang nilai 0-1
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
Gaya data di luar area brush

Menentukan gaya titik data yang tidak terseleksi
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas

Opasitas titik data yang tidak terseleksi, rentang nilai 0-1
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

**Type:** `PieLikeAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi

Konfigurasi animasi chart; efek yang tersedia dibatasi oleh jenis chart
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan animasi diagram pai/donat/rose
:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Deskripsi}
Parameter animasi diagram pai/donat/rose
:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi masuk diagram pai/donat/rose
:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Deskripsi}
Efek animasi masuk diagram pai/donat/rose, mendukung animasi radial dan zoom
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
Konfigurasi animasi pembaruan diagram pai/donat/rose
:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Deskripsi}
Efek pembaruan diagram pai/donat/rose, mendukung animasi radial
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
Konfigurasi animasi loop diagram pai/donat/rose
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
Konfigurasi animasi loop diagram pai/donat/rose
:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Deskripsi}
Efek loop diagram pai/donat/rose
:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah tahap animasi saat ini diaktifkan
:::

###### ease

**Type:** `string | undefined`

:::note{title=Deskripsi}
Fungsi easing animasi
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
Konfigurasi animasi atmosfer diagram pai/donat/rose
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


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema chart. Tema adalah konfigurasi fitur berprioritas lebih rendah yang mencakup konfigurasi umum semua tipe chart dan konfigurasi bersama untuk satu tipe chart

Tersedia tema bawaan light dan dark. Pengguna dapat menyesuaikan tema melalui Builder

Tema

Tersedia tema bawaan light dan dark. Tema baru dapat disesuaikan melalui registerTheme.
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
Bahasa

Konfigurasi bahasa chart. Mendukung 'zh-CN' dan 'en-US'; Anda juga dapat memanggil intl.setLocale('zh-CN') untuk mengatur bahasa
:::

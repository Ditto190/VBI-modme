# Heatmap

:::info{title=Direkomendasikan}
- Konfigurasi field yang direkomendasikan: `1` metrik, `2` dimensi

- Mendukung Data Reshape: setidaknya `1` metrik, `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Chart Heatmap mendukung channel visual berikut:

`xAxis`      : channel sumbu x, mendukung `beberapa dimensi`, dipetakan ke sumbu x berdasarkan nilai dimensi

`yAxis`      : channel sumbu y, mendukung `beberapa dimensi`, dipetakan ke sumbu y berdasarkan nilai dimensi

`detail`     : channel detail, mendukung `beberapa dimensi`, digunakan untuk menampilkan data yang lebih rinci dalam seri warna yang sama

`color`      : channel warna, mendukung `satu metrik`, memetakan nilai metrik ke intensitas warna

`tooltip`    : channel tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat hover pada titik data

`label`      : channel label, mendukung `beberapa dimensi` dan `beberapa metrik`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Chart Heatmap menampilkan distribusi dan hubungan intensitas data melalui kedalaman warna dalam matriks dua dimensi.

Skenario yang sesuai:

- Menampilkan kepadatan dan intensitas data dua dimensi berskala besar

- Analisis korelasi antara kategori dan nilai numerik

- Perbandingan silang antara deret waktu dan kategori

:::

:::warning{title=Warning}
Persyaratan data:

- Setidaknya 2 field dimensi, digunakan untuk menentukan baris dan kolom Chart Heatmap

- Setidaknya 1 field numerik, digunakan untuk memetakan kedalaman warna

- Saat beberapa metrik didukung, biasanya satu metrik dipilih untuk pemetaan warna

Fitur yang aktif secara default:

- Legenda, sumbu, label data, tooltip, dan penskalaan numerik aktif secara default.

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Deskripsi}
Chart Heatmap menampilkan distribusi dan hubungan intensitas data melalui kedalaman warna dalam matriks dua dimensi.

:::

**Contoh**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset. Dataset yang sudah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk mendefinisikan sumber dan struktur data chart. Input pengguna tidak memerlukan pra-pemrosesan; VSeed memiliki kemampuan Data Reshape yang kuat untuk menangani format secara otomatis. Data Chart Heatmap pada akhirnya dikonversi menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi. Untuk Chart Heatmap, dimensi pertama biasanya dipetakan ke sumbu X, sedangkan dimensi lain digabung dengan nama metrik (jika ada beberapa) sebagai item legenda.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan:

- xAxis: mendukung pemetaan beberapa dimensi ke sumbu x

- yAxis: mendukung pemetaan beberapa dimensi ke sumbu y

- tooltip: mendukung pemetaan beberapa dimensi ke channel tooltip

- label: mendukung pemetaan beberapa dimensi ke channel label

- row: mendukung pemetaan beberapa dimensi ke channel baris

- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik. Metrik Chart Heatmap otomatis digabung menjadi satu metrik dan dipetakan ke skala warna. Jika ada beberapa metrik, namanya digabung dengan dimensi lain sebagai item legenda.

:::

**Contoh**
[{id: 'value', alias: 'Nilai'}]




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
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi.

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa.

Saat diaktifkan, label data chart dan tooltip otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale.

Aturan format: angka desimal dengan compact notation aktif, minimal 0 digit desimal, maksimal 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser.

Contoh:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik; otomatis diterapkan pada label dan tooltip.

Catatan: Untuk memakai format kustom, autoFormat=false harus diatur secara eksplisit; jika tidak, autoFormat akan menimpa konfigurasi ini.

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
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1000 , significantDigits:1
- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama.

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
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1000 , significantDigits:1
- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama.

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan:

- color: metrik dipetakan ke channel warna

- label: metrik dipetakan ke channel label

- tooltip: metrik dipetakan ke channel tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam konfigurasi metrik datar, membangun struktur metrik seperti tree. parentId menunjuk ke ID grup metrik induk untuk membangun hierarki.

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi tree metrik: Opsi 1 langsung mengonfigurasi tree metrik dengan children; Opsi 2 menyediakan daftar metrik datar dengan parentId. Kedua cara ini tidak dapat digunakan bersamaan.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Konfigurasi paginasi.

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field paginasi; menentukan nama field untuk paginasi, harus berupa dimensi.

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
Nilai paginasi saat ini; menentukan nilai yang digunakan untuk menentukan halaman saat ini.

:::

**Contoh**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundWarna`

:::note{title=Deskripsi}
Warna latar belakang chart.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Warna | undefined`

:::note{title=Deskripsi}
Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, pemetaan warna, dan gradasi warna.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna diskret yang digunakan untuk mendefinisikan warna berbagai elemen dalam chart.

:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna gradien linear yang digunakan untuk mendefinisikan warna berbagai elemen dalam chart.

:::

**Contoh**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Deskripsi}
Pemetaan warna untuk memetakan nilai data ke warna tertentu.

:::

**Contoh**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai positif dalam chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai negatif dalam chart.

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Konfigurasi label Chart Heatmap. Digunakan untuk mendefinisikan label data; otomatis mengaktifkan inversi label untuk memastikan keterbacaan terhadap warna latar.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi label diaktifkan.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label berpindah ke baris berikutnya.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai metrik.

Dalam skenario multi-metrik, tidak perlu khawatir tentang konflik nilai karena semua metrik terkait plot melalui proses `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data.

Catatan: Label encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai metrik.

Dalam skenario multi-metrik, tidak perlu khawatir tentang konflik nilai karena semua metrik terkait plot melalui proses `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data.

Catatan: Label encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nama dimensi.

Displays all dimension labels.

Catatan: Label encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah nilai label diformat otomatis. Saat autoFormat bernilai true, konfigurasi numFormat diabaikan.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format nilai label; digabung dengan `format` dalam `measure`, dengan `format` pada `measure` memiliki prioritas lebih tinggi. Prioritas numFormat lebih rendah daripada autoFormat.

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
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
- 100000 dikonversi menjadi 10W , ratio:10000, symbol:"W"
- 100000 dikonversi menjadi 10K , ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1000 , significantDigits:1
- 1234.5678 dikonversi menjadi 1200 , significantDigits:2
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3
- 1234.5678 dikonversi menjadi 1234 , significantDigits:4
- 1234.5678 dikonversi menjadi 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama.

:::

**Contoh**
- 1234.5678 dikonversi menjadi 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 dikonversi menjadi 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font label.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang label.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke (outline) label.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font label.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Deskripsi}
Posisi label.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Pemfilteran label; relasi kondisi default antar selector adalah OR.

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
ID field dimensi.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator pembanding:

- in: Memilih item data yang nilai field dimensinya ada dalam daftar 'value'.

- not in: Memilih item data yang nilai field dimensinya tidak ada dalam daftar 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator pembanding:

- in: Memilih item data yang nilai field dimensinya ada dalam daftar 'value'.

- not in: Memilih item data yang nilai field dimensinya tidak ada dalam daftar 'value'.

Sama dengan operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai dimensi yang dipilih; mendukung array.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI).

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.

Kemampuan inti:

- Mendukung kondisi filter data kompleks apa pun.

- Menggunakan fungsi utilitas bawaan untuk operasi data.

- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker).

Persyaratan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Konfigurasi untuk filter dinamis chart.

Memfilter mark chart (kolom, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural).

:::

**Contoh**
"Sorot kolom penjualan yang lebih besar dari 1000."

"Sorot kolom dengan margin laba tertinggi di setiap wilayah."



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI.

- Hanya fungsi utilitas bawaan yang dapat digunakan (diakses melalui _ atau R).

- Parameter input: data (array); setiap item menyertakan field __row_index yang merepresentasikan nomor baris.

- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Dilarang: eval, Function, operasi asynchronous, DOM API, request jaringan.

:::

**Contoh**
Sorot field 'sales' untuk item data dengan sales > 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data dengan margin laba tertinggi di setiap wilayah:
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

Sorot item data yang memenuhi beberapa kondisi filter:
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
Rencana fallback saat eksekusi kode gagal atau lingkungan tidak didukung.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi, yaitu id dari salah satu item dalam dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada di dalam value

\- not in: Memilih item data yang nilai field dimensinya tidak berada di dalam value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada di dalam value

\- not in: Memilih item data yang nilai field dimensinya tidak berada di dalam value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih item data berdasarkan nilai field dimensi; array didukung.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime). Ditulis selama fase prepare(); hanya-baca saat runtime.

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `ColorLegend | undefined`

:::note{title=Deskripsi}
Legenda. Konfigurasi legenda warna untuk Chart Heatmap, digunakan untuk mendefinisikan legenda chart termasuk posisi, format, dan gaya.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legenda.

:::

**Contoh**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Whether legend functionality is enabled.

:::

**Contoh**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font legenda.

:::

**Contoh**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font legenda.

:::

**Contoh**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
Konfigurasi tooltip, digunakan untuk mendefinisikan tooltip chart, termasuk posisi, format, dan gaya.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fungsi tooltip diaktifkan.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Konfigurasi brush, digunakan untuk mengaktifkan/menonaktifkan kemampuan seleksi area.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah seleksi area diaktifkan.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
Tipe brush. Mendefinisikan bentuk dan arah kotak seleksi:

- `rect`: Seleksi persegi panjang, memungkinkan seleksi pada arah X dan Y.

- `polygon`: Seleksi poligon, memungkinkan menggambar bentuk bebas dengan mengklik beberapa titik.

- `x`: Seleksi horizontal, membatasi seleksi pada arah sumbu X.

- `y`: Seleksi vertikal, membatasi seleksi pada arah sumbu Y.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}
Mode seleksi, tunggal atau banyak. Mendefinisikan logika seleksi:

- `single`: Mode seleksi tunggal, hanya satu kotak seleksi yang dapat ada pada satu waktu.

- `multiple`: Mode seleksi banyak, beberapa kotak seleksi dapat ada secara bersamaan.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah kotak seleksi dibersihkan setelah seleksi area selesai.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Gaya data di dalam area terpilih.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas titik data terpilih, rentang 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}
Gaya data di luar area terpilih.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas titik data di luar seleksi, rentang 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna stroke.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar stroke.

:::


## theme

**Type:** `Tema | undefined`

:::note{title=Deskripsi}
Tema chart. Tema adalah konfigurasi berprioritas lebih rendah yang berisi pengaturan umum untuk semua tipe chart dan pengaturan khusus dalam satu kategori chart.

Tema terang dan gelap tersedia bawaan; pengguna dapat menentukan tema kustom melalui Builder.

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
Locale. Konfigurasi bahasa chart; mendukung 'zh-CN' dan 'en-US'. Alternatifnya, panggil intl.setLocale('zh-CN') untuk mengatur bahasa.

:::

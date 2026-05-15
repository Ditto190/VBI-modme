# RaceBar

:::note{title=Deskripsi}
Diagram batang dinamis (Race Bar Chart)

Cocok untuk menampilkan peringkat data yang berubah seiring waktu

:::


## chartType

**Type:** `"raceBar"`

:::note{title=Deskripsi}
Diagram batang dinamis, cocok untuk menampilkan peringkat data yang berubah seiring waktu

:::


## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Sumber data

:::


## dimensions

**Type:** `RaceBarDimension[] | undefined`

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- player: mendukung pemetaan beberapa dimensi ke saluran pemutar

\- yAxis: mendukung pemetaan beberapa dimensi ke sumbu Y

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke channel tooltip

\- label: mendukung pemetaan beberapa dimensi ke channel label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `RaceBarMeasure[] | undefined`

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
Alias measure, duplikat diperbolehkan; jika tidak diatur, alias menggunakan ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa.

Setelah diaktifkan, label data dan tooltip chart akan otomatis memilih format yang sesuai berdasarkan nilai measure dan locale.

Aturan format: angka desimal, notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser.

Contoh:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk measure; otomatis diterapkan ke label dan tooltip.

Catatan: Untuk menggunakan format kustom, autoFormat harus secara eksplisit diatur ke false; jika tidak, autoFormat akan menimpa konfigurasi ini.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: decimal, percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka

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
Jumlah digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritasnya lebih rendah dari significantDigits.

:::

**Contoh**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritasnya lebih tinggi dari fractionDigits.

:::

**Contoh**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan ketika significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat.

:::

**Contoh**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk pemformatan angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: decimal, percent (%), permille (‰), notasi ilmiah

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka

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
Jumlah digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritasnya lebih rendah dari significantDigits.

:::

**Contoh**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritasnya lebih tinggi dari fractionDigits.

:::

**Contoh**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan ketika significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat.

:::

**Contoh**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk pemformatan angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- xAxis: Measure mapped to the X-axis

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Membangun grup measure berbentuk pohon dalam bentuk konfigurasi measure datar. parentId menunjuk ke ID grup measure induk, digunakan untuk membangun pohon measure.

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon measure: Opsi 1 langsung mengonfigurasi pohon measure dengan children; Opsi 2 mengonfigurasi daftar measure datar dengan parentId. Kedua metode ini tidak dapat digunakan bersamaan.

:::


## player

**Type:** `Player | undefined`

:::note{title=Deskripsi}
Konfigurasi pemutar, digunakan untuk menentukan dimensi waktu, konfigurasi inti diagram batang dinamis



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


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan, diagram batang dinamis biasanya perlu diurutkan secara dinamis berdasarkan nilai





:::

**Contoh**
Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.

Konfigurasi Filter Dinamis chart.





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
**Type:** `"in" | "not in" | undefined`

:::

**Contoh**
Deskripsi kebutuhan filter pengguna (bahasa natural).



### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
\- `__row_index` mewakili nomor baris item data asli, dan `field` mewakili field yang akan disorot.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}


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
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang

:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Konfigurasi warna

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
Konfigurasi label

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

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan nilai measure sebagai persentase.

Dalam skenario multi-metrik, tidak perlu khawatir tentang konflik nilai karena semua metrik terkait plot melalui proses `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan label dimensi.

Menampilkan semua label dimensi.

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah nilai label diformat otomatis; ketika autoFormat bernilai true, konfigurasi numFormat diabaikan.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format nilai label; digabung dengan `format` pada `measure`, dan `format` milik `measure` memiliki prioritas lebih tinggi. Prioritas numFormat lebih rendah dari autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Deskripsi}
Tipe format angka, mendukung: decimal, percent (%), permille (‰), notasi ilmiah.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0.

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

:::

**Contoh**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemisah ribuan untuk pemformatan angka.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Sufiks format angka.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
Prefiks format angka.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah digit desimal untuk pemformatan angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritasnya lebih rendah dari significantDigits.

:::

**Contoh**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
Digit signifikan untuk pemformatan angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritasnya lebih tinggi dari fractionDigits.

:::

**Contoh**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}
Prioritas pembulatan ketika significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingPriority Intl.NumberFormat.

:::

**Contoh**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan untuk pemformatan angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan yang sama dengan roundingMode Intl.NumberFormat.

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
Seleksi label; kondisi antar selector default-nya OR.

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

\- in: Memilih item data ketika nilai field dimensi ada dalam daftar nilai.

\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data ketika nilai field dimensi ada dalam daftar nilai.

\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

Sama dengan operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter Dinamis (eksekusi kode yang dihasilkan AI)



Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.



Kemampuan inti:

\- Mendukung kondisi pemfilteran data yang kompleks secara arbitrer.

\- Menggunakan fungsi utilitas bawaan untuk manipulasi data.

\- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker).



Persyaratan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback.



Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.



Konfigurasi Filter Dinamis chart.



Memfilter marker chart (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural).

:::

**Contoh**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI.



\- Gunakan hanya fungsi utilitas bawaan (akses melalui _ atau R).

\- Parameter input: data (array), setiap item berisi field `__row_index` yang mewakili nomor baris.

\- Harus mengembalikan array kombinasi indeks baris dan field: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` mewakili nomor baris item data asli, dan `field` mewakili field yang akan disorot.

\- Dilarang: eval, Function, operasi asinkron, DOM API, permintaan jaringan.

:::

**Contoh**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
Strategi fallback ketika eksekusi kode gagal atau lingkungan tidak didukung.

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

\- in: Memilih item data ketika nilai field dimensi ada dalam daftar nilai.

\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data ketika nilai field dimensi ada dalam daftar nilai.

\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

Sama dengan operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai field dimensi yang dipilih; mendukung array.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime).



Ditulis selama fase prepare(); hanya-baca saat runtime.

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
Ketebalan font legenda



### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna ikon paginasi.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna ikon paginasi saat nonaktif/abu-abu.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font legenda.

:::

**Contoh**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font legenda.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Ketebalan font legenda.

:::

**Contoh**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
Tipe bentuk legenda.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Deskripsi}
Posisi legenda

:::

**Contoh**




### maxSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jumlah maksimum kolom atau baris ketika item legenda banyak.

Jika position bersifat horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan.

Jika position bersifat vertikal (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah baris yang ditampilkan.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
Mode brush; mendefinisikan apakah satu atau beberapa area dapat dipilih.




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



\- `y`: Brush sumbu Y; hanya memilih pada arah sumbu Y, tanpa batas pada sumbu X.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Deskripsi}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Deskripsi}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



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
Gaya untuk data yang TIDAK dipilih oleh brush.



Mendefinisikan gaya titik data di luar seleksi.

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
**Type:** `boolean | undefined`

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu X, sebagai sumbu numerik untuk menampilkan nilai metrik

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Garis sumbu color

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
Apakah sumbu terlihat.

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
Rasio format angka, tidak boleh 0

:::

**Contoh**
Rentang sudut untuk rotasi otomatis saat diaktifkan (hanya berlaku untuk sumbu kategori).




#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**

Panjang maksimum untuk pembatasan label. Saat panjang teks melebihi nilai ini, teks dipotong dengan elipsis dan terlihat saat hover (hanya berlaku untuk sumbu kategori).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Contoh**
Ketebalan font label


\- 1234.5678 dikonversi menjadi 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

**Contoh**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**

Garis sumbu width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

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


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `boolean | undefined`

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


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


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
\- 1234.5678 dikonversi menjadi 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

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
**Type:** `string | undefined`

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Label tick sumbu X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Deskripsi}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `boolean | undefined`

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
**Type:** `string | undefined`

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Deskripsi}
**Type:** `number | undefined`

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

**Type:** `YBandAxis | undefined`

:::note{title=Deskripsi}
Konfigurasi sumbu Y, sebagai sumbu kategori untuk menampilkan nilai dimensi, batang tersusun vertikal

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

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
**Type:** `CrosshairRect | undefined`

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


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}
Tinggi maksimum persegi panjang; dapat berupa nilai piksel atau string persentase.

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
**Type:** `"asc" | "desc" | undefined`

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
**Type:** `string | undefined`

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
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Deskripsi}
Konfigurasi tooltip horizontal



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Type:** `string`

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
**Type:** `"in" | "not in" | undefined`

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Deskripsi}
Sudut membulat tumpukan

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Tinggi maksimum persegi panjang

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan legenda



Konfigurasi filter dinamis chart: memfilter mark chart (batang, titik, dll.) melalui kode JavaScript yang dihasilkan AI.

:::

**Contoh**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Deskripsi}
])

:::

**Contoh**




### orderBy

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Operator



\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya diagram batang

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
- not in: Memilih item data ketika nilai field dimensi tidak berada dalam array `value`.



**Type:** `string | undefined`



:::

**Contoh**
Warna stroke primitive bar (persegi panjang)

**Type:** `number | undefined`

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`


Hasil eksekusi filter dinamis (field runtime)



**Type:** `string | undefined`
field: 'category',
operator: 'in',
value: 'tool'
}
**Type:** `string | undefined`
field: 'category',
operator: 'not in',
value: 'book'
}


**Type:** `string | undefined`
field: 'profit',
operator: '>=',
value: 100
}
**Type:** `string | undefined`
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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}


**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

**Type:** `Selector | Selectors | undefined`



:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Selector untuk titik anotasi, digunakan untuk memilih titik data.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
- center: Teks dipusatkan pada titik.









Operator

\- in: Memilih item data ketika nilai field dimensi ada dalam daftar nilai.

\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.





**Type:** `"in" | "not in" | undefined`













:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}












**Type:** `"row-with-field"`

:::

**Contoh**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Nilai X tetap untuk garis anotasi vertikal. Jika sumbu kategori berada di arah X, nilai dimensi dapat dimasukkan; jika sumbu numerik berada di arah X, nilai numerik tertentu dapat digunakan.





**Type:** `ValueDynamicFilter | undefined`

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Hanya didukung di lingkungan browser (memerlukan Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



\- in: Memilih item data ketika nilai field dimensi ada dalam value

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Ditulis selama fase prepare(); hanya-baca saat runtime.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
'Teks Anotasi'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Warna teks.

:::

**Contoh**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
**Contoh**





:::

**Contoh**
Teks anotasi.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


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
**Type:** `number | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
bottom: Teks berada di atas titik anotasi, dengan tepi bawah sejajar dengan titik.

Disarankan mengatur 'top' agar teks ditampilkan sepenuhnya dalam area chart yang terlihat.

**Contoh**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Warna latar belakang.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
**Contoh**









Lebar border latar belakang.

Visibilitas garis.

**Contoh**









Radius sudut border latar belakang.



**Contoh**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
"Sorot batang dengan penjualan lebih dari 1000"

"Sorot batang dengan margin laba tertinggi di setiap wilayah"



#### code

**Type:** `string`

:::note{title=Deskripsi}








Offset horizontal titik anotasi dalam piksel. Ketika titik berada di kiri (awal sumbu kategori), disarankan nilai positif; ketika berada di kanan (akhir sumbu kategori), disarankan nilai negatif.

Nilai negatif menggeser seluruh komponen ke kiri (misalnya -10).

Nilai positif menggeser seluruh komponen ke kanan (misalnya 10).

:::

**Contoh**
offsetX: 5 (seluruh komponen bergeser ke kanan 5 piksel)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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
"Ambil nilai penjualan tertinggi sebagai referensi garis anotasi"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}


Kode filter JavaScript yang dihasilkan AI.

\- Gunakan hanya fungsi utilitas bawaan (akses melalui _ atau R).

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}




Ambil nilai penjualan maksimum sebagai nilai garis anotasi:

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural).



);

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
Ditulis selama fase prepare(); hanya-baca saat runtime.

:::

**Contoh**
'Teks penanda'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}




Ukuran font teks.

**Type:** `string | string[] | undefined`

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
**Contoh**

:::

**Contoh**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
top: Teks berada di bawah garis referensi, dengan tepi atas sejajar dengan ujung garis anotasi (vertikal).

:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




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

**Type:** `number | undefined`

**Contoh**

:::

**Contoh**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Deskripsi}
Garis penanda numerik

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}




Radius sudut border latar belakang.

Visibilitas garis.





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
**Type:** `string | number | (string | number)[] | undefined`











Filter Dinamis (eksekusi kode yang dihasilkan AI)

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

**Type:** `string | undefined`
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

**Contoh**
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
\- Parameter input: data (array).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Deskripsi}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}


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
'Teks anotasi'

:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Deskripsi}




Warna teks.

**Type:** `number | undefined`

**Contoh**

:::

**Contoh**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Deskripsi}
**Contoh**









:::

**Contoh**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
top: Teks berada di bawah garis referensi, dengan tepi atas sejajar dengan garis anotasi (horizontal).

:::

**Contoh**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Deskripsi}
Garis penanda nilai dimensi

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Deskripsi}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Deskripsi}
**Contoh**











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





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

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
\- not in: Memilih item data ketika nilai field dimensi TIDAK ada dalam daftar nilai.



Warna teks

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Deskripsi}
**Contoh**

:::

**Contoh**
'Teks penanda'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Deskripsi}
**Contoh**





:::

**Contoh**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
**Type:** `number | undefined`



### textFontWeight

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
**Type:** `"left" | "right" | "center" | undefined`



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

bottom: Teks berada di bagian atas area anotasi, dengan tepi bawah sejajar dengan area.

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
**Type:** `string | undefined`



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}






:::

**Contoh**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}






:::

**Contoh**
0.5



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




Apakah menampilkan tooltip untuk semua subchart yang sesuai dengan dimensi.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.

**Type:** `number | undefined`





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
**Type:** `string | undefined`

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




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Deskripsi}


:::

**Contoh**
**Type:** `boolean | undefined`



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

**Type:** `Locale | undefined`

:::note{title=Deskripsi}
Konfigurasi bahasa

:::


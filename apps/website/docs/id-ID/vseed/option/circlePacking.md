# CirclePacking

:::info{title=Pemetaan encoding}
Circle packing mendukung kanal visual berikut:

`color`: kanal warna, mendukung `beberapa dimensi` atau `satu metrik`

`label`: kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`

`tooltip`: kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`

:::

:::note{title=Deskripsi}
Circle packing digunakan untuk menampilkan data hierarkis, dengan ukuran lingkaran mewakili besaran nilai.

Skenario yang sesuai:

\- Menampilkan distribusi proporsi data hierarkis

\- Menekankan hubungan cakupan dalam data

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal 1 field numerik untuk memetakan ukuran lingkaran

\- Minimal 1 field dimensi untuk pembagian hierarki

:::


## chartType

**Type:** `"circlePacking"`

:::note{title=Deskripsi}
Circle packing



Circle packing yang menunjukkan hubungan proporsi data hierarkis

:::

**Contoh**
'circlePacking'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset



Dataset yang sudah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data diagram.
:::

**Contoh**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi



Konfigurasi dimensi untuk menentukan struktur hierarkis data.

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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- hierarchy: mendukung pemetaan beberapa dimensi ke kanal hierarki

\- label: mendukung pemetaan beberapa dimensi ke kanal label

\- tooltip: mendukung pemetaan beberapa dimensi ke kanal tooltip

:::

:::tip{title=Tip}
Dimensi pertama akan langsung dipetakan ke kanal color

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=Deskripsi}
Metrik



Konfigurasi metrik untuk mendefinisikan ukuran lingkaran

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
Tipe format angka, mendukung: angka (desimal), persen (%), permille (‰), notasi ilmiah

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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- size: metrik dipetakan ke kanal ukuran, digunakan untuk menampilkan area atau ukuran pada diagram seperti Treemap dan Sunburst.

\- label: metrik dipetakan ke kanal label

\- tooltip: metrik dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam bentuk konfigurasi metrik datar, membangun grup metrik berbentuk tree. parentId menunjuk ke id grup metrik induk untuk membangun tree metrik

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi tree metrik: Opsi 1 langsung mengonfigurasi tree metrik dengan children; Opsi 2 mengonfigurasi daftar metrik datar dengan parentId. Kedua metode ini tidak dapat digunakan bersamaan

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Konfigurasi Paginasi



Digunakan untuk menentukan nama field paginasi; harus berupa dimensi

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field paginasi; menentukan nama field untuk paginasi, harus berupa dimensi

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



Konfigurasi warna untuk menentukan skema warna chart, termasuk daftar warna, pemetaan warna, dan gradasi warna.

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
Skema warna gradasi linear untuk menentukan warna berbagai elemen dalam chart

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



Konfigurasi label untuk menentukan label data chart, termasuk posisi, format, dan style.

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

Dalam skenario multi-metrik, tidak perlu khawatir konflik nilai karena semua metrik terkait plot diproses melalui `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data

Catatan: label pada encoding memiliki prioritas lebih tinggi; konfigurasi ini tidak memengaruhi label pada encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label menampilkan persentase nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir konflik nilai karena semua metrik terkait plot diproses melalui `foldMeasures` dan digabung menjadi satu metrik yang merepresentasikan satu titik data

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
Konfigurasi format nilai label; digabung dengan `format` dalam `measure`, dengan prioritas `format` pada `measure` lebih tinggi. Prioritas numFormat lebih rendah daripada autoFormat

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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority yang sama

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingMode yang sama

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
LabelfontWarna

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
Apakah fungsi anti-overlap label diaktifkan

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Pemfilteran label; relasi default antar selector adalah OR

:::


#### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dimensi tertentu

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan

\- not in: Memilih item data yang nilai field dimensinya tidak berada dalam nilai yang ditentukan

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan

\- not in: Memilih item data yang nilai field dimensinya tidak berada dalam nilai yang ditentukan

sama dengan operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi; mendukung array

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI

Kemampuan inti:

\- Mendukung kondisi filter data yang kompleks secara bebas

\- Menggunakan fungsi utilitas bawaan untuk manipulasi data

\- Eksekusi aman di lingkungan browser (sandbox Web Worker)

Persyaratan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi

Konfigurasi filter dinamis chart

Mengimplementasikan filter mark chart (bar, titik, dll.) melalui kode JavaScript yang dihasilkan AI

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural)

:::

**Contoh**
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI

\- Hanya fungsi utilitas bawaan yang dapat digunakan (diakses melalui _ atau R)

\- Parameter input: data (array), setiap item berisi field __row_index yang merepresentasikan nomor baris

\- Harus mengembalikan array kombinasi indeks baris dan field: Array<{ __row_index: number, field: string }>

\- __row_index merepresentasikan nomor baris item data asli; field merepresentasikan field yang akan disorot

\- Dilarang: eval, Function, operasi asynchronous, DOM API, request jaringan

:::

**Contoh**
Sorot field sales untuk item data dengan sales lebih besar dari 1000
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
Rencana fallback saat eksekusi kode gagal atau lingkungan tidak didukung

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dimensi tertentu

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan

\- not in: Memilih item data yang nilai field dimensinya tidak berada dalam nilai yang ditentukan

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator

\- in: Memilih item data yang nilai field dimensinya berada dalam nilai yang ditentukan

\- not in: Memilih item data yang nilai field dimensinya tidak berada dalam nilai yang ditentukan

sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi; mendukung array

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)

Ditulis pada fase prepare(); hanya baca saat runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
Tooltip



Konfigurasi tooltip untuk menentukan tooltip chart, termasuk posisi, format, style, dan lainnya.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema chart; tema memiliki prioritas lebih rendah dan mencakup konfigurasi umum untuk semua tipe chart serta konfigurasi khusus untuk kategori chart tertentu

Tema terang dan gelap bawaan; pengguna dapat menentukan tema kustom melalui Builder

Tema

Tema terang dan gelap bawaan; tema baru dapat dikustomisasi melalui registerTheme.

:::

**Contoh**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Bahasa

Konfigurasi bahasa chart; mendukung 'zh-CN' dan 'en-US'. Selain itu, metode intl.setLocale('zh-CN') dapat dipanggil untuk menentukan bahasa.

:::

# Area

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` measure dan `2` dimensi

\- Mendukung Data Reshape: minimal `1` measure, `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Diagram area mendukung channel visual berikut:

`xAxis`  : channel sumbu X, mendukung `beberapa dimensi`, dipetakan ke sumbu X berdasarkan nilai dimensi

`yAxis`  : channel sumbu Y, mendukung `beberapa measure`, dipetakan ke sumbu Y berdasarkan nilai measure

`color`  : channel warna, mendukung `beberapa dimensi` atau `satu measure`; warna dimensi digunakan untuk membedakan seri data, warna measure digunakan untuk memetakan nilai measure secara linear ke warna grafis

`tooltip`: channel tooltip, mendukung `beberapa dimensi` dan `beberapa measure`, ditampilkan saat hover pada titik data

`label`  : channel label, mendukung `beberapa dimensi` dan `beberapa measure`, menampilkan label data pada titik data

:::

:::note{title=Deskripsi}
Diagram area cocok untuk menampilkan tren data dan hubungan kumulatif dari waktu ke waktu. Area terisi memperkuat perbandingan data. Sumbu X adalah sumbu kategori, sedangkan sumbu Y adalah sumbu numerik.

Skenario penggunaan:

\- Menampilkan perubahan tren satu seri data

\- Menekankan efek kumulatif total dari waktu ke waktu

\- Membandingkan perbedaan total beberapa seri data

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal satu field measure

\- Field dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama measure saat ada beberapa measure dan ditampilkan sebagai item legenda.

\- Semua measure otomatis digabung menjadi satu measure

Fitur yang aktif secara default:

\- Stacking aktif secara default

\- Legenda, sumbu, isian area, label data, dan tooltip aktif secara default

:::


## chartType

**Type:** `"area"`

:::note{title=Deskripsi}
Diagram area



Diagram area, jenis chart untuk menampilkan tren data dan hubungan kumulatif

:::

**Contoh**
```js {2}
{
  chartType: 'area',
  dataset: [{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}],
}
```




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Kumpulan data

Kumpulan data yang telah teragregasi dan sesuai dengan spesifikasi TidyData, digunakan untuk menentukan sumber dan struktur data chart. Data masukan pengguna tidak perlu diproses apa pun; VSeed memiliki kemampuan reshape data yang kuat dan akan melakukan reshape data secara otomatis. Data area chart pada akhirnya akan dikonversi menjadi 2 dimensi dan 1 metrik.
:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi



Dimensi pertama dipetakan ke sumbu X; dimensi lainnya digabung dengan nama measure saat ada beberapa measure dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{ id: 'month', alias: 'Month' }, { id: 'year', alias: 'Year' }]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Deskripsi}
Channel tempat dimensi dipetakan

\- xAxis: mendukung pemetaan beberapa dimensi ke sumbu x

\- color: mendukung pemetaan beberapa dimensi ke channel warna

\- detail: mendukung pemetaan beberapa dimensi ke channel detail

\- tooltip: mendukung pemetaan beberapa dimensi ke channel tooltip

\- label: mendukung pemetaan beberapa dimensi ke channel label

\- row: mendukung pemetaan beberapa dimensi ke channel baris

\- column: mendukung pemetaan beberapa dimensi ke channel kolom

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Deskripsi}
Measure



Measure pada diagram area otomatis digabung menjadi satu measure dan dipetakan ke sumbu Y. Nama measure digabung dengan dimensi lain dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID measure, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias measure, boleh duplikat; jika tidak diatur, alias menggunakan id

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Deskripsi}
Channel tempat measure dipetakan

\- yAxis: metrik dipetakan ke sumbu y

\- detail: measure yang dipetakan ke channel detail

\- color: measure dipetakan ke channel warna

\- label: measure dipetakan ke channel label

\- tooltip: measure dipetakan ke channel tooltip

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
Ukuran font legenda.
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
Tooltip

Konfigurasi tooltip untuk mendefinisikan tooltip chart, termasuk posisi, format, gaya, dll.
:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah tooltip diaktifkan
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Konfigurasi brush chart









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
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.



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

**Type:** `LineAreaAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi



Konfigurasi animasi chart; efek yang tersedia bergantung pada jenis chart

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi chart garis/area diaktifkan

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title=Deskripsi}
Parameter animasi untuk chart garis/area

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title=Deskripsi}
Animasi kemunculan untuk chart garis/area

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title=Deskripsi}
Efek kemunculan untuk chart garis/area; mendukung animasi pemuatan dan pertumbuhan

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

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title=Deskripsi}
Animasi pembaruan untuk chart garis/area

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

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title=Deskripsi}
Animasi loop untuk chart garis/area

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

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title=Deskripsi}
Animasi loop untuk chart garis/area

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title=Deskripsi}
Efek loop untuk chart garis/area

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

**Type:** `XBandAxis | undefined`

:::note{title=Deskripsi}
Sumbu X



Sumbu kategori. Konfigurasi sumbu X untuk menentukan posisi, format, gaya, dan pengaturan terkait.

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
Label sumbu otomatis disembunyikan: jika dua label bertumpang tindih, label yang menyebabkan tumpang tindih akan disembunyikan otomatis. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Deskripsi}
Jarak untuk penyembunyian otomatis label sumbu: jika jarak antara dua label teks lebih kecil dari autoHideGap, label yang bertumpang tindih akan disembunyikan otomatis. Hanya berlaku untuk sumbu kategori.

Saat autoHide aktif, gunakan autoHide dan konfigurasikan melalui autoHideSeparation.

Saat autoHide nonaktif, gunakan sampling dan konfigurasikan melalui minGap.
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Label sumbu otomatis diputar: saat lebar label melebihi panjang sumbu, label diputar otomatis. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Deskripsi}
Rentang sudut rotasi otomatis label sumbu. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Panjang label sumbu dibatasi otomatis: saat lebar label melebihi panjang sumbu, bagian berlebih ditampilkan dengan elipsis dan label penuh terlihat saat hover. Hanya berlaku untuk sumbu kategori.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Deskripsi}
Panjang maksimum untuk pembatasan otomatis label sumbu: saat teks label melebihi panjang ini, bagian berlebih ditampilkan dengan elipsis dan label penuh terlihat saat hover. Hanya berlaku untuk sumbu kategori.
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
Konfigurasi pengurutan legenda; mendukung pengurutan berdasarkan dimensi atau measure, serta urutan kustom; array sort mengikuti urutan kiri ke kanan atau atas ke bawah.

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
Apakah garis crosshair ditampilkan

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna garis crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna label garis crosshair

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah label garis crosshair ditampilkan

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar label garis crosshair

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Deskripsi}
Konfigurasi pengurutan sumbu X, mendukung pengurutan berdasarkan dimensi atau metrik serta urutan kustom

Konfigurasi pengurutan sumbu kategori, mendukung pengurutan berdasarkan dimensi atau metrik serta urutan kustom
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
Tema diagram. Tema adalah konfigurasi fungsional dengan prioritas lebih rendah, mencakup pengaturan umum untuk semua jenis diagram dan pengaturan diagram yang dibagi dalam satu kategori diagram.

Tersedia dua tema bawaan: light dan dark. Pengguna dapat menyesuaikan tema melalui Builder.

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

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit dinyatakan dengan selector statis.

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




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya mark garis, digunakan untuk menentukan warna mark garis, opasitas, kurva, dan pengaturan terkait.

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

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit dinyatakan dengan selector statis.

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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah segmen garis terlihat

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah segmen garis dihaluskan

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna segmen garis

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna segmen garis

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar segmen garis

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Deskripsi}
Gaya segmen garis

:::

**Contoh**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi gaya mark area, digunakan untuk menentukan warna mark area, opasitas, border, dan pengaturan terkait.

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

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit dinyatakan dengan selector statis.

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mark area terlihat



Apakah mark area terlihat

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna mark area

Warna mark area
:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas warna mark area

Opasitas warna mark area
:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Deskripsi}
Konfigurasi titik anotasi. Menentukan titik anotasi chart berdasarkan data yang dipilih, termasuk posisi, format, gaya, dan pengaturan terkait.

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
Menentukan measure id yang dimiliki titik anotasi. Dalam skenario multi-measure, dapat digabung dengan selector untuk menemukan titik anotasi measure target secara unik.
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
"Ambil nilai penjualan tertinggi sebagai referensi garis penanda"

"Hitung rata-rata penjualan untuk garis penanda"



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
"Ambil nilai penjualan tertinggi sebagai referensi garis penanda"

"Hitung rata-rata penjualan untuk garis penanda"



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
Garis anotasi perbedaan

Menggambar garis anotasi perbedaan berdasarkan dua titik data yang dipilih dan menghitung teks perbedaan secara otomatis.
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
Ukuran font teks.

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

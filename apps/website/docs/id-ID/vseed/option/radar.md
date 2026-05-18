# Radar

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `1` metrik, `1` dimensi

\- Mendukung restrukturisasi data: minimal `1` metrik, `0` dimensi

:::

:::info{title=Pemetaan Encoding}
Diagram radar mendukung kanal visual berikut:

`angle`  : Kanal sudut, mendukung `beberapa dimensi`, dipetakan ke sumbu sudut berdasarkan nilai dimensi

`radius` : Kanal radius, mendukung `beberapa metrik`, dipetakan ke sumbu radius berdasarkan nilai metrik

`color`  : Kanal warna, mendukung `beberapa dimensi` atau `satu metrik`; warna dimensi membedakan seri data, sedangkan warna metrik memetakan nilai metrik ke warna grafis secara linear

`tooltip`: Kanal tooltip, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan saat hover pada titik data

`label`  : Kanal label, mendukung `beberapa dimensi` dan `beberapa metrik`, ditampilkan sebagai label data pada titik data

:::

:::note{title=Deskripsi}
Diagram radar, cocok untuk analisis perbandingan data multidimensi, menampilkan distribusi nilai di berbagai dimensi melalui sistem koordinat multi-sumbu

Skenario penggunaan:

\- Membandingkan performa keseluruhan data multidimensi

\- Evaluasi performa beberapa objek pada beberapa metrik

\- Menampilkan karakteristik multidimensi dari data kategori

:::

:::warning{title=Warning}
Persyaratan data:

\- Minimal satu field numerik (metrik)

\- Dimensi pertama menjadi setiap sumbu diagram radar, sedangkan dimensi lain dibandingkan sebagai seri yang berbeda

\- Mendukung beberapa metrik untuk ditampilkan masing-masing sebagai seri berbeda

Fitur yang aktif secara default:

\- Legenda, sistem koordinat radar, label data, tooltip, dan penskalaan nilai aktif secara default

:::


## chartType

**Type:** `"radar"`

:::note{title=Deskripsi}
Diagram radar



Diagram radar yang menampilkan hubungan perbandingan multidimensi melalui sistem koordinat multi-sumbu

:::

**Contoh**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Set data

Set data yang sudah diagregasi dan sesuai spesifikasi TidyData, digunakan untuk mendefinisikan sumber data dan struktur diagram. Data yang dimasukkan pengguna tidak perlu diproses lagi; VSeed memiliki kemampuan restrukturisasi data yang kuat dan akan merestrukturisasi data secara otomatis. Data diagram radar pada akhirnya dikonversi menjadi 2 dimensi dan 1 metrik.
:::

**Contoh**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi

Dimensi pertama diagram radar dipetakan ke sumbu sudut; dimensi lainnya digabung dengan nama metrik saat ada beberapa metrik dan ditampilkan sebagai item legenda.

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



Metrik diagram radar otomatis digabung menjadi satu metrik dan dipetakan ke sumbu radius. Saat ada beberapa metrik, nama metrik digabung dengan dimensi lain dan ditampilkan sebagai item legenda.

:::

**Contoh**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID metrik, harus unik

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias metrik, duplikat diperbolehkan; jika tidak diatur, alias menggunakan ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default, prioritas tertinggi

Saat autoFormat=true, semua konfigurasi numFormat akan ditimpa.

Setelah diaktifkan, label data dan tooltip diagram akan otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale.

Aturan format: angka desimal, notasi ringkas aktif, minimum 0 digit desimal, maksimum 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser.

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik; otomatis diterapkan ke label dan tooltip.

Catatan: Untuk menggunakan format kustom, autoFormat harus secara eksplisit diatur ke false; jika tidak, autoFormat akan menimpa konfigurasi ini.

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

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰
:::

**Contoh**

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritasnya lebih rendah dari significantDigits
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
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritasnya lebih tinggi dari fractionDigits
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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits diatur bersamaan. Menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

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

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰
:::

**Contoh**

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritasnya lebih rendah dari significantDigits
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
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritasnya lebih tinggi dari fractionDigits
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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits diatur bersamaan. Menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- radius: radius yang dipetakan dari metrik

\- color: metrik yang dipetakan ke kanal warna

\- label: metrik yang dipetakan ke kanal label

\- tooltip: metrik yang dipetakan ke kanal tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Membangun grup metrik berbentuk pohon dalam bentuk konfigurasi metrik datar. parentId menunjuk ke ID grup metrik induk, digunakan untuk membangun pohon metrik.

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi pohon metrik: Opsi 1 langsung mengonfigurasi pohon metrik dengan children; Opsi 2 mengonfigurasi daftar metrik datar dengan parentId. Kedua metode ini tidak dapat digunakan bersamaan.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Paging configuration, used to specify the paging field name; it must be a dimension

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
Warna latar belakang diagram

Warna latar belakang dapat berupa string warna seperti 'red' atau 'blue', atau nilai hex, rgb, maupun rgba seperti '#ff0000' atau 'rgba(255,0,0,0.5)'.
:::


## color

**Type:** `Color | undefined`

:::note{title=Deskripsi}
Warna



Konfigurasi warna untuk mendefinisikan skema warna diagram, termasuk daftar warna, pemetaan warna, dan gradien.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna diskret yang digunakan untuk mendefinisikan warna berbagai elemen dalam diagram.

:::

**Contoh**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Skema warna gradien linear yang digunakan untuk mendefinisikan warna berbagai elemen dalam diagram.

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
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai positif dalam diagram.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Konfigurasi warna positif/negatif; mendefinisikan warna untuk nilai negatif dalam diagram.

:::


## label

**Type:** `Label | undefined`

:::note{title=Deskripsi}
Label



Konfigurasi label untuk mendefinisikan posisi, format, gaya, dan pengaturan terkait label data.

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
Apakah label menampilkan nilai metrik sebagai persentase.

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
Jenis format angka, mendukung angka (desimal), persen (%), permil (‰), dan notasi ilmiah
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Deskripsi}
Rasio format angka, tidak boleh 0

:::

**Contoh**

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰
:::

**Contoh**

- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



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
Jumlah digit desimal untuk format angka, menggunakan minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser. Prioritasnya lebih rendah dari significantDigits
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
Digit signifikan untuk format angka, menggunakan minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser. Prioritasnya lebih tinggi dari fractionDigits
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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits diatur bersamaan. Menggunakan Intl.NumberFormat browser dan mengikuti aturan roundingPriority Intl.NumberFormat
:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, diformat menggunakan Intl.NumberFormat browser, dengan aturan yang sama seperti roundingMode pada Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font label
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Deskripsi}
Tinggi maksimum persegi panjang; dapat berupa nilai piksel atau string persentase.

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
Field dimensi, yaitu id salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




sama seperti operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data; mendukung array
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


## legend

**Type:** `Legend | undefined`

:::note{title=Deskripsi}
Legenda



Konfigurasi legenda untuk mendefinisikan posisi, format, gaya, dan pengaturan terkait legenda.

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
labelFontSize: 10



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Deskripsi}
Tipe bentuk legenda.

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
Jumlah maksimum kolom atau baris ketika item legenda banyak.

Jika position bersifat horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan.

Jika position bersifat vertikal (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah baris yang ditampilkan.

:::

:::warning{title=Warning}
Hanya berlaku untuk legenda diskret.

:::

**Contoh**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Deskripsi}
Tooltip



Konfigurasi tooltip untuk mendefinisikan posisi, format, gaya, dan pengaturan terkait tooltip.

:::


### enable

**Type:** `false | true`

:::note{title=Deskripsi}
Apakah fitur tooltip diaktifkan
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Deskripsi}
Brush selection



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Brush sumbu Y; hanya memilih pada arah sumbu Y, tanpa batas pada sumbu X.

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
Mode seleksi area, tunggal atau multi



Mendefinisikan mode brush

\- `single`: Mode pilihan tunggal, hanya boleh ada satu kotak brush dalam satu waktu

\- `multiple`: Mode pilihan multi, beberapa kotak brush dapat ada secara bersamaan
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



Opasitas titik data yang tidak dipilih oleh brush, dengan rentang nilai 0-1



Mendefinisikan gaya titik data di luar seleksi.

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
Gaya data yang tidak masuk dalam brush



Mendefinisikan gaya titik data yang tidak dipilih oleh brush





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Opasitas



Opasitas titik data yang tidak dipilih oleh brush, dengan rentang nilai 0-1





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

**Type:** `RadarAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi



Konfigurasi animasi diagram; efek yang tersedia dibatasi oleh jenis diagram

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi diagram radar diaktifkan

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Deskripsi}
Parameter animasi diagram radar

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi masuk diagram radar

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Deskripsi}
Efek masuk diagram radar, mendukung animasi radial dan skala

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
Warna sorotan atau atmosfer animasi

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi pembaruan diagram radar

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Deskripsi}
Efek pembaruan diagram radar, mendukung animasi pertumbuhan

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
Warna sorotan atau atmosfer animasi

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi berulang diagram radar

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah animasi berulang diaktifkan

:::

##### interval

**Type:** `number | undefined`

:::note{title=Deskripsi}
Interval animasi berulang, dalam milidetik

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Deskripsi}
Konfigurasi animasi atmosfer diagram radar

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
Efek animasi atmosfer, mendukung efek ripple, visibilitas, dan breathing

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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Deskripsi}
Konfigurasi style point mark, digunakan untuk menentukan warna, border, dan pengaturan terkait point mark.

Mendukung konfigurasi style global atau style bersyarat

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
Field dimensi, yaitu id salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




sama seperti operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data; mendukung array
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Menerapkan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI

Cocok untuk skenario yang sulit dinyatakan dengan selector statis, seperti Top N, analisis statistik, dan kondisi kompleks

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
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Mendukung konfigurasi style global atau style bersyarat

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
Field dimensi, yaitu id salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




sama seperti operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data; mendukung array
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Menerapkan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI

Cocok untuk skenario yang sulit dinyatakan dengan selector statis, seperti Top N, analisis statistik, dan kondisi kompleks

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
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Mendukung konfigurasi style global atau style bersyarat

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
Field dimensi, yaitu id salah satu item dalam dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Apakah menampilkan label yang sesuai dengan crosshair.




sama seperti operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi dalam item data; mendukung array
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (eksekusi kode yang dihasilkan AI)

Menerapkan logika pemfilteran data kompleks melalui kode JavaScript yang dihasilkan AI

Cocok untuk skenario yang sulit dinyatakan dengan selector statis, seperti Top N, analisis statistik, dan kondisi kompleks

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah elemen area terlihat



Apakah elemen area terlihat

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Deskripsi}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Deskripsi}
Bahasa



Diagram language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::

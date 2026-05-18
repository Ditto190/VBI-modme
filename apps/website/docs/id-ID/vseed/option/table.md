# Table

:::info{title=Rekomendasi}
\- Konfigurasi field yang direkomendasikan: `berapa pun` metrik, `berapa pun` dimensi

\- Mendukung restrukturisasi data: minimal `berapa pun` metrik, `berapa pun` dimensi

:::

:::info{title=Pemetaan Encoding}
Hanya mendukung konfigurasi tree dimensi dan tree metrik; default-nya encoding ke kolom.

:::

:::note{title=Deskripsi}
Tabel cocok untuk skenario tampilan data detail, dengan baris dan kolom yang jelas agar nilai spesifik mudah dilihat.

Skenario yang sesuai:

\- Menampilkan detail record data

\- Membandingkan item data secara presisi

\- Menampilkan atribut dari banyak dimensi

:::

:::warning{title=Peringatan}
Persyaratan data:

\- Minimal 1 field dimensi

\- Minimal 1 field metrik

\- Field dimensi akan digunakan sebagai header kolom tabel

Fitur yang aktif secara default:

\- Pengurutan, pemfilteran, dan pagination aktif secara default

:::


## chartType

**Type:** `"table"`

:::note{title=Deskripsi}
Komponen tabel standar untuk menampilkan data detail

:::

**Contoh**
'table'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset yang sesuai dengan spesifikasi TidyData dan sudah diagregasi, digunakan untuk menentukan sumber data dan struktur diagram. Dataset yang diberikan pengguna tidak perlu diproses terlebih dahulu; setiap field berkorespondensi dengan satu kolom, dan setiap record berkorespondensi dengan satu baris.

:::

**Contoh**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=Deskripsi}
Setiap dimensi dalam tabel berkorespondensi dengan satu kolom.

:::

**Contoh**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

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

**Type:** `"row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Deskripsi}
Konfigurasi format tanggal dimensi

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Deskripsi}
Granularitas waktu, menentukan presisi tampilan tanggal

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan

\- row: mendukung pemetaan beberapa dimensi ke kanal baris

\- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=Deskripsi}
Setiap metrik dalam tabel berkorespondensi dengan satu baris dan mendukung kombinasi metrik secara native.

:::

**Contoh**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Deskripsi}
ID grup metrik, harus unik.

:::

### alias

**Type:** `string | undefined`

:::note{title=Deskripsi}
Alias grup metrik, boleh duplikat; default-nya ID jika tidak ditentukan.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Pemformatan angka otomatis, aktif secara default dengan prioritas tertinggi

Saat autoFormat=true, konfigurasi ini menimpa semua konfigurasi numFormat

Saat diaktifkan, label data dan tooltip diagram akan otomatis memilih format yang sesuai berdasarkan nilai metrik dan locale

Aturan format: angka desimal dengan compact notation aktif, minimal 0 digit desimal, maksimal 2 digit desimal, pembulatan otomatis, menggunakan implementasi Intl.NumberFormat browser

Contoh:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Deskripsi}
Pemformatan angka kustom untuk metrik; otomatis diterapkan ke label dan tooltip

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
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

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
Jumlah digit desimal untuk format angka, memakai minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits

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
Digit signifikan untuk format angka, memakai minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; memakai Intl.NumberFormat browser dan mengikuti aturan roundingPriority Intl.NumberFormat

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, memakai Intl.NumberFormat browser dan mengikuti aturan roundingMode Intl.NumberFormat

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
\- 100000 dikonversi menjadi 10万, ratio:10000, symbol:"万"
\- 100000 dikonversi menjadi 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Deskripsi}
Simbol format angka, misalnya %, ‰

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
Jumlah digit desimal untuk format angka, memakai minimumFractionDigits dan maximumFractionDigits dari Intl.NumberFormat browser; prioritas lebih rendah daripada significantDigits

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
Digit signifikan untuk format angka, memakai minimumSignificantDigits dan maximumSignificantDigits dari Intl.NumberFormat browser; prioritas lebih tinggi daripada fractionDigits

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
Prioritas pembulatan format angka saat significantDigits dan fractionDigits sama-sama diatur; memakai Intl.NumberFormat browser dan mengikuti aturan roundingPriority Intl.NumberFormat

:::

**Contoh**
\- 1234.5678 dikonversi menjadi 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi menjadi 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Deskripsi}
Mode pembulatan format angka, memakai Intl.NumberFormat browser dan mengikuti aturan roundingMode Intl.NumberFormat

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan

\- column: Kolom metrik

:::

### parentId

**Type:** `string | undefined`

:::note{title=Deskripsi}
Dalam bentuk konfigurasi metrik datar, membangun grup metrik berbentuk tree. parentId menunjuk ke id grup metrik induk untuk membangun tree metrik

:::

:::tip{title=Tip}
Ada dua cara mengonfigurasi tree metrik: Opsi 1 langsung mengonfigurasi tree metrik dengan children; Opsi 2 mengonfigurasi daftar metrik datar dengan parentId. Kedua metode ini tidak dapat digunakan bersamaan

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=Deskripsi}
Metrik anak atau grup metrik di dalam grup metrik.

:::


## page

**Type:** `Page | undefined`

:::note{title=Deskripsi}
Konfigurasi pagination, digunakan untuk menentukan nama field pagination yang harus berupa dimensi.

:::


### field

**Type:** `string`

:::note{title=Deskripsi}
Field paginasi; menentukan nama field untuk paginasi, harus berupa dimensi

:::

### currentValue

**Type:** `string`

:::note{title=Deskripsi}
Nilai paginasi saat ini; menentukan nilai untuk menentukan halaman saat ini

:::

**Contoh**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang dapat berupa string warna (mis. 'red', 'blue'), atau nilai hex, rgb, maupun rgba (mis. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border tabel

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font body tabel

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font body tabel

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna background body tabel

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font header

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna background header

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Background color when the mouse hovers over a header cell, used to highlight the hovered cell.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang seluruh baris saat mouse diarahkan ke header, digunakan untuk menyorot baris yang sedang di-hover.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border sel yang dipilih, digunakan untuk menyorot sel yang dipilih.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar belakang sel yang dipilih, digunakan untuk menyorot sel yang dipilih.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Deskripsi}
Mengatur gaya khusus untuk sel pada badan tabel.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Deskripsi}
Selector data

Jika selector dikonfigurasi, tersedia empat jenis kemampuan pencocokan data: selector numerik, selector data parsial, selector dimensi bersyarat, dan selector metrik bersyarat.

Jika selector tidak dikonfigurasi, gaya berlaku secara global.

Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.

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

Selector metrik bersyarat
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

Filtering kolom field
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Deskripsi}
Nama field, dapat berupa satu field atau array beberapa field.

:::

**Contoh**
Field tunggal
field: 'sales'

Beberapa field
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bawah titik anotasi dan tetap berada dalam area diagram yang terlihat.

\- in: Memilih item data dengan nilai field dimensi yang berada dalam array value.

\- not in: Memilih item data dengan nilai field dimensi yang tidak berada dalam array value.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bawah titik anotasi dan tetap berada dalam area diagram yang terlihat.

\- in: Memilih item data dengan nilai field dimensi yang berada dalam array value.

\- not in: Memilih item data dengan nilai field dimensi yang tidak berada dalam array value.

sama dengan operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi; mendukung array.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (berbasis kode)



Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.

Cocok untuk skenario yang sulit diungkapkan dengan selector statis, seperti Top N, analisis statistik, dan kondisi kompleks.



Kemampuan utama:

\- Mendukung kondisi filter data yang kompleks secara arbitrer.

\- Menggunakan fungsi utilitas bawaan untuk manipulasi data.

\- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker).



Persyaratan lingkungan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback.



Catatan: selector dan dynamicFilter tidak dapat digunakan bersamaan; dynamicFilter memiliki prioritas lebih tinggi.



Konfigurasi filter dinamis tabel



Mengimplementasikan filter presisi tingkat sel pada tabel melalui kode JavaScript yang dihasilkan AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural).

:::

**Contoh**
"Sorot sel dengan penjualan lebih besar dari 1000"

"Sorot sel dengan nilai maksimum di setiap baris"



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI.



\- Hanya boleh menggunakan fungsi utilitas bawaan (diakses melalui _ atau R).

\- Parameter input: data (array), setiap item berisi field _index yang mewakili nomor baris.

\- Harus mengembalikan array selector sel: Array<{ __row_index: number, field: string }>.

\- Saat field adalah "*", berarti seluruh baris disorot.

\- Dilarang: eval, Function, operasi asinkron, DOM API, dan permintaan jaringan.

:::

**Contoh**
Top N filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the top 3 products by sales',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtering multi-kondisi
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtering nilai relatif
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Sorot produk dengan sales di atas rata-rata',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Grouped filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Sorot seluruh baris
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Deskripsi}
Rencana fallback saat eksekusi kode gagal atau lingkungan tidak didukung.

:::


##### field

**Type:** `string`

:::note{title=Deskripsi}
Field dimensi; ID item dalam dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bawah titik anotasi dan tetap berada dalam area diagram yang terlihat.

\- in: Memilih item data dengan nilai field dimensi yang berada dalam array value.

\- not in: Memilih item data dengan nilai field dimensi yang tidak berada dalam array value.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Perataan vertikal teks; biasanya diatur ke 'top' agar teks muncul di bawah titik anotasi dan tetap berada dalam area diagram yang terlihat.

\- in: Memilih item data dengan nilai field dimensi yang berada dalam array value.

\- not in: Memilih item data dengan nilai field dimensi yang tidak berada dalam array value.

sama dengan operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Memilih nilai field dimensi; mendukung array.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime)



Written during the prepare() phase; read-only at runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna background sel

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan konfigurasi color scale untuk warna background

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Deskripsi}
Pemetaan color scale warna background sel; prioritasnya lebih tinggi daripada backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai minimum; jika tidak dikonfigurasi, default-nya adalah nilai minimum pada kolom data saat ini

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai maksimum; jika tidak dikonfigurasi, default-nya adalah nilai maksimum pada kolom data saat ini

:::

#### minColor

**Type:** `string`

:::note{title=Deskripsi}
Warna yang sesuai dengan nilai minimum

:::

#### maxColor

**Type:** `string`

:::note{title=Deskripsi}
Warna yang sesuai dengan nilai maksimum

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan fitur progress bar (bar yang menunjukkan ukuran relatif nilai sel); nonaktif secara default

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna progress bar saat nilai sel positif

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna progress bar saat nilai sel negatif

:::

### barMin

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai minimum progress bar



Menghitung nilai minimum kolom secara otomatis jika tidak dikonfigurasi

:::

### barMax

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai maksimum progress bar



Menghitung nilai maksimum kolom secara otomatis jika tidak dikonfigurasi

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks sel

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font teks sel

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border sel

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis border sel

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=Deskripsi}
Jenis baris ringkasan yang ditampilkan; hanya berlaku untuk kolom metrik

\- 'sum': Menampilkan baris jumlah

\- 'avg': Menampilkan baris rata-rata

\- 'max': Menampilkan baris maksimum

\- 'min': Menampilkan baris minimum

\- 'count': Menampilkan baris hitung



Tipe baris ringkasan tabel

\- 'sum': Jumlah

\- 'avg': Rata-rata

\- 'max': Maksimum

\- 'min': Minimum

\- 'count': Hitung

:::

**Contoh**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=Deskripsi}
Tema diagram. Tema adalah konfigurasi fungsional berprioritas lebih rendah yang mencakup pengaturan umum untuk semua tipe diagram dan pengaturan khusus untuk satu tipe diagram. Tema terang dan gelap bawaan dapat dikustomisasi melalui Builder.



Tema



Tema terang dan gelap bawaan; tema baru dapat dikustomisasi melalui registerTheme.

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
Konfigurasi bahasa diagram; mendukung 'zh-CN' dan 'en-US'. Selain itu, bahasa dapat diatur dengan metode intl.setLocale('zh-CN').

:::

# PivotTable

:::info{title=Direkomendasikan}
- Konfigurasi field yang direkomendasikan: `1` metrik, `1` dimensi
- Mendukung Data Reshape: minimal `1` metrik, `0` dimensi
:::

:::info{title=Pemetaan Encoding}
Pivot Table mendukung kanal visual berikut:

`row`    : dimensi baris, mendukung `beberapa dimensi`, mengelompokkan data menurut nilai dimensi pada baris.

`column` : dimensi kolom, mendukung `beberapa dimensi`, mengelompokkan data menurut nilai dimensi pada kolom.

`detail` : kanal detail, mendukung `beberapa metrik`, menampilkan nilai metrik di dalam sel.

:::

:::note{title=Deskripsi}
Pivot Table cocok untuk analisis silang data multidimensi, dengan konfigurasi dimensi baris/kolom dan metode perhitungan metrik yang fleksibel.

Skenario yang sesuai:

- Analisis statistik multidimensi yang kompleks.
- Drill-down data dan tampilan agregat.
- Pembuatan laporan bisnis dan eksplorasi data.

:::

:::warning{title=Warning}
Persyaratan data:

- Minimal 1 dimensi baris, 1 dimensi kolom, atau 1 metrik.
- Data harus sudah diagregasi.
- Data harus dapat dikelompokkan.

Fitur yang aktif secara default:

- Pengurutan baris/kolom, filter data, perhitungan agregasi/subtotal, serta tampilan subtotal/grand total aktif secara default.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=Deskripsi}
Pivot Table cocok untuk skenario analisis silang data multidimensi.

:::

**Contoh**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=Deskripsi}
Dataset yang sesuai spesifikasi TidyData dan sudah teragregasi, digunakan untuk menentukan sumber dan struktur data chart. Input pengguna tidak memerlukan praproses; VSeed memiliki kemampuan Data Reshape yang kuat untuk menangani pemformatan secara otomatis. Data Pivot Table akhirnya dikonversi menjadi struktur tree yang sesuai, sehingga tidak perlu manipulasi data manual.

:::

**Contoh**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=Deskripsi}
Dimensi baris dan kolom untuk Pivot Table. Data otomatis diproses menjadi struktur tree dan dipetakan ke sumbu baris dan kolom.

:::

**Contoh**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title=Deskripsi}
Kanal tempat dimensi dipetakan:

- row: mendukung pemetaan beberapa dimensi ke kanal baris

- column: mendukung pemetaan beberapa dimensi ke kanal kolom

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=Deskripsi}
Pivot Table mendukung beberapa metrik dimensi.

:::

**Contoh**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




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

**Type:** `"column" | undefined`

:::note{title=Deskripsi}
Kanal tempat metrik dipetakan:

- column: kolom metrik

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
Konfigurasi paginasi. Menentukan nama field untuk paginasi, harus berupa dimensi.

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

**Type:** `BackgroundColor`

:::note{title=Deskripsi}
Warna latar belakang chart. Default transparan. Dapat berupa string warna (misalnya 'red', 'blue'), atau nilai hex, rgb, rgba (misalnya '#ff0000', 'rgba(255,0,0,0.5)').

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border tabel.

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font badan tabel.

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font badan tabel.

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar badan tabel.

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran font header baris dan kolom.

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna font header baris dan kolom.

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar header baris dan kolom.

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar saat hover pada sel header baris atau kolom, digunakan untuk menyorot sel pada perpotongan baris dan kolom yang di-hover.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar saat hover pada sel header baris atau kolom, digunakan untuk menyorot semua sel pada baris dan kolom yang di-hover.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border sel terpilih, digunakan untuk penyorotan.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna latar sel terpilih, digunakan untuk penyorotan.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Deskripsi}
Mengatur style khusus untuk sel pada badan tabel.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Deskripsi}
Selector data.

Jika `selector` dikonfigurasi, tersedia empat kemampuan pencocokan data: selector numerik, selector data lokal, selector dimensi bersyarat, dan selector metrik bersyarat.

Jika `selector` tidak dikonfigurasi, style berlaku secara global.

Catatan: `selector` dan `dynamicFilter` tidak dapat digunakan bersamaan; `dynamicFilter` memiliki prioritas lebih tinggi.

:::

**Contoh**
Selector numerik:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector data lokal:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Selector dimensi bersyarat:
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

Selector metrik bersyarat:
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

Filter kolom field:
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Deskripsi}
Nama field; dapat berupa satu field atau array field.

:::

**Contoh**
Field tunggal:
field: 'sales'

Beberapa field:
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator:

- in: Memilih item data yang nilai field dimensinya ada dalam daftar 'value'.

- not in: Memilih item data yang nilai field dimensinya tidak ada dalam daftar 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator:

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

**Type:** `TableDynamicFilter | undefined`

:::note{title=Deskripsi}
Filter dinamis (berbasis kode).

Mengimplementasikan logika filter data kompleks melalui kode JavaScript yang dihasilkan AI.
Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain ketika selector statis tidak memadai.

Kemampuan inti:

- Mendukung kondisi filter data kompleks apa pun.

- Menggunakan fungsi utilitas bawaan untuk operasi data.

- Dieksekusi dengan aman di lingkungan browser (sandbox Web Worker).

Persyaratan: hanya mendukung lingkungan browser; lingkungan Node.js akan menggunakan fallback.

Catatan: `selector` dan `dynamicFilter` tidak dapat digunakan bersamaan; `dynamicFilter` memiliki prioritas lebih tinggi.

Konfigurasi filter dinamis tabel.

Mengimplementasikan filter presisi tingkat sel melalui kode JavaScript yang dihasilkan AI.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Deskripsi}
Deskripsi kebutuhan filter pengguna (bahasa natural).

:::

**Contoh**
"Sorot sel dengan sales lebih dari 1000."

"Sorot sel dengan nilai maksimum di setiap baris."



#### code

**Type:** `string`

:::note{title=Deskripsi}
Kode filter JavaScript yang dihasilkan AI.

- Hanya fungsi utilitas bawaan yang dapat digunakan (diakses melalui _ atau R).

- Parameter input: data (array); setiap item berisi field `_index` yang merepresentasikan nomor baris.

- Harus mengembalikan array selector sel: Array<{ __row_index: number, field: string }>.

- Saat `field` bernilai "*", seluruh baris akan disorot.

- Dilarang: eval, Function, operasi asynchronous, DOM API, request jaringan.

:::

**Contoh**
Filter Top N:
dynamicFilter = {
type: 'row-with-field',
description: 'Sorot 3 produk teratas berdasarkan sales',
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

Filter multi-kondisi:
dynamicFilter = {
type: 'row-with-field',
description: 'Sorot produk dengan margin laba > 20% dan sales > 5000',
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

Filter nilai relatif:
dynamicFilter = {
type: 'row-with-field',
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

Filter berkelompok:
dynamicFilter = {
type: 'row-with-field',
description: 'Sorot produk terlaris di setiap region',
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

Sorot seluruh baris:
dynamicFilter = {
description: 'Sorot baris saat sales melebihi profit',
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
ID field dimensi.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator:

- in: Memilih item data yang nilai field dimensinya ada dalam daftar 'value'.

- not in: Memilih item data yang nilai field dimensinya tidak ada dalam daftar 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Deskripsi}
Operator:

- in: Memilih item data yang nilai field dimensinya ada dalam daftar 'value'.

- not in: Memilih item data yang nilai field dimensinya tidak ada dalam daftar 'value'.

Sama dengan operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Deskripsi}
Nilai dimensi yang dipilih; mendukung array.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Deskripsi}
Hasil eksekusi filter dinamis (field runtime). Ditulis pada fase `prepare()`; hanya baca saat runtime.

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
Warna latar sel.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan color scale untuk latar sel.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Deskripsi}
Pemetaan color scale latar sel; prioritas lebih tinggi daripada `backgroundColor`.

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai minimum; jika tidak dikonfigurasi, default ke nilai minimum pada kolom data saat ini.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai maksimum; jika tidak dikonfigurasi, default ke nilai maksimum pada kolom data saat ini.

:::

#### minColor

**Type:** `string`

:::note{title=Deskripsi}
Warna yang sesuai dengan nilai minimum.

:::

#### maxColor

**Type:** `string`

:::note{title=Deskripsi}
Warna yang sesuai dengan nilai maksimum.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah mengaktifkan bilah progres latar (bar yang mencerminkan besaran nilai sel). Default nonaktif.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna bar latar saat nilai sel positif.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna bar latar saat nilai sel negatif.

:::

### barMin

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai minimum untuk bilah progres.
Jika tidak dikonfigurasi, otomatis dihitung dari nilai minimum kolom.

:::

### barMax

**Type:** `number | undefined`

:::note{title=Deskripsi}
Nilai maksimum untuk bilah progres.
Jika tidak dikonfigurasi, otomatis dihitung dari nilai maksimum kolom.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna teks sel.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Deskripsi}
Ukuran teks sel.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Deskripsi}
Warna border sel.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Deskripsi}
Lebar garis border sel.

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah metrik ditampilkan sebagai kolom. Saat `true`, metrik melebar horizontal (kolom); saat `false`, melebar vertikal (baris).

:::

**Contoh**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=Deskripsi}
Konfigurasi grand total dan subtotal untuk Pivot Table.

:::

**Contoh**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Deskripsi}
Konfigurasi grand total dan subtotal untuk baris.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan grand total (baris/kolom total).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan subtotal.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Dimensi untuk subtotal; mengelompokkan subtotal berdasarkan dimensi ini.

:::

**Contoh**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Deskripsi}
Konfigurasi grand total dan subtotal untuk kolom.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan grand total (baris/kolom total).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Deskripsi}
Apakah menampilkan subtotal.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Deskripsi}
Dimensi untuk subtotal; mengelompokkan subtotal berdasarkan dimensi ini.

:::

**Contoh**
['category', 'region']




## theme

**Type:** `Theme | undefined`

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

**Type:** `Locale | undefined`

:::note{title=Deskripsi}
Locale. Konfigurasi bahasa chart; mendukung 'zh-CN' dan 'en-US'. Alternatifnya, panggil `intl.setLocale('zh-CN')` untuk mengatur bahasa.

:::

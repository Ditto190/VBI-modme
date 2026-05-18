# Desain pipeline

:::info Mengapa Pipeline?
1. Pilihan para senior di dalam tim.
2. Keunggulan Pipeline adalah memungkinkan `VSeed` mengontrol alur eksekusi setiap jenis chart secara independen. Dengan desain yang baik, implementasi setiap jenis chart dapat terlepas satu sama lain sekaligus tetap dapat digunakan ulang secara lokal, dan setiap jenis chart dapat mengontrol detail apa pun secara presisi. Inilah yang dibawa Pipeline, dan inilah yang paling dibutuhkan `VSeed`.
3. Dibandingkan dengan itu, kekurangan pola Pipeline dapat dihindari saat desain. Selama ukuran setiap `Pipe` diperkecil dan dependensi antar-`Pipe` dikurangi, kekurangan pola ini dapat sangat dihindari.
4. Setelah empat generasi desain dan optimasi Pipeline, di VSeed ini sudah menjadi versi kelima. Lubang yang perlu dilewati sudah pernah dilewati.

:::

## Apa itu Pipeline?

Pipeline adalah abstraksi dan praktik engineering yang kuat. Ia memecah tugas kompleks menjadi serangkaian langkah kecil yang saling terhubung dan dijalankan berurutan. Filosofi desain dan implementasinya sangat dipengaruhi oleh ide inti functional programming (FP).

### Keunggulan Pipeline:
- Modularitas: implementasi atomik, lalu menyusun atom menjadi modul.
- Otomatisasi: cukup menentukan input, output dapat diperoleh otomatis tanpa perlu memperhatikan implementasi internal.
- Pure function: input tertentu pasti menghasilkan output yang diharapkan, ini adalah ciri pure function.
- Paralelisme: secara alami mendukung concurrency.
- Reusability: setiap modul dapat digunakan ulang.
- Testability: secara teori setiap modul independen dan dapat diuji terpisah untuk memastikan kualitas.
- Traceability: input dan output setiap tahap jelas, sehingga mudah menemukan masalah dan memantau status proses.
- Cacheability: secara teori output satu `Pipe` dapat dicache secara terpisah, sehingga menghindari komputasi berulang dan meningkatkan efisiensi.

### Kekurangan Pipeline:
- Dependensi berurutan: ketika antar-`Pipe` memiliki dependensi urutan, biaya pemahaman meningkat, karena tahap sebelumnya harus dipahami sebelum tahap berikutnya. Pemahaman menyeluruh atas proses diperlukan untuk cepat menemukan masalah.
- Biaya debugging: karena Pipeline dijalankan berurutan, kegagalan satu tahap menyebabkan seluruh Pipeline gagal. Ini membuat debugging lebih sulit karena tahap yang gagal harus ditemukan dan diperbaiki.
- Masalah performa: karena Pipeline dijalankan berurutan, output setiap tahap harus menunggu tahap sebelumnya selesai. Ini dapat menimbulkan masalah performa, terutama ketika salah satu tahap berjalan lama.
- Functional programming: perlu memahami konsep baru, sehingga ada biaya belajar. Karena itu prinsip desain dan detail implementasi perlu ditulis dalam contribution guide agar developer lain dapat memahami dan menggunakannya.

## Bagaimana menulis Pipeline di VSeed?

### Pola Komposisi Pipe

Beberapa `Pipe` fungsional dapat disusun menjadi `Pipe` fungsional yang lebih besar, atau menjadi Pipeline yang lebih kompleks.

Di VSeed, satu Pipeline lengkap berkorespondensi dengan implementasi satu jenis chart. Dengan mendeskripsikan hubungan komposisi antar-`Pipe`, kita dapat membuat berbagai jenis chart. Pada tahap komposisi Pipeline, detail implementasi setiap `pipe` tidak perlu diperhatikan.


#### Perbedaan Komposisi

Contoh:

Line chart dan area chart dapat menggunakan ulang banyak fungsi, seperti label, legend, dan axis. Namun line chart tidak memiliki style mark area, sehingga pipeline menyelesaikan perbedaan ini melalui komposisi `Pipe` fungsional, tanpa satu pun pernyataan `if`.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Hanya area chart yang memiliki style mark area
  areaStyle,
]
```


### Pola Adapter Pipe

Selain pola komposisi, pembuatan `Pipe` sering kali memiliki kondisi tertentu. Untuk memenuhi komposisi `Pipe` di kondisi yang berbeda, VSeed banyak menggunakan adapter `Pipe`.

#### Kondisi Komposisi

Contoh:

Line chart memiliki kemampuan pivot. Tanpa pivot, chart dirender oleh VChart dan menghasilkan VChart spec. Dengan pivot, chart dirender oleh VTable dan menghasilkan VTable spec.

Pivot line chart pada dasarnya perlu menggunakan ulang fungsi dasar line chart, seperti label, legend, dan axis. Karena itu diperlukan pola adapter untuk mengadaptasi `Pipe` line chart menjadi `Pipe` pivot line chart.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Singkatnya, setiap adapter adalah satu `if else`. Kondisi yang tersembunyi di dalam `pipe` dapat diabstraksikan menjadi adapter, sehingga `if else` dipindahkan ke level paling atas. Hasilnya adalah Pipeline dengan dependensi yang lebih jelas dan biaya maintenance yang lebih rendah.

### Unit paling dasar Pipeline: Pipe fungsional

VSeed mengharapkan semua jenis chart menggunakan fungsi sebagai unit paling dasar, menyediakan kemampuan reuse dan ekstensi yang cukup. Pipeline satu jenis chart dibangun dari bawah ke atas. Setiap `Pipe` fungsional sebaiknya menjadi modul yang independen, dapat diuji, dan dapat digunakan ulang.

Hal terpenting adalah mengabstraksikan perbedaan fungsi menjadi `Pipe` yang berbeda (yaitu menulis lebih sedikit `if else`), bukan menulis satu `Pipe` besar yang mencakup semuanya.

#### Pipe Fungsional yang Datar

Contoh:

Bar chart, column chart, line chart, area chart, dan scatter chart semuanya memiliki sumbu X dan Y. Mereka mirip tetapi sedikit berbeda. Jika menulis satu `axes` pipe besar yang mencakup semuanya, bentuknya mungkin seperti ini:

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // Line chart, area chart, dan column chart memiliki satu sumbu diskret dan satu sumbu kontinu
    return xy(spec, context)
  }
  if (isScatter){
    // Scatter chart memiliki dua sumbu kontinu
    return yy(spec, context)
  }
  if (isBar){
    // Bar chart memiliki satu sumbu diskret dan satu sumbu kontinu, tetapi arah sumbunya berbeda dari line, area, dan column chart
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Logika di atas memilih sub-`pipe` fungsional yang berbeda berdasarkan jenis chart di dalam satu `Pipe` fungsional. Ini menimbulkan dua masalah:
1. Bagaimana fungsi yang berulang di `xy`, `yx`, dan `yy` digunakan ulang? Banyak subfungsi yang mirip tetapi berbeda harus dipanggil berulang di berbagai sub-`pipe` fungsional. Dependensi mudah menjadi rumit dan meningkatkan biaya maintenance.
2. Saat mengubah fungsi line chart atau area chart, bar chart mudah terlewat karena logika sudah bercabang. Karena itu perbedaan harus dipertimbangkan saat mengimplementasikan fungsi baru.

Ketika ukuran seluruh spec pipeline berkembang hingga ratusan `pipe`, cara penulisan seperti ini akan membawa biaya maintenance yang sangat tinggi. Karena itu kita membutuhkan cara yang lebih sederhana untuk memilih sub-`pipe` fungsional yang berbeda berdasarkan jenis chart.

Melanjutkan contoh di atas, perbedaan diabstraksikan menjadi `Pipe` yang berbeda, dikemas pada granularitas fungsi yang lebih halus, lalu dikomposisikan langsung di dalam pipeline. Dengan demikian masalah di atas dapat dihindari.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Pada contoh di atas, tidak ada `axes` pipe yang diimplementasikan. Sebaliknya, `xBandAxis`, `yBandAxis`, `xLinearAxis`, dan `yLinearAxis` langsung dikomposisikan. Ini menghindari masalah pemilihan sub-`pipe` fungsional berbeda di dalam `axes` pipe berdasarkan jenis chart, menghindari branching berdasarkan jenis chart, dan mengurangi penggunaan `if else`.

Semua percabangan perbedaan jenis chart sebaiknya berada di atas Pipeline. Kecuali benar-benar terpaksa, Pipeline tidak perlu memilih sub-`pipe` fungsional yang berbeda berdasarkan jenis chart.

Cara komposisi ini sesuai dengan filosofi desain VSeed: menggunakan komposisi `Pipe` fungsional yang lebih datar, bukan menggunakan kondisi `if else` untuk membuat satu `Pipe` fungsional besar yang mencakup semuanya.

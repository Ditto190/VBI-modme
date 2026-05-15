# VSeed

:::info Ringkasan Singkat
Menerima kebutuhan bisnis yang fleksibel dari atas, membatasi bentuk akses data dari bawah, dan mengorkestrasi data secara seragam untuk menyederhanakan kompleksitas.
:::

## Apa itu VSeed?

`VSeed` adalah alat visualisasi untuk analisis data. Fokusnya adalah menyediakan kemampuan transformasi data yang sangat konsisten di antara berbagai jenis chart, sekaligus menyediakan sebagian fitur siap pakai untuk memenuhi kebutuhan analisis data ringan.

## Apa keunggulan VSeed?

> Pertama, benar-benar mudah digunakan. Kedua, memang fleksibel. Terakhir, VSeed memiliki banyak enkapsulasi, sehingga perlu memahami bagaimana VSeed melakukan reshape data agar dapat menggunakannya dengan sempurna.

1. Cara paling intuitif untuk berpindah jenis chart [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Pivot chart yang paling mudah digunakan [Demo](/vseed/guide/intro/pivotAndCombine)
3. Kemampuan reshape data yang kuat, tanpa perlu pemrosesan data apa pun; berapa pun jumlah dimension dan measure, jenis chart apa pun dapat dibuat [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` sepenuhnya dapat diserialisasi, sehingga mendukung transfer `VSeed DSL` lintas platform [Demo](/vseed/guide/intro/crossPlatformRender)
5. Siap pakai: format angka, internasionalisasi, tema terang/gelap, style umum, dan sebagainya [Demo](/vseed/guide/intro/internationalization)
6. Performa pemrosesan data yang baik, mendukung pemrosesan data di sisi `Node` dan visualisasi di sisi `Web` [Demo](/vseed/guide/intro/separateBuild)

## Apa kelemahan VSeed?

1. `VSeed` tidak bertanggung jawab untuk memoles setiap detail chart tunggal. Kebutuhan semacam itu disediakan oleh `VChart` dan `VTable`. `VSeed` hanya menyediakan kemampuan untuk memodifikasi `spec` secara fleksibel; pengguna dapat menyesuaikan setiap detail chart sesuai kebutuhan.
2. Hanya dataset yang sesuai dengan spesifikasi `tidyData` yang dapat divisualisasikan oleh `VSeed`. Dataset yang tidak standar tidak diterima oleh `VSeed`.
3. Dibangun di atas ekosistem `VisActor`, sehingga pengguna perlu memahami konsep dasar `VChart` dan `VTable`.

## Apa prinsip VSeed?

1. `VSeed` harus mendukung serialisasi.
2. `VSeed` tidak perlu menyediakan terlalu banyak kemampuan pengaturan style, dan harus fokus pada hubungan antara chart dan data.
3. `VSeed` sebaiknya mengenkapsulasi fungsi umum yang sering digunakan dalam domain analisis, seperti format angka, internasionalisasi, tema, style umum, dan fungsi umum, agar siap digunakan.
4. Kebutuhan kustomisasi yang lebih fleksibel harus dilakukan sendiri oleh pengguna. Karena itu, VSeed hanya mengekspos satu Spec Builder untuk membangun spec VChart dan VTable.
   - Pengguna dapat mengontrol VChart Instance dan VTable Instance secara fleksibel.
   - Pengguna dapat memodifikasi spec VChart dan VTable sesuai kebutuhan.

## Mengapa merancang VSeed?

1. `VChart` tidak akan pernah dapat beralih mulus ke `VTable`, begitu juga sebaliknya. Untuk kebutuhan seperti ini, abstraksi tingkat atas pasti akan muncul.
2. Pengguna `VChart` dan `VTable` harus memproses data sendiri. Pekerjaan ini tanpa sadar dapat terulang ratusan hingga ribuan kali. `VSeed` ingin mengurangi kompleksitas pemrosesan data pada skenario umum dan mengurangi pekerjaan berulang.
3. Sampai batas tertentu dapat menurunkan hambatan penggunaan `VChart` dan `VTable`, misalnya menggunakan `VTable` untuk merender `PivotChart`.
4. `VSeed` pada akhirnya mungkin berkembang menjadi submodul `HeadlessBI`, digunakan untuk membangun alat analisis data umum.

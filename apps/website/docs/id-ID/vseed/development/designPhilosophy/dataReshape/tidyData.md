# TidyData

:::info Makna
TidyData, melalui prinsip inti "variabel sebagai kolom, observasi sebagai baris", sangat mengurangi kompleksitas pembersihan data sehingga kita dapat lebih fokus pada masalah bisnis daripada konversi format data.
:::

## Makalah

Penulis makalah ini adalah `Hadley Wickham`. Makalah ini membahas satu modul kecil dalam pemrosesan data, yaitu perapian data, karena dataset yang rapi lebih mudah dioperasikan, dimodelkan, dan divisualisasikan, serta memiliki struktur tertentu.

Makalah ini sangat disarankan untuk dibaca. Lihat: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)

## TidyData di VSeed

Konfigurasi `dataset` dalam VSeed DSL adalah dataset dalam format `TidyData`.

Karakteristik inti:
1. **Setiap variabel satu kolom**: Nilai variabel disimpan dalam kolom terpisah, seperti "usia" dan "jenis kelamin".
2. **Setiap observasi satu baris**: Semua nilai variabel dari satu objek observasi membentuk satu baris, misalnya informasi usia dan jenis kelamin seseorang.
3. **Setiap unit observasi satu tabel**: Jenis unit observasi yang berbeda, seperti orang, waktu, dan lokasi, sebaiknya disimpan secara terpisah.

Karena itu, hasil query `SQL` dapat langsung dimasukkan ke konfigurasi `dataset` milik `VSeed` tanpa pemrosesan data tambahan, sehingga analisis dan visualisasi dapat dilakukan dengan cepat.

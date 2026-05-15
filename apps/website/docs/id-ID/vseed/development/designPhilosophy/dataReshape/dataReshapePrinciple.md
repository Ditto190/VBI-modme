# Reshape Data - Prinsip

:::info Reshape Data
VSeed mengusulkan metode reshape dimension yang umum untuk semakin menurunkan hambatan visualisasi data.
:::

Reshape data adalah proses mengubah data dari satu bentuk terstruktur ke bentuk terstruktur lain. Intinya adalah mengubah organisasi data, seperti baris, kolom, indeks, dan hierarki, agar sesuai dengan kebutuhan analisis atau pemrosesan yang berbeda sambil menjaga integritas data.

## Reshape Dimension

Bahasa Python dan R sudah memiliki tool yang mendukung reshape dimension:
1. Python Pandas menyediakan `pivot` dan `melt` untuk reshape data
2. R tidyverse menyediakan `pivot_longer` dan `pivot_wider` untuk reshape data

## Peningkatan dan Penurunan Dimension

Peningkatan dan penurunan dimension secara pemikiran selaras dengan category theory (objek dan morphism, serta isomorphism), tetapi implementasinya tidak secara ketat mengikuti category theory.

Catatan khusus:
1. Saat peningkatan dimension, informasi "nama measure" dan "nilai measure" yang tidak ada akan dibuat "dari ketiadaan"
2. Saat penurunan dimension, informasi "nama measure" dan "nilai measure" yang ada dalam data akan "dihapus"

Peningkatan dimension dapat mengubah data secara lengkap, tetapi nama kolom dimension mungkin bernilai kosong, sehingga pengisian informasi tambahan didukung.
Penurunan dimension akan kehilangan konten informasi, sehingga informasi transformasi tambahan perlu disimpan untuk mencapai transformasi isomorfik yang sebenarnya. Jika tidak, informasi pasti akan hilang.

![commonDataReshape](/images/commonDataReshape.png)

## Peningkatan dan Penurunan Dimension Berkelompok

Seperti peningkatan dan penurunan biasa, terdapat skenario penambahan atau kehilangan informasi yang serupa. Selain itu, masuknya grouping akan menghasilkan lebih banyak data kosong.

Makna:
1. **Pengelompokan measure**: Mudah menangani data detail melalui peningkatan dimension berkelompok
2. **Query multi-grup**: Beberapa SQL dapat dengan mudah mengambil beberapa set data detail, lalu menggabungkannya menjadi satu data melalui penurunan dimension berkelompok

![groupedDataReshape](/images/groupedDataReshape.png)

## Derivasi Aturan

### Peningkatan Dimension

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Peningkatan dimension pada banyak measure akan mengubah jumlah measure menjadi 1. Satu measure setelah peningkatan dimension tetap 1.
2. Peningkatan dimension pada banyak dimension akan menambah satu dimension. Bahkan 0 dimension juga akan bertambah menjadi 1.
3. 0 dimension dan 1 measure dapat dinaikkan dimension berulang kali untuk mendapatkan berapa pun jumlah dimension dan 1 measure, sehingga satu measure juga dapat menggambar chart batang.
:::

### Penurunan Dimension

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Penurunan dimension pada banyak measure membuat nilai dimension dan measure membentuk produk Cartesian dan menjadi measure baru
2. Penurunan dimension pada banyak dimension membuat beberapa nilai dimension membentuk produk Cartesian dan menjadi dimension baru
:::

## Contoh

#### 0 Dimension, 1 Measure
![0d1m](/images/0d1m.png)
#### 0 Dimension, 3 Measure
![0d3m](/images/0d3m.png)
#### 1 Dimension, 1 Measure
![1d1m](/images/1d1m.png)
#### 1 Dimension, 2 Measure
![1d2m](/images/1d2m.png)
#### 2 Dimension, 1 Measure
![2d1m](/images/2d1m.png)
#### 2 Dimension, 2 Measure
![2d2m](/images/2d2m.png)

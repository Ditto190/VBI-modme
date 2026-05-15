# Desain DSL

:::info Makna

VSeed adalah DSL deklaratif

- Desain DSL adalah seni mengekspresikan masalah domain, dan dapat menyederhanakan masalah kompleks secara efektif.
- DSL membuat orang yang sudah terbiasa dapat menulis kode sealami menulis bahasa ibu. Setelah terbiasa dengan VSeed, merender chart terasa sesederhana menulis bahasa alami.
- `VChart` dan `VTable` juga demikian.


:::

:::tip

`DSL deklaratif` berfokus pada "apa" (What). Ia mendeskripsikan seperti apa hasil yang diharapkan atau keadaan akhir, tanpa peduli langkah detail yang dilakukan komputer untuk mencapai keadaan tersebut.


`DSL imperatif` berfokus pada "bagaimana" (How). Ia menyediakan serangkaian instruksi eksplisit dan bertahap, memberi tahu komputer cara mencapai keadaan target langkah demi langkah.
:::

## Trade-off VSeed

1. Fokus Domain (Focus)

Mengorbankan sebagian generalitas untuk fokus menyelesaikan masalah pada domain tertentu. Karena itu, tujuan inti VSeed bukan memenuhi seluruh kebutuhan satu jenis chart secara mendalam, melainkan fokus pada transformasi data sebelum jenis chart ditentukan. Fungsi lain seperti tema, interaksi, dan animasi diserahkan kepada pengguna.

2. Tingkat Abstraksi (Abstraction Level)

`VSeed` menyediakan tingkat abstraksi yang lebih tinggi, sehingga pengguna dapat fokus menyelesaikan masalah tanpa memikirkan detail implementasi level bawah. Ini meningkatkan efisiensi pengembangan. Misalnya, berpindah jenis chart cukup mengubah satu parameter, tanpa perlu memperhatikan detail cara perpindahannya.

3. Batasan adalah Keunggulan (Constraint is Advantage)

`VSeed` menekankan batasan: menerima `VSeed DSL` sebagai input dan menghasilkan `spec` untuk `VTable` atau `VChart`. Ini memungkinkan pengguna mengontrol fitur chart tunggal dengan lebih fleksibel. `VSeed` bukan kotak hitam.

Karena itu, VSeed dapat secara sederhana dianggap sebagai `Spec Builder` yang tidak merusak kemampuan asli `VTable` atau `VChart`. Setiap pengguna `VChart` atau `VTable` dapat dengan cepat mengintegrasikan `VSeed` ke platform yang sudah ada.

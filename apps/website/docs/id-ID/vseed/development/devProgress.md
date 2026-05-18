# Alur Pengembangan

## Menjalankan Proyek

```bash title="Menjalankan Proyek"
pnpm install && pnpm dev
```

## Memahami Kebutuhan dan Menulis Kode

Ini adalah proses yang kompleks, tetapi umumnya mencakup tiga hal:
1. Menentukan input: `vseed`
2. Menentukan output: `vseed` menjadi `advancedVSeed`, atau `advancedVSeed` menjadi `spec`
3. Menulis kode dan memastikan input baru menghasilkan output sesuai harapan

:::tip
`playground` (`apps/website/docs/id-ID/playground/index.mdx`) dapat digunakan untuk debugging dan pengembangan.
:::

## Membuat Test Case Baru

Jika diperlukan, pertimbangkan untuk membuat test case baru.

:::tip
Ketika coverage turun, test case baru perlu dibuat.
:::

Di direktori `packages/vseed/tests/*`, buat file `testName.json` baru dan tulis VSeed DSL di dalamnya.

Jalankan:

```bash title="Membuat Test Case"
pnpm build:canvasTest
```

## Menjalankan Unit Test dan Memperbarui Coverage

```bash title="Menjalankan Unit Test dan Memperbarui Coverage"
pnpm test:coverage
```

Pastikan tiga hal:
1. Semua test lulus
2. Perubahan snapshot sesuai harapan
3. Coverage tidak turun

> Perubahan coverage akan otomatis diperbarui ke README.md

## Memperbarui Dokumentasi Opsi Konfigurasi

Jika mengubah definisi TypeScript untuk jenis chart, harap perbarui dokumentasi opsi konfigurasi.

:::tip
Semua definisi tipe di bawah `packages/vseed/src/types/chartType` sesuai dengan dokumentasi opsi konfigurasi setiap chart. Jika ada perubahan, pastikan untuk memperbaruinya.
:::

```bash title="Memperbarui Dokumentasi Opsi Konfigurasi"
pnpm build:docs
```

## Rilis dan Submit

```bash title="Mendeskripsikan Perubahan"
pnpm changeset
```

Setelah menjalankan perintah `pnpm changeset`, ikuti prompt untuk melakukan langkah berikut:
1. Pilih package yang berubah; umumnya hanya `vseed`
2. Ikuti semantic versioning dan pilih tipe perubahan. Dalam sebagian besar kasus, tekan Enter dua kali untuk melewati `major` dan `minor`, lalu pilih `patch`
3. Masukkan deskripsi perubahan, misalnya: `fix: chart render error caused by only one measure`

:::tip Rekomendasi
Satu fitur atau Bugfix sesuai dengan satu `changeset` dan satu `commit`

Satu `Pull Request` sesuai dengan satu `issue`

Satu `Pull Request` dengan beberapa fitur atau beberapa Bugfix sesuai dengan beberapa `changeset` dan beberapa `commit`
:::

## Commit

```bash title="Commit Semua Konten"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```

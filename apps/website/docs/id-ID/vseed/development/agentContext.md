# Konteks Pengembangan Agent (VSeed)

Dokumen ini ditujukan untuk agent-code dan kontributor. Isinya merangkum arsitektur inti, alur data, dan cara ekstensi pada subpaket VSeed agar pemahaman menyeluruh dapat dibangun dengan cepat saat pengembangan otomatis.

> Ini adalah "indeks konteks" yang dirancang untuk digunakan Agent. Untuk catatan engineering yang lebih detail, lihat `packages/vseed/AGENTS.md`.

## 1. Tujuan dan Posisi

VSeed adalah **Spec Builder** yang mengubah `VSeed DSL` menjadi Spec `VChart` / `VTable` yang dapat dirender, untuk mendukung kemampuan membuat dan mengedit chart secara cerdas.

- Input: `VSeed DSL`
- Output: Spec `VChart` / `VTable`
- Alur inti: `AdvancedPipeline` + `SpecPipeline`

## 2. Pipeline Dua Tahap

1. **AdvancedPipeline**

- Input: `VSeed DSL`
- Output: `AdvancedVSeed` (state antara yang dapat diserialisasi)
- Tanggung jawab: reshape data, inferensi default, pemodelan encoding, tema dan style, konfigurasi analisis

2. **SpecPipeline**

- Input: `AdvancedVSeed`
- Output: Spec final (tidak dapat diserialisasi, langsung dirender)
- Tanggung jawab: memetakan state antara ke konfigurasi VChart / VTable konkret

## 3. Entry Point Builder

- Gunakan `Builder.from(vseed).build()` untuk menghasilkan Spec
- `prepare()` menjalankan dynamicFilter (jika diperlukan)

Entry point source:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Reshape Data (Inti)

- `foldMeasures`: Melipat beberapa measure menjadi satu measure, lalu menghasilkan `foldInfo`
- `unfoldDimensions`: Menggabungkan dimension berdasarkan channel encoding visual, lalu menghasilkan `unfoldInfo`
- `dataReshapeByEncoding`: Panggilan gabungan (fold + unfold)

Entry point source:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Ekstensi dan Registrasi

- `registerAll()`: Mendaftarkan semua chart dan tema
- `registerXxx()`: Mendaftarkan pipeline untuk satu jenis chart
- `updateAdvanced()` / `updateSpec()`: Menyisipkan Pipe kustom

Entry point source:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Prinsip Desain Pipeline

- Pipe sebaiknya dibuat seatomik mungkin dan mengurangi if/else
- Alur bersyarat digabungkan melalui Adapter
- Jenis chart ditentukan oleh komposisi Pipe

Referensi:
- `apps/website/docs/id-ID/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Konteks Lebih Lengkap

- `packages/vseed/AGENTS.md`
- `apps/website/docs/id-ID/vseed/development/architecture.md`
- `apps/website/docs/id-ID/vseed/development/designPhilosophy/vseed.md`

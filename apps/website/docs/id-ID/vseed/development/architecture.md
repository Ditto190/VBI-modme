# Desain Arsitektur

VSeed adalah generator chart berbasis konfigurasi semantik yang dirancang untuk menghubungkan maksud pengguna dengan rendering engine di bawahnya (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## Konsep Inti

### 1. Arsitektur Pipeline (Pipeline Architecture)
VSeed menggunakan pola pipeline untuk membangun Spec chart secara bertahap. Seluruh proses dibagi menjadi dua tahap utama:

- **AdvancedPipeline**:
  - Masukan: objek awal `VSeed`.
  - Tanggung jawab: reshape data (Data Reshape), menerapkan theme, menginferensi konfigurasi default.
  - Keluaran: `AdvancedVSeed` (template state antara).

- **SpecPipeline**:
  - Masukan: `AdvancedVSeed`.
  - Tanggung jawab: mengubah template state antara menjadi item konfigurasi VChart/VTable yang konkret.
  - Keluaran: Spec final yang dapat dirender.

### 2. Pola Builder
Kelas `VSeedBuilder` adalah koordinator inti yang bertanggung jawab mengelola Context, mendaftarkan plugin, dan mengeksekusi pipeline.

### 3. Ekstensi Berbasis Plugin (Extensibility)
Kemampuan inti VSeed, seperti jenis chart yang didukung, sepenuhnya diimplementasikan melalui mekanisme registrasi plugin.
- **Chart Type Registration**: Setiap jenis chart (misalnya `bar`, `line`) adalah plugin yang diregistrasikan.
- **Theme Registration**: Mendukung registrasi theme kustom.

# Alur Pengujian

VSeed menggunakan alur pengembangan berbasis pengujian yang ketat. **Semua perintah pengujian harus dijalankan dari direktori root proyek.**

## Kategori Pengujian

### 1. Tes Unit (Unit Tests)
- **Tujuan**: Menguji fungsi utilitas mandiri dan logika node Pipeline.
- **Lokasi**: `packages/vseed/tests/unit`
- **Jalankan**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Tes Integrasi (Integration Tests)
- **Tujuan**: Menguji alur lengkap pembuatan chart (VSeed Spec -> VChart Spec).
- **Mekanisme**: Berbasis data. Membaca file JSON di bawah `packages/vseed/tests/integrations`, lalu otomatis menghasilkan kasus uji dan membandingkan snapshot.
- **Jalankan**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Alur Kerja Inti (Workflow)

### Langkah 1: Jalankan Pengujian
Selama pengembangan, jalankan pengujian terkait secara berkala untuk memverifikasi logika.
```bash
# Jalankan semua tes
pnpm --filter=@visactor/vseed run test
```

### Langkah 2: Tangani Perubahan Snapshot
Jika perubahan kode menyebabkan output Spec berubah (misalnya memperbaiki Bug atau menambahkan Feature):
1. Periksa Diff pada output konsol dan pastikan apakah perubahan tersebut sesuai harapan.
2. Jika sesuai harapan, jalankan perintah pembaruan:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Langkah 3: Pemeriksaan Coverage
Sebelum melakukan commit, disarankan untuk memeriksa coverage pengujian.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Catatan
- **Dihasilkan otomatis**: File `.test.ts` untuk tes integrasi dihasilkan oleh skrip `g`, **jangan diedit secara manual**.
- **Menambahkan kasus uji**: Untuk menambahkan tes integrasi, cukup tambahkan file konfigurasi JSON baru ke direktori kategori yang sesuai di bawah `packages/vseed/tests/integrations`, lalu jalankan `pnpm run g`.

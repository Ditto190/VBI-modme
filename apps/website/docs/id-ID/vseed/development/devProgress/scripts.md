# Skrip Umum

Untuk menjaga konsistensi monorepo, **semua skrip harus dijalankan dari direktori root proyek**.

## Skrip Inti (g)

`g` (Generator) adalah skrip bantu paling penting dalam pengembangan VSeed.

```bash
pnpm run g
```

**Deskripsi**:
Perintah ini merupakan gabungan `build:test`, `build:docs`, dan `build:api`, yang digunakan untuk menjaga sumber daya lingkungan pengembangan tetap sinkron:
1. **Menghasilkan kasus uji**: Mem-parsing JSON Spec di bawah `tests/integrations` dan menghasilkan file `.test.ts` yang sesuai.
2. **Menghasilkan dokumentasi**: Mem-parsing definisi tipe TypeScript dan memperbarui dokumentasi API di `apps/website`.

**Kapan digunakan**:
- Setelah mengubah logika chart atau menambahkan jenis chart baru.
- Setelah mengubah definisi tipe TypeScript.
- Sebelum melakukan commit kode.

## Pengembangan & Build

### Memulai Lingkungan Pengembangan
Menjalankan mode watch VSeed dan situs dokumentasi secara bersamaan.
```bash
pnpm run dev
```

### Membangun Proyek
Membangun library inti VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Pengujian

### Jalankan Semua Tes
```bash
pnpm --filter=@visactor/vseed run test
```

### Jalankan Tes Unit
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Jalankan Tes Integrasi
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Perbarui Snapshot Tes
Jalankan ini saat perubahan kode Anda menyebabkan diff snapshot yang memang diharapkan:
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Kualitas Kode

### Pemeriksaan Lint
```bash
pnpm run lint
```

### Pemeriksaan Tipe
```bash
pnpm run typecheck
```

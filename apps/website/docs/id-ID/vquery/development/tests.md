# Alur Pengujian

VQuery menggunakan framework `rstest` untuk pengujian. **Semua perintah harus dijalankan dari direktori root.**

## Mekanisme Pengujian
Pengujian VQuery mencakup:
- **Unit**: Fungsi utilitas dan logika compiler.
- **Examples**: Alur lengkap pembuatan SQL dan query data.

## Perintah Umum

### Menjalankan Semua Test
```bash
pnpm --filter=@visactor/vquery run test
```

### Memperbarui Snapshot
Jika perubahan logika pembuatan SQL sudah sesuai harapan, perbarui snapshot:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Laporan Coverage
Membuat dan meninjau coverage pengujian:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```

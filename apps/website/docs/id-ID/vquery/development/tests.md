# Alur Pengujian

VQuery menggunakan framework `rstest` untuk pengujian. **Semua perintah harus dijalankan dari direktori root.**

## Mekanisme Pengujian
Pengujian VQuery mencakup:
- **Unit**: Fungsi utilitas dan logika kompilator.
- **examples**: Alur lengkap pembuatan SQL dan kueri data.

## Perintah Umum

### Menjalankan semua pengujian
```bash
pnpm --filter=@visactor/vquery run test
```

### Memperbarui Snapshot
Jika perubahan logika pembuatan SQL sudah sesuai harapan, perbarui snapshot:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Laporan cakupan
Buat dan tinjau cakupan pengujian:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```

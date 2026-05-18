# Skrip Umum

Untuk menjaga konsistensi monorepo, **semua skrip harus dijalankan dari root proyek**.

## Skrip Inti (g)

```bash
pnpm run g
```
**Deskripsi**: Skrip `g` VQuery menangani:
1. `build:test`: Mengompilasi resource pengujian.
2. `build:docs`: Menghasilkan dokumentasi API.

## Pengembangan dan Build

### Membangun
```bash
pnpm --filter=@visactor/vquery run build
```

## Pengujian

### Menjalankan pengujian
VQuery menggunakan Rstest untuk pengujian.
```bash
pnpm --filter=@visactor/vquery run test
```

### Memperbarui Snapshot
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Cakupan
```bash
pnpm --filter=@visactor/vquery run test:coverage
```

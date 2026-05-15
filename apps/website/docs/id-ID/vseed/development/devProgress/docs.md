# Dokumentasi

:::info
Menulis tipe `TypeScript` secara tidak langsung berarti menulis dokumentasi opsi konfigurasi.
:::

Dokumentasi untuk semua jenis chart VSeed berada di direktori [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType).

## Membangun Dokumentasi Secara Otomatis

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Jangan mengubah konten dokumentasi secara langsung, karena konten tersebut dapat ditimpa kapan saja.

`build:docs` selesai hanya dalam beberapa detik, sehingga pembaruan inkremental tidak diterapkan. Setiap build dokumentasi akan menghapus semua dokumentasi lama dan menghasilkan dokumentasi baru.

:::

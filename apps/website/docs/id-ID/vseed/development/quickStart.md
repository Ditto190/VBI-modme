# Mulai Cepat

## Persiapan Lingkungan

[Node Download](https://nodejs.org/en/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)
> `package.json` mengonfigurasi `packageManager` sebagai `pnpm@10.13.1`; `corepack` akan otomatis menginstal versi ini.
```bash title="pnpm"
corepack enable pnpm
```

Periksa versi pnpm. Versi yang diharapkan adalah 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Menjalankan Proyek

Jalankan situs dokumentasi, sekaligus dapat mengembangkan dan men-debug vseed.
```bash title="Pengembangan"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build
```

Analisis hasil build dengan `rsdoctor`.
```bash title="Analisis"
pnpm build:rsdoctor
# or
pnpm dev:rsdoctor
```

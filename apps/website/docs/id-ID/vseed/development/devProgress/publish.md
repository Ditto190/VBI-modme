---
title: Rilis
---


# Rilis

## Membuat changeset

Untuk membuat changeset baru, jalankan `pnpm changeset` dari direktori root repository. File markdown yang dihasilkan di direktori `.changeset` harus di-commit ke repository.
```bash
pnpm changeset
```

Setelah membuat changeset, lakukan `git commit`:
```bash
git add .
git commit -m "chore: commit message"
```

Proses di atas dapat diulang beberapa kali. Konten dari setiap changeset akan diakumulasikan ke rilis versi final.

## Memperbarui versi

Jalankan perintah berikut untuk memperbarui versi dan ChangeLog.
```bash
pnpm changeset version
```

Perbarui dependensi dan lock file:
```bash
pnpm install
```

Commit perubahan:
```bash
git add .
git commit -m "chore: release message"
git push
```

Setelah PR digabungkan ke branch `main`, changesets workflow akan dipicu secara otomatis untuk menjalankan proses packaging dan rilis.

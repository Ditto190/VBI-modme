---
title: Phát hành
---


# Phát hành

## Tạo changeset

Để tạo changeset mới, hãy chạy `pnpm changeset` trong thư mục gốc của repository. Các file markdown được tạo trong thư mục `.changeset` cần được commit vào repository.
```bash
pnpm changeset
```

Sau khi tạo changeset, thực hiện `git commit`:
```bash
git add .
git commit -m "chore: commit message"
```

Quy trình trên có thể lặp lại nhiều lần. Nội dung của mỗi changeset sẽ được tích lũy vào bản phát hành phiên bản cuối cùng.

## Cập nhật phiên bản

Chạy lệnh sau để cập nhật phiên bản và ChangeLog.
```bash
pnpm changeset version
```

Cập nhật dependencies và lock file:
```bash
pnpm install
```

Commit các thay đổi:
```bash
git add .
git commit -m "chore: release message"
git push
```

Sau khi PR được merge vào branch `main`, changesets workflow sẽ tự động được kích hoạt để thực hiện công việc packaging và phát hành.

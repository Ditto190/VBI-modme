---
title: 릴리스
---


# 릴리스

## changeset 생성

새 changeset을 생성하려면 repository 루트 디렉터리에서 `pnpm changeset`을 실행하세요. `.changeset` 디렉터리에 생성된 markdown 파일은 repository에 커밋해야 합니다.
```bash
pnpm changeset
```

changeset을 생성한 뒤 `git commit`을 실행합니다:
```bash
git add .
git commit -m "chore: commit message"
```

위 과정은 여러 번 반복할 수 있습니다. 각 changeset의 내용은 최종 버전 릴리스에 누적됩니다.

## 버전 업데이트

다음 명령을 실행해 버전을 업데이트하고 ChangeLog를 갱신합니다.
```bash
pnpm changeset version
```

의존성과 lock file을 업데이트합니다:
```bash
pnpm install
```

변경 사항을 커밋합니다:
```bash
git add .
git commit -m "chore: release message"
git push
```

PR이 `main` 브랜치에 병합되면 changesets workflow가 자동으로 트리거되어 패키징과 릴리스 작업을 수행합니다.

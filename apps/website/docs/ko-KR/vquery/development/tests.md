# 테스트 흐름

VQuery는 `rstest` 프레임워크로 테스트합니다. **모든 명령은 루트 디렉터리에서 실행해야 합니다.**

## 테스트 메커니즘
VQuery 테스트는 다음을 포함합니다.
- **Unit**: 유틸리티 함수와 컴파일러 로직.
- **Examples**: SQL 생성과 데이터 쿼리의 전체 흐름.

## 자주 쓰는 명령

### 모든 테스트 실행
```bash
pnpm --filter=@visactor/vquery run test
```

### 스냅샷 업데이트
SQL 생성 로직 변경이 기대한 결과라면 스냅샷을 업데이트합니다.
```bash
pnpm --filter=@visactor/vquery run test:update
```

### 커버리지 보고서
테스트 커버리지를 생성하고 확인합니다.
```bash
pnpm --filter=@visactor/vquery run test:coverage
```

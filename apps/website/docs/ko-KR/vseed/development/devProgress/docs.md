# 문서

:::info
`TypeScript` 타입을 작성하는 것은 곧 설정 옵션 문서를 간접적으로 작성하는 것입니다.
:::

모든 VSeed 차트 유형의 문서는 [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) 디렉터리에 있습니다.

## 문서 자동 빌드

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
문서 내용을 직접 수정하지 마세요. 언제든지 덮어쓰기될 수 있습니다.

`build:docs`는 몇 초 안에 완료되므로 증분 업데이트는 구현되어 있지 않습니다. 문서를 빌드할 때마다 모든 기존 문서를 삭제하고 새 문서를 생성합니다.

:::

# @visactor/vbi-component

Scaffold package for VBI component layer.

## Localization

`@visactor/vbi-component` uses local JSON dictionaries for built-in component text.

```ts
import { setVBIComponentLocale } from '@visactor/vbi-component'

await setVBIComponentLocale('vi-VN')
```

Supported locales match the standard practice: `zh-CN`, `en-US`, `ja-JP`,
`de-DE`, `id-ID`, `fr-FR`, `ko-KR`, and `vi-VN`.

Locale dictionaries live in `src/localization/locales`.

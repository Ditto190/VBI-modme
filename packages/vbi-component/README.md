# @visactor/vbi-component

Scaffold package for VBI component layer.

## Localization

`@visactor/vbi-component` uses `@lit/localize` for built-in component text.

```ts
import { setVBIComponentLocale } from '@visactor/vbi-component'

await setVBIComponentLocale('vi-VN')
```

Supported locales match the standard practice: `zh-CN`, `en-US`, `ja-JP`,
`de-DE`, `id-ID`, `fr-FR`, `ko-KR`, and `vi-VN`.

Translation exchange files live in `xliff`. Runtime locale modules
are generated into `src/localization/generated`.

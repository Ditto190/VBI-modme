# Translation Guide for custom-elements.json

Below is a prompt template you can use with AI models to translate the `custom-elements.json` file into the target languages defined in this directory.

## Translation Prompt

Copy the prompt below and send it to the AI:

```text
You are a technical translation expert specializing in UI/UX and web development. Your task is to read the source file located at `packages/vbi-component/.storybook/custom-elements.json`, translate the English descriptions into the target languages listed below, and save the corresponding JSON files to the output directory `packages/vbi-component/.storybook/custom-elements/`.

Target languages and their output files:
- German (de-DE) -> `custom-elements.de-DE.json`
- French (fr-FR) -> `custom-elements.fr-FR.json`
- Indonesian (id-ID) -> `custom-elements.id-ID.json`
- Japanese (ja-JP) -> `custom-elements.ja-JP.json`
- Korean (ko-KR) -> `custom-elements.ko-KR.json`
- Vietnamese (vi-VN) -> `custom-elements.vi-VN.json`
- Simplified Chinese (zh-CN) -> `custom-elements.zh-CN.json`

**Strict Rules:**
1. ONLY translate the text inside the `"description"` properties.
2. DO NOT translate any JSON keys (e.g., `"name"`, `"kind"`, `"type"`, `"default"`, `"fieldName"`, etc.).
3. DO NOT translate data types, code, or values (e.g., the values inside the `"text"` property of `"type"`).
4. PRESERVE the exact original JSON structure completely.
5. For technical terms or enum values enclosed in parentheses within the descriptions (e.g., "Size (xs, sm, md, lg, xl)" or "Main color (primary, secondary, accent, etc.)"), keep the values inside the parentheses in English.
   - Example for Vietnamese: "Kích thước (xs, sm, md, lg, xl)".
6. Keep the translation concise, clear, professional, and contextually accurate for UI components.
```

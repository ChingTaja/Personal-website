# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


## 中英文內容維護

- 頁面右上方的「繁中 / EN」切換語言，選擇儲存在本機瀏覽器，切換時保留目前頁面。
- 介面翻譯放在 `src/locales/en/ui.json`，學習資源的標題、說明與備註放在 `src/locales/en/resources.json`。
- 文章、隨手記與讀書筆記的英文版放在 `src/locales/en/posts/`、`notes/`、`books/`，檔名必須與中文原稿相同。
- 英文 Markdown 的 front matter 只需提供英文 `title`。作者、分類、閱讀日期、來源連結與其他 metadata 共用中文原稿，避免不同語言版本資料不一致。中文與日文人名保持原樣。
- 英文筆記的四個章節使用 `Summary`、`Favorite Quotes`、`My Thoughts`、`Next Steps`，會套用相同螢光筆樣式。隨手記使用 `Key Takeaways`。
- 尚未新增英文檔的文章會回退到原文，既有路由與連結不變。
- 驗證翻譯完整性、作者保留、閱讀日期、資源連結與頁面渲染：`node scripts/check-i18n.mjs`。


## 系列影片筆記

系列入口放在 `src/notes/`，以 `seriesId` 對應 `src/series/<seriesId>/` 下的逐集 Markdown，並使用 `sourceUrl` 指向播放清單、`authorUrl` 指向作者頻道。每集依檔名排序，可參考 `src/templates/series-episode-template.md`。`status: draft` 表示心得待補，`status: complete` 會計入心得完成數。收錄數只計算已新增的影片，不代表整個播放清單的總集數。英文對應檔放在 `src/locales/en/series/<seriesId>/`。

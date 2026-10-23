import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { getCollections, getSeriesEpisodes } = await vite.ssrLoadModule('/src/postData.ts')
  const { getResourceCategories } = await vite.ssrLoadModule('/src/resourceData.ts')
  const { LanguageProvider, translate } = await vite.ssrLoadModule('/src/i18n.tsx')
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx')
  const chinese = getCollections('zh-TW')
  const english = getCollections('en')
  for (const kind of ['books', 'notes', 'posts']) {
    const translations = await readdir(`src/locales/en/${kind}`)
    for (const original of chinese[kind].items) {
      assert(translations.includes(`${original.slug}.md`), `Missing English content: ${original.slug}`)
      const translated = english[kind].items.find((item) => item.slug === original.slug)
      assert(translated)
      assert.equal(translated.author, original.author, `Changed author: ${original.slug}`)
      assert.equal(translated.sourceUrl, original.sourceUrl)
      assert.equal(translated.category, original.category)
      assert(translated.title.trim().length > 0)
      assert.notEqual(translated.html, original.html)
      if (kind === 'books') {
        assert(translated.html.includes('book-highlight-summary'))
        assert(translated.html.includes('book-highlight-actions'))
        assert(!translated.html.includes('閱讀日期'))
      }
    }
  }
  const episodes = getSeriesEpisodes('game-theory-101', 'zh-TW')
  const englishEpisodes = getSeriesEpisodes('game-theory-101', 'en')
  assert.equal(episodes.length, 1)
  assert.equal(episodes[0].status, 'draft')
  assert.equal(englishEpisodes[0].sourceUrl, episodes[0].sourceUrl)
  assert(englishEpisodes[0].html.includes('What is game theory?'))
  assert(!englishEpisodes[0].html.includes('Open Questions'))
  assert.equal(getSeriesEpisodes('missing-series', 'en').length, 0)
  const naval = english.books.items.find((item) => item.slug.includes('almanack'))
  assert(naval.html.includes('Read: 2026/09'))
  const thinking = english.books.items.find((item) => item.slug.includes('think-activators'))
  assert(thinking.html.includes('Read: 2023/03/17'))
  const zhResources = getResourceCategories('zh-TW')
  const enResources = getResourceCategories('en')
  for (let i = 0; i < zhResources.length; i++) {
    assert.equal(enResources[i].links.length, zhResources[i].links.length)
    zhResources[i].links.forEach((link, j) => {
      assert.notEqual(enResources[i].links[j].desc, link.desc)
      assert.equal(enResources[i].links[j].url, link.url)
    })
  }
  const messages = JSON.parse(await readFile('src/locales/en/ui.json', 'utf8'))
  for (const file of ['App.tsx', 'Nav.tsx', 'Posts.tsx', 'Resources.tsx', 'Shelf.tsx', 'SeriesNotes.tsx']) {
    const source = await readFile(`src/${file}`, 'utf8')
    for (const [, key] of source.matchAll(/\bt\(["']([^"']+)["']\)/g)) {
      assert(key in messages || translate(key, 'en') !== key, `Untranslated UI: ${key}`)
    }
  }
  for (const locale of ['zh-TW', 'en']) {
    globalThis.localStorage = { getItem: () => locale }
    for (const hash of ['#/', '#/books', '#/notes', '#/posts', '#/resources', '#/resources/japanese', '#/resources/english', '#/books/2026-10-23-almanack-of-naval', '#/notes/2026-10-22-journaling', '#/notes/2026-10-23-game-theory-101']) {
      globalThis.window = { location: { hash } }
      const html = renderToString(React.createElement(LanguageProvider, null, React.createElement(App)))
      assert(html.includes(locale === 'en' ? 'Reading Notes' : '讀書筆記'), `${locale} ${hash}`)
      if (hash.endsWith('game-theory-101')) {
        assert(html.includes('William Spaniel'))
        assert(html.includes('aria-expanded="true"'))
        assert(html.includes('NSVmOC_5zrE'))
        assert(!html.includes(locale === 'en' ? 'Notes to come' : '心得待補'))
      }
      if (locale === 'en') {
        assert(!html.includes('找一本書'), hash)
        assert(!html.includes('個收藏'), hash)
        assert(!html.includes('原影片 ↗'), hash)
      }
    }
  }
  console.log('i18n checks passed: all content pairs, author preservation, reading dates, resources, UI keys, series episode metadata, and 20 rendered routes.')
} finally {
  await vite.close()
}

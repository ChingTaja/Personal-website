import { translate, type Locale } from './i18n'
import { marked } from 'marked';

export type Post = {
  slug: string;
  title: string;
  originalTitle: string;
  date: string;
  category: string;
  topic: string;
  sourceUrl: string;
  seriesId: string;
  authorUrl: string;
  status: string;
  author: string;
  color: string;
  html: string;
};

const renderer = new marked.Renderer();
renderer.link = function ({ href, title, tokens }) {
  const escapeAttribute = (value: string) => value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const external = /^https?:\/\//i.test(href);
  return `<a href="${escapeAttribute(href)}"${title ? ` title="${escapeAttribute(title)}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${this.parser.parseInline(tokens)}</a>`;
};

const bookHeadingStyles: Record<string, string> = {
  '摘要': 'summary',
  '喜歡的句子': 'quotes',
  '我的想法': 'thoughts',
  '後續行動': 'actions',
  'Summary': 'summary',
  'Favorite Quotes': 'quotes',
  'My Thoughts': 'thoughts',
  'Next Steps': 'actions',
};
renderer.heading = function ({ tokens, depth, text }) {
  const content = this.parser.parseInline(tokens);
  const style = depth === 2 ? bookHeadingStyles[text.trim()] : undefined;
  const readingDate = style === 'summary' ? '<span class="book-reading-date">閱讀日期：太久遠不可考</span>' : '';
  return `<h${depth}${style === 'summary' ? ' class="book-summary-heading"' : ''}>${style ? `<span class="book-highlight book-highlight-${style}">${content}</span>` : content}${readingDate}</h${depth}>\n`;
};

// 解析檔案開頭 --- ... --- 的 front matter
function parse(slug: string, raw: string): Post {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = m ? m[2] : raw;
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    originalTitle: meta.title ?? slug,
    date: meta.date ?? '',
    category: meta.category ?? '未分類',
    topic: meta.topic ?? '未分類',
    sourceUrl: /^https?:\/\//i.test(meta.sourceUrl ?? '') ? meta.sourceUrl : '',
    seriesId: meta.seriesId ?? '',
    authorUrl: /^https?:\/\//i.test(meta.authorUrl ?? '') ? meta.authorUrl : '',
    status: meta.status ?? '',
    author: meta.author ?? '',
    color: meta.color ?? '',
    html: marked.parse(body, { async: false, renderer }).replace(
      '<span class="book-reading-date">閱讀日期：太久遠不可考</span>',
      `<span class="book-reading-date">閱讀日期：${/^\d{4}\/(0[1-9]|1[0-2])(?:\/(0[1-9]|[12]\d|3[01]))?$/.test(meta.readingDate ?? '') ? meta.readingDate : '太久遠不可考'}</span>`
    ),
  };
}

// 日期新到舊
function collect(files: Record<string, string>): Post[] {
  return Object.entries(files)
    .map(([path, raw]) => parse(path.replace(/^.*\/|\.md$/g, ''), raw))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export type Kind = 'posts' | 'books' | 'notes';

export const collections: Record<Kind, { title: string; desc: string; items: Post[] }> = {
  posts: {
    title: '📝 日誌',
    desc: '慢慢寫、慢慢累積的小筆記。',
    items: collect(
      import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
    ),
  },
  books: {
    title: '📖 讀書筆記',
    desc: '全部的讀書筆記，用分類 tab 切換。',
    items: collect(
      import.meta.glob('./books/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
    ),
  },
  notes: {
    title: '💡 隨手記',
    desc: '這裡放的是一些零散的想法，還有看影片、聽 podcast 時記下的觀念。先慢慢收集起來，留著之後回頭看。',
    items: collect(
      import.meta.glob('./notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
    ),
  },
};

const englishFiles = import.meta.glob('./locales/en/{books,notes,posts}/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const englishCollections = Object.fromEntries(
  Object.entries(collections).map(([kind, collection]) => [kind, {
    ...collection,
    items: collection.items.map((original) => {
      const raw = englishFiles[`./locales/en/${kind}/${original.slug}.md`];
      if (!raw) return original;
      const translated = parse(original.slug, raw);
      return {
        ...original,
        title: translated.title,
        html: translated.html.replace(/<span class="book-reading-date">[\s\S]*?<\/span>/, original.html.match(/<span class="book-reading-date">[\s\S]*?<\/span>/)?.[0] ?? '').replace('閱讀日期：', 'Read: ').replace('太久遠不可考', 'Too long ago to remember'),
      };
    }),
  }])
) as typeof collections;
export function getCollections(locale: Locale) {
  const selected = locale === 'en' ? englishCollections : collections;
  return Object.fromEntries(Object.entries(selected).map(([kind, collection]) => [kind, {
    ...collection, title: translate(collection.title, locale), desc: translate(collection.desc, locale),
  }])) as typeof collections;
}

const seriesFiles = import.meta.glob('./series/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const englishSeriesFiles = import.meta.glob('./locales/en/series/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export function getSeriesEpisodes(seriesId: string, locale: Locale): Post[] {
  return Object.entries(seriesFiles)
    .filter(([path]) => path.startsWith(`./series/${seriesId}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, raw]) => {
      const original = parse(path.replace(/^.*\/|\.md$/g, ''), raw);
      const englishRaw = englishSeriesFiles[path.replace('./series/', './locales/en/series/')];
      if (locale !== 'en' || !englishRaw) return original;
      const translated = parse(original.slug, englishRaw);
      return { ...original, title: translated.title, html: translated.html };
    });
}

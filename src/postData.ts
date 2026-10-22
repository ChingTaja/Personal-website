import { marked } from 'marked';

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
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
    date: meta.date ?? '',
    category: meta.category ?? '未分類',
    author: meta.author ?? '',
    color: meta.color ?? '',
    html: marked.parse(body, { async: false, renderer }),
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
    title: '📝 文章',
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
    desc: '碎片化想法、影片感想和 podcast 筆記',
    items: collect(
      import.meta.glob('./notes/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
    ),
  },
};

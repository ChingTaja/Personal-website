import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Shelf from './Shelf';
import { collections, type Kind } from './postData';

const bookCategoryColors: Record<string, string> = {
  '全部': '#e5e8ec',
  '學習思考': '#b9d9ef',
  '心理成長': '#d9c5ed',
  '習慣': '#b8dfcd',
  '財務理財': '#f3d483',
  '賽局理論': '#b9dfe0',
  '創意': '#f4bdab',
  '繪本': '#efc6dc',
  '其他': '#ded8cd',
};
function bookCategoryStyle(category: string): CSSProperties {
  return { '--category-color': bookCategoryColors[category] ?? '#ded8cd' } as CSSProperties;
}

function stripHtml(raw: string) {
  return raw
    .replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
    .replace(/<br\s*\/?>|<\/(?:p|li|tr|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ *\n+ */g, '\n')
    .trim();
}

// tab 太多時單行橫向捲動，兩側出現箭頭
function TabScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setOverflowing(el.scrollWidth > el.clientWidth + 1);
      setCanLeft(el.scrollLeft > 1);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((tab) => ro.observe(tab));
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [children]);

  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: 'smooth' });

  return (
    <div className={`tabs-wrap${overflowing ? ' tabs-overflow' : ''}`}>
      {overflowing && (
        <button type="button" disabled={!canLeft} className="tab-arrow left" aria-label="往左" onClick={() => scroll(-1)}>
          ‹
        </button>
      )}
      <div className="tabs" role="tablist" ref={ref}>
        {children}
      </div>
      {overflowing && (
        <button type="button" disabled={!canRight} className="tab-arrow right" aria-label="往右" onClick={() => scroll(1)}>
          ›
        </button>
      )}
    </div>
  );
}

function Filters({ children }: { children: ReactNode }) {
  return <div className="filters">{children}</div>;
}

// full：整頁列表。讀書筆記在首頁是書櫃，整頁則是「全部 + 分類」tab 與所有筆記
export function PostList({ kind, full = false, query = '' }: { kind: Kind; full?: boolean; query?: string }) {
  const [category, setCategory] = useState('全部');
  const items = collections[kind].items;
  const getCategory = (post: (typeof items)[number]) => kind === 'notes' ? post.topic : post.category;
  const categories = [...new Set(items.map(getCategory))];
  const search = query.trim().toLocaleLowerCase();
  const shown = items.filter((post) =>
    (category === '全部' || getCategory(post) === category) &&
    (!search || `${post.title} ${post.author}`.toLocaleLowerCase().includes(search))
  );
  const asTabs = kind === 'books' && full;

  if (kind === 'books' && !full) return <Shelf books={items} />;

  if (kind === 'notes') {
    return (
      <>
        {categories.length > 1 && (
          <Filters>
            {['全部', ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`filter${c === category ? ' active' : ''}`}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </Filters>
        )}
        <div className="note-grid">
          {shown.map((p) => {
            const preview = stripHtml(p.html);
            const short = preview.length > 85 ? `${preview.slice(0, 85)}…` : preview;

            return (
              <article key={p.slug} className="note-card">
                <span className="note-pin" />
                <p className="note-meta">
                  <span className="chip">{p.category}</span>
                  <span className="note-topic-label">{p.topic}</span>
                  <time dateTime={p.date}>{p.date}</time>
                </p>
                {p.author && <p className="note-author">{p.author}</p>}
                <h3><a className="note-entry" href={`#/${kind}/${p.slug}`}>{p.title}</a></h3>
                <p className="note-preview">{short}</p>
                {p.sourceUrl && (
                  <a className="note-source" href={p.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`觀看原影片：${p.title}（另開分頁）`}>原影片 ↗</a>
                )}
              </article>
            );
          })}
        </div>
      </>
    );
  }

  const showCategories = asTabs || categories.length > 1;
  const Wrapper = asTabs ? TabScroller : Filters;

  return (
    <>
      {showCategories && (
        <Wrapper>
          {['全部', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              role={asTabs ? 'tab' : undefined}
              aria-selected={asTabs ? c === category : undefined}
              className={`${asTabs ? 'tab book-category-tab' : 'filter'}${c === category ? ' active' : ''}`}
              style={asTabs ? bookCategoryStyle(c) : undefined}
              onClick={() => setCategory(c)}
            >
              {c}
              {asTabs && (
                <span className="tab-count">
                  {c === '全部' ? items.length : items.filter((p) => p.category === c).length}
                </span>
              )}
            </button>
          ))}
        </Wrapper>
      )}
      <ul className={asTabs ? 'links tab-panel' : 'links'}>
        {shown.length === 0 && <li className="book-search-empty" role="status">找不到符合的書籍，試試其他關鍵字或分類</li>}
        {shown.map((p) => (
          <li key={p.slug}>
            <a className="card" href={`#/${kind}/${p.slug}`}>
              <p className="post-meta">
                {showCategories && <span className={`chip${kind === 'books' ? ' book-category-chip' : ''}`} style={kind === 'books' ? bookCategoryStyle(p.category) : undefined}>{p.category}</span>}
                {p.author && <span className={`chip${kind === 'books' ? ' book-author-chip' : ''}`}>{p.author}</span>} {kind !== 'books' && p.date}
              </p>
              <h3>{p.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Posts({ kind, slug }: { kind: Kind; slug?: string }) {
  const [bookQuery, setBookQuery] = useState('');
  const { title, desc, items } = collections[kind];

  if (slug) {
    const post = items.find((p) => p.slug === slug);
    if (!post) {
      return (
        <>
          <p>找不到這篇 🙈</p>
          <a className="btn" href={kind === 'books' ? '#/books' : kind === 'notes' ? '#/notes' : '#/'}>
            {kind === 'books' ? '回讀書筆記' : kind === 'notes' ? '回隨手記' : '回首頁'}
          </a>
        </>
      );
    }
    return (
      <>
        <a className="back" href={kind === 'books' ? '#/books' : kind === 'notes' ? '#/notes' : '#/'}>
          {kind === 'books' ? '← 回讀書筆記' : kind === 'notes' ? '← 回隨手記' : '← 回首頁'}
        </a>
        <h1 className="page-title">{post.title}</h1>
        <p className="post-meta">
          {post.author && <span className={`chip${kind === 'books' ? ' book-author-chip' : ''}`}>{post.author}</span>}
          {post.category !== '未分類' && <span className={`chip${kind === 'books' ? ' book-category-chip' : ''}`} style={kind === 'books' ? bookCategoryStyle(post.category) : undefined}>{post.category}</span>} {kind !== 'books' && post.date}
        </p>
        <article className={`prose${kind === 'books' ? ' book-prose' : ''}`} dangerouslySetInnerHTML={{ __html: post.html }} />
      </>
    );
  }

  if (kind === 'notes') {
    return (
      <>
        <h1 className="page-title">{title}</h1>
        <p className="page-desc">{desc}</p>
        <PostList kind={kind} full />
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">{title}</h1>
      {kind === 'books' ? (
        <div className="books-description">
          <p className="page-desc">{desc}</p>
          <label className="book-search">
            <svg className="book-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
            <input type="search" aria-label="搜尋書名或作者" placeholder="找一本書，或一位作者…" value={bookQuery} onChange={(event) => setBookQuery(event.target.value)} />
          </label>
        </div>
      ) : <p className="page-desc">{desc}</p>}
      <PostList kind={kind} full query={kind === 'books' ? bookQuery : ''} />
    </>
  );
}

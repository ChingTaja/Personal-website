import { useEffect, useRef, useState, type ReactNode } from 'react';
import Shelf from './Shelf';
import { collections, type Kind } from './postData';

function stripHtml(raw: string) {
  return raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
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
export function PostList({ kind, full = false }: { kind: Kind; full?: boolean }) {
  const [category, setCategory] = useState('全部');
  const items = collections[kind].items;
  const getCategory = (post: (typeof items)[number]) => kind === 'notes' ? post.topic : post.category;
  const categories = [...new Set(items.map(getCategory))];
  const shown = category === '全部' ? items : items.filter((p) => getCategory(p) === category);
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
            const short = preview.length > 120 ? `${preview.slice(0, 120)}…` : preview;

            return (
              <a key={p.slug} className="note-card" href={`#/${kind}/${p.slug}`}>
                <span className="note-pin" />
                <p className="note-meta">
                  <span className="chip">{p.category}</span>
                  {p.author && <span className="chip">{p.author}</span>}
                  {p.date}
                </p>
                <p className="note-topic">{p.topic}</p>
                <h3>{p.title}</h3>
                <p className="note-preview">{short}</p>
              </a>
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
              className={`${asTabs ? 'tab' : 'filter'}${c === category ? ' active' : ''}`}
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
        {shown.map((p) => (
          <li key={p.slug}>
            <a className="card" href={`#/${kind}/${p.slug}`}>
              <p className="post-meta">
                {showCategories && <span className="chip">{p.category}</span>}
                {p.author && <span className="chip">{p.author}</span>} {p.date}
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
          {post.author && <span className="chip">{post.author}</span>}
          {post.category !== '未分類' && <span className="chip">{post.category}</span>} {post.date}
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
      <p className="page-desc">{desc}</p>
      <PostList kind={kind} full />
    </>
  );
}

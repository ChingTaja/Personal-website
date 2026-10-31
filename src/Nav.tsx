import { useLanguage } from './i18n'
export default function Nav({ page }: { page?: string }) {
  const { t, locale, setLocale } = useLanguage();
  const items = [
    { href: '#/', label: '🏠 首頁', active: !['posts', 'books', 'notes', 'resources'].includes(page ?? '') },
    { href: '#/posts', label: '📝 日誌', active: page === 'posts' },
    { href: '#/books', label: '📖 讀書筆記', active: page === 'books' },
    { href: '#/notes', label: '💡 隨手記', active: page === 'notes' },
    { href: '#/resources', label: '📚 學習資源收藏', active: page === 'resources' },
  ];

  return (
    <nav className="nav">
      <a className="logo" href="#/">
        Taja ✎
      </a>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className={i.active ? 'active' : undefined}>
              {t(i.label)}
            </a>
          </li>
        ))}
      </ul>
      <div className="language-switch" role="group" aria-label="Language / 語言">
        <button type="button" lang="zh-TW" aria-pressed={locale === 'zh-TW'} onClick={() => setLocale('zh-TW')}>繁中</button>
        <button type="button" lang="en" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
      </div>
    </nav>
  );
}

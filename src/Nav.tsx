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
      <button
        type="button"
        className="language-switch"
        aria-label={locale === 'zh-TW' ? 'Switch to English' : '切換為繁體中文'}
        onClick={() => setLocale(locale === 'zh-TW' ? 'en' : 'zh-TW')}
      >
        <span lang="zh-TW" className={locale === 'zh-TW' ? 'selected' : undefined}>繁中</span>
        <span lang="en" className={locale === 'en' ? 'selected' : undefined}>EN</span>
      </button>
    </nav>
  );
}

export default function Nav({ page }: { page?: string }) {
  const items = [
    { href: '#/', label: '🏠 首頁', active: !['posts', 'books', 'notes', 'resources'].includes(page ?? '') },
    { href: '#/posts', label: '📝 文章', active: page === 'posts' },
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
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

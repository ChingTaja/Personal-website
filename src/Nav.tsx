export default function Nav({ page }: { page?: string }) {
  const items = [
    { href: '#/', label: '🏠 首頁', active: !['posts', 'books', 'resources'].includes(page ?? '') },
    { href: '#/posts', label: '📝 文章', active: page === 'posts' },
    { href: '#/books', label: '📖 讀書筆記', active: page === 'books' },
    { href: '#/resources', label: '📚 學習小書櫃', active: page === 'resources' },
  ]

  return (
    <nav className="nav">
      <a className="logo" href="#/">Taja ✎</a>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className={i.active ? 'active' : undefined}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
